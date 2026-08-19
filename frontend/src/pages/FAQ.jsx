import React, { useState } from 'react'
import faqs from '../data/faqs'
import useDocumentMeta from '../utils/useDocumentMeta'

export default function FAQ(){
  useDocumentMeta({title:'FAQ', description:'Frequently asked questions about admissions, campus and student life at Greenwood School.'})
  const [open,setOpen] = useState(null)
  return (
    <div className="container-wide py-16">
      <h1 className="text-2xl font-semibold">Frequently Asked Questions</h1>
      <div className="mt-6 space-y-3">
        {faqs.map((f,i)=> (
          <div key={i} className="bg-white p-4 rounded shadow-sm">
            <button onClick={()=>setOpen(open===i?null:i)} className="w-full text-left flex justify-between items-center">
              <div className="font-semibold">{f.q}</div>
              <div>{open===i? '-':'+'}</div>
            </button>
            {open===i && <div className="mt-3 text-gray-600">{f.a}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
