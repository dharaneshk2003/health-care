"use client"

import { useState } from "react"
import { BarChart3, PieChart, TrendingUp, Activity, ArrowUpRight, ArrowDownRight, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import BarGraph from "../Graphs/BarGraph.tsx"
import { PieChartView } from "../Graphs/PieChartView.tsx"
import BarGraphCompare from "../Graphs/BarGraphCompare.tsx"
import { PieChartRevenue } from "../Graphs/PieChartRevenue.tsx"
export function SupervisorAnalytics() {
  const [timeRange, setTimeRange] = useState("month")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last 7 Days</SelectItem>
              <SelectItem value="month">Last 30 Days</SelectItem>
              <SelectItem value="quarter">Last 3 Months</SelectItem>
              <SelectItem value="year">Last 12 Months</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Appointments</CardDescription>
            <CardTitle className="text-2xl">1,248</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm">
              <ArrowUpRight className="h-4 w-4 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">12.5%</span>
              <span className="text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Refferal Fees Generated</CardDescription>
            <CardTitle className="text-2xl">₹3,43,850</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm">
              <ArrowDownRight className="h-4 w-4 mr-1 text-red-500" />
              <span className="text-red-500 font-medium">1.23%</span>
              <span className="text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-2xl">₹12,48,500</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm">
              <ArrowUpRight className="h-4 w-4 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">8.7%</span>
              <span className="text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-full h-full flex items-center justify-center">
          <BarGraph />
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <PieChartView />
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <BarGraphCompare />
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <PieChartRevenue/>  
        </div>
      </div>
    </div>
  )
}
