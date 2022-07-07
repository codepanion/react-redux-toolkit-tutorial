import "./App.css";
import AddTodoForm from "./components/AddTodoForm";
import Todos from "./components/Todos";

function App() {
  return (
    <div className="App">
      <AddTodoForm />
      <Todos />
    </div>
  );
}

export default App;
