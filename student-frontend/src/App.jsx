import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/students';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    age: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  //  fetch all students on component mount

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setStudents(res.data.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch students. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  //  handle form input changes

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submission (create student)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await axios.post(API_URL, {
        ...formData,
        age: Number(formData.age),
      });
      alert('Student added successfully!');
      setFormData({ name: '', email: '', phone: '', course: '', age: '' });
      fetchStudents(); 
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to create student';
      setError(Array.isArray(msg) ? msg.join(', ') : msg);
    }
  };

  // 4. handle delete student
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchStudents();
      } catch (err) {
        alert('Failed to delete student.');
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2>Student Management System</h2>

     
      {error && <div style={styles.error}>{error}</div>}

      
      <form onSubmit={handleSubmit} style={styles.form}>
        <h3>Add New Student</h3>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="phone"
          placeholder="10-digit Phone"
          value={formData.phone}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="course"
          placeholder="Course"
          value={formData.course}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.submitBtn}>
          Add Student
        </button>
      </form>

     
      <h3>Student Records</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Course</th>
              <th style={styles.th}>Age</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '10px' }}>
                  No students found.
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student._id}>
                  <td style={styles.td}>{student.name}</td>
                  <td style={styles.td}>{student.email}</td>
                  <td style={styles.td}>{student.phone}</td>
                  <td style={styles.td}>{student.course}</td>
                  <td style={styles.td}>{student.age}</td>
                  <td style={styles.td}>
                    <button
                      onClick={() => handleDelete(student._id)}
                      style={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

// inline CSS 

const styles = {
  container: { fontFamily: 'Arial, sans-serif', padding: '30px', maxWidth: '800px', margin: '0 auto' },
  form: { background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #ddd' },
  input: { display: 'block', width: '95%', padding: '8px', margin: '8px 0', borderRadius: '4px', border: '1px solid #ccc' },
  submitBtn: { background: '#007bff', color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '4px', cursor: 'pointer' },
  deleteBtn: { background: '#dc3545', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' },
  th: { background: '#007bff', color: '#fff', padding: '10px', textAlign: 'left' },
  td: { borderBottom: '1px solid #ddd', padding: '10px' },
  error: { background: '#f8d7da', color: '#721c24', padding: '10px', borderRadius: '4px', marginBottom: '15px' },
};

export default App;