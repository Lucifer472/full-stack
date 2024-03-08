import toast from "react-hot-toast";
import { apiUrl } from "@/constant";
import { Close } from "@mui/icons-material";

interface ChartWrapperProps {
  id: number;
  chartName: string;
  children: React.ReactNode;
}

const ChartWrapper = ({ id, chartName, children }: ChartWrapperProps) => {
  const handleDelete = () => {
    fetch(apiUrl + "/delete/chart/" + id, {
      method: "delete",
    }).then((res) =>
      res.json().then((r) => {
        if (r.success) {
          toast.success("Chart Remove Successfully");
        } else {
          toast.error("Something went wrong!");
        }
      })
    );
  };

  return (
    <div className="min-w-[250px] w-full min-h-[280px] space-y-2 border border-slate-300 rounded-md p-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xs text-gray-700 font-bold">{chartName}</h2>
        <button onClick={handleDelete}>
          <Close
            sx={{
              width: "20px",
            }}
          />
        </button>
      </div>
      {children}
    </div>
  );
};

export default ChartWrapper;
