"use client";

import React, { useEffect, useState } from "react";
import { Employee } from "@/types/employee";
import { tableSchemas } from "@/data/tableSchemas";
import { AttendanceData, AttendanceDay } from "@/types/attendance";

interface EmployeeTableProps {
  employee: Employee;
  tableType: keyof typeof tableSchemas;
}

// Helper: convert "HH:MM" string to Date today
const timeToDate = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
};

// Calculate lag time
const calcLag = (shift: string, loginTime?: string) => {
  if (!loginTime) return "Absent";
  const diffMin =
    (timeToDate(loginTime).getTime() - timeToDate(shift).getTime()) / 60000;
  if (diffMin <= 0) return "On time";
  const hr = Math.floor(diffMin / 60);
  const min = Math.floor(diffMin % 60);
  return `${hr} hr ${min} min late`;
};

// Format ISO date to DD/MM/YYYY
const formatDisplayDate = (isoDate: string) => {
  const d = new Date(isoDate);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employee, tableType }) => {
  const [attendance, setAttendance] = useState<AttendanceData>({});

  // Load attendance from localStorage
  useEffect(() => {
    const stored: AttendanceData = JSON.parse(localStorage.getItem("attendance") || "{}");
    const empId = employee.id;
    const today = new Date().toISOString().split("T")[0];

    if (!stored[empId]) stored[empId] = {};
    if (!stored[empId][today]) stored[empId][today] = { loginTime: "", status: "Absent" };

    localStorage.setItem("attendance", JSON.stringify(stored));
    setAttendance(stored);
  }, [employee.id]);

  const schema = tableSchemas[tableType];
  if (!schema) return <p>Table schema not found: {tableType}</p>;

  const empAttendance = attendance[employee.id] || {};
  const dates = Object.keys(empAttendance).sort();

  // Render cell dynamically based on column name
  const renderCell = (col: string, day: AttendanceDay, index: number, date: string) => {
    switch (col) {
      case "✔":
        return "✔";
      case "#":
        return index + 1;
      case "Date":
        return formatDisplayDate(date);
      case "Morning (8am–1pm)":
      case "Evening (2pm–7pm)":
        return day.loginTime || "Absent";
      case "Break (1pm–2pm)":
        return "Break";
      case "Lagging time":
        return `${calcLag(schema.shiftStartTimes[0], day.loginTime)}, ${calcLag(
          schema.shiftStartTimes[1],
          day.loginTime
        )}`;
      case "Target":
      case "Target Sales":
        return schema.target ?? "-";
      case "Completed Target":
        return day.completedTarget ?? "-";
      case "Sold":
      case "Sold Batch No":
        return day.batchNo?.length ?? 0;
      case "Batch No":
        return day.batchNo?.join(", ") ?? "-";
      case "Tyre Model":
        return day.tyreModel?.join(", ") ?? "-";
      case "Production":
        return day.production ?? "-";
      case "Sales":
        return day.sales ?? "-";
      case "Maintenance":
      case "Maintenance":
        return day.maintenance ?? "-";
      case "Target Trucks":
        return day.targetTrucks ?? "-";
      case "Filled Trucks":
        return day.filledTrucks ?? "-";
      case "Operation":
        return day.operation ?? "-";
      case "Logistic Truck":
        return day.logisticTruck ?? "-";
      case "Achieved":
        return day.achieved ?? "-";
      case "Manufacturing Date":
        return day.manufacturingDate ?? "-";
      case "Expiry Date":
        return day.expiryDate ?? "-";
      case "Opening Stock":
        return day.openingStock ?? "-";
      case "Closing Stock":
        return day.closingStock ?? "-";
      case "Bill No":
        return day.billNo?.join(", ") ?? "-";
      default:
        return "-";
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full mt-4 border border-gray-900 border-collapse ">
        <thead>
          <tr className="bg-gray-500 text-lg cursor-pointer ">
            {schema.headers.map((header) => (
              <th key={header} className="border p-2 text-left">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody >
          {dates.length === 0 ? (
            <tr>
              <td colSpan={schema.headers.length} className="text-center p-2">
                No attendance data
              </td>
            </tr>
          ) : (
            dates.map((date, index) => {
              const day = empAttendance[date];
              return (
                <tr key={date}
                className="hover:bg-[#3b3d3d] cursor-pointer">
                  {schema.headers.map((col) => (
                    <td key={col} className="border p-2">
                      {renderCell(col, day, index, date)}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
