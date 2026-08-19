import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, User, Phone, BookOpen, FileCheck, ArrowRight, ArrowLeft, Upload, ShieldCheck } from 'lucide-react'
import useDocumentMeta from '../../utils/useDocumentMeta'
import SectionReveal from '../../components/common/SectionReveal'
import creativeToolsSvg from '../../assets/bg-images/SchoolArtWork.png'

export default function Apply() {
  useDocumentMeta({
    title: 'Online Application — Greenwood Academy Admissions',
    description: 'Complete your online enrolment application for Greenwood Academy 2026–27 session.',
  })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const [step, setStep] = useState(1)
  const [data, setData] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('greenwood_application') || '{}')
    } catch {
      return {}
    }
  })
  const [submitting, setSubmitting] = useState(false)
  const [applicationId, setApplicationId] = useState(null)
  const [errors, setErrors] = useState({})

  const grades = [
    'Nursery',
    'LKG',
    'UKG',
    'Class 1',
    'Class 2',
    'Class 3',
    'Class 4',
    'Class 5',
    'Class 6',
    'Class 7',
    'Class 8',
    'Class 9',
    'Class 11 (Science)',
    'Class 11 (Commerce)',
    'Class 11 (Humanities)',
  ]

  const handleChange = (field, value) => {
    const updated = { ...data, [field]: value }
    setData(updated)
    localStorage.setItem('greenwood_application', JSON.stringify(updated))
    if (errors[field]) {
      setErrors({ ...errors, [field]: null })
    }
  }

  const validateStep = (s) => {
    const errs = {}
    if (s === 1) {
      if (!data.name?.trim()) errs.name = 'Student full name is required'
      if (!data.dob) errs.dob = 'Date of birth is required'
      if (!data.gender) errs.gender = 'Please select gender'
      if (!data.grade) errs.grade = 'Please select grade applying for'
    }
    if (s === 2) {
      if (!data.parentName?.trim()) errs.parentName = 'Parent/Guardian name is required'
      if (!data.email?.trim() || !data.email.includes('@')) errs.email = 'Valid email address is required'
      if (!data.phone?.trim() || data.phone.length < 10) errs.phone = 'Valid 10-digit phone number is required'
      if (!data.address?.trim()) errs.address = 'Residential address is required'
    }
    if (s === 3) {
      if (!data.previousSchool?.trim()) errs.previousSchool = 'Previous school name is required'
    }
    if (s === 4) {
      if (!data.declaration) errs.declaration = 'You must confirm the declaration to submit'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 4))
      window.scrollTo({ top: 200, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep(4)) return

    setSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const id = 'GW-2026-' + Math.floor(10000 + Math.random() * 90000)
    localStorage.setItem('greenwood_application_submitted', JSON.stringify({ ...data, id, date: new Date().toLocaleDateString() }))
    setApplicationId(id)
    setSubmitting(false)
    setStep(5)
  }

  const stepsNav = [
    { num: 1, label: 'Student Info', icon: User },
    { num: 2, label: 'Parent Details', icon: Phone },
    { num: 3, label: 'Academic History', icon: BookOpen },
    { num: 4, label: 'Review & Submit', icon: FileCheck },
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
            ADMISSIONS 2026–27
          </div>
          <h1 className="mt-2 text-[clamp(2.2rem,4vw,3.5rem)] font-serif font-normal text-white leading-tight max-w-3xl">
            Online Admission Application Form
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/85 leading-relaxed font-normal">
            Complete the official application form to initiate enrolment for the 2026–27 academic session.
          </p>
        </div>
      </section>

      {/* Main Application Area */}
      <section className="py-14 md:py-20 bg-[var(--sand)]/40 min-h-[600px]">
        <div className="container-wide max-w-4xl">
          {/* Stepper Progress Bar */}
          {step <= 4 && (
            <div className="mb-10 bg-white p-6 border border-gray-200 shadow-sm rounded-none">
              <div className="grid grid-cols-4 gap-2 relative">
                {stepsNav.map((s) => {
                  const Icon = s.icon
                  const isActive = step === s.num
                  const isCompleted = step > s.num
                  return (
                    <div
                      key={s.num}
                      className={`flex flex-col items-center text-center transition-colors ${
                        isActive
                          ? 'text-[var(--navy-deep)]'
                          : isCompleted
                          ? 'text-emerald-700'
                          : 'text-gray-400'
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold mb-2 transition-all ${
                          isActive
                            ? 'bg-[var(--navy-deep)] text-white ring-4 ring-[var(--gold)]/30'
                            : isCompleted
                            ? 'bg-emerald-600 text-white'
                            : 'bg-gray-100 text-gray-500 border border-gray-200'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 size={18} /> : s.num}
                      </div>
                      <span className="text-[11px] md:text-xs font-bold uppercase tracking-wider hidden sm:block">
                        {s.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Form Box */}
          <div className="bg-white p-6 md:p-10 border border-gray-200 shadow-md rounded-none">
            {step === 5 && applicationId ? (
              /* Success Confirmation Screen */
              <div className="text-center py-8 space-y-6">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 size={36} />
                </div>

                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-[var(--gold)]">
                    SUBMISSION SUCCESSFUL
                  </div>
                  <h2 className="mt-2 text-2xl md:text-3xl font-serif font-bold text-[var(--navy-deep)]">
                    Application Submitted Successfully!
                  </h2>
                  <p className="mt-2 text-sm text-gray-600 max-w-xl mx-auto font-normal">
                    Thank you for applying to Greenwood Academy. Your application has been logged into our admissions system.
                  </p>
                </div>

                <div className="bg-[var(--sand)] p-6 border border-gray-200 inline-block max-w-md w-full text-left rounded-none space-y-2">
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Application Reference ID</span>
                    <span className="font-bold text-[var(--navy-deep)]">{applicationId}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Applicant Name</span>
                    <span className="font-bold text-gray-800">{data.name}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Grade Applied</span>
                    <span className="font-bold text-[var(--gold)]">{data.grade}</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 bg-[var(--navy-deep)] !text-white px-6 py-3 font-bold text-xs uppercase tracking-wider hover:bg-[var(--gold)] transition-colors rounded-none"
                  >
                    <span className="!text-white text-white">Back to Home</span>
                  </Link>
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 font-bold text-xs uppercase tracking-wider hover:bg-gray-100 transition-colors rounded-none"
                  >
                    Print Application Summary
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Step 1: Student Information */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <div className="section-label">STEP 1 OF 4</div>
                      <h2 className="text-xl md:text-2xl font-bold font-serif text-[var(--navy-deep)]">
                        Student Information
                      </h2>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                          Student Full Name *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Aarav Sharma"
                          value={data.name || ''}
                          onChange={(e) => handleChange('name', e.target.value)}
                          className="w-full p-3 bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-[var(--navy-deep)] rounded-none"
                        />
                        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                          Date of Birth *
                        </label>
                        <input
                          type="date"
                          value={data.dob || ''}
                          onChange={(e) => handleChange('dob', e.target.value)}
                          className="w-full p-3 bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-[var(--navy-deep)] rounded-none"
                        />
                        {errors.dob && <p className="mt-1 text-xs text-red-600">{errors.dob}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                          Gender *
                        </label>
                        <select
                          value={data.gender || ''}
                          onChange={(e) => handleChange('gender', e.target.value)}
                          className="w-full p-3 bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-[var(--navy-deep)] rounded-none"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.gender && <p className="mt-1 text-xs text-red-600">{errors.gender}</p>}
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                          Grade Applying For *
                        </label>
                        <select
                          value={data.grade || ''}
                          onChange={(e) => handleChange('grade', e.target.value)}
                          className="w-full p-3 bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-[var(--navy-deep)] rounded-none"
                        >
                          <option value="">Select Target Class</option>
                          {grades.map((g) => (
                            <option key={g} value={g}>
                              {g}
                            </option>
                          ))}
                        </select>
                        {errors.grade && <p className="mt-1 text-xs text-red-600">{errors.grade}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Parent / Guardian Details */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <div className="section-label">STEP 2 OF 4</div>
                      <h2 className="text-xl md:text-2xl font-bold font-serif text-[var(--navy-deep)]">
                        Parent & Guardian Details
                      </h2>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                          Parent / Guardian Full Name *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Mr. Rajesh Sharma"
                          value={data.parentName || ''}
                          onChange={(e) => handleChange('parentName', e.target.value)}
                          className="w-full p-3 bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-[var(--navy-deep)] rounded-none"
                        />
                        {errors.parentName && <p className="mt-1 text-xs text-red-600">{errors.parentName}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          placeholder="parent@example.com"
                          value={data.email || ''}
                          onChange={(e) => handleChange('email', e.target.value)}
                          className="w-full p-3 bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-[var(--navy-deep)] rounded-none"
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                          Contact Mobile Number *
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={data.phone || ''}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          className="w-full p-3 bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-[var(--navy-deep)] rounded-none"
                        />
                        {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                          Residential Address *
                        </label>
                        <textarea
                          rows={3}
                          placeholder="House No, Street, Landmark, City, Pincode"
                          value={data.address || ''}
                          onChange={(e) => handleChange('address', e.target.value)}
                          className="w-full p-3 bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-[var(--navy-deep)] rounded-none"
                        />
                        {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Academic History */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <div className="section-label">STEP 3 OF 4</div>
                      <h2 className="text-xl md:text-2xl font-bold font-serif text-[var(--navy-deep)]">
                        Academic History & Previous Schooling
                      </h2>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                          Previous School Name *
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. St. Xavier School / N/A for Nursery"
                          value={data.previousSchool || ''}
                          onChange={(e) => handleChange('previousSchool', e.target.value)}
                          className="w-full p-3 bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-[var(--navy-deep)] rounded-none"
                        />
                        {errors.previousSchool && (
                          <p className="mt-1 text-xs text-red-600">{errors.previousSchool}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                          Last Class Completed
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Class 3 / UKG"
                          value={data.lastClass || ''}
                          onChange={(e) => handleChange('lastClass', e.target.value)}
                          className="w-full p-3 bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-[var(--navy-deep)] rounded-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                          Last Percentage / Grade Score
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. 92% / Grade A"
                          value={data.lastScore || ''}
                          onChange={(e) => handleChange('lastScore', e.target.value)}
                          className="w-full p-3 bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:border-[var(--navy-deep)] rounded-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Review & Confirmation */}
                {step === 4 && (
                  <div className="space-y-6">
                    <div>
                      <div className="section-label">STEP 4 OF 4</div>
                      <h2 className="text-xl md:text-2xl font-bold font-serif text-[var(--navy-deep)]">
                        Review Application & Confirm
                      </h2>
                    </div>

                    {/* Summary Card */}
                    <div className="bg-[var(--sand)]/50 p-6 border border-gray-200 space-y-4 rounded-none text-xs md:text-sm">
                      <div className="flex justify-between py-1.5 border-b border-gray-200">
                        <span className="text-gray-500">Student Name</span>
                        <span className="font-bold text-[var(--navy-deep)]">{data.name}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-gray-200">
                        <span className="text-gray-500">Date of Birth & Gender</span>
                        <span className="font-bold text-gray-800">
                          {data.dob} ({data.gender})
                        </span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-gray-200">
                        <span className="text-gray-500">Grade Applying For</span>
                        <span className="font-bold text-[var(--gold)]">{data.grade}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-gray-200">
                        <span className="text-gray-500">Parent Name & Contact</span>
                        <span className="font-bold text-gray-800">
                          {data.parentName} ({data.phone})
                        </span>
                      </div>
                      <div className="flex justify-between py-1.5">
                        <span className="text-gray-500">Previous School</span>
                        <span className="font-bold text-gray-800">{data.previousSchool}</span>
                      </div>
                    </div>

                    {/* Declaration Checkbox */}
                    <div className="pt-4">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={data.declaration || false}
                          onChange={(e) => handleChange('declaration', e.target.checked)}
                          className="mt-1 h-4 w-4 text-[var(--navy-deep)] focus:ring-[var(--gold)] border-gray-300 rounded-none"
                        />
                        <span className="text-xs text-gray-700 font-normal leading-relaxed">
                          I hereby declare that all information provided in this application form is true and correct to the best of my knowledge. I agree to abide by Greenwood Academy’s rules and admission guidelines.
                        </span>
                      </label>
                      {errors.declaration && (
                        <p className="mt-1 text-xs text-red-600">{errors.declaration}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Form Buttons Footer */}
                <div className="pt-6 border-t border-gray-200 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={step === 1}
                    className={`inline-flex items-center gap-1.5 px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-none transition-colors ${
                      step === 1
                        ? 'opacity-40 cursor-not-allowed border border-gray-200 text-gray-400'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <ArrowLeft size={15} />
                    <span>Back</span>
                  </button>

                  {step < 4 && (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="inline-flex items-center gap-2 bg-[var(--navy-deep)] !text-white px-7 py-3 font-bold text-xs uppercase tracking-wider hover:bg-[var(--gold)] transition-colors rounded-none"
                    >
                      <span className="!text-white text-white">Next Step</span>
                      <ArrowRight size={15} className="!text-white text-white" />
                    </button>
                  )}

                  {step === 4 && (
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-2 bg-[var(--gold)] text-white px-8 py-3.5 font-bold text-xs uppercase tracking-wider hover:bg-amber-600 transition-colors shadow-md rounded-none"
                    >
                      <span>{submitting ? 'Submitting Application...' : 'Submit Application'}</span>
                      <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </form>
            )}
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
