/**
 * portfolioData.ts
 * Single source of truth for all portfolio data.
 * Used by both the Classic portfolio and the Cyberpunk Dashboard.
 * 
 * CRITICAL: All data here is extracted directly from the existing
 * portfolio components. No placeholders or fabricated data.
 */

/* ─── Profile ─── */
export const profile = {
  name: 'Omar Tantawy',
  role: 'Frontend Developer',
  location: 'Egypt',
  timezone: 'GMT+2',
  email: 'omartantawy360@gmail.com',
  status: 'Available for Hire',
  bio: 'A dedicated Front-End Developer with a track record of transforming visual designs into interactive, accessible, and high-performance web products.',
  approach: 'Clean code & premium UI',
  passionateAbout: 'Modern web design',
  quote: '"The details are not the details. They make the design."',
};

/* ─── Social Links ─── */
export const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/omartantawy360', icon: 'github' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/omar-tantawy-a74a96376', icon: 'linkedin' },
  { name: 'WhatsApp', href: 'https://wa.me/201061720405', icon: 'whatsapp' },
  { name: 'Email', href: 'mailto:omartantawy360@gmail.com', icon: 'email' },
];

/* ─── Skills (with proficiency levels for dashboard charts) ─── */
export interface Skill {
  name: string;
  category: 'Frontend' | 'Languages' | 'Tools';
  proficiency: number; // 0-100
}

export const skills: Skill[] = [
  // Frontend
  { name: 'React', category: 'Frontend', proficiency: 90 },
  { name: 'TypeScript', category: 'Frontend', proficiency: 80 },
  { name: 'Tailwind CSS', category: 'Frontend', proficiency: 95 },
  { name: 'Bootstrap 5', category: 'Frontend', proficiency: 85 },
  { name: 'HTML5 / CSS3', category: 'Frontend', proficiency: 95 },
  // Languages
  { name: 'JavaScript (ES6+)', category: 'Languages', proficiency: 88 },
  { name: 'C++ Programming', category: 'Languages', proficiency: 70 },
  { name: 'Python', category: 'Languages', proficiency: 65 },
  // Tools
  { name: 'Git & GitHub', category: 'Tools', proficiency: 85 },
  { name: 'EmailJS', category: 'Tools', proficiency: 75 },
  { name: 'VS Code', category: 'Tools', proficiency: 92 },
  { name: 'npm & Node', category: 'Tools', proficiency: 80 },
];

