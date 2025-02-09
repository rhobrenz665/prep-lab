import { NextResponse } from "next/server";
import sql from "@/lib/db";

// GET all categories
export async function GET() {
    try {
        const categories = await sql`SELECT * FROM categories;`;
        return NextResponse.json(categories);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
    }
}

// POST a new category
export async function POST(req: Request) {
    try {
        const { category_name } = await req.json();
        const newCategory = await sql`
            INSERT INTO categories (category_name) 
            VALUES (${category_name})
            RETURNING *;
        `;
        return NextResponse.json(newCategory[0]);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to add category" }, { status: 500 });
    }
}