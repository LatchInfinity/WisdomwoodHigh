import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Hero from './components/Hero'
import ApplyForm from './components/ApplyForm'
import ThankYou from './components/ThankYou'
import BottomBanner from './components/BottomBanner'
import AdSection from './components/AdSection'
import nameLogo from './assets/name.svg'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Home() {
  return (
    <>
      <Hero />
      <AdSection />
      <div className="container center-content">
        <div className="content-right full-width-form">
          <ApplyForm />
        </div>
      </div>
      <BottomBanner />
    </>
  )
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <header>
          <img src={nameLogo} alt="WisdomWood High" className="header-logo" />
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/thank-you" element={<ThankYou />} />
          </Routes>
        </main>

        <footer style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: '#f9f9f9', borderTop: '1px solid #eee' }}>
          <p>WisdomWood High &copy; 2026. All Rights Reserved.</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
