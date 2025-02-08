// import { NextResponse } from "next/server";
// import sql from "@/lib/db";

// GET a single question by ID
// export async function GET(req: Request, { params }: { params: { id: string } }) {
//     try {
//         const { id } = params;
//         const question = await sql`SELECT * FROM questions WHERE id = ${id};`;

//         if (question.length === 0) {
//             return NextResponse.json({ error: "Question not found" }, { status: 404 });
//         }
//         return NextResponse.json(question[0]);
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ error: "Failed to fetch question" }, { status: 500 });
//     }
// }

// DELETE a question by ID
// export async function DELETE(req: Request, { params }: { params: { id: string } }) {
//     try {
//         const { id } = params;
//         const deleted = await sql`DELETE FROM questions WHERE id = ${id} RETURNING *;`;

//         if (deleted.length === 0) {
//             return NextResponse.json({ error: "Question not found" }, { status: 404 });
//         }
//         return NextResponse.json({ message: "Question deleted successfully", deleted });
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ error: "Failed to delete question" }, { status: 500 });
//     }
// }

// UPDATE a question by ID
// export async function PUT(req: Request, { params }: { params: { id: string } }) {
//     try {
//         const { id } = params;
//         const { question_text, category_id, expected_answer } = await req.json();

//         const updated = await sql`
//             UPDATE questions
//             SET question_text = ${question_text}, category_id = ${category_id}, expected_answer = ${expected_answer}
//             WHERE id = ${id}
//             RETURNING *;
//         `;

//         if (updated.length === 0) {
//             return NextResponse.json({ error: "Question not found" }, { status: 404 });
//         }
//         return NextResponse.json(updated[0]);
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ error: "Failed to update question" }, { status: 500 });
//     }
//}
