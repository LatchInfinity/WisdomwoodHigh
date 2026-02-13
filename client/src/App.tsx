import Hero from './components/Hero'
import ApplyForm from './components/ApplyForm'
import nameLogo from './assets/name.svg'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <header>
        <img src={nameLogo} alt="WisdomWood High" className="header-logo" />
      </header>

      <main>
        <Hero />
        <div className="container">
          <div className="content-left">
            <h3 className="instructions-heading">Instructions for Parents</h3>
            <ul className="instructions-list">
              <li>Please enter your child's full name, date of birth, and grade seeking admission accurately.</li>
              <li>Provide a valid mobile number and email ID for all admission communication.</li>
              <li>Mention if your child has a sibling at WisdomWood High.</li>
              <li>Use the remarks section to add any specific queries.</li>
              <li>After submission, our admissions team will contact you within 24-48 hours.</li>
            </ul>
          </div>
          <div className="content-right">
            <ApplyForm />
          </div>
        </div>
      </main>

      <footer style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: '#f9f9f9', borderTop: '1px solid #eee' }}>
        <p>&copy; {new Date().getFullYear()} Wishdom Wood. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
