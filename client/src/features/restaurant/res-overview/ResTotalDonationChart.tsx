import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import useFetchTotalDonations from '@/hooks/useFetchTotalDonations';

const chartConfig: ChartConfig = {
  donations: {
    label: 'Donations',
    color: '#004D40',
  },
};

const ResTotalDonationChart = () => {
  const { totalDonations } = useFetchTotalDonations();

  return (
    <Card className="w-full flex flex-col">
      <CardHeader className="text-center">
        <CardTitle>Total Donation Chart</CardTitle>
        <CardDescription>Showing total donations</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={chartConfig} className="mx-auto aspect-video max-h-[500px]">
          <AreaChart
            data={totalDonations}
            margin={{
              left: 12,
              right: 12,
            }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 10)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
            <Area
              dataKey="count"
              type="natural"
              fill="var(--color-donations)"
              name="donations"
              fillOpacity={0.4}
              stroke="#000000"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ResTotalDonationChart;
