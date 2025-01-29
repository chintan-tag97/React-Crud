import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Crud() {
  const [records, setRecords] = useState([
        { id: 1, name: "abc", age: 10, salary: 10000, mobile: "1234567890" },
        { id: 2, name: "def", age: 11, salary: 15000, mobile: "9876543210" },
        { id: 3, name: "ghi", age: 20, salary: 20000, mobile: "1122334455" },
        { id: 4, name: "jkl", age: 22, salary: 25000, mobile: "6677889900" },
        { id: 6, name: "mno", age: 30, salary: 30000, mobile: "1133557799" },
        { id: 7, name: "pqr", age: 33, salary: 35000, mobile: "2244668800" },
        { id: 8, name: "stu", age: 40, salary: 40000, mobile: "0088664422" },
        { id: 9, name: "vwx", age: 44, salary: 45000, mobile: "9977553311" },
        { id: 10, name: "yza", age: 50, salary: 50000, mobile: "5544332211" },
  ]);

  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ id: "", name: "", age: "", salary: "", mobile: "" });

  const handleClose = () => {
    setShow(false);
    setEditMode(false);
    setFormData({ id: "", name: "", age: "", salary: "", mobile: "" });
  };

  const handleShow = () => setShow(true);

  const handleEdit = (record) => {
    setEditMode(true);
    setFormData(record);
    setShow(true);
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete?");
    if (isConfirmed) {
      setRecords(records.filter((record) => record.id !== id)); // another way - find index and use splice
    }
  };
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      setRecords(records.map((record) => (record.id === formData.id ? formData : record)));
    } else {
      setRecords([...records, { ...formData, id: records.length + 2 }]);
    }
    handleClose();
  };
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Crud Table</h2>
        <Button variant="primary" onClick={handleShow}>Add</Button>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Salary</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.name}</td>
              <td>{record.age}</td>
              <td>{record.salary}</td>
              <td>{record.mobile}</td>
              <td>
                <Button variant="primary" className="me-2" onClick={() => handleEdit(record)}>Edit</Button>
                <Button variant="primary" onClick={() => handleDelete(record.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Edit Record" : "Add Record"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={formData.name} onChange={handleChange}  />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Age</Form.Label>
              <Form.Control type="text" name="age" value={formData.age} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Salary</Form.Label>
              <Form.Control type="text" name="salary" value={formData.salary} onChange={handleChange}  />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Mobile</Form.Label>
              <Form.Control type="text" name="mobile" value={formData.mobile} onChange={handleChange}  />
            </Form.Group>
            <Button variant="primary" type="submit">{editMode ? "Update" : "Save"}</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Crud;
