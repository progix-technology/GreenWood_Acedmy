import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import newsData from '../../data/news'

export default function LatestNewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Calculate visible cards count dynamically
  const visibleCards = 3
  const maxIndex = Math.max(0, newsData.length - visibleCards)

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
  }

  const displayedNews = newsData.slice(currentIndex, currentIndex + visibleCards)

  return (
    <section className="py-16 md:py-24 bg-white text-[var(--navy-deep)] overflow-hidden border-t border-gray-100">
      <div className="container-wide">
        {/* Centered Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-4xl md:text-5xl font-serif font-normal tracking-tight text-[var(--navy-deep)]">
            News
          </h2>
          <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--gold)]">
            STORIES & ANNOUNCEMENTS FROM GREENWOOD CAMPUS
          </div>
        </div>

        {/* Carousel Container with Arrows on Outer Edges */}
        <div className="relative flex items-center gap-3 sm:gap-6 md:gap-8">
          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous News"
            className="shrink-0 h-10 w-10 md:h-12 md:w-12 rounded-full border border-gray-300 text-gray-700 flex items-center justify-center transition-colors hover:border-[var(--navy-deep)] hover:text-[var(--navy-deep)] hover:bg-gray-50 disabled:opacity-25 disabled:cursor-not-allowed z-10"
          >
            <ArrowLeft size={18} />
          </button>

          {/* News Cards Grid */}
          <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
            {displayedNews.map((item) => (
              <article
                key={item.slug}
                className="group relative overflow-hidden bg-gray-900 border border-gray-200 shadow-sm rounded-none h-[410px] sm:h-[430px] flex flex-col justify-between cursor-pointer"
              >
                <Link to={`/news/${item.slug}`} className="flex flex-col h-full justify-between relative">
                  {/* Full Card Background Image (Visible through transparent overlay on hover!) */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-95"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Initial State Bottom Grey Title Block */}
                  <div className="relative z-10 mt-auto bg-[#E5E5E5] p-5 text-center flex flex-col justify-between border-t border-gray-200 shadow-md">
                    {/* Down Triangle Notch on Initial State Image */}
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-[#E5E5E5] z-10" />

                    <h3 className="text-xs md:text-sm font-bold uppercase tracking-wider text-[var(--navy-deep)] leading-snug line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="mt-2 text-[11px] font-semibold text-gray-500 uppercase tracking-widest">
                      {item.date}
                    </div>
                  </div>

                  {/* HOVER OVERLAY SLIDE PANEL (Semi-Transparent Deep Navy + Glassmorphism Backdrop Blur) */}
                  <div className="absolute inset-3.5 bg-[#0F2044]/75 backdrop-blur-[3px] text-white p-5 flex flex-col justify-between items-center text-center transition-all duration-500 ease-in-out translate-y-[115%] group-hover:translate-y-0 z-20 shadow-2xl border border-white/30">
                    {/* Top Triangle Notch on Hover Overlay pointing UP */}
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-[#0F2044] z-30" />

                    {/* Inner Double Frame Lines */}
                    <div className="absolute inset-2.5 border border-white/80 pointer-events-none p-1">
                      <div className="w-full h-full border border-white/40" />
                    </div>

                    {/* Overlay Content */}
                    <div className="relative z-10 my-auto flex flex-col items-center justify-between h-full py-1.5 px-1">
                      <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white leading-relaxed line-clamp-3 max-w-[95%] drop-shadow-sm">
                        {item.title}
                      </h3>

                      <div className="my-2 text-[11px] font-semibold text-[var(--gold)] uppercase tracking-[0.25em]">
                        {item.date}
                      </div>

                      {/* Read More Button */}
                      <div>
                        <span className="inline-flex items-center justify-center gap-2 border border-white bg-white/10 backdrop-blur-sm px-5 py-2 text-xs font-bold text-white uppercase tracking-wider hover:bg-white hover:text-[var(--navy-deep)] transition-colors shadow-sm">
                          <span>Read More</span>
                          <ArrowUpRight size={15} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            aria-label="Next News"
            className="shrink-0 h-10 w-10 md:h-12 md:w-12 rounded-full border border-gray-300 text-gray-700 flex items-center justify-center transition-colors hover:border-[var(--navy-deep)] hover:text-[var(--navy-deep)] hover:bg-gray-50 disabled:opacity-25 disabled:cursor-not-allowed z-10"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
