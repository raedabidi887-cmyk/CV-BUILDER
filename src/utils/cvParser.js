// src/utils/cvParser.js

/**
 * ============================================
 * CV PARSER - EXTRACTEUR DE DONNÉES
 * ============================================
 * 
 * Parse automatiquement les CVs depuis différents formats :
 * - PDF (avec pdf-parse ou pdfjs-dist)
 * - DOC/DOCX (avec mammoth.js)
 * - TXT (texte brut)
 * 
 * Installation requise :
 * npm install mammoth pdf-parse
 * 
 * OU pour le client uniquement :
 * npm install mammoth pdfjs-dist
 */

// NOTE: Décommentez après installation
 import mammoth from 'mammoth';
 import * as pdfjsLib from 'pdfjs-dist';

/**
 * ============================================
 * EXPRESSIONS RÉGULIÈRES POUR L'EXTRACTION
 * ============================================
 */

const PATTERNS = {
  // Informations personnelles
  email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
  phone: /(?:\+\d{1,3}[\s.-]?)?\(?(?:\d{2,3})\)?[\s.-]?\d{2,3}[\s.-]?\d{2,3}[\s.-]?\d{2,4}/g,
  linkedin: /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[\w-]+\/?/gi,
  github: /(?:https?:\/\/)?(?:www\.)?github\.com\/[\w-]+\/?/gi,
  website: /(?:https?:\/\/)?(?:www\.)?[\w-]+\.[a-z]{2,}(?:\/[\w-]*)*\/?/gi,
  
  // Sections communes
  sections: {
    experience: /(?:exp[ée]rience.*professionnelle|professional\s+experience|work\s+experience|employment|career)/gi,
    education: /(?:formation|[ée]ducation|academic|diplomas?|qualifications?)/gi,
    skills: /(?:comp[ée]tences|skills|expertise|technical\s+skills)/gi,
    languages: /(?:langues?|languages?)/gi,
    certifications: /(?:certifications?|licenses?)/gi,
    projects: /(?:projets?|projects?)/gi,
    hobbies: /(?:centres?\s+d'int[ée]r[êe]t|hobbies|interests)/gi
  },
  
  // Dates
  dateRange: /(\d{4}|\w+\s+\d{4})\s*[-–—]\s*(\d{4}|\w+\s+\d{4}|pr[ée]sent|current|aujourd'hui)/gi,
  singleDate: /(?:janvier|f[ée]vrier|mars|avril|mai|juin|juillet|ao[ûu]t|septembre|octobre|novembre|d[ée]cembre|\w+)\s+\d{4}/gi,
  
  // Niveaux de compétence
  skillLevels: /(?:expert|avancé|advanced|intermediate|interm[ée]diaire|beginner|d[ée]butant|native|bilingue|fluent|courant)/gi
};

/**
 * ============================================
 * FONCTION PRINCIPALE DE PARSING
 * ============================================
 */

export const parseCV = async (file) => {
  try {
    const fileType = file.type;
    const fileName = file.name.toLowerCase();
    
    let text = '';
    
    // Extraire le texte selon le type de fichier
    if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
      text = await parsePDF(file);
    } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || fileName.endsWith('.docx')) {
      text = await parseDOCX(file);
    } else if (fileType === 'application/msword' || fileName.endsWith('.doc')) {
      text = await parseDOC(file);
    } else if (fileType === 'text/plain' || fileName.endsWith('.txt')) {
      text = await parseTXT(file);
    } else {
      throw new Error('Format de fichier non supporté');
    }
    
    // Extraire les données structurées du texte
    return extractDataFromText(text);
    
  } catch (error) {
    console.error('Erreur lors du parsing du CV:', error);
    throw error;
  }
};

/**
 * ============================================
 * PARSERS PAR TYPE DE FICHIER
 * ============================================
 */

/**
 * Parse un fichier PDF
 */
const parsePDF = async (file) => {
  // VERSION SIMULÉE - Remplacer après installation de pdf-parse ou pdfjs-dist
  console.log('📄 Parsing PDF simulé pour:', file.name);
  
  // TODO: Après installation, utiliser ce code:
  /*
  // Option 1: Avec pdfjs-dist (client-side)
  const arrayBuffer = await file.arrayBuffer();
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;
  
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = '';
  
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(item => item.str).join(' ');
    fullText += pageText + '\n';
  }
  
  return fullText;
  
  // Option 2: Avec pdf-parse (server-side)
  // const pdfParse = require('pdf-parse');
  // const dataBuffer = await file.arrayBuffer();
  // const data = await pdfParse(Buffer.from(dataBuffer));
  // return data.text;
  */
  
  // Retourner du texte de test
  return getMockCVText();
};

