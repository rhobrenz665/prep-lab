import { NextResponse } from "next/server";
import sql from "@/lib/db";

//GET a single category by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const category = await sql`SELECT * FROM categories WHERE id = ${id};`;

        if (category.length === 0) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }
        return NextResponse.json(category[0]);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch category" }, { status: 500 });
    }
}

// DELETE a category by ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const deleted = await sql`DELETE FROM categories WHERE id = ${id} RETURNING *;`;

        if (deleted.length === 0) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Category deleted successfully", deleted });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
    }
}

// UPDATE a category by ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const { category_name } = await req.json();

        const updated = await sql`
            UPDATE categories
            SET category_name = ${category_name}
            WHERE id = ${id}
            RETURNING *;
        `;

        if (updated.length === 0) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }
        return NextResponse.json(updated[0]);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
    }
}
