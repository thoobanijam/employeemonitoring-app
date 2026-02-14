"use client";
import { useEffect } from "react";

interface AttendanceProps {
  empId: string;
}

export default function Attendance({ empId }: AttendanceProps) {
  useEffect(() => {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5); // HH:mm
    const currentDate = now.toISOString().split("T")[0]; // YYYY-MM-DD

    const attendance = JSON.parse(localStorage.getItem("attendance") || "{}");

    if (!attendance[empId]) attendance[empId] = {};

    // Only create today's row if not exists
    if (!attendance[empId][currentDate]) {
      attendance[empId][currentDate] = {
        loginTime: currentTime,
        status: "Present",
      };
    }

    // Remove old non-ISO keys (optional)
    Object.keys(attendance[empId]).forEach((key) => {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(key)) delete attendance[empId][key];
    });

    localStorage.setItem("attendance", JSON.stringify(attendance));
  }, [empId]);

  return null;
}
