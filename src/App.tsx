import { useEffect, useState } from "react";
import supabase from "./supabase";

interface Todo {
  id: number;
  created_at: Date;
  name?: string;
  isCompleted: boolean;
}
export default function App() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const fetchTodos = async () => {
    const { data, error } = await supabase.from("TodoList Items").select("*");
    if (error) {
      console.log("Error fetching todos todo", error);
    } else {
      setTodoList(data as Todo[]);
    }
  };
  const addTodo = async () => {
    const newTodoData = { name: newTodo, isCompleted: false };

    const { data, error } = await supabase
      .from("TodoList Items")
      .insert([newTodoData])
      .single();

    if (error) {
      console.log("Error adding todo", error);
    } else {
      setTodoList((prevTodo) => [...prevTodo, data]);
      setNewTodo("");
    }
  };

  const completeTask = async (id: number, isCompleted: boolean) => {
    const { data, error } = await supabase
      .from("TodoList Items")
      .update({ isCompleted: !isCompleted })
      .eq("id", id);

    if (error) {
      console.log("Error adding todo", error);
    } else {
      const updatedTodoList = todoList.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : todoList
      );

      setTodoList(updatedTodoList as Todo[]);
    }
  };

  const deleteTask = async (id: number) => {
    const { data, error } = await supabase
      .from("TodoList Items")
      .delete()
      .eq("id", id);

    if (error) {
      console.log(error);
    } else {
      const updatedList = todoList.filter((todo) => todo.id !== id);
      setTodoList(updatedList);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          placeholder="New Todo"
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add new todo item</button>
      </div>
      <ul>
        {todoList.map((todo, index) => (
          <div key={index}>
            <li>{todo?.name}</li>
            <button onClick={() => completeTask(todo.id, todo.isCompleted)}>
              {todo.isCompleted ? "undo" : "completed"}
            </button>
            <button onClick={() => deleteTask(todo.id)}>Delete Task</button>
          </div>
        ))}
      </ul>
    </div>
  );
}
