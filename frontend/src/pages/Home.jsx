import React from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  GraduationCap,
  MapPin,
  Quote,
  Sparkles,
  Star,
  Users,
  Layers,
  Heart,
  Shield,
  Award,
  Globe,
  Microscope,
  Trophy,
  Palette
} from 'lucide-react'
import Testimonials from '../components/home/Testimonials'
import WhyChooseUs from '../components/home/WhyChooseUs'
import HallOfFameSection from '../components/home/HallOfFameSection'
import LatestNewsSection from '../components/home/LatestNewsSection'
import UpcomingEventsSection from '../components/home/UpcomingEventsSection'
import FaqSection from '../components/home/FaqSection'
import SectionReveal from '../components/common/SectionReveal'
import useDocumentMeta from '../utils/useDocumentMeta'
import news from '../data/news'
import events from '../data/events'

// Import generated premium assets
import heroSchoolImg from '../assets/images/hero_school.jpg'
import aboutCampusImg from '../assets/images/about-campus.avif'
import subCampusImg from '../assets/images/photo-1561089489-f13d5e730d72.avif'
import principalImg from '../assets/images/principal.avif'
import graduationBgImg from '../assets/images/graduation_bg.jpg'
import classNurseryImg from '../assets/images/classnursery.jpg'
import class4Img from '../assets/images/class4.jpg'
import class7Img from '../assets/images/class7.jpg'
import class12Img from '../assets/images/class12.jpg'
import signatureImg from '../assets/bg-images/signature.png'

