import React from 'react'
import { Globe, Users, Heart, Sprout, Lightbulb, ShieldCheck } from 'lucide-react'

export default function LearningBeyondBooks() {
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

  return (
    <section className="py-20 md:py-24 bg-[var(--sand)] w-full">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <div className="text-[12px] font-bold uppercase tracking-[0.25em] text-[var(--gold)]">
            LEARNING BEYOND BOOKS
          </div>
          <h2 className="mt-3 text-[clamp(2.2rem,3.8vw,3.4rem)] text-[var(--navy-deep)] font-serif leading-tight">
            A World of Opportunities
          </h2>
        </div>

        {/* Opportunities 6-Column Editorial Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:divide-x lg:divide-[var(--navy-deep)]/15 gap-y-10 lg:gap-y-0">
          {opportunities.map((item) => {
            const IconComp = item.icon
            return (
              <div
                key={item.number}
                className="flex flex-col items-center text-center px-4 md:px-6 transition-all duration-300"
              >
                {/* Thin-line Navy Icon */}
                <div className="mb-4 text-[var(--navy-deep)] opacity-90">
                  <IconComp size={36} strokeWidth={1.5} />
                </div>

                {/* Number & Title */}
                <div className="text-[11px] font-bold uppercase tracking-widest text-[var(--gold)] mb-1">
                  {item.number}
                </div>
                <h3 className="text-[16px] md:text-[17px] font-bold text-[var(--navy-deep)] font-serif leading-snug">
                  {item.title}
                </h3>

                {/* Muted Description */}
                <p className="mt-2 text-[13px] text-[var(--navy-deep)]/75 leading-relaxed font-normal max-w-[180px]">
                  {item.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
