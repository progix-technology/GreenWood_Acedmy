import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, Clock, ArrowLeft, ArrowRight, User } from 'lucide-react'
import { getNewsList } from '../data/news'
import useDocumentMeta from '../utils/useDocumentMeta'

export default function NewsPost() {
  const { slug } = useParams()
  const [newsArticles, setNewsArticles] = useState(getNewsList)

  const article = newsArticles.find((n) => n.slug === slug) || newsArticles[0]

  useDocumentMeta({
    title: `${article ? article.title : 'News'} — Greenwood News`,
    description: article ? article.excerpt : 'News Article',
  })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    const handleUpdate = () => {
      setNewsArticles(getNewsList())
    }
    window.addEventListener('newsUpdated', handleUpdate)
    return () => window.removeEventListener('newsUpdated', handleUpdate)
  }, [slug])

  const relatedArticles = newsArticles.filter((n) => n.slug !== article?.slug).slice(0, 3)

  return (
    <div className="bg-white min-h-screen text-[var(--navy-deep)]">
      {/* Top Banner Header (Deep Navy) */}
      <section className="bg-[var(--navy-deep)] text-white py-12 md:py-16 border-b border-white/10">
        <div className="container-wide">
          <Link
            to="/news"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--gold)] hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={15} />
            <span>Back to All News</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-white/80">
            <span className="bg-[var(--gold)] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5">
              {article.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar size={14} className="text-[var(--gold)]" />
              <span>{article.date}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock size={14} className="text-[var(--gold)]" />
              <span>{article.readTime}</span>
            </span>
          </div>

          <h1 className="text-[clamp(1.8rem,3.5vw,3rem)] font-serif font-normal text-white leading-tight max-w-4xl">
            {article.title}
          </h1>
        </div>
      </section>

      {/* Main Article Content */}
      <section className="py-14 md:py-20">
        <div className="container-wide max-w-4xl">
          {/* Main Image */}
          <div className="w-full h-[360px] md:h-[480px] overflow-hidden border border-gray-200 mb-10 shadow-sm">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Excerpt Callout */}
          <div className="p-6 bg-[var(--sand)]/50 border-l-4 border-[var(--gold)] text-base md:text-lg font-serif italic text-gray-800 leading-relaxed mb-8">
            "{article.excerpt}"
          </div>

          {/* Full Content */}
          <div className="prose max-w-none text-gray-700 leading-relaxed text-base font-normal space-y-4">
            <p>{article.content}</p>
            <p>
              At Greenwood Academy, we strive to build a vibrant ecosystem where students explore their highest intellectual and creative capabilities. Faculty mentorship and modern facilities empower students to achieve distinctions on regional and national stages.
            </p>
          </div>

          {/* Author Footer */}
          <div className="mt-12 pt-6 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-2 font-medium">
              <User size={16} className="text-[#ea580c]" />
              <span>Published by {article.author}</span>
            </div>
            <span>Category: {article.category}</span>
          </div>

          {/* Related Articles Section */}
          <div className="mt-16 pt-12 border-t border-gray-200">
            <h3 className="text-xl font-bold font-serif text-[var(--navy-deep)] mb-6">
              Related News & Articles
            </h3>

            <div className="grid gap-6 sm:grid-cols-3">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/news/${rel.slug}`}
                  className="bg-white border border-gray-200 p-4 shadow-sm hover:border-[var(--gold)] transition-colors group block"
                >
                  <div className="h-32 w-full overflow-hidden bg-gray-100 mb-3">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="text-[10px] font-bold text-[var(--gold)] uppercase mb-1">
                    {rel.category}
                  </div>
                  <h4 className="text-sm font-bold font-serif text-[var(--navy-deep)] group-hover:text-[var(--gold)] transition-colors line-clamp-2 leading-snug">
                    {rel.title}
                  </h4>
                </Link>
              ))}
            </div>
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