/**
 * Parse un fichier DOCX
 */
const parseDOCX = async (file) => {
  // VERSION SIMULÉE - Remplacer après installation de mammoth
  console.log('📄 Parsing DOCX simulé pour:', file.name);
  
  // TODO: Après installation de mammoth, utiliser ce code:
  /*
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
  */
  
  return getMockCVText();
};

/**
 * Parse un fichier DOC (ancien format)
 */
const parseDOC = async (file) => {
  // Les fichiers .doc nécessitent une conversion côté serveur
  console.log('📄 Parsing DOC simulé pour:', file.name);
  console.warn('⚠️ Les fichiers .doc nécessitent une conversion serveur. Utilisez .docx si possible.');
  
  return getMockCVText();
};

/**
 * Parse un fichier TXT
 */
const parseTXT = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(e);
    reader.readAsText(file);
  });
};

/**
 * ============================================
 * EXTRACTION DES DONNÉES STRUCTURÉES
 * ============================================
 */

/**
 * Extrait les données structurées depuis le texte brut
 */
const extractDataFromText = (text) => {
  const lines = text.split('\n').filter(line => line.trim());
  
  return {
    personalInfo: extractPersonalInfo(text, lines),
    experiences: extractExperiences(text, lines),
    education: extractEducation(text, lines),
    skills: extractSkills(text, lines),
    languages: extractLanguages(text, lines),
    certifications: extractCertifications(text, lines),
    projects: extractProjects(text, lines),
    hobbies: extractHobbies(text, lines)
  };
};

/**
 * Extrait les informations personnelles
 */
const extractPersonalInfo = (text, lines) => {
  // Extraire email
  const emails = text.match(PATTERNS.email);
  const email = emails ? emails[0] : '';
  
  // Extraire téléphone
  const phones = text.match(PATTERNS.phone);
  const phone = phones ? phones[0] : '';
  
  // Extraire LinkedIn
  const linkedinMatches = text.match(PATTERNS.linkedin);
  const linkedin = linkedinMatches ? linkedinMatches[0] : '';
  
  // Extraire GitHub
  const githubMatches = text.match(PATTERNS.github);
  const github = githubMatches ? githubMatches[0] : '';
  
  // Extraire le nom (généralement dans les premières lignes)
  const nameLine = lines.slice(0, 3).find(line => 
    line.length < 50 && 
    line.length > 5 && 
    !line.includes('@') &&
    !/\d/.test(line)
  );
  
  const nameParts = nameLine ? nameLine.trim().split(/\s+/) : ['', ''];
  
  // Extraire le titre/poste (généralement après le nom)
  const nameIndex = nameLine ? lines.indexOf(nameLine) : -1;
  const title = nameIndex >= 0 && lines[nameIndex + 1] ? lines[nameIndex + 1].trim() : '';
  
  // Extraire le résumé/profil
  const summary = extractSection(text, ['profil', 'résumé', 'summary', 'about', 'objective']);
  
  return {
    firstName: nameParts[0] || '',
    lastName: nameParts.slice(1).join(' ') || '',
    email,
    phone,
    linkedin,
    github,
    title: title && title.length < 100 ? title : '',
    summary: summary ? summary.substring(0, 500) : '',
    address: '', // Difficile à extraire automatiquement
    website: '',
    photo: null
  };
};

/**
 * Extrait les expériences professionnelles
 */
const extractExperiences = (text, lines) => {
  const experienceSection = extractSection(text, ['expérience', 'experience', 'work', 'employment']);
  if (!experienceSection) return [];
  
  const experiences = [];
  const expLines = experienceSection.split('\n').filter(l => l.trim());
  
  // Parser chaque expérience (simplifié)
  let currentExp = null;
  
  for (const line of expLines) {
    // Détecter une nouvelle expérience (contient généralement une date)
    const dateMatch = line.match(PATTERNS.dateRange);
    
    if (dateMatch && line.length < 200) {
      // Sauvegarder l'expérience précédente
      if (currentExp) {
        experiences.push(currentExp);
      }
      
      // Créer une nouvelle expérience
      currentExp = {
        position: line.replace(dateMatch[0], '').trim(),
        company: '',
        location: '',
        startDate: dateMatch[1] || '',
        endDate: dateMatch[2] || '',
        current: /présent|current|aujourd'hui/i.test(dateMatch[2] || ''),
        description: '',
        achievements: [],
        technologies: []
      };
    } else if (currentExp) {
      // Ajouter à la description ou aux achievements
      if (line.startsWith('-') || line.startsWith('•')) {
        currentExp.achievements.push(line.replace(/^[-•]\s*/, '').trim());
      } else if (line.length > 20) {
        currentExp.description += (currentExp.description ? ' ' : '') + line;
      }
    }
  }
  
  // Ajouter la dernière expérience
  if (currentExp) {
    experiences.push(currentExp);
  }
  
  return experiences.slice(0, 10); // Limiter à 10 expériences
};

