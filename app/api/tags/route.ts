import { NextResponse } from "next/server";
import sql from "@/lib/db";

// GET all tags
export async function GET() {
    try {
        const tags = await sql`SELECT * FROM tags;`;
        return NextResponse.json(tags);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch tags" }, { status: 500 });
    }
}

// POST a new tag
export async function POST(req: Request) {
    try {
        const { tag_name } = await req.json();
        const newTag = await sql`
            INSERT INTO tags (tag_name) 
            VALUES (${tag_name})
            RETURNING *;
        `;
        return NextResponse.json(newTag[0]);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to add tag" }, { status: 500 });
    }
}