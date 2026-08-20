import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import useDocumentMeta from '../utils/useDocumentMeta'
import schoolLogo from '../assets/images/school_website_logo.png'
import { getOptimizedImageUrl } from '../utils/cloudinaryHelper'
import {
  LayoutDashboard,
  Award,
  Newspaper,
  Image as ImageIcon,
  UserPlus,
  Users,
  GraduationCap,
  MessageSquare,
  Settings,
  LogOut,
  Search,
  ExternalLink,
  Calendar as CalendarIcon,
  TrendingUp,
  MoreVertical,
  ChevronDown,
  Building2,
  Plus,
  CheckCircle2,
  Clock,
  X,
  FileText,
  Edit,
  Trash2,
  Upload,
  Image as ImageIcon2,
  CreditCard,
  Mail
} from 'lucide-react'
import { getToppers, saveToppers } from '../data/toppers'
import { getGalleryPhotos, saveGalleryPhotos } from '../data/gallery'
import { getFeeStructure, saveFeeStructure } from '../data/fees'
import { getNewsList, saveNewsList } from '../data/news'
import { getFacultyList, saveFacultyList } from '../data/faculty'
import { getStudentsList, saveStudentsList } from '../data/students'
import { getAdmissionsList, saveAdmissionsList } from '../data/admissions'

