import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ProfessorTable = () => {
  const [Professors, setProfessors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [newProfessor, setNewProfessor] = useState({
    first_name: '',
    last_name: '',
    professor_department: ''
  });

  const [editProfessor, setEditProfessor] = useState(null);

  useEffect(() => {
    fetchProfessors();
  }, []);

  const fetchProfessors = async () => {
    try {
      const response = await axios.get('http://localhost:5071/api/Professor');
      setProfessors(response.data);
    } catch (error) {
      console.error('Error fetching Professors:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProfessor(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateProfessor = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5071/api/Professor', newProfessor);
      setNewProfessor({ first_name: '', last_name: '', professor_department: '' });
      setShowModal(false);
      fetchProfessors();
    } catch (error) {
      console.error('Error creating Professor:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5071/api/Professor/${id}`);
      fetchProfessors();
    } catch (error) {
      console.error('Error deleting Professor:', error);
    }
  };

  const handleEdit = (Professor) => {
    setEditProfessor({ ...Professor });
    setShowEditModal(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditProfessor(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfessor = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5071/api/Professor/${editProfessor.professor_id}`, editProfessor);
      setShowEditModal(false);
      fetchProfessors();
    } catch (error) {
      console.error('Error updating Professor:', error);
    }
  };

  return (
    <div className="p-1">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h2 className="mb-0">Professors</h2>
        <button className='custom-button' onClick={() => setShowModal(true)}>+ Create Professor</button>
      </div>

      <Table striped bordered hover responsive className="mt-2">
        <thead>
          <tr>
            <th style={{ backgroundColor: '#4D6C93', color: 'white'}}>ID</th>
            <th style={{ backgroundColor: '#4D6C93', color: 'white'}}>First Name</th>
            <th style={{ backgroundColor: '#4D6C93', color: 'white'}}>Last Name</th>
            <th style={{ backgroundColor: '#4D6C93', color: 'white'}}>Department</th>
            <th style={{ backgroundColor: '#4D6C93', color: 'white'}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Professors.map(Professor => (
            <tr key={Professor.professor_id}>
              <td>{Professor.professor_id}</td>
              <td>{Professor.first_name}</td>
              <td>{Professor.last_name}</td>
              <td>{Professor.professor_department}</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleEdit(Professor)}
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
                    onClick={() => handleDelete(Professor.professor_id)}
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
          <Modal.Title>Create New Professor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateProfessor}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={newProfessor.first_name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={newProfessor.last_name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                name="professor_department"
                value={newProfessor.professor_department}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <button type="submit" className="custom-button">Submit</button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Professor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editProfessor && (
            <Form onSubmit={handleUpdateProfessor}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  value={editProfessor.first_name}
                  onChange={handleEditInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="last_name"
                  value={editProfessor.last_name}
                  onChange={handleEditInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Department</Form.Label>
                <Form.Control
                  type="text"
                  name="professor_department"
                  value={editProfessor.professor_department}
                  onChange={handleEditInputChange}
                  required
                />
              </Form.Group>
              <button type="submit" className="custom-button">Update</button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProfessorTable;
