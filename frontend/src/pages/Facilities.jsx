import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, ShieldCheck, Bus, HeartPulse, Trophy, Music, Sparkles, Cpu } from 'lucide-react'
import useDocumentMeta from '../utils/useDocumentMeta'
import SectionReveal from '../components/common/SectionReveal'
import creativeToolsSvg from '../assets/bg-images/SchoolArtWork.png'

import scienceClassImg from '../assets/images/campus_facilities/Science_Class.webp'
import smartLibraryImg from '../assets/images/campus_facilities/smartlibrary.webp'
import sportsImg from '../assets/images/campus_facilities/sports.webp'
import auditoriumImg from '../assets/images/campus_facilities/auditoriam.webp'
import fleetImg from '../assets/images/campus_facilities/fleet.webp'
import medicalRoomImg from '../assets/images/campus_facilities/medical_room.webp'

export default function Facilities() {
  useDocumentMeta({
    title: 'Campus Facilities — Greenwood Academy',
    description: 'Explore world-class academic, sports, STEM lab, digital library, and transport facilities at Greenwood Academy.',
  })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const facilitiesList = [
    {
      icon: Cpu,
      title: 'Advanced STEM & Science Labs',
      desc: 'State-of-the-art Physics, Chemistry, and Biology laboratories equipped with 3D rapid prototyping printers, IoT robotics hubs, and AI coding units.',
      image: scienceClassImg,
    },
    {
      icon: BookOpen,
      title: 'Digital Library & Research Pods',
      desc: 'Over 15,000 physical volumes, digital journal access, quiet research pods, and multimedia reference centers.',
      image: smartLibraryImg,
    },
    {
      icon: Trophy,
      title: 'Sports Arena & Athletic Fields',
      desc: 'Standard football turf, cricket pitches, basketball courts, synthetic running track, and indoor badminton courts.',
      image: sportsImg,
    },
    {
      icon: Music,
      title: 'Performing Arts & Acoustic Auditorium',
      desc: 'Sound-proof music studio, classical dance rehearsal rooms, and a 500-seat multi-purpose auditorium for school productions.',
      image: auditoriumImg,
    },
    {
      icon: Bus,
      title: 'GPS-Tracked AC Transport Fleet',
      desc: 'Fleet of air-conditioned buses equipped with real-time GPS tracking, speed governors, CCTV cameras, and female attendants.',
      image: fleetImg,
    },
    {
      icon: HeartPulse,
      title: 'Medical Infirmary & Wellness Center',
      desc: 'Dedicated healthcare clinic staffed by a qualified full-time resident nurse, first-aid support, and emergency tie-ups with top hospitals.',
      image: medicalRoomImg,
    },
  ]

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
            WORLD-CLASS INFRASTRUCTURE
          </div>
          <h1 className="mt-2 text-[clamp(2.2rem,4vw,3.5rem)] font-serif font-normal text-white leading-tight max-w-3xl">
            Campus Facilities & Infrastructure
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/85 leading-relaxed font-normal">
            Designed to inspire curiosity, physical fitness, and creative expression in a safe, eco-friendly environment.
          </p>
        </div>
      </section>

      {/* Main Facilities Grid */}
      <section className="py-14 md:py-20">
        <div className="container-wide">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {facilitiesList.map((item, idx) => {
              const IconComp = item.icon
              return (
                <SectionReveal key={idx}>
                  <div className="bg-white border border-gray-200 shadow-sm relative overflow-hidden flex flex-col justify-between rounded-none group hover:border-[var(--gold)] transition-colors h-full">
                    <div>
                      {/* Facility Image */}
                      <div className="h-[220px] w-full overflow-hidden bg-gray-100 relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex h-11 w-11 items-center justify-center bg-[var(--sand)] text-[#ea580c] mb-4 border border-gray-200">
                          <IconComp size={22} strokeWidth={2} />
                        </div>

                        <h3 className="text-xl font-bold font-serif text-[var(--navy-deep)] mb-3 leading-snug group-hover:text-[var(--gold)] transition-colors">
                          {item.title}
                        </h3>

                        <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-normal">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </SectionReveal>
              )
            })}
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
