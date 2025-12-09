
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus,X } from "lucide-react";
import { Filter } from "../assets/Filter.js";


export default function Dashboard() {

  const [students, setStudents] = useState([]);
  
  const getStudents = async () => {
    const response = await fetch("http://localhost:8080/api/students");
    const data = await response.json();
    setStudents(data);
  };

  useEffect(() => {
    getStudents();
  }, []);

  const courseCount = students.reduce((acc, student) => {
    acc[student.course] = (acc[student.course] || 0) + 1;
    return acc;
  }, {});

  const courseMap = {
    BSIT: "Bachelor of Science in Information Technology",
    BSCS: "Bachelor of Science in Computer Science"
  };

  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);

  const filteredStudents = Filter(students, search);

  const firstyear = filteredStudents.filter((student) => student.yearLevel === '1').length;
  const secondyear = filteredStudents.filter((student) => student.yearLevel === '2').length;
  const thirdyear = filteredStudents.filter((student) => student.yearLevel === '3').length;
  const fourthyear = filteredStudents.filter((student) => student.yearLevel === '4').length;


  return (
    <div className="flex justify-between gap-8 mt-4 p-4">
      
      {/* Statistics Card */}
      <div className=" flex-col flex gap-4 border border-gray-200 rounded-xl p-4 bg-white  flex-1 border-t-4 border-t-primary">

          <button onClick={()=>setShowAccountModal(true)} className="cursor-pointer bg-primary flex-center gap-1 text-sm font-bold px-4 p-2 rounded-2xl text-white w-fit">
            <Plus size={16} strokeWidth={4}/> Create Account
          </button>

        <div className="w-full flex-center justify-between border border-gray-200 shadow-sm rounded-lg p-4 px-8 border-l-4 border-l-primary">
          <h2 className="font-bold bg-primary text-white p-2 px-4 rounded-full">Total Students</h2>
          <h1 className="font-black text-2xl">{students.length}</h1>
        </div>

        <div className="w-full flex-col flex-center items-start border border-gray-200 shadow-sm rounded-lg p-4 px-8 border-l-4 border-l-primary">
          <h2 className="font-bold bg-primary text-white p-2 px-4 rounded-full">
            Courses
          </h2>

          <ul className="mt-4 space-y-2 w-full">
            {Object.entries(courseCount).map(([course, total]) => (
              <li key={course} className="flex justify-between w-full border-b border-gray-200 p-2">
                <span className="font-semibold text-sm italic">{courseMap[course]}</span>
                <span className="text-primary font-bold text-lg">{total}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full flex-col flex-center items-start border border-gray-200 shadow-sm rounded-lg p-4 px-8 border-l-4 border-l-primary">
          <h2 className="font-bold bg-primary text-white p-2 px-4 rounded-full">
            Year Level
          </h2>

          <div className="w-full">
            <ul className="mt-4 space-y-2 w-full">
              <li className="flex justify-between w-full border-b border-gray-200 p-2">
                <span className="font-semibold text-sm italic">First Year</span>
                <span className="text-primary font-bold text-lg">{firstyear}</span>
              </li>
              <li className="flex justify-between w-full border-b border-gray-200 p-2">
                <span className="font-semibold text-sm italic">Second Year</span>
                <span className="text-primary font-bold text-lg">{secondyear}</span>
              </li>
              <li className="flex justify-between w-full border-b border-gray-200 p-2">
                <span className="font-semibold text-sm italic">Third Year</span>
                <span className="text-primary font-bold text-lg">{thirdyear}</span>
              </li>
              <li className="flex justify-between w-full border-b border-gray-200 p-2">
                <span className="font-semibold text-sm italic">Fourth Year</span>
                <span className="text-primary font-bold text-lg">{fourthyear}</span>
              </li>
            </ul>
          </div>
        </div>


      </div>

      <div className="flex flex-col gap-4 border border-gray-200 rounded-xl p-4 bg-white flex-1/4 h-165 border-t-4 border-t-primary">
        <div className="flex-center justify-between ">
          <h2 className="font-bold text-lg text-gray-600 italic ">Students List</h2>
          <button onClick={()=>setShowModal(true)} className="cursor-pointer bg-primary flex-center gap-1 text-sm font-bold px-4 p-2 rounded-2xl text-white">
           <Plus size={16} strokeWidth={4}/> Add Student
          </button>
        </div>

        <div className="border rounded-lg border-gray-200 shadow-sm">
          <input onChange={(e)=> setSearch(e.target.value)} type="text" className="px-4 p-2 outline-0 w-full" />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-primary text-white">
              <tr>
                <th className="p-4 border">Student ID</th>
                <th className="p-4 border">Lastname</th>
                <th className="p-4 border">Firstname</th>
                <th className="p-4 border">Middle</th>
                <th className="p-4 border">Year Level</th>
                <th className="p-4 border">Section</th>
                <th className="p-4 border">Course</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s) => (
                <tr key={s.studentId} onClick={() => setSelectedStudent(s)} className="font-semibold transition hover:bg-primary/25 cursor-pointer">
                  <td className="p-4">{s.studentId}</td>
                  <td className="p-4 ">{s.lastName}</td>
                  <td className="p-4 ">{s.firstName}</td>
                  <td className="p-4 ">{s.middleName}</td>
                  <td className="p-4 ">{s.yearLevel}</td>
                  <td className="p-4 ">{s.section}</td>
                  <td className="p-4 ">{s.course}</td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-4 text-center font-semibold italic">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {selectedStudent && (
        <StudentModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
          getStudents={getStudents}
        />
      )}

      {showModal && (
        <AddModal
          onClose={() => setShowModal(false)}
          getStudents={getStudents}
        />
      )}

      {showAccountModal && (
        <CreateAccountForm
          onClose={() => setShowAccountModal(false)}
        />
      )}  

    </div>
  );
}



