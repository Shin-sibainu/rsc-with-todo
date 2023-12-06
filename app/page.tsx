"use client";

import { useState, useEffect } from "react";
import Todo from "./components/Todo";
import { useRouter } from "next/navigation";

const API_URL = "http://localhost:3000/api";

export default function Home() {
  const [todos, setTodos] = useState<any>([]);
  const [title, setTitle] = useState<string>("");
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

  //old fetching
  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newTodo = { title, isCompleted: false };
      const response = await fetch(`${API_URL}/todo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) {
        throw new Error("サーバーエラーが発生しました");
      }

      // 新しい Todo をリストに追加
      const addedTodo = await response.json();
      setTodos([...todos, addedTodo]);
      setTitle("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-32 py-4 px-4">
      <div className="px-4 py-2">
        <h1 className="text-gray-800 font-bold text-2xl uppercase">
          To-Do List
        </h1>
      </div>
      <form
        className="w-full max-w-sm mx-auto px-4 py-2"
        onSubmit={(e: React.FormEvent) => addTodo(e)}
      >
        <div className="flex items-center border-b-2 border-teal-500 py-2">
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Add a task"
            value={title}
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
