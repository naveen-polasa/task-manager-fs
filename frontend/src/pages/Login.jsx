import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../features/authSlice";

const Login = () => {
  const { isLoggedIn } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const formData = Object.fromEntries(data);
    dispatch(loginThunk(formData));
  };
  return (
    <div className="max-w-7xl mx-auto min-h-screen bg-orange-200 ">
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center flex-col gap-y-3 pt-24 py-3 w-96 sm:w-[30rem] md: mx-auto"
      >
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
        <p>{isLoggedIn && "User Logged In"}</p>
        <button
          type="submit"
          className="py-2 px-5 font-bold border w-[80%] md:w-[33rem] rounded-md bg-red-300 text-xl"
        >
          Login
        </button>
      </form>
    </div>
  );
};
export default Login;
