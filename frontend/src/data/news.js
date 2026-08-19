import newsImg from '../assets/bg-images/news.jpg'
import class4Img from '../assets/images/class4.jpg'
import class7Img from '../assets/images/class7.jpg'
import class12Img from '../assets/images/class12.jpg'
import campusImg from '../assets/images/about-campus.avif'
import auditoriumImg from '../assets/images/campus_facilities/auditoriam.webp'
import smartLibraryImg from '../assets/images/campus_facilities/smartlibrary.webp'
import scienceClassImg from '../assets/images/campus_facilities/Science_Class.webp'

const newsData = [
  {
    slug: 'academic-excellence-award-2026',
    category: 'Achievement',
    date: '12 April 2026',
    title: 'Greenwood Students Receive National Academic Excellence Awards',
    excerpt: 'Our Senior Secondary batch achieved 100% distinction rate in national board examinations, placing Greenwood among top 10 schools.',
    content:
      'Greenwood Academy is proud to announce that 15 of our senior students have been awarded prestigious National Academic Excellence Medals for outstanding performance in STEM, Humanities, and Languages. The ceremony was held in New Delhi with distinguished educators and leaders in attendance. Principal Dr. Sarah Bennett commended the students and faculty for their tireless dedication.',
    image: class12Img,
    author: 'Editorial Desk',
    readTime: '4 min read',
  },
  {
    slug: 'young-alumni-panel-2026',
    category: 'Alumni Guidance',
    date: '18 July 2026',
    title: 'Greenwood Launches 2026 Young Alumni College & Career Panel',
    excerpt: 'Distinguished alumni from Harvard, NYU, and IIT return to campus to mentor senior secondary students on university admissions.',
    content:
      'Greenwood hosted its annual Young Alumni Panel, bringing back former graduates currently studying at top Indian and global universities. The interactive sessions covered portfolio preparation, entrance exam strategies, and career pathways in AI, Law, and Finance.',
    image: auditoriumImg,
    author: 'Alumni Cell',
    readTime: '3 min read',
  },
  {
    slug: 'annual-arts-festival-2026',
    category: 'Student Life',
    date: '28 March 2026',
    title: 'Annual Arts & Cultural Festival Showcases Student Creativity',
    excerpt: 'Three days of vibrant music, theatrical performances, and visual art exhibitions drew over 2,000 visitors to the school campus.',
    content:
      'The Greenwood Annual Arts Festival concluded with a spectacular musical showcase featuring our 50-member student orchestra and drama productions. Students across primary and senior schools displayed over 300 original paintings, sculptures, and digital art installations in the main gallery hall.',
    image: class4Img,
    author: 'Cultural Committee',
    readTime: '3 min read',
  },
  {
    slug: 'international-model-un-2026',
    category: 'Global Exposure',
    date: '04 July 2026',
    title: 'Greenwood Model UN Delegation Wins Best School Delegation Award',
    excerpt: 'Our 24-member student delegate team secured top honors across Security Council and Economic committees at the National MUN.',
    content:
      'At the 2026 National Model United Nations Conference, Greenwood Academy delegates demonstrated exceptional diplomacy, resolution drafting, and debate skills, bringing home the coveted Best Delegation Shield.',
    image: smartLibraryImg,
    author: 'Debate Society',
    readTime: '4 min read',
  },
  {
    slug: 'stem-robotics-exhibition-2026',
    category: 'Academic',
    date: '15 February 2026',
    title: 'Middle School Robotics Team Wins Regional STEM Championship',
    excerpt: 'The Greenwood Robotics squad secured first place with their autonomous solar-powered waste management robot prototype.',
    content:
      'Competing against 35 schools from across the state, Greenwood Middle School Robotics team took top honors at the Regional STEM Expo. Guided by STEM Head Mr. Rajesh Verma, the team spent six months designing and programming their prototype robot using advanced sensor technology.',
    image: class7Img,
    author: 'STEM Department',
    readTime: '5 min read',
  },
  {
    slug: 'inter-school-athletics-trophy-2026',
    category: 'Sports',
    date: '05 February 2026',
    title: 'Greenwood Athletics Team Lifts Overall Champions Trophy',
    excerpt: 'Our student athletes brought home 18 Gold, 12 Silver, and 8 Bronze medals at the Inter-School Athletics Championship.',
    content:
      'Demonstrating exceptional sportsmanship and physical grit, Greenwood Academy won the Overall Champions Trophy at the Annual Inter-School Sports Meet. Standout performances in sprint relay, long jump, and swimming highlighted a triumphant week for Sports Director Coach Vikram Singh and our student athletes.',
    image: class12Img,
    author: 'Sports Department',
    readTime: '3 min read',
  },
  {
    slug: 'green-campus-tree-plantation-2026',
    category: 'Sustainability',
    date: '22 June 2026',
    title: 'Greenwood Campus Launches Eco-Drive & Rooftop Solar Grid',
    excerpt: 'Greenwood accelerates its zero-carbon mission with 100kW rooftop solar grid activation and student eco-club tree drive.',
    content:
      'Reinforcing our commitment to environmental stewardship, Greenwood Academy commissioned a 100kW rooftop solar panel system while Eco-Club volunteers planted 200 native trees across the campus perimeter.',
    image: scienceClassImg,
    author: 'Eco Club',
    readTime: '3 min read',
  },
  {
    slug: 'new-stem-innovation-lab-opening',
    category: 'Announcements',
    date: '20 January 2026',
    title: 'Greenwood Inaugurates State-of-the-Art STEM Innovation Lab',
    excerpt: 'Featuring 3D printers, IoT workstations, and AI coding hubs, the new facility empowers hands-on scientific experimentation.',
    content:
      'Greenwood Academy officially opened its new STEM Innovation Lab, designed to give students practical exposure to emerging technologies. The facility includes 3D rapid prototyping, automated electronics testing, and high-performance computing units for student-led research.',
    image: campusImg,
    author: 'Administration',
    readTime: '4 min read',
  },
]

export default newsData
