"use server";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export const addTodo = async (formData: FormData) => {
  const title = formData.get("title");

  if (!title) {
    console.error("Title is required");
    return;
  }

  try {
    await prisma.todo.create({
      data: {
        title: title?.toString(),
        isCompleted: false,
      },
    });
  } catch (err) {
    console.log(err);
  } finally {
    revalidatePath("/", "layout");
    redirect("/");
  }
};
