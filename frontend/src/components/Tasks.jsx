import { useDispatch, useSelector } from "react-redux";
import { removeItem, resetTasks, toggleEdit } from "../features/tasksSlice";
import { FaEdit, FaTrash } from "react-icons/fa";

const Tasks = () => {
  const { isLoading, taskList } = useSelector((store) => store.tasks);
  const { authToken } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  if (!taskList.length && !isLoading) {
    return (
      <div className="my-16">
        <h1 className="font-mono sm:text-xl">
          You don't have any Tasks Try Adding One...
        </h1>
      </div>
    );
  }

  if (!taskList.length && isLoading) {
    return (
      <div className="flex items-center justify-center h-44">
        <span className="animate-spin inline-block  h-12 w-12  rounded-full text-white border-4 border-red-300  border-t-red-500"></span>
      </div>
    );
  }
  return (
    <div
      className={`py-3 px-6 my-8 sm:w-[33rem] mx-auto rounded-lg ${
        taskList.length > 0 && "border-2 border-red-400 bg-lime-100"
      }`}
    >
      {taskList.length > 0 && (
        <>
          <h2 className="font-mono text-xl mb-4 border-2 inline-block py-1 px-3 border-red-400 rounded-lg bg-yellow-50">
            Your Tasks
          </h2>
        </>
      )}
      {taskList?.map((item) => {
        const { task, _id: id } = item;
        return (
          <div
            key={id}
            className="flex justify-between items-center border-b-2"
          >
            <h3 className="text-2xl my-2 mx-3 break-all text-start">{task}</h3>
            <div className="flex-shrink-0">
              <button
                className="mx-3 "
                onClick={() => dispatch(toggleEdit({ id, task }))}
              >
                <FaEdit />
              </button>
              <button
                className="mx-3 text-red-600 "
                onClick={() => {
                  dispatch(removeItem({ id, authToken }));
                }}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Tasks;
