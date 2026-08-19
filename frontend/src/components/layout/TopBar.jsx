import React from 'react'
import { Link } from 'react-router-dom'
import { User } from 'lucide-react'

export default function TopBar() {
  return (
    <div className="bg-[var(--navy-deep)] text-white text-[13px] border-b border-white/10 px-4 sm:px-8">
      <div className="flex h-10 items-center justify-between gap-4 w-full">
        <div className="hidden sm:flex items-center gap-3 text-[12px] text-[rgba(247,243,234,0.85)] font-medium">
          <span className="text-[var(--gold)]">◉</span>
          <span>CBSE Affiliated</span>
          <span>•</span>
          <span>Est. 1998</span>
          <span>•</span>
          <span>Lucknow</span>
        </div>
        <div className="flex items-center gap-4 text-[12px]">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-white hover:text-[var(--gold)] transition-colors py-1 text-[12px] font-semibold"
          >
            <User size={14} className="!text-white text-white" />
            <span className="!text-white text-white">Login</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
