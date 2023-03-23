import { useSelector, useDispatch } from "react-redux";
import {
  addToList,
  removeItem,
  searchTasks,
  setValue,
  toggleBtn,
} from "./features/tasksSlice";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
function App() {
  const { value, taskList } = useSelector((store) => store.tasks);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchTasks());
  }, []);
  // useEffect(() => {}, [taskList]);
  return (
    <div className="bg-orange-200">
      <div className="text-center p-12 min-h-screen max-w-7xl mx-auto ">
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
            onChange={(e) => dispatch(setValue(e.target.value))}
          />
          <button
            type="submit"
            className="py-2 px-5 font-bold border sm:mx-4 rounded-md bg-red-300 text-xl"
            onClick={() => {
              if (!value) return;
              dispatch(addToList(value));
            }}
          >
            {/* {isEdit.flag && task ? "Edit" : "Add"} */}Add
          </button>
        </form>
        <div
          className={`py-3 px-6 my-8 sm:w-[27rem] mx-auto rounded-lg ${
            taskList.length > 0 && "border-2 border-red-400 bg-lime-100"
          }`}
        >
          {taskList.length > 0 && (
            <h2 className="font-mono text-xl mb-4 border-2 inline-block py-1 px-3 border-red-400 rounded-lg bg-yellow-50">
              Your Tasks
            </h2>
          )}
          {taskList.map((item, index) => {
            const { task, _id: id } = item;
            console.log(id);
            return (
              <div
                key={id}
                className="flex justify-between items-center border-b-2"
              >
                <h3 className="text-2xl my-2 mx-3 break-all text-start">
                  {task}
                </h3>
                <div className="flex-shrink-0">
                  <button className="mx-3 " onClick={() => editItem(index)}>
                    <FaEdit />
                  </button>
                  <button
                    className="mx-3 text-red-600 "
                    onClick={() => {
                      dispatch(removeItem(id));
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
