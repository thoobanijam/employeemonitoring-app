"use client";

import { useProductionBatch } from "@/hooks/useProductionBatch";

const MaintenanceTable = () => {
  const { batchNo } = useProductionBatch();

  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th className="border p-2">Produced Batch No</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border p-2">{batchNo.join(", ") || "-"}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default MaintenanceTable;
