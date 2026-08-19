import React from 'react'
import { GraduationCap, Lightbulb, Building2, Palette, Compass, HeartHandshake } from 'lucide-react'

const benefits = [
  { icon: GraduationCap, number: '01', title: 'Experienced Educators', desc: 'A team of dedicated, highly qualified teachers and mentors.' },
  { icon: Lightbulb, number: '02', title: 'Student-Centered Learning', desc: 'Personalised learning pathways, inquiry, and small classes.' },
  { icon: Building2, number: '03', title: 'Modern Learning Spaces', desc: 'Well-equipped labs, digital libraries, and creative studios.' },
  { icon: Palette, number: '04', title: 'Arts, Sports & Activities', desc: 'Strong co-curricular provision across sports, music, and MUN.' },
  { icon: Compass, number: '05', title: 'Character & Leadership', desc: 'A values-driven culture that develops responsibility and ethics.' },
  { icon: HeartHandshake, number: '06', title: 'A Supportive Community', desc: 'A caring environment with rigorous safeguarding and belonging.' },
]

export default function WhyChooseUs() {
  return (
    <section className="section-shell bg-[var(--navy-deep)] text-white">
      <div className="container-wide">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="section-label text-[var(--gold)]">Why Greenwood</div>
            <h2 className="mt-3 text-3xl md:text-4xl font-serif text-white">
              Six Reasons Families Choose Us, Year After Year
            </h2>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <div
                key={benefit.title}
                className="rounded-none border border-white/10 bg-white/5 p-7"
              >
                <div className="flex items-start gap-4">
                  {/* Direct Dark Orange Icon without square container */}
                  <Icon size={32} className="text-[#ea580c] shrink-0 mt-1" />
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--gold)]">
                      {benefit.number}
                    </div>
                    <h3 className="mt-1.5 text-lg font-bold text-white font-serif">{benefit.title}</h3>
                    <p className="mt-2 text-xs md:text-sm leading-relaxed text-white/75 font-normal">
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
