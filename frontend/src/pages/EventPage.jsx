import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, Clock, MapPin, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'
import eventsData from '../data/events'
import useDocumentMeta from '../utils/useDocumentMeta'

export default function EventPage() {
  const { slug } = useParams()
  const eventItem = eventsData.find((e) => e.slug === slug) || eventsData[0]

  useDocumentMeta({
    title: `${eventItem.title} — Greenwood Events`,
    description: eventItem.description,
  })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

  return (
    <div className="bg-white min-h-screen text-[var(--navy-deep)]">
      {/* Top Banner Header (Deep Navy) */}
      <section className="bg-[var(--navy-deep)] text-white py-12 md:py-16 border-b border-white/10">
        <div className="container-wide">
          <Link
            to="/events"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--gold)] hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={15} />
            <span>Back to All Events</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-white/80">
            <span className="bg-[var(--gold)] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5">
              {eventItem.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar size={14} className="text-[var(--gold)]" />
              <span>{eventItem.fullDate}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock size={14} className="text-[var(--gold)]" />
              <span>{eventItem.time}</span>
            </span>
          </div>

          <h1 className="text-[clamp(1.8rem,3.5vw,3rem)] font-serif font-normal text-white leading-tight max-w-4xl">
            {eventItem.title}
          </h1>
        </div>
      </section>

      {/* Main Details Area */}
      <section className="py-14 md:py-20">
        <div className="container-wide grid gap-12 lg:grid-cols-[1fr_360px] items-start">
          {/* Left Column: Event Overview & Highlights */}
          <div className="space-y-8">
            <div className="w-full h-[320px] md:h-[400px] overflow-hidden border border-gray-200 shadow-sm">
              <img
                src={eventItem.image}
                alt={eventItem.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold font-serif text-[var(--navy-deep)] mb-4">
                About this Event
              </h2>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed font-normal">
                {eventItem.description}
              </p>
            </div>

            {/* Event Highlights */}
            {eventItem.highlights && (
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-xl font-bold font-serif text-[var(--navy-deep)] mb-4">
                  Schedule & Key Highlights
                </h3>

                <ul className="space-y-3">
                  {eventItem.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-gray-700 font-medium">
                      <CheckCircle2 size={16} className="text-[#ea580c] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Sidebar: Location & Registration */}
          <aside className="space-y-6">
            <div className="bg-[var(--sand)]/50 p-6 border border-gray-200 shadow-sm rounded-none">
              <h3 className="text-base md:text-lg font-bold font-serif text-[var(--navy-deep)] mb-4">
                Event Logistics
              </h3>

              <div className="space-y-4 text-xs md:text-sm text-gray-700">
                <div>
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-1">
                    Date & Time
                  </span>
                  <span className="font-bold text-[var(--navy-deep)]">{eventItem.fullDate}</span>
                  <div className="text-xs text-gray-600 mt-0.5">{eventItem.time}</div>
                </div>

                <div className="pt-3 border-t border-gray-200/80">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-1">
                    Venue / Location
                  </span>
                  <span className="font-bold text-[var(--navy-deep)] flex items-center gap-1.5">
                    <MapPin size={15} className="text-[#ea580c] shrink-0" />
                    <span>{eventItem.location}</span>
                  </span>
                </div>

                <div className="pt-3 border-t border-gray-200/80">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block mb-1">
                    Entry & Admission
                  </span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200 inline-block">
                    Free / Open to All Families
                  </span>
                </div>
              </div>

              <Link
                to="/contact"
                className="mt-6 w-full block bg-[var(--navy-deep)] !text-white py-3 text-center text-xs md:text-sm font-bold shadow-sm hover:bg-[var(--gold)] transition-colors rounded-none"
              >
                <span className="!text-white text-white">RSVP / Contact Us</span>
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
