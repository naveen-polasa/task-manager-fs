import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginThunk } from "../features/authSlice";
import { searchTasks } from "../features/tasksSlice";
import { toast } from "react-toastify";
const Login = () => {
  const { isLoggedIn, authToken } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const formData = Object.fromEntries(data);
    dispatch(loginThunk(formData));
  };

  useEffect(() => {
    if (isLoggedIn && authToken) {
      dispatch(searchTasks(authToken));
      return navigate("/tasks");
    }
  }, [isLoggedIn, authToken]);

  return (
    <div className="bg-orange-200">
      <div className="max-w-7xl mx-auto min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center flex-col gap-y-3 pt-24 py-3 w-96 sm:w-[30rem] md: mx-auto"
        >
          <h1 className="font-semibold text-3xl mt-2 mb-7 pb-2 inline-block border-b-2 border-lime-300">
            Task Manager
          </h1>
          <h2 className="font-mono text-2xl my-2">Login</h2>
          <input
            type="email"
            name="email"
            className="w-[80%] md:w-[33rem]  border-2 h-12 px-3 rounded-md border-red-300"
            placeholder="Enter your Email"
            required
          />
          <input
            type="password"
            name="password"
            className="w-[80%] md:w-[33rem]  border-2 h-12 px-3 rounded-md  border-red-300"
            placeholder="Enter your password"
            required
          />
          <button
            type="submit"
            className="py-2 px-5 font-bold border w-[80%] md:w-[33rem] rounded-md bg-red-300 text-xl"
          >
            Login
          </button>
          <Link
            to="/register"
            className="border-2 border-red-300 px-3 rounded-xl hover:bg-orange-300 duration-300"
          >
            <p>Don't Have An Account? Register Here</p>
          </Link>
        </form>
      </div>
    </div>
  );
};
export default Login;
