export const initialToppersData = [
  {
    id: 1,
    name: 'Aarav Sharma',
    class: 'Class 12',
    stream: 'Science (PCM)',
    percentage: '98.8%',
    rank: '1st School Topper',
    rankBadge: '1st Rank',
    year: '2025–26',
    image: 'https://res.cloudinary.com/dbp97xecb/image/upload/v1787223982/school_website/vsvbu0f88phyuaep2irt.png',
    quote: 'Greenwood teachers guided me at every step. Constant practice and doubt-solving sessions were key to my 98.8%.',
    achievements: ['100/100 in Mathematics', '100/100 in Physics', 'JEE Advanced Qualified (AIR 142)'],
    favoriteSubject: 'Physics & Applied Math',
  },
  {
    id: 2,
    name: 'Ananya Verma',
    class: 'Class 12',
    stream: 'Commerce',
    percentage: '98.4%',
    rank: 'Commerce Stream Topper',
    rankBadge: '2nd Rank',
    year: '2025–26',
    image: 'https://res.cloudinary.com/dbp97xecb/image/upload/v1787223964/school_website/n9hiur8sqhzygyxh6gv2.png',
    quote: 'The conceptual clarity provided by Greenwood Commerce faculty helped me secure top marks in Accountancy & Economics.',
    achievements: ['100/100 in Accountancy', '99/100 in Economics', 'CUET 100 Percentile'],
    favoriteSubject: 'Accountancy & Business Studies',
  },
  {
    id: 3,
    name: 'Rohan Srivastava',
    class: 'Class 12',
    stream: 'Science (PCB)',
    percentage: '97.8%',
    rank: 'Medical Stream Topper',
    rankBadge: '3rd Rank',
    year: '2025–26',
    image: 'https://res.cloudinary.com/dbp97xecb/image/upload/v1787223942/school_website/qa2i0roihqdq5mezdzy9.png',
    quote: 'State-of-the-art Biology labs and NEET prep modules at school allowed me to balance Board exams and competitive goals.',
    achievements: ['99/100 in Biology', 'NEET Score: 695/720', 'National Science Olympiad Gold'],
    favoriteSubject: 'Human Anatomy & Genetics',
  },
  {
    id: 4,
    name: 'Diya Kapoor',
    class: 'Class 10',
    stream: 'All-Rounder',
    percentage: '98.6%',
    rank: 'Class 10 School Topper',
    rankBadge: '1st Rank (Class 10)',
    year: '2025–26',
    image: 'https://res.cloudinary.com/dbp97xecb/image/upload/v1787228570/Screenshot_2026-08-20_172729_c0ms98.png',
    quote: 'Regular internal tests and continuous guidance from our class teachers boosted my confidence for Class 10 Boards.',
    achievements: ['100/100 in Mathematics', '100/100 in Social Science', 'Inter-School Debate Winner'],
    favoriteSubject: 'Mathematics & English',
  },
  {
    id: 5,
    name: 'Ishaan Gupta',
    class: 'Class 12',
    stream: 'Humanities',
    percentage: '97.4%',
    rank: 'Humanities Stream Topper',
    rankBadge: 'Stream Topper',
    year: '2025–26',
    image: 'https://res.cloudinary.com/dbp97xecb/image/upload/v1787228542/download_a1zv4r.png',
    quote: 'The literary atmosphere and Model UN debates at Greenwood shaped my analytical writing for Political Science & History.',
    achievements: ['100/100 in History', '98/100 in Political Science', 'Best Delegate MUN 2025'],
    favoriteSubject: 'Political Science & International Relations',
  },
  {
    id: 6,
    name: 'Kavya Pandey',
    class: 'Class 10',
    stream: 'All-Rounder',
    percentage: '97.8%',
    rank: 'Class 10 2nd Topper',
    rankBadge: '2nd Rank (Class 10)',
    year: '2025–26',
    image: 'https://res.cloudinary.com/dbp97xecb/image/upload/v1787228551/download_2_ynu9so.png',
    quote: 'Balanced focus on academics, sports, and daily revision helped me achieve 97.8% without stress.',
    achievements: ['99/100 in Science', 'State Level Swimming Medalist'],
    favoriteSubject: 'Science & Computer Applications',
  },
]

const LOCAL_STORAGE_KEY = 'greenwood_board_toppers'

export const getToppers = () => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed)) {
        return parsed
      }
    }
  } catch (err) {
    console.error('Failed to load toppers from localStorage:', err)
  }
  return initialToppersData
}

export const resetToppersData = () => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialToppersData))
    window.dispatchEvent(new Event('toppersUpdated'))
    saveToppers(initialToppersData)
  } catch (err) {
    console.error('Failed to reset toppers:', err)
  }
  return initialToppersData
}

export const saveToppers = (toppers) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(toppers))
    window.dispatchEvent(new Event('toppersUpdated'))

    // Sync live to Render backend MongoDB server
    const apiUrl = import.meta.env.VITE_API_URL || 'https://greenwood-acedmy.onrender.com/api'
    fetch(`${apiUrl}/toppers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(toppers),
    }).catch(() => {})
  } catch (err) {
    console.error('Failed to save toppers to localStorage:', err)
  }
}

export const syncToppersFromApi = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'https://greenwood-acedmy.onrender.com/api'
    const res = await fetch(`${apiUrl}/toppers`)
    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data)) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
        window.dispatchEvent(new Event('toppersUpdated'))
        return data
      }
    }
  } catch (err) {
    console.error('Failed to sync toppers from API:', err)
  }
  return null
}

if (typeof window !== 'undefined') {
  syncToppersFromApi()
}

export default getToppers()
