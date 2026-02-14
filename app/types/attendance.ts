export interface AttendanceDay {
  loginTime: string;
  status: "Absent" | "Present";

  // Tyre / batch info
  batchNo?: string[];
  tyreModel?: string[];

  // Production / targets
  completedTarget?: number;
  production?: number;
  sales?: number;
  maintenance?: number;

  // Trucks info
  targetTrucks?: number;
  filledTrucks?: number;

  // Operations / logistics
  operation?: string;
  logisticTruck?: number;

  // Construction / sales
  achieved?: number;
  billNo?: string[];

  // Additional fields for production
   manufacturingDate?: string[];
     
  expiryDate?: string;

  // Cafe stock
  openingStock?: number;
  closingStock?: number;

   [key: string]: string | number | string[] | undefined;
}

export interface AttendanceData {
  [empId: string]: {
    [date: string]: AttendanceDay;
  };
}
