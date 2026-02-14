import { AttendanceData } from "./attendance";

export const addBatchEntry = (
  empId: string,
  batchNo: string,
  tyreModel: string,
  date?: string // ✅ optional date
) => {
  const stored: AttendanceData = JSON.parse(localStorage.getItem("attendance") || "{}");

  // Use provided date OR default to today
  const day = date || new Date().toISOString().split("T")[0]; // e.g., "2026-02-08"

  if (!stored[empId]) stored[empId] = {};
  if (!stored[empId][day]) {
    stored[empId][day] = {
      loginTime: new Date().toTimeString().slice(0, 5),
      status: "Present",
      batchNo: [],
      tyreModel: [],
      completedTarget: 0,
      production: 0,
      sales: 0,
    };
  }

  // Add batch no
  stored[empId][day].batchNo = stored[empId][day].batchNo || [];
  stored[empId][day].batchNo.push(batchNo);

  // Add tyre model (avoid duplicates)
  stored[empId][day].tyreModel = stored[empId][day].tyreModel || [];
  if (!stored[empId][day].tyreModel.includes(tyreModel)) {
    stored[empId][day].tyreModel.push(tyreModel);
  }

  // Increment targets
  stored[empId][day].completedTarget = (stored[empId][day].completedTarget || 0) + 1;
  stored[empId][day].production = (stored[empId][day].production || 0) + 1;

  localStorage.setItem("attendance", JSON.stringify(stored));
};
