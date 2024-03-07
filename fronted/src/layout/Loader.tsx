import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[350px] min-h-[200px] bg-white rounded-md z-20">
        <div className="flex flex-col items-center justify-center w-full h-full min-h-[200px] gap-y-4">
          <h3 className="text-xl font-semibold">Loading...</h3>
          <ClipLoader
            size={60}
            cssOverride={{
              borderWidth: "6px",
            }}
          />
        </div>
      </div>
      <div className="absolute top-0 left-0 bg-black opacity-70 z-10 w-full h-full min-h-screen"></div>
    </>
  );
};

export default Loader;
