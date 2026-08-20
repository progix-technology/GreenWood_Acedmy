import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, GraduationCap, Mail, ArrowRight, Award } from 'lucide-react'
import { getFacultyList } from '../data/faculty'
import { getOptimizedImageUrl } from '../utils/cloudinaryHelper'
import useDocumentMeta from '../utils/useDocumentMeta'
import SectionReveal from '../components/common/SectionReveal'
import creativeToolsSvg from '../assets/bg-images/SchoolArtWork.png'

export default function Faculty() {
  const [facultyMembers, setFacultyMembers] = useState(getFacultyList)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDept, setSelectedDept] = useState('All')

  useDocumentMeta({
    title: 'Faculty & Leadership — Greenwood Academy',
    description: 'Meet our distinguished faculty, department heads, and academic leaders at Greenwood Academy.',
  })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    const handleUpdate = () => {
      setFacultyMembers(getFacultyList())
    }
    window.addEventListener('facultyUpdated', handleUpdate)
    return () => window.removeEventListener('facultyUpdated', handleUpdate)
  }, [])

  const departments = ['All', ...Array.from(new Set(facultyMembers.map((f) => f.department)))]

  const filteredFaculty = facultyMembers.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.department.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDept = selectedDept === 'All' || f.department === selectedDept
    return matchesSearch && matchesDept
  })

  return (
    <div className="bg-white min-h-screen text-[var(--navy-deep)]">
      {/* Top Banner Header (Deep Navy) */}
      <section className="relative bg-[var(--navy-deep)] text-white py-14 md:py-18 border-b border-white/10 overflow-hidden">
        {/* Background illustration watermark overlay */}
        <div
          className="absolute top-1/2 right-0 md:right-6 -translate-y-1/2 w-[75%] md:w-[55%] h-[130%] pointer-events-none opacity-25 bg-right bg-no-repeat bg-contain mix-blend-screen"
          style={{ backgroundImage: `url(${creativeToolsSvg})` }}
        />

        <div className="container-wide relative z-10">
          <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--gold)]">
            ACADEMIC LEADERSHIP
          </div>
          <h1 className="mt-2 text-[clamp(2.2rem,4vw,3.5rem)] font-serif font-normal text-white leading-tight max-w-3xl">
            Guided by Educators of Distinction
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/85 leading-relaxed font-normal">
            Our team of passionate educators, mentors, and department heads foster academic rigor, creative thinking, and character building.
          </p>
        </div>
      </section>

      {/* Main Faculty Content Section */}
      <section className="py-14 md:py-20">
        <div className="container-wide">
          {/* Search & Department Filters Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-12 pb-8 border-b border-gray-200">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search faculty by name or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 text-xs md:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[var(--navy-deep)] rounded-none"
              />
            </div>

            {/* Department Pills */}
            <div className="flex flex-wrap gap-2">
              {departments.map((dept) => {
                const isActive = selectedDept === dept
                return (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`px-3.5 py-2 text-xs font-bold transition-colors rounded-none ${
                      isActive
                        ? 'bg-[var(--navy-deep)] text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {dept}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Faculty Cards Grid */}
          {filteredFaculty.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredFaculty.map((f) => (
                <div
                  key={f.id}
                  className="bg-white border border-gray-200 shadow-sm relative overflow-hidden flex flex-col justify-between rounded-none group hover:border-[var(--gold)] transition-colors"
                >
                  <div>
                    {/* Faculty Image / Executive Avatar Placeholder */}
                    <div className="h-[220px] w-full overflow-hidden bg-gradient-to-br from-[var(--navy-deep)] to-[#1E3A8A] relative flex flex-col items-center justify-center text-white p-6">
                      {f.image ? (
                        <img
                          src={getOptimizedImageUrl(f.image, { width: 400 })}
                          alt={f.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-center">
                          <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-2xl font-serif font-bold text-[var(--gold)] mb-2 shadow-inner">
                            {f.name.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <span className="text-[11px] uppercase tracking-widest text-white/70 font-semibold">
                            Faculty Portrait
                          </span>
                        </div>
                      )}
                      <div className="absolute top-3 left-3 bg-[var(--gold)] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 backdrop-blur-sm">
                        {f.department}
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-6">
                      <div className="text-xs font-bold uppercase tracking-wider text-[var(--gold)] mb-1">
                        {f.role}
                      </div>

                      <h3 className="text-xl font-bold font-serif text-[var(--navy-deep)] mb-2">
                        {f.name}
                      </h3>

                      <div className="space-y-1.5 text-xs text-gray-600 font-medium mb-4">
                        <div className="flex items-center gap-1.5">
                          <GraduationCap size={15} className="text-[#ea580c] shrink-0" />
                          <span>{f.qualification}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Award size={15} className="text-[#ea580c] shrink-0" />
                          <span>{f.experience}</span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-600 leading-relaxed font-normal line-clamp-3">
                        {f.bio}
                      </p>
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="px-6 py-4 bg-[var(--sand)]/40 border-t border-gray-100 flex items-center justify-between">
                    <a
                      href={`mailto:${f.email}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--navy-deep)] hover:text-[var(--gold)] transition-colors"
                    >
                      <Mail size={14} className="text-[#ea580c]" />
                      <span>{f.email}</span>
                    </a>

                    <Link
                      to={`/faculty/${f.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[var(--gold)] hover:text-[var(--navy-deep)] transition-colors"
                    >
                      <span>Profile</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500 text-sm">
              No faculty members found matching "{searchQuery}".
            </div>
          )}
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
