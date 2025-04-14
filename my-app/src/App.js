import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';
import StudentTable from './tables/student';
import ProfessorTable from './tables/professor';
import CourseTable from './tables/course';
import EnrolledTable from './tables/enrolled';
import ProfessorAssignedTable from './tables/professorAssigned';

function App() {
  const [viewOption, setViewOption] = useState('all');

  const renderTables = () => {
    const tableWrapperStyle = {
      backgroundColor: '#D7E0EA', 
      padding: '20px',
      borderRadius: '8px',
      marginBottom: '30px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    };
  
    switch (viewOption) {
      case 'studentInfo':
        return (
          <>
            <div style={tableWrapperStyle}><StudentTable /></div>
            <div style={tableWrapperStyle}><ProfessorTable /></div>
            <div style={tableWrapperStyle}><CourseTable /></div>
          </>
        );
      case 'enrollmentInfo':
        return (
          <>
            <div style={tableWrapperStyle}><EnrolledTable /></div>
            <div style={tableWrapperStyle}><ProfessorAssignedTable /></div>
          </>
        );
      case 'all':
      default:
        return (
          <>
            <div style={tableWrapperStyle}><StudentTable /></div>
            <div style={tableWrapperStyle}><ProfessorTable /></div>
            <div style={tableWrapperStyle}><CourseTable /></div>
            <div style={tableWrapperStyle}><EnrolledTable /></div>
            <div style={tableWrapperStyle}><ProfessorAssignedTable /></div>
          </>
        );
    }
  };
  
  return (
    <div className="App" style={{ margin: '40px', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontStyle: 'italic' }}>University Management System</h1>
        <i className="bi bi-book" style={{ fontSize: '2rem' }}></i>
      </div>

      <div style={{ margin: '20px auto', width: '50%' }}>
        <select
          className="form-select"
          value={viewOption}
          onChange={(e) => setViewOption(e.target.value)}
        >
          <option value="all">All Tables</option>
          <option value="studentInfo">Student Info Tables</option>
          <option value="enrollmentInfo">Enrollment Info Tables</option>
        </select>
      </div>

      <hr style={{
        border: '1px solid',
        width: '70%',
        margin: '20px auto',
        backgroundColor: '#ccc'
      }} />

      <div className="body" style={{ margin: '20px', padding: '10px' }}>
        {renderTables()}
      </div>
    </div>
  );
}

export default App;
