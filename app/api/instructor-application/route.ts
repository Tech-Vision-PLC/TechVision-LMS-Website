import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_REQUEST_SIZE = 12 * 1024 * 1024;

const ALLOWED_FIELDS = [
  "full_name",
  "professional_title",
  "bio",
  "education",
  "experience",
  "expertise",
  "linkedin",
  "github",
  "portfolio",
  "teaching_reason",
  "proposed_course",
] as const;

type ApplicationField = (typeof ALLOWED_FIELDS)[number];

type UploadedFile = {
  file_name: string;
  content_type: string;
  content: string;
};

const URL_FIELDS = ["linkedin", "github", "portfolio"] as const;

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const ALLOWED_CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function errorResponse(message: string, status: number) {
  return NextResponse.json(
    { success: false, message },
    { status }
  );
}

function validateUrl(value: string, field: string): string {
  if (!value.trim()) return "";

  try {
    const url = new URL(value);

    if (
      !["https:", "http:"].includes(url.protocol) ||
      !url.hostname.includes(".") ||
      url.username ||
      url.password
    ) {
      throw new Error("Invalid URL");
    }

    return "";
  } catch {
    return `${field} must be a valid HTTP or HTTPS URL.`;
  }
}

async function readFile(
  formData: FormData,
  fieldName: "profile_image" | "cv",
  allowedTypes: string[]
): Promise<UploadedFile | null> {
  const value = formData.get(fieldName);

  if (!value || typeof value === "string") {
    return null;
  }

  const file = value as File;

  if (file.size === 0) {
    return null;
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`${fieldName} must be 5 MB or smaller.`);
  }

  if (!allowedTypes.includes(file.type)) {
    throw new Error(`Invalid file type for ${fieldName}.`);
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  if (fieldName === "profile_image") {
    const isJpeg =
      buffer.length >= 3 &&
      buffer[0] === 0xff &&
      buffer[1] === 0xd8 &&
      buffer[2] === 0xff;

    const isPng =
      buffer.length >= 8 &&
      buffer.subarray(0, 8).equals(
        Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
      );

    const isWebp =
      buffer.length >= 12 &&
      buffer.toString("ascii", 0, 4) === "RIFF" &&
      buffer.toString("ascii", 8, 12) === "WEBP";

    if (!isJpeg && !isPng && !isWebp) {
      throw new Error("The profile photo is not a valid image.");
    }
  }

  if (fieldName === "cv") {
    const isPdf =
      buffer.length >= 5 &&
      buffer.subarray(0, 5).toString("ascii") === "%PDF-";

    const isOle =
      buffer.length >= 8 &&
      buffer.subarray(0, 8).equals(
        Buffer.from([
          0xd0, 0xcf, 0x11, 0xe0,
          0xa1, 0xb1, 0x1a, 0xe1,
        ])
      );

    const isZip =
      buffer.length >= 4 &&
      buffer[0] === 0x50 &&
      buffer[1] === 0x4b &&
      (buffer[2] === 0x03 || buffer[2] === 0x05 || buffer[2] === 0x07) &&
      (buffer[3] === 0x04 || buffer[3] === 0x06 || buffer[3] === 0x08);

    if (!isPdf && !isOle && !isZip) {
      throw new Error("The CV is not a valid PDF, DOC, or DOCX file.");
    }
  }

  return {
    file_name: file.name.replace(/[\\/\r\n]/g, "_").slice(0, 180),
    content_type: file.type,
    content: buffer.toString("base64"),
  };
}

