import { useSelector, useDispatch } from "react-redux";
import {
  addToList,
  editItem,
  resetTasks,
  searchTasks,
  setValue,
} from "./features/tasksSlice";
import { FiLogOut } from "react-icons/fi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "./features/authSlice";
import Tasks from "./components/Tasks";

function App() {
  const { value, isEdit, editId } = useSelector((store) => store.tasks);
  const { isLoggedIn, authToken, username } = useSelector(
    (store) => store.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    authToken && dispatch(searchTasks(authToken));
  }, []);

  useEffect(() => {
    if (!isLoggedIn || !authToken) {
      return navigate("/register");
    }
  }, []);

  return (
    <div className="bg-orange-200">
      <div className="text-center p-12 min-h-screen max-w-7xl mx-auto ">
        <div className="flex items-center justify-end text-xl my-3">
          {isLoggedIn ? (
            <p className="capitalize font-mono">Hi {username}</p>
          ) : null}
          <button
            className="flex items-center gap-x-2 mx-3 p-0.5 px-2 border-2 rounded-xl bg-red-300 border-red-400 hover:bg-orange-300 hover:scale-105 duration-300"
            onClick={() => {
              dispatch(logoutUser());
              dispatch(resetTasks())
              return navigate("/login");
            }}
          >
            <p>Log Out</p>
            <FiLogOut />
          </button>
        </div>
        <h1 className="font-semibold text-3xl mt-2 mb-7 pb-2 inline-block border-b-2 border-lime-300">
          Task Manager
        </h1>
        <form
          className="my-3 flex  md:justify-center items-center"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            className="w-[80%] md:w-[33rem]  border-2 h-12 px-3 rounded-md mr-2 border-red-300"
            placeholder="Enter your task"
            value={value}
            autoFocus={isEdit}
            onChange={(e) => dispatch(setValue(e.target.value))}
          />
          <button
            type="submit"
            className="py-2 px-5 font-bold border sm:ml-4 rounded-md bg-red-300 text-xl"
            onClick={() => {
              if (!value) return;
              !isEdit
                ? dispatch(addToList({ value, authToken }))
                : dispatch(editItem({ editId, value, authToken }));
            }}
          >
            {isEdit ? "Edit" : "Add"}
          </button>
        </form>
        <Tasks />
      </div>
    </div>
  );
}

export default App;
