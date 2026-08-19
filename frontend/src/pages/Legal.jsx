import React, { useEffect } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import { ShieldCheck, FileText, Map, ArrowRight, CheckCircle2 } from 'lucide-react'
import useDocumentMeta from '../utils/useDocumentMeta'
import SectionReveal from '../components/common/SectionReveal'
import creativeToolsSvg from '../assets/bg-images/SchoolArtWork.png'

const LEGAL_DATA = {
  privacy: {
    badge: 'LEGAL & COMPLIANCE',
    title: 'Privacy Policy',
    subtitle: 'How Greenwood Academy collects, uses, and safeguards student, parent, and visitor data.',
    lastUpdated: 'Last Updated: January 15, 2026',
    sections: [
      {
        heading: '1. Information We Collect',
        content:
          'Greenwood Academy collects personal information necessary for student enrolment, academic record-keeping, health and safety, and communication. This includes student names, dates of birth, academic histories, medical records, parent contact details, and financial transaction records for fee processing.',
      },
      {
        heading: '2. How Information is Used',
        content:
          'We use the collected information strictly for educational administration, student progress tracking, emergency communication, regulatory compliance with CBSE guidelines, and school event notifications. Student data is never sold or rented to third-party commercial entities.',
      },
      {
        heading: '3. Digital Portal & Cookie Policy',
        content:
          'Our online admissions portal and parent portal utilize secure session cookies to verify user identity, store draft application state locally, and optimize page load performance. Analytical cookies collect anonymized traffic metrics to improve website functionality.',
      },
      {
        heading: '4. Data Security & Storage',
        content:
          'All digital records are encrypted using industry-standard SSL protocols and stored on secure cloud servers with role-based access control. Physical documents are kept in locked administrative archives accessible only by authorized personnel.',
      },
    ],
  },
  terms: {
    badge: 'LEGAL & COMPLIANCE',
    title: 'Terms of Service & Rules',
    subtitle: 'General guidelines, fee payment regulations, and school conduct policies.',
    lastUpdated: 'Last Updated: January 15, 2026',
    sections: [
      {
        heading: '1. School Code of Conduct',
        content:
          'All enrolled students and visiting parents agree to maintain high standards of respect, integrity, and safety on school grounds. Bullying, property damage, unauthorized absence, and misconduct are strictly prohibited under school disciplinary guidelines.',
      },
      {
        heading: '2. Fee Payment & Refund Regulations',
        content:
          'Tuition and annual fees are payable quarterly according to the published admission fee schedule. Late fee surcharges apply after the due date. The one-time admission fee is non-refundable upon confirmation of enrolment.',
      },
      {
        heading: '3. Attendance & Leave Policy',
        content:
          'Students must maintain a minimum of 75% attendance to qualify for annual board examinations as mandated by CBSE regulations. Planned leave must be submitted in writing by a parent or guardian at least 48 hours prior.',
      },
      {
        heading: '4. Intellectual Property & Photography',
        content:
          'Photographs and video recordings taken during school activities, inter-school events, and exhibitions may be used in official school publications, newsletters, and digital media unless a parent submits a written opt-out request.',
      },
    ],
  },
  sitemap: {
    badge: 'NAVIGATION DIRECTORY',
    title: 'Website Sitemap',
    subtitle: 'Comprehensive index of all pages, departments, and admissions portals across Greenwood Academy.',
    lastUpdated: 'Updated for 2026–27 Academic Session',
    sitemapTree: [
      {
        category: 'Main Pages',
        links: [
          { name: 'Home Page', path: '/' },
          { name: 'About Greenwood', path: '/about' },
          { name: "Principal's Message", path: '/about/principal' },
          { name: 'Vision & Core Values', path: '/about/vision' },
          { name: 'Campus Facilities', path: '/facilities' },
          { name: 'Contact Us', path: '/contact' },
        ],
      },
      {
        category: 'Academics & Stages',
        links: [
          { name: 'Academics Overview', path: '/academics' },
          { name: 'Early Years (Nursery – Class 2)', path: '/academics/early-years' },
          { name: 'Primary School (Class 3 – 5)', path: '/academics/primary' },
          { name: 'Middle School (Class 6 – 8)', path: '/academics/middle' },
          { name: 'Senior School (Class 9 – 12)', path: '/academics/senior' },
          { name: 'Faculty & Leadership', path: '/faculty' },
        ],
      },
      {
        category: 'Admissions & Portal',
        links: [
          { name: 'Admissions Overview', path: '/admissions' },
          { name: 'Five Steps to Admission', path: '/admissions#process' },
          { name: 'Eligibility & Class Vacancies', path: '/admissions#eligibility' },
          { name: 'Fee Structure 2026–27', path: '/admissions#fees' },
          { name: 'Online Application Form', path: '/admissions/apply' },
          { name: 'Frequently Asked Questions (FAQ)', path: '/faq' },
        ],
      },
      {
        category: 'Campus Life & Media',
        links: [
          { name: 'Campus Life Overview', path: '/campus-life' },
          { name: 'Sports & Athletics', path: '/campus-life' },
          { name: 'Photo Gallery', path: '/gallery' },
          { name: 'Latest News & Stories', path: '/news' },
          { name: 'Upcoming Events Calendar', path: '/events' },
        ],
      },
    ],
  },
}