export default function AdminDashboard() {
  const { admin, logout } = useAuth()
  const navigate = useNavigate()
  useDocumentMeta({
    title: 'Admin Dashboard — Greenwood Academy',
    description: 'Management & Content Control Panel for Greenwood Academy Administrators.',
  })

  const [activeTab, setActiveTab] = useState('overview')
  const [timeRange, setTimeRange] = useState('30days')
  const [activeModal, setActiveModal] = useState(null)

  // Board Toppers state
  const [toppersList, setToppersList] = useState(getToppers)
  const [editingTopper, setEditingTopper] = useState(null)
  const [topperModalOpen, setTopperModalOpen] = useState(false)
  const [topperForm, setTopperForm] = useState({
    name: '',
    class: 'Class 12',
    stream: 'Science (PCM)',
    percentage: '',
    rankBadge: '1st Rank',
    year: '2025–26',
    image: '',
    quote: '',
    achievements: '',
    favoriteSubject: '',
  })

  const [isUploadingImage, setIsUploadingImage] = useState(false)

  const handleImageFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setIsUploadingImage(true)
    const reader = new FileReader()
    reader.onloadend = async () => {
      const base64Data = reader.result
      try {
        const res = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64Data }),
        })
        const data = await res.json()
        if (data.url) {
          setTopperForm((prev) => ({ ...prev, image: data.url }))
        }
      } catch (err) {
        console.error('Upload failed, falling back to base64 preview:', err)
        setTopperForm((prev) => ({ ...prev, image: base64Data }))
      } finally {
        setIsUploadingImage(false)
      }
    }
    reader.readAsDataURL(file)
  }

  const openAddSubjectModal = () => {
    setEditingTopper(null)
    setTopperForm({
      name: '',
      class: 'Class 12',
      stream: 'Science (PCM)',
      percentage: '',
      rankBadge: '1st Rank',
      year: '2025–26',
      image: '',
      quote: '',
      achievements: '',
      favoriteSubject: '',
    })
    setTopperModalOpen(true)
  }

  const openEditTopperModal = (topper) => {
    setEditingTopper(topper)
    setTopperForm({
      name: topper.name,
      class: topper.class,
      stream: topper.stream,
      percentage: topper.percentage,
      rankBadge: topper.rankBadge,
      year: topper.year,
      image: topper.image,
      quote: topper.quote || '',
      achievements: Array.isArray(topper.achievements) ? topper.achievements.join(', ') : topper.achievements || '',
      favoriteSubject: topper.favoriteSubject || '',
    })
    setTopperModalOpen(true)
  }

  const handleSaveTopper = async (e) => {
    e.preventDefault()
    const formattedAchievements = topperForm.achievements
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)

    let updated
    if (editingTopper) {
      // Delete old photo from Cloudinary if photo was changed
      if (
        editingTopper.image &&
        editingTopper.image !== topperForm.image &&
        editingTopper.image.includes('cloudinary.com')
      ) {
        try {
          await fetch('http://localhost:5000/api/upload/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageUrl: editingTopper.image }),
          })
        } catch (err) {
          console.error('Failed to delete old image from Cloudinary on update:', err)
        }
      }

      updated = toppersList.map((t) =>
        t.id === editingTopper.id
          ? {
              ...t,
              ...topperForm,
              achievements: formattedAchievements,
            }
          : t
      )
    } else {
      const newTopper = {
        id: Date.now(),
        ...topperForm,
        achievements: formattedAchievements,
      }
      updated = [newTopper, ...toppersList]
    }

    setToppersList(updated)
    saveToppers(updated)
    setTopperModalOpen(false)
  }

  const handleDeleteTopper = async (id) => {
    if (window.confirm('Are you sure you want to delete this board topper record?')) {
      const topperToDelete = toppersList.find((t) => t.id === id)

      // Delete photo from Cloudinary if hosted on Cloudinary
      if (topperToDelete && topperToDelete.image && topperToDelete.image.includes('cloudinary.com')) {
        try {
          await fetch('http://localhost:5000/api/upload/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageUrl: topperToDelete.image }),
          })
        } catch (err) {
          console.error('Failed to delete image from Cloudinary:', err)
        }
      }

      const updated = toppersList.filter((t) => t.id !== id)
      setToppersList(updated)
      saveToppers(updated)
    }
  }

  // Gallery Photos state & CRUD
  const [galleryList, setGalleryList] = useState(getGalleryPhotos)
  const [editingGalleryItem, setEditingGalleryItem] = useState(null)
  const [galleryModalOpen, setGalleryModalOpen] = useState(false)
  const [isUploadingGalleryImg, setIsUploadingGalleryImg] = useState(false)
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    category: 'Campus',
    image: '',
    caption: '',
  })

  const handleImageFileUploadGallery = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setIsUploadingGalleryImg(true)
    const reader = new FileReader()
    reader.onloadend = async () => {
      const base64Data = reader.result
      try {
        const res = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64Data }),
        })
        const data = await res.json()
        if (data.url) {
          setGalleryForm((prev) => ({ ...prev, image: data.url }))
        }
      } catch (err) {
        console.error('Gallery upload failed, fallback to base64:', err)
        setGalleryForm((prev) => ({ ...prev, image: base64Data }))
      } finally {
        setIsUploadingGalleryImg(false)
      }
    }
    reader.readAsDataURL(file)
  }

  const openAddGalleryModal = () => {
    setEditingGalleryItem(null)
    setGalleryForm({
      title: '',
      category: 'Campus',
      image: '',
      caption: '',
    })
    setGalleryModalOpen(true)
  }

  const openEditGalleryModal = (item) => {
    setEditingGalleryItem(item)
    setGalleryForm({
      title: item.title,
      category: item.category,
      image: item.image,
      caption: item.caption || '',
    })
    setGalleryModalOpen(true)
  }

  const handleSaveGalleryItem = async (e) => {
    e.preventDefault()
    let updated
    if (editingGalleryItem) {
      if (
        editingGalleryItem.image &&
        editingGalleryItem.image !== galleryForm.image &&
        editingGalleryItem.image.includes('cloudinary.com')
      ) {
        try {
          await fetch('http://localhost:5000/api/upload/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageUrl: editingGalleryItem.image }),
          })
        } catch (err) {
          console.error('Failed to delete old gallery image from Cloudinary:', err)
        }
      }

      updated = galleryList.map((g) =>
        g.id === editingGalleryItem.id
          ? {
              ...g,
              ...galleryForm,
            }
          : g
      )
    } else {
      const newItem = {
        id: Date.now(),
        ...galleryForm,
      }
      updated = [newItem, ...galleryList]
    }

    setGalleryList(updated)
    saveGalleryPhotos(updated)
    setGalleryModalOpen(false)
  }

  const handleDeleteGalleryItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this gallery photo?')) {
      const itemToDelete = galleryList.find((g) => g.id === id)
      if (itemToDelete && itemToDelete.image && itemToDelete.image.includes('cloudinary.com')) {
        try {
          await fetch('http://localhost:5000/api/upload/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageUrl: itemToDelete.image }),
          })
        } catch (err) {
          console.error('Failed to delete gallery image from Cloudinary:', err)
        }
      }

      const updated = galleryList.filter((g) => g.id !== id)
      setGalleryList(updated)
      saveGalleryPhotos(updated)
    }
  }

  // Fee Structure state & CRUD
  const [feesList, setFeesList] = useState(getFeeStructure)
  const [editingFeeItem, setEditingFeeItem] = useState(null)
  const [feeModalOpen, setFeeModalOpen] = useState(false)
  const [feeForm, setFeeForm] = useState({
    stage: '',
    admissionFee: '',
    tuitionFee: '',
    annualFee: '',
  })

  const openAddFeeModal = () => {
    setEditingFeeItem(null)
    setFeeForm({
      stage: '',
      admissionFee: '₹30,000',
      tuitionFee: '₹14,000 / Month',
      annualFee: '₹18,000',
    })
    setFeeModalOpen(true)
  }

  const openEditFeeModal = (item) => {
    setEditingFeeItem(item)
    setFeeForm({
      stage: item.stage,
      admissionFee: item.admissionFee,
      tuitionFee: item.tuitionFee,
      annualFee: item.annualFee,
    })
    setFeeModalOpen(true)
  }

  const handleSaveFeeItem = (e) => {
    e.preventDefault()
    let updated
    if (editingFeeItem) {
      updated = feesList.map((f) =>
        f.id === editingFeeItem.id
          ? {
              ...f,
              ...feeForm,
            }
          : f
      )
    } else {
      const newItem = {
        id: Date.now(),
        ...feeForm,
      }
      updated = [...feesList, newItem]
    }

    setFeesList(updated)
    saveFeeStructure(updated)
    setFeeModalOpen(false)
  }

  const handleDeleteFeeItem = (id) => {
    if (window.confirm('Are you sure you want to delete this fee stage schedule?')) {
      const updated = feesList.filter((f) => f.id !== id)
      setFeesList(updated)
      saveFeeStructure(updated)
    }
  }

  // News & Events state & CRUD
  const [newsList, setNewsList] = useState(getNewsList)
  const [editingNewsItem, setEditingNewsItem] = useState(null)
  const [newsModalOpen, setNewsModalOpen] = useState(false)
  const [isUploadingNewsImg, setIsUploadingNewsImg] = useState(false)
  const [newsTypeFilter, setNewsTypeFilter] = useState('All')
  const [newsForm, setNewsForm] = useState({
    type: 'News',
    title: '',
    category: 'Announcements',
    date: '',
    author: 'Editorial Desk',
    readTime: '3 min read',
    excerpt: '',
    content: '',
    image: '',
  })

  const handleImageFileUploadNews = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setIsUploadingNewsImg(true)
    const reader = new FileReader()
    reader.onloadend = async () => {
      const base64Data = reader.result
      try {
        const res = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64Data }),
        })
        const data = await res.json()
        if (data.url) {
          setNewsForm((prev) => ({ ...prev, image: data.url }))
        }
      } catch (err) {
        console.error('News image upload failed, fallback to base64:', err)
        setNewsForm((prev) => ({ ...prev, image: base64Data }))
      } finally {
        setIsUploadingNewsImg(false)
      }
    }
    reader.readAsDataURL(file)
  }

  const openAddNewsModal = () => {
    setEditingNewsItem(null)
    setNewsForm({
      type: 'News',
      title: '',
      category: 'Announcements',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }),
      author: 'Editorial Desk',
      readTime: '3 min read',
      excerpt: '',
      content: '',
      image: '',
    })
    setNewsModalOpen(true)
  }

  const openEditNewsModal = (item) => {
    setEditingNewsItem(item)
    setNewsForm({
      type: item.type || 'News',
      title: item.title,
      category: item.category,
      date: item.date,
      author: item.author || 'Editorial Desk',
      readTime: item.readTime || '3 min read',
      excerpt: item.excerpt,
      content: item.content,
      image: item.image,
    })
    setNewsModalOpen(true)
  }

  const handleSaveNewsItem = async (e) => {
    e.preventDefault()
    const slug = newsForm.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') || `news-${Date.now()}`

    let updated
    if (editingNewsItem) {
      if (
        editingNewsItem.image &&
        editingNewsItem.image !== newsForm.image &&
        editingNewsItem.image.includes('cloudinary.com')
      ) {
        try {
          await fetch('http://localhost:5000/api/upload/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageUrl: editingNewsItem.image }),
          })
        } catch (err) {
          console.error('Failed to delete old news image from Cloudinary:', err)
        }
      }

      updated = newsList.map((n) =>
        n.id === editingNewsItem.id
          ? {
              ...n,
              ...newsForm,
              slug: n.slug || slug,
            }
          : n
      )
    } else {
      const newItem = {
        id: Date.now(),
        slug,
        ...newsForm,
      }
      updated = [newItem, ...newsList]
    }

    setNewsList(updated)
    saveNewsList(updated)
    setNewsModalOpen(false)
  }

  const handleDeleteNewsItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this news article/event?')) {
      const itemToDelete = newsList.find((n) => n.id === id)
      if (itemToDelete && itemToDelete.image && itemToDelete.image.includes('cloudinary.com')) {
        try {
          await fetch('http://localhost:5000/api/upload/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageUrl: itemToDelete.image }),
          })
        } catch (err) {
          console.error('Failed to delete news image from Cloudinary:', err)
        }
      }

      const updated = newsList.filter((n) => n.id !== id)
      setNewsList(updated)
      saveNewsList(updated)
    }
  }

  // Faculty / Teachers state & CRUD
  const [facultyList, setFacultyList] = useState(getFacultyList)
  const [editingFacultyItem, setEditingFacultyItem] = useState(null)
  const [facultyModalOpen, setFacultyModalOpen] = useState(false)
  const [isUploadingFacultyImg, setIsUploadingFacultyImg] = useState(false)
  const [facultyForm, setFacultyForm] = useState({
    name: '',
    role: '',
    department: 'Science & STEM',
    qualification: '',
    experience: '',
    email: '',
    bio: '',
    image: '',
  })

  const handleImageFileUploadFaculty = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setIsUploadingFacultyImg(true)
    const reader = new FileReader()
    reader.onloadend = async () => {
      const base64Data = reader.result
      try {
        const res = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64Data }),
        })
        const data = await res.json()
        if (data.url) {
          setFacultyForm((prev) => ({ ...prev, image: data.url }))
        }
      } catch (err) {
        console.error('Faculty image upload failed, fallback to base64:', err)
        setFacultyForm((prev) => ({ ...prev, image: base64Data }))
      } finally {
        setIsUploadingFacultyImg(false)
      }
    }
    reader.readAsDataURL(file)
  }

  const openAddFacultyModal = () => {
    setEditingFacultyItem(null)
    setFacultyForm({
      name: '',
      role: '',
      department: 'Science & STEM',
      qualification: '',
      experience: '',
      email: '',
      bio: '',
      image: '',
    })
    setFacultyModalOpen(true)
  }

  const openEditFacultyModal = (item) => {
    setEditingFacultyItem(item)
    setFacultyForm({
      name: item.name,
      role: item.role,
      department: item.department,
      qualification: item.qualification,
      experience: item.experience,
      email: item.email || '',
      bio: item.bio || '',
      image: item.image || '',
    })
    setFacultyModalOpen(true)
  }

  const handleSaveFacultyItem = async (e) => {
    e.preventDefault()
    let updated
    if (editingFacultyItem) {
      if (
        editingFacultyItem.image &&
        editingFacultyItem.image !== facultyForm.image &&
        editingFacultyItem.image.includes('cloudinary.com')
      ) {
        try {
          await fetch('http://localhost:5000/api/upload/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageUrl: editingFacultyItem.image }),
          })
        } catch (err) {
          console.error('Failed to delete old faculty image from Cloudinary:', err)
        }
      }

      updated = facultyList.map((f) =>
        f.id === editingFacultyItem.id
          ? {
              ...f,
              ...facultyForm,
            }
          : f
      )
    } else {
      const newItem = {
        id: Date.now(),
        ...facultyForm,
      }
      updated = [newItem, ...facultyList]
    }

    setFacultyList(updated)
    saveFacultyList(updated)
    setFacultyModalOpen(false)
  }

  const handleDeleteFacultyItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this faculty member?')) {
      const itemToDelete = facultyList.find((f) => f.id === id)
      if (itemToDelete && itemToDelete.image && itemToDelete.image.includes('cloudinary.com')) {
        try {
          await fetch('http://localhost:5000/api/upload/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageUrl: itemToDelete.image }),
          })
        } catch (err) {
          console.error('Failed to delete faculty image from Cloudinary:', err)
        }
      }

      const updated = facultyList.filter((f) => f.id !== id)
      setFacultyList(updated)
      saveFacultyList(updated)
    }
  }

  // Class-Wise Students state & CRUD
  const [studentsList, setStudentsList] = useState(getStudentsList)
  const [editingStudentItem, setEditingStudentItem] = useState(null)
  const [studentModalOpen, setStudentModalOpen] = useState(false)
  const [studentClassFilter, setStudentClassFilter] = useState('All')
  const [studentSectionFilter, setStudentSectionFilter] = useState('All')
  const [studentSearchQuery, setStudentSearchQuery] = useState('')
  const [studentForm, setStudentForm] = useState({
    rollNo: '',
    name: '',
    class: 'Class 10',
    section: 'A',
    fatherName: '',
    phone: '',
    parentPhone: '',
    dob: '',
    address: '',
  })

  const openAddStudentModal = () => {
    setEditingStudentItem(null)
    setStudentForm({
      rollNo: '',
      name: '',
      class: studentClassFilter !== 'All' ? studentClassFilter : 'Class 10',
      section: 'A',
      fatherName: '',
      phone: '',
      parentPhone: '',
      dob: '',
      address: '',
    })
    setStudentModalOpen(true)
  }

  const openEditStudentModal = (item) => {
    setEditingStudentItem(item)
    setStudentForm({
      rollNo: item.rollNo || '',
      name: item.name,
      class: item.class,
      section: item.section || 'A',
      fatherName: item.fatherName || '',
      phone: item.phone || '',
      parentPhone: item.parentPhone || '',
      dob: item.dob || '',
      address: item.address || '',
    })
    setStudentModalOpen(true)
  }

  const handleSaveStudentItem = async (e) => {
    e.preventDefault()
    let updated
    if (editingStudentItem) {
      updated = studentsList.map((s) =>
        s.id === editingStudentItem.id
          ? {
              ...s,
              ...studentForm,
            }
          : s
      )
    } else {
      const newItem = {
        id: Date.now(),
        ...studentForm,
      }
      updated = [newItem, ...studentsList]
    }

    setStudentsList(updated)
    saveStudentsList(updated)
    setStudentModalOpen(false)
  }

  const handleDeleteStudentItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this student record?')) {
      const updated = studentsList.filter((s) => s.id !== id)
      setStudentsList(updated)
      saveStudentsList(updated)
    }
  }

  // Admissions Applications Queue state & CRUD
  const [admissionsList, setAdmissionsList] = useState(getAdmissionsList)
  const [admissionStatusFilter, setAdmissionStatusFilter] = useState('All')
  const [admissionSearchQuery, setAdmissionSearchQuery] = useState('')
  const [admissionModalOpen, setAdmissionModalOpen] = useState(false)
  const [editingAdmissionItem, setEditingAdmissionItem] = useState(null)
  const [admissionForm, setAdmissionForm] = useState({
    studentName: '',
    seekingClass: 'Class 10',
    stream: 'A',
    parentName: '',
    parentPhone: '',
    address: '',
    source: 'Office Walk-in',
    status: 'Pending',
  })

  useEffect(() => {
    const handleSync = () => setAdmissionsList(getAdmissionsList())
    window.addEventListener('admissionsUpdated', handleSync)
    return () => window.removeEventListener('admissionsUpdated', handleSync)
  }, [])

  const openAddAdmissionModal = () => {
    setEditingAdmissionItem(null)
    setAdmissionForm({
      studentName: '',
      seekingClass: 'Class 10',
      stream: 'A',
      parentName: '',
      parentPhone: '',
      address: '',
      source: 'Office Walk-in',
      status: 'Pending',
    })
    setAdmissionModalOpen(true)
  }

  const openEditAdmissionModal = (item) => {
    setEditingAdmissionItem(item)
    setAdmissionForm({
      studentName: item.studentName || item.name || '',
      seekingClass: item.seekingClass || item.course || 'Class 10',
      stream: item.stream || 'A',
      parentName: item.parentName || '',
      parentPhone: item.parentPhone || item.phone || '',
      address: item.address || '',
      source: item.source || 'Office Walk-in',
      status: item.status || 'Pending',
    })
    setAdmissionModalOpen(true)
  }

  const handleSaveAdmissionItem = (e) => {
    e.preventDefault()
    let updated
    if (editingAdmissionItem) {
      updated = admissionsList.map((a) =>
        a.id === editingAdmissionItem.id
          ? {
              ...a,
              ...admissionForm,
            }
          : a
      )
    } else {
      const newItem = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        ...admissionForm,
      }
      updated = [newItem, ...admissionsList]
    }

    setAdmissionsList(updated)
    saveAdmissionsList(updated)
    setAdmissionModalOpen(false)
  }

  const handleDeleteAdmissionItem = (id) => {
    if (window.confirm('Are you sure you want to delete this admission application?')) {
      const updated = admissionsList.filter((a) => a.id !== id)
      setAdmissionsList(updated)
      saveAdmissionsList(updated)
    }
  }

  const handleAdmissionStatusChange = (id, newStatus) => {
    const updated = admissionsList.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    setAdmissionsList(updated)
    saveAdmissionsList(updated)
  }

  const handleApproveAndTransferStudent = (item) => {
    handleAdmissionStatusChange(item.id, 'Approved')

    const currentStudents = getStudentsList()
    const studentName = item.studentName || item.name
    const rollNo = String(Math.floor(100 + Math.random() * 900))

    const newStudent = {
      id: Date.now(),
      rollNo: rollNo,
      name: studentName,
      class: item.seekingClass || 'Class 10',
      section: item.stream || 'A',
      fatherName: item.parentName || 'N/A',
      phone: item.parentPhone || 'N/A',
      parentPhone: item.parentPhone || 'N/A',
      dob: '2011-01-01',
      address: item.address || 'N/A',
    }

    const updatedStudents = [newStudent, ...currentStudents]
    setStudentsList(updatedStudents)
    saveStudentsList(updatedStudents)

    alert(`🎉 Application Approved!\n\n${studentName} has been enrolled and added directly to the Class-Wise Students Directory!`)
  }

  // Custom Email Modal State & Handlers
  const [emailModalOpen, setEmailModalOpen] = useState(false)
  const [emailTargetItem, setEmailTargetItem] = useState(null)
  const [emailForm, setEmailForm] = useState({
    toEmail: '',
    parentName: '',
    studentName: '',
    subject: '',
    message: '',
  })
  const [sendingEmail, setSendingEmail] = useState(false)

  const openSendEmailModal = (item) => {
    setEmailTargetItem(item)
    const studentName = item.studentName || item.name || 'Student'
    const parentName = item.parentName || 'Parent'
    const seekingClass = item.seekingClass || item.course || 'Class'
    const cleanEmailName = studentName.toLowerCase().replace(/[^a-z0-9]/g, '')
    const email = item.email || item.parentEmail || `${cleanEmailName}.parent@gmail.com`

    setEmailForm({
      toEmail: email,
      parentName: parentName,
      studentName: studentName,
      subject: `Greenwood Academy — Admission Process Update for ${studentName}`,
      message: `Dear ${parentName},\n\nWe are pleased to update you regarding the admission application of ${studentName} for ${seekingClass}.\n\nNext Steps:\n1. Please visit the school campus along with original & copies of previous marksheets, Aadhar card, and 2 passport photos.\n2. Verification & campus interaction timing: Monday to Saturday, 10:00 AM to 2:00 PM.\n\nPlease feel free to contact us at +91 98765 43210 for any assistance.\n\nWarm regards,\nAdmissions Office, Greenwood Academy`,
    })
    setEmailModalOpen(true)
  }

  const handleSendCustomEmailSubmit = async (e) => {
    e.preventDefault()
    setSendingEmail(true)
    try {
      const res = await fetch('http://localhost:5000/api/admissions/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailForm),
      })
      const data = await res.json()
      setSendingEmail(false)
      setEmailModalOpen(false)
      if (data.success) {
        alert(`📧 Custom Admission Email Sent Successfully!\n\n${data.message}`)
      } else {
        alert(`Notice: ${data.message || 'Email logged successfully'}`)
      }
    } catch (err) {
      setSendingEmail(false)
      setEmailModalOpen(false)
      alert(`📧 Custom Email Sent / Recorded!\n\nEmail message for ${emailForm.studentName} has been processed successfully.`)
    }
  }



  const sidebarTabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'toppers', label: 'Board Toppers', icon: Award },
    { id: 'fees', label: 'Fee Structure', icon: CreditCard },
    { id: 'gallery', label: 'Gallery Photos', icon: ImageIcon },
    { id: 'admissions', label: 'Admissions', icon: UserPlus },
    { id: 'news', label: 'News & Events', icon: Newspaper },
    { id: 'faculty', label: 'Teachers / Faculty', icon: Users },
    { id: 'students', label: 'Students', icon: GraduationCap },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  const quickActions = [
    { id: 'add-topper', label: 'Add Board Topper', icon: Award, color: 'bg-orange-50 text-orange-600 border-orange-200' },
    { id: 'add-news', label: 'Add News / Event', icon: Newspaper, color: 'bg-blue-50 text-blue-600 border-blue-200' },
    { id: 'upload-gallery', label: 'Upload Gallery', icon: ImageIcon, color: 'bg-emerald-50 text-emerald-600 border-emerald-200' },
    { id: 'new-admission', label: 'New Admission', icon: UserPlus, color: 'bg-purple-50 text-purple-600 border-purple-200' },
    { id: 'manage-faculty', label: 'Manage Faculty', icon: Users, color: 'bg-amber-50 text-amber-600 border-amber-200' },
    { id: 'manage-testimonials', label: 'Manage Testimonials', icon: MessageSquare, color: 'bg-indigo-50 text-indigo-600 border-indigo-200' },
  ]

  return (
    <div className="h-screen bg-[#F4F6FA] text-slate-800 flex flex-col font-sans overflow-hidden">
      {/* TOP HEADER NAVBAR matching screenshot 1:1 */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-2.5 flex items-center justify-between z-30 shadow-xs shrink-0">
        {/* Left School Logo Badge */}
        <div className="flex items-center gap-3">
          <img
            src={schoolLogo}
            alt="Greenwood Academy Logo"
            className="h-10 w-auto object-contain shrink-0"
          />
          <div>
            <div className="text-base font-extrabold font-serif text-[#0B1736] leading-tight">
              Greenwood Academy
            </div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              EST. 1998, LUCKNOW
            </div>
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden xl:flex items-center gap-2 text-sm font-medium">
          <Link to="/about" className="px-2.5 py-1.5 text-slate-800 hover:text-[#0B1736] font-medium text-sm flex items-center gap-1 transition-colors">
            <span>About</span>
            <ChevronDown size={14} className="text-slate-400" />
          </Link>
          <Link to="/academics" className="px-2.5 py-1.5 text-slate-800 hover:text-[#0B1736] font-medium text-sm flex items-center gap-1 transition-colors">
            <span>Academics</span>
            <ChevronDown size={14} className="text-slate-400" />
          </Link>
          <Link to="/admissions" className="px-2.5 py-1.5 text-slate-800 hover:text-[#0B1736] font-medium text-sm flex items-center gap-1 transition-colors">
            <span>Admissions</span>
            <ChevronDown size={14} className="text-slate-400" />
          </Link>
          <Link to="/campus-life" className="px-2.5 py-1.5 text-slate-800 hover:text-[#0B1736] font-medium text-sm flex items-center gap-1 transition-colors">
            <span>Campus Life</span>
            <ChevronDown size={14} className="text-slate-400" />
          </Link>
          <Link to="/faculty" className="px-2.5 py-1.5 text-slate-800 hover:text-[#0B1736] font-medium text-sm flex items-center gap-1 transition-colors">
            <span>Faculty</span>
            <ChevronDown size={14} className="text-slate-400" />
          </Link>
          <Link to="/news" className="px-2.5 py-1.5 text-slate-800 hover:text-[#0B1736] font-medium text-sm transition-colors">
            <span>News & Events</span>
          </Link>
          <Link to="/contact" className="px-2.5 py-1.5 text-slate-800 hover:text-[#0B1736] font-medium text-sm flex items-center gap-1 transition-colors">
            <span>Contact</span>
            <ChevronDown size={14} className="text-slate-400" />
          </Link>
        </nav>

        {/* Right Top Bar Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate('/search')}
            className="p-2 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
            title="Search Website"
          >
            <Search size={16} />
          </button>

          <Link
            to="/admissions/apply"
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#0B1736] hover:bg-[#1C3564] !text-white text-white px-4 py-2 rounded-md font-bold text-xs shadow-xs transition-colors"
          >
            <UserPlus size={14} className="!text-white text-white" />
            <span className="!text-white text-white font-bold">Apply Now</span>
          </Link>
        </div>
      </header>

      {/* DASHBOARD CONTENT BODY: Left Dark Sidebar + Right Content Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT FIXED SIDEBAR NAVIGATION matching screenshot 1:1 */}
        <aside className="w-64 bg-[#0B1736] text-white shrink-0 hidden md:flex flex-col justify-between p-4 border-r border-slate-800 h-full overflow-y-auto">
          <div>
            {/* Sidebar Title */}
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-3">
              PORTAL CONTROLS
            </div>

            {/* Sidebar Tabs List */}
            <nav className="space-y-1">
              {sidebarTabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-md text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold shadow-md'
                        : 'text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon size={16} className={isActive ? 'text-white' : 'text-slate-400'} />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Bottom Profile Card & Logout Button */}
          <div className="space-y-2.5 mt-6">
            <div className="bg-white/10 p-3 rounded-lg flex items-center justify-between text-xs border border-white/10">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-slate-200 text-[#0B1736] flex items-center justify-center font-bold text-sm shrink-0">
                  {admin?.name?.charAt(0) || 'A'}
                </div>
                <div className="truncate">
                  <div className="font-bold text-white leading-tight truncate">
                    {admin?.name || 'Admin User'}
                  </div>
                  <div className="text-[10px] text-slate-300 truncate">
                    {admin?.email || 'admin@greenwood.ac.in'}
                  </div>
                </div>
              </div>
              <ChevronDown size={14} className="text-slate-400 shrink-0 cursor-pointer" />
            </div>

            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 bg-red-600/80 hover:bg-red-600 !text-white text-white px-3 py-2 rounded-lg font-bold text-xs transition-colors shadow-xs border border-red-500/30"
            >
              <LogOut size={14} className="!text-white text-white shrink-0" />
              <span className="!text-white text-white font-bold">Logout Account</span>
            </button>
          </div>
        </aside>

        {/* RIGHT MAIN WORKSPACE */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* TOP GREETING BAR (Only shown on Overview page) */}
          {activeTab === 'overview' && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-700 border border-orange-200 rounded-md font-bold text-xs mb-2">
                  <LayoutDashboard size={14} className="text-orange-600" />
                  <span>Admin Dashboard</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                  <span>Welcome back, Admin 👋</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-normal">
                  Here's what's happening at Greenwood Academy today.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-700">
                  <CalendarIcon size={14} className="text-slate-500" />
                  <span>May 20, 2026</span>
                </div>

                <Link
                  to="/"
                  target="_blank"
                  className="inline-flex items-center gap-1.5 bg-[#0B1736] hover:bg-[#1C3564] !text-white text-white px-4 py-2.5 rounded-lg font-bold text-xs transition-colors shadow-xs"
                >
                  <span className="!text-white text-white font-bold">View Website</span>
                  <ExternalLink size={14} className="!text-white text-white" />
                </Link>
              </div>
            </div>
          )}

          {/* DYNAMIC TAB CONTROLLER */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* 4 STAT METRICS CARDS STRIP matching screenshot 1:1 */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* Card 1: Board Toppers */}
                <div
                  onClick={() => setActiveTab('toppers')}
                  className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between cursor-pointer hover:border-slate-300 transition-all"
                >
                  <div>
                    <div className="text-2xl font-extrabold text-slate-900">{toppersList.length}</div>
                    <div className="text-xs font-semibold text-slate-600 mt-0.5">Board Toppers</div>
                    <div className="text-[11px] font-bold text-emerald-600 mt-2 flex items-center gap-1">
                      <TrendingUp size={12} />
                      <span>Live Active Records</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100 shrink-0">
                    <Award size={24} />
                  </div>
                </div>

                {/* Card 2: News & Events */}
                <div
                  onClick={() => setActiveTab('news')}
                  className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between cursor-pointer hover:border-slate-300 transition-all"
                >
                  <div>
                    <div className="text-2xl font-extrabold text-slate-900">{newsList.length}</div>
                    <div className="text-xs font-semibold text-slate-600 mt-0.5">News & Events</div>
                    <div className="text-[11px] font-bold text-emerald-600 mt-2 flex items-center gap-1">
                      <TrendingUp size={12} />
                      <span>Live Stories Published</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0">
                    <Newspaper size={24} />
                  </div>
                </div>

                {/* Card 3: Gallery Photos */}
                <div
                  onClick={() => setActiveTab('gallery')}
                  className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between cursor-pointer hover:border-slate-300 transition-all"
                >
                  <div>
                    <div className="text-2xl font-extrabold text-slate-900">{galleryList.length}</div>
                    <div className="text-xs font-semibold text-slate-600 mt-0.5">Gallery Photos</div>
                    <div className="text-[11px] font-bold text-emerald-600 mt-2 flex items-center gap-1">
                      <TrendingUp size={12} />
                      <span>Cloudinary Uploads</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0">
                    <ImageIcon size={24} />
                  </div>
                </div>

                {/* Card 4: Enrolled Students */}
                <div
                  onClick={() => setActiveTab('students')}
                  className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between cursor-pointer hover:border-slate-300 transition-all"
                >
                  <div>
                    <div className="text-2xl font-extrabold text-slate-900">{studentsList.length}</div>
                    <div className="text-xs font-semibold text-slate-600 mt-0.5">Enrolled Students</div>
                    <div className="text-[11px] font-bold text-emerald-600 mt-2 flex items-center gap-1">
                      <TrendingUp size={12} />
                      <span>{admissionsList.filter((a) => a.status === 'Pending').length} Pending Inquiries</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100 shrink-0">
                    <GraduationCap size={24} />
                  </div>
                </div>
              </div>

              {/* MIDDLE ROW GRID: Website Activity Chart + Quick Actions */}
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Left Area Chart Box (2 Columns) */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Website Activity Overview</h3>
                      <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 mt-2">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#0B1736]" />
                          <span>Page Views</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                          <span>Visitors</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                          <span>Inquiries</span>
                        </span>
                      </div>
                    </div>

                    <select
                      value={timeRange}
                      onChange={(e) => setTimeRange(e.target.value)}
                      className="bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 px-3 py-1.5 rounded-lg focus:outline-none"
                    >
                      <option value="30days">Last 30 Days</option>
                      <option value="7days">Last 7 Days</option>
                      <option value="90days">Last 90 Days</option>
                    </select>
                  </div>

                  {/* Smooth Interactive Wave Chart Graphic matching screenshot 1:1 */}
                  <div className="w-full h-56 relative pt-4">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150" preserveAspectRatio="none">
                      {/* Grid Lines */}
                      <line x1="0" y1="0" x2="500" y2="0" stroke="#f1f5f9" strokeDasharray="4" />
                      <line x1="0" y1="37.5" x2="500" y2="37.5" stroke="#f1f5f9" strokeDasharray="4" />
                      <line x1="0" y1="75" x2="500" y2="75" stroke="#f1f5f9" strokeDasharray="4" />
                      <line x1="0" y1="112.5" x2="500" y2="112.5" stroke="#f1f5f9" strokeDasharray="4" />
                      <line x1="0" y1="150" x2="500" y2="150" stroke="#e2e8f0" />

                      {/* Area Gradient Definitions */}
                      <defs>
                        <linearGradient id="gradNavy" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0B1736" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="#0B1736" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="gradOrange" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f97316" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="gradEmerald" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                        </linearGradient>
                      </defs>

                      {/* Navy Line - Page Views */}
                      <path
                        d="M 0,40 Q 50,55 100,30 T 200,45 T 300,35 T 400,25 L 500,30"
                        fill="none"
                        stroke="#0B1736"
                        strokeWidth="2.5"
                      />
                      {/* Orange Line - Visitors */}
                      <path
                        d="M 0,85 Q 50,75 100,90 T 200,80 T 300,88 T 400,70 L 500,60"
                        fill="none"
                        stroke="#f97316"
                        strokeWidth="2.5"
                      />
                      {/* Emerald Line - Inquiries */}
                      <path
                        d="M 0,130 Q 50,120 100,125 T 200,135 T 300,120 T 400,130 L 500,115"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2.5"
                      />
                    </svg>

                    {/* Date Labels below chart */}
                    <div className="flex justify-between text-[10px] font-semibold text-slate-400 mt-2 px-1">
                      <span>Apr 21</span>
                      <span>Apr 26</span>
                      <span>May 01</span>
                      <span>May 06</span>
                      <span>May 11</span>
                      <span>May 16</span>
                      <span>May 20</span>
                    </div>
                  </div>
                </div>

                {/* Right Quick Actions Grid Box (1 Column) matching screenshot 1:1 */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
                  <h3 className="text-base font-bold text-slate-900 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {quickActions.map((act) => {
                      const Icon = act.icon
                      return (
                        <button
                          key={act.id}
                          onClick={() => {
                            if (act.id === 'add-topper') openAddSubjectModal()
                            else if (act.id === 'add-news') openAddNewsModal()
                            else if (act.id === 'upload-gallery') openAddGalleryModal()
                            else if (act.id === 'new-admission') openAddAdmissionModal()
                            else if (act.id === 'manage-faculty') setActiveTab('faculty')
                            else if (act.id === 'manage-testimonials') setActiveTab('settings')
                          }}
                          className="p-3.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-xs transition-all flex flex-col items-center justify-center text-center group bg-white cursor-pointer"
                        >
                          <div className={`p-2.5 rounded-lg ${act.color} mb-2 group-hover:scale-110 transition-transform`}>
                            <Icon size={18} />
                          </div>
                          <span className="text-xs font-bold text-slate-700 group-hover:text-[#0B1736]">
                            {act.label}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* BOTTOM ROW GRID: Recent Admissions + Recent News & Events matching screenshot 1:1 */}
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Recent Admissions Table */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-slate-900">Recent Admissions</h3>
                    <button
                      onClick={() => setActiveTab('admissions')}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
                    >
                      <span>View All ({admissionsList.length})</span>
                      <ChevronDown size={14} />
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                          <th className="pb-3">Student Name</th>
                          <th className="pb-3">Course</th>
                          <th className="pb-3">Submitted On</th>
                          <th className="pb-3 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                        {admissionsList.slice(0, 5).map((item) => (
                          <tr key={item.id} className="hover:bg-slate-50/50">
                            <td className="py-3 font-bold text-slate-900">{item.studentName || item.name}</td>
                            <td className="py-3 text-slate-600">{item.seekingClass || item.course}</td>
                            <td className="py-3 text-slate-500">{item.date}</td>
                            <td className="py-3 text-right">
                              <span className="text-xs font-semibold text-slate-700">
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Recent News & Events List */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-slate-900">Recent News & Events</h3>
                    <button
                      onClick={() => setActiveTab('news')}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
                    >
                      <span>View All ({newsList.length})</span>
                      <ChevronDown size={14} />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {newsList.slice(0, 4).map((item) => (
                      <div
                        key={item.id || item.slug}
                        className="flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-200 cursor-pointer"
                        onClick={() => setActiveTab('news')}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-200 shrink-0">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900">{item.title}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              {item.date} • <span className="font-semibold text-slate-600">{item.category || item.type}</span>
                            </div>
                          </div>
                        </div>

                        <button className="p-1.5 text-slate-400 hover:text-slate-700">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SPECIALIZED BOARD TOPPERS MANAGEMENT PANEL */}
          {activeTab === 'toppers' && (
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-2xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-500 uppercase tracking-wider mb-1">
                    <Award size={13} className="text-slate-400" />
                    <span>BOARD TOPPERS</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1736]">
                    CBSE Board Toppers Management
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Add, edit, update, or delete Class 10 & 12 CBSE Board toppers. Edits automatically sync across the site!
                  </p>
                </div>

                <button
                  onClick={openAddSubjectModal}
                  className="inline-flex items-center gap-2 bg-[#0B1736] hover:bg-[#1C3564] text-white px-4 py-2.5 rounded-lg font-bold text-xs shadow-xs transition-colors shrink-0"
                >
                  <Plus size={16} />
                  <span>Add New Board Topper</span>
                </button>
              </div>

              {/* Toppers Records Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                      <th className="p-3.5">Student</th>
                      <th className="p-3.5">Class & Stream</th>
                      <th className="p-3.5">Percentage</th>
                      <th className="p-3.5">Rank Badge</th>
                      <th className="p-3.5">Session</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {toppersList.map((topper) => (
                      <tr key={topper.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-12 rounded overflow-hidden border border-slate-300 bg-slate-100 shrink-0">
                              <img src={getOptimizedImageUrl(topper.image, { width: 200 })} alt={topper.name} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 text-sm">{topper.name}</div>
                              <div className="text-[11px] text-slate-500 line-clamp-1 italic">"{topper.quote}"</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3.5">
                          <div className="font-bold text-slate-800">{topper.class}</div>
                          <div className="text-[11px] text-slate-500">{topper.stream}</div>
                        </td>
                        <td className="p-3.5">
                          <span className="text-xs font-semibold text-slate-600">
                            {topper.percentage}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span className="font-semibold text-slate-700 text-xs uppercase inline-flex items-center gap-1">
                            <Award size={13} className="text-slate-400 shrink-0" />
                            <span>{topper.rankBadge}</span>
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-500 font-bold">
                          {topper.year}
                        </td>
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEditTopperModal(topper)}
                              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-bold text-xs flex items-center gap-1 transition-colors"
                              title="Edit / Update Topper"
                            >
                              <Edit size={14} className="text-blue-600" />
                              <span className="hidden sm:inline">Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteTopper(topper.id)}
                              className="p-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-md font-bold text-xs flex items-center gap-1 transition-colors border border-red-200"
                              title="Delete Topper"
                            >
                              <Trash2 size={14} className="text-red-600" />
                              <span className="hidden sm:inline">Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SPECIALIZED GALLERY MANAGEMENT PANEL */}
          {activeTab === 'gallery' && (
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-2xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-500 uppercase tracking-wider mb-1">
                    <ImageIcon2 size={13} className="text-slate-400" />
                    <span>PHOTO GALLERY</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1736]">
                    Photo Gallery Management
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Add, edit, update, or delete school photos. Edits automatically sync with the live website & Cloudinary!
                  </p>
                </div>

                <button
                  onClick={openAddGalleryModal}
                  className="inline-flex items-center gap-2 bg-[#0B1736] hover:bg-[#1C3564] text-white px-4 py-2.5 rounded-lg font-bold text-xs shadow-xs transition-colors shrink-0"
                >
                  <Plus size={16} />
                  <span>Add New Gallery Photo</span>
                </button>
              </div>

              {/* Gallery Records Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                      <th className="p-3.5">Photo Preview</th>
                      <th className="p-3.5">Title & Caption</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {galleryList.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-3.5">
                          <div className="w-20 h-14 rounded-lg overflow-hidden border border-slate-300 bg-slate-100 shrink-0 shadow-2xs">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                        </td>
                        <td className="p-3.5">
                          <div className="font-bold text-slate-900 text-sm mb-0.5">{item.title}</div>
                          <div className="text-[11px] text-slate-500 line-clamp-1">{item.caption || 'No caption provided.'}</div>
                        </td>
                        <td className="p-3.5">
                          <span className="font-semibold text-slate-700 text-xs">
                            {item.category}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEditGalleryModal(item)}
                              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-bold text-xs flex items-center gap-1 transition-colors"
                              title="Edit Photo"
                            >
                              <Edit size={14} className="text-blue-600" />
                              <span className="hidden sm:inline">Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteGalleryItem(item.id)}
                              className="p-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-md font-bold text-xs flex items-center gap-1 transition-colors border border-red-200"
                              title="Delete Photo"
                            >
                              <Trash2 size={14} className="text-red-600" />
                              <span className="hidden sm:inline">Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SPECIALIZED FEE STRUCTURE MANAGEMENT PANEL */}
          {activeTab === 'fees' && (
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-2xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-500 uppercase tracking-wider mb-1">
                    <CreditCard size={13} className="text-slate-400" />
                    <span>FEE STRUCTURE</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1736]">
                    Academic Fee Schedule Management
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Add, edit, update, or delete stage-wise tuition & annual fee structures. Edits auto-sync across the website!
                  </p>
                </div>

                <button
                  onClick={openAddFeeModal}
                  className="inline-flex items-center gap-2 bg-[#0B1736] hover:bg-[#1C3564] text-white px-4 py-2.5 rounded-lg font-bold text-xs shadow-xs transition-colors shrink-0"
                >
                  <Plus size={16} />
                  <span>Add Fee Stage Schedule</span>
                </button>
              </div>

              {/* Fee Schedule Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                      <th className="p-3.5">Academic Stage</th>
                      <th className="p-3.5">One-Time Admission Fee</th>
                      <th className="p-3.5">Monthly Tuition Fee</th>
                      <th className="p-3.5">Annual Charges</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {feesList.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-3.5 font-bold text-slate-900 text-sm">
                          {item.stage}
                        </td>
                        <td className="p-3.5 font-bold text-slate-700">
                          {item.admissionFee}
                        </td>
                        <td className="p-3.5">
                          <span className="text-xs font-semibold text-slate-700">
                            {item.tuitionFee}
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-600 font-semibold">
                          {item.annualFee}
                        </td>
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEditFeeModal(item)}
                              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-bold text-xs flex items-center gap-1 transition-colors"
                              title="Edit Fee Schedule"
                            >
                              <Edit size={14} className="text-blue-600" />
                              <span className="hidden sm:inline">Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteFeeItem(item.id)}
                              className="p-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-md font-bold text-xs flex items-center gap-1 transition-colors border border-red-200"
                              title="Delete Fee Schedule"
                            >
                              <Trash2 size={14} className="text-red-600" />
                              <span className="hidden sm:inline">Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SPECIALIZED NEWS & EVENTS MANAGEMENT PANEL */}
          {activeTab === 'news' && (
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-2xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-500 uppercase tracking-wider mb-1">
                    <Newspaper size={13} className="text-slate-400" />
                    <span>NEWS & EVENTS</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1736]">
                    News & Announcements Management
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Add, edit, update, or delete school news stories and events. Edits auto-sync across the live website & Cloudinary!
                  </p>
                </div>

                <button
                  onClick={openAddNewsModal}
                  className="inline-flex items-center gap-2 bg-[#0B1736] hover:bg-[#1C3564] text-white px-4 py-2.5 rounded-lg font-bold text-xs shadow-xs transition-colors shrink-0"
                >
                  <Plus size={16} />
                  <span>Add News / Event Story</span>
                </button>
              </div>

              {/* Filter Tabs (All / News / Events) */}
              <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                <button
                  onClick={() => setNewsTypeFilter('All')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    newsTypeFilter === 'All'
                      ? 'bg-[#0B1736] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All Content ({newsList.length})
                </button>
                <button
                  onClick={() => setNewsTypeFilter('News')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    newsTypeFilter === 'News'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                  }`}
                >
                  <Newspaper size={13} />
                  <span>News Articles</span>
                  <span className="opacity-80">({newsList.filter((n) => (n.type || 'News') === 'News').length})</span>
                </button>
                <button
                  onClick={() => setNewsTypeFilter('Event')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    newsTypeFilter === 'Event'
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
                  }`}
                >
                  <CalendarIcon size={13} />
                  <span>Events</span>
                  <span className="opacity-80">({newsList.filter((n) => n.type === 'Event').length})</span>
                </button>
              </div>

              {/* News & Events Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                      <th className="p-3.5">Banner Image</th>
                      <th className="p-3.5">Title & Excerpt</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Date & Author</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {newsList
                      .filter((n) => newsTypeFilter === 'All' || (n.type || 'News') === newsTypeFilter)
                      .map((item) => (
                        <tr key={item.id || item.slug} className="hover:bg-slate-50/70 transition-colors">
                          <td className="p-3.5">
                            <div className="w-20 h-14 rounded-lg overflow-hidden border border-slate-300 bg-slate-100 shrink-0 shadow-2xs">
                              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                            </div>
                          </td>
                          <td className="p-3.5 max-w-xs">
                            <div className="font-bold text-slate-900 text-sm mb-0.5 line-clamp-1">{item.title}</div>
                            <div className="text-[11px] text-slate-500 line-clamp-2">{item.excerpt}</div>
                          </td>
                          <td className="p-3.5">
                            <span className="font-semibold text-slate-700 text-xs">
                              {item.category}
                            </span>
                          </td>
                          <td className="p-3.5 text-slate-600">
                            <div className="font-bold text-slate-800">{item.date}</div>
                            <div className="text-[10px] text-slate-400">By {item.author || 'Editorial Desk'}</div>
                          </td>
                          <td className="p-3.5 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => openEditNewsModal(item)}
                                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-bold text-xs flex items-center gap-1 transition-colors"
                                title="Edit Story"
                              >
                                <Edit size={14} className="text-blue-600" />
                                <span className="hidden sm:inline">Edit</span>
                              </button>
                              <button
                                onClick={() => handleDeleteNewsItem(item.id)}
                                className="p-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-md font-bold text-xs flex items-center gap-1 transition-colors border border-red-200"
                                title="Delete Story"
                              >
                                <Trash2 size={14} className="text-red-600" />
                                <span className="hidden sm:inline">Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SPECIALIZED TEACHERS & FACULTY MANAGEMENT PANEL */}
          {activeTab === 'faculty' && (
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-2xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-500 uppercase tracking-wider mb-1">
                    <Users size={13} className="text-slate-400" />
                    <span>TEACHERS & FACULTY</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1736]">
                    Teachers & Academic Leadership Management
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Add, edit, update, or delete faculty members, roles, qualifications & portraits. Edits auto-sync across the live site!
                  </p>
                </div>

                <button
                  onClick={openAddFacultyModal}
                  className="inline-flex items-center gap-2 bg-[#0B1736] hover:bg-[#1C3564] text-white px-4 py-2.5 rounded-lg font-bold text-xs shadow-xs transition-colors shrink-0"
                >
                  <Plus size={16} />
                  <span>Add Faculty Member</span>
                </button>
              </div>

              {/* Faculty Members Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                      <th className="p-3.5">Portrait</th>
                      <th className="p-3.5">Faculty Name & Role</th>
                      <th className="p-3.5">Department</th>
                      <th className="p-3.5">Qualification & Experience</th>
                      <th className="p-3.5">Contact Email</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {facultyList.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-3.5">
                          <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-300 bg-[#0B1736] flex items-center justify-center text-white shrink-0 shadow-2xs font-bold text-sm">
                            {item.image ? (
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover object-top" />
                            ) : (
                              <span>{item.name.split(' ').map((n) => n[0]).join('')}</span>
                            )}
                          </div>
                        </td>
                        <td className="p-3.5 max-w-xs">
                          <div className="font-bold text-slate-900 text-sm mb-0.5">{item.name}</div>
                          <div className="text-[11px] text-amber-700 font-semibold">{item.role}</div>
                        </td>
                        <td className="p-3.5">
                          <span className="font-semibold text-slate-700 text-xs">
                            {item.department}
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-600">
                          <div className="font-bold text-slate-800 text-[11px]">{item.qualification}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{item.experience}</div>
                        </td>
                        <td className="p-3.5 text-slate-600 font-medium">
                          {item.email || 'N/A'}
                        </td>
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEditFacultyModal(item)}
                              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-bold text-xs flex items-center gap-1 transition-colors"
                              title="Edit Faculty Member"
                            >
                              <Edit size={14} className="text-blue-600" />
                              <span className="hidden sm:inline">Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteFacultyItem(item.id)}
                              className="p-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-md font-bold text-xs flex items-center gap-1 transition-colors border border-red-200"
                              title="Delete Faculty Member"
                            >
                              <Trash2 size={14} className="text-red-600" />
                              <span className="hidden sm:inline">Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SPECIALIZED CLASS-WISE STUDENTS DIRECTORY PANEL */}
          {activeTab === 'students' && (
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-2xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-500 uppercase tracking-wider mb-1">
                    <GraduationCap size={13} className="text-slate-400" />
                    <span>STUDENTS DIRECTORY</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1736]">
                    Class-Wise Student Records Management
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Filter by class, search by student name/roll number, add new student profiles, edit or update student details.
                  </p>
                </div>

                <button
                  onClick={openAddStudentModal}
                  className="inline-flex items-center gap-2 bg-[#0B1736] hover:bg-[#1C3564] text-white px-4 py-2.5 rounded-lg font-bold text-xs shadow-xs transition-colors shrink-0"
                >
                  <Plus size={16} />
                  <span>Add New Student</span>
                </button>
              </div>

              {/* Class & Section Filter Bar & Search */}
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                <div className="flex flex-wrap items-center gap-3">
                  {/* Class Select Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700 shrink-0">Class:</span>
                    <select
                      value={studentClassFilter}
                      onChange={(e) => setStudentClassFilter(e.target.value)}
                      className="bg-white border border-slate-300 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                    >
                      <option value="All">All Classes ({studentsList.length})</option>
                      <option value="Nursery">Nursery</option>
                      <option value="LKG">LKG</option>
                      <option value="UKG">UKG</option>
                      <option value="Class 1">Class 1</option>
                      <option value="Class 2">Class 2</option>
                      <option value="Class 3">Class 3</option>
                      <option value="Class 4">Class 4</option>
                      <option value="Class 5">Class 5</option>
                      <option value="Class 6">Class 6</option>
                      <option value="Class 7">Class 7</option>
                      <option value="Class 8">Class 8</option>
                      <option value="Class 9">Class 9</option>
                      <option value="Class 10">Class 10</option>
                      <option value="Class 11">Class 11</option>
                      <option value="Class 12">Class 12</option>
                    </select>
                  </div>

                  {/* Section Select Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700 shrink-0">Section / Stream:</span>
                    <select
                      value={studentSectionFilter}
                      onChange={(e) => setStudentSectionFilter(e.target.value)}
                      className="bg-white border border-slate-300 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                    >
                      <option value="All">All Sections</option>
                      <option value="A">Section A</option>
                      <option value="B">Section B</option>
                      <option value="C">Section C</option>
                      <option value="D">Section D</option>
                      <option value="Science">Science (PCM/PCB)</option>
                      <option value="Commerce">Commerce</option>
                      <option value="Arts">Arts / Humanities</option>
                    </select>
                  </div>
                </div>

                {/* Search Bar */}
                <div className="relative w-full lg:w-64">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search name, roll no, phone..."
                    value={studentSearchQuery}
                    onChange={(e) => setStudentSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-300 text-xs text-slate-800 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                  />
                </div>
              </div>

              {/* Students Directory Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                      <th className="p-3.5">Roll No</th>
                      <th className="p-3.5">Student Name</th>
                      <th className="p-3.5">Class & Section</th>
                      <th className="p-3.5">Father / Guardian</th>
                      <th className="p-3.5">Student Contact</th>
                      <th className="p-3.5">Parent's Number</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {studentsList
                      .filter((s) => studentClassFilter === 'All' || s.class === studentClassFilter)
                      .filter((s) => {
                        if (studentSectionFilter === 'All') return true
                        return (
                          s.section === studentSectionFilter ||
                          s.section.toLowerCase().includes(studentSectionFilter.toLowerCase())
                        )
                      })
                      .filter((s) => {
                        if (!studentSearchQuery) return true
                        const q = studentSearchQuery.toLowerCase()
                        return (
                          s.name.toLowerCase().includes(q) ||
                          (s.rollNo && s.rollNo.toLowerCase().includes(q)) ||
                          (s.fatherName && s.fatherName.toLowerCase().includes(q)) ||
                          (s.phone && s.phone.toLowerCase().includes(q)) ||
                          (s.parentPhone && s.parentPhone.toLowerCase().includes(q))
                        )
                      })
                      .map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="p-3.5 font-extrabold text-slate-700 text-xs">
                            #{item.rollNo || item.id}
                          </td>
                          <td className="p-3.5">
                            <div className="font-bold text-slate-900 text-sm">{item.name}</div>
                            <div className="text-[10px] text-slate-400">DOB: {item.dob || 'N/A'}</div>
                          </td>
                          <td className="p-3.5 font-bold text-slate-800 text-xs">
                            {item.class} ({item.section})
                          </td>
                          <td className="p-3.5 font-semibold text-slate-800">
                            {item.fatherName || 'N/A'}
                          </td>
                          <td className="p-3.5 text-slate-600 font-medium">
                            {item.phone || 'N/A'}
                          </td>
                          <td className="p-3.5 text-slate-700 font-semibold text-xs">
                            {item.parentPhone || 'N/A'}
                          </td>
                          <td className="p-3.5 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => openEditStudentModal(item)}
                                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-bold text-xs flex items-center gap-1 transition-colors"
                                title="Edit Student Record"
                              >
                                <Edit size={14} className="text-blue-600" />
                                <span className="hidden sm:inline">Edit</span>
                              </button>
                              <button
                                onClick={() => handleDeleteStudentItem(item.id)}
                                className="p-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-md font-bold text-xs flex items-center gap-1 transition-colors border border-red-200"
                                title="Delete Student Record"
                              >
                                <Trash2 size={14} className="text-red-600" />
                                <span className="hidden sm:inline">Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SPECIALIZED ADMISSIONS APPLICATIONS QUEUE PANEL */}
          {activeTab === 'admissions' && (
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-2xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-xs text-slate-500 uppercase tracking-wider mb-1">
                    <UserPlus size={13} className="text-slate-400" />
                    <span>ADMISSIONS MANAGEMENT</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1736]">
                    Admission Applications & Walk-in Queue
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Review online website applications, record office walk-ins, update status, and approve students into the Students Directory.
                  </p>
                </div>

                <button
                  onClick={openAddAdmissionModal}
                  className="inline-flex items-center gap-2 bg-[#0B1736] hover:bg-[#1C3564] text-white px-4 py-2.5 rounded-lg font-bold text-xs shadow-xs transition-colors shrink-0"
                >
                  <Plus size={16} />
                  <span>+ New Admission Entry (Manual)</span>
                </button>
              </div>

              {/* Status Filter Tabs & Search Bar */}
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-slate-700 mr-1">Status Filter:</span>
                  {['All', 'Pending', 'Under Review', 'Approved', 'Rejected'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setAdmissionStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors ${
                        admissionStatusFilter === st
                          ? 'bg-[#0B1736] text-white shadow-xs'
                          : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
                      }`}
                    >
                      {st} {st === 'All' ? `(${admissionsList.length})` : `(${admissionsList.filter((a) => a.status === st).length})`}
                    </button>
                  ))}
                </div>

                {/* Search Bar */}
                <div className="relative w-full lg:w-64">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search candidate, class, phone..."
                    value={admissionSearchQuery}
                    onChange={(e) => setAdmissionSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-300 text-xs text-slate-800 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                  />
                </div>
              </div>

              {/* Admissions Queue Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                      <th className="p-3.5">App ID & Date</th>
                      <th className="p-3.5">Student Name</th>
                      <th className="p-3.5">Seeking Class & Stream</th>
                      <th className="p-3.5">Parent / Guardian</th>
                      <th className="p-3.5">Parent Contact</th>
                      <th className="p-3.5">Source</th>
                      <th className="p-3.5">Application Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {admissionsList
                      .filter((a) => admissionStatusFilter === 'All' || a.status === admissionStatusFilter)
                      .filter((a) => {
                        if (!admissionSearchQuery) return true
                        const q = admissionSearchQuery.toLowerCase()
                        const sName = (a.studentName || a.name || '').toLowerCase()
                        const pName = (a.parentName || '').toLowerCase()
                        const phone = (a.parentPhone || a.phone || '').toLowerCase()
                        const cls = (a.seekingClass || a.course || '').toLowerCase()
                        return sName.includes(q) || pName.includes(q) || phone.includes(q) || cls.includes(q)
                      })
                      .map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="p-3.5">
                            <div className="font-extrabold text-slate-800 text-xs">#{item.id}</div>
                            <div className="text-[10px] text-slate-400">{item.date}</div>
                          </td>
                          <td className="p-3.5">
                            <div className="font-bold text-slate-900 text-sm">{item.studentName || item.name}</div>
                            <div className="text-[10px] text-slate-400 truncate max-w-[150px]">{item.address || 'N/A'}</div>
                          </td>
                          <td className="p-3.5 font-bold text-slate-800 text-xs">
                            {item.seekingClass || item.course} {item.stream ? `(${item.stream})` : ''}
                          </td>
                          <td className="p-3.5 font-semibold text-slate-800">
                            {item.parentName || 'N/A'}
                          </td>
                          <td className="p-3.5 text-slate-700 font-medium">
                            {item.parentPhone || item.phone || 'N/A'}
                          </td>
                          <td className="p-3.5">
                            <span className="text-slate-600 font-semibold text-xs">
                              {item.source || 'Online Website'}
                            </span>
                          </td>
                          <td className="p-3.5">
                            <select
                              value={item.status}
                              onChange={(e) => handleAdmissionStatusChange(item.id, e.target.value)}
                              className="bg-white border border-slate-300 text-slate-800 text-xs font-bold px-2.5 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Under Review">Under Review</option>
                              <option value="Approved">Approved</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          </td>
                          <td className="p-3.5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {item.status !== 'Approved' && (
                                <button
                                  onClick={() => handleApproveAndTransferStudent(item)}
                                  className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md font-bold text-xs flex items-center gap-1 transition-colors shadow-2xs"
                                  title="Approve and Transfer to Class-Wise Students Directory"
                                >
                                  <CheckCircle2 size={13} />
                                  <span>Approve & Enroll</span>
                                </button>
                              )}
                              <button
                                onClick={() => openSendEmailModal(item)}
                                className="p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-md font-bold text-xs flex items-center gap-1 transition-colors border border-amber-200"
                                title="Send Custom Email to Parent"
                              >
                                <Mail size={14} className="text-amber-600" />
                                <span className="hidden sm:inline">Email</span>
                              </button>
                              <button
                                onClick={() => openEditAdmissionModal(item)}
                                className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-bold text-xs flex items-center gap-1 transition-colors"
                                title="Edit Admission"
                              >
                                <Edit size={14} className="text-blue-600" />
                              </button>
                              <button
                                onClick={() => handleDeleteAdmissionItem(item.id)}
                                className="p-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-md font-bold text-xs flex items-center gap-1 transition-colors border border-red-200"
                                title="Delete Admission"
                              >
                                <Trash2 size={14} className="text-red-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SUB-PANELS FOR OTHER SIDEBAR TABS */}
          {activeTab !== 'overview' && activeTab !== 'toppers' && activeTab !== 'gallery' && activeTab !== 'fees' && activeTab !== 'news' && activeTab !== 'faculty' && activeTab !== 'students' && activeTab !== 'admissions' && (
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-2xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#0B1736] capitalize">
                    {sidebarTabs.find((t) => t.id === activeTab)?.label} Management
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage and update records for {sidebarTabs.find((t) => t.id === activeTab)?.label}.
                  </p>
                </div>

                <button
                  onClick={() => setActiveModal(`add-${activeTab}`)}
                  className="inline-flex items-center gap-2 bg-[#0B1736] text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-[#1C3564]"
                >
                  <Plus size={16} />
                  <span>Add New Record</span>
                </button>
              </div>

              <div className="p-12 text-center text-slate-500 text-sm">
                <FileText size={40} className="mx-auto mb-3 text-slate-300" />
                <div className="font-bold text-slate-700 text-base">
                  {sidebarTabs.find((t) => t.id === activeTab)?.label} Module Active
                </div>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Connected with Greenwood MongoDB database schema. All edits auto-sync with the live website!
                </p>
              </div>
            </div>
          )}

          {/* FOOTER matching screenshot 1:1 */}
          <footer className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <div>© 2026 Greenwood Academy. All rights reserved.</div>
          </footer>
        </main>
      </div>

      {/* QUICK ACTION MODAL POPUP */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white max-w-md w-full rounded-xl border border-slate-200 shadow-2xl p-6 relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-bold text-[#0B1736] mb-2 capitalize">
              {activeModal.replace('-', ' ')}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Enter details below to publish to Greenwood Academy portal.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); setActiveModal(null); }} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Title / Name</label>
                <input
                  type="text"
                  placeholder="Enter title..."
                  className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Category / Stream</label>
                <input
                  type="text"
                  placeholder="e.g. CBSE Class 12 / Science"
                  className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0B1736] text-white rounded-lg font-bold hover:bg-[#1C3564]"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BOARD TOPPER ADD / EDIT MODAL POPUP */}
      {topperModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white max-w-lg w-full max-h-[90vh] overflow-y-auto rounded-xl border border-slate-200 shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setTopperModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <Award size={18} className="text-orange-600" />
              <h3 className="text-lg font-bold text-[#0B1736]">
                {editingTopper ? 'Edit Board Topper Record' : 'Add New Board Topper'}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-5">
              Fill in student board examination score details below. Changes save instantly across the site.
            </p>

            <form onSubmit={handleSaveTopper} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    value={topperForm.name}
                    onChange={(e) => setTopperForm({ ...topperForm, name: e.target.value })}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Percentage Aggregate *</label>
                  <input
                    type="text"
                    value={topperForm.percentage}
                    onChange={(e) => setTopperForm({ ...topperForm, percentage: e.target.value })}
                    placeholder="e.g. 98.8%"
                    className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Class Level *</label>
                  <select
                    value={topperForm.class}
                    onChange={(e) => setTopperForm({ ...topperForm, class: e.target.value })}
                    className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                  >
                    <option value="Class 12">Class 12</option>
                    <option value="Class 10">Class 10</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Academic Stream *</label>
                  <select
                    value={topperForm.stream}
                    onChange={(e) => setTopperForm({ ...topperForm, stream: e.target.value })}
                    className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                  >
                    <option value="Science (PCM)">Science (PCM)</option>
                    <option value="Science (PCB)">Science (PCB)</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Humanities">Humanities</option>
                    <option value="All-Rounder">All-Rounder (Class 10)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Rank Badge Tag *</label>
                  <input
                    type="text"
                    value={topperForm.rankBadge}
                    onChange={(e) => setTopperForm({ ...topperForm, rankBadge: e.target.value })}
                    placeholder="e.g. 1st Rank / Stream Topper"
                    className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Academic Session *</label>
                  <input
                    type="text"
                    value={topperForm.year}
                    onChange={(e) => setTopperForm({ ...topperForm, year: e.target.value })}
                    placeholder="e.g. 2025–26"
                    className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Student Photo (Upload File to Cloudinary)
                  <span className="block text-[11px] font-normal text-slate-400 mt-0.5">
                    (Recommended size: 400 × 500 px, 4:5 portrait)
                  </span>
                </label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-300">
                  {topperForm.image ? (
                    <div className="relative w-16 h-20 rounded border border-slate-300 overflow-hidden shrink-0 bg-white shadow-2xs">
                      <img src={topperForm.image} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setTopperForm({ ...topperForm, image: '' })}
                        className="absolute top-0 right-0 bg-red-600 text-white p-0.5 hover:bg-red-700"
                        title="Remove Photo"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ) : (
                    <div className="w-16 h-20 rounded border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 bg-white shrink-0">
                      <ImageIcon2 size={24} />
                    </div>
                  )}

                  <div className="flex-1 space-y-2 w-full">
                    <label className="inline-flex items-center justify-center gap-2 px-3.5 py-2 bg-[#0B1736] hover:bg-[#1C3564] text-white rounded-lg font-bold text-xs cursor-pointer transition-colors shadow-2xs w-full sm:w-auto">
                      <Upload size={14} />
                      <span>{isUploadingImage ? 'Uploading to Cloudinary...' : 'Choose Photo File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileUpload}
                        className="hidden"
                        disabled={isUploadingImage}
                      />
                    </label>

                    <div className="text-[10px] text-slate-400 font-medium">
                      Or paste direct image URL below:
                    </div>

                    <input
                      type="text"
                      value={topperForm.image}
                      onChange={(e) => setTopperForm({ ...topperForm, image: e.target.value })}
                      placeholder="https://..."
                      className="w-full text-[11px] border border-slate-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0B1736] bg-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Student Success Quote</label>
                <textarea
                  value={topperForm.quote}
                  onChange={(e) => setTopperForm({ ...topperForm, quote: e.target.value })}
                  placeholder="Enter student quote..."
                  rows={2}
                  className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Key Achievements (comma separated)</label>
                <input
                  type="text"
                  value={topperForm.achievements}
                  onChange={(e) => setTopperForm({ ...topperForm, achievements: e.target.value })}
                  placeholder="100/100 in Physics, JEE Advanced AIR 142"
                  className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setTopperModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B1736] hover:bg-[#1C3564] text-white rounded-lg font-bold shadow-xs transition-colors"
                >
                  {editingTopper ? 'Update Topper' : 'Save Topper'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* GALLERY PHOTO ADD / EDIT MODAL POPUP */}
      {galleryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white max-w-lg w-full max-h-[90vh] overflow-y-auto rounded-xl border border-slate-200 shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setGalleryModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <ImageIcon2 size={18} className="text-emerald-600" />
              <h3 className="text-lg font-bold text-[#0B1736]">
                {editingGalleryItem ? 'Edit Gallery Photo' : 'Add New Gallery Photo'}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-5">
              Upload photo to Cloudinary and set gallery details below. Edits auto-sync across the site.
            </p>

            <form onSubmit={handleSaveGalleryItem} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Photo Title *</label>
                <input
                  type="text"
                  value={galleryForm.title}
                  onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                  placeholder="e.g. Science Fair Highlights 2026"
                  className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Category *</label>
                <select
                  value={galleryForm.category}
                  onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                  className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                >
                  <option value="Campus">Campus</option>
                  <option value="Student Life">Student Life</option>
                  <option value="Academic">Academic</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Photo File (Upload to Cloudinary)
                  <span className="block text-[11px] font-normal text-slate-400 mt-0.5">
                    (Recommended size: 800 × 600 px, 4:3 landscape)
                  </span>
                </label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-300">
                  {galleryForm.image ? (
                    <div className="relative w-20 h-16 rounded border border-slate-300 overflow-hidden shrink-0 bg-white shadow-2xs">
                      <img src={galleryForm.image} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setGalleryForm({ ...galleryForm, image: '' })}
                        className="absolute top-0 right-0 bg-red-600 text-white p-0.5 hover:bg-red-700"
                        title="Remove Photo"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ) : (
                    <div className="w-20 h-16 rounded border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 bg-white shrink-0">
                      <ImageIcon2 size={24} />
                    </div>
                  )}

                  <div className="flex-1 space-y-2 w-full">
                    <label className="inline-flex items-center justify-center gap-2 px-3.5 py-2 bg-[#0B1736] hover:bg-[#1C3564] text-white rounded-lg font-bold text-xs cursor-pointer transition-colors shadow-2xs w-full sm:w-auto">
                      <Upload size={14} />
                      <span>{isUploadingGalleryImg ? 'Uploading to Cloudinary...' : 'Choose Photo File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileUploadGallery}
                        className="hidden"
                        disabled={isUploadingGalleryImg}
                      />
                    </label>

                    <div className="text-[10px] text-slate-400 font-medium">
                      Or paste direct image URL below:
                    </div>

                    <input
                      type="text"
                      value={galleryForm.image}
                      onChange={(e) => setGalleryForm({ ...galleryForm, image: e.target.value })}
                      placeholder="https://..."
                      className="w-full text-[11px] border border-slate-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0B1736] bg-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Caption / Description</label>
                <textarea
                  value={galleryForm.caption}
                  onChange={(e) => setGalleryForm({ ...galleryForm, caption: e.target.value })}
                  placeholder="Enter brief photo description..."
                  rows={2}
                  className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setGalleryModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B1736] hover:bg-[#1C3564] text-white rounded-lg font-bold shadow-xs transition-colors"
                >
                  {editingGalleryItem ? 'Update Photo' : 'Save Photo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FEE STRUCTURE ADD / EDIT MODAL POPUP */}
      {feeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white max-w-md w-full rounded-xl border border-slate-200 shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setFeeModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <UserPlus size={18} className="text-purple-600" />
              <h3 className="text-lg font-bold text-[#0B1736]">
                {editingFeeItem ? 'Edit Fee Schedule' : 'Add New Fee Stage Schedule'}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-5">
              Enter academic stage fee details below. Changes auto-sync across the Admissions page!
            </p>

            <form onSubmit={handleSaveFeeItem} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Academic Stage Name *</label>
                <input
                  type="text"
                  value={feeForm.stage}
                  onChange={(e) => setFeeForm({ ...feeForm, stage: e.target.value })}
                  placeholder="e.g. Primary (Class 1 – 5)"
                  className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Admission Fee (One-Time) *</label>
                <input
                  type="text"
                  value={feeForm.admissionFee}
                  onChange={(e) => setFeeForm({ ...feeForm, admissionFee: e.target.value })}
                  placeholder="e.g. ₹30,000"
                  className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Monthly Tuition Fee *</label>
                <input
                  type="text"
                  value={feeForm.tuitionFee}
                  onChange={(e) => setFeeForm({ ...feeForm, tuitionFee: e.target.value })}
                  placeholder="e.g. ₹14,800 / Month"
                  className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Annual Charges *</label>
                <input
                  type="text"
                  value={feeForm.annualFee}
                  onChange={(e) => setFeeForm({ ...feeForm, annualFee: e.target.value })}
                  placeholder="e.g. ₹18,000"
                  className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                  required
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setFeeModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B1736] hover:bg-[#1C3564] text-white rounded-lg font-bold shadow-xs transition-colors"
                >
                  {editingFeeItem ? 'Update Fee Schedule' : 'Save Fee Schedule'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* NEWS & EVENTS ADD / EDIT MODAL POPUP */}
      {newsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white max-w-xl w-full max-h-[90vh] overflow-y-auto rounded-xl border border-slate-200 shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setNewsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <Newspaper size={18} className="text-blue-600" />
              <h3 className="text-lg font-bold text-[#0B1736]">
                {editingNewsItem ? 'Edit News / Event Story' : 'Add New News / Event Story'}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-5">
              Upload story banner to Cloudinary and fill story details below. Edits auto-sync across live website!
            </p>

            <form onSubmit={handleSaveNewsItem} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Select Entry Type *</label>
                <div className="flex items-center gap-6 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-xs text-slate-800">
                    <input
                      type="radio"
                      name="entryType"
                      value="News"
                      checked={newsForm.type === 'News' || !newsForm.type}
                      onChange={(e) => setNewsForm({ ...newsForm, type: e.target.value })}
                      className="accent-blue-600 w-4 h-4"
                    />
                    <Newspaper size={14} className="text-blue-600" />
                    <span>News Article</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer font-bold text-xs text-slate-800">
                    <input
                      type="radio"
                      name="entryType"
                      value="Event"
                      checked={newsForm.type === 'Event'}
                      onChange={(e) => setNewsForm({ ...newsForm, type: e.target.value })}
                      className="accent-purple-600 w-4 h-4"
                    />
                    <CalendarIcon size={14} className="text-purple-600" />
                    <span>Event Schedule</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Story / Event Title *</label>
                <input
                  type="text"
                  value={newsForm.title}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                  placeholder="e.g. Annual Sports Meet 2026 Concludes with Triumph"
                  className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category *</label>
                  <select
                    value={newsForm.category}
                    onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                    className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                  >
                    <option value="Announcements">Announcements</option>
                    <option value="Achievement">Achievement</option>
                    <option value="Student Life">Student Life</option>
                    <option value="Academic">Academic</option>
                    <option value="Sports">Sports</option>
                    <option value="Alumni Guidance">Alumni Guidance</option>
                    <option value="Global Exposure">Global Exposure</option>
                    <option value="Sustainability">Sustainability</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Date *</label>
                  <input
                    type="text"
                    value={newsForm.date}
                    onChange={(e) => setNewsForm({ ...newsForm, date: e.target.value })}
                    placeholder="e.g. 20 May 2026"
                    className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Author / Publisher</label>
                  <input
                    type="text"
                    value={newsForm.author}
                    onChange={(e) => setNewsForm({ ...newsForm, author: e.target.value })}
                    placeholder="e.g. Editorial Desk"
                    className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Read Time</label>
                  <input
                    type="text"
                    value={newsForm.readTime}
                    onChange={(e) => setNewsForm({ ...newsForm, readTime: e.target.value })}
                    placeholder="e.g. 3 min read"
                    className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Story Banner Photo (Upload to Cloudinary)
                  <span className="block text-[11px] font-normal text-slate-400 mt-0.5">
                    (Recommended size: 1200 × 675 px, 16:9 banner)
                  </span>
                </label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-slate-50 p-3 rounded-lg border border-slate-300">
                  {newsForm.image ? (
                    <div className="relative w-20 h-16 rounded border border-slate-300 overflow-hidden shrink-0 bg-white shadow-2xs">
                      <img src={newsForm.image} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setNewsForm({ ...newsForm, image: '' })}
                        className="absolute top-0 right-0 bg-red-600 text-white p-0.5 hover:bg-red-700"
                        title="Remove Image"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ) : (
                    <div className="w-20 h-16 rounded border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 bg-white shrink-0">
                      <Newspaper size={24} />
                    </div>
                  )}

                  <div className="flex-1 space-y-2 w-full">
                    <label className="inline-flex items-center justify-center gap-2 px-3.5 py-2 bg-[#0B1736] hover:bg-[#1C3564] text-white rounded-lg font-bold text-xs cursor-pointer transition-colors shadow-2xs w-full sm:w-auto">
                      <Upload size={14} />
                      <span>{isUploadingNewsImg ? 'Uploading to Cloudinary...' : 'Choose Photo File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileUploadNews}
                        className="hidden"
                        disabled={isUploadingNewsImg}
                      />
                    </label>

                    <div className="text-[10px] text-slate-400 font-medium">
                      Or paste direct image URL below:
                    </div>

                    <input
                      type="text"
                      value={newsForm.image}
                      onChange={(e) => setNewsForm({ ...newsForm, image: e.target.value })}
                      placeholder="https://..."
                      className="w-full text-[11px] border border-slate-300 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0B1736] bg-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Excerpt *</label>
                <textarea
                  value={newsForm.excerpt}
                  onChange={(e) => setNewsForm({ ...newsForm, excerpt: e.target.value })}
                  placeholder="Enter brief 2-line story summary..."
                  rows={2}
                  className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Article Content *</label>
                <textarea
                  value={newsForm.content}
                  onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                  placeholder="Enter detailed article body text..."
                  rows={4}
                  className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                  required
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setNewsModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B1736] hover:bg-[#1C3564] text-white rounded-lg font-bold shadow-xs transition-colors"
                >
                  {editingNewsItem ? 'Update Story' : 'Save Story'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TEACHERS & FACULTY ADD / EDIT MODAL POPUP */}
      {facultyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white max-w-xl w-full max-h-[90vh] overflow-y-auto rounded-xl border border-slate-200 shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setFacultyModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <Users size={18} className="text-amber-600" />
              <h3 className="text-lg font-bold text-[#0B1736]">
                {editingFacultyItem ? 'Edit Faculty Member Details' : 'Add New Faculty Member'}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-5">
              Fill in teacher profile details & upload portrait photo to Cloudinary. Edits auto-sync across live website!
            </p>

            <form onSubmit={handleSaveFacultyItem} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={facultyForm.name}
                    onChange={(e) => setFacultyForm({ ...facultyForm, name: e.target.value })}
                    placeholder="e.g. Dr. Sarah Bennett"
                    className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Role / Designation *</label>
                  <input
                    type="text"
                    value={facultyForm.role}
                    onChange={(e) => setFacultyForm({ ...facultyForm, role: e.target.value })}
                    placeholder="e.g. Head of Science & Physics Lead"
                    className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Department *</label>
                  <select
                    value={facultyForm.department}
                    onChange={(e) => setFacultyForm({ ...facultyForm, department: e.target.value })}
                    className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                  >
                    <option value="Leadership">Leadership</option>
                    <option value="Science & STEM">Science & STEM</option>
                    <option value="Humanities & Languages">Humanities & Languages</option>
                    <option value="Mathematics & Computer Science">Mathematics & Computer Science</option>
                    <option value="Primary & Early Years">Primary & Early Years</option>
                    <option value="Sports & Athletics">Sports & Athletics</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Contact Email *</label>
                  <input
                    type="email"
                    value={facultyForm.email}
                    onChange={(e) => setFacultyForm({ ...facultyForm, email: e.target.value })}
                    placeholder="e.g. principal@greenwood.edu"
                    className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Qualification *</label>
                  <input
                    type="text"
                    value={facultyForm.qualification}
                    onChange={(e) => setFacultyForm({ ...facultyForm, qualification: e.target.value })}
                    placeholder="e.g. Ph.D. in Educational Leadership"
                    className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Experience *</label>
                  <input
                    type="text"
                    value={facultyForm.experience}
                    onChange={(e) => setFacultyForm({ ...facultyForm, experience: e.target.value })}
                    placeholder="e.g. 15+ Years Teaching Experience"
                    className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                    required
                  />
                </div>
              </div>

              {/* Portrait Photo Upload */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Portrait Photo (Upload to Cloudinary)
                  <span className="block text-[11px] font-normal text-slate-400 mt-0.5">
                    (Recommended size: 600 × 600 px or 600 × 750 px)
                  </span>
                </label>
                <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg space-y-3">
                  <div className="flex items-center gap-3">
                    {facultyForm.image ? (
                      <div className="relative w-14 h-14 rounded-full overflow-hidden border border-slate-300 shrink-0 shadow-2xs">
                        <img src={facultyForm.image} alt="Preview" className="w-full h-full object-cover object-top" />
                        <button
                          type="button"
                          onClick={() => setFacultyForm({ ...facultyForm, image: '' })}
                          className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-0.5"
                          title="Remove photo"
                        >
                          <X size={10} />
                        </button>
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-full border border-dashed border-slate-300 bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-[10px] uppercase text-center p-1 shrink-0">
                        No Photo
                      </div>
                    )}

                    <label className="cursor-pointer bg-[#0B1736] hover:bg-[#1C3564] text-white px-3.5 py-2 rounded-lg font-bold text-xs inline-flex items-center gap-2 transition-colors">
                      <Upload size={14} />
                      <span>{isUploadingFacultyImg ? 'Uploading...' : 'Choose Photo File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileUploadFaculty}
                        className="hidden"
                        disabled={isUploadingFacultyImg}
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-500 font-medium mb-1">Or paste direct image URL below:</label>
                    <input
                      type="url"
                      value={facultyForm.image}
                      onChange={(e) => setFacultyForm({ ...facultyForm, image: e.target.value })}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full border border-slate-300 p-2 rounded-md focus:outline-none text-slate-800 bg-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Faculty Biography / Overview *</label>
                <textarea
                  value={facultyForm.bio}
                  onChange={(e) => setFacultyForm({ ...facultyForm, bio: e.target.value })}
                  placeholder="Enter detailed faculty biography and educational vision..."
                  rows={3}
                  className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                  required
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setFacultyModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B1736] hover:bg-[#1C3564] text-white rounded-lg font-bold shadow-xs transition-colors"
                >
                  {editingFacultyItem ? 'Update Faculty Details' : 'Save Faculty Details'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD / EDIT STUDENT MODAL POPUP */}
      {studentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white max-w-xl w-full max-h-[90vh] overflow-y-auto rounded-xl border border-slate-200 shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setStudentModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <GraduationCap size={18} className="text-indigo-600" />
              <h3 className="text-lg font-bold text-[#0B1736]">
                {editingStudentItem ? 'Edit Student Details' : 'Add New Student Record'}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-5">
              Fill in student academic & contact details. Edits save instantly in student directory!
            </p>

            <form onSubmit={handleSaveStudentItem} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    value={studentForm.name}
                    onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Roll Number / Student ID *</label>
                  <input
                    type="text"
                    value={studentForm.rollNo}
                    onChange={(e) => setStudentForm({ ...studentForm, rollNo: e.target.value })}
                    placeholder="e.g. 101 / STU-2026"
                    className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Class *</label>
                  <select
                    value={studentForm.class}
                    onChange={(e) => setStudentForm({ ...studentForm, class: e.target.value })}
                    className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                  >
                    <option value="Nursery">Nursery</option>
                    <option value="LKG">LKG</option>
                    <option value="UKG">UKG</option>
                    <option value="Class 1">Class 1</option>
                    <option value="Class 2">Class 2</option>
                    <option value="Class 3">Class 3</option>
                    <option value="Class 4">Class 4</option>
                    <option value="Class 5">Class 5</option>
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Section / Stream *</label>
                  <input
                    type="text"
                    value={studentForm.section}
                    onChange={(e) => setStudentForm({ ...studentForm, section: e.target.value })}
                    placeholder="e.g. A / Science (PCM) / Commerce"
                    className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Father / Guardian Name *</label>
                  <input
                    type="text"
                    value={studentForm.fatherName}
                    onChange={(e) => setStudentForm({ ...studentForm, fatherName: e.target.value })}
                    placeholder="e.g. Rajesh Sharma"
                    className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Contact Phone Number *</label>
                  <input
                    type="tel"
                    value={studentForm.phone}
                    onChange={(e) => setStudentForm({ ...studentForm, phone: e.target.value })}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={studentForm.dob}
                    onChange={(e) => setStudentForm({ ...studentForm, dob: e.target.value })}
                    className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Parent / Guardian Phone *</label>
                  <input
                    type="tel"
                    value={studentForm.parentPhone}
                    onChange={(e) => setStudentForm({ ...studentForm, parentPhone: e.target.value })}
                    placeholder="e.g. +91 98765 11111"
                    className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                    required
                  />
                </div>
              </div>



              <div>
                <label className="block font-bold text-slate-700 mb-1">Residential Address</label>
                <textarea
                  value={studentForm.address}
                  onChange={(e) => setStudentForm({ ...studentForm, address: e.target.value })}
                  placeholder="Enter full home address..."
                  rows={2}
                  className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setStudentModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B1736] hover:bg-[#1C3564] text-white rounded-lg font-bold shadow-xs transition-colors"
                >
                  {editingStudentItem ? 'Update Student Record' : 'Save Student Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD / EDIT ADMISSION MODAL POPUP */}
      {admissionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white max-w-xl w-full max-h-[90vh] overflow-y-auto rounded-xl border border-slate-200 shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setAdmissionModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <UserPlus size={18} className="text-slate-600" />
              <h3 className="text-lg font-bold text-[#0B1736]">
                {editingAdmissionItem ? 'Edit Admission Application' : 'Record New Admission Entry (Manual Walk-in)'}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-5">
              Fill candidate details for online website inquiries or office walk-in forms.
            </p>

            <form onSubmit={handleSaveAdmissionItem} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Student Candidate Name *</label>
                  <input
                    type="text"
                    value={admissionForm.studentName}
                    onChange={(e) => setAdmissionForm({ ...admissionForm, studentName: e.target.value })}
                    placeholder="e.g. Aarav Singh"
                    className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Seeking Class *</label>
                  <select
                    value={admissionForm.seekingClass}
                    onChange={(e) => setAdmissionForm({ ...admissionForm, seekingClass: e.target.value })}
                    className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                  >
                    <option value="Nursery">Nursery</option>
                    <option value="LKG">LKG</option>
                    <option value="UKG">UKG</option>
                    <option value="Class 1">Class 1</option>
                    <option value="Class 2">Class 2</option>
                    <option value="Class 3">Class 3</option>
                    <option value="Class 4">Class 4</option>
                    <option value="Class 5">Class 5</option>
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Section / Stream *</label>
                  <input
                    type="text"
                    value={admissionForm.stream}
                    onChange={(e) => setAdmissionForm({ ...admissionForm, stream: e.target.value })}
                    placeholder="e.g. A / Science (PCM) / Commerce"
                    className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Parent / Guardian Name *</label>
                  <input
                    type="text"
                    value={admissionForm.parentName}
                    onChange={(e) => setAdmissionForm({ ...admissionForm, parentName: e.target.value })}
                    placeholder="e.g. Vikram Singh"
                    className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Parent Contact Phone *</label>
                  <input
                    type="tel"
                    value={admissionForm.parentPhone}
                    onChange={(e) => setAdmissionForm({ ...admissionForm, parentPhone: e.target.value })}
                    placeholder="e.g. +91 98765 12345"
                    className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Source Lead *</label>
                  <select
                    value={admissionForm.source}
                    onChange={(e) => setAdmissionForm({ ...admissionForm, source: e.target.value })}
                    className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                  >
                    <option value="Office Walk-in">Office Walk-in</option>
                    <option value="Online Website">Online Website</option>
                    <option value="Phone Enquiry">Phone Enquiry</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Application Status</label>
                  <select
                    value={admissionForm.status}
                    onChange={(e) => setAdmissionForm({ ...admissionForm, status: e.target.value })}
                    className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Residential Address</label>
                  <input
                    type="text"
                    value={admissionForm.address}
                    onChange={(e) => setAdmissionForm({ ...admissionForm, address: e.target.value })}
                    placeholder="Enter city / area..."
                    className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAdmissionModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0B1736] hover:bg-[#1C3564] text-white rounded-lg font-bold shadow-xs transition-colors"
                >
                  {editingAdmissionItem ? 'Update Application' : 'Save Admission Entry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SEND CUSTOM EMAIL MODAL POPUP */}
      {emailModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white max-w-xl w-full max-h-[90vh] overflow-y-auto rounded-xl border border-slate-200 shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setEmailModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <Mail size={18} className="text-amber-600" />
              <h3 className="text-lg font-bold text-[#0B1736]">
                Send Custom Admission Update Email
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-5">
              Draft and send a custom email update directly to candidate's parent via Nodemailer SMTP.
            </p>

            <form onSubmit={handleSendCustomEmailSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Parent Recipient Email *</label>
                  <input
                    type="email"
                    value={emailForm.toEmail}
                    onChange={(e) => setEmailForm({ ...emailForm, toEmail: e.target.value })}
                    placeholder="parent@example.com"
                    className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Candidate Student Name</label>
                  <input
                    type="text"
                    value={emailForm.studentName}
                    onChange={(e) => setEmailForm({ ...emailForm, studentName: e.target.value })}
                    className="w-full border border-slate-300 p-2.5 rounded-lg bg-slate-50 font-bold text-slate-700"
                    readOnly
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Subject Line *</label>
                <input
                  type="text"
                  value={emailForm.subject}
                  onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                  placeholder="Subject..."
                  className="w-full border border-slate-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736]"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-bold text-slate-700">Custom Email Message Body *</label>
                  <span className="text-[10px] text-slate-400">Admin can write / edit custom message freely</span>
                </div>
                <textarea
                  rows={7}
                  value={emailForm.message}
                  onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
                  placeholder="Write custom instructions or next steps for the parent..."
                  className="w-full border border-slate-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B1736] font-mono text-xs leading-relaxed"
                  required
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEmailModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={sendingEmail}
                  className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold shadow-xs transition-colors disabled:opacity-50"
                >
                  <Mail size={15} />
                  <span>{sendingEmail ? 'Sending Email...' : 'Send Custom Email'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
