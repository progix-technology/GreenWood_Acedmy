import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Sparkles, Trophy, Download, ArrowRight, Eye, Star, Layers, Calendar, UserCheck } from 'lucide-react'
import useDocumentMeta from '../utils/useDocumentMeta'
import SchoolMagazineReader from '../components/magazine/SchoolMagazineReader'
import { magazineData } from '../data/magazine'
import creativeToolsSvg from '../assets/bg-images/SchoolArtWork.png'

export default function MagazinePage() {
  const [isReaderOpen, setIsReaderOpen] = useState(false)
  const [startPage, setStartPage] = useState(1)

  useDocumentMeta({
    title: 'The Greenwood Chronicle — Annual School Magazine & E-Flipbook',
    description: 'Read the official digital edition of The Greenwood Chronicle Annual School Magazine with interactive 3D Flipbook experience.',
  })

  const openReaderAt = (page) => {
    setStartPage(page)
    setIsReaderOpen(true)
  }

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
            <BookOpen size={15} />
            <span>ANNUAL PUBLICATIONS & SOUVENIR</span>
          </div>
          <h1 className="text-[clamp(2.2rem,4vw,3.5rem)] font-serif font-normal text-white leading-tight max-w-3xl">
            The Greenwood Chronicle
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/85 leading-relaxed font-normal">
            Immerse yourself in our interactive 3D digital school magazine featuring student literary works, CBSE Board laurels, STEM breakthroughs, and vibrant campus life.
          </p>
        </div>
      </section>

      {/* Main Magazine Showcase Hero Section */}
      <section className="py-12 md:py-18 bg-gradient-to-b from-[var(--sand)]/30 to-white">
        <div className="container-wide">
          <div className="bg-[#0A182E] text-white p-6 sm:p-10 md:p-12 lg:p-14 rounded-2xl md:rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Background Radial Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--gold)]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Left Col: Realistic 3D Hardcover Book Mockup */}
            <div className="lg:col-span-5 flex justify-center py-4">
              <div
                onClick={() => openReaderAt(1)}
                className="group cursor-pointer relative w-64 sm:w-72 aspect-[1/1.45] bg-[#0E2240] rounded-r-md p-6 border-l-8 border-[#071224] shadow-[0_20px_50px_rgba(0,0,0,0.8),-5px_0_15px_rgba(0,0,0,0.5)] transform hover:-translate-y-2.5 hover:rotate-1 hover:shadow-[0_30px_60px_rgba(221,161,60,0.25)] transition-all duration-300 flex flex-col justify-between select-none relative overflow-hidden"
              >
                {/* Book Spine Groove & Layer Lines */}
                <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-black/40 border-r border-white/10" />
                <div className="absolute right-0 top-1 bottom-1 w-3 bg-gradient-to-l from-white/90 via-slate-200 to-slate-400 rounded-r-sm shadow-inner" />

                {/* Cover Outer Thin Gold Margin */}
                <div className="absolute inset-2.5 border border-[#DDA13C]/35 pointer-events-none rounded-xs" />

                {/* Cover Header */}
                <div className="text-center pt-3 relative z-10">
                  <div className="text-[9px] font-bold tracking-[0.28em] text-[#DDA13C] uppercase mb-1.5">
                    ANNUAL EDITION
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide leading-tight">
                    THE GREENWOOD
                  </h3>
                  <div className="text-lg sm:text-xl font-serif font-bold text-[#DDA13C] tracking-wider">
                    CHRONICLE
                  </div>
                  <div className="flex items-center justify-center gap-2 my-2 text-[10px] text-slate-300 font-mono">
                    <span>2024–25</span>
                    <span className="text-[#DDA13C]">•</span>
                    <span>VOL. 1</span>
                  </div>
                </div>

                {/* Cover Theme / Center */}
                <div className="text-center my-auto py-2 relative z-10">
                  <p className="text-[11px] font-serif italic text-slate-200 px-2">
                    "Nurturing Minds, Inspiring Futures"
                  </p>
                </div>

                {/* Architectural Building Vector Line Sketch */}
                <div className="relative z-10 my-2 px-3 text-center flex flex-col items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                  <svg
                    viewBox="0 0 160 55"
                    className="w-40 h-auto stroke-[#DDA13C] fill-none stroke-[1.2]"
                  >
                    {/* Central Portico & Pediment */}
                    <polygon points="80,5 55,20 105,20" />
                    <line x1="55" y1="20" x2="105" y2="20" />
                    {/* Columns */}
                    <line x1="60" y1="20" x2="60" y2="48" />
                    <line x1="70" y1="20" x2="70" y2="48" />
                    <line x1="90" y1="20" x2="90" y2="48" />
                    <line x1="100" y1="20" x2="100" y2="48" />
                    {/* Main Door */}
                    <path d="M74,48 V32 Q80,26 86,32 V48" />
                    {/* Left Wing */}
                    <rect x="15" y="22" width="40" height="26" />
                    <rect x="22" y="27" width="8" height="10" />
                    <rect x="38" y="27" width="8" height="10" />
                    {/* Right Wing */}
                    <rect x="105" y="22" width="40" height="26" />
                    <rect x="114" y="27" width="8" height="10" />
                    <rect x="130" y="27" width="8" height="10" />
                    {/* Base Steps */}
                    <line x1="10" y1="48" x2="150" y2="48" />
                    <line x1="5" y1="51" x2="155" y2="51" />
                  </svg>
                </div>

                {/* Cover Bottom CTA Button */}
                <div className="text-center pt-2 relative z-10">
                  <div className="w-full py-2 bg-[#E5A93C] text-[#0A182E] rounded-md font-bold text-[11px] uppercase tracking-wider shadow-md flex items-center justify-center gap-2 group-hover:brightness-110 transition-all">
                    <BookOpen size={14} />
                    <span>OPEN 3D FLIPBOOK</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Magazine Information & Interactive Controls */}
            <div className="lg:col-span-7 space-y-6">
              {/* Headline */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white leading-tight">
                Step Inside the Living Heritage of Greenwood Academy
              </h2>

              {/* Description */}
              <p className="text-xs sm:text-sm md:text-[15px] text-slate-300 leading-relaxed font-normal">
                Nurturing Minds, Inspiring Futures — Our annual magazine brings together student literary masterpieces, CBSE distinction narratives, cutting-edge AI & Robotics prototypes, and the vibrant tapestry of performing arts.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-3">
                <button
                  onClick={() => openReaderAt(1)}
                  className="px-7 py-3.5 bg-[#E5A93C] hover:bg-[#d6992d] text-[#0A182E] font-bold text-xs uppercase tracking-wider rounded-lg transition-all duration-200 shadow-lg hover:shadow-[0_10px_25px_rgba(229,169,60,0.35)] inline-flex items-center gap-2.5 group"
                >
                  <BookOpen size={16} />
                  <span>READ 3D MAGAZINE BOOK</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => openReaderAt(2)}
                  className="px-6 py-3.5 bg-[#0E2240]/80 border border-white/20 hover:border-white/50 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors inline-flex items-center gap-2"
                >
                  <Layers size={16} />
                  <span>BROWSE TABLE OF CONTENTS</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Magazine Section Index Cards */}
      <section className="py-16 md:py-20">
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-bold uppercase tracking-widest text-[var(--gold)] mb-2">
              INSIDE THIS EDITION
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--navy-deep)]">
              Curated Chapters & Feature Stories
            </h2>
            <p className="text-sm text-gray-600 mt-3">
              Click on any chapter below to jump directly to that page inside the interactive 3D reader.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {magazineData.pages.slice(1, -1).map((pg) => (
              <div
                key={pg.pageNumber}
                onClick={() => openReaderAt(pg.pageNumber)}
                className="bg-white border border-gray-200 p-6 shadow-xs hover:shadow-xl hover:border-[var(--gold)] transition-all duration-300 group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span className="font-mono font-bold text-[var(--navy-deep)] bg-[var(--sand)] px-2 py-0.5">
                      Page {pg.pageNumber}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[var(--gold)]">
                      {pg.type.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[var(--navy-deep)] group-hover:text-[var(--gold)] transition-colors mb-2">
                    {pg.title}
                  </h3>

                  <p className="text-xs text-gray-600 line-clamp-3 font-serif leading-relaxed">
                    {pg.subtitle || pg.content || pg.quote || 'Read in the interactive digital edition.'}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[var(--navy-deep)] group-hover:text-[var(--gold)]">
                  <span>Read Chapter</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3D Magazine Reader Modal */}
      <SchoolMagazineReader
        isOpen={isReaderOpen}
        onClose={() => setIsReaderOpen(false)}
        initialPage={startPage}
      />
    </div>
  )
}
