import React, { useState } from "react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

export default function SimpleTimePicker({ time, onTimeChange }) {
  const [open, setOpen] = useState(false)

  const [hour, setHour] = useState("")
  const [minute, setMinute] = useState("")
  const [period, setPeriod] = useState("AM")

  const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"))
  const minutes = ["00", "15", "30", "45"]

  const handleApply = () => {
    if (hour && minute) {
      const formattedTime = `${hour}:${minute} ${period}`
      onTimeChange(formattedTime)
      setOpen(false)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[160px] justify-start">
          {time || "Select time"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] flex flex-col gap-2">
        <div className="flex gap-2">
          <select
            className="border px-2 py-1 rounded w-full"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
          >
            <option value="">HH</option>
            {hours.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>

          <select
            className="border px-2 py-1 rounded w-full"
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
          >
            <option value="">MM</option>
            {minutes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          <select
            className="border px-2 py-1 rounded w-full"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
        <Button onClick={handleApply}>Set Time</Button>
      </PopoverContent>
    </Popover>
  )
}
