import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import StudentTable from './tables/student'; 
import ProfessorTable from './tables/professor'; 
import CourseTable from './tables/course';
import EnrolledTable from './tables/enrolled';
import ProfessorAssignedTable from './tables/professorAssigned';

function App() {
  return (
    <div className="App" style={{ margin: '40px', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>University Management System</h1>
        <i className="bi bi-book" style={{ fontSize: '2rem' }}></i>
      </div>

      <hr style={{
        border: '1px solid black',
        width: '70%',
        margin: '20px auto'
      }} />

      <div className="body" style={{ margin: '40px', padding: '20px' }}>
        <StudentTable />
        <ProfessorTable />
        <CourseTable />
        <EnrolledTable />
        <ProfessorAssignedTable />
      </div>
    </div>
  );
}

export default App;