/* ─── Projects ─── */
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'El-3lamea Leather',
    description: 'A luxury handcrafted genuine leather e-commerce platform featuring bilingual support (AR/EN), dynamic product catalogs, and an editorial dark/light aesthetic.',
    image: `${process.env.PUBLIC_URL}/images/el3almia-leather.png`,
    link: 'https://el3almialeather.com/en',
    tags: ['Next.js', 'React', 'Tailwind', 'E-commerce'],
  },
  {
    id: 2,
    title: 'Blaze Store',
    description: 'A high-performance cyberpunk digital gaming platform specializing in PlayStation games and digital keys with instant delivery and futuristic UI.',
    image: `${process.env.PUBLIC_URL}/images/blaze-store.png`,
    link: 'https://www.blaze-store.com/',
    tags: ['Next.js', 'React', 'Tailwind', 'Gaming'],
  },
  {
    id: 3,
    title: 'Private Burger',
    description: 'A modern online food ordering web app and interactive digital menu for a gourmet burger restaurant with live ordering, customization, and cart flow.',
    image: `${process.env.PUBLIC_URL}/images/private-burger.png`,
    link: 'https://private-burger.vercel.app/',
    tags: ['Next.js', 'React', 'Tailwind', 'Food & Ordering'],
  },
  {
    id: 4,
    title: 'Wave Team',
    description: 'A gorgeous, responsive platform built with React.js and Tailwind CSS.',
    image: `${process.env.PUBLIC_URL}/images/wave-team.png`,
    link: 'https://wave-team.vercel.app/',
    tags: ['React', 'UI Design'],
  },
  {
    id: 5,
    title: 'E-commerce Store',
    description: 'A premium, dynamic e-commerce landing interface for high-end footwear. made with next.js and tailwind css.',
    image: `${process.env.PUBLIC_URL}/images/shop-prototype.png`,
    link: 'https://shop-prototype-nine.vercel.app/',
    tags: ['next.js', 'tailwind', 'E-commerce'],
  },
  {
    id: 6,
    title: 'Academic Center',
    description: 'A minimal, pixel-perfect academic landing page.',
    image: `${process.env.PUBLIC_URL}/images/Acadimic-center2.png`,
    link: 'https://omartantawy360.github.io/Acadimic-center2/',
    tags: ['React', 'tailwind'],
  },
  {
    id: 7,
    title: 'Food Lover Portal',
    description: 'An interactive culinary review and recipe platform featuring rich, dynamic JavaScript DOM interactions and hover transitions.',
    image: `${process.env.PUBLIC_URL}/images/foodlover.png`,
    link: 'https://omartantawy360.github.io/food-lover/',
    tags: ['JavaScript', 'HTML', 'CSS'],
  },
  {
    id: 8,
    title: 'EduComp',
    description: 'premium, full-featured web ecosystem designed to orchestrate academic competitions with professional-grade precision.',
    image: `${process.env.PUBLIC_URL}/images/edu-por-3.png`,
    link: 'https://omartantawy360.github.io/edu-por-3/',
    tags: ['react', 'tailwind'],
  },
  {
    id: 9,
    title: 'Tailwind Landing Platform',
    description: 'A state-of-the-art modern Landing Page featuring complex dark mode states, absolute glassmorphism cards, and Tailwind layers.',
    image: `${process.env.PUBLIC_URL}/images/tailwind.png`,
    link: 'https://omartantawy360.github.io/tailwind-project/',
    tags: ['Tailwind', 'React', 'Dark Mode'],
  },
];

/* ─── Certificates ─── */
export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  image: string;
  link: string;
}

export const certificates: Certificate[] = [
  {
    id: 1,
    title: 'C++ Programming',
    issuer: 'Cisco Networking Academy',
    image: `${process.env.PUBLIC_URL}/images/c++.png`,
    link: 'https://www.credly.com/badges/042a08f2-6193-40fc-a5fa-0b659b60c150/linked_in_profile',
  },
  {
    id: 2,
    title: 'Python Programming',
    issuer: 'Cisco Networking Academy',
    image: `${process.env.PUBLIC_URL}/images/py.png`,
    link: 'https://www.credly.com/badges/2fa4d7fd-fe82-4584-b9b4-83553db38f61/linked_in_profile',
  },
  {
    id: 3,
    title: 'CS50 Computer Science',
    issuer: 'Harvard University',
    image: `${process.env.PUBLIC_URL}/images/cs50.png`,
    link: 'https://cs50.harvard.edu/certificates/9bf9c1b7-79c8-4d55-a82a-a4f286adadc6',
  },
  {
    id: 4,
    title: 'Responsive Web Design',
    issuer: 'freeCodeCamp',
    image: `${process.env.PUBLIC_URL}/images/freecamp.png`,
    link: 'https://www.freecodecamp.org/certification/omartantawy/responsive-web-design',
  },
  {
    id: 5,
    title: 'JavaScript Essentials 1',
    issuer: 'Cisco Networking Academy',
    image: `${process.env.PUBLIC_URL}/images/javascript.png`,
    link: 'https://www.credly.com/badges/ebafc471-56d2-4a76-8e9d-a8caae9c0a69/',
  },
  {
    id: 6,
    title: 'Marketing Fundamentals',
    issuer: 'Yanfaa',
    image: `${process.env.PUBLIC_URL}/images/yanfaa-marketing.png`,
    link: 'https://cdn.yanfaa.com/certificates/33ec7c1e-3992-4e62-abad-8528abba6779.pdf',
  },
];

/* ─── Quick Stats (derived from data) ─── */
export const stats = {
  projectsCompleted: projects.length,
  certificationsEarned: certificates.length,
  techSkills: skills.length,
  frontendSkills: skills.filter(s => s.category === 'Frontend').length,
  languages: skills.filter(s => s.category === 'Languages').length,
  tools: skills.filter(s => s.category === 'Tools').length,
};
