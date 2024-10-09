import axios from "axios";
import { useState } from "react";
import Error from "../util/Error";
import ShouldRender from "../util/ShouldRender";
import { useNavigate } from "react-router-dom";

function NewProduct() {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    status: "",
  });
  const [hasError, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onInputChange = (evt) => {
    const newState = { ...todo, [evt.target.name]: evt.target.value };
    setTodo(newState);
  };

  const navigate = useNavigate();

  const onSaveBtn = async () => {
    try {
      const url = "https://cgc-todo-list.onrender.com/todo";
      await axios.post(url, todo);
      setSuccess(true);
      setTodo({
        title: "",
        description: "",
        status: "",
      });
      setTimeout(() => {
        navigate("/todo");
      }, 1000);
    } catch {
      setError(true);
    }
  };

  return (
    <div className="flex justify-center items-center mt-8">
      <div className="m-2 p-2 text-center w-full max-w-xl">
        <ShouldRender when={success}>
          <div className="py-2 my-4 w-full bg-primary text-white rounded text-center font-semibold">
            Successfully saved data
          </div>
        </ShouldRender>

        <ShouldRender when={hasError}>
          <Error msg="Failed to add todo, Please try again" />
        </ShouldRender>

        <h1 className="text-xl mb-6">New Task</h1>

        <div className="mb-4">
          <label className="block py-1">Title</label>
          <input
            name="title"
            value={todo.title}
            onChange={onInputChange}
            className="border border-gray-500 p-2 w-full rounded"
            placeholder="Title"
            type="text"
          />
          <ShouldRender when={!todo.title}>
            <div className="text-sm text-red-500 m-1">Title is required</div>
          </ShouldRender>
          <ShouldRender when={todo.title && todo.title.length < 3}>
            <div className="text-sm text-red-500 m-1">Min 3 chars</div>
          </ShouldRender>
          <ShouldRender when={todo.title && todo.title.length > 20}>
            <div className="text-sm text-red-500 m-1">Max 30 chars</div>
          </ShouldRender>
        </div>

        <div className="mb-4">
          <label className="block py-1">Description</label>
          <input
            name="description"
            value={todo.description}
            onChange={onInputChange}
            className="border border-gray-500 p-2 w-full rounded"
            placeholder="Description"
            type="text"
          />
          <ShouldRender when={!todo.description}>
            <div className="text-sm text-red-500 m-1">
              Description is required
            </div>
          </ShouldRender>
          <ShouldRender when={todo.description && todo.description.length < 6}>
            <div className="text-sm text-red-500 m-1">Min 6 chars</div>
          </ShouldRender>
          <ShouldRender when={todo.description && todo.description.length > 100}>
            <div className="text-sm text-red-500 m-1">Max 100 chars</div>
          </ShouldRender>
        </div>

        <div className="mt-4 mb-4">
          <label className="block py-1">Status</label>
          <select
            name="status"
            value={todo.status}
            onChange={onInputChange}
            className="border border-gray-500 p-2 w-full rounded"
          >
            <option value="">Select</option>
            <option value="in-progress">In progress</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          <ShouldRender when={!todo.status}>
            <div className="text-sm text-red-500 m-1">Status is required</div>
          </ShouldRender>
        </div>

        <div className="mb-4">
          <button
            disabled={!todo.title || !todo.description || !todo.status}
            onClick={onSaveBtn}
            className="bg-primary hover:bg-secondary text-white rounded px-4 py-1.5"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewProduct;
