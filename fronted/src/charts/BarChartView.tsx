import { BarChart } from "@mui/x-charts/BarChart";
import ChartWrapper from "./ChartWrapper";

const BarChartView = ({
  chartData,
}: {
  chartData: {
    chartName: string;
    chartType: string;
    data: { [key: string]: number };
    headerId: number;
    id: number;
  };
}) => {
  const series = [{ data: Object.values(chartData.data) }];
  const xAxis = [{ data: Object.keys(chartData.data), scaleType: "band" }];

  return (
    <ChartWrapper chartName={chartData.chartName} id={chartData.id}>
      <BarChart
        series={series}
        height={280}
        // @ts-expect-error ignore this
        xAxis={xAxis}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      />
    </ChartWrapper>
  );
};

export default BarChartView;
