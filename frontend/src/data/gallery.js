import heroSchoolImg from '../assets/images/hero_school.jpg'
import campusImg from '../assets/images/about-campus.avif'
import classNurseryImg from '../assets/images/classnursery.jpg'
import class4Img from '../assets/images/class4.jpg'
import class7Img from '../assets/images/class7.jpg'
import class12Img from '../assets/images/class12.jpg'
import graduationBgImg from '../assets/images/graduation_bg.jpg'
import libraryImg from '../assets/images/photo-1561089489-f13d5e730d72.avif'

const defaultGalleryData = [
  {
    id: 1,
    title: 'Greenwood Campus Aerial View',
    category: 'Campus',
    image: heroSchoolImg,
    caption: 'State-of-the-art academic buildings surrounded by lush green sports arenas.',
  },
  {
    id: 2,
    title: 'Early Years Play & Learning Studio',
    category: 'Student Life',
    image: classNurseryImg,
    caption: 'Nurturing curiosity and foundational literacy in a safe, activity-based environment.',
  },
  {
    id: 3,
    title: 'Interactive Classroom Learning',
    category: 'Academic',
    image: class4Img,
    caption: 'Engaging, concept-driven primary school classroom session.',
  },
  {
    id: 4,
    title: 'Middle School Science Laboratory',
    category: 'Academic',
    image: class7Img,
    caption: 'Hands-on practical experiments in physics, chemistry, and biology.',
  },
  {
    id: 5,
    title: 'Senior Secondary Graduation Ceremony',
    category: 'Cultural',
    image: graduationBgImg,
    caption: 'Celebrating the achievements and university readiness of our Class 12 graduates.',
  },
  {
    id: 6,
    title: 'Central Library & Reading Lounge',
    category: 'Campus',
    image: libraryImg,
    caption: 'Over 15,000 books, research journals, and quiet digital study pods.',
  },
  {
    id: 7,
    title: 'Senior Secondary Seminar',
    category: 'Academic',
    image: class12Img,
    caption: 'Interactive university counselling and career guidance workshop.',
  },
  {
    id: 8,
    title: 'School Campus Architecture',
    category: 'Campus',
    image: campusImg,
    caption: 'Modern academic architecture with eco-friendly solar infrastructure.',
  },
]

export const getGalleryPhotos = () => {
  try {
    const stored = localStorage.getItem('greenwood_gallery_photos')
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (err) {
    console.error('Error reading gallery photos from localStorage:', err)
  }
  return defaultGalleryData
}

export const saveGalleryPhotos = (photos) => {
  try {
    localStorage.setItem('greenwood_gallery_photos', JSON.stringify(photos))
    window.dispatchEvent(new Event('galleryUpdated'))

    const apiUrl = import.meta.env.VITE_API_URL || 'https://greenwood-acedmy.onrender.com/api'
    fetch(`${apiUrl}/gallery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(photos),
    }).catch(() => {})
  } catch (err) {
    console.error('Error saving gallery photos to localStorage:', err)
  }
}

export const syncGalleryFromApi = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'https://greenwood-acedmy.onrender.com/api'
    const res = await fetch(`${apiUrl}/gallery`)
    if (res.ok) {
      const data = await res.json()
      if (Array.isArray(data) && data.length > 0) {
        localStorage.setItem('greenwood_gallery_photos', JSON.stringify(data))
        window.dispatchEvent(new Event('galleryUpdated'))
        return data
      }
    }
  } catch (err) {
    console.error('Failed to sync gallery from API:', err)
  }
  return null
}

if (typeof window !== 'undefined') {
  syncGalleryFromApi()
}

export default defaultGalleryData
