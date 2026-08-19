import campusImg from '../assets/images/about-campus.avif'
import class4Img from '../assets/images/class4.jpg'
import class7Img from '../assets/images/class7.jpg'

const eventsData = [
  {
    slug: 'open-day-aug-2026',
    title: 'Admissions Open Day 2026–27',
    day: '20',
    month: 'AUG',
    fullDate: '20 August 2026',
    time: '10:00 AM – 1:00 PM',
    category: 'Admissions',
    location: 'School Auditorium & Campus Grounds',
    image: campusImg,
    description:
      'Guided campus tour, interaction with Principal Dr. Sarah Bennett and department heads, and detailed briefing on admission procedures for 2026–27.',
    highlights: [
      'Interactive campus tour of STEM labs, sports fields, and library',
      'Principal keynote address & Q&A session for parents',
      'One-on-one consultation with Admissions Team',
      'On-the-spot form assistance and prospectus desk',
    ],
    status: 'Upcoming',
  },
  {
    slug: 'parent-teacher-meeting-q1',
    title: 'Parent–Teacher Meeting (Q1 Progress)',
    day: '30',
    month: 'AUG',
    fullDate: '30 August 2026',
    time: '9:00 AM – 12:00 PM',
    category: 'Academic',
    location: 'Respective Classrooms',
    image: class4Img,
    description:
      'Comprehensive review of first quarter academic performance, holistic development progress, and parent-teacher collaboration goals.',
    highlights: [
      'One-on-one discussion with class mentors & subject specialist teachers',
      'Review of Q1 report cards and formative assessment feedback',
      'Discussion on co-curricular participation and wellness',
    ],
    status: 'Upcoming',
  },
  {
    slug: 'annual-sports-meet-2026',
    title: 'Annual Inter-House Sports Championship',
    day: '15',
    month: 'SEP',
    fullDate: '15 September 2026',
    time: '8:30 AM – 3:30 PM',
    category: 'Sports',
    location: 'Greenwood Athletics Complex & Arena',
    image: class7Img,
    description:
      'Inter-house athletics, track & field finals, gymnastics demonstrations, and house march past competition.',
    highlights: [
      '100m, 200m, 4x100m relay track events',
      'Inter-house championship trophy presentation',
      'Parent-Faculty friendly tug-of-war match',
    ],
    status: 'Upcoming',
  },
  {
    slug: 'science-fair-exhibition-2026',
    title: 'Annual Science & Tech Innovation Fair',
    day: '10',
    month: 'OCT',
    fullDate: '10 October 2026',
    time: '9:30 AM – 2:30 PM',
    category: 'Workshops',
    location: 'STEM Innovation Block',
    image: campusImg,
    description:
      'Over 100 student working models, renewable energy prototypes, and robotics demonstrations judged by university professors.',
    highlights: [
      'Live working models & AI coding demonstrations',
      'Guest lecture by eminent scientist',
      'Awards for Best Innovation and Eco-Friendly Project',
    ],
    status: 'Upcoming',
  },
]

export default eventsData
