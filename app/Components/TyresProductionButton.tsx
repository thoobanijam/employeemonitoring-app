"use client";

import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import useProductionBatch from "@/hooks/useProduction";
import { employees } from "@/data/employee";

interface TyresProductionButtonProps {
  empId: string;
  onUpdate?: () => void;
}

const TyresProductionButton: React.FC<TyresProductionButtonProps> = ({ empId, onUpdate }) => {
  const [filterDate, setFilterDate] = useState("");
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split("T")[0]);
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [tyreModel, setTyreModel] = useState("");
  const [batchNo, setBatchNo] = useState("");
  const [currentEmployee, setCurrentEmployee] = useState<typeof employees[0] | null>(null);

  const { addBatchForDate } = useProductionBatch();

  useEffect(() => {
    const employee = employees.find((e) => e.id === empId) || null;
    setCurrentEmployee(employee);
  }, [empId]);

  const addBatchNoHandler = () => {
    if (!currentEmployee || !batchNo || !tyreModel || !targetDate) {
      alert("Please fill all fields.");
      return;
    }

    addBatchForDate(targetDate, batchNo, targetDate);

    alert("Batch added successfully!");

    setBatchNo("");
    setTyreModel("");
    setShowBatchModal(false);

    onUpdate?.(); // optional refresh for table
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Tyres Production Report", 10, 10);

    const stored = JSON.parse(localStorage.getItem("productionBatchData") || "{}");
    const tableData = Object.entries(stored).map(([date, data]: any) => [
      date,
      data.batchNo.join(", "),
      data.manufacturingDate.join(", "),
    ]);

    autoTable(doc, {
      head: [["Date", "Batch No", "Manufacturing Date"]],
      body: tableData,
      startY: 20,
    });

    doc.save("tyres_report.pdf");
  };

  return (
    <div className="my-4 flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border p-1"
        />
        <input
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          className="border p-1"
        />
        <button
          onClick={() => setShowBatchModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded font-bold"
        >
          Add Batch No
        </button>
        <button
          onClick={downloadPDF}
          className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700"
        >
          Download PDF
        </button>
      </div>

      {showBatchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-md">
          <div className="bg-white p-6 rounded-xl w-[500px] shadow-lg text-black">
            <h2 className="text-xl font-semibold mb-4">Add Batch No</h2>

            <input
              type="text"
              placeholder="Batch No"
              value={batchNo}
              onChange={(e) => setBatchNo(e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <input
              type="text"
              placeholder="Tyre Model"
              value={tyreModel}
              onChange={(e) => setTyreModel(e.target.value)}
              className="border p-2 w-full mb-2"
            />
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="border p-2 w-full mb-2"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={addBatchNoHandler}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Add
              </button>
              <button
                onClick={() => setShowBatchModal(false)}
                className="bg-gray-300 px-3 py-1 rounded text-black"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TyresProductionButton;