export function CreateAccountForm({ onClose, getUsers }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.text())
      .then((data) => {
        alert("Account created successfully!");
        handleClear();
        onClose?.();  
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Username */}
          <div className="flex flex-col">
            <label htmlFor="username" className="font-semibold mb-1">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label htmlFor="password" className="font-semibold mb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="border border-gray-300 rounded-lg p-2"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={handleClear}
              className="border-2 border-primary px-4 py-2 rounded-xl text-primary font-bold hover:bg-gray-100"
            >
              Clear
            </button>

            <button
              type="submit"
              className="bg-primary px-4 py-2 rounded-xl text-white font-bold hover:opacity-90"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}



function StudentModal({ student, onClose, getStudents }) {
  const courseMap = {
    BSIT: "Bachelor of Science in Information Technology",
    BSCS: "Bachelor of Science in Computer Science"
  };

  const ArchiveStudent = () =>{
    fetch(`http://localhost:8080/api/students/${student.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    }).then(() => {
      onClose();
      alert("Student archived!");
      getStudents();
    }).catch((err) => {
      alert(err);
    });
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative">

        {/* Profile Section */}
        <div className="flex flex-col items-center text-center mb-5">
          <img
            src="https://i.pravatar.cc/150"
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-gray-200 shadow-md"
          />

          <h2 className="text-2xl font-bold mt-3">
            {student.firstName} {student.middleName.charAt(0) + '.'} {student.lastName}
          </h2>

          <p className="text-gray-500 mt-3 text-sm font-bold">
            {courseMap[student.course]}
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-gray-50 rounded-lg p-4 shadow-inner">
          <div className="grid grid-cols-2 font-semibold gap-3 text-sm">

            <p><span className="font-semibold">ID:</span> {student.studentId}</p>

            <p><span className="font-semibold">Section:</span> {student.section}</p>

            <p><span className="font-semibold">Course:</span> {student.course}</p>

            <p><span className="font-semibold">Year Level:</span> {student.yearLevel}</p>
          </div>
        </div>

        <div className="flex flex-row-reverse gap-8 font-bold">
          <button
            onClick={onClose}
            className="mt-6 cursor-pointer w-full bg-primary text-white py-2 rounded-lg hover:opacity-90"
          >
            Close
          </button>

                  <button
            onClick={ArchiveStudent}
            className="mt-6 w-full cursor-pointer border-2 border-primary text-primary py-2 rounded-lg "
          >
            Archive Student
          </button>
        </div>
      </div>
    </div>
  );
}


function AddModal({ onClose,getStudents }) {
  const [formData, setFormData] = useState({
    studentId: "",
    firstName: "",
    lastName: "",
    middleName: "",
    section: "",
    yearLevel: "",
    course: "",
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setFormData({
      studentId: "",
      firstName: "",
      lastName: "",
      middleName: "",
      section: "",
      yearLevel: "",
      course: "",
      status: "Active",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then(() => {
      handleClear();
      alert("Student submitted!");
      getStudents();
      onClose();
    }).catch((err) => {
      alert(err);
    });
    
  };

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white w-2xl rounded-lg shadow-lg p-4 relative">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">Student Form</h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-500 hover:text-black text-xl"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mt-4">

            {/* Student ID */}
            <div className="col-span-2 flex flex-col gap-1">
              <label htmlFor="studentId" className="text-sm font-semibold">
                Student ID
              </label>
              <input
                type="text"
                id="studentId"
                name="studentId"
                placeholder="Enter Student ID"
                value={formData.studentId}
                onChange={handleChange}
                className="border border-gray-300 w-full rounded-lg p-2"
              />
            </div>

            {/* First Name */}
            <div className="flex flex-col gap-1">
              <label htmlFor="firstName" className="text-sm font-semibold">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="border border-gray-300 w-full rounded-lg p-2"
              />
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-1">
              <label htmlFor="lastName" className="text-sm font-semibold">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="border border-gray-300 w-full rounded-lg p-2"
              />
            </div>

            {/* Middle Name */}
            <div className="flex flex-col gap-1">
              <label htmlFor="middleName" className="text-sm font-semibold">
                Middle Name
              </label>
              <input
                type="text"
                id="middleName"
                name="middleName"
                placeholder="Middle Name"
                value={formData.middleName}
                onChange={handleChange}
                className="border border-gray-300 w-full rounded-lg p-2"
              />
            </div>

            {/* Section */}
            <div className="flex flex-col gap-1">
              <label htmlFor="section" className="text-sm font-semibold">
                Section
              </label>
              <select
                id="section"
                name="section"
                value={formData.section}
                onChange={handleChange}
                className="border border-gray-300 w-full rounded-lg p-2"
              >
                <option value="">Select Section</option>
                {["A", "B", "C", "D"].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Year Level */}
            <div className="flex flex-col gap-1">
              <label htmlFor="yearLevel" className="text-sm font-semibold">
                Year Level
              </label>
              <select
                id="yearLevel"
                name="yearLevel"
                value={formData.yearLevel}
                onChange={handleChange}
                className="border border-gray-300 w-full rounded-lg p-2"
              >
                <option value="">Select Year</option>
                {[1, 2, 3, 4].map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            {/* Course */}
            <div className="flex flex-col gap-1">
              <label htmlFor="course" className="text-sm font-semibold">
                Course
              </label>
              <select
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="border border-gray-300 w-full rounded-lg p-2"
              >
                <option value="">Select Course</option>
                {["BSIT", "BSCS"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={handleClear}
              className="border-2 border-primary px-4 py-2 rounded-xl text-primary font-bold cursor-pointer"
            >
              Clear
            </button>

            <button
              type="submit"
              className="bg-primary px-4 py-2 rounded-xl text-white font-bold cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}



