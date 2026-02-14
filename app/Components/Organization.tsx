"use client";

import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Employee = {
  id: string;
  name: string;
  organization: string;
  department: string;
  team: string;
  phone: string;
  userid: string;
  password: string;
  gender: string;
  age: number;
  DOJ: string;
  place: string;
  nationality: string;
  qualification: string;
  salary: number;
};


  const initialEmployeesData: Employee[] = [
     { id: "EMP001", name: "Riya", organization: "CITY TYRE", department: "Production", team: "Mixing", phone: "9407467912", userid: "riya1@gmail.com", password: "V6AEyM@O", gender: "female", age:30,DOJ:"2020-01-10",place: "Chennai",nationality: "Indian",qualification: "Diploma in Quality Control", salary: 38000},
  { id: "EMP002", name: "Anas", organization: "CITY TYRE", department: "Production", team: "Curing", phone: "7182190682", userid: "anas1@gmail.com", password: "aF*Z57i4", gender: "male",age: 28,  DOJ: "2021-03-15",  place: "Chennai", nationality: "Indian",   qualification: "Diploma in Mechanical Engineering",salary: 35000 },
  { id: "EMP003", name: "Vijay", organization: "CITY TYRE", department: "Quality Controller", team: "Final Inspection", phone: "7991323426", userid: "vijay1@gmail.com", password: "O0EjmnJO", gender: "male", age: 30,DOJ: "2019-08-20",place: "Bangalore", nationality: "Indian", qualification: "B.Tech in Mechanical Engineering",salary: 42000           },
  { id: "EMP004", name: "Gopi", organization: "CITY TYRE", department: "Quality Controller", team: "Retail", phone: "8948860298", userid: "gopi1@gmail.com", password: "IENwu!OU", gender: "male", age: 32, DOJ: "2020-01-10",place: "Hyderabad",  nationality: "Indian",  qualification: "MBA in Marketing", salary: 40000        },
  { id: "EMP005", name: "Anand", organization: "CITY TYRE", department: "Sales", team: "Manufacture", phone: "7141337770", userid: "anand1@gmail.com", password: "tYtuOOV*", gender: "male",age: 29, DOJ: "2018-06-05",   place: "Pune",  nationality: "Indian",  qualification: "BBA in Sales Management",   salary: 38000     },
  { id: "EMP006", name: "Karthick", organization: "CITY TYRE", department: "Sales", team: "Maintenance Labor", phone: "8759593417", userid: "karthick1@gmail.com", password: "u4hqk^I6", gender: "male",  age: 28,  DOJ: "2017-03-12", place: "Chennai", nationality: "Indian",qualification: "Diploma in Mechanical Engineering",salary: 30000      },
  { id: "EMP007", name: "Joy", organization: "CITY TYRE", department: "Maintenance", team: "Maintenance Labor", phone: "7695704909", userid: "joy1@gmail.com", password: "#RD$UroI", gender: "male",age: 28,  DOJ: "2017-03-12", place: "Chennai", nationality: "Indian",qualification: "Diploma in Mechanical Engineering",salary: 30000   },
  { id: "EMP008", name: "Smith", organization: "CITY TYRE", department: "Maintenance", team: "Maintenance Labor", phone: "9589513531", userid: "smith1@gmail.com", password: "N*bwQlrZ", gender: "male",age: 28,  DOJ: "2017-03-12", place: "Chennai", nationality: "Indian",qualification: "Diploma in Mechanical Engineering",salary: 30000   },
 
  { id: "EMP012", name: "Lucy Green", organization: "MILLER", department: "Production", team: "Grinding", phone: "8722236872", userid: "lucygreen1@gmail.com", password: "s7Euw&Wd", gender: "female",age: 27,  DOJ: "2021-11-08",  place: "Coimbatore", nationality: "Indian", qualification: "B.Sc in Industrial Operations",  salary: 32000       },
  { id: "MIL013", name: "Ganesh", organization: "MILLER", department: "Production", team: "Labor", phone: "8397294387", userid: "ganesh1@gmail.com", password: "%MiJPlMO", gender: "male",age: 27,  DOJ: "2021-11-08",  place: "Nagercoil", nationality: "Indian", qualification: "B.Sc in Industrial Operations",  salary: 32000   },
  { id: "MIL014", name: "Jaya Shree", organization: "MILLER", department: "Maintenance", team: "Labor", phone: "8093658543", userid: "jayashree1@gmail.com", password: "5km1#E54", gender: "female",age: 28,  DOJ: "2021-11-07",  place: "Madurai", nationality: "Indian", qualification: "B.Sc in Industrial Operations",  salary: 33000   },
  { id: "MIL015", name: "Arun Kumar", organization: "MILLER", department: "Maintenance", team: "Labor", phone: "6816701376", userid: "arunkumar1@gmail.com", password: "KVT*xok6", gender: "male",age: 27,  DOJ: "2021-11-08",  place: "Coimbatore", nationality: "Indian", qualification: "B.Sc in Industrial Operations",  salary: 32500   },
  { id: "MIL016", name: "Suresh Patel", organization: "MILLER", department: "Quality Controller", team: "Labor", phone: "8954277094", userid: "sureshpatel1@gmail.com", password: "d5CWdN@1", gender: "male",age: 26,  DOJ: "2021-11-09",  place: "Chennai", nationality: "Indian", qualification: "B.Sc in Industrial Operations",  salary: 33700   },
  { id: "MIL017", name: "Ramesh Rao", organization: "MILLER", department: "Quality Controller", team: "Labor", phone: "9006361374", userid: "rameshrao1@gmail.com", password: "BpdNOlSM", gender: "male",age: 27,  DOJ: "2021-11-08",  place: "Krishnagiri", nationality: "Indian", qualification: "B.Sc in Industrial Operations",  salary: 34000   },
  { id: "MIL018", name: "Vikram Singh", organization: "MILLER", department: "Sales", team: "Labor", phone: "6227225733", userid: "vikramsingh1@gmail.com", password: "&Xrr#A4d", gender: "male",age: 27,  DOJ: "2021-11-08",  place: "Vellore", nationality: "Indian", qualification: "B.Sc in Industrial Operations",  salary: 32000   },
  { id: "MIL019", name: "Mohammed Ali", organization: "MILLER", department: "Sales", team: "Labor", phone: "7982780742", userid: "mohammedali1@gmail.com", password: "3tcdZsZ@", gender: "male",age: 28,  DOJ: "2021-11-10",  place: "Coimbatore", nationality: "Indian", qualification: "B.Sc in Industrial Operations",  salary: 31750   },
 
    { id: "EMP055", name: "Balakiya", organization: "CAFE", department: "Kitchen", team: "Chefs", phone: "6041361928", userid: "balakiya1@gmail.com", password: "qDYi4dTE" , gender: "female",age: 26,DOJ: "2022-05-15",  place: "Chennai",nationality: "Indian",qualification: "Diploma in Culinary Arts", salary: 30000  },
  { id: "EMP056", name: "Allu Arjun", organization: "CAFE", department: "Kitchen", team: "Chefs", phone: "6300027808", userid: "alluarjun1@gmail.com", password: "ZOTQkSMu", gender: "male",age: 26,DOJ: "2022-05-15",  place: "Chennai",nationality: "Indian",qualification: "Diploma in Culinary Arts", salary: 30000 },
  { id: "EMP057", name: "Saravanan", organization: "CAFE", department: "Kitchen", team: "Prep", phone: "7283491174", userid: "saravanan1@gmail.com", password: "S30l$U09", gender: "male",age: 26,DOJ: "2022-05-15",  place: "Chennai",nationality: "Indian",qualification: "Bsc Hotel Management", salary: 30000 },
  { id: "EMP058", name: "Meenakshi", organization: "CAFE", department: "Kitchen", team: "Prep", phone: "8520571730", userid: "meenakshi1@gmail.com", password: "%kzO^LTw", gender: "female",age: 26,DOJ: "2022-05-15",  place: "Chennai",nationality: "Indian",qualification: "Bsc Hotel Management", salary: 30000  },
  { id: "EMP059", name: "Krishna", organization: "CAFE", department: "Kitchen", team: "Prep", phone: "7332866967", userid: "krishna1@gmail.com", password: "Bi0QfupC", gender: "male",age: 26,DOJ: "2022-05-15",  place: "Chennai",nationality: "Indian",qualification: "Bsc Hotel Management", salary: 30000  },

  { id: "EMP060", name: "Fariya", organization: "CAFE", department: "Service", team: "Waiters", phone: "9521862355", userid: "fariya1@gmail.com", password: "s*ZGRh4n", gender: "female",age: 26,DOJ: "2022-05-15",  place: "Chennai",nationality: "Indian",qualification: "Bsc Hotel Management", salary: 30000  },
  { id: "EMP061", name: "Harij", organization: "CAFE", department: "Service", team: "Waiters", phone: "9349795776", userid: "harij1@gmail.com", password: "Gg&UWWwT", gender: "female",age: 24,DOJ: "2023-01-10",place: "Bangalore", nationality: "Indian",qualification: "High School",salary: 22000   },
  { id: "EMP062", name: "Afrin", organization: "CAFE", department: "Service", team: "Waiters", phone: "8613484839", userid: "afrin1@gmail.com", password: "$jWE4EgQ", gender: "female",age: 24,DOJ: "2023-01-10",place: "Bangalore", nationality: "Indian",qualification: "High School",salary: 22000   },
  { id: "EMP063", name: "Kathija", organization: "CAFE", department: "Service", team: "Waiters", phone: "6031731518", userid: "kathija1@gmail.com", password: "hL4#abCh", gender: "male", age: 24,DOJ: "2023-01-10",place: "Bangalore", nationality: "Indian",qualification: "High School",salary: 22000       },

  { id: "EMP064", name: "Jaya Krishna", organization: "CAFE", department: "Inventory", team: "Inventory Staff", phone: "6352418955", userid: "jayakrishna1@gmail.com", password: "tObceIH5", gender: "male", age: 27,  DOJ: "2022-03-15", place: "Chennai", nationality: "Indian", qualification: "Diploma",  salary: 25000   },
  { id: "EMP065", name: "Kannan", organization: "CAFE", department: "Inventory", team: "Inventory Staff", phone: "9200712066", userid: "kannan1@gmail.com", password: "SmR5hZko", gender: "male", age: 27,  DOJ: "2022-03-15", place: "Chennai", nationality: "Indian", qualification: "Diploma",  salary: 25000   },
  { id: "EMP066", name: "Lijin", organization: "CAFE", department: "Inventory", team: "Inventory Staff", phone: "9603549727", userid: "lijin1@gmail.com", password: "o%fJhKiw", gender: "male",  age: 27,  DOJ: "2022-03-15", place: "Chennai", nationality: "Indian", qualification: "Diploma",  salary: 25000       },

  { id: "EMP067", name: "Manoj Roy", organization: "CAFE", department: "Cleaning", team: "Cleaning Staff", phone: "9170467679", userid: "manojroy1@gmail.com", password: "sPXUwPSP", gender: "male", age: 27,  DOJ: "2022-03-15", place: "Chennai", nationality: "Indian", qualification: "Diploma",  salary: 25000   },
  { id: "EMP068", name: "Khalil", organization: "CAFE", department: "Cleaning", team: "Cleaning Staff", phone: "7396878130", userid: "khalil1@gmail.com", password: "5*2USLGP", gender: "male", age: 27,  DOJ: "2022-03-15", place: "Chennai", nationality: "Indian", qualification: "Diploma",  salary: 25000   },
  { id: "EMP069", name: "Mithun", organization: "CAFE", department: "Cleaning", team: "Cleaning Staff", phone: "9234030514", userid: "mithun1@gmail.com", password: "*zdEB34C", gender: "male", age: 27,  DOJ: "2022-03-15", place: "Chennai", nationality: "Indian", qualification: "Diploma",  salary: 25000   },
  { id: "EMP070", name: "Dhas", organization: "CAFE", department: "Cleaning", team: "Cleaning Staff", phone: "6905324585", userid: "dhas1@gmail.com", password: "vWz^qY5A" , gender: "male", age: 27,  DOJ: "2022-03-15", place: "Chennai", nationality: "Indian", qualification: "Diploma",  salary: 25000  },

  
];

