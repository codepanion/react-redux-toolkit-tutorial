import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  title: string;
  completed: boolean;
}

interface TodoState {
  list: Array<Todo>;
  isLoading: boolean;
}

const initialState: TodoState = {
  list: [],
  isLoading: true,
};

export const fetchTodosAsync = createAsyncThunk("todo/fetchTodos", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");

  return response.json() as Promise<TodoState["list"]>;
});

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.list = [...state.list, action.payload];
    },
    markTodoAsCompleted: (
      state,
      action: PayloadAction<{ todoIndex: number }>
    ) => {
      state.list = state.list.map((todo, i) => {
        if (action.payload.todoIndex === i) {
          return {
            ...todo,
            completed: true,
          };
        }

        return todo;
      });
    },
    removeTodoItem: (state, action: PayloadAction<{ todoIndex: number }>) => {
      state.list = state.list.filter((_, i) => i !== action.payload.todoIndex);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosAsync.pending, (state, action) => {
        console.log("action", action);
        state.isLoading = true;
      })
      .addCase(fetchTodosAsync.fulfilled, (state, action) => {
        state.list = action.payload.slice(0, 10);
        state.isLoading = false;
      })
      .addCase(fetchTodosAsync.rejected, (state, action) => {
        console.log("action", action);
        state.isLoading = false;
        // TODO: show an error message
      });
  },
});

export const { addTodo, markTodoAsCompleted, removeTodoItem } =
  todoSlice.actions;

export default todoSlice.reducer;
