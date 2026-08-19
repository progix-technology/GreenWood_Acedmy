import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound(){
  return (
    <div className="container-wide py-24 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-4">Page not found.</p>
      <div className="mt-6"><Link to="/" className="text-amber-700">Return home →</Link></div>
    </div>
  )
}
