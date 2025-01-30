import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";



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
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    age: "",
    salary: "",
    mobile: "",
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    age: "",
    salary: "",
    mobile: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sorting, setSorting] = useState({ key: "name", ascending: true });



  const handleClose = () => {
    setShow(false);
    setEditMode(false);
    setFormData({ id: "", name: "", age: "", salary: "", mobile: "" });
    setFormErrors({ name: "", age: "", salary: "", mobile: "" });
  };

  const handleShow = () => setShow(true);

  const handleEdit = (record) => {
    setEditMode(true);
    setFormData(record);
    setShow(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setRecords(records.filter((record) => record.id !== id));
    }
  };




  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });



    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };



  const applySorting = (key) => {
    if (sorting.key === key) {
      setSorting({ ...sorting, ascending: !sorting.ascending });
    } else {
      setSorting({ key: key, ascending: true });
    }
  };

  useEffect(() => {
    const sortedRecords = [...records].sort((a, b) => {
      if (a[sorting.key] < b[sorting.key]) {
        return sorting.ascending ? -1 : 1;
      }
      if (a[sorting.key] > b[sorting.key]) {
        return sorting.ascending ? 1 : -1;
      }
      return 0;
    });
    setRecords(sortedRecords);
  }, [sorting, records]);




  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required.";
    if (!formData.age || isNaN(formData.age) || formData.age <= 0)
      errors.age = "Valid age is required.";
    if (!formData.salary || isNaN(formData.salary) || formData.salary <= 0)
      errors.salary = "Valid salary is required.";
    if (!formData.mobile || !/^[0-9]{10}$/.test(formData.mobile))
      errors.mobile = "Valid mobile number is required.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };




  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (editMode) {
        setRecords(records.map((record) => record.id === formData.id ? formData : record)
        );
      } else {
        setRecords([...records, { ...formData, id: records.length + 2 }]);
      }
      handleClose();
    }
  };

  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRecords = records.filter((record) =>
    Object.values(record).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3 ">
        <div className="d-flex align-items-center mb-3 gap-0">
          <h2>Crud Table</h2>
          <input
            type="text"
            className="form-control w-50 "
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <Button variant="primary" onClick={handleShow}>
          Add <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th
              className="p-2"
              onClick={() => applySorting("name")}
              style={{ cursor: "pointer" }}
            >
              Name {sorting.key === "name" && (sorting.ascending ? "▲" : "▼")}
            </th>
            
            <th className="p-2" onClick={() => applySorting("age")} style={{ cursor: "pointer" }}>
                            Age {sorting.key === "age" && (sorting.ascending ? "▲" : "▼")}
                        </th>
            <th>Salary</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.name}</td>
              <td>{record.age}</td>
              <td>{record.salary}</td>
              <td>{record.mobile}</td>
              <td>
                <Button
                  variant="primary"
                  className="me-2"
                  onClick={() => handleEdit(record)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(record.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Edit Record" : "Add Record"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                isInvalid={formErrors.name}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="text"
                name="age"
                value={formData.age}
                onChange={handleChange}
                isInvalid={formErrors.age}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.age}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                isInvalid={formErrors.salary}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.salary}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                isInvalid={formErrors.mobile}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.mobile}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex justify-content-end mt-3">
              <Button variant="primary" onClick={handleClose} className="me-2">
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {editMode ? "Update" : "Save"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Crud;
