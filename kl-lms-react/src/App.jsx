import { useState } from 'react'
import './App.css'

const initialCourses = [
  { id: 1, name: 'Java Programming', description: 'Object Oriented Programming', progress: 80 },
  { id: 2, name: 'Data Structures', description: 'Algorithms and Data Structures', progress: 65 },
  { id: 3, name: 'Machine Learning', description: 'Introduction to AI & ML', progress: 55 },
]
const availableCourses = [
  { id: 1, name: 'Java Programming', description: 'Learn Java, OOP and advanced concepts.' },
  { id: 2, name: 'Data Structures', description: 'Learn arrays, linked lists, trees, graphs and algorithms.' },
  { id: 3, name: 'Machine Learning', description: 'Learn ML algorithms and practical applications.' },
  { id: 4, name: 'Database Management', description: 'Learn SQL, MySQL and database design.' },
  { id: 5, name: 'Computer Networks', description: 'Learn networking concepts, protocols and security.' },
  { id: 6, name: 'Operating Systems', description: 'Learn processes, memory, scheduling and file systems.' },
]
const attendance = [
  ['Java Programming', 40, 36, '90%'],
  ['Data Structures', 38, 32, '84%'],
  ['Machine Learning', 35, 29, '83%'],
]
const assignments = [
  ['OOP Assignment', 'Java', '28 Sep 2026', 'Pending'],
  ['Sorting Algorithms', 'DSA', '30 Sep 2026', 'Completed'],
  ['ML Classification', 'Machine Learning', '2 Oct 2026', 'Pending'],
]
const results = [
  ['OOP Quiz', 'Java', '18 / 20', 'A'],
  ['Sorting Quiz', 'DSA', '16 / 20', 'B+'],
  ['ML Quiz', 'Machine Learning', '19 / 20', 'A+'],
]

const css = `
*{box-sizing:border-box} body{margin:0;background:#f4f6fb;color:#222;font-family:Arial,sans-serif} button,input{font:inherit} button{cursor:pointer}
.lms-nav{min-height:70px;background:#fff;display:flex;align-items:center;justify-content:space-between;gap:18px;padding:12px 6%;box-shadow:0 2px 10px #00000012;flex-wrap:wrap}.lms-brand{display:flex;align-items:center;gap:12px}.lms-logo{width:45px;height:45px;border-radius:50%;background:#8b0000;color:white;display:grid;place-items:center;font-weight:bold}.lms-brand h2{color:#8b0000;margin:0;font-size:22px}.lms-links{display:flex;gap:22px;flex-wrap:wrap}.lms-links button{border:0;background:none;color:#333;font-weight:600;padding:8px 0}.lms-links button:hover{color:#8b0000}.lms-hero{min-height:440px;display:flex;align-items:center;padding:60px 8%;background:linear-gradient(120deg,#fff5f5,#f8f8ff)}.lms-hero-content{max-width:700px}.lms-hero h1{font-size:clamp(36px,5vw,52px);color:#8b0000;margin:0 0 16px}.lms-hero h2{font-size:28px;margin:0 0 18px}.lms-hero p{font-size:18px;line-height:1.7;color:#555;margin-bottom:28px}.lms-btn{border:0;border-radius:7px;background:#8b0000;color:#fff;padding:13px 24px;font-weight:600}.lms-btn:hover{background:#650000}.lms-title{text-align:center;color:#8b0000;margin:45px 0 28px}.lms-features,.lms-stats,.lms-courses{display:grid;gap:22px;padding:0 8% 45px;grid-template-columns:repeat(3,minmax(0,1fr))}.lms-features{grid-template-columns:repeat(4,minmax(0,1fr))}.lms-card,.lms-stat,.lms-login-box,.lms-table-box{background:#fff;border-radius:12px;padding:25px;box-shadow:0 3px 14px #0000000d}.lms-feature{text-align:center}.lms-feature .emoji{font-size:42px}.lms-feature h3,.lms-course h3{color:#8b0000}.lms-feature p,.lms-course p{color:#666;line-height:1.5}.lms-page-center{min-height:calc(100vh - 90px);display:flex;align-items:center;justify-content:center;padding:35px 16px}.lms-login-box{width:min(420px,100%);padding:36px}.lms-login-box h1{text-align:center;color:#8b0000;margin:0 0 8px}.lms-subtitle{text-align:center;color:#777;margin:0 0 20px}.lms-field label{display:block;font-weight:bold;margin:14px 0 7px}.lms-field input{width:100%;padding:12px;border:1px solid #ccc;border-radius:7px;outline:none}.lms-field input:focus{border-color:#8b0000}.lms-login-box .lms-btn{width:100%;margin-top:22px}.lms-switch{text-align:center;color:#666;margin:18px 0 0}.lms-link{color:#8b0000;font-weight:bold;border:0;background:none}.lms-dashboard{padding:35px 7%}.lms-welcome{background:linear-gradient(120deg,#8b0000,#b22222);color:#fff;padding:28px;border-radius:15px;margin-bottom:28px}.lms-welcome h1{margin:0 0 8px}.lms-welcome p{margin:0}.lms-stats{padding:0;margin:0 0 35px;grid-template-columns:repeat(4,minmax(0,1fr))}.lms-stat h2{font-size:32px;margin:0 0 8px}.lms-stat h3{margin:0;color:#555}.lms-stat p{margin:6px 0 0;color:#888}.lms-courses{padding:0;grid-template-columns:repeat(3,minmax(0,1fr))}.lms-course{padding:24px}.lms-progress{height:10px;background:#eee;border-radius:10px;overflow:hidden}.lms-progress span{display:block;height:100%;background:#8b0000}.lms-course button{margin-top:14px;border:0;background:#8b0000;color:white;padding:9px 16px;border-radius:5px}.lms-table-box{margin-top:25px;overflow-x:auto}.lms-table-box h2{margin:0 0 18px}.lms-table{width:100%;border-collapse:collapse;min-width:520px}.lms-table th,.lms-table td{text-align:left;padding:13px;border-bottom:1px solid #eee}.lms-table th{background:#8b0000;color:#fff}.lms-pending{color:#d97706;font-weight:bold}.lms-completed,.lms-present{color:green;font-weight:bold}.lms-footer{background:#222;color:white;text-align:center;padding:22px;margin-top:35px}.lms-message{padding:10px;border-radius:7px;background:#fff1f1;color:#8b0000;margin-top:12px;font-size:14px}
@media(max-width:900px){.lms-features,.lms-stats{grid-template-columns:repeat(2,minmax(0,1fr))}.lms-courses{grid-template-columns:repeat(2,minmax(0,1fr))}.lms-nav{padding:12px 3%}}
@media(max-width:600px){.lms-features,.lms-stats,.lms-courses{grid-template-columns:1fr}.lms-links{gap:12px}.lms-brand h2{font-size:18px}.lms-hero{padding:45px 6%}.lms-dashboard{padding:25px 5%}}
`

