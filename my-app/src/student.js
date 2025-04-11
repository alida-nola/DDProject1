import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentTable = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5071/api/Student')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      });
  }, []);
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Student List</h2>
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">First Name</th>
            <th className="border px-4 py-2">Last Name</th>
            <th className="border px-4 py-2">Major</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.student_id}>
              <td className="border px-4 py-2">{student.student_id}</td>
              <td className="border px-4 py-2">{student.first_name}</td>
              <td className="border px-4 py-2">{student.last_name}</td>
              <td className="border px-4 py-2">{student.major}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
