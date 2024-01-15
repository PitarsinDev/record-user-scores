import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [score, setScore] = useState('');

  useEffect(() => {
    axios.get('/api/students')
      .then(res => {
        console.log(res.data);
        setStudents(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  const addStudent = () => {
    axios.post('/api/students', { name, score })
      .then(res => {
        setStudents([...students, res.data]);
        setName('');
        setScore('');
      })
      .catch(err => console.error(err));
  };

  const deleteStudent = (id) => {
    axios.delete(`/api/students/${id}`)
      .then(() => {
        setStudents(students.filter(student => student.id !== id));
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1 className='text-center text-emerald-500 p-10 text-3xl'>Score System</h1>
      <div className='flex justify-center'>
        <ul>
          {students.map(student => (
            <li key={student.id} className='flex gap-10 py-5 text-zinc-500'>
              User : {student.name} - points : {student.score}
              <div>
                <button onClick={() => deleteStudent(student.id)} className='bg-rose-200 text-rose-700 rounded-md px-5 py-1'>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex justify-center py-10'>
        <div>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className='border border-emerald-600 rounded-md pl-2'/>
          <br />
          <br />
          <input type="number" placeholder="Score" value={score} onChange={(e) => setScore(e.target.value)} className='border border-emerald-600 rounded-md pl-2'/>
          <div className='pt-5'>
            <button onClick={addStudent} className='text-emerald-700 bg-emerald-200 rounded-md px-5 py-1 hover:bg-emerald-600 hover:text-emerald-100 transition'>Add Student</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;