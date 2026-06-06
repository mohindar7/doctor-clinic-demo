import React, { useState } from 'react';
import Section from '../common/Section';
import useScrollAnimation from '../../hooks/useScrollAnimation';

const FAQ_ITEMS = [
  {
    question: "Do Dr. Roshan & Dr. Komal accept walk-ins?",
    answer: "Yes, walk-in consultations are welcome for acute illnesses and standard checkups. However, for specialized minor surgeries, diagnostic profiling, child immunization, and home-care nursing scheduling, we highly recommend booking ahead to minimize your waiting times."
  },
  {
    question: "What should I bring to my child's pediatric checkup?",
    answer: "We advise bringing your child's immunization record book (government tracker), a details list of any active pediatric supplements/medications, and any past milestone notes from prior consultations."
  },
  {
    question: "How do I request specialized home nursing services?",
    answer: "You can schedule home care, vitals tracking, dressing care, or injection schedules by requesting a booking online or calling the clinic. Note that a doctor's active medical directive is required for specialized nursing tasks."
  },
  {
    question: "Is patient parking available near the clinic premises?",
    answer: "Yes, there is free roadside parking directly in front of the clinic chambers and nearby areas adjacent to Soma Talav road."
  },
  {
    question: "Are Dr. Roshan and Dr. Komal available for consultations on Sundays?",
    answer: "Yes, to better assist local families, the clinic operates on Sundays from 9:00 AM until 8:00 PM. On weekdays and Saturdays, we are open 9:00 AM – 9:00 PM."
  }
];

/**
 * FAQSection Component
 * Renders a list of interactive, shape-morphing accordion cards to answer common patient queries.
 */
export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const headerRef = useScrollAnimation();

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section id="faq" animate={false}>
      <div className="section-header" ref={headerRef}>
        <span className="hero-badge">Got Questions?</span>
        <h2 className="display-medium" style={{ marginTop: '8px' }}>Frequently Asked Questions</h2>
        <p className="body-large">
          Quick answers to help you navigate clinic visits, preparations, and general nursing care routines.
        </p>
      </div>

      <div className="faq-list">
        {FAQ_ITEMS.map((item, idx) => {
          const cardRef = useScrollAnimation();
          const isOpen = openIndex === idx;
          const delayClass = `delay-${((idx % 4) + 1) * 100}`;

          return (
            <div key={idx} ref={cardRef} className={delayClass}>
              <div
                className={`faq-card ${isOpen ? 'open' : ''}`}
                onClick={() => handleToggle(idx)}
                aria-expanded={isOpen}
              >
                <div className="faq-question-row">
                  <h3 className="faq-question">{item.question}</h3>
                  <span className="material-symbols-outlined faq-toggle-icon" aria-hidden="true" style={{ fontSize: '18px' }}>
                    expand_more
                  </span>
                </div>

                <div className={`faq-answer-wrapper ${isOpen ? 'open' : ''}`}>
                  <p className="faq-answer">{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
