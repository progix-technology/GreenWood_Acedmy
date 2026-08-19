import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import news from '../../data/news'
import events from '../../data/events'
import faculty from '../../data/faculty'
import academics from '../../data/academics'
import faqs from '../../data/faqs'
import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'

export default function SearchOverlay(){
  const [open,setOpen] = useState(false)
  const [q,setQ] = useState('')
  const navigate = useNavigate()

  useEffect(()=>{
    function onKey(e){
      if((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='k') { e.preventDefault(); setOpen(o=>!o); }
      if(e.key==='/' && document.activeElement.tagName!=='INPUT' && document.activeElement.tagName!=='TEXTAREA'){ e.preventDefault(); setOpen(true); }
    }
    function onOpen(){ setOpen(true) }
    window.addEventListener('keydown', onKey)
    window.addEventListener('open-search', onOpen)
    return ()=>{ window.removeEventListener('keydown', onKey); window.removeEventListener('open-search', onOpen) }
  },[])

  useEffect(()=>{
    function onEsc(e){ if(e.key==='Escape') setOpen(false) }
    if(open) window.addEventListener('keydown', onEsc)
    return ()=> window.removeEventListener('keydown', onEsc)
  },[open])

  const pages = [
    {title:'Home', path:'/'},
    {title:'About', path:'/about'},
    {title:'Admissions', path:'/admissions'},
    {title:'Academics', path:'/academics'},
    {title:'News', path:'/news'},
    {title:'Events', path:'/events'},
    {title:'Faculty', path:'/faculty'},
    {title:'Contact', path:'/contact'},
  ]

  const results = React.useMemo(()=>{
    if(!q) return []
    const term = q.toLowerCase()
    const r = []
    // pages (high priority)
    pages.forEach(p=>{ if(p.title.toLowerCase().includes(term)) r.push({type:'Page', title:p.title, path:p.path}) })
    // news
    news.forEach(n=>{ if((n.title+n.excerpt).toLowerCase().includes(term)) r.push({type:'News', title:n.title, path:`/news/${n.slug}`}) })
    // events
    events.forEach(e=>{ if((e.title+e.description).toLowerCase().includes(term)) r.push({type:'Event', title:e.title, path:`/events/${e.slug}`}) })
    // faculty
    faculty.forEach(f=>{ if((f.name+f.role).toLowerCase().includes(term)) r.push({type:'Faculty', title:f.name, path:`/faculty/${f.id}`}) })
    // academics
    academics.forEach(a=>{ if((a.title+a.description).toLowerCase().includes(term)) r.push({type:'Academic', title:a.title, path:`/academics/${a.key}`}) })
    // faqs
    faqs.forEach(f=>{ if((f.q+f.a).toLowerCase().includes(term)) r.push({type:'FAQ', title:f.q, path:'/faq'}) })
    return r
  },[q])

  const grouped = React.useMemo(()=>{
    const order = ['Page','News','Event','Faculty','Academic','FAQ']
    const map = new Map()
    results.forEach(r=>{
      if(!map.has(r.type)) map.set(r.type, [])
      if(map.get(r.type).length < 4) map.get(r.type).push(r)
    })
    return order.map(k=> ({type:k, items: map.get(k) || []})).filter(g=>g.items.length>0)
  },[results])

  if(typeof document==='undefined') return null

  useEffect(()=>{
    function onKey(e){
      if(!open) return
      if(e.key==='Enter'){
        if(results.length>0){
          navigate(results[0].path)
          setOpen(false)
          setQ('')
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return ()=> window.removeEventListener('keydown', onKey)
  },[open,results])

  return createPortal(
    open? (
      <div className="fixed inset-0 z-50 bg-black/40 flex items-start md:items-center justify-center p-4">
        <div className="bg-white w-full max-w-2xl rounded shadow-lg p-4">
          <div className="flex items-center gap-3">
            <input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Search news, events, people, pages... (Ctrl/Cmd+K)" className="flex-1 p-3 border rounded" />
            <button onClick={()=>setOpen(false)} aria-label="Close" className="p-2"><X/></button>
          </div>
          <div className="mt-3">
            {q? (
              grouped.length? (
                <div className="space-y-4">
                  {grouped.map((g,gi)=> (
                    <div key={g.type}>
                      <div className="text-xs text-gray-500 uppercase mb-2">{g.type}</div>
                      <ul className="space-y-2">
                        {g.items.map((r,i)=> (
                          <li key={g.type+"-"+i}><button onClick={()=>{ navigate(r.path); setOpen(false); setQ('') }} className="w-full text-left p-2 hover:bg-gray-50 rounded"><div className="font-medium">{r.title}</div><div className="text-sm text-gray-500">{r.type}</div></button></li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : <div className="text-sm text-gray-500">No results</div>
            ) : (
              <div className="text-sm text-gray-500">Try searching for "open day", "science", "Dr." or "arts"</div>
            )}
          </div>
        </div>
      </div>
    ) : null,
    document.body
  )
}
