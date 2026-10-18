import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { full_name, email, phone_number, mode } = body;

    // Validate required fields
    if (!full_name || !email || !phone_number || !mode) {
      return NextResponse.json(
        { message: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const frappeUrl = process.env.FRAPPE_URL;
    const apiKey = process.env.FRAPPE_API_KEY;
    const apiSecret = process.env.FRAPPE_API_SECRET;

    if (!frappeUrl || !apiKey || !apiSecret) {
      console.error("Frappe environment variables are missing.");

      return NextResponse.json(
        { message: "Server configuration error." },
        { status: 500 }
      );
    }

    const response = await fetch(
      `${frappeUrl}/api/resource/Student%20Applicant`,
      {
        method: "POST",
        headers: {
          Authorization: `token ${apiKey}:${apiSecret}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          full_name,
          email,
          phone_number,
          mode,
        }),
        cache: "no-store",
      }
    );

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      console.error("Frappe API error:", result);

      return NextResponse.json(
        {
          message:
            result?.exception ||
            result?.message ||
            "Unable to submit your application.",
        },
        { status: response.status }
      );
    }

    return NextResponse.json(
      {
        message: "Your application has been submitted successfully!",
        data: result?.data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Student application error:", error);

    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}