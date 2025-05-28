"use client";

import { LabelList, Pie, PieChart, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart";

const chartData = [
  { source: "referral", revenue: 68000, fill: "hsl(var(--chart-1))" },
  { source: "direct", revenue: 40000, fill: "hsl(var(--chart-2))" },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
  },
  referral: {
    label: "Referral",
    color: "hsl(var(--chart-1))",
  },
  direct: {
    label: "Booking",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function PieChartRevenue() {
  return (
    <Card className="flex flex-col w-full h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Revenue Breakdown</CardTitle>
        <CardDescription>by source of appointment</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey="revenue"
              nameKey="source"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={false}
            >
              <LabelList
                dataKey="source"
                className="fill-background"
                stroke="none"
                fontSize={12}
                position="inside"
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
            <Tooltip
              formatter={(value, name, props) => [
                `₹${value.toLocaleString()}`,
                chartConfig[props.payload.source]?.label,
              ]}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Pie chart showing revenue from different sources
        </div>
      </CardFooter>
    </Card>
  );
}
