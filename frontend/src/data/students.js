const defaultStudents = [
  {
    id: 1,
    rollNo: '101',
    name: 'Aarav Sharma',
    class: 'Class 10',
    section: 'A',
    fatherName: 'Rajesh Sharma',
    phone: '+91 98765 43210',
    parentPhone: '+91 98765 11111',
    dob: '2011-04-15',
    address: 'Sector 14, Main Road, City',
  },
  {
    id: 2,
    rollNo: '102',
    name: 'Ananya Gupta',
    class: 'Class 10',
    section: 'A',
    fatherName: 'Sunil Gupta',
    phone: '+91 98123 45678',
    parentPhone: '+91 98123 22222',
    dob: '2011-08-22',
    address: 'Green Park Extension, House No 42',
  },
  {
    id: 3,
    rollNo: '201',
    name: 'Rohan Verma',
    class: 'Class 12',
    section: 'Science (PCM)',
    fatherName: 'Dr. Alok Verma',
    phone: '+91 99887 76655',
    parentPhone: '+91 99887 33333',
    dob: '2009-01-10',
    address: 'Civil Lines, Near Officers Club',
  },
  {
    id: 4,
    rollNo: '05',
    name: 'Diya Patel',
    class: 'Nursery',
    section: 'Blueberry',
    fatherName: 'Mahesh Patel',
    phone: '+91 97112 23344',
    parentPhone: '+91 97112 44444',
    dob: '2022-06-05',
    address: 'Vasundhara Enclave, Block B',
  },
]

export const getStudentsList = () => {
  try {
    const stored = localStorage.getItem('greenwood_students_list')
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (err) {
    console.error('Error reading students from localStorage:', err)
  }
  return defaultStudents
}

export const saveStudentsList = (students) => {
  try {
    localStorage.setItem('greenwood_students_list', JSON.stringify(students))
    window.dispatchEvent(new Event('studentsUpdated'))
  } catch (err) {
    console.error('Error saving students to localStorage:', err)
  }
}

export default defaultStudents
