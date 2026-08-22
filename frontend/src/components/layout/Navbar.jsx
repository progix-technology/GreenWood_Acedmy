import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ChevronDown, Menu, Search, X } from 'lucide-react'
import schoolLogo from '../../assets/images/school_website_logo.png'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileOpenMenu, setMobileOpenMenu] = useState({})

  const toggleMobileMenu = (label) => {
    setMobileOpenMenu((prev) => ({
      ...prev,
      [label]: !prev[label],
    }))
  }

  const navData = [
    {
      label: 'About',
      to: '/about',
      children: [
        { label: 'Our Story', to: '/about/story' },
        { label: "Principal's Message", to: '/about/principal' },
        { label: 'Vision & Values', to: '/about/vision' },
        { label: 'Campus Facilities', to: '/facilities' },
      ],
    },
    {
      label: 'Academics',
      to: '/academics',
      children: [
        { label: 'Early Years', to: '/academics/early-years' },
        { label: 'Primary School', to: '/academics/primary' },
        { label: 'Middle School', to: '/academics/middle' },
        { label: 'Senior School', to: '/academics/senior' },
        { label: 'Board Toppers', to: '/board-toppers' },
      ],
    },
    {
      label: 'Admissions',
      to: '/admissions',
      children: [
        { label: 'Admission Process', to: '/admissions#process' },
        { label: 'Fee Structure', to: '/admissions#fees' },
        { label: 'Minimum Attendance', to: '/admissions#attendance' },
        { label: 'School Uniform', to: '/admissions#uniform' },
        { label: 'Examinations', to: '/admissions#examinations' },
        { label: 'Co-Curricular Activities', to: '/admissions#cocurricular' },
        { label: 'Curriculum', to: '/admissions#curriculum' },
        { label: 'Counselling', to: '/admissions#counselling' },
        { label: 'Scholarship', to: '/admissions#scholarship' },
      ],
    },
    { label: 'Campus Life', to: '/campus-life' },
    { label: 'Faculty', to: '/faculty' },
    {
      label: 'News & Events',
      to: '/news',
      children: [
        { label: 'Latest News', to: '/news' },
        { label: 'Events', to: '/events' },
        { label: 'Gallery', to: '/gallery' },
        { label: 'Digital Magazine (3D)', to: '/magazine' },
      ],
    },
    {
      label: 'Contact',
      to: '/contact',
      children: [
        { label: 'Mail Us', to: '/contact#mail' },
        { label: 'Reach Us', to: '/contact#reach' },
        { label: 'Join Us', to: '/admissions/apply' },
        { label: 'Write Us', to: '/contact#enquiry' },
        { label: 'Site Map', to: '/legal/sitemap' },
        { label: 'Our Branches', to: '/contact#location' },
        { label: 'Enquiry', to: '/contact#enquiry' },
      ],
    },
  ]

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[var(--border)] py-1">
      <div className="container-wide">
        <div className="flex h-[58px] items-center justify-between gap-4">
          {/* School Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 pr-2">
            <img
              src={schoolLogo}
              alt="Greenwood Academy Logo"
              className="h-11 w-auto object-contain shrink-0"
            />
            <div className="leading-tight">
              <div className="text-[19px] font-bold text-[var(--navy-deep)] tracking-tight">
                Greenwood Academy
              </div>
              <div className="text-[9px] tracking-[0.2em] uppercase text-gray-500 font-bold">
                Est. 1998, Lucknow
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-6">
            {navData.map((item) => {
              const hasDropdown = item.children && item.children.length > 0
              const isOpen = activeDropdown === item.label

              if (!hasDropdown) {
                return (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    className={({ isActive }) =>
                      `px-1 py-2 text-[14px] font-semibold transition-colors ${
                        isActive
                          ? 'text-[var(--navy-deep)] font-bold'
                          : 'text-[rgba(23,38,58,0.85)] hover:text-[var(--navy-deep)]'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                )
              }

              return (
                <div
                  key={item.label}
                  className="relative py-2 group"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `inline-flex items-center gap-1 px-1 py-2 text-[14px] font-semibold transition-colors ${
                        isActive || isOpen
                          ? 'text-[var(--navy-deep)] font-bold'
                          : 'text-[rgba(23,38,58,0.85)] hover:text-[var(--navy-deep)]'
                      }`
                    }
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      size={14}
                      className={`text-gray-500 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[var(--navy-deep)]' : ''
                      }`}
                    />
                  </NavLink>

                  {/* Dropdown Menu (Lighter Navy Background & White Text) */}
                  <div
                    className={`absolute top-full left-0 min-w-[220px] bg-[#1C3564] shadow-2xl border border-white/20 transition-all duration-200 z-50 overflow-hidden ${
                      isOpen
                        ? 'opacity-100 visible translate-y-0'
                        : 'opacity-0 invisible translate-y-2'
                    }`}
                  >
                    {item.children.map((sub) => (
                      <Link
                        key={sub.label}
                        to={sub.to}
                        onClick={() => setActiveDropdown(null)}
                        className="block px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest !text-white text-white transition-colors hover:bg-[var(--gold)] hover:!text-[var(--navy-deep)] border-b border-white/15 last:border-b-0"
                      >
                        <span className="!text-white text-white">{sub.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('open-search'))}
              aria-label="Search"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition-colors hover:bg-gray-100"
            >
              <Search size={20} strokeWidth={2.5} />
            </button>
            <Link
              to="/admissions/apply"
              className="hidden sm:inline-flex h-[42px] items-center justify-center rounded-none bg-[var(--navy-deep)] px-6 text-[14px] font-bold !text-white shadow-sm"
            >
              <span className="!text-white text-white">Apply Now</span>
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--navy-deep)] xl:hidden hover:bg-gray-50"
              onClick={() => setOpen((value) => !value)}
              aria-label="menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`xl:hidden overflow-hidden bg-white transition-all duration-300 ${
          open ? 'max-h-[600px] border-t border-[var(--border)]' : 'max-h-0'
        }`}
      >
        <div className="container-wide py-4">
          <div className="grid gap-1">
            {navData.map((item) => {
              const hasDropdown = item.children && item.children.length > 0
              const isSubOpen = !!mobileOpenMenu[item.label]

              if (!hasDropdown) {
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-4 py-2 text-[15px] font-semibold text-[var(--navy-deep)] hover:bg-gray-50 transition-colors"
                  >
                    {item.label}
                  </Link>
                )
              }

              return (
                <div key={item.label}>
                  <button
                    type="button"
                    onClick={() => toggleMobileMenu(item.label)}
                    className="w-full flex items-center justify-between rounded-lg px-4 py-2 text-[15px] font-semibold text-[var(--navy-deep)] hover:bg-gray-50 transition-colors"
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        isSubOpen ? 'rotate-180 text-[var(--gold)]' : ''
                      }`}
                    />
                  </button>
                  {isSubOpen && (
                    <div className="ml-4 border-l-2 border-[var(--gold)]/40 pl-3 py-1 grid gap-1">
                      {item.children.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.to}
                          onClick={() => setOpen(false)}
                          className="rounded-md px-3 py-1.5 text-[14px] font-medium text-gray-700 hover:text-[var(--navy-deep)] hover:bg-gray-50 transition-colors block"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
            <Link
              to="/admissions/apply"
              onClick={() => setOpen(false)}
              className="mt-2 flex h-11 items-center justify-center rounded-none bg-[var(--navy-deep)] text-[14px] font-bold !text-white"
            >
              <span className="!text-white text-white">Apply Now</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
