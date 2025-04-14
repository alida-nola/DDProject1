import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ProfessorAssignedTable = () => {
  const [professorAssigned, setProfessorAssigned] = useState([]);
  const [professors, setProfessors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [newProfessorAssigned, setNewProfessorAssigned] = useState({
    professor_id: '',
    course_id: '',
    semester: '',
  });

  const [editProfessorAssigned, setEditProfessorAssigned] = useState(null);

  useEffect(() => {
    fetchProfessorAssigned();
    fetchProfessors();
    fetchCourses();
  }, []);

  const fetchProfessorAssigned = async () => {
    try {
      const response = await axios.get('http://localhost:5071/api/professorAssigned');
      console.log(response.data);
      setProfessorAssigned(response.data);
    } catch (error) {
      console.error('Error fetching Professor Assigned:', error);
    }
  };

  const fetchProfessors = async () => {
    try {
      const response = await axios.get('http://localhost:5071/api/Professor');
      setProfessors(response.data);
    } catch (error) {
      console.error('Error fetching Professors:', error);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProfessorAssigned(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCreateProfessorAssigned = async (e) => {
    e.preventDefault();
  
    const payload = {
      professor_id: parseInt(newProfessorAssigned.professor_id),
      course_id: parseInt(newProfessorAssigned.course_id),
      semester: newProfessorAssigned.semester
    };    
  
    try {
      await axios.post('http://localhost:5071/api/professorAssigned', payload);
      setNewProfessorAssigned({ professor_id: '', course_id: '', semester: '' });
      setShowModal(false);
      fetchProfessorAssigned();
    } catch (error) {
      console.error('Error creating Professor Assigned:', error);
      if (error.response?.data) {
        console.error('Server says:', error.response.data);
      }
    }
  };
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5071/api/professorAssigned/${id}`);
      fetchProfessorAssigned();
    } catch (error) {
      console.error('Error deleting ProfessorAssigned:', error);
    }
  };

  const handleEdit = (professorAssigned) => {
    setEditProfessorAssigned({ ...professorAssigned });
    setShowEditModal(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditProfessorAssigned(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfessorAssigned = async (e) => {
    e.preventDefault();
  
    const payload = {
      professor_id: parseInt(editProfessorAssigned.professor_id),
      course_id: parseInt(editProfessorAssigned.course_id),
      semester: editProfessorAssigned.semester,
    };
  
    try {
      console.log('Updating professor assigned:', payload);  
      await axios.put(
        `http://localhost:5071/api/professorAssigned/${editProfessorAssigned.assigned_id}`, payload);
      setShowEditModal(false);
      fetchProfessorAssigned();
    } catch (error) {
      console.error('Error updating Professor Assigned:', error);
      if (error.response?.data) {
        console.error('Server says:', error.response.data);
      }
    }
  };
  
  return (
    <div className="p-1">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h2 className="mb-0">Professor Assigned</h2>
        <button className='custom-button' onClick={() => setShowModal(true)}>+ Assign</button>
      </div>

      <Table striped bordered hover responsive className="mt-2">
        <thead>
          <tr>
            <th style={{ backgroundColor: '#4D6C93', color: 'white'}}>ID</th>
            <th style={{ backgroundColor: '#4D6C93', color: 'white'}}>Professor ID</th>
            <th style={{ backgroundColor: '#4D6C93', color: 'white'}}>Course ID</th>
            <th style={{ backgroundColor: '#4D6C93', color: 'white'}}>Semester</th>
            <th style={{ backgroundColor: '#4D6C93', color: 'white'}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {professorAssigned.map(professorAssigned => (
            <tr key={professorAssigned.assigned_id}>
              <td>{professorAssigned.assigned_id}</td>
              <td>{professorAssigned.professor_id}</td>
              <td>{professorAssigned.course_id}</td>
              <td>{professorAssigned.semester}</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleEdit(professorAssigned)}
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
                    onClick={() => handleDelete(professorAssigned.assigned_id)}
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
          <Modal.Title>Professor Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateProfessorAssigned}>
            <Form.Group className="mb-3">
              <Form.Label>Professor</Form.Label>
              <Form.Select
                name="professor_id"
                value={newProfessorAssigned.professor_id}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Professor</option>
                {professors.map(professor => (
                  <option key={professor.professor_id} value={professor.professor_id}>
                    {professor.professor_id} - {professor.first_name} {professor.last_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Course</Form.Label>
              <Form.Select
                name="course_id"
                value={newProfessorAssigned.course_id}
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
              <Form.Label>Semester</Form.Label>
              <Form.Control
                type="text"
                name="semester"
                value={newProfessorAssigned.semester}
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
          <Modal.Title>Professor Assignment Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editProfessorAssigned && (
            <Form onSubmit={handleUpdateProfessorAssigned}>
              <Form.Group className="mb-3">
              <Form.Label>Professor</Form.Label>
              <Form.Select
                name="professor_id"
                value={editProfessorAssigned.professor_id}
                onChange={handleEditInputChange}
                required
              >
                <option value="">Select Professor</option>
                {professors.map(professor => (
                  <option key={professor.professor_id} value={professor.professor_id}>
                    {professor.professor_id} - {professor.first_name} {professor.last_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
              <Form.Group className="mb-3">
              <Form.Label>Course</Form.Label>
              <Form.Select
                name="course_id"
                value={editProfessorAssigned.course_id}
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
                  <Form.Label>Semester</Form.Label>
                  <Form.Control
                    type="text"
                    name="semester"
                    value={editProfessorAssigned.semester}
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

export default ProfessorAssignedTable;
