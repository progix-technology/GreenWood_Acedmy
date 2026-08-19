import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0)

  const faqs = [
    {
      question: 'What is the admission process at Greenwood Academy?',
      answer:
        'The admission process begins with an online or offline application submission, followed by an interaction session/entrance assessment, document verification, and confirmation of seat allocation upon fee payment.',
    },
    {
      question: 'Which classes are accepting applications for 2026–27?',
      answer:
        'Applications for the academic year 2026–27 are open for Nursery through Class 11 across Science, Commerce, and Humanities streams, subject to seat availability.',
    },
    {
      question: 'What documents are required for the application?',
      answer:
        "Required documents include student's birth certificate, recent passport-size photographs, previous school report card/transfer certificate, and address/identity proof of parents.",
    },
    {
      question: 'Is school transport available?',
      answer:
        'Yes, Greenwood Academy operates a comprehensive, GPS-tracked fleet of air-conditioned buses covering major routes across Lucknow with trained attendants and speed governors.',
    },
    {
      question: 'What sports facilities does the school offer?',
      answer:
        'Our campus features multi-purpose sports grounds including a football field, cricket nets, basketball courts, badminton courts, swimming pool, and dedicated indoor sports arenas.',
    },
  ]

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <section className="py-10 md:py-14 bg-white w-full">
      <div className="container-wide max-w-5xl">
        {/* Header with Title on Left and "View all questions ->" on Right */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--gold)]">
              FAQ
            </div>
            <h2 className="mt-1 text-[clamp(1.8rem,3vw,2.5rem)] text-[var(--navy-deep)] font-serif font-bold">
              Frequently Asked Questions
            </h2>
          </div>
          <Link
            to="/faq"
            className="inline-flex items-center gap-2 font-bold text-sm text-[var(--navy-deep)] hover:text-[var(--gold)] transition-colors group"
          >
            View all questions{' '}
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1 text-[var(--gold)]"
            />
          </Link>
        </div>

        {/* Accordion FAQ Items */}
        <div className="space-y-2.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                className={`bg-[var(--sand)]/40 border transition-all duration-300 rounded-none ${
                  isOpen
                    ? 'border-[var(--gold)] shadow-sm bg-[var(--sand)]'
                    : 'border-gray-200/80 hover:border-gray-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between gap-4 p-4 text-left font-serif text-base font-bold text-[var(--navy-deep)] transition-colors"
                >
                  <span>{faq.question}</span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center bg-white text-[var(--navy-deep)] transition-transform duration-300 border border-gray-200/80 ${
                      isOpen ? 'rotate-180 border-[var(--gold)]' : ''
                    }`}
                  >
                    <ChevronDown size={16} className="text-[var(--navy-deep)]" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-0 text-xs md:text-sm text-gray-700 leading-relaxed font-normal border-t border-gray-200/60 mt-0.5">
                    <p className="pt-2.5">{faq.answer}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
