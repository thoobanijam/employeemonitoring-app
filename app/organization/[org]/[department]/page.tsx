"use client";

import React from "react";
import { employees } from "@data/employee";
import { Employee } from "@types/employee";
import { tableSchemas } from "@data/tableSchemas";
import EmployeeTable from "@components/EmployeeTable";

interface DepartmentPageProps {
  params: {
    org: string;
    department: string;
  };
}

export default function DepartmentPage({ params }: DepartmentPageProps) {
  const { org, department } = params;

  // Filter employees for this department
  const deptEmployees: Employee[] = employees.filter(
    (e: Employee) =>
      e.organization === decodeURIComponent(org) &&
      e.department === decodeURIComponent(department)
  );

  // Get unique teams
  const teams: string[] = [...new Set(deptEmployees.map((e: Employee) => e.team))];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        {decodeURIComponent(org)} – {decodeURIComponent(department)}
      </h1>

      {teams.map((team) => {
        const headers: string[] =
          tableSchemas[`${org}_${department}_${team}`] ||
          tableSchemas[`${org}_${department}`] ||
          tableSchemas["CAFE_DEFAULT"] ||
          [];

        return (
          <div key={team} className="mt-6">
            <h2 className="text-xl font-semibold mb-2">{team}</h2>
            <EmployeeTable
              headers={headers}
              employees={deptEmployees.filter((e: Employee) => e.team === team)}
            />
          </div>
        );
      })}
    </div>
  );
}
