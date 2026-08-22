import React, { useState, useEffect, useRef } from 'react'
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  X,
  Sparkles,
  Trophy,
  GraduationCap,
  Heart,
  Cpu,
  Bookmark,
  Layers,
  ZoomIn,
  ZoomOut
} from 'lucide-react'
import { magazineData } from '../../data/magazine'
import schoolLogo from '../../assets/images/school_website_logo.png'

export default function SchoolMagazineReader({ isOpen, onClose, initialPage = 1 }) {
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showThumbnails, setShowThumbnails] = useState(false)
  const [isFlipping, setIsFlipping] = useState(false)
  const [flipDirection, setFlipDirection] = useState('next')
  const [zoomLevel, setZoomLevel] = useState(1)
  const containerRef = useRef(null)

  const totalPages = magazineData.pages.length

  useEffect(() => {
    setCurrentPage(initialPage)
  }, [initialPage, isOpen])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault()
        handleNextPage()
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault()
        handlePrevPage()
      } else if (e.key === 'Escape') {
        if (isFullscreen) {
          handleToggleFullscreen()
        } else {
          onClose()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentPage, isFullscreen])

  if (!isOpen) return null

  const handleNextPage = () => {
    if (currentPage < totalPages && !isFlipping) {
      setIsFlipping(true)
      setFlipDirection('next')
      setTimeout(() => {
        setCurrentPage((prev) => Math.min(totalPages, prev + 1))
        setIsFlipping(false)
      }, 250)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1 && !isFlipping) {
      setIsFlipping(true)
      setFlipDirection('prev')
      setTimeout(() => {
        setCurrentPage((prev) => Math.max(1, prev - 1))
        setIsFlipping(false)
      }, 250)
    }
  }

  const handleJumpToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages && !isFlipping) {
      setIsFlipping(true)
      setFlipDirection(pageNum > currentPage ? 'next' : 'prev')
      setTimeout(() => {
        setCurrentPage(pageNum)
        setIsFlipping(false)
      }, 200)
    }
  }

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen()
        setIsFullscreen(true)
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  const currentPageData = magazineData.pages.find((p) => p.pageNumber === currentPage) || magazineData.pages[0]

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-[#070D1B]/95 backdrop-blur-md flex flex-col text-slate-100 select-none animate-fadeIn overflow-hidden"
    >
      {/* Top Header Bar */}
      <header className="h-16 border-b border-white/10 bg-[#0B1528] px-4 md:px-8 flex items-center justify-between shrink-0">
        {/* School Logo & Title */}
        <div className="flex items-center gap-3">
          <img
            src={schoolLogo}
            alt="Greenwood Academy Logo"
            className="h-10 w-auto object-contain shrink-0 rounded bg-white/5 p-1 border border-white/10"
          />
          <div>
            <h2 className="text-sm md:text-base font-serif font-bold text-white tracking-wide flex items-center gap-2">
              <span>{magazineData.title}</span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-sans font-semibold uppercase tracking-wider bg-[var(--gold)] text-[#0F2044] rounded-xs">
                {magazineData.edition}
              </span>
            </h2>
            <p className="text-[11px] text-slate-400 font-normal hidden md:block">
              {magazineData.theme} • {magazineData.publishedDate}
            </p>
          </div>
        </div>

        {/* Top Control Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Thumbnails Toggle */}
          <button
            onClick={() => setShowThumbnails(!showThumbnails)}
            title="Page Thumbnails"
            className={`p-2 rounded border transition-colors flex items-center gap-1.5 text-xs font-medium ${
              showThumbnails
                ? 'bg-[var(--gold)] text-[#0F2044] border-[var(--gold)]'
                : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'
            }`}
          >
            <Layers size={16} />
            <span className="hidden lg:inline">Pages</span>
          </button>

          {/* Zoom Controls */}
          <div className="hidden sm:flex items-center bg-white/5 border border-white/10 rounded overflow-hidden">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.85, z - 0.1))}
              title="Zoom Out"
              className="p-2 hover:bg-white/10 text-slate-300 transition-colors"
            >
              <ZoomOut size={15} />
            </button>
            <span className="text-[11px] font-mono px-2 text-slate-400">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.25, z + 0.1))}
              title="Zoom In"
              className="p-2 hover:bg-white/10 text-slate-300 transition-colors"
            >
              <ZoomIn size={15} />
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={handleToggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen View'}
            className="p-2 rounded border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 transition-colors"
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>

          {/* Close Modal */}
          <button
            onClick={onClose}
            title="Close Magazine (Esc)"
            className="p-2 rounded-full bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500 hover:text-white transition-all ml-1"
          >
            <X size={18} />
          </button>
        </div>
      </header>

      {/* Main Flipbook Viewing Canvas */}
      <div className="flex-1 relative flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-hidden bg-radial from-[#0e1b33] to-[#060b17]">
        {/* Navigation Arrow Left */}
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          aria-label="Previous Page"
          className={`absolute left-2 sm:left-6 z-30 w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-200 shadow-xl ${
            currentPage === 1
              ? 'opacity-20 cursor-not-allowed border-white/5 bg-white/5 text-slate-500'
              : 'border-[var(--gold)]/50 bg-[#0B1528]/90 text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[#0F2044] hover:scale-110'
          }`}
        >
          <ChevronLeft size={26} />
        </button>

        {/* Navigation Arrow Right */}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          aria-label="Next Page"
          className={`absolute right-2 sm:right-6 z-30 w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-200 shadow-xl ${
            currentPage === totalPages
              ? 'opacity-20 cursor-not-allowed border-white/5 bg-white/5 text-slate-500'
              : 'border-[var(--gold)]/50 bg-[#0B1528]/90 text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[#0F2044] hover:scale-110'
          }`}
        >
          <ChevronRight size={26} />
        </button>

        {/* 3D Realistic Book Stage */}
        <div
          className="relative transition-transform duration-300 ease-out flex items-center justify-center max-w-4xl w-full h-full max-h-[85vh]"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Book Drop Shadow & Binding Depth */}
          <div className="relative w-full max-w-2xl h-full aspect-[1/1.414] max-h-[780px] bg-white text-slate-900 rounded-sm shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.1)] flex flex-col justify-between overflow-hidden border border-slate-300">
            {/* Book Spine Shading Overlay */}
            <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-black/20 via-black/5 to-transparent pointer-events-none z-20" />
            <div className="absolute top-0 bottom-0 right-0 w-4 bg-gradient-to-l from-black/10 to-transparent pointer-events-none z-20" />

            {/* Page Content Layer */}
            <div
              className={`w-full h-full flex flex-col justify-between overflow-hidden transition-all duration-300 ${
                isFlipping
                  ? flipDirection === 'next'
                    ? 'opacity-40 translate-x-2 scale-[0.99]'
                    : 'opacity-40 -translate-x-2 scale-[0.99]'
                  : 'opacity-100 translate-x-0 scale-100'
              }`}
            >
              {renderPageContent(currentPageData, handleJumpToPage)}
            </div>

            {/* Page Bottom Footer Bar */}
            <div className="h-8 border-t border-slate-200 bg-slate-50 px-6 flex items-center justify-between text-[11px] font-medium text-slate-500 shrink-0 z-10">
              <span className="font-serif italic text-slate-400">The Greenwood Chronicle • 2025–26</span>
              <span className="font-mono font-bold text-[var(--navy-deep)]">
                Page {currentPage} of {totalPages}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Thumbnail Strip Drawer */}
      {showThumbnails && (
        <div className="h-32 bg-[#091222] border-t border-white/10 px-4 py-3 shrink-0 flex items-center gap-3 overflow-x-auto custom-scrollbar z-30 animate-fadeIn">
          {magazineData.pages.map((p) => {
            const isSelected = p.pageNumber === currentPage
            return (
              <button
                key={p.pageNumber}
                onClick={() => handleJumpToPage(p.pageNumber)}
                className={`relative shrink-0 w-20 h-24 rounded border flex flex-col justify-between p-1.5 transition-all duration-200 text-left ${
                  isSelected
                    ? 'border-[var(--gold)] ring-2 ring-[var(--gold)]/50 bg-white text-slate-900 scale-105 shadow-lg'
                    : 'border-white/10 bg-[#0F2044] text-slate-300 hover:border-white/30 hover:bg-[#162a52]'
                }`}
              >
                <div className="text-[9px] font-bold uppercase truncate">
                  {p.type === 'cover' ? 'Front Cover' : p.type === 'back_cover' ? 'Back Cover' : p.title.slice(0, 15)}
                </div>
                <div className="text-center font-mono font-bold text-xs py-1">
                  {p.pageNumber}
                </div>
                <div className="text-[8px] text-slate-400 truncate text-center">
                  Pg. {p.pageNumber}
                </div>
              </button>
            )
          })}
        </div>
      )}

      {/* Clean Bottom Footer Navigation Bar */}
      <footer className="h-12 border-t border-white/10 bg-[#0B1528] px-4 md:px-8 flex items-center justify-between shrink-0 text-xs">
        <div className="font-serif italic text-slate-400 text-xs hidden sm:block">
          The Greenwood Chronicle • Edition 2025–26
        </div>

        {/* Page Dots Navigation */}
        <div className="flex items-center gap-1.5 mx-auto sm:mx-0">
          {magazineData.pages.map((p) => (
            <button
              key={p.pageNumber}
              onClick={() => handleJumpToPage(p.pageNumber)}
              title={`Page ${p.pageNumber}: ${p.title}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                p.pageNumber === currentPage
                  ? 'w-6 bg-[var(--gold)]'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Page Counter Status */}
        <div className="font-mono text-slate-400 text-xs hidden sm:block">
          Page <span className="text-white font-bold">{currentPage}</span> / {totalPages}
        </div>
      </footer>
    </div>
  )
}

/**
 * Individual Magazine Page Content Renderer with Perfect Vertical Fit
 */
function renderPageContent(page, onJumpToPage) {
  switch (page.type) {
    case 'cover':
      return (
        <div className="p-6 sm:p-8 h-full flex flex-col justify-between bg-gradient-to-b from-[#0F2044] via-[#162c5b] to-[#0A162F] text-white relative overflow-hidden">
          {/* Gold Foil Accent Borders */}
          <div className="absolute inset-3 border-2 border-[var(--gold)]/40 pointer-events-none rounded-none" />
          <div className="absolute inset-4 border border-[var(--gold)]/20 pointer-events-none rounded-none" />

          {/* Header Masthead */}
          <div className="text-center pt-2 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-[var(--gold)]/20 border border-[var(--gold)]/50 text-[var(--gold)] text-[10px] font-bold uppercase tracking-[0.25em] mb-2">
              <Sparkles size={11} />
              <span>ANNUAL SOUVENIR & MAGAZINE</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-white leading-tight">
              THE GREENWOOD
            </h1>
            <h2 className="text-xl sm:text-2xl font-serif font-light tracking-[0.18em] text-[var(--gold)] uppercase">
              CHRONICLE
            </h2>
            <div className="w-16 h-0.5 bg-[var(--gold)] mx-auto my-1.5" />
            <p className="text-[10px] tracking-[0.2em] font-medium text-slate-300 uppercase">
              {page.edition}
            </p>
          </div>

          {/* Center Theme Box */}
          <div className="my-2 p-3 sm:p-4 bg-white/5 border border-white/10 backdrop-blur-xs relative z-10 text-center rounded">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--gold)] mb-1">
              ANNUAL THEME
            </div>
            <h3 className="text-base sm:text-lg font-serif font-bold text-white mb-1.5 leading-snug">
              "Nurturing Minds, Inspiring Futures"
            </h3>
            <p className="text-[11px] text-slate-300 max-w-sm mx-auto leading-relaxed">
              {page.tagline}
            </p>
          </div>

          {/* Cover Story Highlights */}
          <div className="space-y-1.5 relative z-10 border-t border-white/15 pt-2.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--gold)] mb-1">
              Inside This Edition:
            </div>
            {page.highlights.slice(0, 4).map((h, i) => (
              <div key={i} className="text-[11px] text-slate-200 font-medium flex items-center gap-1.5">
                <span>{h}</span>
              </div>
            ))}
          </div>

          {/* Footer Bar on Cover */}
          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-white/10 relative z-10">
            <span>CBSE Affiliated No. 2130842</span>
            <span>www.greenwood.edu.in</span>
          </div>
        </div>
      )

    case 'editorial':
      return (
        <div className="p-6 sm:p-8 h-full flex flex-col justify-between bg-[#FDFBF7] text-slate-800">
          <div>
            <div className="border-b-2 border-[var(--navy-deep)] pb-2 mb-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold)]">
                EDITORIAL BOARD
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[var(--navy-deep)]">
                {page.title}
              </h2>
            </div>

            <div className="p-3 bg-[var(--sand)]/40 border-l-4 border-[var(--gold)] mb-4 text-xs text-slate-700 italic leading-relaxed">
              "{page.content.slice(0, 220)}..."
              <div className="text-right font-sans font-bold text-[10px] text-[var(--navy-deep)] mt-1.5 not-italic">
                — {page.author}
              </div>
            </div>

            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--navy-deep)] mb-2.5 flex items-center gap-1.5">
              <Bookmark size={13} className="text-[var(--gold)]" />
              <span>Table of Contents</span>
            </h3>

            <div className="space-y-1.5">
              {page.toc.map((item, i) => (
                <button
                  key={i}
                  onClick={() => onJumpToPage(item.page)}
                  className="w-full text-left p-2 rounded bg-white hover:bg-[var(--gold)]/15 border border-slate-200 transition-all flex items-center justify-between text-[11px] group"
                >
                  <span className="font-serif font-medium text-slate-800 group-hover:text-[var(--navy-deep)]">
                    {item.title}
                  </span>
                  <span className="font-mono font-bold text-[var(--gold)] bg-[#0F2044] text-white px-1.5 py-0.5 text-[9px] rounded">
                    Pg. {item.page}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )

    case 'principal_desk':
      return (
        <div className="p-6 sm:p-8 h-full flex flex-col justify-between bg-[#FDFBF7] text-slate-800">
          <div>
            <div className="border-b-2 border-[var(--navy-deep)] pb-2 mb-4 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold)]">
                  LEADERSHIP SPEAKS
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[var(--navy-deep)]">
                  {page.title}
                </h2>
              </div>
              <GraduationCap size={24} className="text-[var(--gold)]" />
            </div>

            {/* Principal Quote Callout */}
            <div className="p-3 bg-[var(--navy-deep)] text-white mb-4 border-l-4 border-[var(--gold)] rounded-r">
              <p className="font-serif italic text-xs leading-relaxed text-[var(--sand)]">
                {page.quote}
              </p>
              <p className="text-[10px] text-right font-sans font-bold text-[var(--gold)] mt-1.5">
                — {page.author}
              </p>
            </div>

            {/* Letter Body */}
            <div className="text-xs text-slate-700 leading-relaxed space-y-2 font-serif">
              {page.content.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-200 pt-3 mt-4 flex items-center justify-between">
            <div>
              <div className="text-xs font-serif font-bold text-[var(--navy-deep)]">{page.signature}</div>
              <div className="text-[10px] text-slate-500">Principal, Greenwood Academy</div>
            </div>
            <div className="w-20 h-8 border-b border-dashed border-slate-400 flex items-end justify-center text-[9px] font-cursive text-slate-400 italic">
              (Seal & Sign)
            </div>
          </div>
        </div>
      )

    case 'academics':
      return (
        <div className="p-6 sm:p-8 h-full flex flex-col justify-between bg-[#FDFBF7] text-slate-800">
          <div>
            <div className="border-b-2 border-[var(--navy-deep)] pb-2 mb-3">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold)]">
                HALL OF MERIT
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[var(--navy-deep)]">
                {page.title}
              </h2>
              <p className="text-[11px] text-slate-500">{page.subtitle}</p>
            </div>

            {/* Metric Stat Boxes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              {page.stats.map((st, i) => (
                <div key={i} className="bg-white border border-slate-200 p-2 text-center shadow-2xs">
                  <div className="text-base font-serif font-bold text-[var(--navy-deep)]">{st.val}</div>
                  <div className="text-[9px] font-medium text-slate-500">{st.label}</div>
                </div>
              ))}
            </div>

            <div className="text-xs font-bold uppercase tracking-wider text-[var(--navy-deep)] mb-2 flex items-center gap-1.5">
              <Trophy size={14} className="text-[var(--gold)]" />
              <span>Board Rankers Spotlight</span>
            </div>

            {/* Spotlight Cards */}
            <div className="space-y-2">
              {page.spotlight.map((sp, i) => (
                <div key={i} className="p-2.5 bg-white border border-slate-200 flex items-start gap-2.5 shadow-2xs">
                  <div className="w-7 h-7 rounded-full bg-[var(--gold)] text-[#0F2044] font-bold text-xs flex items-center justify-center shrink-0">
                    #{i + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-bold text-xs text-[var(--navy-deep)]">
                        {sp.name}
                      </h4>
                      <span className="font-bold text-xs text-[var(--crimson)]">{sp.score}</span>
                    </div>
                    <p className="text-[10px] font-medium text-slate-500">{sp.class} • {sp.rank}</p>
                    <p className="text-[10px] text-slate-700 mt-0.5 font-serif">{sp.achievement}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[10px] text-slate-500 italic border-t border-slate-200 pt-2 mt-2">
            {page.note}
          </p>
        </div>
      )

    case 'stem_innovation':
      return (
        <div className="p-6 sm:p-8 h-full flex flex-col justify-between bg-[#FDFBF7] text-slate-800">
          <div>
            <div className="border-b-2 border-[var(--navy-deep)] pb-2 mb-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold)]">
                INNOVATION CORNER
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[var(--navy-deep)]">
                {page.title}
              </h2>
              <p className="text-[11px] text-slate-500">{page.subtitle}</p>
            </div>

            <div className="space-y-3">
              {page.projects.map((proj, i) => (
                <div key={i} className="p-3 bg-white border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Cpu size={14} className="text-[var(--gold)]" />
                    <h4 className="font-serif font-bold text-xs text-[var(--navy-deep)]">
                      {proj.title}
                    </h4>
                  </div>
                  <div className="text-[9px] font-bold text-[var(--gold)] uppercase mb-1">
                    Team: {proj.team}
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-serif">
                    {proj.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )

    case 'creative_arts':
      return (
        <div className="p-6 sm:p-8 h-full flex flex-col justify-between bg-[#FDFBF7] text-slate-800">
          <div>
            <div className="border-b-2 border-[var(--navy-deep)] pb-2 mb-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold)]">
                STUDENT EXPRESSIONS
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[var(--navy-deep)]">
                {page.title}
              </h2>
            </div>

            {/* Hindi Poem Box with Ornamental Frame */}
            <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-sm mb-4 text-center shadow-2xs">
              <div className="inline-block px-2 py-0.5 bg-amber-100 text-amber-900 text-[9px] font-bold uppercase mb-1">
                कविता (Poem of the Year)
              </div>
              <h3 className="font-serif font-bold text-sm text-[var(--navy-deep)] mb-0.5">
                {page.poem.title}
              </h3>
              <p className="text-[10px] text-slate-500 mb-2">— {page.poem.author}</p>
              <p className="text-[11px] leading-relaxed font-serif text-slate-800 whitespace-pre-line italic">
                {page.poem.hindiContent}
              </p>
            </div>

            {/* English Prose Box */}
            <div className="p-3 bg-white border border-slate-200 shadow-2xs">
              <h4 className="font-serif font-bold text-xs text-[var(--navy-deep)] mb-0.5">
                {page.prose.title}
              </h4>
              <p className="text-[9px] text-slate-500 mb-1.5">— {page.prose.author}</p>
              <p className="text-[11px] text-slate-600 leading-relaxed font-serif italic">
                "{page.prose.excerpt}"
              </p>
            </div>
          </div>
        </div>
      )

    case 'sports':
      return (
        <div className="p-6 sm:p-8 h-full flex flex-col justify-between bg-[#FDFBF7] text-slate-800">
          <div>
            <div className="border-b-2 border-[var(--navy-deep)] pb-2 mb-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold)]">
                ATHLETICS & LEADERSHIP
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[var(--navy-deep)]">
                {page.title}
              </h2>
              <p className="text-[11px] text-slate-500">{page.subtitle}</p>
            </div>

            {/* House Championship Leaderboard */}
            <div className="mb-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--navy-deep)] mb-1.5 flex items-center gap-1.5">
                <Trophy size={13} className="text-[var(--gold)]" />
                <span>Inter-House Championship 2025–26</span>
              </div>
              <div className="space-y-1.5">
                {page.leaderboard.map((h, i) => (
                  <div key={i} className="p-2 bg-white border border-slate-200 flex items-center justify-between shadow-2xs">
                    <div>
                      <span className="font-serif font-bold text-xs text-[var(--navy-deep)]">{h.house}</span>
                      <span className="text-[10px] text-slate-500 ml-1.5">({h.badge})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-[var(--navy-deep)]">{h.points}</span>
                      <span className="text-[10px] font-bold text-[var(--gold)]">{h.rank}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sports Highlights */}
            <div className="p-3 bg-blue-50/50 border border-blue-200">
              <div className="text-[10px] font-bold uppercase tracking-wider text-blue-900 mb-1.5">
                Season Honors
              </div>
              <ul className="space-y-1 text-[11px] text-slate-700 font-serif">
                {page.sportsHighlights.map((sh, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <span>•</span>
                    <span>{sh}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )

    case 'cultural_fest':
      return (
        <div className="p-6 sm:p-8 h-full flex flex-col justify-between bg-[#FDFBF7] text-slate-800">
          <div>
            <div className="border-b-2 border-[var(--navy-deep)] pb-2 mb-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold)]">
                PERFORMING ARTS GALA
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[var(--navy-deep)]">
                {page.title}
              </h2>
              <p className="text-[11px] text-slate-500">{page.subtitle}</p>
            </div>

            <div className="space-y-3">
              {page.events.map((ev, i) => (
                <div key={i} className="p-3 bg-white border border-slate-200 shadow-2xs">
                  <h4 className="font-serif font-bold text-xs text-[var(--navy-deep)] mb-1">
                    {ev.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-serif">
                    {ev.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )

    case 'community':
      return (
        <div className="p-6 sm:p-8 h-full flex flex-col justify-between bg-[#FDFBF7] text-slate-800">
          <div>
            <div className="border-b-2 border-[var(--navy-deep)] pb-2 mb-4">
              <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--gold)]">
                SOCIAL RESPONSIBILITY
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[var(--navy-deep)]">
                {page.title}
              </h2>
              <p className="text-[11px] text-slate-500">{page.subtitle}</p>
            </div>

            <div className="space-y-3">
              {page.initiatives.map((init, i) => (
                <div key={i} className="p-3 bg-white border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-1.5 mb-1 text-emerald-800">
                    <Heart size={14} />
                    <h4 className="font-serif font-bold text-xs text-[var(--navy-deep)]">
                      {init.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-serif">
                    {init.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )

    case 'back_cover':
      return (
        <div className="p-6 sm:p-8 h-full flex flex-col justify-between bg-gradient-to-t from-[#0A162F] via-[#102042] to-[#0F2044] text-white relative text-center">
          <div className="absolute inset-3 border-2 border-[var(--gold)]/40 pointer-events-none" />

          <div className="pt-4 relative z-10">
            <div className="w-12 h-12 rounded-full bg-[var(--gold)]/20 border border-[var(--gold)] flex items-center justify-center mx-auto mb-3 text-[var(--gold)]">
              <GraduationCap size={26} />
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
              {page.title}
            </h2>
            <p className="text-[11px] font-serif italic text-[var(--gold)] mt-1.5">
              {page.motto}
            </p>
          </div>

          <div className="p-3.5 bg-white/5 border border-white/10 max-w-sm mx-auto relative z-10 space-y-1.5 text-[11px] text-slate-300">
            <p className="font-semibold text-white">{page.stats}</p>
            <p>{page.address}</p>
            <p className="text-[var(--gold)] font-medium">{page.contact}</p>
            <p className="font-mono text-[10px] text-slate-400">{page.website}</p>
          </div>

          <div className="text-[9px] text-slate-400 pt-2 border-t border-white/10 relative z-10">
            {page.copyright}
          </div>
        </div>
      )

    default:
      return <div className="p-8">Page content unavailable</div>
  }
}
