import React from 'react'
import { Vortex } from 'react-loader-spinner'

export default function PageSpinner() {
  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center px-4 text-center text-[var(--navy-deep)]">
      <Vortex
        visible={true}
        height="90"
        width="90"
        ariaLabel="vortex-loading"
        wrapperStyle={{}}
        wrapperClass="vortex-wrapper"
        colors={['#0F2044', '#D97706', '#ea580c', '#0F2044', '#D97706', '#ea580c']}
      />
      <h3 className="mt-4 text-sm font-bold uppercase tracking-widest text-[var(--navy-deep)]">
        Connecting to Greenwood Academy
      </h3>
      <p className="mt-2 text-xs text-gray-500 max-w-sm leading-relaxed font-normal">
        Loading resources... If page takes longer than usual, please check your internet connection.
      </p>
    </div>
  )
}
