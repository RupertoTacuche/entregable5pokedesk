import { BiLogOut } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setNameTrainer } from "../store/slices/nameTrainer.slice";

export const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setNameTrainer(""));
  };

  return (
    <div
      onClick={handleLogout}
      className="fixed right-2 bottom-2 h-20 w-20 bg-indigo-500 text-white text-4xl flex justify-center items-center rounded-full cursor-pointer shadow-xl hover:bg-indigo-300"
    >
      <BiLogOut />
    </div>
  );
};
