const express = require('express');
const mysql = require('mysql2');
const app = express();
const PORT = process.env.PORT || 3001;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'score_system'
});

app.use(express.json());

// เรียกใช้ API เพื่อดึงข้อมูลนักเรียนทั้งหมด
app.get('/api/students', (req, res) => {
  connection.query('SELECT * FROM students', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// เรียกใช้ API เพื่อเพิ่มนักเรียนใหม่
app.post('/api/students', (req, res) => {
  const { name, score } = req.body;
  connection.query('INSERT INTO students (name, score) VALUES (?, ?)', [name, score], (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId, name, score });
  });
});

// เรียกใช้ API เพื่อลบนักเรียน
app.delete('/api/students/:id', (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM students WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});