export async function POST(request: NextRequest) {
  try {
    // Check the declared request size.
    const contentLength = Number(
      request.headers.get("content-length") || 0
    );

    if (contentLength > MAX_REQUEST_SIZE) {
      return errorResponse("The uploaded files are too large.", 413);
    }

    // Require multipart form data.
    const contentType = request.headers.get("content-type") || "";

    if (!contentType.toLowerCase().startsWith("multipart/form-data")) {
      return errorResponse(
        "Expected a multipart form submission.",
        415
      );
    }

    // Basic same-origin protection.
    const origin = request.headers.get("origin");
    const expectedOrigin = new URL(request.url).origin;

    if (origin && origin !== expectedOrigin) {
      return errorResponse("Invalid request origin.", 403);
    }

    const formData = await request.formData();

    // Honeypot field: silently accept but do not submit bot applications.
    if (String(formData.get("website") || "").trim()) {
      return NextResponse.json({
        success: true,
        message: "Application received.",
      });
    }

    // Validate text fields.
    const values = {} as Record<ApplicationField, string>;

    for (const field of ALLOWED_FIELDS) {
      const value = formData.get(field);

      if (value !== null && typeof value !== "string") {
        return errorResponse(`Invalid value for ${field}.`, 400);
      }

      const textValue = String(value || "").trim();

      const longTextFields: ApplicationField[] = [
        "bio",
        "education",
        "experience",
        "expertise",
        "teaching_reason",
      ];

      const maxLength = longTextFields.includes(field) ? 5000 : 500;

      if (textValue.length > maxLength) {
        return errorResponse(`${field} is too long.`, 400);
      }

      values[field] = textValue;
    }

    // Required fields.
    if (
      !values.full_name ||
      !values.professional_title ||
      !values.bio ||
      !values.proposed_course
    ) {
      return errorResponse(
        "Please complete all required fields.",
        400
      );
    }

    // Validate profile URLs.
    for (const field of URL_FIELDS) {
      const validationError = validateUrl(values[field], field);

      if (validationError) {
        return errorResponse(validationError, 400);
      }
    }

    // Validate and encode uploads.
    const profileImage = await readFile(
      formData,
      "profile_image",
      ALLOWED_IMAGE_TYPES
    );

    const cv = await readFile(
      formData,
      "cv",
      ALLOWED_CV_TYPES
    );

    // Server-side Frappe credentials.
    const frappeUrl = process.env.FRAPPE_URL?.replace(/\/+$/, "");
    const apiKey = process.env.FRAPPE_API_KEY;
    const apiSecret = process.env.FRAPPE_API_SECRET;

    if (!frappeUrl || !apiKey || !apiSecret) {
      console.error(
        "Instructor application integration is not configured."
      );

      return errorResponse(
        "The application service is temporarily unavailable.",
        503
      );
    }

    // Send the application to Frappe.
    const backendResponse = await fetch(
    `${frappeUrl}/api/method/lms.lms.doctype.instructor_application.instructor_application.submit_public_application`,
    {
        method: "POST",
        headers: {
        Authorization: `token ${apiKey}:${apiSecret}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        },
        body: JSON.stringify({
        data: {
            ...values,
            profile_image: profileImage,
            cv,
        },
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(30_000),
    }
    );
    // Read the response body only once.
    const responseText = await backendResponse.text();

    let backendResult: {
      message?: {
        success?: boolean;
        message?: string;
        name?: string;
      };
      exc_type?: string;
      exception?: string;
      _server_messages?: string;
    } | null = null;

    try {
      backendResult = JSON.parse(responseText);
    } catch {
      // Frappe or the reverse proxy may return non-JSON content.
    }

    if (!backendResponse.ok) {
      // Keep detailed errors in server logs only.
      console.error("Frappe rejected instructor application:", {
        status: backendResponse.status,
        body: responseText.slice(0, 8000),
      });

      // Show details only in development.
      if (process.env.NODE_ENV !== "production") {
        return NextResponse.json(
          {
            success: false,
            message: "Frappe rejected the instructor application.",
            frappeStatus: backendResponse.status,
            details: responseText.slice(0, 4000),
          },
          { status: 502 }
        );
      }

      return errorResponse(
        "We could not submit your application. Please try again later.",
        502
      );
    }

    const result = backendResult?.message;

    if (!result || result.success !== true) {
      console.error(
        "Frappe returned an unexpected instructor application response."
      );

      if (process.env.NODE_ENV !== "production") {
        return NextResponse.json(
          {
            success: false,
            message: "Frappe returned an unexpected response.",
            details: responseText.slice(0, 4000),
          },
          { status: 502 }
        );
      }

      return errorResponse(
        "The application could not be saved. Please try again.",
        502
      );
    }

    return NextResponse.json({
      success: true,
      message:
        result.message ||
        "Your application has been submitted successfully.",
      application: result.name || null,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.name === "TimeoutError" ||
        error.name === "AbortError"
      ) {
        return errorResponse(
          "The application service took too long to respond. Please try again.",
          504
        );
      }

      if (
        error.message.includes("must be 5 MB or smaller") ||
        error.message.includes("Invalid file type") ||
        error.message.includes("not a valid") ||
        error.message.includes("must be a valid")
      ) {
        return errorResponse(error.message, 400);
      }

      console.error("Instructor application API error:", {
        name: error.name,
        message: error.message,
      });
    } else {
      console.error("Unknown instructor application API error.");
    }

    return errorResponse(
      "Something went wrong. Please try again later.",
      500
    );
  }
}
