const defaultFacultyData = [
  {
    id: 1,
    name: 'Dr. Sarah Bennett',
    role: 'Principal & Head of School',
    department: 'Leadership',
    qualification: 'Ph.D. in Educational Leadership (Oxford University)',
    experience: '22+ Years in Academic Leadership',
    image: null,
    bio: 'Dr. Bennett has led Greenwood since 2015 with a focus on holistic development, academic innovation, and international educational standards.',
    email: 'principal@greenwood.edu',
  },
  {
    id: 2,
    name: 'Mr. James Carter',
    role: 'Head of Science & Physics Lead',
    department: 'Science & STEM',
    qualification: 'M.Sc. Physics (IIT Delhi)',
    experience: '16+ Years Teaching Physics',
    image: null,
    bio: 'James leads the Science Department, mentoring student research projects, Olympiad teams, and practical physics experimentation in our advanced labs.',
    email: 'j.carter@greenwood.edu',
  },
  {
    id: 3,
    name: 'Mrs. Ananya Sharma',
    role: 'Head of English & Humanities',
    department: 'Humanities & Languages',
    qualification: 'M.A. English Literature (DU), B.Ed.',
    experience: '14+ Years Teaching Literature',
    image: null,
    bio: 'Ananya fosters a love for classical literature, analytical writing, and debate, leading Greenwood’s literary society and annual inter-school Model UN.',
    email: 'a.sharma@greenwood.edu',
  },
  {
    id: 4,
    name: 'Mr. Rajesh Verma',
    role: 'Head of Mathematics & Coding',
    department: 'Mathematics & Computer Science',
    qualification: 'M.Tech Computer Science (BITS Pilani)',
    experience: '15+ Years in STEM Education',
    image: null,
    bio: 'Rajesh specializes in advanced calculus, competitive programming, and robotics, guiding students to national achievements in STEM competitions.',
    email: 'r.verma@greenwood.edu',
  },
  {
    id: 5,
    name: 'Dr. Meera Nambiar',
    role: 'Head of Early Years & Primary Wing',
    department: 'Primary & Early Years',
    qualification: 'Ph.D. in Child Psychology & Early Childhood Care',
    experience: '18+ Years in Early Education',
    image: null,
    bio: 'Dr. Nambiar oversees our Early Years and Primary curricula, ensuring activity-based, nurturing, and child-centered learning environments.',
    email: 'm.nambiar@greenwood.edu',
  },
  {
    id: 6,
    name: 'Coach Vikram Singh',
    role: 'Director of Physical Education & Sports',
    department: 'Sports & Athletics',
    qualification: 'M.P.Ed. (NIS Certified Athletics Coach)',
    experience: '12+ Years Coaching National Athletes',
    image: null,
    bio: 'Vikram manages our state-of-the-art sports facilities, training student teams in football, cricket, basketball, track and field, and martial arts.',
    email: 'v.singh@greenwood.edu',
  },
]

export const getFacultyList = () => {
  try {
    const stored = localStorage.getItem('greenwood_faculty_list')
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (err) {
    console.error('Error reading faculty from localStorage:', err)
  }
  return defaultFacultyData
}

export const saveFacultyList = (faculty) => {
  try {
    localStorage.setItem('greenwood_faculty_list', JSON.stringify(faculty))
    window.dispatchEvent(new Event('facultyUpdated'))

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
    fetch(`${apiUrl}/faculty`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(faculty),
    }).catch(() => {})
  } catch (err) {
    console.error('Error saving faculty to localStorage:', err)
  }
}

export const syncFacultyFromApi = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || (typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:5000/api' : '/api')
    const res = await fetch(`${apiUrl}/faculty`)
    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data) && data.length > 0) {
        localStorage.setItem('greenwood_faculty_list', JSON.stringify(data))
        window.dispatchEvent(new Event('facultyUpdated'))
        return data
      }
    }
  } catch (err) {
    console.error('Failed to sync faculty from API:', err)
  }
  return null
}

if (typeof window !== 'undefined') {
  syncFacultyFromApi()
}

export default defaultFacultyData
