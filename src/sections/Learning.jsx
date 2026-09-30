import SectionHeading from '../components/SectionHeading.jsx'
import TimelineItem from '../components/TimelineItem.jsx'
import { learningJourney } from '../data/learning.js'
import './learning.css'

export default function Learning() {
  return (
    <section id="learning" className="section learning">
      <div className="container">
        <SectionHeading
          eyebrow="Learning Journey"
          title="Learning Journey"
          lead="從 C++ 與演算法打底，一路走到 AI 應用與軟體開發的學習順序。"
        />

        <ol className="timeline">
          {learningJourney.map((step, index) => (
            <TimelineItem key={step.id} step={step} delay={index * 60} />
          ))}
        </ol>
      </div>
    </section>
  )
}
