import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { GraduationCap, Award, Mail, ArrowLeft, ArrowRight, BookOpen } from 'lucide-react'
import facultyData from '../data/faculty'
import useDocumentMeta from '../utils/useDocumentMeta'

export default function FacultyProfile() {
  const { id } = useParams()
  const f = facultyData.find((x) => String(x.id) === id) || facultyData[0]

  useDocumentMeta({
    title: `${f.name} — Greenwood Faculty`,
    description: `${f.name}, ${f.role} at Greenwood Academy. ${f.qualification}`,
  })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  return (
    <div className="bg-white min-h-screen text-[var(--navy-deep)]">
      {/* Top Banner Header (Deep Navy) */}
      <section className="bg-[var(--navy-deep)] text-white py-12 md:py-16 border-b border-white/10">
        <div className="container-wide">
          <Link
            to="/faculty"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--gold)] hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={15} />
            <span>Back to All Faculty</span>
          </Link>

          <h1 className="text-[clamp(2rem,3.5vw,3rem)] font-serif font-normal text-white leading-tight">
            {f.name}
          </h1>
          <p className="mt-2 text-base text-white/80 font-medium">{f.role}</p>
        </div>
      </section>

      {/* Main Profile Details */}
      <section className="py-14 md:py-20">
        <div className="container-wide grid gap-12 lg:grid-cols-[340px_1fr] items-start">
          {/* Left Column: Portrait & Key Info */}
          <div className="bg-[var(--sand)]/50 p-6 border border-gray-200 shadow-sm rounded-none">
            <div className="h-[280px] w-full overflow-hidden bg-gradient-to-br from-[var(--navy-deep)] to-[#1E3A8A] mb-6 flex flex-col items-center justify-center text-white p-6">
              {f.image ? (
                <img
                  src={f.image}
                  alt={f.name}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-3xl font-serif font-bold text-[var(--gold)] mb-3 shadow-inner">
                    {f.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <span className="text-xs uppercase tracking-widest text-white/70 font-semibold">
                    Faculty Portrait
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-4 text-xs md:text-sm text-gray-700">
              <div className="pb-3 border-b border-gray-200/80">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-1">
                  Department
                </span>
                <span className="font-bold text-[var(--navy-deep)]">{f.department}</span>
              </div>

              <div className="pb-3 border-b border-gray-200/80">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-1">
                  Qualification
                </span>
                <span className="font-medium text-gray-800">{f.qualification}</span>
              </div>

              <div className="pb-3 border-b border-gray-200/80">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-1">
                  Experience
                </span>
                <span className="font-medium text-gray-800">{f.experience}</span>
              </div>

              <div>
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-1">
                  Contact Email
                </span>
                <a
                  href={`mailto:${f.email}`}
                  className="font-bold text-[var(--gold)] hover:underline flex items-center gap-1.5"
                >
                  <Mail size={14} className="text-[#ea580c]" />
                  <span>{f.email}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Achievements */}
          <div className="space-y-8">
            <div>
              <div className="section-label">Faculty Biography</div>
              <h2 className="mt-2 text-2xl md:text-3xl font-serif text-[var(--navy-deep)] mb-4">
                About {f.name}
              </h2>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed font-normal">
                {f.bio}
              </p>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold font-serif text-[var(--navy-deep)] mb-4">
                Educational Philosophy & Focus
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed font-normal">
                At Greenwood Academy, {f.name.split(' ')[1] || f.name} is dedicated to nurturing curiosity, academic integrity, and self-belief in every student. Through personalized mentorship and innovative teaching methodologies, students are encouraged to reach their full potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Banner Slide above Footer */}
      <section className="bg-[var(--sand)] py-12 md:py-16 w-full border-t border-[#0F2044]/20">
        <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-6">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-serif text-[var(--navy-deep)] font-normal text-center md:text-left">
            Ready to be part of the Greenwood community?
          </h3>
          <div className="flex items-center gap-4 shrink-0">
            <Link
              to="/admissions"
              className="inline-flex items-center gap-2 bg-[var(--navy-deep)] !text-white px-6 py-3.5 rounded-none font-bold text-sm shadow-sm hover:bg-[var(--gold)] transition-colors"
            >
              <span className="!text-white text-white">Admissions</span>
              <ArrowRight size={16} className="!text-white text-white" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center border border-[var(--navy-deep)]/30 text-[var(--navy-deep)] px-6 py-3.5 rounded-none font-bold text-sm hover:bg-[var(--navy-deep)]/5 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