function Table({ title, headers, rows, statusColumn }) {
  return <div className="lms-table-box"><h2>{title}</h2><table className="lms-table"><thead><tr>{headers.map(h => <th key={h}>{h}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j} className={j === statusColumn ? (cell === 'Completed' ? 'lms-completed' : 'lms-pending') : ''}>{cell}</td>)}</tr>)}</tbody></table></div>
}

function App() {
  const [page, setPage] = useState('home')
  const [student, setStudent] = useState('Student')
  const [courses, setCourses] = useState(initialCourses)
  const [loginId, setLoginId] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [signupName, setSignupName] = useState('')
  const [signupId, setSignupId] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem('klLmsUsers') || '[]'))
  const [message, setMessage] = useState('')

  const navigate = (next) => { setMessage(''); setPage(next); window.scrollTo(0, 0) }
  const signup = (e) => {
    e.preventDefault()
    if (!signupName.trim() || !signupId.trim() || !signupEmail.trim() || !signupPassword) return setMessage('Please fill all fields.')
    if (signupPassword.length < 6) return setMessage('Password must be at least 6 characters.')
    if (users.some(u => u.email.toLowerCase() === signupEmail.toLowerCase() || u.id === signupId)) return setMessage('This email or Student ID is already registered.')
    const updated = [...users, { name: signupName.trim(), id: signupId.trim(), email: signupEmail.trim(), password: signupPassword }]
    setUsers(updated); localStorage.setItem('klLmsUsers', JSON.stringify(updated))
    setLoginId(signupId); setLoginEmail(signupEmail); setSignupName(''); setSignupId(''); setSignupEmail(''); setSignupPassword('')
    setMessage('Registration successful! Please log in.')
    setPage('login')
  }
  const login = (e) => {
    e.preventDefault()
    if (!loginId.trim() || !loginEmail.trim() || !loginPassword) return setMessage('Please enter Student ID, email and password.')
    const account = users.find(u => u.id === loginId.trim() && u.email.toLowerCase() === loginEmail.trim().toLowerCase() && u.password === loginPassword)
    if (!account) return setMessage('Account not found or details are incorrect. Please sign up first.')
    setStudent(account.name); setLoginPassword(''); navigate('dashboard')
  }
  const enroll = (course) => {
    if (courses.some(c => c.id === course.id)) return setMessage(`${course.name} is already enrolled.`)
    setCourses([...courses, { ...course, progress: 0 }]); setMessage(`${course.name} enrolled successfully.`)
  }

  return <>
    <style>{css}</style>
    <nav className="lms-nav">
      <div className="lms-brand"><div className="lms-logo">KL</div><h2>KL University LMS</h2></div>
      <div className="lms-links">
        <button onClick={() => navigate('home')}>Home</button>
        <button onClick={() => navigate('courses')}>Courses</button>
        <button onClick={() => navigate('login')}>Login</button>
        <button onClick={() => navigate('signup')}>Sign Up</button>
        <button onClick={() => navigate('dashboard')}>Dashboard</button>
      </div>
    </nav>

    {page === 'home' && <>
      <section className="lms-hero"><div className="lms-hero-content"><h1>KL University</h1><h2>Learning Management System</h2><p>Welcome to the KL University Learning Management System. Access your courses, assignments, quizzes, attendance and academic results from one place.</p><button className="lms-btn" onClick={() => navigate('login')}>Student Login</button></div></section>
      <h2 className="lms-title">LMS Features</h2>
      <section className="lms-features">{[['📚','Courses','Access your enrolled courses and learning materials.'],['📝','Assignments','View and submit your academic assignments.'],['📊','Attendance','Track your course-wise attendance.'],['🏆','Results','Check quiz and examination results.']].map(([icon,name,desc]) => <div className="lms-card lms-feature" key={name}><div className="emoji">{icon}</div><h3>{name}</h3><p>{desc}</p></div>)}</section>
      <footer className="lms-footer">KL University LMS © 2026</footer>
    </>}

    {page === 'signup' && <section className="lms-page-center"><form className="lms-login-box" onSubmit={signup}><h1>Student Sign Up</h1><p className="lms-subtitle">Create your KL University LMS account</p>
      <div className="lms-field"><label>Full Name</label><input value={signupName} onChange={e => setSignupName(e.target.value)} placeholder="Enter your full name" /></div>
      <div className="lms-field"><label>Student ID</label><input value={signupId} onChange={e => setSignupId(e.target.value)} placeholder="Enter Student ID" /></div>
      <div className="lms-field"><label>Email</label><input type="email" value={signupEmail} onChange={e => setSignupEmail(e.target.value)} placeholder="Enter university email" /></div>
      <div className="lms-field"><label>Password</label><input type="password" value={signupPassword} onChange={e => setSignupPassword(e.target.value)} placeholder="Minimum 6 characters" /></div>
      <button className="lms-btn" type="submit">Create Account</button>{message && <div className="lms-message">{message}</div>}<p className="lms-switch">Already registered? <button type="button" className="lms-link" onClick={() => navigate('login')}>Login</button></p>
    </form></section>}

    {page === 'login' && <section className="lms-page-center"><form className="lms-login-box" onSubmit={login}><h1>Student Login</h1><p className="lms-subtitle">KL University Learning Portal</p>
      <div className="lms-field"><label>Student ID</label><input value={loginId} onChange={e => setLoginId(e.target.value)} placeholder="Enter Student ID" /></div>
      <div className="lms-field"><label>Email</label><input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} placeholder="Enter university email" /></div>
      <div className="lms-field"><label>Password</label><input type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} placeholder="Enter password" /></div>
      <button className="lms-btn" type="submit">Login</button>{message && <div className="lms-message">{message}</div>}<p className="lms-switch">New student? <button type="button" className="lms-link" onClick={() => navigate('signup')}>Create an account</button></p>
    </form></section>}

    {page === 'courses' && <div className="lms-dashboard"><h1 className="lms-title">Available Courses</h1>{message && <div className="lms-message">{message}</div>}<div className="lms-courses">{availableCourses.map(course => <div className="lms-card lms-course" key={course.id}><h3>{course.name}</h3><p>{course.description}</p><button onClick={() => enroll(course)}>{courses.some(c => c.id === course.id) ? 'Enrolled' : 'Enroll'}</button></div>)}</div></div>}

    {page === 'dashboard' && <div className="lms-dashboard"><div className="lms-welcome"><h1>Welcome, {student} 👋</h1><p>KL University | B.Tech CSE</p></div>
      <div className="lms-stats"><div className="lms-stat"><h2>📚</h2><h3>{courses.length}</h3><p>Enrolled Courses</p></div><div className="lms-stat"><h2>📊</h2><h3>87%</h3><p>Attendance</p></div><div className="lms-stat"><h2>📝</h2><h3>2</h3><p>Pending Assignments</p></div><div className="lms-stat"><h2>🏆</h2><h3>85%</h3><p>Average Score</p></div></div>
      <h2 className="lms-title">My Courses</h2><div className="lms-courses">{courses.map(course => <div className="lms-card lms-course" key={course.id}><h3>{course.name}</h3><p>{course.description}</p><div className="lms-progress"><span style={{ width: `${course.progress}%` }} /></div><p>Progress: {course.progress}%</p><button onClick={() => setMessage(`You are viewing ${course.name}.`)}>Continue</button></div>)}</div>
      <Table title="Attendance" headers={['Subject','Classes','Present','Attendance']} rows={attendance} />
      <Table title="Assignments" headers={['Assignment','Subject','Due Date','Status']} rows={assignments} statusColumn={3} />
      <Table title="Recent Results" headers={['Quiz','Subject','Marks','Grade']} rows={results} />
    </div>}
  </>
}
export default App;
