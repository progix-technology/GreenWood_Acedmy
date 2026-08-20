import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Trophy, GraduationCap, Award, ArrowRight } from 'lucide-react'
import useDocumentMeta from '../utils/useDocumentMeta'
import HallOfFameSection from '../components/home/HallOfFameSection'
import creativeToolsSvg from '../assets/bg-images/SchoolArtWork.png'

export default function ToppersPage() {
  useDocumentMeta({
    title: 'Board Toppers & Hall of Fame — Greenwood Academy',
    description: 'Explore Greenwood Academy CBSE Class 10 & 12 Board Examination Toppers, stream-wise rankers, and academic achievers.',
  })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="bg-white min-h-screen text-[var(--navy-deep)]">
      {/* Top Banner Header */}
      <section className="relative bg-[var(--navy-deep)] text-white py-14 md:py-18 border-b border-white/10 overflow-hidden">
        <div
          className="absolute top-1/2 right-0 md:right-6 -translate-y-1/2 w-[75%] md:w-[55%] h-[130%] pointer-events-none opacity-25 bg-right bg-no-repeat bg-contain mix-blend-screen"
          style={{ backgroundImage: `url(${creativeToolsSvg})` }}
        />

        <div className="container-wide relative z-10">
          <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--gold)] mb-2">
            <Trophy size={14} className="shrink-0" />
            <span>ACADEMIC HALL OF FAME</span>
          </div>
          <h1 className="text-[clamp(2.2rem,4vw,3.5rem)] font-serif font-normal text-white leading-tight max-w-3xl">
            CBSE Board Toppers & Achievers
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/85 leading-relaxed font-normal">
            Celebrating historic academic excellence. Meet our Class 10th and 12th Board Examination stream rankers and national merit holders.
          </p>
        </div>
      </section>

      {/* Main Hall of Fame Section */}
      <HallOfFameSection />

      {/* Admissions Callout Banner */}
      <section className="bg-[var(--sand)] py-12 md:py-16 w-full border-t border-[#0F2044]/20">
        <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-serif text-[var(--navy-deep)] font-normal text-center md:text-left">
              Aim for academic excellence with Greenwood Academy
            </h3>
            <p className="text-xs md:text-sm text-gray-600 mt-1 font-normal text-center md:text-left">
              Admissions open for Academic Session 2026–27.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              to="/admissions/apply"
              className="inline-flex items-center gap-2 bg-[var(--navy-deep)] !text-white px-8 py-3.5 rounded-none font-bold text-sm shadow-sm hover:bg-[var(--gold)] transition-colors"
            >
              <span className="!text-white text-white">Apply For Admission</span>
              <ArrowRight size={16} className="!text-white text-white" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
