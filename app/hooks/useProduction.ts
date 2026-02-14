"use client";

import { useEffect, useState } from "react";

export interface ProductionBatchDay {
  batchNo: string[];
  manufacturingDate: string[];
}

export interface ProductionBatchData {
  [date: string]: ProductionBatchDay;
}

export default function useProductionBatch(trigger?: number) {
  const [data, setData] = useState<ProductionBatchData>({});

  useEffect(() => {
    const stored: ProductionBatchData = JSON.parse(
      localStorage.getItem("productionBatchData") || "{}"
    );
    setData(stored);
  }, [trigger]);

  const getBatchForDate = (date: string): ProductionBatchDay => {
    return data[date] || { batchNo: [], manufacturingDate: [] };
  };

  const addBatchForDate = (
    date: string,
    batchNo: string,
    manufacturingDate: string
  ) => {
    setData((prev) => {
      const updatedData = { ...prev };
      if (!updatedData[date]) updatedData[date] = { batchNo: [], manufacturingDate: [] };

      if (!updatedData[date].batchNo.includes(batchNo)) {
        updatedData[date].batchNo.push(batchNo);
        updatedData[date].manufacturingDate.push(manufacturingDate);
      }

      localStorage.setItem("productionBatchData", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  return {
    data,
    getBatchForDate,
    addBatchForDate,
  };
}
