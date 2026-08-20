import React, { useState, useEffect } from 'react'
import { Trophy, Award, Star, Sparkles, BookOpen, GraduationCap, Quote, CheckCircle2, ChevronRight, X } from 'lucide-react'
import { getToppers } from '../../data/toppers'
import { getOptimizedImageUrl } from '../../utils/cloudinaryHelper'

export default function HallOfFameSection() {
  const [toppersList, setToppersList] = useState(getToppers)
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedTopper, setSelectedTopper] = useState(null)

  useEffect(() => {
    const handleUpdate = () => {
      setToppersList(getToppers())
    }
    window.addEventListener('toppersUpdated', handleUpdate)
    return () => window.removeEventListener('toppersUpdated', handleUpdate)
  }, [])

  const filterOptions = [
    { id: 'all', label: 'All Toppers' },
    { id: 'class12-science', label: 'Class 12 (Science)' },
    { id: 'class12-commerce', label: 'Class 12 (Commerce)' },
    { id: 'class12-humanities', label: 'Class 12 (Humanities)' },
    { id: 'class10', label: 'Class 10' },
  ]

  const filteredToppers = toppersList.filter((item) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'class12-science') return item.class === 'Class 12' && item.stream.includes('Science')
    if (activeFilter === 'class12-commerce') return item.class === 'Class 12' && item.stream === 'Commerce'
    if (activeFilter === 'class12-humanities') return item.class === 'Class 12' && item.stream === 'Humanities'
    if (activeFilter === 'class10') return item.class === 'Class 10'
    return true
  })

  const getStreamBadgeStyle = (stream) => {
    if (stream.includes('Science')) return 'bg-emerald-50 text-emerald-800 border-emerald-200'
    if (stream === 'Commerce') return 'bg-amber-50 text-amber-800 border-amber-200'
    if (stream === 'Humanities') return 'bg-purple-50 text-purple-800 border-purple-200'
    return 'bg-blue-50 text-blue-800 border-blue-200'
  }

  return (
    <section id="hall-of-fame" className="py-16 md:py-24 bg-[var(--sand)] border-y border-gray-200 relative overflow-hidden">


      <div className="container-wide relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--navy-deep)] text-white text-[11px] font-bold uppercase tracking-[0.2em]">
              <Trophy size={14} className="text-[var(--gold)] shrink-0" />
              <span>HALL OF FAME 2025–26</span>
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-serif text-[var(--navy-deep)] font-normal leading-tight">
              CBSE Board Toppers & Achievers
            </h2>
            <p className="mt-2 text-sm md:text-base text-gray-600 max-w-2xl font-normal">
              Celebrating the academic brilliance, dedication, and historic 100% distinction rate of Greenwood Academy students in national CBSE Board Examinations.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-4 bg-white p-3 sm:p-4 border border-gray-200 shadow-sm shrink-0">
            <div className="text-center px-3 border-r border-gray-200">
              <div className="text-2xl font-serif font-bold text-[var(--navy-deep)]">98.8%</div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Highest Score</div>
            </div>
            <div className="text-center px-3 border-r border-gray-200">
              <div className="text-2xl font-serif font-bold text-[var(--gold)]">100%</div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Pass Result</div>
            </div>
            <div className="text-center px-3">
              <div className="text-2xl font-serif font-bold text-[var(--navy-deep)]">45+</div>
              <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">90%+ Scoring</div>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 border-b border-gray-200 pb-4">
          {filterOptions.map((f) => {
            const isActive = activeFilter === f.id
            return (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all rounded-none ${
                  isActive
                    ? 'bg-[var(--navy-deep)] !text-white shadow-xs'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <span className={isActive ? '!text-white text-white' : ''}>{f.label}</span>
              </button>
            )
          })}
        </div>

        {/* Toppers Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredToppers.map((topper) => {
            const isFirst = topper.rankBadge.includes('1st')
            return (
              <div
                key={topper.id}
                className={`bg-white border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl flex flex-col justify-between relative group ${
                  isFirst
                    ? 'border-[var(--gold)] ring-1 ring-[var(--gold)]/30'
                    : 'border-gray-200'
                }`}
              >
                {/* Top Banner Tag */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--navy-deep)] flex items-center gap-1.5">
                    <GraduationCap size={15} className="text-[var(--gold)]" />
                    <span>{topper.class} • {topper.year}</span>
                  </span>
                  <span
                    className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border rounded-none ${getStreamBadgeStyle(
                      topper.stream
                    )}`}
                  >
                    {topper.stream}
                  </span>
                </div>

                {/* Main Card Body */}
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Student Photo Frame */}
                    <div className="relative shrink-0">
                      <div className="w-20 h-24 overflow-hidden border-2 border-[var(--navy-deep)] shadow-xs bg-gray-100">
                        <img
                          src={getOptimizedImageUrl(topper.image, { width: 300 })}
                          alt={topper.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      {isFirst && (
                        <div className="absolute -top-2 -right-2 bg-[var(--gold)] text-white p-1 rounded-full shadow-sm">
                          <Sparkles size={12} />
                        </div>
                      )}
                    </div>

                    {/* Score & Name Details */}
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[var(--sand)] text-[var(--navy-deep)] font-serif font-bold text-xs uppercase tracking-wider border border-[var(--gold)]/40 mb-1">
                        <Trophy size={12} className="text-[var(--gold)] shrink-0" />
                        <span>{topper.rankBadge}</span>
                      </div>
                      <h3 className="text-xl font-serif font-bold text-[var(--navy-deep)] leading-tight">
                        {topper.name}
                      </h3>
                      <div className="text-2xl sm:text-3xl font-serif font-extrabold text-[#800000]">
                        {topper.percentage}
                      </div>
                    </div>
                  </div>

                  {/* Student Quote Snippet */}
                  <p className="mt-4 text-xs text-gray-600 italic line-clamp-2 leading-relaxed bg-[var(--sand)]/30 p-3 border-l-2 border-[var(--gold)]">
                    "{topper.quote}"
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="mt-4 space-y-1.5 border-t border-gray-100 pt-3">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                      KEY ACHIEVEMENTS:
                    </div>
                    {topper.achievements.map((ach, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-800 font-medium">
                        <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-4 border-t border-gray-100 bg-gray-50/30 flex items-center justify-between">
                  <span className="text-[11px] text-gray-500 font-medium">
                    Fav: {topper.favoriteSubject}
                  </span>
                  <button
                    onClick={() => setSelectedTopper(topper)}
                    className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[var(--navy-deep)] hover:text-[var(--gold)] transition-colors"
                  >
                    <span>View Story</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Student Story Modal */}
      {selectedTopper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white max-w-lg w-full border border-gray-300 shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setSelectedTopper(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-4 border-b border-gray-200 pb-4 mb-5">
              <div className="w-16 h-20 overflow-hidden border border-gray-300 shrink-0">
                <img
                  src={selectedTopper.image}
                  alt={selectedTopper.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="px-2 py-0.5 bg-[var(--sand)] text-[var(--navy-deep)] text-[10px] font-bold uppercase border border-[var(--gold)]/40">
                  {selectedTopper.rankBadge}
                </span>
                <h3 className="text-2xl font-serif font-bold text-[var(--navy-deep)] mt-1">
                  {selectedTopper.name}
                </h3>
                <div className="text-xl font-bold font-serif text-[#800000]">
                  {selectedTopper.percentage} Aggregate
                </div>
              </div>
            </div>

            <div className="space-y-4 text-xs md:text-sm text-gray-700">
              <div>
                <div className="font-bold text-[var(--navy-deep)] uppercase text-[11px] tracking-wider mb-1">
                  Student Success Message
                </div>
                <p className="italic bg-gray-50 p-4 border-l-4 border-[var(--gold)] leading-relaxed">
                  "{selectedTopper.quote}"
                </p>
              </div>

              <div>
                <div className="font-bold text-[var(--navy-deep)] uppercase text-[11px] tracking-wider mb-2">
                  Academic Honours & Competitive Ranks
                </div>
                <ul className="space-y-1.5">
                  {selectedTopper.achievements.map((ach, idx) => (
                    <li key={idx} className="flex items-center gap-2 font-medium">
                      <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-gray-200 flex justify-between items-center text-xs text-gray-500">
                <span>Class: <strong>{selectedTopper.class}</strong> ({selectedTopper.stream})</span>
                <span>Session: <strong>{selectedTopper.year}</strong></span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
