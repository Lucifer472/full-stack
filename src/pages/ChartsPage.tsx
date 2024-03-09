import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiUrl } from "@/constant";

import Loader from "@/layout/Loader";
import BarChartView from "@/charts/BarChartView";
import LineChartView from "@/charts/LineChartView";
import PieChartView from "@/charts/PieChartView";
import SparklineChartView from "@/charts/SparklineChartView";
import PageTitle from "@/components/PageTitle";

const ChartsPage = () => {
  const [data, setData] = useState<
    | {
        id: number;
        chartName: string;
        chartType: string;
        data: { [key: string]: number };
        headerId: number;
      }[]
    | null
  >(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(apiUrl + "/fetch/charts", {
      method: "GET",
    }).then((res) =>
      res.json().then((r) => {
        if (r.success) {
          setData(r.success);
        } else {
          toast.error("Something Went Wrong!");
        }
        setLoading(false);
      })
    );
  }, []);
  return (
    <section className="global-container">
      {loading && <Loader />}
      <div className="flex flex-col gap-y-4 w-full">
        <PageTitle title="All Created Charts" />
      </div>
      <div className="w-full bg-white p-4 rounded-md shadow border border-slate-100 mt-4 flex flex-col gap-y-1">
        {data && (
          <div className="w-full flex items-center justify-start gap-x-2 gap-y-4 flex-wrap">
            {data.map((c, index: number) => {
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
        {!data ||
          (data.length < 1 && (
            <div className="flex items-center justify-center min-h-[300px]">
              <h2 className="text-2xl font-medium">No Chart Found!</h2>
            </div>
          ))}
      </div>
    </section>
  );
};

export default ChartsPage;
