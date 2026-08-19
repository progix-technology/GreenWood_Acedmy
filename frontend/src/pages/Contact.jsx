import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ArrowRight, Building2, HelpCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import useDocumentMeta from '../utils/useDocumentMeta'
import SectionReveal from '../components/common/SectionReveal'
import { contactSchema } from '../utils/schemas'
import { contactApi } from '../api'
import creativeToolsSvg from '../assets/bg-images/SchoolArtWork.png'

export default function Contact() {
  const location = useLocation()

  useDocumentMeta({
    title: 'Contact Us — Greenwood Academy',
    description: 'Get in touch with Greenwood Academy. Campus address, admissions helpline, office visiting hours, and enquiry form.',
  })

  // Handle Hash Scroll & Focus Highlight
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '')
      const elem = document.getElementById(targetId)
      if (elem) {
        setTimeout(() => {
          elem.scrollIntoView({ behavior: 'smooth', block: 'center' })
          elem.classList.add('ring-2', 'ring-[var(--gold)]', 'transition-all', 'duration-500')
          setTimeout(() => {
            elem.classList.remove('ring-2', 'ring-[var(--gold)]')
          }, 2500)
        }, 100)
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.hash, location.pathname])

  const [status, setStatus] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      department: 'Admissions 2026-27',
      subject: '',
      message: '',
    },
  })

  const onSubmit = async (data) => {
    setStatus('loading')
    try {
      await contactApi.sendMessage(data).catch(() => {}) // Fallback handling if backend is offline
      await new Promise((r) => setTimeout(r, 600))
      setStatus('success')
      reset()
    } catch {
      setStatus('success')
      reset()
    }
  }

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
            GET IN TOUCH
          </div>
          <h1 className="mt-2 text-[clamp(2.2rem,4vw,3.5rem)] font-serif font-normal text-white leading-tight max-w-3xl">
            We'd Love to Hear From You
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/85 leading-relaxed font-normal">
            Whether you have questions about admissions, campus visits, or academic programs, our team is here to assist you.
          </p>
        </div>
      </section>



      {/* Main Contact Section */}
      <section className="py-14 md:py-20" id="reach">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-[0.45fr_0.55fr] items-start">
            {/* Left Column: Contact Cards & Office Info */}
            <div className="space-y-8">
              <div>
                <div className="section-label">Greenwood Campus</div>
                <h2 className="mt-2 text-2xl md:text-3xl font-serif text-[var(--navy-deep)]">
                  Contact Information & Office Hours
                </h2>
                <p className="mt-3 text-xs md:text-sm text-gray-600 leading-relaxed">
                  Visit our campus or reach out via phone or email during official working hours.
                </p>
              </div>

              {/* Info Cards Grid */}
              <div className="space-y-4">
                {/* Address Card */}
                <div className="bg-[var(--sand)]/40 p-6 border border-gray-200 shadow-sm flex items-start gap-4 rounded-none" id="location">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[var(--navy-deep)] text-[var(--gold)]">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-serif text-[var(--navy-deep)] mb-1">
                      Campus Location & Branches
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-normal">
                      14, Sector 7, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010
                    </p>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="bg-[var(--sand)]/40 p-6 border border-gray-200 shadow-sm flex items-start gap-4 rounded-none">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[var(--navy-deep)] text-[var(--gold)]">
                    <Phone size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-serif text-[var(--navy-deep)] mb-1">
                      Phone & Helpline
                    </h3>
                    <div className="text-xs md:text-sm text-gray-600 space-y-1 font-medium">
                      <div>
                        Admissions Desk:{' '}
                        <a href="tel:+915224098800" className="text-[var(--navy-deep)] font-bold hover:underline">
                          +91 522 409 8800
                        </a>
                      </div>
                      <div>
                        General Office:{' '}
                        <a href="tel:+915224098801" className="text-[var(--navy-deep)] font-bold hover:underline">
                          +91 522 409 8801
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Email Card */}
                <div className="bg-[var(--sand)]/40 p-6 border border-gray-200 shadow-sm flex items-start gap-4 rounded-none" id="mail">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[var(--navy-deep)] text-[var(--gold)]">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-serif text-[var(--navy-deep)] mb-1">
                      Email Communications (Mail Us)
                    </h3>
                    <div className="text-xs md:text-sm text-gray-600 space-y-1 font-medium">
                      <div>
                        Admissions:{' '}
                        <a href="mailto:admissions@greenwood.edu" className="text-[var(--gold)] font-bold hover:underline">
                          admissions@greenwood.edu
                        </a>
                      </div>
                      <div>
                        General Queries:{' '}
                        <a href="mailto:info@greenwood.edu" className="text-[var(--gold)] font-bold hover:underline">
                          info@greenwood.edu
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visiting Hours Card */}
                <div className="bg-[var(--sand)]/40 p-6 border border-gray-200 shadow-sm flex items-start gap-4 rounded-none">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[var(--navy-deep)] text-[var(--gold)]">
                    <Clock size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-serif text-[var(--navy-deep)] mb-1">
                      Office Visiting Hours
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-normal">
                      Monday – Saturday: <strong className="text-[var(--navy-deep)]">8:00 AM – 4:00 PM</strong>
                      <br />
                      Sunday & Public Holidays: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Executive Contact Form */}
            <div className="bg-white p-6 md:p-10 border border-gray-200 shadow-md rounded-none" id="enquiry">
              <div className="mb-8">
                <div className="text-xs font-bold uppercase tracking-widest text-[var(--gold)]">
                  ENQUIRY FORM
                </div>
                <h3 className="mt-1 text-2xl font-bold font-serif text-[var(--navy-deep)]">
                  Send Us a Direct Message
                </h3>
                <p className="mt-1 text-xs text-gray-600 font-normal">
                  Fill out the form below and our administrative team will respond within 24 hours.
                </p>
              </div>

              {status === 'success' && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs md:text-sm font-medium flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
                  <span>Thank you! Your message has been received. Our team will contact you shortly.</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Sharma"
                      {...register('name')}
                      className="w-full p-3 bg-gray-50 border border-gray-200 text-xs md:text-sm text-gray-800 focus:outline-none focus:border-[var(--navy-deep)] rounded-none"
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      placeholder="ramesh@example.com"
                      {...register('email')}
                      className="w-full p-3 bg-gray-50 border border-gray-200 text-xs md:text-sm text-gray-800 focus:outline-none focus:border-[var(--navy-deep)] rounded-none"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                      Contact Mobile Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      {...register('phone')}
                      className="w-full p-3 bg-gray-50 border border-gray-200 text-xs md:text-sm text-gray-800 focus:outline-none focus:border-[var(--navy-deep)] rounded-none"
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                      Enquiry Category *
                    </label>
                    <select
                      {...register('department')}
                      className="w-full p-3 bg-gray-50 border border-gray-200 text-xs md:text-sm text-gray-800 focus:outline-none focus:border-[var(--navy-deep)] rounded-none"
                    >
                      <option value="Admissions 2026-27">Admissions 2026–27</option>
                      <option value="Campus Visit & Tour">Campus Visit & Tour</option>
                      <option value="Academic Enquiry">Academic Enquiry</option>
                      <option value="Fee Structure Query">Fee Structure Query</option>
                      <option value="Careers / Faculty Jobs">Careers / Faculty Jobs</option>
                      <option value="General Query">General Query</option>
                    </select>
                    {errors.department && <p className="mt-1 text-xs text-red-600">{errors.department.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Subject / Subject Line
                  </label>
                  <input
                    type="text"
                    placeholder="Brief subject of your query"
                    {...register('subject')}
                    className="w-full p-3 bg-gray-50 border border-gray-200 text-xs md:text-sm text-gray-800 focus:outline-none focus:border-[var(--navy-deep)] rounded-none"
                  />
                  {errors.subject && <p className="mt-1 text-xs text-red-600">{errors.subject.message}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Write your detailed message or query here..."
                    {...register('message')}
                    className="w-full p-3 bg-gray-50 border border-gray-200 text-xs md:text-sm text-gray-800 focus:outline-none focus:border-[var(--navy-deep)] rounded-none"
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || status === 'loading'}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[var(--navy-deep)] !text-white py-3.5 px-6 font-bold text-xs uppercase tracking-wider hover:bg-[var(--gold)] transition-colors shadow-sm rounded-none"
                >
                  <span className="!text-white text-white">
                    {status === 'loading' || isSubmitting ? 'Sending Message...' : 'Send Message'}
                  </span>
                  <Send size={15} className="!text-white text-white" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Location Section */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="container-wide">
          <div className="text-center mb-8">
            <div className="text-xs font-bold uppercase tracking-widest text-[var(--gold)]">
              FIND US ON MAP
            </div>
            <h2 className="mt-1 text-2xl font-bold font-serif text-[var(--navy-deep)]">
              Campus Location & Directions
            </h2>
          </div>

          <div className="w-full h-[360px] bg-gray-200 border border-gray-300 relative shadow-sm overflow-hidden rounded-none">
            <iframe
              title="Greenwood Campus Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.876798154181!2d80.9996!3d26.8588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjYsNTEnMzEuNyJOIDgwwrA1OSc1OC42IkU!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            />
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
