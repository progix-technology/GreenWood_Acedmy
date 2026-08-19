import React from 'react'
import { useAuth } from '../context/AuthContext'
import { LogOut, ShieldCheck, Users, FileText, Calendar, LayoutDashboard } from 'lucide-react'

export default function AdminDashboard() {
  const { admin, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 text-[var(--navy-deep)]">
      {/* Top Admin Header */}
      <header className="bg-[var(--navy-deep)] text-white py-4 px-6 md:px-10 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded bg-[var(--gold)] text-white font-bold">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h1 className="text-base font-bold font-serif leading-tight">Greenwood Admin Panel</h1>
            <p className="text-[11px] text-[var(--gold)] font-medium">Welcome back, {admin?.name || 'Administrator'}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 text-xs font-bold transition-colors border border-white/20"
        >
          <LogOut size={14} />
          <span>Logout</span>
        </button>
      </header>

      {/* Main Dashboard Body */}
      <main className="container-wide py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold font-serif text-[var(--navy-deep)]">System Overview</h2>
          <p className="text-xs text-gray-500">Manage admissions applications, events, news, and faculty records.</p>
        </div>

        {/* Overview Stats Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          <div className="bg-white p-6 border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">New Applications</div>
              <div className="text-2xl font-serif font-bold text-[var(--navy-deep)] mt-1">42</div>
            </div>
            <div className="p-3 bg-[var(--sand)] text-[var(--navy-deep)]">
              <FileText size={24} />
            </div>
          </div>

          <div className="bg-white p-6 border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Faculty</div>
              <div className="text-2xl font-serif font-bold text-[var(--navy-deep)] mt-1">48</div>
            </div>
            <div className="p-3 bg-[var(--sand)] text-[var(--navy-deep)]">
              <Users size={24} />
            </div>
          </div>

          <div className="bg-white p-6 border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Upcoming Events</div>
              <div className="text-2xl font-serif font-bold text-[var(--navy-deep)] mt-1">6</div>
            </div>
            <div className="p-3 bg-[var(--sand)] text-[var(--navy-deep)]">
              <Calendar size={24} />
            </div>
          </div>

          <div className="bg-white p-6 border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">System Status</div>
              <div className="text-xs font-bold text-emerald-600 mt-2 bg-emerald-50 px-2 py-1 inline-block">
                ● Operational
              </div>
            </div>
            <div className="p-3 bg-[var(--sand)] text-[var(--navy-deep)]">
              <LayoutDashboard size={24} />
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-white p-8 border border-gray-200 shadow-sm text-left">
          <h3 className="text-lg font-bold font-serif text-[var(--navy-deep)] mb-2">
            Administrator Authentication Active
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed max-w-2xl">
            You are securely logged into the Greenwood Academy backend portal via JWT token authentication.
          </p>
        </div>
      </main>
    </div>
  )
}
