import useFetchTotalDonationStatus from '@/hooks/useFetchTotalDonationStatus';
import { Pie, PieChart } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
  status: {
    label: 'Donation Status',
  },
  ACCEPTED: {
    label: 'Accepted',
  },
  REJECTED: {
    label: 'Rejected',
  },
  count: {
    label: 'Count',
  },
} satisfies ChartConfig;

const ResPieChart = () => {
  const { chartData } = useFetchTotalDonationStatus();
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Donation Status Chart</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[500px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="count" nameKey="status" />
            <ChartLegend
              content={<ChartLegendContent nameKey="status" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Showing donation status by the current user
        </div>
      </CardFooter>
    </Card>
  );
};

export default ResPieChart;
