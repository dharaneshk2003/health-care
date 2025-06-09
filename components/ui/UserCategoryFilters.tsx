"use client"

import { useState } from "react"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface UserCategoryFiltersProps {
  onFilterChange: (category: string) => void
}

export function UserCategoryFilters({ onFilterChange }: UserCategoryFiltersProps) {
  const [activeCategory, setActiveCategory] = useState("all")
  const [advancedFilters, setAdvancedFilters] = useState({
    government: false,
    private: false,
    emergency: false,
    twentyFourHours: false,
    freeConsultation: false,
  })

  const categories = [
    { id: "All", name: "All Types" },
    { id: "Cardiology", name: "Cardiology" },
    { id: "Orthopedic", name: "Orthopedic" },
    { id: "Pediatric", name: "Pediatric" },
    { id: "Neurology", name: "Neurology" },
    { id: "Dermatology", name: "Dermatology" },
    { id: "Diagnostic", name: "Diagnostic" },
    { id: "Gynecology", name: "Gynecology" },
    { id: "Ophthalmology", name: "Ophthalmology" },
    { id: "Dental", name: "Dental" },
  ]

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId)
    onFilterChange(categoryId)
  }

  const handleAdvancedFilterChange = (key: string, checked: boolean) => {
    setAdvancedFilters((prev) => ({
      ...prev,
      [key]: checked,
    }))
  }

  const applyAdvancedFilters = () => {
    // In a real app, this would apply the filters
    return advancedFilters;
  }

  return (
    <div className="flex items-center mb-2">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-2 p-1">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={`rounded-full text-sm ${
                activeCategory === category.id
                  ? "bg-primary text-white"
                  : "text-foreground hover:bg-primary/10 hover:text-white"
              }`}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="ml-2 flex-shrink-0" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Advanced Filters</SheetTitle>
          </SheetHeader>
          <div className="py-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Hospital Type</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="government"
                    checked={advancedFilters.government}
                    onCheckedChange={(checked) => handleAdvancedFilterChange("government", checked as boolean)}
                  />
                  <Label htmlFor="government">Government Hospital</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="private"
                    checked={advancedFilters.private}
                    onCheckedChange={(checked) => handleAdvancedFilterChange("private", checked as boolean)}
                  />
                  <Label htmlFor="private">Private Hospital</Label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Services</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="emergency"
                    checked={advancedFilters.emergency}
                    onCheckedChange={(checked) => handleAdvancedFilterChange("emergency", checked as boolean)}
                  />
                  <Label htmlFor="emergency">Emergency Services</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="twentyFourHours"
                    checked={advancedFilters.twentyFourHours}
                    onCheckedChange={(checked) => handleAdvancedFilterChange("twentyFourHours", checked as boolean)}
                  />
                  <Label htmlFor="twentyFourHours">24-Hour Service</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="freeConsultation"
                    checked={advancedFilters.freeConsultation}
                    onCheckedChange={(checked) => handleAdvancedFilterChange("freeConsultation", checked as boolean)}
                  />
                  <Label htmlFor="freeConsultation">Free Consultation</Label>
                </div>
              </div>
            </div>
          </div>
          <SheetFooter>
            <Button className="w-full bg-primary hover:bg-secondary" onClick={applyAdvancedFilters}>
              Apply Filters
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}