function Hero() {
  return (
    <section className="relative bg-[var(--sand)] text-[var(--navy-deep)] overflow-hidden py-16 md:py-24">
      {/* Background graduation illustration */}
      <div
        className="absolute top-[10%] md:top-[15%] right-[8%] md:right-[14%] w-[65%] h-[85%] pointer-events-none opacity-20 bg-center bg-no-repeat bg-contain mix-blend-multiply -rotate-6 scale-125 translate-y-6 origin-center"
        style={{ backgroundImage: `url(${graduationBgImg})` }}
      />

      <div className="container-wide relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="max-w-2xl">
            <div className="text-[12px] font-bold uppercase tracking-[0.25em] text-[var(--navy)]">
              Excellence · Character · Future
            </div>
            <h1 className="mt-5 text-[clamp(2.8rem,5vw,4.2rem)] font-semibold leading-[1.1] tracking-tight text-[var(--navy-deep)]">
              Where Every Student
              <br />
              Is Prepared to Thrive.
            </h1>
            <p className="mt-5 text-[15px] md:text-[17px] leading-relaxed text-[var(--navy-deep)]/80 max-w-xl">
              Greenwood Academy has shaped exceptional young people for over 25 years — through rigorous academics,
              meaningful co-curricular experiences and a culture that values character as highly as achievement.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <Link to="/about" className="inline-flex items-center gap-2 bg-[var(--navy-deep)] !text-white px-6 py-3.5 rounded-none font-bold text-[14px] shadow-sm">
                <span className="!text-white text-white">Explore Our School</span> <ArrowRight size={16} className="!text-white text-white" />
              </Link>
              <Link to="/admissions" className="inline-flex items-center justify-center border border-[var(--navy)]/30 text-[var(--navy-deep)] px-6 py-3.5 rounded-[3px] font-bold text-[14px] hover:bg-[var(--navy)]/5 transition-colors">
                Admissions 2026–27
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-2 text-xs font-semibold text-[var(--navy-deep)]/60">
              <span>🎓</span>
              <span>CBSE Affiliated · Est. 1998 · Lucknow</span>
            </div>
          </div>

          <div className="lg:justify-self-end w-full max-w-[480px]">
            <div className="relative">
              {/* Outer gold border/block background offset */}
              <div className="absolute inset-0 bg-[var(--gold)] translate-x-3 translate-y-3 rounded-lg" />
              <div className="relative overflow-hidden rounded-lg shadow-2xl border border-[var(--border)] bg-white">
                <img
                  src={heroSchoolImg}
                  alt="Greenwood Academy School Building"
                  className="w-full h-auto object-cover"
                  loading="eager"
                  fetchpriority="high"
                  decoding="sync"
                />
              </div>
              {/* Overlapping gold banner card at the bottom-left */}
              <div className="absolute bottom-6 left-[-15px] bg-[var(--navy)] p-5 text-white shadow-xl max-w-[170px] z-20">
                <div className="text-3xl font-extrabold leading-none">25+</div>
                <div className="text-[10px] uppercase tracking-wider font-extrabold mt-1 text-white/95">
                  Years of Excellence
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TrustStrip() {
  const items = [
    { label: '25+ Years of Excellence', icon: '🏅' },
    { label: 'Modern Learning Spaces', icon: '🏫' },
    { label: 'Experienced Faculty', icon: '👥' },
    { label: 'Holistic Development', icon: '🌐' },
  ]

  const marqueeList = [...items, ...items, ...items, ...items]

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#071b32] via-[#0c4a6e] to-[#071b32] text-white border-y border-[var(--gold)]/30 py-3.5 shadow-inner">
      {/* Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #d97706 1.2px, transparent 0)`,
          backgroundSize: '20px 20px',
        }}
      />
      {/* Subtle top/bottom glowing borders */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-70" />
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-70" />

      {/* Marquee Track */}
      <div className="relative z-10 flex overflow-hidden select-none">
        <div className="animate-marquee flex items-center gap-6 whitespace-nowrap">
          {marqueeList.map(({ label, icon }, idx) => (
            <div
              key={`${label}-${idx}`}
              className="flex items-center gap-2.5 rounded-full bg-white/10 border border-white/15 px-5 py-1.5 backdrop-blur-sm transition-colors hover:bg-[var(--gold)]/20 hover:border-[var(--gold)]/50"
            >
              <span className="text-lg shrink-0">{icon}</span>
              <span className="text-xs md:text-sm font-semibold tracking-wide text-white">{label}</span>
              <span className="text-[var(--gold)] text-xs ml-2">✦</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AboutPreview() {
  const stages = [
    {
      title: 'Early Years',
      description: 'Foundation-focused learning that builds confidence, curiosity, and social development.',
    },
    {
      title: 'Primary School',
      description: 'Strong academic foundations with reading, numeracy, inquiry, and creative expression.',
    },
    {
      title: 'Middle School',
      description: 'A balanced stage that deepens skills, independence, and personal responsibility.',
    },
    {
      title: 'Senior School',
      description: 'Advanced learning, leadership, and future preparation through rigorous academics.',
    },
  ]

  return (
    <section className="section-shell bg-white">
      <div className="container-wide grid gap-12 lg:grid-cols-[0.52fr_0.48fr] items-center">
        <div className="relative">
          <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100">
            <img
              src={aboutCampusImg}
              alt="Greenwood Academy Campus Courtyard"
              className="w-full h-[400px] object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden sm:block w-[180px] h-[130px] sm:w-[210px] sm:h-[150px] rounded-2xl overflow-hidden bg-white p-1 shadow-2xl border border-white/90">
            <img
              src={subCampusImg}
              alt="Greenwood Campus View"
              className="w-full h-full object-cover rounded-xl"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div>
          <div className="section-label">About Our School</div>
          <h2 className="mt-3 text-[clamp(2.2rem,3.5vw,3.2rem)] text-[var(--navy-deep)] leading-tight">
            Education That Builds More Than Academic Success.
          </h2>
          <p className="mt-6 text-[16px] leading-relaxed text-[var(--navy-deep)]/80">
            We focus on rigorous academics balanced with creativity, critical thinking, and character development. Our small class sizes and experienced educators help each student flourish.
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-[var(--navy-deep)]/80">
            From early years to senior school, our curriculum encourages leadership, community engagement, and global awareness.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-6 border-t border-[var(--border)] pt-8">
            <div>
              <div className="text-3xl font-extrabold text-[var(--navy-deep)]">25+</div>
              <div className="text-xs uppercase tracking-wider text-[var(--muted)] font-bold mt-1">Years</div>
            </div>
            <div className="border-l border-[var(--border)] pl-6">
              <div className="text-3xl font-extrabold text-[var(--navy-deep)]">850+</div>
              <div className="text-xs uppercase tracking-wider text-[var(--muted)] font-bold mt-1">Students</div>
            </div>
            <div className="border-l border-[var(--border)] pl-6">
              <div className="text-3xl font-extrabold text-[var(--navy-deep)]">1:12</div>
              <div className="text-xs uppercase tracking-wider text-[var(--muted)] font-bold mt-1">Ratio</div>
            </div>
          </div>

          <div className="mt-8">
            <Link to="/about" className="inline-flex items-center gap-2 font-bold text-[var(--gold)] hover:text-[var(--navy-deep)] transition-colors text-sm">
              Discover Our Story <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function PrincipalPreview() {
  return (
    <section className="relative py-10 md:py-14 bg-[var(--sand)] overflow-hidden">
      {/* Background signature image watermark */}
      <div
        className="absolute -bottom-10 md:-bottom-16 right-0 w-[60%] md:w-[50%] h-[80%] pointer-events-none opacity-30 bg-right-bottom bg-no-repeat bg-contain"
        style={{ backgroundImage: `url(${signatureImg})` }}
      />

      <div className="container-wide relative z-10">
        <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr] items-center">
          <div className="w-full max-w-[310px] mx-auto lg:mx-0">
            <div className="relative mb-6 lg:mb-0">
              {/* Subtle ambient warm glow */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-[var(--gold)]/30 via-transparent to-[var(--navy-deep)]/20 blur-lg opacity-70 pointer-events-none" />

              <div className="relative rounded-2xl shadow-xl border-2 border-white/90 bg-white">
                <div className="overflow-hidden rounded-[14px]">
                  <img
                    src={principalImg}
                    alt="Dr. Ananya Sharma, Principal & Director"
                    className="w-full aspect-[4/5] object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                {/* Floating card */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-[88%] bg-[var(--navy-deep)] p-3 text-white rounded-none shadow-2xl border border-white/20 text-center">
                  <div className="font-bold text-sm text-white tracking-tight">Dr. Ananya Sharma</div>
                  <div className="text-[11px] text-[var(--gold)] font-semibold mt-0.5">Principal & Director</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="section-label">Leadership</div>
            <h2 className="mt-2 text-[clamp(2rem,3.2vw,2.8rem)] text-[var(--navy-deep)]">A Message from Our Principal</h2>
            <div className="mt-5 flex items-start gap-3.5">
              <Quote size={22} className="mt-1 text-[var(--gold)] shrink-0" />
              <div>
                <blockquote className="text-lg md:text-xl font-semibold italic text-[var(--navy-deep)]/90 leading-snug">
                  "Education is not the filling of a pail, but the lighting of a fire."
                </blockquote>
                <p className="mt-4 leading-relaxed text-[var(--navy-deep)]/80 text-[15px]">
                  Welcome to Greenwood School. We take pride in fostering a balanced education that values character as
                  much as academic achievement. Our staff are dedicated to guiding students to become thoughtful,
                  responsible, and curious citizens.
                </p>
                <p className="mt-3 leading-relaxed text-[var(--navy-deep)]/80 text-[15px]">
                  Our aim is simple: create a calm, ambitious, and inclusive environment where young people can grow
                  with confidence.
                </p>
                <div className="mt-8 pt-6 border-t border-[var(--border)]">
                  <div className="font-bold text-[var(--navy-deep)] text-lg">Dr. Ananya Sharma</div>
                  <div className="text-sm text-[var(--muted)] font-medium">Principal & Director, Greenwood Academy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function AcademicsSection() {
  const stages = [
    {
      classRange: 'Nursery – Class 2',
      title: 'Early Years',
      description:
        'Our Early Years programme nurtures the natural curiosity of young learners through play-based learning, sensory exploration and foundational literacy. We create a warm, secure environment where every child discovers the joy of learning.',
      to: '/academics/early-years',
      image: classNurseryImg,
    },
    {
      classRange: 'Class 3 – Class 5',
      title: 'Primary School',
      description:
        'Primary School builds strong academic foundations across core disciplines while encouraging independent thinking and collaborative learning. Our structured yet engaging curriculum prepares students for the challenges of middle school.',
      to: '/academics/primary',
      image: class4Img,
    },
    {
      classRange: 'Class 6 – Class 8',
      title: 'Middle School',
      description:
        'Middle School is where academic depth meets exploration. Students develop critical thinking, research skills and subject-specific understanding while beginning to discover their passions through our broad co-curricular offering.',
      to: '/academics/middle',
      image: class7Img,
    },
    {
      classRange: 'Class 9 – Class 12',
      title: 'Senior School',
      description:
        'Senior School offers rigorous academic preparation with a focus on university readiness. Students choose from Science, Commerce, or Humanities streams and receive personalised guidance for higher education and career planning.',
      to: '/academics/senior',
      image: class12Img,
    },
  ]

  return (
    <section className="section-shell bg-white">
      <div className="container-wide">
        <div className="text-center max-w-2xl mx-auto">
          <div className="section-label">Academics</div>
          <h2 className="mt-3 text-[clamp(2.2rem,3.5vw,3.2rem)] text-[var(--navy-deep)]">
            A Curriculum for Every Stage of Growth
          </h2>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stages.map((stage) => (
            <article
              key={stage.title}
              className="group flex flex-col justify-between overflow-hidden rounded-xl border border-[var(--border)] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[var(--gold)]/60 hover:shadow-lg"
            >
              <div>
                {/* Top Image Container */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  {stage.image ? (
                    <img
                      src={stage.image}
                      alt={stage.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-100 text-[11px] font-semibold text-gray-400">
                      [ Image Space ]
                    </div>
                  )}
                </div>

                {/* Details Below with Orange Subheading */}
                <div className="p-4.5">
                  <div className="text-[12px] font-bold uppercase tracking-wider text-[var(--gold)] mb-1">
                    {stage.classRange}
                  </div>
                  <h3 className="text-base font-bold text-[var(--navy-deep)] tracking-tight">{stage.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-[var(--navy-deep)]/75">
                    {stage.description}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-4.5 pb-4.5 pt-0">
                <div className="pt-3 border-t border-gray-100">
                  <Link
                    to={stage.to}
                    className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[var(--navy-deep)] transition-colors hover:text-[var(--gold)]"
                  >
                    Learn more <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function NewsEvents() {
  const featured = news[0]
  const secondary = news.slice(1, 3)
  const upcoming = events.slice(0, 3)

  return (
    <section className="section-shell bg-white">
      <div className="container-wide grid gap-12 lg:grid-cols-[0.62fr_0.38fr]">
        <div>
          <div className="section-label">Latest News</div>
          <h2 className="mt-3 text-[clamp(2rem,3vw,2.8rem)] text-[var(--navy-deep)]">Stories from Greenwood</h2>

          <article className="mt-8 overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="grid md:grid-cols-[1.1fr_0.9fr]">
              <div className="min-h-[220px] bg-[linear-gradient(135deg,#9db7cf,#efe5d6)]" />
              <div className="p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--gold)]">{featured?.category}</div>
                  <h3 className="mt-3 text-2xl font-bold text-[var(--navy-deep)] leading-tight">{featured?.title}</h3>
                  <p className="mt-4 text-[14px] leading-relaxed text-[var(--navy-deep)]/75">{featured?.excerpt}</p>
                </div>
                <div className="mt-6 pt-6 border-t border-[var(--border)] flex items-center justify-between gap-4">
                  <div className="text-xs text-[var(--muted)] font-semibold">{featured?.date}</div>
                  <Link to={`/news/${featured?.slug}`} className="inline-flex items-center gap-1.5 font-bold text-[var(--gold)] hover:text-[var(--navy-deep)] transition-colors text-sm">
                    Read more <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </article>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {secondary.map((item) => (
              <article key={item.slug} className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--gold)]">{item.category}</div>
                  <h3 className="mt-3 text-lg font-bold text-[var(--navy-deep)] leading-snug">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--navy-deep)]/75">{item.excerpt}</p>
                </div>
                <div className="mt-5 pt-4 border-t border-[var(--border)] text-xs text-[var(--muted)] font-semibold">{item.date}</div>
              </article>
            ))}
          </div>
        </div>

        <div>
          <div className="section-label">Upcoming Events</div>
          <h2 className="mt-3 text-[clamp(2rem,3vw,2.8rem)] text-[var(--navy-deep)]">Important Dates</h2>
          <div className="mt-8 grid gap-4">
            {upcoming.map((item) => (
              <article key={item.slug} className="flex items-center gap-5 rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-[var(--navy-deep)] text-white shadow-sm">
                  <div className="text-xl font-bold leading-none">{item.dateShort}</div>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-[var(--gold)] font-bold mt-1">{item.month}</div>
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--gold)]">{item.category}</div>
                  <div className="mt-1 text-[16px] font-bold text-[var(--navy-deep)]">{item.title}</div>
                  <div className="mt-1.5 text-xs text-[var(--muted)] flex items-center gap-2">
                    <CalendarDays size={13} />
                    {item.location}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function AdmissionsBanner() {
  const highlights = [
    { title: '5 Academic Stages', desc: 'Nursery through Class 12', icon: GraduationCap },
    { title: 'STEM Innovation', desc: '3,200 sq ft dedicated lab', icon: Microscope },
    { title: '100% Board Pass Rate', desc: 'Class of 2026', icon: Trophy },
    { title: '20+ Activity Clubs', desc: 'Robotics, MUN, Arts & more', icon: Palette },
  ]

  return (
    <section className="section-shell bg-[var(--navy-deep)] text-white border-t border-white/10">
      <div className="container-wide">
        <div className="grid gap-12 lg:grid-cols-[0.48fr_0.52fr] items-center">
          <div>
            <div className="section-label text-[var(--gold)]">Admissions Open</div>
            <h2 className="mt-3 text-[clamp(2.2rem,3.4vw,3.4rem)] text-white font-serif leading-tight">
              Join Us for 2026–27
            </h2>
            <p className="mt-5 text-[15px] md:text-[16px] leading-relaxed text-white/80">
              Applications are now open for Nursery through Class 9 and Class 11. We invite you to visit the campus, meet our faculty and begin your child's Greenwood journey.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/admissions/apply"
                className="inline-flex items-center justify-center bg-[var(--gold)] text-white px-7 py-3.5 rounded-none font-bold text-[14px] hover:bg-amber-600 transition-all shadow-md"
              >
                Start Application
              </Link>
              <Link
                to="/admissions"
                className="inline-flex items-center justify-center border border-white/40 text-white px-7 py-3.5 rounded-none font-bold text-[14px] hover:bg-white/10 transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {highlights.map((item) => {
              const IconComp = item.icon
              return (
                <div
                  key={item.title}
                  className="group rounded-none border border-white/15 bg-white/8 backdrop-blur-sm p-6 transition-all duration-300 hover:bg-white/15 hover:border-[var(--gold)]/50"
                >
                  <IconComp size={28} className="text-[var(--gold)] mb-3" />
                  <div className="text-lg font-bold text-white tracking-tight">{item.title}</div>
                  <div className="mt-1.5 text-xs text-white/70 font-semibold">{item.desc}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  useDocumentMeta({ title: 'Home', description: 'Greenwood School — academic excellence, character, and leadership.' })

  return (
    <div>
      <SectionReveal>
        <Hero />
      </SectionReveal>
      <TrustStrip />
      <SectionReveal>
        <AboutPreview />
      </SectionReveal>
      <SectionReveal>
        <PrincipalPreview />
      </SectionReveal>
      <WhyChooseUs />
      <SectionReveal>
        <HallOfFameSection />
      </SectionReveal>
      <SectionReveal>
        <AcademicsSection />
      </SectionReveal>
      <SectionReveal>
        <Testimonials />
      </SectionReveal>
      <SectionReveal>
        <AdmissionsBanner />
      </SectionReveal>
      <SectionReveal>
        <LatestNewsSection />
      </SectionReveal>
      <SectionReveal>
        <UpcomingEventsSection />
      </SectionReveal>
      <SectionReveal>
        <FaqSection />
      </SectionReveal>
    </div>
  )
}
