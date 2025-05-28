"use client";

import { TrendingUp } from "lucide-react";
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
  { type: "firstTime", patients: 275, fill: "hsl(var(--chart-1))" },
  { type: "emergency", patients: 200, fill: "hsl(var(--chart-2))" },
  { type: "followUp", patients: 187, fill: "hsl(var(--chart-3))" },
];

const chartConfig = {
  patients: {
    label: "Patients",
  },
  firstTime: {
    label: "1st Time",
    color: "hsl(var(--chart-1))",
  },
  emergency: {
    label: "Emergency",
    color: "hsl(var(--chart-2))",
  },
  followUp: {
    label: "Follow-up",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function PieChartView() {
  return (
    <Card className="flex flex-col w-full h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Appointment Type</CardTitle>
        <CardDescription>during online</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey="patients"
              nameKey="type"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={false}
            >
              <LabelList
                dataKey="type"
                className="fill-background"
                stroke="none"
                fontSize={12}
              />
            </Pie>
            <Tooltip
              formatter={(value, name, props) => [
                `${value} patients`,
                chartConfig[props.payload.type]?.label,
              ]}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Pie chart showing appointment types distribution
        </div>
      </CardFooter>
    </Card>
  );
}
