import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import useDocumentMeta from '../utils/useDocumentMeta'
import SectionReveal from '../components/common/SectionReveal'
import creativeToolsSvg from '../assets/bg-images/SchoolArtWork.png'

import sportsImg from '../assets/images/campus_facilities/sports.webp'
import auditoriumImg from '../assets/images/campus_facilities/auditoriam.webp'
import scienceClassImg from '../assets/images/campus_facilities/Science_Class.webp'
import smartLibraryImg from '../assets/images/campus_facilities/smartlibrary.webp'

export default function CampusLife() {
  useDocumentMeta({
    title: 'Campus Life — Greenwood Academy',
    description: 'A campus full of possibility. Explore sports, cultural activities, clubs & societies, and community service at Greenwood Academy.',
  })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="bg-[var(--sand)]/40 min-h-screen text-[var(--navy-deep)]">
      {/* Header Banner (Deep Navy) */}
      <section className="relative bg-[var(--navy-deep)] text-white py-14 md:py-18 border-b border-white/10 overflow-hidden">
        {/* Background illustration watermark overlay */}
        <div
          className="absolute top-1/2 right-0 md:right-6 -translate-y-1/2 w-[75%] md:w-[55%] h-[130%] pointer-events-none opacity-25 bg-right bg-no-repeat bg-contain mix-blend-screen"
          style={{ backgroundImage: `url(${creativeToolsSvg})` }}
        />

        <div className="container-wide relative z-10">
          <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--gold)]">
            CAMPUS LIFE
          </div>
          <h1 className="mt-2 text-[clamp(2.2rem,4vw,3.5rem)] font-serif font-normal text-white leading-tight max-w-3xl">
            A Campus Full of Possibility
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/85 leading-relaxed font-normal">
            At Greenwood, life outside the classroom is as intentional as life inside it — curious, creative, physically active and socially responsible.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-14 md:py-20">
        <div className="container-wide">
          {/* Alternating Feature Blocks */}
          <div className="space-y-20 md:space-y-28">
            {/* Block 1: Sports & Athletics (Left Image / Right Text) */}
            <SectionReveal>
              <div className="grid gap-8 md:gap-14 lg:grid-cols-2 items-center">
                <div className="overflow-hidden border border-gray-200 shadow-sm bg-white rounded-none">
                  <img
                    src={sportsImg}
                    alt="Sports & Athletics"
                    className="w-full h-[320px] md:h-[380px] object-cover"
                  />
                </div>
                <div className="max-w-xl">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--navy-deep)] mb-4">
                    Sports & Athletics
                  </h2>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed font-normal mb-6">
                    From cricket and football to swimming and athletics, our comprehensive sports programme develops physical fitness, team spirit and competitive drive. Students compete at inter-school, district and state levels.
                  </p>
                  <Link
                    to="/gallery"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--navy-deep)] hover:text-[var(--gold)] transition-colors group"
                  >
                    <span>See photos</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </SectionReveal>

            {/* Block 2: Cultural Activities (Right Image / Left Text) */}
            <SectionReveal>
              <div className="grid gap-8 md:gap-14 lg:grid-cols-2 items-center">
                <div className="order-2 lg:order-1 max-w-xl">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--navy-deep)] mb-4">
                    Cultural Activities & Performing Arts
                  </h2>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed font-normal mb-6">
                    Annual functions, cultural fests, music performances and drama productions in our acoustic auditorium give students a stage to discover and share their creative voice.
                  </p>
                  <Link
                    to="/gallery"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--navy-deep)] hover:text-[var(--gold)] transition-colors group"
                  >
                    <span>See photos</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <div className="order-1 lg:order-2 overflow-hidden border border-gray-200 shadow-sm bg-white rounded-none">
                  <img
                    src={auditoriumImg}
                    alt="Cultural Activities"
                    className="w-full h-[320px] md:h-[380px] object-cover"
                  />
                </div>
              </div>
            </SectionReveal>

            {/* Block 3: Clubs & Societies (Left Image / Right Text) */}
            <SectionReveal>
              <div className="grid gap-8 md:gap-14 lg:grid-cols-2 items-center">
                <div className="overflow-hidden border border-gray-200 shadow-sm bg-white rounded-none">
                  <img
                    src={scienceClassImg}
                    alt="Clubs & Societies"
                    className="w-full h-[320px] md:h-[380px] object-cover"
                  />
                </div>
                <div className="max-w-xl">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--navy-deep)] mb-4">
                    STEM Clubs & Student Societies
                  </h2>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed font-normal mb-6">
                    20+ student-led clubs — from AI Robotics and Model UN to the Literary Society, Eco Club and Photography Circle — connect students with shared interests and develop leadership skills.
                  </p>
                  <Link
                    to="/gallery"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--navy-deep)] hover:text-[var(--gold)] transition-colors group"
                  >
                    <span>See photos</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </SectionReveal>

            {/* Block 4: Community Service & Digital Library (Right Image / Left Text) */}
            <SectionReveal>
              <div className="grid gap-8 md:gap-14 lg:grid-cols-2 items-center">
                <div className="order-2 lg:order-1 max-w-xl">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-[var(--navy-deep)] mb-4">
                    Community Service & Academic Support
                  </h2>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed font-normal mb-6">
                    National Service Scheme participation, research pods, and environmental initiatives teach students that excellence carries a responsibility to give back.
                  </p>
                  <Link
                    to="/gallery"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--navy-deep)] hover:text-[var(--gold)] transition-colors group"
                  >
                    <span>See photos</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <div className="order-1 lg:order-2 overflow-hidden border border-gray-200 shadow-sm bg-white rounded-none">
                  <img
                    src={smartLibraryImg}
                    alt="Community Service"
                    className="w-full h-[320px] md:h-[380px] object-cover"
                  />
                </div>
              </div>
            </SectionReveal>
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
