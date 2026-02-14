"use client";

import { useProductionBatch } from "@/hooks/useProductionBatch";

const QualityTable = () => {
  const { batchNo } = useProductionBatch();

  return (
    <div>
      <h3 className="font-semibold mb-2">Produced Batch No</h3>
      <ul className="list-disc pl-6">
        {batchNo.length ? (
          batchNo.map((b) => <li key={b}>{b}</li>)
        ) : (
          <li>-</li>
        )}
      </ul>
    </div>
  );
};

export default QualityTable;
