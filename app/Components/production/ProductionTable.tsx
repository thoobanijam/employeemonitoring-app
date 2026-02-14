"use client";

import React, { useEffect, useState } from "react";
import { AttendanceData, AttendanceDay } from "@/types/attendance";

interface DailyBatchRecord {
  [date: string]: BatchRecord;
}

interface BatchRecord {
  batchNo: string[];
  manufacturingDate: string[];
}

const EMP_ID = "EMP001";

const ProductionTable: React.FC<{ trigger?: number }> = ({ trigger }) => {
  const target = 50;
  const today = new Date().toISOString().split("T")[0];

  // ------------------ State ------------------
  const [loginTime, setLoginTime] = useState<string>("N/A");
  const [newBatch, setNewBatch] = useState("");
  const [batchDate, setBatchDate] = useState(today);
  const [attendanceData, setAttendanceData] = useState<AttendanceData>({});

  const isPresent = !!loginTime;

  // ------------------ Effects ------------------
  useEffect(() => {
    // Load attendance from localStorage
    if (typeof window === "undefined") return;

    const stored: AttendanceData = JSON.parse(localStorage.getItem("attendance") || "{}");

    if (!stored[EMP_ID]) stored[EMP_ID] = {};
    if (!stored[EMP_ID][today]) stored[EMP_ID][today] = {
      loginTime: "",
      status: "Present",
      batchNo: [],
      manufacturingDate: [],
      completedTarget: 0
    };

    // Set loginTime if missing
    if (!stored[EMP_ID][today].loginTime) {
      const now = new Date();
      stored[EMP_ID][today].loginTime = now.getHours().toString().padStart(2, "0") +
        ":" +
        now.getMinutes().toString().padStart(2, "0");
    }

    setLoginTime(stored[EMP_ID][today].loginTime ?? "N/A");
    setAttendanceData(stored);
    localStorage.setItem("attendance", JSON.stringify(stored));
  }, [today]);

  if (!attendanceData[EMP_ID]) return null;

  // ------------------ Handlers ------------------
 // In handleAddBatch
const handleAddBatch = () => {
  if (!newBatch.trim() || !batchDate.trim()) return;

  setAttendanceData(prev => {
    const updated = { ...prev };
    if (!updated[EMP_ID]) updated[EMP_ID] = {};
    if (!updated[EMP_ID][batchDate])
      updated[EMP_ID][batchDate] = {
        loginTime: loginTime ?? "N/A",
        status: "Present",
        batchNo: [],
        manufacturingDate: [],
        completedTarget: 0
      };

    const day = updated[EMP_ID][batchDate];

    if (!day.batchNo) day.batchNo = [];
    if (!day.manufacturingDate) day.manufacturingDate = [];

    if (!day.batchNo.includes(newBatch.trim())) {
      day.batchNo.push(newBatch.trim());
      day.manufacturingDate.push(batchDate);
      day.completedTarget = day.batchNo.length;
    }

    updated[EMP_ID][batchDate] = day;

    // Also save to localStorage
    localStorage.setItem("attendance", JSON.stringify(updated));
    return updated;
  });

  setNewBatch("");
};

  // ------------------ Helpers ------------------
  const timeToDate = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    const d = new Date();
    d.setHours(h, m, 0, 0);
    return d;
  };

  const calcLag = (shiftStart: string, shiftEnd: string, loginTime?: string) => {
    const start = timeToDate(shiftStart);
    const end = timeToDate(shiftEnd);

    if (!loginTime) {
      const diffMin = (end.getTime() - start.getTime()) / 60000;
      const hr = Math.floor(diffMin / 60);
      const min = Math.floor(diffMin % 60);
      return `${hr} hr ${min} min late`;
    }

    const login = timeToDate(loginTime);
    if (login <= start) return "On time";
    const diffMin = (login.getTime() - start.getTime()) / 60000;
    const hr = Math.floor(diffMin / 60);
    const min = Math.floor(diffMin % 60);
    return `${hr} hr ${min} min late`;
  };

  // ------------------ Render ------------------
  const sortedDates = Object.keys(attendanceData[EMP_ID])
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  return (
    <div className="w-full overflow-x-auto p-4">
      <h2 className="font-bold mb-4 text-xl">Production Dashboard</h2>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Batch No"
          value={newBatch}
          onChange={(e) => setNewBatch(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={batchDate}
          onChange={(e) => setBatchDate(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={handleAddBatch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Batch
        </button>
      </div>

      <table className="w-full border border-gray-900 border-collapse">
        <thead>
          <tr className="bg-gray-500 text-lg">
            <th className="border p-2">✔</th>
            <th className="border p-2">#</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Morning (8am–1pm)</th>
            <th className="border p-2">Break (1pm–2pm)</th>
            <th className="border p-2">Evening (2pm–7pm)</th>
            <th className="border p-2">Lagging time</th>
            <th className="border p-2">Target</th>
            <th className="border p-2">Produced Batch No.</th>
            <th className="border p-2">Manufacturing Date</th>
            <th className="border p-2">Completed Target</th>
          </tr>
        </thead>
        <tbody>
          {sortedDates.map((date, index) => {
            const day = attendanceData[EMP_ID][date];
            return (
              <tr key={date} className="hover:bg-[#3b3d3d]">
                <td className="border p-2">{isPresent ? loginTime ?? "N/A" : "Absent"}</td>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{date}</td>
                <td className="border p-2">{isPresent ? loginTime ?? "N/A" : "Absent"}</td>
                <td className="border p-2">Break</td>
                <td className="border p-2">{isPresent ? loginTime ?? "N/A" : "Absent"}</td>
                <td className="border p-2">{calcLag("08:00", "19:00", loginTime)}</td>
                <td className="border p-2">{target}</td>
                <td className="border p-2">{day.batchNo?.join(", ") ?? "-"}</td>
                <td className="border p-2">{day.manufacturingDate?.join(", ") ?? "-"}</td>
                <td className="border p-2">{day.completedTarget ?? 0}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductionTable;
