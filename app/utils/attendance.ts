

export interface AttendanceDay {
  loginTime: string;
  status: "Present" | "Absent";
  batchNo?: string[];
  tyreModel?: string[];
  completedTarget?: number;
  production?: number;
  sales?: number;
  maintenance?: number;
  targetTrucks?: number;
  filledTrucks?: number;
  operation?: string;
  logisticTruck?: number;
  achieved?: number;
  
}
export interface AttendanceData {
  [empId: string]: {
    [date: string]: AttendanceDay;
  };
}

export const markEmployeeLogin = (empId: string) => {
  const stored: AttendanceData = JSON.parse(
    localStorage.getItem("attendance") || "{}"
  );

  const today = new Date().toISOString().split("T")[0]; // 2026-02-07
  const time = new Date().toTimeString().slice(0, 5);   // 08:45

  if (!stored[empId]) stored[empId] = {};

  // ✅ DO NOT overwrite if already logged in today
  if (!stored[empId][today]) {
    stored[empId][today] = {
      loginTime: time,
      status: "Present",
      batchNo: [],
      tyreModel: [],
      completedTarget: 0,
      production: 0,
      sales: 0,
    };
  }else {
  stored[empId][today].loginTime = time;
  stored[empId][today].status = "Present";
}


  localStorage.setItem("attendance", JSON.stringify(stored));
};
