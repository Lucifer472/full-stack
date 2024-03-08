import ChartWrapper from "./ChartWrapper";
import { PieChart } from "@mui/x-charts";

const PieChartView = ({
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
      <PieChart
        series={[
          {
            data: Object.entries(chartData.data).map(([label, value], id) => ({
              id,
              value,
              label,
            })),
          },
        ]}
        height={280}
        margin={{ top: 10, bottom: 30, left: 40, right: 180 }}
      />
    </ChartWrapper>
  );
};

export default PieChartView;
