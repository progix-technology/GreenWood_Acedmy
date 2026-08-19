import React from 'react'
import { Link } from 'react-router-dom'
import academics from '../data/academics'

export default function Academics(){
  return (
    <div className="container-wide py-16">
      <h1 className="text-2xl font-semibold">A Curriculum for Every Stage of Growth</h1>
      <div className="mt-6 grid md:grid-cols-4 gap-6">
        {academics.map(a=> (
          <div key={a.key} className="bg-white rounded shadow-sm overflow-hidden">
            <div className="h-36 bg-gray-100" />
            <div className="p-4">
              <div className="text-sm text-amber-700">{a.category}</div>
              <h3 className="font-semibold mt-1">{a.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{a.description}</p>
              <div className="mt-3"><Link to={`/academics/${a.key}`} className="text-amber-700">Learn more →</Link></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
