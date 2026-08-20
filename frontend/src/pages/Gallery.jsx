import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { X, ZoomIn, ArrowRight } from 'lucide-react'
import { getGalleryPhotos } from '../data/gallery'
import { getOptimizedImageUrl } from '../utils/cloudinaryHelper'
import useDocumentMeta from '../utils/useDocumentMeta'
import SectionReveal from '../components/common/SectionReveal'
import creativeToolsSvg from '../assets/bg-images/SchoolArtWork.png'

export default function Gallery() {
  const [galleryPhotos, setGalleryPhotos] = useState(getGalleryPhotos)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [activeItem, setActiveItem] = useState(null)

  useDocumentMeta({
    title: 'Photo Gallery — Greenwood Academy',
    description: 'Explore life at Greenwood Academy through our campus, academic, sports, and cultural photo gallery.',
  })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    const handleUpdate = () => {
      setGalleryPhotos(getGalleryPhotos())
    }
    window.addEventListener('galleryUpdated', handleUpdate)
    return () => window.removeEventListener('galleryUpdated', handleUpdate)
  }, [])

  const categories = ['All', ...Array.from(new Set(galleryPhotos.map((g) => g.category)))]

  const filteredGallery = galleryPhotos.filter(
    (g) => selectedCategory === 'All' || g.category === selectedCategory
  )

  return (
    <div className="bg-white min-h-screen text-[var(--navy-deep)]">
      {/* Top Banner Header (Deep Navy) */}
      <section className="relative bg-[var(--navy-deep)] text-white py-14 md:py-18 border-b border-white/10 overflow-hidden">
        <div
          className="absolute top-1/2 right-0 md:right-6 -translate-y-1/2 w-[75%] md:w-[55%] h-[130%] pointer-events-none opacity-25 bg-right bg-no-repeat bg-contain mix-blend-screen"
          style={{ backgroundImage: `url(${creativeToolsSvg})` }}
        />

        <div className="container-wide relative z-10">
          <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--gold)]">
            CAMPUS VISUALS
          </div>
          <h1 className="mt-2 text-[clamp(2.2rem,4vw,3.5rem)] font-serif font-normal text-white leading-tight max-w-3xl">
            Greenwood Photo Gallery
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/85 leading-relaxed font-normal">
            A visual journey through our academic facilities, sports events, cultural performances, and student life.
          </p>
        </div>
      </section>

      {/* Main Gallery Area */}
      <section className="py-14 md:py-20">
        <div className="container-wide">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12 pb-6 border-b border-gray-200">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs font-bold transition-colors rounded-none ${
                    isActive
                      ? 'bg-[var(--navy-deep)] text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Photo Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredGallery.map((item) => (
              <SectionReveal key={item.id}>
                <div
                  onClick={() => setActiveItem(item)}
                  className="group relative overflow-hidden bg-gray-100 border border-gray-200 shadow-sm cursor-pointer h-[260px] md:h-[300px] rounded-none"
                >
                  <img
                    src={getOptimizedImageUrl(item.image, { width: 600 })}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy-deep)]/90 via-[var(--navy-deep)]/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                  {/* Caption & Zoom Icon */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10">
                    <div className="flex justify-between items-start">
                      <span className="bg-[var(--gold)] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5">
                        {item.category}
                      </span>
                      <div className="h-8 w-8 bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-[var(--gold)] transition-colors">
                        <ZoomIn size={16} className="text-white" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold font-serif leading-snug group-hover:text-[var(--gold)] transition-colors mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-white/80 line-clamp-2 font-normal">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Fullscreen Modal */}
      {activeItem && (
        <div
          onClick={() => setActiveItem(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[var(--navy-deep)] text-white border border-white/10 shadow-2xl overflow-hidden rounded-none"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-20 h-10 w-10 bg-black/50 hover:bg-[var(--gold)] text-white flex items-center justify-center transition-colors"
            >
              <X size={20} />
            </button>

            {/* Modal Image */}
            <div className="max-h-[60vh] md:max-h-[70vh] w-full overflow-hidden bg-black flex items-center justify-center">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="max-h-[60vh] md:max-h-[70vh] w-full object-contain"
              />
            </div>

            {/* Caption Info */}
            <div className="p-6 bg-[var(--navy-deep)] border-t border-white/10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--gold)] block mb-1">
                {activeItem.category}
              </span>
              <h3 className="text-xl font-serif font-bold text-white mb-2">
                {activeItem.title}
              </h3>
              <p className="text-xs md:text-sm text-white/80 leading-relaxed font-normal">
                {activeItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}

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