/**
 * Extrait la formation
 */
const extractEducation = (text, lines) => {
  const educationSection = extractSection(text, ['formation', 'education', 'academic']);
  if (!educationSection) return [];
  
  const education = [];
  const eduLines = educationSection.split('\n').filter(l => l.trim());
  
  let currentEdu = null;
  
  for (const line of eduLines) {
    const dateMatch = line.match(/\d{4}/g);
    
    if (dateMatch && line.length < 200) {
      if (currentEdu) {
        education.push(currentEdu);
      }
      
      currentEdu = {
        degree: line.replace(/\d{4}/g, '').trim(),
        school: '',
        location: '',
        startYear: dateMatch[0] || '',
        endYear: dateMatch[1] || dateMatch[0] || '',
        description: '',
        gpa: '',
        courses: []
      };
    } else if (currentEdu && line.length > 10) {
      currentEdu.school = line;
    }
  }
  
  if (currentEdu) {
    education.push(currentEdu);
  }
  
  return education.slice(0, 5);
};

/**
 * Extrait les compétences
 */
const extractSkills = (text, lines) => {
  const skillsSection = extractSection(text, ['compétences', 'skills', 'expertise']);
  if (!skillsSection) return [];
  
  // Extraire les mots séparés par des virgules, tirets, pipes, etc.
  const skillMatches = skillsSection.match(/[A-Za-z][A-Za-z0-9+#.\s]{2,30}(?=[,|•\n-]|$)/g);
  if (!skillMatches) return [];
  
  const skills = skillMatches
    .map(skill => {
      const cleaned = skill.trim();
      const levelMatch = cleaned.match(PATTERNS.skillLevels);
      
      return {
        name: cleaned.replace(PATTERNS.skillLevels, '').trim(),
        level: levelMatch ? levelMatch[0] : ''
      };
    })
    .filter(skill => skill.name.length > 2 && skill.name.length < 50)
    .slice(0, 20);
  
  return skills;
};

/**
 * Extrait les langues
 */
const extractLanguages = (text, lines) => {
  const languagesSection = extractSection(text, ['langues', 'languages']);
  if (!languagesSection) return [];
  
  const commonLanguages = ['français', 'anglais', 'espagnol', 'allemand', 'italien', 'portugais', 'arabe', 'chinois', 'japonais', 'russe', 'french', 'english', 'spanish', 'german', 'italian', 'portuguese', 'arabic', 'chinese', 'japanese', 'russian'];
  
  const languages = [];
  const langLines = languagesSection.toLowerCase().split('\n');
  
  for (const line of langLines) {
    for (const lang of commonLanguages) {
      if (line.includes(lang)) {
        const levelMatch = line.match(PATTERNS.skillLevels);
        languages.push({
          name: lang.charAt(0).toUpperCase() + lang.slice(1),
          level: levelMatch ? levelMatch[0] : 'Intermédiaire'
        });
        break;
      }
    }
  }
  
  return [...new Map(languages.map(l => [l.name, l])).values()].slice(0, 5);
};

/**
 * Extrait les certifications
 */
const extractCertifications = (text, lines) => {
  const certSection = extractSection(text, ['certifications', 'licenses']);
  if (!certSection) return [];
  
  const certLines = certSection.split('\n').filter(l => l.trim() && l.length > 10);
  
  return certLines.map(line => ({
    name: line.trim(),
    issuer: '',
    date: '',
    credentialId: ''
  })).slice(0, 10);
};

/**
 * Extrait les projets
 */
const extractProjects = (text, lines) => {
  const projectSection = extractSection(text, ['projets', 'projects']);
  if (!projectSection) return [];
  
  const projectLines = projectSection.split('\n').filter(l => l.trim() && l.length > 10);
  
  return projectLines.map(line => ({
    name: line.trim(),
    description: '',
    technologies: [],
    url: ''
  })).slice(0, 5);
};

/**
 * Extrait les centres d'intérêt
 */
const extractHobbies = (text, lines) => {
  const hobbiesSection = extractSection(text, ['centres d\'intérêt', 'hobbies', 'interests']);
  if (!hobbiesSection) return [];
  
  const hobbies = hobbiesSection
    .split(/[,•\n-]/)
    .map(h => h.trim())
    .filter(h => h.length > 2 && h.length < 50)
    .slice(0, 10);
  
  return hobbies;
};

/**
 * ============================================
 * FONCTIONS UTILITAIRES
 * ============================================
 */

/**
 * Extrait une section spécifique du texte
 */
const extractSection = (text, keywords) => {
  const lowerText = text.toLowerCase();
  
  for (const keyword of keywords) {
    const regex = new RegExp(`${keyword}[:\\s]*([\\s\\S]*?)(?=\\n\\n[A-Z]|$)`, 'i');
    const match = lowerText.match(regex);
    
    if (match) {
      // Retrouver la position dans le texte original pour garder la casse
      const startIndex = lowerText.indexOf(match[0]);
      const endIndex = startIndex + match[0].length;
      return text.substring(startIndex, endIndex).replace(new RegExp(keyword, 'i'), '').trim();
    }
  }
  
  return null;
};

/**
 * Texte de CV de test (pour la simulation)
 */
const getMockCVText = () => {
  return `
Jean Dupont
Développeur Full Stack Senior

Email: jean.dupont@email.com
Téléphone: +33 6 12 34 56 78
LinkedIn: https://linkedin.com/in/jeandupont
GitHub: https://github.com/jeandupont

PROFIL PROFESSIONNEL
Développeur Full Stack passionné avec 5+ ans d'expérience dans le développement d'applications web modernes. Expertise en React, Node.js, et architectures cloud.

EXPÉRIENCE PROFESSIONNELLE

Lead Developer - TechCorp Paris
2021 - Présent
- Direction d'une équipe de 5 développeurs
- Développement d'une plateforme SaaS utilisée par 10,000+ utilisateurs
- Mise en place de CI/CD avec GitHub Actions
- Technologies: React, Node.js, PostgreSQL, AWS

Développeur Full Stack - StartupXYZ
2019 - 2021
- Création d'applications web responsive
- API REST avec Node.js et Express
- Technologies: React, MongoDB, Docker

FORMATION

Master en Informatique - Université Paris-Saclay
2017 - 2019
Spécialisation en Intelligence Artificielle

Licence en Informatique - Université Paris-Saclay
2014 - 2017

COMPÉTENCES

Langages: JavaScript, TypeScript, Python, Java
Frontend: React, Vue.js, Next.js, Tailwind CSS
Backend: Node.js, Express, NestJS
Bases de données: PostgreSQL, MongoDB, Redis
DevOps: Docker, Kubernetes, AWS, CI/CD

LANGUES

Français - Natif
Anglais - Courant
Espagnol - Intermédiaire

CERTIFICATIONS

AWS Certified Solutions Architect
Google Cloud Professional Developer

CENTRES D'INTÉRÊT

Open Source, Photographie, Randonnée, Gaming
  `.trim();
};

/**
 * ============================================
 * VALIDATION DES DONNÉES EXTRAITES
 * ============================================
 */

export const validateParsedData = (data) => {
  const warnings = [];
  
  if (!data.personalInfo?.email) {
    warnings.push('Email non trouvé');
  }
  
  if (!data.personalInfo?.firstName || !data.personalInfo?.lastName) {
    warnings.push('Nom complet non trouvé');
  }
  
  if (!data.experiences || data.experiences.length === 0) {
    warnings.push('Aucune expérience professionnelle trouvée');
  }
  
  if (!data.education || data.education.length === 0) {
    warnings.push('Aucune formation trouvée');
  }
  
  return {
    isValid: warnings.length === 0,
    warnings,
    completeness: calculateCompleteness(data)
  };
};

/**
 * Calcule le taux de complétude du CV
 */
const calculateCompleteness = (data) => {
  let score = 0;
  const weights = {
    personalInfo: 30,
    experiences: 25,
    education: 20,
    skills: 15,
    languages: 5,
    certifications: 3,
    projects: 2
  };
  
  if (data.personalInfo?.email) score += weights.personalInfo * 0.5;
  if (data.personalInfo?.phone) score += weights.personalInfo * 0.5;
  
  if (data.experiences?.length > 0) score += weights.experiences;
  if (data.education?.length > 0) score += weights.education;
  if (data.skills?.length > 0) score += weights.skills;
  if (data.languages?.length > 0) score += weights.languages;
  if (data.certifications?.length > 0) score += weights.certifications;
  if (data.projects?.length > 0) score += weights.projects;
  
  return Math.round(score);
};

/**
 * ============================================
 * EXPORT PAR DÉFAUT
 * ============================================
 */

export default {
  parseCV,
  validateParsedData,
  calculateCompleteness
};