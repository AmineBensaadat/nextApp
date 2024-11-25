import { NextRequest, NextResponse } from "next/server";
import db from "../../../lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Define user type for TypeScript
interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    // Validate request data
    if (!username || !password) {
      return NextResponse.json({ message: "Missing username or password" }, { status: 400 });
    }

    // Check if user exists in the database
    const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
    const user: User | undefined = rows[0];

    if (!user) {
      return NextResponse.json({ message: "Invalid username or password" }, { status: 401 });
    }

    // Verify the password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json({ message: "Invalid username or password" }, { status: 401 });
    }

    // Set token expiration time (10 seconds)
    const expiresInSeconds = 10;

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET as string, // Ensure JWT_SECRET is defined in .env
      { expiresIn: expiresInSeconds }
    );

    // Respond with token and user details (excluding sensitive info)
    return NextResponse.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export function OPTIONS() {
  return NextResponse.json({}, { status: 200 }); // CORS preflight response if needed
}
