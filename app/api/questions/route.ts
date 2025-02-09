import { NextResponse } from "next/server";
import sql from "@/lib/db";

export const runtime = "edge";

//GET All questions
// export async function GET() {
//   try {
//     const data = await sql`SELECT * FROM questions ORDER BY created_at DESC;`;
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("Database Error:", error);
//     return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
//   }
// }
//GET Questions
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const offset = (page - 1) * limit;
    const categoryId = searchParams.get("categoryId");

    console.log(searchParams)

    let data;

    if (categoryId && categoryId !== "0") {
      data = await sql`
        SELECT * FROM questions 
        WHERE category_id = ${categoryId} 
        LIMIT ${limit} OFFSET ${offset};
      `;
    } else {
      data = await sql`
        SELECT * FROM questions  
        LIMIT ${limit} OFFSET ${offset};
      `;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

//POST a new question
export async function POST(req: Request) {
    try {
        const { question_text, category_id, expected_answer } = await req.json();
        const newQuestion = await sql`
            INSERT INTO questions (question_text, category_id, expected_answer)
            VALUES (${question_text}, ${category_id}, ${expected_answer})
            RETURNING *;
        `;
        return NextResponse.json(newQuestion[0]);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Failed to add question" }, { status: 500 });
    }
}