import { setOpen } from "@/state/slices/SidebarSlice";
import { Menu } from "@mui/icons-material";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();

  return (
    <nav className="w-full h-16 border-b border-slate-100 px-4 flex items-center justify-between shadow-sm">
      <button onClick={() => dispatch(setOpen())}>
        <Menu />
      </button>
      <div className="flex items-center justify-center gap-x-4">
        <img src="/assets/logo.svg" className="w-10 h-10 object-contain" />
        <span>Employee Data Manager</span>
      </div>
      <div className="flex items-center justify-center rounded-full border-sky-300 border">
        <img
          src="/assets/illustrations/avatar_1.jpg"
          alt="Profile"
          className="w-8 h-8 object-contain rounded-full"
        />
      </div>
    </nav>
  );
};

export default Header;
