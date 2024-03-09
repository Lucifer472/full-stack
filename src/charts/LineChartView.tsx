import ChartWrapper from "./ChartWrapper";
import { LineChart } from "@mui/x-charts";

const LineChartView = ({
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
      <LineChart
        series={series}
        height={280}
        // @ts-expect-error ignore this
        xAxis={xAxis}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      />
    </ChartWrapper>
  );
};

export default LineChartView;
