import { NextRequest, NextResponse } from "next/server";
import { validateEmail } from "@/lib/utils/emailValidation";
import { API_CONFIG } from "@/lib/constants";

export async function POST(request: NextRequest) {
  try {
    const body = await request.formData();
    const email = body.get("email") as string;

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }

    // Validates the email format
    if (!validateEmail(email)) {
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
    }

    // Submits the email to the Loops Newsletter API
    const formBody = `userGroup=&mailingLists=&email=${encodeURIComponent(email)}`;

    const response = await fetch(API_CONFIG.LOOPS_API_URL, {
      method: "POST",
      body: formBody,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      return NextResponse.json(
        { message: data.message || response.statusText || "Failed to submit email" },
        { status: response.status }
      );
    }
    // Returns a success message
    return NextResponse.json(
      { message: "Successfully subscribed!", success: true },
      { status: 200 }
    );
  } catch (error) {
    // Logs the error
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { message: "Something went wrong, please try again" },
      { status: 500 }
    );
  }
}
