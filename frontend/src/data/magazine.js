export const magazineData = {
  title: 'The Greenwood Chronicle',
  subtitle: 'Annual School Magazine & Retrospective',
  edition: 'Edition 2025–26 • Volume XVIII',
  theme: 'Nurturing Minds, Inspiring Futures',
  publishedDate: 'January 2026',
  totalPages: 10,
  chiefEditor: 'Aarav Sharma (Head Boy)',
  staffAdvisor: 'Dr. Sunita Deshmukh (Dept. of English)',
  pages: [
    {
      pageNumber: 1,
      type: 'cover',
      title: 'THE GREENWOOD CHRONICLE',
      subtitle: 'Annual Retrospective • 2025–26',
      edition: 'Vol. XVIII',
      theme: 'Theme: Igniting Young Minds for Global Impact',
      tagline: 'CBSE Affiliation No. 2130842 • Excellence in Holistic Education',
      highlights: [
        '✨ 100% CBSE Class 10 & 12 Board Results',
        '🚀 National Robotics Championship Gold Medalists',
        '🎨 "Colors of Greenwood" Student Art & Poetry Gallery',
        '🏆 Annual Sports Meet & Inter-House Shield Winners',
        '🎭 "TARANG 2026" Mega Cultural Fest Highlights'
      ]
    },
    {
      pageNumber: 2,
      type: 'editorial',
      title: 'Editorial Desk & Table of Contents',
      subtitle: 'From the Student Council & Editorial Board',
      author: 'Aarav Sharma & Diya Kapoor (Student Editors)',
      content: `Welcome to the 18th Annual Edition of The Greenwood Chronicle. This volume encapsulates a magnificent year of intellectual curiosity, artistic expression, athletic triumphs, and community outreach. 

Through these glossy pages, we invite you to journey through the lively corridors of Greenwood Academy, where dreams take flight and character is forged with discipline and compassion.`,
      toc: [
        { page: 3, title: 'From the Principal\'s Desk: Shaping Tomorrow\'s Leaders' },
        { page: 4, title: 'Academic Milestones & CBSE Board Toppers Spotlight' },
        { page: 5, title: 'STEM, AI & Robotics Club: Innovating for Real-World Impact' },
        { page: 6, title: 'Creative Canvas: Student Poetry, Essays & Fine Arts' },
        { page: 7, title: 'Sports Arena & Annual Inter-House Championship' },
        { page: 8, title: 'Cultural Kaleidoscope: TARANG 2026 Gala & Dramatics' },
        { page: 9, title: 'Eco-Club Initiatives & Social Outreach Drives' },
        { page: 10, title: 'Alumni Spotlight & Greenwood Heritage' }
      ]
    },
    {
      pageNumber: 3,
      type: 'principal_desk',
      title: 'From the Principal\'s Desk',
      subtitle: 'Nurturing Intellect with Human Values',
      author: 'Dr. Rajeshwar Sharma, Ph.D. (Principal)',
      quote: '"Education is not the learning of facts, but the training of the mind to think and the heart to feel."',
      content: `Dear Greenwood Family,

As we reflect upon the academic session 2025–26, my heart swells with profound gratitude and pride. Our students have not only excelled in CBSE Board Examinations and competitive frontiers like JEE and NEET, but have also demonstrated unwavering moral integrity, empathy, and resilience.

In an era rapidly transformed by Artificial Intelligence, Greenwood Academy remains steadfast in cultivating uniquely human virtues: critical inquiry, ethical leadership, aesthetic appreciation, and deep-rooted cultural grounding. 

I extend my heartfelt congratulations to the editorial team, our visionary teachers, and supportive parents for making this chronicle a living testament to our ethos.`,
      signature: 'Dr. Rajeshwar Sharma'
    },
    {
      pageNumber: 4,
      type: 'academics',
      title: 'Academic Laurels & Board Triumphs',
      subtitle: 'CBSE Class 10 & 12 Board Examinations 2025–26',
      badge: '100% Distinction Record',
      stats: [
        { label: 'School Average', val: '89.4%' },
        { label: 'Perfect 100/100s', val: '48' },
        { label: 'JEE / NEET Cleared', val: '34+' },
        { label: 'National Merit Rankers', val: '12' }
      ],
      spotlight: [
        { name: 'Sneha Sharma', class: 'Class 12 (Science)', score: '98.8%', rank: '1st School Topper', achievement: '100/100 in Physics & Chemistry • AIR 142 JEE' },
        { name: 'Aarav Sharma', class: 'Class 10 (CBSE)', score: '99.0%', rank: 'Class 10 State Ranker', achievement: '100/100 in Mathematics & Science' },
        { name: 'Ananya Verma', class: 'Class 12 (Commerce)', score: '98.4%', rank: 'Commerce Stream Topper', achievement: '100/100 in Accountancy • CUET 100 Percentile' }
      ],
      note: 'Greenwood Academy continues its unbroken tradition of 100% Board Pass Percentage with over 62% of students securing above 90% aggregate.'
    },
    {
      pageNumber: 5,
      type: 'stem_innovation',
      title: 'STEM, AI & Robotics Innovation',
      subtitle: 'Hands-On Discovery at Atal Tinkering Lab',
      projects: [
        {
          title: 'Autonomous Solar Rover Prototype',
          team: 'Senior Robotics Club (Class 11)',
          desc: 'Designed an AI-powered agricultural monitoring rover equipped with soil moisture sensors and computer vision for crop disease detection. Winner of National STEM Olympiad 2025.'
        },
        {
          title: 'Smart Campus Waste Segregator',
          team: 'Eco-STEM Innovators (Class 9 & 10)',
          desc: 'Built an automated bin using OpenCV object recognition that categorizes dry, wet, and e-waste in under 2 seconds.'
        },
        {
          title: 'Greenwood Weather & Air Quality Station',
          team: 'Physics & IoT Society',
          desc: 'Live IoT telemetry system broadcasting real-time AQI, PM2.5 levels, and humidity data on the school smart board.'
        }
      ]
    },
    {
      pageNumber: 6,
      type: 'creative_arts',
      title: 'Creative Canvas: Student Poetry & Art',
      subtitle: 'Expressions of Heart & Mind',
      poem: {
        title: 'उड़ान हौसलों की (Wings of Ambition)',
        author: 'प्रिया मिश्रा (Class 11-A)',
        hindiContent: `न पंखों की मोहताज है यह उड़ान हमारी,
हौसलों से नाप लेंगे आसमां की बारी।
ज्ञान का दीप जलाकर हम राह बनाएंगे,
ग्रीनवुड की छांव में हम जग चमकाएंगे।

कदम न रुकेंगे कभी तूफानों के डर से,
सच की राह चलेंगे हम अपने ही दम पे!`
      },
      prose: {
        title: 'The Silent Whispers of the Old Banyan Tree',
        author: 'Rohan Mehra (Class 9-C)',
        excerpt: 'Under the shade of the ancient campus banyan tree, generations of greenwoodians have shared laughter, solved algebraic equations, and forged lifelong friendships. It stands not merely as flora, but as our quiet guardian.'
      }
    },
    {
      pageNumber: 7,
      type: 'sports',
      title: 'Sports Arena & House Championship',
      subtitle: 'Discipline, Grit & Athletic Glory',
      leaderboard: [
        { house: 'Agni House (Red)', points: '1,420 pts', rank: '1st Place 🏆', badge: 'Champions' },
        { house: 'Trishul House (Gold)', points: '1,380 pts', rank: '2nd Place', badge: 'Runners-Up' },
        { house: 'Vayu House (Blue)', points: '1,290 pts', rank: '3rd Place', badge: 'Fair Play Trophy' },
        { house: 'Prithvi House (Green)', points: '1,240 pts', rank: '4th Place', badge: 'Best March Past' }
      ],
      sportsHighlights: [
        '🏊 Kavya Pandey (Class 10) bagged 3 Gold Medals at CBSE National Swimming Meet (200m Freestyle & Butterfly).',
        '🏀 Greenwood Senior Girls Basketball Team lifted the Inter-DPS Invitational Trophy 2025.',
        '⚽ Annual Inter-House Football Tournament witnessed a nail-biting final won by Agni House in penalty shootouts.'
      ]
    },
    {
      pageNumber: 8,
      type: 'cultural_fest',
      title: 'Cultural Kaleidoscope: TARANG 2026',
      subtitle: 'Annual Cultural Festival & Performing Arts Gala',
      events: [
        {
          title: 'Symphony of Traditions — Mega Dance Drama',
          desc: 'A mesmerizing confluence of Kathak, Bharatanatyam, and contemporary dance performed by 120 senior students depicting India\'s environmental heritage.'
        },
        {
          title: 'The Greenwood Acoustic Band',
          desc: 'Electrifying fusion band performance led by the Student Music Society, receiving a standing ovation from over 2,500 parents and guests.'
        },
        {
          title: 'Shakespearean Theatre: "The Merchant of Venice"',
          desc: 'A modern dramatic adaptation staged with period costumes and professional stage lighting by the Dramatics Club.'
        }
      ]
    },
    {
      pageNumber: 9,
      type: 'community',
      title: 'Community Outreach & Eco-Drive',
      subtitle: 'Compassion in Action: "Project Sahyog"',
      initiatives: [
        {
          title: 'Green Earth Drive: 5,000 Native Trees Planted',
          desc: 'Greenwood Eco-Club planted over 5,000 indigenous saplings across 4 suburban villages, adopting drip irrigation for 100% survival rate.'
        },
        {
          title: 'Digital Literacy for Rural Youth',
          desc: 'Senior student volunteers conducted weekly computer coding and English communication workshops for over 200 underprivileged village students.'
        },
        {
          title: 'Annual Winter Warmth & Book Donation Drive',
          desc: 'Collected over 3,200 blankets, warm woolens, and 4,500 library books for local community shelters.'
        }
      ]
    },
    {
      pageNumber: 10,
      type: 'back_cover',
      title: 'GREENWOOD ACADEMY',
      subtitle: 'Empowering Generations Since 1998',
      motto: '"Vidya Dadati Vinayam" — Knowledge Bestows Humility',
      stats: 'CBSE Affiliation No. 2130842 • Co-Educational English Medium (Nursery to XII)',
      address: 'Knowledge Park IV, Greater Noida, Uttar Pradesh 201310',
      contact: 'Phone: +91 98765 43210 • Email: info@greenwood.edu.in',
      website: 'www.greenwood.edu.in',
      copyright: '© 2026 Greenwood Academy. Published by the Editorial Board. All rights reserved.'
    }
  ]
}
