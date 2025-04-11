import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import StudentTable from './student'; 
import ProfessorTable from './professor'; 
import CourseTable from './course';

function App() {
  return (
    <div className="App">
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>University Management System</h1>
        <i className="bi bi-book" style={{ fontSize: '2rem' }}></i>
      </div>

      <hr style={{
        border: '1px solid white',
        width: '70%',
        margin: '20px auto'
      }} />

      <div className="body" style={{ margin: '40px', padding: '20px' }}>
        <StudentTable />
        <ProfessorTable />
        <CourseTable />
      </div>
    </div>
  );
}

export default App;
