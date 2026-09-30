import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import useDocumentMeta from './hooks/useDocumentMeta.js'
import About from './sections/About.jsx'
import Contact from './sections/Contact.jsx'
import Hero from './sections/Hero.jsx'
import Learning from './sections/Learning.jsx'
import Portfolio from './sections/Portfolio.jsx'
import Projects from './sections/Projects.jsx'
import Skills from './sections/Skills.jsx'

// 頁面結構：Navbar + 七個 section + Footer。
// section 的 id 必須與 src/data/navigation.js 一致，Navbar 的捲動高亮才會正確。
export default function App() {
  useDocumentMeta()

  return (
    <>
      <a className="skip-link" href="#main">
        跳至主要內容
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Portfolio />
        <Learning />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
