const defaultAdmissions = [
  {
    id: 101,
    studentName: 'Aarav Singh',
    seekingClass: 'Class 11',
    stream: 'Science (PCM)',
    parentName: 'Vikram Singh',
    parentPhone: '+91 98765 12345',
    date: '2026-05-20',
    source: 'Online Website',
    status: 'Pending',
    address: 'Sector 18, Indira Nagar, Lucknow',
  },
  {
    id: 102,
    studentName: 'Diya Sharma',
    seekingClass: 'Class 9',
    stream: 'General',
    parentName: 'Suresh Sharma',
    parentPhone: '+91 98123 67890',
    date: '2026-05-19',
    source: 'Office Walk-in',
    status: 'Under Review',
    address: 'Gomti Nagar, Block C, Lucknow',
  },
  {
    id: 103,
    studentName: 'Kabir Verma',
    seekingClass: 'Class 11',
    stream: 'Commerce',
    parentName: 'Ramesh Verma',
    parentPhone: '+91 99887 11223',
    date: '2026-05-18',
    source: 'Online Website',
    status: 'Approved',
    address: 'Mahanagar, Extension 4, Lucknow',
  },
  {
    id: 104,
    studentName: 'Ananya Gupta',
    seekingClass: 'Class 6',
    stream: 'General',
    parentName: 'Sunil Gupta',
    parentPhone: '+91 97112 44556',
    date: '2026-05-17',
    source: 'Office Walk-in',
    status: 'Approved',
    address: 'Aliganj, Sector B, Lucknow',
  },
]

export const getAdmissionsList = () => {
  try {
    const stored = localStorage.getItem('greenwood_admissions_list')
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (err) {
    console.error('Error reading admissions from localStorage:', err)
  }
  return defaultAdmissions
}

export const saveAdmissionsList = (admissions) => {
  try {
    localStorage.setItem('greenwood_admissions_list', JSON.stringify(admissions))
    window.dispatchEvent(new Event('admissionsUpdated'))
  } catch (err) {
    console.error('Error saving admissions to localStorage:', err)
  }
}

export const addAdmissionApplication = (appData) => {
  const currentList = getAdmissionsList()
  const newApp = {
    id: Date.now(),
    date: new Date().toISOString().split('T')[0],
    source: appData.source || 'Online Website',
    status: 'Pending',
    ...appData,
  }
  const updated = [newApp, ...currentList]
  saveAdmissionsList(updated)
  return newApp
}

export default defaultAdmissions
