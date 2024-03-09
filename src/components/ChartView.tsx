import { useEffect } from "react";
import PageTitle from "./PageTitle";
import { apiUrl } from "@/constant";
import toast from "react-hot-toast";
import BarChartView from "@/charts/BarChartView";
import LineChartView from "@/charts/LineChartView";
import PieChartView from "@/charts/PieChartView";
import SparklineChartView from "@/charts/SparklineChartView";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { setChart } from "@/state/slices/ChartSlice";

const ChartView = () => {
  const chart = useSelector((state: RootState) => state.chart.data);
  const data = useSelector((state: RootState) => state.table.data);

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      fetch(apiUrl + "/fetch/chart/" + data.id, {
        method: "GET",
      }).then((res) =>
        res.json().then((r) => {
          if (r.success) {
            if (r.success.length > 0) {
              dispatch(setChart(r.success));
            } else {
              dispatch(setChart(null));
            }
          } else {
            toast.error("Something went wrong!");
          }
        })
      );
    }
  }, [data, dispatch]);

  return (
    <div className="flex flex-col w-full gap-y-4 mt-6">
      <PageTitle title="Chart View" />
      <div className="w-full bg-white rounded-md shadow border border-slate-100 flex flex-col gap-y-4 p-4">
        {!data ||
          (!chart && (
            <h2 className="w-full flex items-center justify-center min-h-[300px] text-4xl font-bold">
              No Chart Yet!
            </h2>
          ))}
        {chart && (
          <div className="w-full flex items-center justify-start gap-x-2 gap-y-4 flex-wrap">
            {chart.map((c, index: number) => {
              switch (c.chartType) {
                case "bar":
                  return <BarChartView chartData={c} key={index} />;
                case "line":
                  return <LineChartView chartData={c} key={index} />;
                case "pie":
                  return <PieChartView chartData={c} key={index} />;
                case "sparkline":
                  return <SparklineChartView chartData={c} key={index} />;
                default:
                  return <BarChartView chartData={c} key={index} />;
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartView;
