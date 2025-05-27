"use client"

import { useState } from "react"
import { BarChart3, PieChart, TrendingUp, Activity, ArrowUpRight, ArrowDownRight, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
            <CardDescription>Online Bookings</CardDescription>
            <CardTitle className="text-2xl">856</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm">
              <ArrowUpRight className="h-4 w-4 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">18.2%</span>
              <span className="text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Offline Bookings</CardDescription>
            <CardTitle className="text-2xl">392</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm">
              <ArrowDownRight className="h-4 w-4 mr-1 text-red-500" />
              <span className="text-red-500 font-medium">4.8%</span>
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

      <Tabs defaultValue="appointments">
        <TabsList className="mb-4">
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="staff">Staff Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Appointment Trends</CardTitle>
                <CardDescription>Number of appointments over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="w-full h-full flex items-center justify-center">
                  <BarChart3 className="h-16 w-16 text-muted-foreground/50" />
                  <span className="sr-only">Bar chart showing appointment trends</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Appointment Distribution</CardTitle>
                <CardDescription>By department</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="w-full h-full flex items-center justify-center">
                  <PieChart className="h-16 w-16 text-muted-foreground/50" />
                  <span className="sr-only">Pie chart showing appointment distribution</span>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Appointment Status</CardTitle>
                <CardDescription>Completed vs. cancelled appointments</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="w-full h-full flex items-center justify-center">
                  <BarChart3 className="h-16 w-16 text-muted-foreground/50" />
                  <span className="sr-only">Bar chart showing appointment status</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patients">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Demographics</CardTitle>
                <CardDescription>Age and gender distribution</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="w-full h-full flex items-center justify-center">
                  <PieChart className="h-16 w-16 text-muted-foreground/50" />
                  <span className="sr-only">Pie chart showing patient demographics</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Patient Acquisition</CardTitle>
                <CardDescription>New vs. returning patients</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="w-full h-full flex items-center justify-center">
                  <BarChart3 className="h-16 w-16 text-muted-foreground/50" />
                  <span className="sr-only">Bar chart showing patient acquisition</span>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Patient Location Map</CardTitle>
                <CardDescription>Geographic distribution of patients</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src="/placeholder.svg?height=300&width=800&text=Patient+Location+Map"
                    alt="Patient Location Map"
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
                <CardDescription>Monthly revenue over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="w-full h-full flex items-center justify-center">
                  <TrendingUp className="h-16 w-16 text-muted-foreground/50" />
                  <span className="sr-only">Line chart showing revenue trends</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue by Department</CardTitle>
                <CardDescription>Distribution across specialties</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="w-full h-full flex items-center justify-center">
                  <PieChart className="h-16 w-16 text-muted-foreground/50" />
                  <span className="sr-only">Pie chart showing revenue by department</span>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Payment Method Analysis</CardTitle>
                <CardDescription>Distribution of payment methods used</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="w-full h-full flex items-center justify-center">
                  <BarChart3 className="h-16 w-16 text-muted-foreground/50" />
                  <span className="sr-only">Bar chart showing payment method analysis</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="staff">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Doctor Performance</CardTitle>
                <CardDescription>Appointments handled by each doctor</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="w-full h-full flex items-center justify-center">
                  <BarChart3 className="h-16 w-16 text-muted-foreground/50" />
                  <span className="sr-only">Bar chart showing doctor performance</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Staff Efficiency</CardTitle>
                <CardDescription>Average handling time per appointment</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="w-full h-full flex items-center justify-center">
                  <Activity className="h-16 w-16 text-muted-foreground/50" />
                  <span className="sr-only">Line chart showing staff efficiency</span>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Department Workload</CardTitle>
                <CardDescription>Distribution of appointments across departments</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="w-full h-full flex items-center justify-center">
                  <BarChart3 className="h-16 w-16 text-muted-foreground/50" />
                  <span className="sr-only">Bar chart showing department workload</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
