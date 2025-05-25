"use client";
import { useState, useEffect, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AirbnbSearchBar({onSubmit}) {
  const [focusedSection, setFocusedSection] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    day: "",
    fromTime: "",
    toTime: "",
  });
  const containerRef = useRef(null);
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setFocusedSection(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }}, []);

  
 

  const timeLabel =
    !formData.fromTime && !formData.toTime
      ? "Select time"
      : formData.fromTime && !formData.toTime
      ? `${formData.fromTime} – `
      : !formData.fromTime && formData.toTime
      ? ` – ${formData.toTime}`
      : `${formData.fromTime} – ${formData.toTime}`;

  const handleSearch = () => {
    const submittedData = {
      ...formData,
    };
    onSubmit(submittedData); // Exporting the data
  // Exporting the data
  };
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      <div className="search-container" ref={containerRef}>
        {/* Name Input */}
        <div
          className={`search-section name ${focusedSection === "name" ? "focused" : ""}`}
          onClick={() => setFocusedSection("name")}
        >
          <label className="label">Near by Doctors</label>
          <input
            type="text"
            placeholder="Enter name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onFocus={() => setFocusedSection("name")}
            className="input"
          />
        </div>

        {/* Day Selection */}
        <div
          className={`search-section day ${focusedSection === "day" ? "focused" : ""}`}
          onClick={() => setFocusedSection("day")}
        >
          <label className="label">Appointment Day</label>
          <Select
            value={formData.day}
            onValueChange={(value) => handleChange("day", value)}
          >
            <SelectTrigger className="w-[180px] h-7 bg-transparent border-none shadow-none hover:bg-transparent focus:bg-transparent focus:border-none focus:ring-0 focus:shadow-none outline-none">

              <SelectValue placeholder="Select a day" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Days</SelectLabel>
                {days.map((day) => (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Time Selection */}
        <div
          className={`search-section guests ${focusedSection === "guests" ? "focused" : ""}`}
          onClick={() => setFocusedSection("guests")}
        >
          <label className="label">Appointment Time</label>
          <div className="guests-display">{timeLabel}</div>
          {focusedSection === "guests" && (
            <div className="day-inputs" onClick={(e) => e.stopPropagation()}>
              <input
                type="time"
                value={formData.fromTime}
                onChange={(e) => {
                  handleChange("fromTime", e.target.value);
                  if (formData.toTime && e.target.value > formData.toTime) {
                    handleChange("toTime", "");
                  }
                }}
                className="date-input"
              />
              <input
                type="time"
                value={formData.toTime}
                onChange={(e) => handleChange("toTime", e.target.value)}
                className="date-input"
              />
            </div>
          )}
        </div>

        {/* Search Button */}
        <button className="search-button" onClick={handleSearch}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M10.5 3a7.5 7.5 0 015.9 12.05l4.52 4.52a1 1 0 01-1.42 1.42l-4.52-4.52A7.5 7.5 0 1110.5 3zm0 2a5.5 5.5 0 100 11 5.5 5.5 0 000-11z" />
          </svg>
        </button>
      </div>

      {/* Styles */}
      <style jsx>{`
        input {
          font-family: "Arial", sans-serif;
          font-size: 1rem;
          border: none;
          outline: none;
          background: transparent;
          color: #222222;
          cursor: pointer;
        }
        input::placeholder {
          color: #bebebe;
        }
        .search-container {
          display: flex;
          align-items: center;
          background: white;
          max-width: 1000px;
          height: 9vh;
          width: 90vw;
          border-radius: 48px;
          box-shadow: 0 2px 4px rgb(0 0 0 / 0.2);
          gap: 10px;
          padding: 0 10px;
        }
        .search-section {
          flex-grow: 1;
          flex-basis: 0;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          padding: 12px 20px;
          border-radius: 24px;
          transition: background-color 0.3s ease, box-shadow 0.3s ease, flex-grow 0.3s ease;
          position: relative;
        }
        .search-section:not(:last-child) {
          border-right: 1px solid #ebebeb;
        }
        .search-section.focused,
        .search-section:hover {
          background-color: #e0e0e0;
          box-shadow: 0 0 8px #e0e0e0;
          color: none;
          flex-grow: 1.2;
          z-index: 1;
        }
        .label {
          font-weight: 600;
          font-size: 9px;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 3px;
        }
        .day-display,
        .guests-display {
          font-weight: 600;
          font-size: 16px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .day-inputs {
          position: absolute;
          top: 65px;
          left: 16px;
          background: #e0e0e0;
          padding: 8px 12px;
          border-radius: 12px;
          z-index: 5;
          display: flex;
          gap: 12px;
        }
        .date-input {
          border: 1px solid #dddddd;
          border-radius: 8px;
          padding: 8px;
          font-size: 16px;
          color: #222;
          min-width: 140px;
        }
        .search-button {
          background: #bd1818;
          border: none;
          border-radius: 50%;
          padding: 12px;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.3s;
        }
        .search-button:hover {
          background: #ff385c;
        }
      `}</style>
    </>
  );
}
