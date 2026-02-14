"use client";

import { useProductionBatch } from "@/hooks/useProductionBatch";

const SalesTable = () => {
  const { batchNo } = useProductionBatch();

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Produced Batch No</h3>
      <p>{batchNo.join(", ") || "-"}</p>
    </div>
  );
};

export default SalesTable;
