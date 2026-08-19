import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'

export default function UpcomingEventsSection() {
  const events = [
    {
      slug: 'open-day-aug-2026',
      day: '20',
      month: 'AUG',
      category: 'Admissions',
      title: 'Admissions Open Day',
      timeLocation: '10:00 AM – 1:00 PM · School Auditorium & Grounds',
    },
    {
      slug: 'parent-teacher-meeting-q1',
      day: '30',
      month: 'AUG',
      category: 'Academic',
      title: 'Parent–Teacher Meeting – Q1',
      timeLocation: '9:00 AM – 12:00 PM · Respective Classrooms',
    },
    {
      slug: 'annual-sports-day-2026',
      day: '15',
      month: 'SEPT',
      category: 'Sports',
      title: 'Annual Sports Day',
      timeLocation: '8:00 AM – 5:00 PM · School Sports Ground',
    },
    {
      slug: 'science-congress-2026',
      day: '20',
      month: 'SEPT',
      category: 'Academic',
      title: 'State Science Congress Participation',
      timeLocation: 'All Day · BBAU, Lucknow',
    },
  ]

  return (
    <section className="py-16 md:py-20 bg-[var(--navy-deep)] text-white w-full">
      <div className="container-wide max-w-6xl">
        {/* Header with Title on Left and "Full calendar ->" on Right */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--gold)]">
              CALENDAR
            </div>
            <h2 className="mt-1.5 text-[clamp(1.8rem,3vw,2.5rem)] text-white font-serif font-bold">
              Upcoming Events
            </h2>
          </div>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 font-bold text-sm text-white/90 hover:text-[var(--gold)] transition-colors group"
          >
            Full calendar{' '}
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1 text-[var(--gold)]"
            />
          </Link>
        </div>

        {/* Horizontal Calendar List */}
        <div className="space-y-3.5">
          {events.map((item) => (
            <article
              key={item.slug}
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/5 border border-white/10 p-4 md:p-5 shadow-none hover:bg-white/10 hover:border-[var(--gold)]/50 transition-all duration-300 rounded-none"
            >
              {/* Left: Date badge + Details */}
              <div className="flex items-center gap-4 md:gap-6">
                {/* Square Date Box */}
                <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center bg-white/10 border border-white/15 text-white shadow-sm rounded-none">
                  <div className="text-xl font-bold leading-none font-serif text-white">{item.day}</div>
                  <div className="text-[10px] uppercase tracking-widest text-[var(--gold)] font-bold mt-0.5">
                    {item.month}
                  </div>
                </div>

                {/* Event Details */}
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--gold)]">
                    {item.category}
                  </span>
                  <h3 className="text-base md:text-lg font-bold text-white font-serif group-hover:text-[var(--gold)] transition-colors leading-snug mt-0.5">
                    <Link to={`/events/${item.slug}`}>{item.title}</Link>
                  </h3>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-white/75 font-normal">
                    <Clock size={13} className="text-[var(--gold)] shrink-0" />
                    <span>{item.timeLocation}</span>
                  </div>
                </div>
              </div>

              {/* Right: Borderless Arrow Icon */}
              <div className="shrink-0">
                <Link
                  to={`/events/${item.slug}`}
                  aria-label={`View details for ${item.title}`}
                  className="inline-flex items-center justify-center p-2 text-white/80 hover:text-[var(--gold)] transition-colors"
                >
                  <ArrowRight
                    size={20}
                    className="transition-transform group-hover:translate-x-1.5 text-white group-hover:text-[var(--gold)]"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
