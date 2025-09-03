import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const expectedPassword = process.env.STUDIO_PASSWORD;

    if (!expectedPassword) {
      return NextResponse.json(
        { error: "Studio password not configured" },
        { status: 500 }
      );
    }

    if (password === expectedPassword) {
      // Set a session cookie to remember authentication
      const response = NextResponse.json({ success: true });
      response.cookies.set("studio-auth", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours
      });
      return response;
    } else {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const authCookie = request.cookies.get("studio-auth");

    if (authCookie?.value === "authenticated") {
      return NextResponse.json({ authenticated: true });
    } else {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Authentication check failed" },
      { status: 500 }
    );
  }
}
