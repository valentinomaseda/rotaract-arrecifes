// Datos estructurados para la sección Quiénes Somos

export const youthIdentityData = {
  badge: "Jóvenes Líderes en Acción",
  title: "Somos un grupo de jóvenes de 18 a 30 años",
  description:
    "En Rotaract Club Arrecifes unimos a jóvenes apasionados de entre 18 y 30 años con el propósito común de impulsar el cambio social, adquirir habilidades de liderazgo ejecutivo y servir activamente a la comunidad de Arrecifes.",
  stats: [
    { value: "18-30", label: "Rango de Edad" },
    { value: "9", label: "Comités de Trabajo" },
    { value: "7", label: "Áreas de Interés Rotary" },
    { value: "100%", label: "Compromiso Comunitario" },
  ]
};

export const rotaryAreasData = [
  {
    id: "paz",
    number: "01",
    title: "Paz y prevención/resolución de conflictos",
    shortTitle: "Promoción de la Paz",
    description: "Fomentamos la cohesión social, la mediación y el entendimiento intercultural para construir entornos pacíficos.",
    icon: "Peace",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "enfermedades",
    number: "02",
    title: "Prevención y tratamiento de enfermedades",
    shortTitle: "Salud y Prevención",
    description: "Organizamos campañas de concientización, donación de sangre, controles de salud preventiva y apoyo a instituciones de salud.",
    icon: "Health",
    color: "from-rose-500 to-red-600",
  },
  {
    id: "agua",
    number: "03",
    title: "Agua, saneamiento e higiene",
    shortTitle: "Agua y Saneamiento",
    description: "Promovemos el uso responsable del agua potable, hábitos de higiene y conservación de fuentes hídricas locales.",
    icon: "Water",
    color: "from-sky-400 to-blue-600",
  },
  {
    id: "materno",
    number: "04",
    title: "Salud materno-infantil",
    shortTitle: "Salud Materno-Infantil",
    description: "Brindamos asistencia y elementos de primera necesidad a madres, bebés y centros infantiles de nuestra ciudad.",
    icon: "Family",
    color: "from-pink-400 to-rose-500",
  },
  {
    id: "educacion",
    number: "05",
    title: "Educación básica y alfabetización",
    shortTitle: "Educación y Alfabetización",
    description: "Colectas de útiles escolares, talleres educativos y padrinazgo de escuelas para garantizar el acceso al aprendizaje.",
    icon: "Education",
    color: "from-amber-400 to-orange-500",
  },
  {
    id: "desarrollo",
    number: "06",
    title: "Desarrollo económico de la comunidad",
    shortTitle: "Desarrollo Comunitario",
    description: "Impulsamos emprendimientos locales, capacitaciones laborales y proyectos que fortalecen la economía local.",
    icon: "Economy",
    color: "from-emerald-400 to-teal-600",
  },
  {
    id: "medioambiente",
    number: "07",
    title: "Medio ambiente",
    shortTitle: "Protección Ambiental",
    description: "Acciones concretas como recolección de colillas, plantación de árboles y concientización sobre el reciclaje y la huella ecológica.",
    icon: "Leaf",
    color: "from-green-500 to-emerald-700",
  },
];

export const boardPeriod = "Período 2026 - 2027";

export const boardMembersData = [
  {
    id: "presidente",
    role: "Presidente",
    name: "Alexis Sklate",
    image: "/images/comision/alexis.jpg",
    badgeColor: "bg-cranberry text-white",
  },
  {
    id: "vicepresidente",
    role: "Vicepresidente",
    name: "Brisa Rodríguez",
    image: "/images/comision/brisa.png",
    badgeColor: "bg-purple-600 text-white",
  },
  {
    id: "secretario",
    role: "Secretario",
    name: "Gianlucas Zabaleta",
    image: "/images/comision/gian.png",
    badgeColor: "bg-blue-600 text-white",
  },
  {
    id: "tesorero",
    role: "Tesorera",
    name: "Victoria Izquierdo",
    image: "/images/comision/vicky.png",
    badgeColor: "bg-emerald-600 text-white",
  },
];

