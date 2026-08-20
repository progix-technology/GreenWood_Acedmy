export const initialToppersData = [
  {
    "id": 2,
    "name": "Ananya Verma",
    "class": "Class 12",
    "stream": "Commerce",
    "percentage": "98.4%",
    "rank": "Commerce Stream Topper",
    "rankBadge": "2nd Rank",
    "year": "2025–26",
    "image": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    "quote": "The conceptual clarity provided by Greenwood Commerce faculty helped me secure top marks in Accountancy & Economics.",
    "achievements": [
      "100/100 in Accountancy",
      "99/100 in Economics",
      "CUET 100 Percentile"
    ],
    "favoriteSubject": "Accountancy & Business Studies"
  },
  {
    "id": 3,
    "name": "Rohan Srivastava",
    "class": "Class 12",
    "stream": "Science (PCB)",
    "percentage": "97.8%",
    "rank": "Medical Stream Topper",
    "rankBadge": "3rd Rank",
    "year": "2025–26",
    "image": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
    "quote": "State-of-the-art Biology labs and NEET prep modules at school allowed me to balance Board exams and competitive goals.",
    "achievements": [
      "99/100 in Biology",
      "NEET Score: 695/720",
      "National Science Olympiad Gold"
    ],
    "favoriteSubject": "Human Anatomy & Genetics"
  }
]

const LOCAL_STORAGE_KEY = 'greenwood_board_toppers'

export const getToppers = () => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (err) {
    console.error('Failed to load toppers from localStorage:', err)
  }
  return initialToppersData
}

export const saveToppers = (toppers) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(toppers))
    window.dispatchEvent(new Event('toppersUpdated'))

    // Sync live to backend MongoDB server if active
    fetch('http://localhost:5000/api/toppers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(toppers),
    }).catch(() => {})
  } catch (err) {
    console.error('Failed to save toppers to localStorage:', err)
  }
}

export default getToppers()
