import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import useDocumentMeta from '../utils/useDocumentMeta'
import SectionReveal from '../components/common/SectionReveal'
import { CheckCircle2, Quote, ArrowRight, Shield, Trophy, Microscope, Heart, Sprout, Users } from 'lucide-react'

import aboutCampusImg from '../assets/images/about-campus.avif'
import principalImg from '../assets/images/principal.avif'
import subCampusImg from '../assets/images/photo-1561089489-f13d5e730d72.avif'
import heroSchoolImg from '../assets/images/hero_school.jpg'
import creativeToolsSvg from '../assets/bg-images/SchoolArtWork.png'

const ABOUT_DATA = {
  story: {
    badge: 'Our History & Heritage',
    title: 'A Legacy of Educational Excellence Since 1998',
    subtitle: 'From a modest beginning with 50 students to Lucknow’s leading benchmark for holistic schooling.',
    image: aboutCampusImg,
    secondaryImage: heroSchoolImg,
    content: [
      'Greenwood Academy was founded in 1998 with a steadfast commitment to creating an educational environment where academic rigour meets character, compassion, and innovation.',
      'Over the past 25+ years, we have expanded our campus, developed state-of-the-art STEM and sports facilities, and nurtured thousands of students who have gone on to excel at top universities in India and around the world.',
      'Our approach combines time-tested traditional values with forward-looking academic methodologies, ensuring every child receives individual attention, guidance, and opportunity to shine.',
    ],
    milestones: [
      { year: '1998', title: 'Foundation', desc: 'Established with Nursery to Class 5 and 50 pioneering students.' },
      { year: '2005', title: 'CBSE Affiliation', desc: 'Granted full CBSE Senior Secondary accreditation.' },
      { year: '2015', title: 'STEM & Robotics Lab', desc: 'Launched a 3,200 sq ft dedicated innovation lab.' },
      { year: '2023', title: 'Silver Jubilee', desc: 'Celebrated 25 years of empowering future-ready leaders.' },
    ],
    stats: [
      { number: '25+', label: 'Years of Excellence' },
      { number: '850+', label: 'Enrolled Students' },
      { number: '100%', label: 'Board Exam Pass Rate' },
      { number: '1:12', label: 'Teacher-Student Ratio' },
    ],
  },
  principal: {
    badge: "Principal's Desk",
    title: 'Leadership Guided by Compassion, Vision & Rigour',
    subtitle: 'A personal message from Dr. Ananya Sharma on our educational philosophy.',
    image: principalImg,
    name: 'Dr. Ananya Sharma',
    designation: 'Principal & Director, Greenwood Academy',
    qualifications: 'Ph.D. in Educational Leadership, M.Sc., B.Ed.',
    content: [
      'Dear Parents and Students, Welcome to Greenwood Academy.',
      'Education is not merely about achieving academic grades; it is about lighting a fire of curiosity, building resilient character, and encouraging young minds to think independently and act empathetically.',
      'At Greenwood, we foster an inclusive environment where every student is seen, heard, and encouraged to explore their unique talents. Whether in science labs, sports fields, debate halls, or art studios, our dedicated faculty ensures personalized mentoring at every step.',
      'As we prepare our children for a rapidly evolving world, our commitment remains anchored in academic rigor, ethical values, and holistic development. I invite you to join our vibrant community and embark on a rewarding educational journey with us.',
    ],
    highlights: [
      'Focus on Inquiry-Based and Practical Learning',
      'Emphasis on Mental Well-being and Emotional Intelligence',
      'Strong Parent-Teacher Partnership and Open Communication',
      'Global Perspectives Integrated into National Curriculum',
    ],
  },
  vision: {
    badge: 'Vision & Core Values',
    title: 'The Principles That Shape Every Classroom & Campus Life',
    subtitle: 'Nurturing future leaders grounded in integrity, empathy, and academic mastery.',
    image: subCampusImg,
    visionText:
      'To be a premier institution of learning that empowers students to achieve academic distinction, cultivate strong ethical values, and become active, responsible global citizens.',
    missionText:
      'To provide a safe, inclusive, and stimulating learning environment through a progressive curriculum, dedicated educators, modern infrastructure, and vibrant co-curricular programs.',
    values: [
      {
        title: 'Integrity',
        desc: 'Upholding honesty, ethical responsibility, and moral courage in all actions.',
        icon: Shield,
      },
      {
        title: 'Excellence',
        desc: 'Striving for continuous improvement and the highest standards in academics and life.',
        icon: Trophy,
      },
      {
        title: 'Curiosity',
        desc: 'Encouraging questioning, exploration, and lifelong passion for learning.',
        icon: Microscope,
      },
      {
        title: 'Empathy',
        desc: 'Fostering kindness, respect for diversity, and deep social awareness.',
        icon: Heart,
      },
      {
        title: 'Resilience',
        desc: 'Building perseverance, adaptability, and confidence to face challenges.',
        icon: Sprout,
      },
      {
        title: 'Community',
        desc: 'Cultivating collaboration, teamwork, and active civic contribution.',
        icon: Users,
      },
    ],
  },
}

