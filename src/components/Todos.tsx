import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchTodosAsync,
  markTodoAsCompleted,
  removeTodoItem,
} from "../store/todoSlice";

const Todos = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todo.list);
  const isLoading = useAppSelector((state) => state.todo.isLoading);

  useEffect(() => {
    dispatch(fetchTodosAsync());
  }, [dispatch]);

  const completeTodo = (todoIndex: number) => {
    dispatch(markTodoAsCompleted({ todoIndex }));
  };

  const removeTodo = (todoIndex: number) => {
    dispatch(removeTodoItem({ todoIndex }));
  };

  if (isLoading) {
    return <>"Loading..."</>;
  }

  return (
    <ul>
      {todos.map((todo, i) => (
        <li key={i}>
          <span
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.title}
          </span>
          {!todo.completed ? (
            <button onClick={() => completeTodo(i)}>complete</button>
          ) : (
            <button onClick={() => removeTodo(i)}>remove</button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Todos;
