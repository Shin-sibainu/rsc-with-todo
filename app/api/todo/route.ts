import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const allTodos = await prisma.todo.findMany();
    return NextResponse.json(allTodos);
  } catch (err) {
    return NextResponse.json(err);
  }
}

export async function POST(req: Request) {
  const { title, isCompleted } = await req.json();
  try {
    const allTodos = await prisma.todo.create({
      data: {
        title,
        isCompleted,
      },
    });

    return NextResponse.json(allTodos);
  } catch (err) {
    return NextResponse.json(err);
  }
}
