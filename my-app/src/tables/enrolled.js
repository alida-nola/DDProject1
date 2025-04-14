import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const EnrolledTable = () => {
  const [enrolled, setEnrolled] = useState([]);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [newEnrolled, setNewEnrolled] = useState({
    course_id: '',
    student_id: '',
    capacity: '',
    semester: '',
  });

  const [editEnrolled, setEditEnrolled] = useState(null);
  useEffect(() => {
    fetchEnrolled();
    fetchCourses();
    fetchStudents();
  }, []);

  const fetchEnrolled = async () => {
    try {
      const response = await axios.get('http://localhost:5071/api/Enrolled');
      setEnrolled(response.data);
    } catch (error) {
      console.error('Error fetching Enrolled:', error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5071/api/Course');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching Courses:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5071/api/Student');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching Students:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEnrolled(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateEnrolled = async (e) => {
    e.preventDefault();
    
    const payload = {
      course_id: parseInt(newEnrolled.course_id),
      student_id: parseInt(newEnrolled.student_id),
      capacity: parseInt(newEnrolled.capacity),
      semester: newEnrolled.semester,
    };
  
    try {
      await axios.post('http://localhost:5071/api/Enrolled', payload);
      setNewEnrolled({
        course_id: '',
        student_id: '',
        capacity: '',
        semester: ''
      });
      setShowModal(false);
      fetchEnrolled();
    } catch (error) {
      console.error("Error creating Enrolled:", error);
      if (error.response) {
        console.error("Backend error:", error.response.data);
      }
    }
  };
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5071/api/Enrolled/${id}`);
      fetchEnrolled();
    } catch (error) {
      console.error('Error deleting Enrolled:', error);
    }
  };

  const handleEdit = (enrolled) => {
    setEditEnrolled({ ...enrolled });
    setShowEditModal(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditEnrolled(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateEnrolled = async (e) => {
    e.preventDefault();
  
    const payload = {
      course_id: parseInt(editEnrolled.course_id), 
      student_id: parseInt(editEnrolled.student_id), 
      capacity: parseInt(editEnrolled.capacity), 
      semester: editEnrolled.semester, 
    };
  
    try {
      await axios.put(`http://localhost:5071/api/Enrolled/${editEnrolled.enrolled_id}`, payload);
      setShowEditModal(false);
      fetchEnrolled();
    } catch (error) {
      console.error('Error updating Enrolled:', error);
      if (error.response) {
        console.error("Backend error:", error.response.data); 
      }
    }
  };
  
  return (
    <div className="p-1">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h2 className="mb-0">Enrolled</h2>
        <button className='custom-button' onClick={() => setShowModal(true)}>+ Enroll</button>
      </div>

      <Table striped bordered hover responsive className="mt-2">
        <thead>
          <tr>
            <th style={{ backgroundColor: '#4D6C93', color: 'white'}}>ID</th>
            <th style={{ backgroundColor: '#4D6C93', color: 'white'}}>Course ID</th>
            <th style={{ backgroundColor: '#4D6C93', color: 'white'}}>Student ID</th>
            <th style={{ backgroundColor: '#4D6C93', color: 'white'}}>Capacity</th>
            <th style={{ backgroundColor: '#4D6C93', color: 'white'}}> Semester</th>
            <th style={{ backgroundColor: '#4D6C93', color: 'white'}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {enrolled.map(enrolled => (
            <tr key={enrolled.enrolled_id}>
              <td>{enrolled.enrolled_id}</td>
              <td>{enrolled.course_id}</td>
              <td>{enrolled.student_id}</td>
              <td>{enrolled.capacity}</td>
              <td>{enrolled.semester}</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleEdit(enrolled)}
                  >
                    Edit
                  </Button>

                  <div
                    style={{
                      width: '1px',
                      height: '20px',
                      backgroundColor: '#ccc',
                      margin: '0 8px',
                    }}
                  ></div>

                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(enrolled.enrolled_id)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Create Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Course Enrollment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateEnrolled}>
            <Form.Group className="mb-3">
              <Form.Label>Course</Form.Label>
              <Form.Select
                name="course_id"
                value={newEnrolled.course_id}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Course</option>
                {courses.map(course => (
                  <option key={course.course_id} value={course.course_id}>
                    {course.course_id} - {course.course_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Student</Form.Label>
              <Form.Select
                name="student_id"
                value={newEnrolled.student_id}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Student</option>
                {students.map(student => (
                  <option key={student.student_id} value={student.student_id}>
                    {student.student_id} - {student.first_name} {student.last_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Capacity</Form.Label>
              <Form.Control
                  type="number"
                  name="capacity"
                  value={newEnrolled.capacity}
                  onChange={handleInputChange}
                  required
                >
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>Semester</Form.Label>
              <Form.Control
                  type="text"
                  name="semester"
                  value={newEnrolled.semester}
                  onChange={handleInputChange}
                  required
                >
              </Form.Control>
            </Form.Group>
            <button type="submit" className="custom-button">Submit</button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enrollment Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editEnrolled && (
            <Form onSubmit={handleUpdateEnrolled}>
            <Form.Group className="mb-3">
              <Form.Label>Course</Form.Label>
              <Form.Select
                name="course_id"
                value={editEnrolled.course_id}
                onChange={handleEditInputChange}
                required
              >
                <option value="">Select Course</option>
                {courses.map(course => (
                  <option key={course.course_id} value={course.course_id}>
                    {course.course_id} - {course.course_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Student</Form.Label>
              <Form.Select
                name="student_id"
                value={editEnrolled.student_id}
                onChange={handleEditInputChange}
                required
              >
                <option value="">Select Student</option>
                {students.map(student => (
                  <option key={student.student_id} value={student.student_id}>
                    {student.student_id} - {student.first_name} {student.last_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Capacity</Form.Label>
                <Form.Control
                  type="number"
                  name="capacity"
                  value={editEnrolled.capacity}
                  onChange={handleEditInputChange}
                  required>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Semester</Form.Label>
                <Form.Control
                  type="text"
                  name="semester"
                  value={editEnrolled.semester}
                  onChange={handleEditInputChange}
                  required>
                </Form.Control>
              </Form.Group>
              <button type="submit" className="custom-button">Update</button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EnrolledTable;