export default function Legal() {
  const { tab } = useParams()
  const location = useLocation()
  let currentKey = tab && LEGAL_DATA[tab] ? tab : 'privacy'
  if (location.pathname.includes('sitemap')) {
    currentKey = 'sitemap'
  }
  const data = LEGAL_DATA[currentKey]

  useDocumentMeta({
    title: `${data.title} — Greenwood Academy`,
    description: data.subtitle,
  })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentKey])

  const tabsNav = [
    { key: 'privacy', label: 'Privacy Policy', path: '/legal/privacy' },
    { key: 'terms', label: 'Terms of Service', path: '/legal/terms' },
    { key: 'sitemap', label: 'Website Sitemap', path: '/legal/sitemap' },
  ]

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
            {data.badge}
          </div>
          <h1 className="mt-2 text-[clamp(2.2rem,4vw,3.5rem)] font-serif font-normal text-white leading-tight max-w-3xl">
            {data.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/85 leading-relaxed font-normal">
            {data.subtitle}
          </p>
        </div>
      </section>

      {/* Main Dynamic Content Section */}
      <section className="py-12 md:py-16">
        <div className="container-wide text-left max-w-3xl">
          <div className="text-xs text-gray-400 font-semibold mb-6 uppercase tracking-wider">
            {data.lastUpdated}
          </div>

          {currentKey === 'sitemap' ? (
            /* Simple, Minimal & Attractive Sitemap View */
            <div className="grid gap-6 sm:grid-cols-2">
              {data.sitemapTree.map((cat, idx) => (
                <div key={idx} className="bg-white p-6 border border-gray-200 text-left rounded-none shadow-xs">
                  <h3 className="text-base font-bold font-serif text-[var(--navy-deep)] mb-4 pb-2.5 border-b border-gray-200">
                    {cat.category}
                  </h3>
                  <ul className="space-y-2.5">
                    {cat.links.map((link, lIdx) => (
                      <li key={lIdx}>
                        <Link
                          to={link.path}
                          className="inline-flex items-center gap-2 text-xs md:text-sm text-gray-700 hover:text-[var(--navy-deep)] font-medium transition-colors"
                        >
                          <span className="text-gray-400 font-bold text-xs">—</span>
                          <span>{link.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            /* Privacy / Terms Accordion Sections */
            <div className="space-y-5">
              {data.sections.map((sec, idx) => (
                <SectionReveal key={idx}>
                  <div className="bg-white p-5 md:p-6 border border-gray-200 shadow-sm rounded-none text-left">
                    <h2 className="text-lg font-bold font-serif text-[var(--navy-deep)] mb-2">
                      {sec.heading}
                    </h2>
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-normal">
                      {sec.content}
                    </p>
                  </div>
                </SectionReveal>
              ))}
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
