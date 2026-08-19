import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import academicsData from '../data/academics'
import useDocumentMeta from '../utils/useDocumentMeta'
import creativeToolsSvg from '../assets/bg-images/SchoolArtWork.png'

export default function AcademicLevel() {
  const { level } = useParams()
  const currentKey = level && academicsData[level] ? level : 'early-years'
  const data = academicsData[currentKey]

  useDocumentMeta({
    title: `${data.title} â€” Greenwood Academy`,
    description: data.overview,
  })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentKey])

  return (
    <div className="min-h-screen bg-white">
      {/* Top Banner Header (Deep Navy) */}
      <section className="relative bg-[var(--navy-deep)] text-white py-14 md:py-18 border-b border-white/10 overflow-hidden">
        {/* School Art Work background illustration overlay on right side */}
        <div
          className="absolute top-1/2 right-0 md:right-6 -translate-y-1/2 w-[75%] md:w-[55%] h-[130%] pointer-events-none opacity-25 bg-right bg-no-repeat bg-contain mix-blend-screen"
          style={{ backgroundImage: `url(${creativeToolsSvg})` }}
        />

        <div className="container-wide relative z-10">
          {/* Eyebrows */}
          <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#ea580c] flex items-center gap-1.5">
            <span>â€”</span>
            <span>ACADEMICS</span>
          </div>

          <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#ea580c] mt-2">
            {data.badge}
          </div>

          {/* Main Title */}
          <h1 className="mt-3 text-[clamp(2.4rem,4vw,3.5rem)] font-serif font-normal text-white leading-tight">
            {data.title}
          </h1>
        </div>
      </section>

      {/* Main Content Body Layout */}
      <section className="py-12 md:py-16">
        <div className="container-wide grid gap-10 lg:grid-cols-[1fr_360px] items-start">
          {/* Left Column Content */}
          <div className="bg-transparent">
            {/* Top Feature Image */}
            <div className="w-full overflow-hidden shadow-sm border border-gray-200/60 mb-8 bg-white">
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-[320px] md:h-[380px] object-cover"
              />
            </div>

            {/* Programme Overview */}
            <div className="space-y-8">
              <div>
                <h2 className="text-xl md:text-2xl font-bold font-serif text-[var(--navy-deep)]">
                  Programme Overview
                </h2>
                <p className="mt-3 text-gray-700 leading-relaxed text-sm md:text-base font-normal">
                  {data.overview}
                </p>
              </div>

              {/* Curriculum */}
              <div>
                <h3 className="text-lg md:text-xl font-bold font-serif text-[var(--navy-deep)]">
                  Curriculum
                </h3>
                <p className="mt-2 text-gray-700 text-sm md:text-base font-normal">
                  {data.curriculum}
                </p>
              </div>

              {/* Teaching Methodology */}
              <div>
                <h3 className="text-lg md:text-xl font-bold font-serif text-[var(--navy-deep)]">
                  Teaching Methodology
                </h3>
                <p className="mt-2 text-gray-700 text-sm md:text-base font-normal">
                  {data.methodology}
                </p>
              </div>

              {/* Activities */}
              <div>
                <h3 className="text-lg md:text-xl font-bold font-serif text-[var(--navy-deep)] mb-4">
                  Activities
                </h3>

                <div className="grid gap-3.5 sm:grid-cols-2">
                  {data.activities.map((act, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs md:text-sm text-gray-700 font-medium">
                      <CheckCircle2 size={16} className="text-[#ea580c] shrink-0" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar Cards */}
          <aside className="space-y-6">
            {/* Card 1: Subjects Offered */}
            <div className="bg-gray-50/70 p-6 shadow-sm border border-gray-200/80 rounded-none">
              <h3 className="text-base md:text-lg font-bold font-serif text-[var(--navy-deep)] mb-4">
                Subjects Offered
              </h3>

              <ul className="space-y-2.5 text-xs md:text-sm text-gray-700 font-medium">
                {data.subjects.map((sub, idx) => (
                  <li key={idx} className="leading-snug">
                    {sub}
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 2: Learning Outcomes (Dark Navy) */}
            <div className="bg-[var(--navy-deep)] text-white p-6 shadow-md rounded-none">
              <h3 className="text-base md:text-lg font-bold font-serif text-[var(--gold)] mb-4">
                Learning Outcomes
              </h3>

              <ul className="space-y-2.5 text-xs md:text-sm text-white/90 font-normal">
                {data.outcomes.map((out, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-snug">
                    <span className="text-[var(--gold)] font-bold">â€”</span>
                    <span>{out}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 3: Interested in Admissions? */}
            <div className="bg-[#F4ECE1] p-6 border border-gray-200/80 rounded-none">
              <h3 className="text-base md:text-lg font-bold font-serif text-[var(--navy-deep)]">
                Interested in Admissions?
              </h3>
              <p className="mt-1.5 text-xs md:text-sm text-gray-600 font-normal mb-4">
                Applications for 2026â€“27 are now open.
              </p>

              <Link
                to="/admissions/apply"
                className="w-full block bg-[var(--navy-deep)] !text-white py-3 text-center text-xs md:text-sm font-bold shadow-sm hover:bg-[var(--gold)] transition-colors rounded-none"
              >
                <span className="!text-white text-white">Apply Now</span>
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Community Banner Slide above Footer */}
      <section className="bg-[var(--sand)] py-12 md:py-16 w-full border-t border-[#0F2044]/20">
        <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-6">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-serif text-[var(--navy-deep)] font-normal text-center md:text-left">
            Ready to be part of the Greenwood community?
          </h3>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 shrink-0 w-full md:w-auto mt-5 md:mt-0">
            <Link
              to="/admissions"
              className="inline-flex items-center justify-center gap-2 bg-[var(--navy-deep)] !text-white px-6 py-3.5 rounded-none font-bold text-sm shadow-sm hover:bg-[var(--gold)] transition-colors w-full sm:w-auto"
            >
              <span className="!text-white text-white">Admissions</span>
              <ArrowRight size={16} className="!text-white text-white" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center border border-[var(--navy-deep)]/30 text-[var(--navy-deep)] px-6 py-3.5 rounded-none font-bold text-sm hover:bg-[var(--navy-deep)]/5 transition-colors w-full sm:w-auto"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

