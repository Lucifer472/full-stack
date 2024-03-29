import { Close } from "@mui/icons-material";

interface PopupProps {
  children: React.ReactNode;
  setOpen: (v: boolean) => void;
  title: string;
}

const Popup = ({ children, setOpen, title }: PopupProps) => {
  return (
    <>
      <div className="min-w-[400px] max-w-[700px] overflow-hidden max-h-[400px] min-h-[200px] bg-white rounded-lg border border-slate-100 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col w-fit px-4 py-2 z-20">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={() => setOpen(false)}>
            <Close />
          </button>
        </div>
        {children}
      </div>
      <div className="fixed top-0 left-0 z-10 w-full h-full min-h-screen">
        <div className="absolute top-0 left-0 bg-black opacity-70 z-10 w-full h-full min-h-screen"></div>
      </div>
    </>
  );
};

export default Popup;