export default function About() {
  const { tab } = useParams()
  const activeTab = tab && ABOUT_DATA[tab] ? tab : 'story'
  const data = ABOUT_DATA[activeTab]

  useDocumentMeta({
    title: `About Us — ${data.badge}`,
    description: 'Learn about Greenwood Academy — our story, principal message, and core vision.',
  })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeTab])

  const tabs = [
    { key: 'story', label: 'Our Story', path: '/about/story' },
    { key: 'principal', label: "Principal's Message", path: '/about/principal' },
    { key: 'vision', label: 'Vision & Values', path: '/about/vision' },
  ]

  return (
    <div className="bg-white min-h-screen">
      {/* Top Banner Header */}
      <section className="relative bg-[var(--navy-deep)] text-white py-14 md:py-18 border-b border-white/10 overflow-hidden">
        {/* School Art Work background illustration overlay on right side */}
        <div
          className="absolute top-1/2 right-0 md:right-6 -translate-y-1/2 w-[75%] md:w-[55%] h-[130%] pointer-events-none opacity-25 bg-right bg-no-repeat bg-contain mix-blend-screen"
          style={{ backgroundImage: `url(${creativeToolsSvg})` }}
        />

        <div className="container-wide relative z-10 text-left">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--gold)]">
            About Greenwood Academy
          </div>
          <h1 className="mt-3 text-[clamp(1.75rem,3.2vw,2.75rem)] font-serif font-normal leading-tight text-white max-w-3xl">
            {data.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/80 leading-relaxed">
            {data.subtitle}
          </p>
        </div>
      </section>

      {/* Dynamic Content Area */}
      <div className="py-16">
        {activeTab === 'story' && (
          <SectionReveal>
            <div className="container-wide">
              <div className="grid gap-12 lg:grid-cols-2 items-center">
                <div>
                  <div className="section-label">{data.badge}</div>
                  <h2 className="mt-3 text-3xl md:text-4xl font-serif text-[var(--navy-deep)] leading-snug">
                    Building Brighter Futures For Over 25 Years
                  </h2>
                  <div className="mt-6 space-y-4 text-gray-700 leading-relaxed text-[15px]">
                    {data.content.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <img
                    src={data.image}
                    alt="Greenwood Campus"
                    className="w-full h-[400px] object-cover shadow-lg border border-[var(--border)]"
                  />
                  <div className="absolute -bottom-6 -left-6 hidden sm:block bg-[var(--navy-deep)] text-white p-6 border border-white/20 max-w-xs shadow-xl">
                    <div className="text-3xl font-bold text-[var(--gold)] font-serif">1998</div>
                    <div className="text-xs text-white/80 font-semibold mt-1">
                      Year Established in Lucknow, Uttar Pradesh
                    </div>
                  </div>
                </div>
              </div>

              {/* Executive Vertical Historical Milestones Timeline */}
              <div className="mt-24 pt-16 border-t border-gray-200">
                <div className="max-w-xl mb-12">
                  <div className="section-label">Legacy & Growth</div>
                  <h3 className="mt-2 text-3xl md:text-4xl font-serif text-[var(--navy-deep)]">
                    Key Historical Milestones
                  </h3>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                    Over 25 years of expanding educational horizons, building world-class infrastructure, and shaping future leaders.
                  </p>
                </div>

                <div className="relative pl-6 md:pl-10 border-l-2 border-[var(--navy-deep)]/20 space-y-10 max-w-4xl">
                  {data.milestones.map((m, idx) => (
                    <div key={m.year} className="relative group">
                      {/* Node Marker on Line */}
                      <div className="absolute -left-[31px] md:-left-[47px] top-2 flex h-7 w-7 items-center justify-center rounded-none bg-[var(--navy-deep)] border-2 border-[var(--gold)] text-white text-[11px] font-bold shadow-md transition-transform group-hover:scale-110">
                        0{idx + 1}
                      </div>

                      {/* Content Card */}
                      <div className="bg-white p-6 md:p-8 border border-gray-200 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:border-[var(--gold)]">
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                          <span className="text-2xl md:text-3xl font-bold font-serif text-[var(--gold)] tracking-tight">
                            {m.year}
                          </span>
                          <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--navy-deep)] bg-[var(--sand)] px-3 py-1 border border-[var(--border)]">
                            {m.title}
                          </span>
                        </div>

                        <p className="text-sm md:text-[15px] text-gray-700 leading-relaxed mt-3 font-normal">
                          {m.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionReveal>
        )}

        {activeTab === 'principal' && (
          <SectionReveal>
            <div className="container-wide">
              <div className="grid gap-12 lg:grid-cols-[0.4fr_0.6fr] items-start">
                {/* Principal Profile Card */}
                <div className="bg-[var(--sand)] p-6 border border-[var(--border)] text-center sticky top-24">
                  <img
                    src={data.image}
                    alt={data.name}
                    className="w-48 h-56 object-cover mx-auto border-2 border-white shadow-md mb-4"
                  />
                  <h3 className="text-xl font-bold text-[var(--navy-deep)] font-serif">{data.name}</h3>
                  <div className="text-sm font-semibold text-[var(--gold)] mt-1">{data.designation}</div>
                  <div className="text-xs text-gray-600 mt-2 font-medium">{data.qualifications}</div>

                  <div className="mt-6 pt-6 border-t border-gray-200 text-left space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-[var(--navy-deep)]">
                      Key Mentorship Principles
                    </div>
                    {data.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-gray-700">
                        <CheckCircle2 size={15} className="text-[var(--gold)] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Message Body */}
                <div className="bg-white p-8 border border-[var(--border)] shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <Quote size={40} className="text-[var(--gold)] opacity-70" />
                    <div>
                      <div className="section-label">{data.badge}</div>
                      <h2 className="text-2xl md:text-3xl font-serif text-[var(--navy-deep)]">
                        Nurturing Curiosity & Character
                      </h2>
                    </div>
                  </div>

                  <div className="space-y-5 text-gray-700 leading-relaxed text-[16px]">
                    {data.content.map((p, idx) => (
                      <p key={idx} className={idx === 0 ? 'font-semibold text-lg text-[var(--navy-deep)]' : ''}>
                        {p}
                      </p>
                    ))}
                  </div>

                  <div className="mt-10 pt-6 border-t border-gray-200 flex items-center justify-between">
                    <div>
                      <div className="font-serif font-bold text-lg text-[var(--navy-deep)]">{data.name}</div>
                      <div className="text-xs text-gray-500 font-semibold">{data.designation}</div>
                    </div>
                    <Link
                      to="/admissions/apply"
                      className="inline-flex items-center gap-2 bg-[var(--navy-deep)] !text-white px-5 py-2.5 rounded-none font-bold text-xs hover:bg-[var(--gold)] transition-colors"
                    >
                      <span className="!text-white text-white">Join Greenwood</span>
                      <ArrowRight size={14} className="!text-white text-white" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>
        )}

        {activeTab === 'vision' && (
          <SectionReveal>
            <div className="container-wide">
              {/* Vision & Mission Cards */}
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="bg-[var(--navy-deep)] text-white p-8 border-t-4 border-[var(--gold)] shadow-md">
                  <div className="text-xs font-bold uppercase tracking-widest text-[var(--gold)]">
                    Our Vision
                  </div>
                  <h3 className="mt-3 text-2xl font-serif text-white">Empowering Future Leaders</h3>
                  <p className="mt-4 text-white/85 text-[15px] leading-relaxed">
                    {data.visionText}
                  </p>
                </div>

                <div className="bg-[var(--sand)] text-[var(--navy-deep)] p-8 border-t-4 border-[var(--navy-deep)] border-x border-b border-[var(--border)] shadow-md">
                  <div className="text-xs font-bold uppercase tracking-widest text-[var(--gold)]">
                    Our Mission
                  </div>
                  <h3 className="mt-3 text-2xl font-serif text-[var(--navy-deep)]">Holistic Excellence</h3>
                  <p className="mt-4 text-gray-700 text-[15px] leading-relaxed">
                    {data.missionText}
                  </p>
                </div>
              </div>

              {/* Core Values Grid */}
              <div>
                <div className="text-left max-w-xl mb-10">
                  <div className="section-label">Foundational Pillars</div>
                  <h3 className="mt-2 text-2xl md:text-3xl font-serif text-[var(--navy-deep)]">
                    Our 6 Core Values
                  </h3>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {data.values.map((v, idx) => {
                    const IconComp = v.icon
                    return (
                      <div
                        key={v.title}
                        className="relative bg-white p-6 md:p-7 border border-gray-200 shadow-sm rounded-none"
                      >
                        {/* Watermark Number */}
                        <span className="absolute top-4 right-4 text-4xl font-serif font-bold text-gray-200/60 select-none pointer-events-none">
                          0{idx + 1}
                        </span>

                        {/* Icon */}
                        <div className="mb-3.5 text-[#ea580c]">
                          <IconComp size={26} strokeWidth={2} />
                        </div>

                        {/* Title & Description */}
                        <h4 className="text-lg md:text-xl font-bold text-[var(--navy-deep)] font-serif">
                          {v.title}
                        </h4>
                        <p className="mt-2 text-xs md:text-sm text-gray-600 leading-relaxed font-normal">
                          {v.desc}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </SectionReveal>
        )}
      </div>

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
