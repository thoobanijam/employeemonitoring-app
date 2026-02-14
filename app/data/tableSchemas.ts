export interface TableSchema {
  headers: string[];
  shiftStartTimes: string[];
  target?: number;
}

export const tableSchemas: Record<string, TableSchema> = {
  // ================= CITY TYRE =================
  "CITY TYRE_Production": {
    headers: [
      "✔", "#", "Date",
      "Morning (8am–1pm)", "Break (1pm–2pm)",
      "Evening (2pm–7pm)", "Lagging time", "Target", "Produced Batch No.",
      "Manufacturing Date","Completed Target"
    ],
    shiftStartTimes: ["08:00", "14:00"]
  },

  "CITY TYRE_Quality Controller": {
    headers: [
      "✔", "#", "Date",
      "Morning (8am–1pm)", "Break (1pm–2pm)",
      "Evening (2pm–7pm)", "Lagging time",
      "Produced Batch No.", "Pending Batch No From Maintenance", 
      "Accepted Batch No From Maintenance", "Remark",
      "Sold Batch No"

    ],
    shiftStartTimes: ["08:00", "14:00"]
  },

  "CITY TYRE_Sales": {
    headers: [
      "✔", "#", "Date",
      "Morning (8am–1pm)", "Break (1pm–2pm)",
      "Evening (2pm–7pm)", "Lagging time","Produced Batch No.",
      "Target", "Bill No",  "Tyre Model"
    ],
    shiftStartTimes: ["08:00", "14:00"],
    target: 50
  },

  "CITY TYRE_Maintenance": {
    headers: [
      "✔", "#", "Date",
      "Morning (8am–1pm)", "Break (1pm–2pm)",
      "Evening (2pm–7pm)", "Lagging time",
      "Produced Batch No.", "Remark"
    ],
    shiftStartTimes: ["08:00", "14:00"]
  },

  // ================= MILLER =================
  "MILLER_Production": {
    headers: [
      "✔", "#", "Date",
      "Morning (8am–1pm)", "Break (1pm–2pm)",
      "Evening (2pm–7pm)", "Lagging time","Target",
      "Produced Batch No.", "Manufacturing Date", "Expiry Date","Completed Target"
    ],
    shiftStartTimes: ["08:00", "14:00"]
  },

  "MILLER_Sales": {
    headers: [
      "✔", "#", "Date",
      "Morning (8am–1pm)", "Break (1pm–2pm)",
      "Evening (2pm–7pm)", "Lagging time","Produced Batch No.",
      "Target", "Bill No",  
    ],
    shiftStartTimes: ["08:00", "14:00"]
  },

  "MILLER_Maintenance": {
    headers: [
       "✔", "#", "Date",
      "Morning (8am–1pm)", "Break (1pm–2pm)",
      "Evening (2pm–7pm)", "Lagging time",
      "Produced Batch No.", "Remark"
    ],
    shiftStartTimes: ["08:00", "14:00"]
  },

  "MILLER_Supervisor": {
    headers: [
      "✔", "#", "Date",
      "Morning (8am–1pm)", "Break (1pm–2pm)",
      "Evening (2pm–7pm)", "Lagging time",
      "Production", "Sales", "Logistic Truck", "Maintenance"
    ],
    shiftStartTimes: ["08:00", "14:00"]
  },

  

  // ================= CAFE (SAME FOR ALL) =================
  "CAFE_Java": {
    headers: [
      "✔", "#", "Date",
      "Morning (8am–1pm)", "Break (1pm–2pm)",
      "Evening (2pm–7pm)", "Lagging time",
      "Opening Stock", "Closing Stock", "Sold", "Bill No"
    ],
    shiftStartTimes: ["08:00", "14:00"]
  }
};
