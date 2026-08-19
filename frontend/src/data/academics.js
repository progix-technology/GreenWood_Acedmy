import classNurseryImg from '../assets/images/classnursery.jpg'
import class4Img from '../assets/images/class4.jpg'
import class7Img from '../assets/images/class7.jpg'
import class12Img from '../assets/images/class12.jpg'

const academicsData = {
  'early-years': {
    key: 'early-years',
    badge: 'NURSERY – CLASS 2',
    title: 'Early Years',
    image: classNurseryImg,
    overview:
      'Our Early Years programme nurtures the natural curiosity of young learners through play-based learning, sensory exploration and foundational literacy. We create a warm, secure environment where every child discovers the joy of learning.',
    curriculum: 'Play-based & thematic learning aligned with NEP 2020',
    methodology: 'Inquiry-based exploration, storytelling, hands-on activities and collaborative play',
    activities: [
      'Nature walks',
      'Puppet making',
      'Rhythm & movement',
      'Story theatre',
      'Cooking experiments',
      'Outdoor physical play',
    ],
    subjects: [
      'Language & Literacy',
      'Number Sense',
      'Environmental Awareness',
      'Creative Arts',
      'Music & Movement',
      'Physical Play',
    ],
    outcomes: [
      'Strong reading foundation',
      'Number fluency',
      'Social-emotional skills',
      'Creative expression',
    ],
  },
  primary: {
    key: 'primary',
    badge: 'CLASS 3 – CLASS 5',
    title: 'Primary School',
    image: class4Img,
    overview:
      'Primary School builds strong academic foundations across core disciplines while encouraging independent thinking and collaborative learning. Our structured yet engaging curriculum prepares students for the challenges of middle school.',
    curriculum: 'CBSE Integrated Primary Curriculum with inquiry-driven projects',
    methodology: 'Activity-based learning, group projects, conceptual problem solving and digital literacy',
    activities: [
      'Science mini-labs',
      'Creative writing workshops',
      'Math Olympiad prep',
      'Drama & public speaking',
      'Art & clay craft',
      'Inter-house sports',
    ],
    subjects: [
      'English Language & Literature',
      'Hindi Language',
      'Mathematics',
      'Environmental Studies (EVS)',
      'Computer Science',
      'Art & Performing Arts',
    ],
    outcomes: [
      'Conceptual clarity',
      'Critical thinking',
      'Collaborative teamwork',
      'Digital literacy',
    ],
  },
  middle: {
    key: 'middle',
    badge: 'CLASS 6 – CLASS 8',
    title: 'Middle School',
    image: class7Img,
    overview:
      'Middle School is where academic depth meets exploration. Students develop critical thinking, research skills and subject-specific understanding while beginning to discover their passions through our broad co-curricular offering.',
    curriculum: 'CBSE Middle School Framework with multidisciplinary projects',
    methodology: 'Experiential lab practicals, research presentations, debate forums and STEM workshops',
    activities: [
      'Robotics & Coding club',
      'Model United Nations (MUN)',
      'Science Fair exhibition',
      'Language literary fest',
      'Field study trips',
      'Competitive sports leagues',
    ],
    subjects: [
      'English Literature & Grammar',
      'Hindi Literature',
      'Sanskrit / French',
      'Mathematics & Algebra',
      'Physics, Chemistry & Biology',
      'History, Civics & Geography',
    ],
    outcomes: [
      'Scientific temperament',
      'Analytical reasoning',
      'Effective communication',
      'Global perspective',
    ],
  },
  senior: {
    key: 'senior',
    badge: 'CLASS 9 – CLASS 12',
    title: 'Senior School',
    image: class12Img,
    overview:
      'Senior School offers rigorous academic preparation with a focus on university readiness. Students choose from Science, Commerce, or Humanities streams and receive personalised guidance for higher education and career planning.',
    curriculum: 'CBSE Board Examination Curriculum (Science, Commerce & Humanities)',
    methodology: 'Rigorous academic drills, competitive exam foundation, lab research and career mentoring',
    activities: [
      'Executive Student Council',
      'University application workshops',
      'Annual Science & Art Exhibition',
      'Inter-school debates',
      'Community service drives',
      'Leadership summits',
    ],
    subjects: [
      'Physics, Chemistry, Math / Bio (Science)',
      'Accountancy, Economics, Business (Commerce)',
      'Political Science, History, Psych (Humanities)',
      'English Core & Physical Education',
      'Computer Science & Informatics',
    ],
    outcomes: [
      'Board exam distinction',
      'Competitive exam readiness',
      'Career clarity',
      'Leadership & integrity',
    ],
  },
}

export default academicsData
