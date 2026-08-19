import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Quote, Globe, Users, Heart, Sprout, Lightbulb, ShieldCheck } from 'lucide-react'
import testimonials from '../../data/testimonials'
import globeImg from '../../assets/bg-images/globe.png'

const opportunities = [
  {
    number: '01',
    title: 'Global Exposure',
    desc: 'International programs and exchanges',
    icon: Globe,
  },
  {
    number: '02',
    title: 'Life Skills',
    desc: 'Preparing students for real-world success',
    icon: Users,
  },
  {
    number: '03',
    title: 'Wellness',
    desc: 'Physical, mental and emotional well-being',
    icon: Heart,
  },
  {
    number: '04',
    title: 'Community Service',
    desc: 'Instilling empathy and responsibility',
    icon: Sprout,
  },
  {
    number: '05',
    title: 'Innovation',
    desc: 'Encouraging ideas, creativity and leadership',
    icon: Lightbulb,
  },
  {
    number: '06',
    title: 'Safe & Secure',
    desc: 'A safe campus with 24/7 care',
    icon: ShieldCheck,
  },
]

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const item = testimonials[index]

  const nextTestimonial = () => setIndex((prev) => (prev + 1) % testimonials.length)
  const prevTestimonial = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="relative bg-[var(--sand)] py-10 md:py-14 w-full overflow-hidden">
      {/* Background Globe illustration watermark on right side */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[70%] md:w-[56%] h-[96%] pointer-events-none opacity-25 bg-right bg-no-repeat bg-contain mix-blend-multiply"
        style={{ backgroundImage: `url(${globeImg})` }}
      />

      <div className="container-wide relative z-10">
        {/* Upper Part: Learning Beyond Books / A World of Opportunities */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="text-[12px] font-bold uppercase tracking-[0.25em] text-[var(--gold)]">
            LEARNING BEYOND BOOKS
          </div>
          <h2 className="mt-2 text-[clamp(2rem,3.2vw,2.8rem)] text-[var(--navy-deep)] font-serif leading-tight">
            A World of Opportunities
          </h2>
        </div>

        {/* 6 Opportunities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:divide-x lg:divide-[var(--navy-deep)]/15 gap-y-8 lg:gap-y-0 mb-10">
          {opportunities.map((item) => {
            const IconComp = item.icon
            return (
              <div
                key={item.number}
                className="flex flex-col items-center text-center px-3 md:px-5 transition-all duration-300"
              >
                <div className="mb-2.5 text-[var(--navy-deep)] opacity-90">
                  <IconComp size={30} strokeWidth={1.5} />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold)] mb-0.5">
                  {item.number}
                </div>
                <h3 className="text-[15px] font-bold text-[var(--navy-deep)] font-serif leading-snug">
                  {item.title}
                </h3>
                <p className="mt-1 text-[12px] text-[var(--navy-deep)]/75 leading-relaxed font-normal max-w-[170px]">
                  {item.desc}
                </p>
              </div>
            )
          })}
        </div>

        {/* Divider line between Opportunities and Community Voices */}
        <div className="w-full h-px bg-[var(--navy-deep)]/15 mb-8" />

        {/* Lower Part: Community Voices / What Our Community Says */}
        <div className="text-center max-w-2xl mx-auto mb-4">
          <div className="section-label">Community Voices</div>
          <h2 className="mt-2 text-[clamp(1.8rem,3vw,2.5rem)] text-[var(--navy-deep)] font-serif">
            What Our Community Says
          </h2>
        </div>

        <div className="relative max-w-5xl mx-auto px-16 md:px-32">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={prevTestimonial}
            aria-label="Previous Testimonial"
            className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-none bg-white border border-[var(--navy-deep)]/20 text-[var(--navy-deep)] transition-all hover:bg-[var(--navy-deep)] hover:text-white shadow-sm z-10"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Quote Content */}
          <div className="flex items-start gap-4">
            <Quote size={32} className="text-[var(--gold)] shrink-0 opacity-80 mt-1" />
            <div className="flex-1">
              <blockquote className="text-lg md:text-xl font-medium leading-relaxed text-[var(--navy-deep)] italic">
                "{item.quote}"
              </blockquote>

              <div className="mt-4 pt-3 border-t border-[var(--navy-deep)]/10">
                <div className="font-bold text-[16px] text-[var(--navy-deep)]">{item.name}</div>
                <div className="text-xs font-semibold text-[var(--gold)] mt-0.5">{item.role}</div>
              </div>
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={nextTestimonial}
            aria-label="Next Testimonial"
            className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-none bg-white border border-[var(--navy-deep)]/20 text-[var(--navy-deep)] transition-all hover:bg-[var(--navy-deep)] hover:text-white shadow-sm z-10"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="mt-6 flex justify-center items-center gap-2">
          {testimonials.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => setIndex(dotIdx)}
              aria-label={`Go to slide ${dotIdx + 1}`}
              className={`h-1.5 transition-all rounded-none ${
                dotIdx === index ? 'w-8 bg-[var(--gold)]' : 'w-2 bg-[var(--navy-deep)]/20 hover:bg-[var(--navy-deep)]/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
