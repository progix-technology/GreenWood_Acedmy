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
      <section className="py-16 md:py-24 bg-gradient-to-b from-[var(--sand)]/30 to-white">
        <div className="container-wide">
          <div className="bg-[#0F2044] text-white p-8 md:p-14 border border-[var(--gold)]/30 shadow-2xl relative overflow-hidden grid lg:grid-cols-12 gap-10 items-center">
            {/* Background Ambient Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--gold)]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Left Col: 3D Book Graphic Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div
                onClick={() => openReaderAt(1)}
                className="group cursor-pointer relative w-64 sm:w-72 aspect-[1/1.414] bg-gradient-to-br from-[#122650] via-[#1a356d] to-[#0A1732] rounded-sm p-6 border-2 border-[var(--gold)] shadow-[0_20px_50px_rgba(0,0,0,0.6)] transform hover:-translate-y-2 hover:rotate-1 hover:shadow-[0_30px_60px_rgba(200,169,106,0.3)] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Book Spine Shading */}
                <div className="absolute left-0 top-0 bottom-0 w-4 bg-black/40 border-r border-white/10" />

                {/* Cover Top */}
                <div className="text-center pt-2">
                  <div className="text-[9px] font-bold tracking-[0.25em] text-[var(--gold)] uppercase mb-1">
                    ANNUAL EDITION
                  </div>
                  <div className="text-xl font-serif font-bold text-white tracking-wide leading-tight">
                    THE GREENWOOD
                  </div>
                  <div className="text-base font-serif font-light text-[var(--gold)] tracking-widest">
                    CHRONICLE
                  </div>
                  <div className="w-12 h-0.5 bg-[var(--gold)] mx-auto my-2" />
                  <div className="text-[10px] text-slate-300 font-mono">
                    2025–26 • VOL. XVIII
                  </div>
                </div>

                {/* Center Badge */}
                <div className="p-3 bg-white/5 border border-white/10 text-center">
                  <div className="text-[11px] font-serif italic text-white/90">
                    "Nurturing Minds, Inspiring Futures"
                  </div>
                </div>

                {/* Bottom Trigger Prompt */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--gold)] text-[#0F2044] font-bold text-xs uppercase tracking-wider shadow-md group-hover:scale-105 transition-transform">
                    <Eye size={14} />
                    <span>Open 3D Flipbook</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Magazine Overview & Features */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--gold)]/20 border border-[var(--gold)] text-[var(--gold)] text-xs font-bold uppercase tracking-wider">
                <Sparkles size={14} />
                <span>Interactive E-Magazine Experience</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
                Step Inside the Living Heritage of Greenwood Academy
              </h2>

              <p className="text-sm md:text-base text-slate-300 leading-relaxed font-normal">
                {magazineData.theme} — Our annual magazine brings together student literary masterworks, CBSE distinction rankers, cutting-edge AI & Robotics prototypes, and the vibrant tapestry of performing arts.
              </p>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 border-t border-white/10">
                <div className="p-3 bg-white/5 border border-white/10">
                  <div className="text-[10px] text-slate-400 font-medium">Pages</div>
                  <div className="text-lg font-serif font-bold text-white">10 Full Spreads</div>
                </div>
                <div className="p-3 bg-white/5 border border-white/10">
                  <div className="text-[10px] text-slate-400 font-medium">Editor-in-Chief</div>
                  <div className="text-xs font-serif font-bold text-[var(--gold)] truncate">Aarav Sharma (Head Boy)</div>
                </div>
                <div className="p-3 bg-white/5 border border-white/10 col-span-2 sm:col-span-1">
                  <div className="text-[10px] text-slate-400 font-medium">Format</div>
                  <div className="text-xs font-bold text-emerald-400">3D Interactive Flipbook</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => openReaderAt(1)}
                  className="px-8 py-4 bg-[var(--gold)] hover:bg-[#b5954e] text-[#0F2044] font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-xl inline-flex items-center gap-2.5 group"
                >
                  <BookOpen size={16} />
                  <span>Launch 3D Magazine Reader</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => openReaderAt(1)}
                  className="px-6 py-4 bg-transparent border border-white/30 hover:border-white text-white font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
                >
                  <Layers size={16} />
                  <span>Browse Table of Contents</span>
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
