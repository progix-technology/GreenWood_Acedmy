import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Calendar, MapPin, Clock, ArrowRight } from 'lucide-react'
import eventsData from '../data/events'
import useDocumentMeta from '../utils/useDocumentMeta'
import SectionReveal from '../components/common/SectionReveal'
import creativeToolsSvg from '../assets/bg-images/SchoolArtWork.png'

export default function Events() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  useDocumentMeta({
    title: 'Events Calendar — Greenwood Academy',
    description: 'Explore upcoming academic, sports, cultural, and admissions events at Greenwood Academy.',
  })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const categories = ['All', ...Array.from(new Set(eventsData.map((e) => e.category)))]

  const filteredEvents = eventsData.filter((e) => {
    const matchesSearch =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || e.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="bg-white min-h-screen text-[var(--navy-deep)]">
      {/* Top Banner Header (Deep Navy) */}
      <section className="relative bg-[var(--navy-deep)] text-white py-14 md:py-18 border-b border-white/10 overflow-hidden">
        <div
          className="absolute top-1/2 right-0 md:right-6 -translate-y-1/2 w-[75%] md:w-[55%] h-[130%] pointer-events-none opacity-25 bg-right bg-no-repeat bg-contain mix-blend-screen"
          style={{ backgroundImage: `url(${creativeToolsSvg})` }}
        />

        <div className="container-wide relative z-10">
          <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--gold)]">
            GREENWOOD CALENDAR
          </div>
          <h1 className="mt-2 text-[clamp(2.2rem,4vw,3.5rem)] font-serif font-normal text-white leading-tight max-w-3xl">
            Upcoming Events & Schedules
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/85 leading-relaxed font-normal">
            Join us for open days, sports championships, parent-teacher meets, and cultural exhibitions.
          </p>
        </div>
      </section>

      {/* Main Events Area */}
      <section className="py-14 md:py-20">
        <div className="container-wide">
          {/* Search & Category Filter Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-12 pb-8 border-b border-gray-200">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search events by title or venue..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 text-xs md:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[var(--navy-deep)] rounded-none"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-2 text-xs font-bold transition-colors rounded-none ${
                      isActive
                        ? 'bg-[var(--navy-deep)] text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Events List */}
          {filteredEvents.length > 0 ? (
            <div className="space-y-6">
              {filteredEvents.map((e) => (
                <SectionReveal key={e.slug}>
                  <div className="bg-white border border-gray-200 shadow-sm p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:border-[var(--gold)] transition-colors rounded-none group">
                    {/* Left: Date Badge & Details */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                      {/* Date Badge */}
                      <div className="flex h-20 w-24 shrink-0 flex-col items-center justify-center bg-[var(--navy-deep)] text-white shadow-sm">
                        <span className="text-2xl font-bold font-serif leading-none">{e.day}</span>
                        <span className="text-xs font-bold uppercase tracking-widest text-[var(--gold)] mt-1">
                          {e.month}
                        </span>
                      </div>

                      {/* Content */}
                      <div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 font-medium mb-1.5">
                          <span className="bg-[var(--sand)] text-[var(--navy-deep)] font-bold uppercase tracking-wider px-2.5 py-0.5 border border-gray-200">
                            {e.category}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} className="text-[#ea580c]" />
                            <span>{e.time}</span>
                          </span>
                        </div>

                        <h3 className="text-xl md:text-2xl font-bold font-serif text-[var(--navy-deep)] group-hover:text-[var(--gold)] transition-colors mb-2">
                          {e.title}
                        </h3>

                        <div className="flex items-center gap-1.5 text-xs md:text-sm text-gray-600 font-medium mb-3">
                          <MapPin size={15} className="text-[#ea580c] shrink-0" />
                          <span>{e.location}</span>
                        </div>

                        <p className="text-xs md:text-sm text-gray-600 font-normal leading-relaxed max-w-2xl">
                          {e.description}
                        </p>
                      </div>
                    </div>

                    {/* Right: Action Button */}
                    <div className="shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100 flex items-center gap-3">
                      <Link
                        to={`/events/${e.slug}`}
                        className="inline-flex items-center gap-2 bg-[var(--navy-deep)] !text-white px-6 py-3 font-bold text-xs uppercase tracking-wider hover:bg-[var(--gold)] transition-colors rounded-none"
                      >
                        <span className="!text-white text-white">Event Details</span>
                        <ArrowRight size={15} className="!text-white text-white" />
                      </Link>
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500 text-sm">
              No events found matching "{searchQuery}".
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