export const committeesData = [
  {
    id: "imagen-publica",
    name: "Imagen Pública",
    category: "Comunicación & Prensa",
    description: "Difunde el trabajo del club, gestiona redes sociales, comunicación de eventos y proyecta la identidad de Rotaract Arrecifes.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80",
    tags: ["Redes Sociales", "Prensa", "Diseño", "Estrategia"],
    icon: "Megaphone",
  },
  {
    id: "nuevas-generaciones",
    name: "Nuevas Generaciones",
    category: "Juventud & Interact",
    description: "Conecta con clubes Interact, apoya el liderazgo juvenil temprano y fomenta puentes con estudiantes y jóvenes en formación.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80",
    tags: ["Interact", "Escuelas", "Talleres", "Liderazgo Joven"],
    icon: "Sparkles",
  },
  {
    id: "membresia",
    name: "Membresía",
    category: "Crecimiento & Fidelización",
    description: "Se encarga del reclutamiento, integración, motivación y acompañamiento continuo de los nuevos y antiguos socios.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    tags: ["Integración", "Desarrollo", "Capacitaciones", "Socios"],
    icon: "Users",
  },
  {
    id: "finanzas",
    name: "Finanzas",
    category: "Recursos & Beneficios",
    description: "Organiza eventos de recaudación de fondos, convenios y administra responsablemente los ingresos presupuestarios para los proyectos.",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
    tags: ["Eventos", "Presupuesto", "Recaudación", "Transparencia"],
    icon: "DollarSign",
  },
  {
    id: "medioambiente",
    name: "Medio Ambiente",
    category: "Ecología & Sustentabilidad",
    description: "Desarrolla iniciativas verdes como 'Tu huella, no tu colilla', reciclaje comunitario, reforestación y concientización ambiental.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80",
    tags: ["Sustentabilidad", "Ceniceros Eco", "Reciclaje", "Educación Verde"],
    icon: "Leaf",
  },
  {
    id: "servicio-internacional",
    name: "Servicio Internacional",
    category: "Alianzas Globales",
    description: "Promueve intercambios culturales, hermanamientos con otros clubes del mundo y proyectos con impacto internacional.",
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=600&q=80",
    tags: ["Distrito", "Hermanamientos", "Paz Global", "Intercambio"],
    icon: "Globe",
  },
  {
    id: "servicio-al-club",
    name: "Servicio al Club",
    category: "Compañerismo & Cultura",
    description: "Fortalece los lazos entre socios a través de reuniones dinámicas, festejos, integraciones y actividades de compañerismo.",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80",
    tags: ["Compañerismo", "Reuniones", "Festejos", "Cultura Club"],
    icon: "Heart",
  },
  {
    id: "servicio-a-la-comunidad",
    name: "Servicio a la Comunidad",
    category: "Acción Social Directa",
    description: "Identifica necesidades locales en Arrecifes para diseñar e implementar proyectos solidarios directos y sostenibles.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80",
    tags: ["Barrios", "Colectas", "Donaciones", "Servicio Directo"],
    icon: "HandsHolding",
  },
  {
    id: "servicio-profesional",
    name: "Servicio y Desarrollo Profesional",
    category: "Capacitación & Empleabilidad",
    description: "Organiza charlas, talleres de oratoria, currículum, herramientas de trabajo y mentorías para potenciar la carrera de los socios.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
    tags: ["Capacitación", "Oratoria", "Mentoring", "Habilidades"],
    icon: "Briefcase",
  },
];

export const pastPresidentsData = [
  {
    id: "p-2023",
    name: "Valentín Ramos",
    periods: ["2022 - 2023", "2025 - 2026"],
    image: "/images/galeria-presidentes/valvo.jpeg",
    achievement: "Presidente fundador del club, responsable de sentar las bases operativas, el espíritu de servicio y los primeros grandes vínculos comunitarios.",
  },
  {
    id: "p-2022",
    name: "Valentino Maseda",
    periods: ["2023 - 2024", "2024 - 2025"],
    image: "/images/galeria-presidentes/valentino.jfif",
    achievement: "Impulsor de un destacado crecimiento en la membresía del club, organizador del Foro Distrital y consolidador de las bases institucionales.",
  },
  {
    id: "p-2021",
    name: "Alexis Sklate",
    periods: ["2026 - 2027"],
    isCurrent: true,
    image: "/images/galeria-presidentes/alexis.jpg",
    achievement: "Impulsor de importantes reformas estructurales, nuevos comités y proyectos comunitarios de gran escala. RDI (Representante Distrital de Interact) en el período 2018 - 2019.",
  },
];