const EmployeeTable = () => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployeesData);
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [orgFilter, setOrgFilter] = useState("");
  const [deptFilter, setDeptFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [idError, setIdError] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editEmployee, setEditEmployee] = useState<Employee>({
    id: "",
    name: "",
    organization: "",
    department: "",
    team: "",
    phone: "",
    userid: "",
    password: "",
    gender: "",
    age: 0,
    DOJ: "",
    place: "",
    nationality: "",
    qualification: "",
    salary: 0,
  });

  const [newEmployee, setNewEmployee] = useState<Employee>({
    id: "",
    name: "",
    organization: "",
    department: "",
    team: "",
    phone: "",
    userid: "",
    password: "",
    gender: "",
    age: 0,
    DOJ: "",
    place: "",
    nationality: "",
    qualification: "",
    salary: 0,
  });

  const isEmployeeIdExists = (id: string) =>
    employees.some((emp) => emp.id.toLowerCase() === id.toLowerCase());

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleInputChange = (field: keyof Employee, value: string | number) => {
  if (field === "id") {
    const idValue = String(value).trim();

    if (isEmployeeIdExists(idValue)) {
      setIdError("Employee ID already exists. Please use a different ID.");
    } else {
      setIdError("");
    }
  }

  setNewEmployee((prev) => ({
    ...prev,
    [field]: value,
  }));
};


 const addEmployee = () => {
  if (
    !newEmployee.id.trim() ||
    !newEmployee.name.trim() ||
    !newEmployee.organization.trim() ||
    !newEmployee.department.trim() ||
    !newEmployee.team.trim()
  ) {
    alert("Please fill all required fields");
    return;
  }

  if (isEmployeeIdExists(newEmployee.id.trim())) {
    alert("Employee ID already exists. Please use a different ID.");
    return;
  }

  setEmployees([...employees, { ...newEmployee, id: newEmployee.id.trim() }]);
  setShowModal(false);

  setNewEmployee({
    id: "",
    name: "",
    organization: "",
    department: "",
    team: "",
    phone: "",
    userid: "",
    password: "",
    gender: "",
    age: 0,
    DOJ: "",
    place: "",
    nationality: "",
    qualification: "",
    salary: 0,
  });
};


  const handleEdit = (emp: Employee) => {
  setEditId(emp.id);
  setEditEmployee({ ...emp });
  setShowModal(true);
};


  const handleUpdate = () => {
  setEmployees((prev) =>
    prev.map((emp) =>
      emp.id === editId ? editEmployee : emp
    )
  );

  setEditId(null);
  setShowModal(false);
};

