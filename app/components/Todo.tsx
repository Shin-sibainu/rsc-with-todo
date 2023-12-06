import React, { useState, useEffect } from "react";

const Todo = ({ todo }: any) => {
  return (
    <div>
      <li className="py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="todo1"
              name="todo1"
              type="checkbox"
              className="h-4 w-4 text-teal-600 focus:ring-teal-500
              border-gray-300 rounded"
            />
            <label className="ml-3 block text-gray-900">
              <span className={`text-lg font-medium mr-2`}>{todo.title}</span>
            </label>
          </div>
        </div>
      </li>
    </div>
  );
};

export default Todo;
