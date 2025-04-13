import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const CourseTable = () => {
  const [Courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [newCourse, setNewCourse] = useState({
    course_name: '',
    couse_department: '',
    credit_hours: ''
  });

  const [editCourse, setEditCourse] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

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
    setNewCourse(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5071/api/Course', newCourse);
      setNewCourse({ first_name: '', last_name: '', major: '' });
      setShowModal(false);
      fetchCourses();
    } catch (error) {
      console.error('Error creating Course:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5071/api/Course/${id}`);
      fetchCourses();
    } catch (error) {
      console.error('Error deleting Course:', error);
    }
  };

  const handleEdit = (Course) => {
    setEditCourse({ ...Course });
    setShowEditModal(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditCourse(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5071/api/Course/${editCourse.course_id}`, editCourse);
      setShowEditModal(false);
      fetchCourses();
    } catch (error) {
      console.error('Error updating Course:', error);
    }
  };

  return (
    <div className="p-1">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h2 className="mb-0">Courses</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>+ Create Course</Button>
      </div>

      <Table striped bordered hover responsive className="mt-2">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Credit Hours</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Courses.map(Course => (
            <tr key={Course.course_id}>
              <td>{Course.course_id}</td>
              <td>{Course.course_name}</td>
              <td>{Course.course_department}</td>
              <td>{Course.credit_hours}</td>
              <td>
                <Dropdown as={ButtonGroup}>
                  <Button variant="outline-secondary" size="sm">Actions</Button>
                  <Dropdown.Toggle split variant="outline-secondary" id={`dropdown-${Course.course_id}`} />
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleEdit(Course)}>Edit</Dropdown.Item>
                    <Dropdown.Item className="text-danger" onClick={() => handleDelete(Course.course_id)}>Delete</Dropdown.Item>
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
          <Modal.Title>Create New Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateCourse}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="course_name"
                value={newCourse.first_name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                name="course_department"
                value={newCourse.course_department}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Credit Hours</Form.Label>
              <Form.Control
                type="text"
                name="credit_hours"
                value={newCourse.credit_hours}
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
          <Modal.Title>Edit Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editCourse && (
            <Form onSubmit={handleUpdateCourse}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="course_name"
                  value={editCourse.course_name}
                  onChange={handleEditInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Department</Form.Label>
                <Form.Control
                  type="text"
                  name="course_department"
                  value={editCourse.course_department}
                  onChange={handleEditInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Credit Hours</Form.Label>
                <Form.Control
                  type="number"
                  name="credit_hours"
                  value={editCourse.credit_hours}
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

export default CourseTable;
