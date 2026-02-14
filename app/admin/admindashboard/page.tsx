"use client";

import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { GrOrganization } from "react-icons/gr";
import { FaUsers, FaTasks, FaMapMarkerAlt } from "react-icons/fa";
import { MdTrackChanges, MdOutlineAccessTime } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import Organization from "@/Components/Organization";
import EmployeeDashboard from "@/employee/employee/employeedashboard/page";






const organizationData = [
  { id: 1, name: "CITY TYRE", departments: [{ id: 1, name: "Production", teams: ["Mixing","Curing","Quality","Packaging"] }, { id: 2, name: "Sales", teams: ["Retail","Wholesale","Online","Export"] }] },
  { id: 2, name: "MILLER", departments: [{ id: 1, name: "Operations", teams: ["Grinding","Packaging","Maintenance","Logistics"] }] },
  { id: 3, name: "CONSTRUCTION", departments: [{ id: 1, name: "Engineering", teams: ["Civil","Electrical","Mechanical","Safety"] }] },
  { id: 4, name: "CAFE", departments: [{ id: 1, name: "Kitchen", teams: ["Chefs","Prep","Cleaning","Inventory"] }] },
];



const AdminDashboardPage = () => {
 const router = useRouter();

 const modules = [
    { id: "organization", 
      label: "Organization Management",
       icon: <GrOrganization />,
        },
    { 
      id: "employee", 
      label: "Employee Management", 
      icon: <FaUsers />,  
     
 },
    { id: "tracking", label: "Tracking & Monitoring", icon: <MdTrackChanges /> },
    { id: "attendance", label: "Attendance Management", icon: <MdOutlineAccessTime /> },
    { id: "tasks", label: "Task & Project Management", icon: <FaTasks /> },
    { id: "geo", label: "Geo & Device Management", icon: <FaMapMarkerAlt /> },
  ];
  const [openModule, setOpenModule] = useState<string | null>(null);
  const [openOrg, setOpenOrg] = useState<{ [key: number]: boolean }>({});
  const [openDept, setOpenDept] = useState<{ [key: number]: boolean }>({});
  const [openEmployeeDropdown, setOpenEmployeeDropdown] = useState(false);

  const [organization, setOrganization] = useState("EMS Group Of Companies");
  const [admin, setAdmin] = useState("admin");
  const [email, setEmail] = useState("admin@example.com");
  const [idnumber, setIDNumber] = useState("admin12EMS");
  const [address, setAddress] = useState("1234 Main St");
  const [country, setCountry] = useState("United States");
  const [activeModule, setActiveModule] = useState("organization"); 
  
 
  const adminId = "ADMIN123";

  const handleLogout = () => {
    console.log("Admin logged out");
    router.push("/admin/loginadmin");
  };
   const toggleModule = (id: string) => {
    setOpenModule((prev) => (prev === id ? null : id));
  };

  const toggleOrg = (id: number) => {
    setOpenOrg((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleDept = (id: number) => {
    setOpenDept((prev) => ({ ...prev, [id]: !prev[id] }));
  };

   const toggleEmployeeDropdown = () => {
    setOpenEmployeeDropdown((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ organization, admin, email, idnumber, address, country });
    alert("Organization details updated! ✅");
  };

  return (
    <div className="flex flex-col lg:flex-row ">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-gray-800 text-white p-6 flex flex-col ">
        <div className="flex flex-col items-center gap-3 mb-8">
          <FaUserCircle size={48} />
          <span className="font-semibold">{adminId}</span>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded w-full mt-2"
          >
            Logout
          </button>
        </div>

     {/* Sidebar */}
<nav className="flex flex-col gap-2 text-lg ">
  {modules.map((module) => (
    <div key={module.id} className="flex flex-col ">
      {/* Module Button */}
      <button
        onClick={() => toggleModule(module.id)}
        className="flex items-center justify-between w-full px-4 py-2 rounded hover:bg-gray-700"
      >
        <div className="flex items-center gap-3 ">
          <span className="text-[22px]">{module.icon}</span>
          <span>{module.label}</span>
        </div>
        <span>{openModule === module.id ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
      </button>

      {/* Organization Dropdown */}
      {module.id === "organization" && openModule === "organization" && (
        <div className="ml-6 mt-1 flex flex-col gap-1">
          {organizationData.map((org) => (
            <div key={org.id} className="flex flex-col">
              <button
                onClick={() => toggleOrg(org.id)}
                className="flex items-center justify-between px-4 py-1 text-left rounded hover:bg-gray-700"
              >
                {org.name}
                <span>{openOrg[org.id] ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
              </button>
              {/* Departments */}
              {openOrg[org.id] &&
                org.departments.map((dep) => (
                  <div key={dep.id} className="ml-6 flex flex-col gap-1">
                    <button
                      onClick={() => toggleDept(dep.id)}
                      className="flex items-center justify-between px-4 py-1 text-left rounded hover:bg-gray-600"
                    >
                      {dep.name}
                      <span>{openDept[dep.id] ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
                    </button>

                    {/* Teams */}
                    {openDept[dep.id] &&
                      dep.teams.map((team, idx) => (
                        <div
                          key={idx}
                          className="ml-6 px-4 py-1 text-gray-200 rounded hover:bg-gray-700"
                        >
                          {team}
                        </div>
                      ))}
                  </div>
                ))}
            </div>
          ))}
        </div>
      )}

      {/* Employee Dropdown */}
      {module.id === "employee" && openModule === "employee" && (
        <div className="ml-6 mt-1 flex flex-col gap-1">
          <button className="px-4 py-1 text-left rounded hover:bg-gray-700">
            Add New Employees
          </button>
          <button className="px-4 py-1 text-left rounded hover:bg-gray-700">
            View All Employee Details
          </button>
          <button className="px-4 py-1 text-left rounded hover:bg-gray-700">
            Search Employees by ID, Email, or Phone
          </button>
          <button className="px-4 py-1 text-left rounded hover:bg-gray-700">
            Edit Employee Information
          </button>
        </div>
      )}
    </div>
  ))}
</nav>



      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 bg-gray-100 text-black overflow-auto">
        {/* TOP SECTION */}
        <div className="p-4 lg:p-8 border-b border-gray-300">
          <div className="flex flex-col lg:flex-row justify-center items-start gap-8 p-4 bg-white shadow rounded">
            
            {/* LEFT SIDE */}
            <div className="flex flex-col items-center w-full lg:w-[30%]">
              <img
                src="/img/EMS-Logo.png"
                alt="Logo"
                className="h-32 w-32 sm:h-36 sm:w-36 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
              />
              <h1 className="font-bold text-[22px] sm:text-[22px] mt-2 text-center">
                EMS GROUP OF COMPANY
              </h1>
            </div>

            {/* RIGHT SIDE - Form */}
            <div className="bg-white p-6 rounded shadow w-full lg:w-[70%] text-[18px] sm:text-[20px]">
              <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
                {/** Organization Name */}
                <div className="flex flex-col">
                  <label className="text-gray-500 font-medium mb-1">Organization Name :</label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="text-gray-800 border-b border-gray-300 pb-1 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/** Admin Name */}
                <div className="flex flex-col">
                  <label className="text-gray-500 font-medium mb-1">Admin Name :</label>
                  <input
                    type="text"
                    value={admin}
                    onChange={(e) => setAdmin(e.target.value)}
                    className="text-gray-800 border-b border-gray-300 pb-1 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/** Contact Email */}
                <div className="flex flex-col">
                  <label className="text-gray-500 font-medium mb-1">Contact Email :</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-gray-800 border-b border-gray-300 pb-1 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/** Admin ID */}
                <div className="flex flex-col">
                  <label className="text-gray-500 font-medium mb-1">Admin ID :</label>
                  <input
                    type="text"
                    value={idnumber}
                    onChange={(e) => setIDNumber(e.target.value)}
                    className="text-gray-800 border-b border-gray-300 pb-1 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/** Street Address */}
                <div className="flex flex-col">
                  <label className="text-gray-500 font-medium mb-1">Street Address :</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="text-gray-800 border-b border-gray-300 pb-1 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/** Country */}
                <div className="flex flex-col">
                  <label className="text-gray-500 font-medium mb-1">Country :</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="text-gray-800 border-b border-gray-300 pb-1 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/** Submit Button */}
                <div className="mt-6 flex justify-center">
                  <button
                    type="submit"
                    className="px-24 py-3 sm:px-32 sm:py-4 bg-[#567d9a] text-white font-bold rounded-lg hover:bg-blue-700 transition"
                  >
                    Edit Organization
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
       
<div className="flex-1 p-4 lg:p-8 overflow-auto">
 <Organization />        

 
</div>

      </main>
    </div>
  );
};

export default AdminDashboardPage;
