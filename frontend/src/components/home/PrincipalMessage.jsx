import React from 'react'

export default function PrincipalMessage() {
  return (
    <section className="section-shell">
      <div className="container-wide card-surface overflow-hidden">
        <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="min-h-72 bg-[linear-gradient(135deg,#cdd8e6,#f5efe6)] p-8 flex items-end">
            <div className="rounded-2xl bg-[var(--navy)] px-4 py-3 text-white shadow-lg">
              <div className="text-sm font-semibold">Dr. Sarah Bennett</div>
              <div className="text-xs text-white/70">Principal</div>
            </div>
          </div>
          <div className="p-8 md:p-10">
            <div className="section-label">Leadership</div>
            <h2 className="mt-3 text-4xl text-[var(--navy-deep)]">A Message from Our Principal</h2>
            <p className="mt-5 leading-8 text-[var(--navy-deep)]/78">
              Welcome to Greenwood School. We take pride in fostering a balanced education that values character as
              much as academic achievement. Our staff are dedicated to guiding students to become thoughtful,
              responsible, and curious citizens.
            </p>
            <p className="mt-4 leading-8 text-[var(--navy-deep)]/78">
              The result should be a calm, disciplined, and ambitious environment where children can grow with
              confidence.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
