"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { employees } from "../../data/employee";
import { IoMdPerson } from "react-icons/io";
import { markEmployeeLogin } from "@/utils/attendance";

export default function EmployeeLoginPage() {
  const router = useRouter();

  const [empId, setEmpId] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [step, setStep] = useState<"LOGIN" | "OTP">("LOGIN");
  const [error, setError] = useState("");
  const [currentEmployee, setCurrentEmployee] = useState<typeof employees[0] | null>(null);

  // STEP 1: Verify employee + send OTP
  const handleSendOtp = () => {
    const employee = employees.find(e => e.id === empId && e.phone === phone);
    if (!employee) {
      setError("Invalid Employee ID or Phone Number");
      return;
    }

    setCurrentEmployee(employee);

    // Generate OTP internally
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otpCode);
    setStep("OTP");
    setError("");

    // Show OTP in browser for testing
    alert(`Your OTP for ${employee.name} is: ${otpCode}`);
  };

  // STEP 2: Verify OTP → handle login
  const handleLogin = (employeeId: string) => {
    if (otp !== generatedOtp) {
      setError("Invalid OTP");
      return;
    }

    setError("");
    markEmployeeLogin(employeeId); // ✅ mark attendance
    router.push(`/employee/${employeeId}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-[black] bg-[#567d9a]">
      <div className="bg-gradient-to-r from-[#10838a] to-[#4d427c] p-8 rounded-4xl shadow w-[500px] h-[450px] shadow-[0_4px_6px_#41c6ef]">
        <div className="flex justify-center text-[#d2d2d2]">
          <IoMdPerson size={60} />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-center text-[#d0d0d0]">
          Employee Login
        </h1>

        {step === "LOGIN" && (
          <>
            <input
              placeholder="Employee ID"
              value={empId}
              onChange={(e) => setEmpId(e.target.value)}
              className="border border-[#567d9a] w-full px-3 py-4 mb-3 rounded-xl bg-[#d2d2d2] mt-4"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border border-[#567d9a] w-full px-3 py-4 rounded-xl bg-[#d2d2d2] mt-4"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              onClick={handleSendOtp} // ✅ call handleSendOtp, not handleLogin
              className="bg-[#3d97d3] text-white text-xl font-bold w-full py-4 rounded-4xl mt-8"
            >
              Send OTP
            </button>
          </>
        )}

        {step === "OTP" && (
          <>
            <input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border border-[#567d9a] w-full px-3 py-4 rounded-xl bg-[#d2d2d2] mt-8"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              onClick={() => currentEmployee && handleLogin(currentEmployee.id)}
              className="bg-[#3d97d3] text-white text-xl font-bold w-full py-4 rounded-4xl mt-8"
            >
              Verify OTP & Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}
