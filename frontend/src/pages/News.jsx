import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, Calendar, Clock, ArrowRight, Tag, Newspaper } from 'lucide-react'
import { getNewsList, syncNewsFromApi } from '../data/news'
import { getOptimizedImageUrl } from '../utils/cloudinaryHelper'
import useDocumentMeta from '../utils/useDocumentMeta'
import SectionReveal from '../components/common/SectionReveal'
import creativeToolsSvg from '../assets/bg-images/SchoolArtWork.png'

export default function News() {
  const [newsArticles, setNewsArticles] = useState(getNewsList)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  useDocumentMeta({
    title: 'News & Announcements — Greenwood Academy',
    description: 'Latest news, achievements, academic updates, and announcements from Greenwood Academy.',
  })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    syncNewsFromApi().then((data) => {
      if (data && Array.isArray(data) && data.length > 0) {
        setNewsArticles(data)
      }
    })

    const handleUpdate = () => {
      setNewsArticles(getNewsList())
    }
    window.addEventListener('newsUpdated', handleUpdate)
    return () => window.removeEventListener('newsUpdated', handleUpdate)
  }, [])

  const categories = ['All', ...Array.from(new Set(newsArticles.map((n) => n.category)))]

  const filteredNews = newsArticles.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || n.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredNews = newsArticles[0]

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
            GREENWOOD MEDIA
          </div>
          <h1 className="mt-2 text-[clamp(2.2rem,4vw,3.5rem)] font-serif font-normal text-white leading-tight max-w-3xl">
            Latest News & Stories
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/85 leading-relaxed font-normal">
            Stay updated with academic achievements, school milestones, cultural events, and official announcements.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-14 md:py-20">
        <div className="container-wide">
          {/* Featured Article Card */}
          {featuredNews && selectedCategory === 'All' && !searchQuery && (
            <SectionReveal>
              <div className="mb-16 bg-[var(--sand)]/40 border border-gray-200 shadow-sm grid lg:grid-cols-2 gap-8 items-center rounded-none overflow-hidden group">
                <div className="h-[320px] lg:h-[400px] w-full overflow-hidden bg-gray-100">
                  <img
                    src={getOptimizedImageUrl(featuredNews.image, { width: 800 })}
                    alt={featuredNews.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 md:p-10">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-[var(--gold)] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-0.5">
                      FEATURED
                    </span>
                    <span className="text-xs text-gray-500 font-medium">{featuredNews.date}</span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold font-serif text-[var(--navy-deep)] mb-4 leading-snug group-hover:text-[var(--gold)] transition-colors">
                    {featuredNews.title}
                  </h2>

                  <p className="text-xs md:text-sm text-gray-700 leading-relaxed font-normal mb-6">
                    {featuredNews.excerpt}
                  </p>

                  <Link
                    to={`/news/${featuredNews.slug}`}
                    className="inline-flex items-center gap-2 bg-[var(--navy-deep)] !text-white px-6 py-3 font-bold text-xs uppercase tracking-wider hover:bg-[var(--gold)] transition-colors rounded-none"
                  >
                    <span className="!text-white text-white">Read Full Story</span>
                    <ArrowRight size={15} className="!text-white text-white" />
                  </Link>
                </div>
              </div>
            </SectionReveal>
          )}

          {/* Search & Category Filter Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-12 pb-8 border-b border-gray-200">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search news & stories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 text-xs md:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[var(--navy-deep)] rounded-none"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-2 text-xs font-bold transition-colors rounded-none ${
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
          </div>

          {/* News Grid */}
          {filteredNews.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredNews.map((n) => (
                <article
                  key={n.slug}
                  className="bg-white border border-gray-200 shadow-sm relative overflow-hidden flex flex-col justify-between rounded-none group hover:border-[var(--gold)] transition-colors"
                >
                  <div>
                    {/* Feature Image */}
                    <div className="h-[220px] w-full overflow-hidden bg-gray-100 relative">
                      <img
                        src={getOptimizedImageUrl(n.image, { width: 500 })}
                        alt={n.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 shadow-xs border inline-flex items-center gap-1 ${
                          n.type === 'Event'
                            ? 'bg-purple-900 text-white border-purple-700'
                            : 'bg-[#0B1736] text-white border-slate-700'
                        }`}>
                          {n.type === 'Event' ? (
                            <>
                              <Calendar size={11} />
                              <span>EVENT</span>
                            </>
                          ) : (
                            <>
                              <Newspaper size={11} />
                              <span>NEWS</span>
                            </>
                          )}
                        </span>
                        <span className="bg-white/95 text-[var(--navy-deep)] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 border border-gray-200 shadow-xs">
                          {n.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-gray-500 font-medium mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} className="text-[#ea580c]" />
                          <span>{n.date}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} className="text-[#ea580c]" />
                          <span>{n.readTime}</span>
                        </span>
                      </div>

                      <h3 className="text-lg font-bold font-serif text-[var(--navy-deep)] mb-3 leading-snug group-hover:text-[var(--gold)] transition-colors">
                        {n.title}
                      </h3>

                      <p className="text-xs text-gray-600 leading-relaxed font-normal line-clamp-3">
                        {n.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Read More Action */}
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] text-gray-500 font-medium">By {n.author}</span>
                    <Link
                      to={`/news/${n.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[var(--navy-deep)] hover:text-[var(--gold)] transition-colors"
                    >
                      <span>Read More</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500 text-sm">
              No news articles found matching "{searchQuery}".
            </div>
          )}
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
