// import { NextResponse } from "next/server";
// import sql from "@/lib/db";

// GET a single tag by ID
// export async function GET(req: Request, { params }: { params: { id: string } }) {
//     try {
//         const { id } = params;
//         const tag = await sql`SELECT * FROM tags WHERE id = ${id};`;

//         if (tag.length === 0) {
//             return NextResponse.json({ error: "Tag not found" }, { status: 404 });
//         }
//         return NextResponse.json(tag[0]);
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ error: "Failed to fetch tag" }, { status: 500 });
//     }
// }

// DELETE a tag by ID
// export async function DELETE(req: Request, { params }: { params: { id: string } }) {
//     try {
//         const { id } = params;
//         const deleted = await sql`DELETE FROM tags WHERE id = ${id} RETURNING *;`;

//         if (deleted.length === 0) {
//             return NextResponse.json({ error: "Tag not found" }, { status: 404 });
//         }
//         return NextResponse.json({ message: "Tag deleted successfully", deleted });
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ error: "Failed to delete tag" }, { status: 500 });
//     }
// }

// UPDATE a tag by ID
// export async function PUT(req: Request, { params }: { params: { id: string } }) {
//     try {
//         const { id } = params;
//         const { tag_name } = await req.json();

//         const updated = await sql`
//             UPDATE tags
//             SET tag_name = ${tag_name}
//             WHERE id = ${id}
//             RETURNING *;
//         `;

//         if (updated.length === 0) {
//             return NextResponse.json({ error: "Tag not found" }, { status: 404 });
//         }
//         return NextResponse.json(updated[0]);
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ error: "Failed to update tag" }, { status: 500 });
//     }
//}
