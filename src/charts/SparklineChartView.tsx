import ChartWrapper from "./ChartWrapper";
import { SparkLineChart } from "@mui/x-charts";

const SparklineChartView = ({
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
  return (
    <ChartWrapper chartName={chartData.chartName} id={chartData.id}>
      <SparkLineChart
        data={Object.values(chartData.data)}
        height={280}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      />
    </ChartWrapper>
  );
};

export default SparklineChartView;