const closeModal = () => {
  setShowModal(false);
  setEditId(null);
  setIdError("");
};


  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this employee?")) {
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
      alert("Employee deleted successfully");
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Employee Report", 14, 15);
    const rows = employees
      .filter((emp) => selected.length === 0 || selected.includes(emp.id))
      .map((emp, index) => [
        index + 1,
        emp.organization,
        emp.department,
        emp.team,
        emp.id,
        emp.name,
        emp.phone,
        emp.userid,
        emp.password,
        emp.gender,
        emp.age,
        emp.DOJ,
        emp.place,
        emp.nationality,
        emp.qualification,
        emp.salary,
      ]);

    autoTable(doc, {
      startY: 20,
      head: [
        [
          "#",
          "Organization",
          "Department",
          "Team",
          "Employee ID",
          "Employee Name",
          "Phone",
          "User ID",
          "Password",
          "Gender",
          "Age",
          "DOJ",
          "Place",
          "Nationality",
          "Qualification",
          "Salary",
        ],
      ],
      body: rows,
    });

    doc.save("employees.pdf");
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      (orgFilter ? emp.organization === orgFilter : true) &&
      (deptFilter ? emp.department === deptFilter : true) &&
      (search
        ? emp.name.toLowerCase().includes(search.toLowerCase()) ||
          emp.id.toLowerCase().includes(search.toLowerCase()) ||
          emp.phone.toLowerCase().includes(search.toLowerCase())
        : true)
  );

  return (
    <div className="overflow-x-auto p-2">
      <div className="p-4 bg-white rounded shadow">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-4">
          <input
            placeholder="Search by Name or ID or Phone"
            className="border px-3 py-2 rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border px-3 py-2 rounded"
            onChange={(e) => setOrgFilter(e.target.value)}
          >
            <option value="">All Organizations</option>
            <option value="CITY TYRE">CITY TYRE</option>
            <option value="MILLER">MILLER</option>
            <option value="CONSTRUCTION">CONSTRUCTION</option>
            <option value="CAFE">CAFE</option>
          </select>

          <select
            className="border px-3 py-2 rounded"
            onChange={(e) => setDeptFilter(e.target.value)}
          >
            <option value="">All Departments</option>
            <option value="Production">Production</option>
            <option value="Quality Controller">Quality Controller</option>
            <option value="Sales">Sales</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Operations">Operations</option>
            <option value="Engineering">Engineering</option>
            <option value="Kitchen">Kitchen</option>
          </select>

          <button
            onClick={downloadPDF}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Download PDF
          </button>

          <button
  className="bg-green-600 text-white px-4 py-2 rounded"
  onClick={() => {
    setEditId(null);      
    setShowModal(true);
  }}
>
  Add Employee
</button>

        </div>

        {/* Table */}
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border px-3 py-2">✔</th>
              <th className="border px-3 py-2">#</th>
              <th className="border px-3 py-2">Employee ID</th>
              <th className="border px-3 py-2">Organization</th>
              <th className="border px-3 py-2">Department</th>
              <th className="border px-3 py-2">Team</th>
              <th className="border px-3 py-2">Employee Name</th>
              <th className="border px-3 py-2">Phone</th>
              <th className="border px-3 py-2">User ID</th>
              <th className="border px-3 py-2">Password</th>
              <th className="border px-3 py-2">Gender</th>
              <th className="border px-3 py-2">Age</th>
              <th className="border px-3 py-2">DOJ</th>
              <th className="border px-3 py-2">Place</th>
              <th className="border px-3 py-2">Nationality</th>
              <th className="border px-3 py-2">Qualification</th>
              <th className="border px-3 py-2">Salary</th>
              <th className="border px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp, index) => (
              <tr key={emp.id} className="text-center hover:bg-gray-100">
                <td className="border px-3 py-2">
                  <input
                    type="checkbox"
                    checked={selected.includes(emp.id)}
                    onChange={() => toggleSelect(emp.id)}
                  />
                </td>
                <td className="border px-3 py-2">{index + 1}</td>
                <td className="border px-3 py-2">{emp.id}</td>
                <td className="border px-3 py-2">{emp.organization}</td>
                <td className="border px-3 py-2">{emp.department}</td>
                <td className="border px-3 py-2">{emp.team}</td>
                <td className="border px-3 py-2">{emp.name}</td>
                <td className="border px-3 py-2">{emp.phone}</td>
                <td className="border px-3 py-2">{emp.userid}</td>
                <td className="border px-3 py-2">{emp.password}</td>
                <td className="border px-3 py-2">{emp.gender}</td>
                <td className="border px-3 py-2">{emp.age}</td>
                <td className="border px-3 py-2">{emp.DOJ}</td>
                <td className="border px-3 py-2">{emp.place}</td>
                <td className="border px-3 py-2">{emp.nationality}</td>
                <td className="border px-3 py-2">{emp.qualification}</td>
                <td className="border px-3 py-2">{emp.salary}</td>
              <td className="border px-3 py-2 flex flex-col items-center gap-2">
  <div className="flex gap-2 justify-center">
  <button
  className="bg-yellow-500 text-white px-2 py-1 rounded"
  onClick={() => {
    setEditId(emp.id);
    setEditEmployee({ ...emp });
    setShowModal(true);
  }}
>
  Edit
</button>

  <button
    className="bg-red-600 text-white px-2 py-1 rounded w-full"
    onClick={() => handleDelete(emp.id)}
  >
    Delete
  </button></div>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Employee Modal */}
      {showModal && (
       <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm bg-white/50">

          <div className="bg-[#f3f4f6] rounded p-6 w-106 max-h-[90vh] overflow-y-auto">
           <h2 className="text-xl font-bold mb-4">
  {editId ? "Edit Employee" : "Add Employee"}
</h2>


            <div className="flex flex-col gap-2">
              <input
                placeholder="Employee ID"
                className="border p-2 rounded"
                value={newEmployee.id}
                onChange={(e) => handleInputChange("id", e.target.value)}
              />
              {idError && <p className="text-red-500 text-sm">{idError}</p>}
              <input
                placeholder="Name"
                className="border p-2 rounded"
                value={newEmployee.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
              <input
                placeholder="Organization"
                className="border p-2 rounded"
                value={newEmployee.organization}
                onChange={(e) => handleInputChange("organization", e.target.value)}
              />
              <input
                placeholder="Department"
                className="border p-2 rounded"
                value={newEmployee.department}
                onChange={(e) => handleInputChange("department", e.target.value)}
              />
              <input
                placeholder="Team"
                className="border p-2 rounded"
                value={newEmployee.team}
                onChange={(e) => handleInputChange("team", e.target.value)}
              />
              <input
                placeholder="Phone"
                className="border p-2 rounded"
                value={newEmployee.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
              <input
                placeholder="User ID"
                className="border p-2 rounded"
                value={newEmployee.userid}
                onChange={(e) => handleInputChange("userid", e.target.value)}
              />
              <input
                placeholder="Password"
                className="border p-2 rounded"
                value={newEmployee.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
              />
              <input
                placeholder="Gender"
                className="border p-2 rounded"
                value={newEmployee.gender}
                onChange={(e) => handleInputChange("gender", e.target.value)}
              />
              <input
                placeholder="Age"
                type="number"
                className="border p-2 rounded"
                value={newEmployee.age}
                onChange={(e) => handleInputChange("age", Number(e.target.value))}
              />
              <input
                placeholder="Date of Joining (YYYY-MM-DD)"
                className="border p-2 rounded"
                value={newEmployee.DOJ}
                onChange={(e) => handleInputChange("DOJ", e.target.value)}
              />
              <input
                placeholder="Place"
                className="border p-2 rounded"
                value={newEmployee.place}
                onChange={(e) => handleInputChange("place", e.target.value)}
              />
              <input
                placeholder="Nationality"
                className="border p-2 rounded"
                value={newEmployee.nationality}
                onChange={(e) => handleInputChange("nationality", e.target.value)}
              />
              <input
                placeholder="Qualification"
                className="border p-2 rounded"
                value={newEmployee.qualification}
                onChange={(e) => handleInputChange("qualification", e.target.value)}
              />
              <input
                placeholder="Salary"
                type="number"
                className="border p-2 rounded"
                value={newEmployee.salary}
                onChange={(e) => handleInputChange("salary", Number(e.target.value))}
              />

            <div className="flex justify-end gap-3 mt-4">
  <button
    className="bg-gray-500 text-white px-4 py-2 rounded"
    onClick={closeModal}
  >
    Cancel
  </button>

  {editId ? (
    <button
      className="bg-yellow-600 text-white px-4 py-2 rounded"
      onClick={handleUpdate}
    >
      Update Employee
    </button>
  ) : (
    <button
      className={`px-4 py-2 rounded text-white ${
        idError ? "bg-gray-400 cursor-not-allowed" : "bg-green-600"
      }`}
      onClick={addEmployee}
      disabled={!!idError}
    >
      Add Employee
    </button>
  )}
</div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;



