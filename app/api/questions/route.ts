import { NextResponse } from "next/server";
import sql from "@/lib/db"; // Import Neon connection

export const runtime = "edge"; // Optimize for Edge Functions

export async function GET() {
  try {
    const data = await sql`SELECT * FROM questions ORDER BY created_at DESC;`;
    return NextResponse.json(data);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}