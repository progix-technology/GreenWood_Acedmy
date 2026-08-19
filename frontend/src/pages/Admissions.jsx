import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Clock,
  ShieldCheck,
  UserCheck,
  Award,
  FileText,
  Sparkles,
  Trophy,
  Compass,
  GraduationCap,
  Calendar,
  Layers,
  ChevronRight,
} from 'lucide-react'
import useDocumentMeta from '../utils/useDocumentMeta'
import creativeToolsSvg from '../assets/bg-images/SchoolArtWork.png'

// Local Admissions Tab Banner Images from assets
import feeStructureImg from '../assets/images/Admissions/fee_structure.jpg'
import attendanceImg from '../assets/images/Admissions/Attendance.jpg'
import coCurriculumImg from '../assets/images/Admissions/co_curriculum.jpg'
import curriculumImg from '../assets/images/Admissions/Curriculum.jpg'
import scholarshipImg from '../assets/images/Admissions/SCHOLARSHIP.jpg'
import counsellingImg from '../assets/images/Admissions/counselling.jpg'
import examinationImg from '../assets/images/Admissions/examination.jpg'

export default function Admissions() {
  const location = useLocation()

  useDocumentMeta({
    title: 'Admissions 2026–27 — Greenwood Academy',
    description: 'Explore Greenwood Academy Admissions. Dynamic view for Admission Process, Fee Structure, Minimum Attendance, School Uniform, Examinations, Co-Curricular, Curriculum, Counselling, and Scholarships.',
  })

  // List of dynamic tabs matching dropdown menu exactly
  const tabs = [
    { id: 'process', label: '1. ADMISSION PROCESS' },
    { id: 'fees', label: '2. FEE STRUCTURE' },
    { id: 'attendance', label: '3. MINIMUM ATTENDANCE' },
    { id: 'uniform', label: '4. SCHOOL UNIFORM' },
    { id: 'examinations', label: '5. EXAMINATIONS' },
    { id: 'cocurricular', label: '6. CO-CURRICULAR ACTIVITIES' },
    { id: 'curriculum', label: '7. CURRICULUM' },
    { id: 'counselling', label: '8. COUNSELLING' },
    { id: 'scholarship', label: '9. SCHOLARSHIP' },
  ]

  const [activeTab, setActiveTab] = useState('process')

  // Sync tab state with URL hash
  useEffect(() => {
    if (location.hash) {
      const hashId = location.hash.replace('#', '')
      const match = tabs.find((t) => t.id === hashId)
      if (match) {
        setActiveTab(match.id)
      }
    } else {
      setActiveTab('process')
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.hash, location.pathname])

  const handleTabChange = (id) => {
    setActiveTab(id)
    window.history.replaceState(null, '', `#${id}`)
  }

  // Data
  const steps = [
    { num: '1', title: 'Explore the School', desc: 'Tour campus, attend Open Day, or browse online ethos.' },
    { num: '2', title: 'Check Eligibility', desc: 'Review age requirements and available seats for 2026–27.' },
    { num: '3', title: 'Submit Application', desc: 'Complete online form and upload required certificates.' },
    { num: '4', title: 'Student Interaction', desc: 'Informal student interaction & assessment with faculty.' },
    { num: '5', title: 'Seat Confirmation', desc: 'Receive offer letter and submit fee to secure admission.' },
  ]

  const classEligibility = [
    { class: 'Nursery', age: '3–4 years', status: 'Open', statusType: 'open' },
    { class: 'LKG', age: '4–5 years', status: 'Open', statusType: 'open' },
    { class: 'UKG', age: '5–6 years', status: 'Open', statusType: 'open' },
    { class: 'Class 1', age: '6–7 years', status: 'Open', statusType: 'open' },
    { class: 'Classes 2–5', age: 'As applicable', status: 'Open', statusType: 'open' },
    { class: 'Classes 6–8', age: 'As applicable', status: 'Limited', statusType: 'limited' },
    { class: 'Class 11', age: 'Post-board entry', status: 'Open', statusType: 'open' },
    { class: 'Classes 9 & 10', age: '—', status: 'Not available', statusType: 'closed' },
  ]

  const documentsList = [
    "Student's birth certificate (original + photocopy)",
    "Previous academic year's report card",
    'Two recent passport-size photographs',
    'Parent/Guardian government ID proof',
    'Proof of address (utility bill or Aadhaar)',
    'Transfer certificate from previous school (Classes 2 onwards)',
  ]

  const importantDates = [
    { title: 'Applications Open', date: '1 July 2026' },
    { title: 'Open Day', date: '19 August 2026' },
    { title: 'Application Deadline', date: '20 September 2026' },
    { title: 'Interaction Dates', date: 'October–November 2026' },
    { title: 'Offer Letters', date: 'December 2026' },
    { title: 'Seat Confirmation Deadline', date: '15 January 2027' },
  ]

  return (
    <div className="bg-white min-h-screen text-[var(--navy-deep)]">
      {/* Header Banner */}
      <section className="relative bg-[var(--navy-deep)] text-white py-14 md:py-18 border-b border-white/10 overflow-hidden">
        <div
          className="absolute top-1/2 right-0 md:right-6 -translate-y-1/2 w-[75%] md:w-[55%] h-[130%] pointer-events-none opacity-25 bg-right bg-no-repeat bg-contain mix-blend-screen"
          style={{ backgroundImage: `url(${creativeToolsSvg})` }}
        />

        <div className="container-wide relative z-10">
          <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-[var(--gold)]">
            ADMISSIONS 2026–27
          </div>
          <h1 className="mt-2 text-[clamp(2.2rem,4vw,3.4rem)] font-serif font-normal text-white leading-tight max-w-3xl">
            Begin Your Child's Greenwood Journey
          </h1>
          <p className="mt-3 max-w-2xl text-sm md:text-base text-white/85 leading-relaxed font-normal">
            Select an admission topic below to view dynamic structured guidelines, fees, policies, and schedules.
          </p>
        </div>
      </section>

      {/* Main Dynamic View Layout */}
      <section className="py-10 md:py-16 bg-white min-h-[600px]">
        <div className="container-wide">
          <div className="grid gap-8 lg:grid-cols-[280px_1fr] items-start">
            {/* Left Sidebar Menu / Tabs List */}
            <div className="bg-[var(--sand)]/40 border border-gray-200 p-2 shadow-xs sticky top-[70px] z-20">
              <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[var(--navy-deep)] border-b border-gray-200/80 mb-2">
                ADMISSION NAVIGATION
              </div>
              <div className="space-y-1">
                {tabs.map((t) => {
                  const isActive = activeTab === t.id
                  return (
                    <button
                      key={t.id}
                      onClick={() => handleTabChange(t.id)}
                      className={`w-full flex items-center justify-between text-left px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
                        isActive
                          ? 'bg-[var(--navy-deep)] !text-white shadow-xs translate-x-1'
                          : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-[var(--navy-deep)] border border-gray-200/70'
                      }`}
                    >
                      <span className={isActive ? '!text-white text-white' : ''}>{t.label}</span>
                      <ChevronRight size={14} className={isActive ? '!text-white text-white' : 'text-gray-400'} />
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Right Side: DYNAMIC CONTENT PANEL */}
            <div className="bg-white p-6 sm:p-8 md:p-10 border border-gray-200 shadow-md min-h-[500px] transition-all duration-300">
              {/* TAB 1: ADMISSION PROCESS */}
              {activeTab === 'process' && (
                <div className="space-y-8 animate-fadeIn">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-widest text-[var(--gold)]">
                        SECTION 01
                      </div>
                      <h2 className="text-2xl md:text-3xl font-serif text-[var(--navy-deep)] font-normal mt-1">
                        Admission Process & Guidelines
                      </h2>
                    </div>
                    <Link
                      to="/admissions/apply"
                      className="inline-flex items-center gap-2 bg-[var(--navy-deep)] !text-white px-6 py-2.5 font-bold text-xs uppercase tracking-wider hover:bg-[var(--gold)] transition-colors shadow-sm shrink-0"
                    >
                      <span className="!text-white text-white">Apply Online</span>
                      <ArrowRight size={14} className="!text-white text-white" />
                    </Link>
                  </div>

                  {/* 5 Stepper Grid */}
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {steps.map((s) => (
                      <div key={s.num} className="bg-[var(--sand)]/40 p-4 border border-gray-200 flex flex-col justify-between">
                        <div>
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--navy-deep)] text-white font-serif font-bold text-xs mb-2">
                            {s.num}
                          </div>
                          <h3 className="text-xs font-bold text-[var(--navy-deep)] font-serif mb-1 leading-snug">
                            {s.title}
                          </h3>
                          <p className="text-[11px] text-gray-600 leading-relaxed">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Eligibility & Documents Sub-Grid */}
                  <div className="grid gap-8 lg:grid-cols-2 pt-4">
                    {/* Eligibility Table */}
                    <div className="bg-[var(--sand)]/20 p-5 border border-gray-200">
                      <h3 className="text-base font-serif font-bold text-[var(--navy-deep)] mb-3">
                        Available Seats & Age Criteria
                      </h3>
                      <div className="overflow-x-auto border border-gray-200 shadow-xs bg-white">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-[var(--navy-deep)] text-white font-bold uppercase tracking-wider text-[10px]">
                              <th className="p-3">Class</th>
                              <th className="p-3">Age (as of 31 Mar 2027)</th>
                              <th className="p-3">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 text-gray-700">
                            {classEligibility.map((row, idx) => (
                              <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-[var(--sand)]/30'}>
                                <td className="p-2.5 font-bold text-[var(--navy-deep)]">{row.class}</td>
                                <td className="p-2.5">{row.age}</td>
                                <td className="p-2.5 font-semibold">
                                  {row.statusType === 'open' && <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200">{row.status}</span>}
                                  {row.statusType === 'limited' && <span className="text-amber-700 bg-amber-50 px-2 py-0.5 border border-amber-200">{row.status}</span>}
                                  {row.statusType === 'closed' && <span className="text-gray-500 bg-gray-100 px-2 py-0.5">{row.status}</span>}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Documents & Schedule */}
                    <div className="space-y-6">
                      <div className="bg-[var(--sand)]/20 p-5 border border-gray-200">
                        <h3 className="text-base font-serif font-bold text-[var(--navy-deep)] mb-3">Required Documents Checklist</h3>
                        <ul className="space-y-2 text-xs text-gray-700 font-medium">
                          {documentsList.map((doc, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 size={15} className="text-[#ea580c] shrink-0 mt-0.5" />
                              <span>{doc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-[var(--sand)]/20 p-5 border border-gray-200">
                        <h3 className="text-base font-serif font-bold text-[var(--navy-deep)] mb-2">Important Admission Deadlines</h3>
                        <div className="space-y-2 text-xs">
                          {importantDates.map((d, idx) => (
                            <div key={idx} className="flex justify-between py-1 border-b border-gray-200/60">
                              <span className="text-gray-600">{d.title}</span>
                              <span className="font-bold text-[var(--navy-deep)]">{d.date}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: FEE STRUCTURE */}
              {activeTab === 'fees' && (
                <div className="space-y-8 animate-fadeIn">
                  {/* Top Green/Navy Banner Title matching screenshot */}
                  <div className="bg-[#2A4B82] text-white text-center py-3 font-bold uppercase tracking-wider text-base sm:text-lg border-b border-gray-200">
                    FEE STRUCTURE & PAYMENT RULES
                  </div>

                  {/* Banner Image */}
                  <div className="w-full h-[200px] sm:h-[260px] overflow-hidden border border-gray-200 shadow-xs relative">
                    <img
                      src={feeStructureImg}
                      alt="Fee Structure and Payment Rules"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Academic Stage Fee Schedule Table */}
                  <div>
                    <h3 className="text-base font-serif font-bold text-[var(--navy-deep)] mb-3">
                      Academic Stage Tuition & Annual Fee Schedule 2026–27
                    </h3>
                    <div className="overflow-x-auto border border-gray-200 shadow-xs bg-white">
                      <table className="w-full text-left border-collapse text-xs md:text-sm">
                        <thead>
                          <tr className="bg-[var(--navy-deep)] text-white font-bold uppercase tracking-wider text-[11px]">
                            <th className="p-3.5 border-b border-white/10">Academic Stage</th>
                            <th className="p-3.5 border-b border-white/10">Admission Fee (One-Time)</th>
                            <th className="p-3.5 border-b border-white/10">Tuition Fee (Monthly)</th>
                            <th className="p-3.5 border-b border-white/10">Annual Charges</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 text-gray-700">
                          <tr className="bg-white">
                            <td className="p-3.5 font-bold text-[var(--navy-deep)] font-serif">Nursery – UKG</td>
                            <td className="p-3.5">₹25,000</td>
                            <td className="p-3.5 font-semibold text-[var(--gold)]">₹12,500 / Month</td>
                            <td className="p-3.5">₹15,000</td>
                          </tr>
                          <tr className="bg-[var(--sand)]/30">
                            <td className="p-3.5 font-bold text-[var(--navy-deep)] font-serif">Primary (Class 1 – 5)</td>
                            <td className="p-3.5">₹30,000</td>
                            <td className="p-3.5 font-semibold text-[var(--gold)]">₹14,800 / Month</td>
                            <td className="p-3.5">₹18,000</td>
                          </tr>
                          <tr className="bg-white">
                            <td className="p-3.5 font-bold text-[var(--navy-deep)] font-serif">Middle (Class 6 – 8)</td>
                            <td className="p-3.5">₹35,000</td>
                            <td className="p-3.5 font-semibold text-[var(--gold)]">₹17,200 / Month</td>
                            <td className="p-3.5">₹20,000</td>
                          </tr>
                          <tr className="bg-[var(--sand)]/30">
                            <td className="p-3.5 font-bold text-[var(--navy-deep)] font-serif">Senior (Class 9 – 12)</td>
                            <td className="p-3.5">₹40,000</td>
                            <td className="p-3.5 font-semibold text-[var(--gold)]">₹19,500 / Month</td>
                            <td className="p-3.5">₹24,000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* FEE DEPOSIT SECTION matching screenshot 1:1 */}
                  <div className="space-y-4 pt-2">
                    <h3 className="text-base font-bold font-serif text-[#800000] uppercase tracking-wider">
                      FEE DEPOSIT:
                    </h3>

                    {/* Struck-off Warning Alert Box */}
                    <div className="p-4 bg-red-50 border-l-4 border-[#800000] text-gray-900 font-bold text-xs md:text-sm leading-relaxed">
                      If the fee is not paid by the last working day of the month, the name of the ward will be struck off and a Re-admission fee of Rs. 500/- will be payable.
                    </div>

                    {/* Rule Bullet Points */}
                    <ul className="space-y-3 text-xs md:text-sm text-gray-700 leading-relaxed font-normal pl-1">
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#800000] font-bold text-base leading-none">⚙</span>
                        <span>
                          Fee will be deposited from <strong>1st to 10th of every month</strong>. In case of late fee, fine will be charged from 11th to 15th a sum of <strong>Rs. 50/-</strong> 16th to 20th a sum of <strong>Rs. 75/-</strong> & <strong>Rs. 100/-</strong> after 20th of every month. Cheques regarding fee will be accepted from 1st to 7th of every month.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#800000] font-bold text-base leading-none">⚙</span>
                        <span>Cheque Bounce charges will be <strong>Rs. 300/-</strong>.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#800000] font-bold text-base leading-none">⚙</span>
                        <span>The amount decided by the Council for Registration fee (Class IX) & Board Fee (Class X & XII) will be payable by the parents.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#800000] font-bold text-base leading-none">⚙</span>
                        <span>Eligibility fee & charges for the correction of entries (if any) will be payable by the parents.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#800000] font-bold text-base leading-none">⚙</span>
                        <span>Candidate participating in any of School Function/Activity will be liable to pay amount for costume & other accessories. A prior consent of the parent will be sought for the same.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#800000] font-bold text-base leading-none">⚙</span>
                        <span>Candidate participating in any of the Outdoor event, both at State and National level, the expenditure will be borne by the parents.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#800000] font-bold text-base leading-none">⚙</span>
                        <span>Payment for Educational Excursions, NIE Membership, any of the Aptitude Test or Counselling Session will be borne by the parents.</span>
                      </li>
                    </ul>
                  </div>

                  {/* CONVEYANCE FEE SECTION matching screenshot 1:1 */}
                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <h3 className="text-base font-bold font-serif text-[#800000] uppercase tracking-wider">
                      CONVEYANCE FEE-
                    </h3>

                    <ul className="space-y-2.5 text-xs md:text-sm text-gray-700 leading-relaxed font-normal pl-1">
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#800000] font-bold text-base leading-none">⚙</span>
                        <span>Conveyance fee will be charged according to the distance, and will be decided by the school management.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#800000] font-bold text-base leading-none">⚙</span>
                        <span>Conveyance fee will be charged for 12 months. Once the decision about availing this facility has been taken, It cannot be withdrawn until the end of academic session.</span>
                      </li>
                    </ul>

                    <div className="mt-3 p-3 bg-[var(--sand)] border border-gray-200 text-xs text-gray-800 font-medium">
                      <strong>Note:</strong> Parents/Guardians will indicate their preference for school transportation at the time of admission.
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: MINIMUM ATTENDANCE */}
              {activeTab === 'attendance' && (
                <div className="space-y-8 animate-fadeIn">
                  {/* Top Header Title matching screenshot */}
                  <div className="bg-[#2A4B82] text-white text-center py-3 font-bold uppercase tracking-wider text-base sm:text-lg border-b border-gray-200">
                    MINIMUM ATTENDANCE
                  </div>

                  {/* Banner Image */}
                  <div className="w-full h-[200px] sm:h-[260px] overflow-hidden border border-gray-200 shadow-xs relative">
                    <img
                      src={attendanceImg}
                      alt="Minimum Attendance Criterion"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* ATTENDANCE CRITERION SECTION matching screenshot 1:1 */}
                  <div className="space-y-4 pt-2">
                    <h3 className="text-base font-bold font-serif text-[#800000] uppercase tracking-wider">
                      ATTENDANCE CRITERION:
                    </h3>

                    <ul className="space-y-3.5 text-xs md:text-sm text-gray-800 leading-relaxed font-normal pl-1">
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#800000] font-bold text-base leading-none">⚙</span>
                        <span>
                          <strong>90% attendance is compulsory</strong>, else student will not be allowed to appear in the final examination.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#800000] font-bold text-base leading-none">⚙</span>
                        <span>
                          In case of being absent from the school for more than 3 days in the month of April student's name will be struck off from the school.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#800000] font-bold text-base leading-none">⚙</span>
                        <span>
                          In case of being absent from the school for more than 10 days without any prior information student's name will be struck off from the school.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#800000] font-bold text-base leading-none">⚙</span>
                        <span>
                          Leave will be granted to the student only when a proper leave application duly signed by the parent is submitted to the school.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* TAB 4: SCHOOL UNIFORM */}
              {activeTab === 'uniform' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-b border-gray-200 pb-4">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-[var(--gold)]">
                      SECTION 04
                    </div>
                    <h2 className="text-2xl md:text-3xl font-serif text-[var(--navy-deep)] font-normal mt-1">
                      School Uniform Specifications
                    </h2>
                  </div>

                  <div className="bg-white border border-gray-300 shadow-sm overflow-hidden text-xs md:text-sm">
                    <div className="bg-[#1C3564] text-white text-center py-3 font-bold uppercase tracking-wider text-sm md:text-base border-b border-gray-200">
                      SCHOOL UNIFORM SPECIFICATIONS
                    </div>

                    {/* PLAYWAY TO UKG */}
                    <div className="border-b border-gray-300">
                      <div className="bg-[#2A4B82] text-white font-bold px-4 py-2 uppercase text-xs tracking-wider">
                        CLASS PLAYWAY TO UKG
                      </div>
                      <div className="grid grid-cols-2 bg-[var(--sand)] text-[var(--navy-deep)] font-bold text-center py-2 border-b border-gray-300 text-xs">
                        <div>FOR GIRLS</div>
                        <div className="border-l border-gray-300">FOR BOYS</div>
                      </div>

                      <div className="bg-[#4A6FA5] text-white font-bold text-center py-1.5 uppercase text-[11px] tracking-wider border-b border-gray-300">
                        SUMMERS
                      </div>
                      <div className="grid grid-cols-2 divide-x divide-gray-300 bg-[#FFF5EC]/40 p-4 leading-relaxed">
                        <div>Charcoal Blue Tunic with Striped Collar Design, Blue Bloomers, Blue Socks with Stripes, Velcro Shoes, Sky Blue Hair band with Stripes.</div>
                        <div className="pl-4">White Shirt with Striped Collar, Charcoal Blue Half Pant, Blue Socks with Stripes, Velcro Shoes.</div>
                      </div>

                      <div className="bg-[#4A6FA5] text-white font-bold text-center py-1.5 uppercase text-[11px] tracking-wider border-b border-t border-gray-300">
                        WINTERS
                      </div>
                      <div className="bg-[#FFF5EC]/60 p-4 leading-relaxed text-center">
                        Charcoal Blue Trousers, White full sleeves Shirt with striped collar design, Grey Half Sweater with Maroon cross design, Maroon Tweed Jacket with White Piping & School Monogram.
                      </div>
                    </div>

                    {/* CLASS I TO XII */}
                    <div>
                      <div className="bg-[#2A4B82] text-white font-bold px-4 py-2 uppercase text-xs tracking-wider">
                        CLASS I TO XII
                      </div>
                      <div className="grid grid-cols-2 bg-[var(--sand)] text-[var(--navy-deep)] font-bold text-center py-2 border-b border-gray-300 text-xs">
                        <div>FOR GIRLS</div>
                        <div className="border-l border-gray-300">FOR BOYS</div>
                      </div>

                      <div className="bg-[#4A6FA5] text-white font-bold text-center py-1.5 uppercase text-[11px] tracking-wider border-b border-gray-300">
                        SUMMERS
                      </div>
                      <div className="grid grid-cols-2 divide-x divide-gray-300 bg-[#FFF5EC]/40 p-4 leading-relaxed">
                        <div>
                          <p className="mb-2"><strong>Classes 1–5:</strong> White Blouse with Cross Stripe Applied Design.</p>
                          <p><strong>Classes 6–12:</strong> White Shirt with Striped Collar. Charcoal Blue wrap around Skirt with 2 Striped loops, Blue Socks with Stripes, Black Lace Shoes, Black Cycling Shorts, Sky Blue Hair band with Stripes, School Tie and Belt.</p>
                        </div>
                        <div className="pl-4">
                          White Shirt with Striped Collar design, Charcoal Blue Trousers with Striped Loops, Blue Socks with Stripes, Black Lace Shoes, School Tie & Belt.
                        </div>
                      </div>

                      <div className="bg-[#4A6FA5] text-white font-bold text-center py-1.5 uppercase text-[11px] tracking-wider border-b border-t border-gray-300">
                        GIRLS & BOYS (HOUSE UNIFORM)
                      </div>
                      <div className="bg-[#FFF5EC]/60 p-4 leading-relaxed text-center font-medium">
                        House Colour Track Suit with White Socks with house Stripes & house color Shoes (on Tuesday, Thursday and Saturday).
                      </div>

                      <div className="bg-[#4A6FA5] text-white font-bold text-center py-1.5 uppercase text-[11px] tracking-wider border-b border-t border-gray-300">
                        WINTER
                      </div>
                      <div className="grid grid-cols-2 divide-x divide-gray-300 bg-[#FFF5EC]/40 p-4 leading-relaxed">
                        <div>
                          White full Sleeves Blouse /Shirt, Charcoal Blue Wrap around Skirt, Grey Half Sweater with Maroon cross design, Maroon Tweed Jacket/Blazer with White Piping & School Monogram. Blue Socks with Stripes, Black Lace Shoes, Dark Blue Leggings, Sky Blue Hair band with Stripes, Blue Scarf.
                        </div>
                        <div className="pl-4">
                          White Full Sleeves Shirt with Stripes collar design, Charcoal blue Trousers, Grey Half Sweater with Maroon cross design, Maroon Tweed Jacket/Blazer with White Piping & School Monogram. Blue socks with Stripes, Black Lace Shoes.
                        </div>
                      </div>

                      <div className="bg-[#2A4B82] text-white font-bold text-center py-2 uppercase text-xs tracking-wider border-t border-gray-300">
                        NOTE: FOR CLASSES PLAYWAY TO XII
                      </div>
                      <div className="bg-[#FFF5EC] p-4 text-xs space-y-2 text-gray-800 leading-relaxed font-medium">
                        <p>• Any change in colour or design will not be acceptable. Every Monday, Wednesday and Friday student will come in main school uniform. Every Tuesday, Thursday and Saturday the student should come in his/her Track Suit/House Colour Track Suit, House colour stripes white socks & House colour Shoe.</p>
                        <p>• Class XI & XII (Girls & Boys) will wear Dark blue track suits with applied design on every Saturday.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: EXAMINATIONS */}
              {activeTab === 'examinations' && (
                <div className="space-y-8 animate-fadeIn">
                  {/* Top Header Title matching screenshot */}
                  <div className="bg-[#2A4B82] text-white text-center py-3 font-bold uppercase tracking-wider text-base sm:text-lg border-b border-gray-200">
                    EXAMINATIONS
                  </div>

                  {/* Banner Image */}
                  <div className="w-full h-[200px] sm:h-[260px] overflow-hidden border border-gray-200 shadow-xs relative">
                    <img
                      src={examinationImg}
                      alt="Examinations and Evaluation System"
                      className="w-full h-full object-cover"
                    />
                  </div>



                  {/* EXAMINATIONS SECTION matching screenshot 1:1 */}
                  <div className="space-y-4 pt-2">
                    <h3 className="text-base font-bold font-serif text-[#800000] uppercase tracking-wider">
                      EXAMINATIONS:
                    </h3>

                    <div className="space-y-3 text-xs md:text-sm text-gray-800 leading-relaxed font-normal">
                      <p>
                        Monthly tests are held in the last week of every month. 1<sup>st</sup> Term, Half Yearly and 2<sup>nd</sup> Term examination are held before the Annual examinations thus dividing each session into four terms.
                      </p>

                      <div className="p-3 bg-[var(--sand)]/50 border border-gray-200 text-xs">
                        <strong>NOTE:</strong> The Promotion is based upon his/her performance in the 1<sup>st</sup> Term, 2<sup>nd</sup> Term, Half - Yearly & Annual examinations.
                      </div>

                      <p>Rank will be given on the basis of marks obtained under this pattern.</p>
                      <p className="font-semibold text-[#800000]">
                        No re-test will be taken if a child fails to appear in any of the test or examination.
                      </p>
                    </div>
                  </div>

                  {/* CALENDAR OF MONTHLY TESTS AND EXAMINATIONS SECTION matching screenshot 1:1 */}
                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <h3 className="text-base font-bold font-serif text-[#800000] uppercase tracking-wider">
                      CALENDAR OF MONTHLY TESTS AND EXAMINATIONS-
                    </h3>

                    <ul className="space-y-3 text-xs md:text-sm text-gray-800 leading-relaxed font-normal pl-1">
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#800000] font-bold text-base leading-none">⚙</span>
                        <span><strong>1st First Term Test</strong> - 1st week of May / 2nd week of July</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#800000] font-bold text-base leading-none">⚙</span>
                        <span><strong>Half-yearly Examination</strong> - 2nd week of September</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#800000] font-bold text-base leading-none">⚙</span>
                        <span><strong>2nd Term Test / Pre-Board</strong> - 1st week of December</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#800000] font-bold text-base leading-none">⚙</span>
                        <span><strong>Annual Examination</strong> - 2nd week of February</span>
                      </li>
                    </ul>

                    <p className="text-xs text-gray-600 italic">
                      Note:- 1st, 2nd Term Test, Half-yearly Exam, Pre-board and Annual examinations will be held according to the school calendar.
                    </p>
                  </div>

                  {/* PROGRESS REPORT SECTION matching screenshot 1:1 */}
                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <h3 className="text-base font-bold font-serif text-[#800000] uppercase tracking-wider">
                      PROGRESS REPORT-
                    </h3>

                    <div className="space-y-2 text-xs md:text-sm text-gray-800 leading-relaxed font-normal">
                      <p>Progress reports of the students including their cumulative record are given after each examination.</p>
                      <p>
                        Parents/Guardians are required to go through their ward's progress. Special Attention is needed from parents/guardians to the specific information given by the class teacher and the subject teacher.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: CO-CURRICULAR ACTIVITIES */}
              {activeTab === 'cocurricular' && (
                <div className="space-y-8 animate-fadeIn">
                  {/* Top Header Title matching screenshot */}
                  <div className="bg-[#2A4B82] text-white text-center py-3 font-bold uppercase tracking-wider text-base sm:text-lg border-b border-gray-200">
                    CO-CURRICULAR ACTIVITIES
                  </div>

                  {/* Banner Image */}
                  <div className="w-full h-[200px] sm:h-[260px] overflow-hidden border border-gray-200 shadow-xs relative">
                    <img
                      src={coCurriculumImg}
                      alt="Co-Curricular Activities"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* CO-CURRICULAR & CULTURAL ACTIVITIES SECTION matching screenshot 1:1 */}
                  <div className="space-y-4 pt-2">
                    <h3 className="text-base font-bold font-serif text-[#800000] uppercase tracking-wider">
                      CO-CURRICULAR & CULTURAL ACTIVITIES:
                    </h3>

                    <div className="space-y-3 text-xs md:text-sm text-gray-800 leading-relaxed font-normal">
                      <p>
                        The students of the college are divided into four houses to boost the competitive feeling among them. Different Inter house competitions are organised from time to time to show their talents and creativity. These competitions devote an all-rounder inside them and improve their personality. Meditation is the need of today's stressful life and that is why meditation is an important part of college co-curriculum. For grooming personality, every student is supposed to attend daily assembly. They are motivated to take active part in different activities.
                      </p>
                      <p>
                        A dedicated team of qualified full time teachers in Arts, Craft, Music, Dance and Dramatics hunt and nurture the talent throughout the session. Our students have made their mark at District and State Level in co-curricular activities including elocution, debate, quiz & various other competitions.
                      </p>
                    </div>
                  </div>

                  {/* SPORTS & GAMES SECTION matching screenshot 1:1 */}
                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <h3 className="text-base font-bold font-serif text-[#800000] uppercase tracking-wider">
                      SPORTS & GAMES
                    </h3>

                    <p className="text-xs md:text-sm text-gray-800 leading-relaxed font-normal">
                      Basketball and Volleyball courts and indoor facility for badminton add up to our endeavors in providing opportunities for physical development and leadership qualities under true sportsmanship and team spirit. Our students have proved the Indefatigable sense of enthusiasm which is witnessed during various Sports events and their mettle in Kho-Kho and Basket Ball at State and National Level.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 7: CURRICULUM */}
              {activeTab === 'curriculum' && (
                <div className="space-y-8 animate-fadeIn">
                  {/* Top Header Title matching screenshot */}
                  <div className="bg-[#2A4B82] text-white text-center py-3 font-bold uppercase tracking-wider text-base sm:text-lg border-b border-gray-200">
                    CURRICULUM
                  </div>

                  {/* Banner Image */}
                  <div className="w-full h-[200px] sm:h-[260px] overflow-hidden border border-gray-200 shadow-xs relative">
                    <img
                      src={curriculumImg}
                      alt="Curriculum Specifications"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* PRE-PRIMARY / PRIMARY CURRICULUM SECTION matching screenshot 1:1 */}
                  <div className="space-y-4 pt-2">
                    <h3 className="text-base font-bold font-serif text-[#800000] uppercase tracking-wider">
                      CURRICULUM FOR PRE- PRIMARY/ PRIMARY-
                    </h3>

                    <div className="space-y-3 text-xs md:text-sm text-gray-800 leading-relaxed font-normal">
                      <p>
                        General education in all subjects from Nursery to <strong>class-II (Hindi, English, Science, EVS, Math, G.K. and Art)</strong> and <strong>class-III to V (English, Hindi, Math, Science, Social Science, Computer, G.K., CCA, M.T.)</strong> is followed as per Junior School syllabus.
                      </p>
                      <p>
                        The methodology and curriculum for students in pre-primary and primary section are modulated to facilitate learning by doing and creative participation through reasoning and thinking. Children are specially taken care of their cumulative progress by the teachers and incharges especially responsible for primary classes. More emphasis in enhancing proficiency in languages particularly English with more stress on spoken English.
                      </p>
                    </div>
                  </div>

                  {/* MIDDLE / SECONDARY SECTION matching screenshot 1:1 */}
                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <h3 className="text-base font-bold font-serif text-[#800000] uppercase tracking-wider">
                      CURRICULUM FOR MIDDLE / SECONDARY SECTION-
                    </h3>

                    <p className="text-xs md:text-sm text-gray-800 leading-relaxed font-normal">
                      The curriculum prescribed is strictly followed for classes <strong>VI to X</strong> and <strong>Class XI- XII</strong>. Our Hall-Mark is the team of qualified experienced faculty specially recruited for the academic wings. Personal attention through Remedial classes/ Extra classes and Home visits to help achieve better performance in academics.
                    </p>
                  </div>

                  {/* SUBJECTS OFFERED AT IX-X SECTION matching screenshot 1:1 */}
                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <h3 className="text-base font-bold font-serif text-[#800000] uppercase tracking-wider">
                      SUBJECTS OFFERED AT CLASS IX-X:
                    </h3>

                    <div className="grid gap-6 sm:grid-cols-3 text-xs md:text-sm">
                      <div className="p-4 bg-[var(--sand)]/40 border border-gray-200">
                        <div className="font-bold text-[var(--navy-deep)] mb-2">Group 1 (Compulsory):</div>
                        <ul className="space-y-1 text-gray-700">
                          <li>• English</li>
                          <li>• Hindi</li>
                          <li>• History, Civics & Geography</li>
                          <li>• S.U.P.W. (grades only)</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-[var(--sand)]/40 border border-gray-200">
                        <div className="font-bold text-[var(--navy-deep)] mb-2">Group 2 (Elective Options):</div>
                        <ul className="space-y-1 text-gray-700">
                          <li>• Mathematics / Commercial Studies</li>
                          <li>• Science (Phy, Chem., Bio) / Economics</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-[var(--sand)]/40 border border-gray-200">
                        <div className="font-bold text-[var(--navy-deep)] mb-2">Group 3 (Skill Options):</div>
                        <ul className="space-y-1 text-gray-700">
                          <li>• Physical Education / Computer Application</li>
                        </ul>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 italic">
                      NOTE:- All the subjects in Group I are compulsory. A student will have to choose any two subjects from Group II and any one from Group III.
                    </p>
                  </div>

                  {/* SENIOR SECONDARY SECTION CLASS XI-XII matching screenshot 1:1 */}
                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <h3 className="text-base font-bold font-serif text-[#800000] uppercase tracking-wider">
                      CURRICULUM FOR SENIOR SECONDARY SECTION - SUBJECTS OFFERED AT CLASS XI-XII:
                    </h3>

                    <div className="p-4 bg-[var(--sand)]/30 border border-gray-200 text-xs md:text-sm">
                      <div className="font-bold text-[#800000] mb-2 uppercase">Compulsory Subjects:</div>
                      <div className="flex gap-6 text-gray-800 font-medium">
                        <span>• English</span>
                        <span>• Physical Education</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="font-bold text-[#800000] text-xs uppercase tracking-wider">ELECTIVE SUBJECT GROUPS:</div>
                      <div className="grid gap-4 sm:grid-cols-3 text-xs md:text-sm">
                        <div className="p-4 bg-white border border-gray-200 shadow-xs">
                          <div className="font-bold text-[var(--navy-deep)] mb-2 border-b border-gray-100 pb-1">GROUP A (Science)</div>
                          <ul className="space-y-1 text-gray-700">
                            <li>• Physics</li>
                            <li>• Chemistry</li>
                            <li>• Biology</li>
                            <li>• Mathematics</li>
                          </ul>
                        </div>

                        <div className="p-4 bg-white border border-gray-200 shadow-xs">
                          <div className="font-bold text-[var(--navy-deep)] mb-2 border-b border-gray-100 pb-1">GROUP B (Commerce)</div>
                          <ul className="space-y-1 text-gray-700">
                            <li>• Commerce</li>
                            <li>• Economics</li>
                            <li>• Mathematics</li>
                            <li>• Business Studies</li>
                          </ul>
                        </div>

                        <div className="p-4 bg-white border border-gray-200 shadow-xs">
                          <div className="font-bold text-[var(--navy-deep)] mb-2 border-b border-gray-100 pb-1">GROUP C (Humanities & Tech)</div>
                          <ul className="space-y-1 text-gray-700">
                            <li>• Hindi</li>
                            <li>• Computer Science</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 8: COUNSELLING */}
              {activeTab === 'counselling' && (
                <div className="space-y-8 animate-fadeIn">
                  {/* Top Header Title matching screenshot */}
                  <div className="bg-[#2A4B82] text-white text-center py-3 font-bold uppercase tracking-wider text-base sm:text-lg border-b border-gray-200">
                    COUNSELLING
                  </div>

                  {/* Banner Image */}
                  <div className="w-full h-[200px] sm:h-[260px] overflow-hidden border border-gray-200 shadow-xs relative">
                    <img
                      src={counsellingImg}
                      alt="Student Counselling Session"
                      className="w-full h-full object-cover"
                    />
                  </div>



                  {/* COUNSELLING SECTION matching screenshot 1:1 */}
                  <div className="space-y-4 pt-2">
                    <h3 className="text-base font-bold font-serif text-[#800000] uppercase tracking-wider">
                      COUNSELLING:
                    </h3>

                    <div className="space-y-3 text-xs md:text-sm text-gray-800 leading-relaxed font-normal">
                      <p>
                        The purpose of counseling is to improve the lives of children suffering from any sort of learning disorder or the inability to cope with the constantly changing world around them. During the early years a growing child may face problems in the classroom, playground or even at home. There is peer pressure, social and familial pressure, even sibling pressure! The child may easily buckle under any or all of these pressures. The problem is compounded if the child has few friends or is unable to unburden himself to someone close to him/her. If unaddressed, these small issues become emotional, psychological or social problems. To address these issues the school has a School Counsellor who helps the child to deal with his/her academic or emotional problems. The parents will be involved and the programme will be highly interactive.
                      </p>
                      <p>
                        At times, everyone feels worried or has problems that may be hard to talk about with the people close to you. You may worry about whether they will understand, whether you can trust them, whether they will blame you, or ignore your feelings. That is when you may think about talking to the school counsellor.
                      </p>
                    </div>
                  </div>

                  {/* HOW DOES IT WORK SECTION matching screenshot 1:1 */}
                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <h3 className="text-base font-bold font-serif text-[#800000] uppercase tracking-wider">
                      HOW DOES IT WORK-
                    </h3>

                    <p className="text-xs md:text-sm text-gray-800 leading-relaxed font-normal">
                      You may walk-in voluntarily or you may be referred by your teacher or by your parents. You will then be offered an appointment at the counselling room. You can also email the counsellor at the email address (<strong>contact@greenwood.edu</strong>) to inform about your problems and to get an appointment. The school may contact your parents/guardians to let them know you are seeing a counsellor, but will not go into details. It may still be possible to come to counselling without your parents being told, and you can discuss this with the counsellor.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 9: SCHOLARSHIP */}
              {activeTab === 'scholarship' && (
                <div className="space-y-8 animate-fadeIn">
                  {/* Top Header Title matching screenshot */}
                  <div className="bg-[#2A4B82] text-white text-center py-3 font-bold uppercase tracking-wider text-base sm:text-lg border-b border-gray-200">
                    SCHOLARSHIP
                  </div>

                  {/* Banner Image */}
                  <div className="w-full h-[200px] sm:h-[260px] overflow-hidden border border-gray-200 shadow-xs relative">
                    <img
                      src={scholarshipImg}
                      alt="Scholarships and Rewards"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* SCHOLARSHIP AND OTHER REWARDS SECTION matching screenshot 1:1 */}
                  <div className="space-y-4 pt-2">
                    <h3 className="text-base font-bold font-serif text-[#800000] uppercase tracking-wider">
                      SCHOLARSHIP AND OTHER REWARDS:
                    </h3>

                    <p className="text-xs md:text-sm font-semibold italic text-gray-800">
                      "Aim at the stars, Even if You fall short; You will land on Moon".
                    </p>
                  </div>

                  {/* OVERVIEW SECTION matching screenshot 1:1 */}
                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <h3 className="text-base font-bold font-serif text-[#800000] uppercase tracking-wider">
                      OVERVIEW
                    </h3>

                    <ul className="space-y-3.5 text-xs md:text-sm text-gray-800 leading-relaxed font-normal pl-1">
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#800000] font-bold text-base leading-none">⚙</span>
                        <span>
                          <strong>Scholarships</strong> - Every year students belonging to S.C., S.T., backward and minority groups are given scholarship as per Govt. rules.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#800000] font-bold text-base leading-none">⚙</span>
                        <span>
                          Holders in their respective classes are honored in the school's annual function.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#800000] font-bold text-base leading-none">⚙</span>
                        <span>
                          <strong>Best Student award</strong> is given to the student who is judged best in all fields by the teachers and school management.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#800000] font-bold text-base leading-none">⚙</span>
                        <span>
                          <strong>Running trophy</strong> is given to the highest scoring student of the school.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-[#800000] font-bold text-base leading-none">⚙</span>
                        <span>
                          Prizes and rewards for different sports and Inter-House competitions are also given.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA Banner */}
      <section className="bg-[var(--sand)] py-12 md:py-16 w-full border-t border-[#0F2044]/20">
        <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-serif text-[var(--navy-deep)] font-normal text-center md:text-left">
              Ready to apply for Admissions 2026–27?
            </h3>
            <p className="text-xs md:text-sm text-gray-600 mt-1 font-normal text-center md:text-left">
              Complete our online application form in under 10 minutes.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              to="/admissions/apply"
              className="inline-flex items-center gap-2 bg-[var(--navy-deep)] !text-white px-8 py-3.5 rounded-none font-bold text-sm shadow-sm hover:bg-[var(--gold)] transition-colors"
            >
              <span className="!text-white text-white">Start Application</span>
              <ArrowRight size={16} className="!text-white text-white" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
