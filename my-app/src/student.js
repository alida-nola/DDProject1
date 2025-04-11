import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [newStudent, setNewStudent] = useState({
    first_name: '',
    last_name: '',
    major: ''
  });

  const [editStudent, setEditStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5071/api/Student');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateStudent = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5071/api/Student', newStudent);
      setNewStudent({ first_name: '', last_name: '', major: '' });
      setShowModal(false);
      fetchStudents();
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5071/api/Student/${id}`);
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleEdit = (student) => {
    setEditStudent({ ...student });
    setShowEditModal(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditStudent(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5071/api/Student/${editStudent.student_id}`, editStudent);
      setShowEditModal(false);
      fetchStudents();
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="mb-0">Students</h1>
        <Button variant="primary" onClick={() => setShowModal(true)}>+ Create Student</Button>
      </div>

      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Major</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.student_id}>
              <td>{student.student_id}</td>
              <td>{student.first_name}</td>
              <td>{student.last_name}</td>
              <td>{student.major}</td>
              <td>
                <Dropdown as={ButtonGroup}>
                  <Button variant="outline-secondary" size="sm">Actions</Button>
                  <Dropdown.Toggle split variant="outline-secondary" id={`dropdown-${student.student_id}`} />
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleEdit(student)}>Edit</Dropdown.Item>
                    <Dropdown.Item className="text-danger" onClick={() => handleDelete(student.student_id)}>Delete</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Create Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateStudent}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={newStudent.first_name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={newStudent.last_name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Major</Form.Label>
              <Form.Control
                type="text"
                name="major"
                value={newStudent.major}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button type="submit" variant="success">Submit</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editStudent && (
            <Form onSubmit={handleUpdateStudent}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  value={editStudent.first_name}
                  onChange={handleEditInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="last_name"
                  value={editStudent.last_name}
                  onChange={handleEditInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Major</Form.Label>
                <Form.Control
                  type="text"
                  name="major"
                  value={editStudent.major}
                  onChange={handleEditInputChange}
                  required
                />
              </Form.Group>
              <Button type="submit" variant="primary">Update</Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default StudentTable;
