import * as React from "react";
import { useAppDispatch } from "../store/hooks";
import { addTodo } from "../store/todoSlice";

const AddTodoForm = () => {
  const dispatch = useAppDispatch();
  const [newTodoTitle, setNewTodoTitle] = React.useState("");

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      addTodo({
        title: newTodoTitle,
        completed: false,
      })
    );

    setNewTodoTitle("");
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <input
        type="text"
        onChange={(e) => setNewTodoTitle(e.target.value)}
        value={newTodoTitle}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;
