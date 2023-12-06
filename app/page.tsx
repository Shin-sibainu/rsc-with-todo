"use client";
import { useState, useEffect, useRef } from "react";
import Todo from "./components/Todo";
import { addTodo } from "./lib/actions";
import { useRouter } from "next/navigation";

const API_URL = "http://localhost:3000/api";

export default function Home() {
  const [todos, setTodos] = useState<any>([]);
  // const [title, setTitle] = useState<string>("");
  const ref = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAllTodos = async () => {
      try {
        const res = await fetch(`${API_URL}/todo`);
        const allTodos = await res.json();
        setTodos(allTodos);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAllTodos();
  }, []);

  //prev data post
  // const addTodo = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   try {
  //     const res = await fetch(`${API_URL}/todo`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ title, isCompleted: false }),
  //     });
  //     const addedTodo = await res.json();
  //     setTodos([...todos, addedTodo]);
  //     setTitle("");
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  //ServerActions
  // const addTodo = async (formData: FormData) => {
  //   "use server";

  //   const title = formData.get("title");

  //   if (!title) {
  //     console.error("Title is required");
  //     return;
  //   }

  //   try {
  //     await prisma.todo.create({
  //       data: {
  //         title: title?.toString(),
  //         isCompleted: false,
  //       },
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-32 py-4 px-4">
      <div className="px-4 py-2">
        <h1 className="text-gray-800 font-bold text-2xl uppercase">
          To-Do List
        </h1>
      </div>
      <form
        className="w-full max-w-sm mx-auto px-4 py-2"
        action={async (formData) => {
          await addTodo(formData);
          ref.current?.reset();
          router.refresh();
        }}
        ref={ref}
      >
        <div className="flex items-center border-b-2 border-teal-500 py-2">
          <input
            // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            //   setTitle(e.target.value)
            // }
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Add a task"
            // value={title}
            name="title"
          />
          <button
            className="duration-150 flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
      <ul className="divide-y divide-gray-200 px-4">
        {todos?.map((todo: any) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}
