import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const EnrolledTable = () => {
  const [Enrolleds, setEnrolleds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [newEnrolled, setNewEnrolled] = useState({
    first_name: '',
    last_name: '',
    major: ''
  });

  const [editEnrolled, setEditEnrolled] = useState(null);

  useEffect(() => {
    fetchEnrolleds();
  }, []);

  const fetchEnrolleds = async () => {
    try {
      const response = await axios.get('http://localhost:5071/api/Enrolled');
      setEnrolleds(response.data);
    } catch (error) {
      console.error('Error fetching Enrolleds:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEnrolled(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateEnrolled = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5071/api/Enrolled', newEnrolled);
      setNewEnrolled({ first_name: '', last_name: '', major: '' });
      setShowModal(false);
      fetchEnrolleds();
    } catch (error) {
      console.error('Error creating Enrolled:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5071/api/Enrolled/${id}`);
      fetchEnrolleds();
    } catch (error) {
      console.error('Error deleting Enrolled:', error);
    }
  };

  const handleEdit = (Enrolled) => {
    setEditEnrolled({ ...Enrolled });
    setShowEditModal(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditEnrolled(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateEnrolled = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5071/api/Enrolled/${editEnrolled.Enrolled_id}`, editEnrolled);
      setShowEditModal(false);
      fetchEnrolleds();
    } catch (error) {
      console.error('Error updating Enrolled:', error);
    }
  };

  return (
    <div className="p-1">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h2 className="mb-0">Enrolleds</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>+ Create Enrolled</Button>
      </div>

      <Table striped bordered hover responsive className="mt-2">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Major</th>
          </tr>
        </thead>
        <tbody>
          {Enrolleds.map(Enrolled => (
            <tr key={Enrolled.Enrolled_id}>
              <td>{Enrolled.Enrolled_id}</td>
              <td>{Enrolled.first_name}</td>
              <td>{Enrolled.last_name}</td>
              <td>{Enrolled.major}</td>
              <td>
                <Dropdown as={ButtonGroup}>
                  <Button variant="outline-secondary" size="sm">Actions</Button>
                  <Dropdown.Toggle split variant="outline-secondary" id={`dropdown-${Enrolled.Enrolled_id}`} />
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleEdit(Enrolled)}>Edit</Dropdown.Item>
                    <Dropdown.Item className="text-danger" onClick={() => handleDelete(Enrolled.Enrolled_id)}>Delete</Dropdown.Item>
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
          <Modal.Title>Create New Enrolled</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateEnrolled}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={newEnrolled.first_name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={newEnrolled.last_name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Major</Form.Label>
              <Form.Control
                type="text"
                name="major"
                value={newEnrolled.major}
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
          <Modal.Title>Edit Enrolled</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editEnrolled && (
            <Form onSubmit={handleUpdateEnrolled}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  value={editEnrolled.first_name}
                  onChange={handleEditInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="last_name"
                  value={editEnrolled.last_name}
                  onChange={handleEditInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Major</Form.Label>
                <Form.Control
                  type="text"
                  name="major"
                  value={editEnrolled.major}
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

export default EnrolledTable;
