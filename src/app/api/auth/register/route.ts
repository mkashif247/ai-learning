import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

import { connectDB, User } from "@/lib/db";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = await request.json();

    const result = registerSchema.safeParse(body);
    if (!result.success) {
      const firstIssue = result.error.issues[0];
      return NextResponse.json(
        { success: false, error: firstIssue?.message || "Validation failed" },
        { status: 400 },
      );
    }

    const { name, email, password } = result.data;

    await connectDB();

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "Email already registered" },
        { status: 400 },
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({
      success: true,
      data: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create account" },
      { status: 500 },
    );
  }
}
