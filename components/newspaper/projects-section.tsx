"use client"

import { motion, useInView, useMotionValue, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    id: "PJ-001",
    title: "DevFlow",
    subtitle: "Plataforma de Gerenciamento de Projetos",
    description:
      "Uma aplicacao full stack para gerenciamento de projetos de desenvolvimento. Inclui kanban board, tracking de sprints, integracao com GitHub e dashboard analitico em tempo real.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    year: "2025",
    link: "#",
    github: "#",
  },
  {
    id: "PJ-002",
    title: "CryptoTracker",
    subtitle: "Dashboard de Criptomoedas",
    description:
      "Dashboard interativo para acompanhamento de criptomoedas com graficos em tempo real, alertas de preco customizaveis e portfolio tracker. API integrada com CoinGecko.",
    tags: ["React", "Node.js", "WebSocket", "Chart.js"],
    year: "2025",
    link: "#",
    github: "#",
  },
  {
    id: "PJ-003",
    title: "EcoMarket",
    subtitle: "E-commerce Sustentavel",
    description:
      "Marketplace focado em produtos sustentaveis com sistema de pagamento integrado, reviews, sistema de recomendacao e painel administrativo completo.",
    tags: ["Next.js", "Stripe", "MongoDB", "Tailwind"],
    year: "2024",
    link: "#",
    github: "#",
  },
  {
    id: "PJ-004",
    title: "CodeSnap",
    subtitle: "Editor de Code Snippets",
    description:
      "Ferramenta online para criar e compartilhar screenshots bonitas de codigo. Suporta 50+ linguagens, temas customizaveis e exportacao em alta resolucao.",
    tags: ["React", "TypeScript", "Canvas API", "Firebase"],
    year: "2024",
    link: "#",
    github: "#",
  },
]

function ProjectCard({ project, i, isInView }: { project: typeof projects[0]; i: number; isInView: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useTransform(my, [-0.5, 0.5], [4, -4])
  const rotateY = useTransform(mx, [-0.5, 0.5], [-4, 4])
  const [isHovered, setIsHovered] = useState(false)
  const [glitchTitle, setGlitchTitle] = useState(project.title)

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const triggerGlitch = () => {
    setIsHovered(true)
    const original = project.title
    const glitchChars = "!@#$%&*?><{}[]"
    let frame = 0
    const totalFrames = 8
    const interval = setInterval(() => {
      frame++
      if (frame >= totalFrames) {
        setGlitchTitle(original)
        clearInterval(interval)
        return
      }
      setGlitchTitle(
        original
          .split("")
          .map((c, ci) =>
            ci < Math.floor((frame / totalFrames) * original.length)
              ? c
              : c === " "
              ? " "
              : glitchChars[Math.floor(Math.random() * glitchChars.length)]
          )
          .join("")
      )
    }, 40)
  }

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.15 }}
      onMouseMove={handleMouse}
      onMouseEnter={triggerGlitch}
      onMouseLeave={() => { mx.set(0); my.set(0); setIsHovered(false) }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="group relative border border-card-foreground/10 bg-card overflow-hidden"
      data-cursor-text="Ver mais"
    >
      {/* Project header bar */}
      <div className="flex items-center justify-between bg-card-foreground px-6 py-3 relative overflow-hidden">
        <span className="font-mono text-xs uppercase tracking-widest text-card relative z-10">
          {project.id}
        </span>
        <span className="font-mono text-xs text-card/60 relative z-10">
          {project.year}
        </span>
        {/* Slide fill on hover */}
        <motion.div
          className="absolute inset-0 bg-primary"
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? "0%" : "-100%" }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        />
      </div>

      <div className="p-6 md:p-8">
        <h3 className="font-serif text-3xl md:text-4xl font-black text-card-foreground uppercase leading-none mb-2 relative">
          <span className="relative z-10">{glitchTitle}</span>
          {/* Retro double-shadow on hover */}
          {isHovered && (
            <span
              className="absolute top-[2px] left-[2px] text-primary/20 z-0"
              aria-hidden="true"
            >
              {project.title}
            </span>
          )}
        </h3>
        <p className="font-mono text-xs uppercase tracking-widest text-primary mb-6">
          {project.subtitle}
        </p>

        <motion.p
          className="font-sans text-sm text-card-foreground/70 leading-relaxed mb-6"
          animate={{ x: isHovered ? 4 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {project.description}
        </motion.p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag, tagI) => (
            <motion.span
              key={tag}
              className="font-mono text-[10px] uppercase tracking-wider border border-card-foreground/20 px-3 py-1 text-card-foreground/60"
              whileHover={{
                backgroundColor: "#c8102e",
                color: "#f5f0e8",
                borderColor: "#c8102e",
                rotate: -2,
              }}
              animate={{ y: isHovered ? [0, -2, 0] : 0 }}
              transition={{
                y: { delay: tagI * 0.05, duration: 0.3 },
              }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4">
          <motion.a
            href={project.link}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-card-foreground hover:text-primary transition-colors"
            whileHover={{ x: 4 }}
            data-cursor-text="Abrir"
          >
            <ExternalLink size={14} />
            Ver Projeto
          </motion.a>
          <motion.a
            href={project.github}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-card-foreground hover:text-primary transition-colors"
            whileHover={{ x: 4 }}
            data-cursor-text="GitHub"
          >
            <Github size={14} />
            Codigo
          </motion.a>
        </div>
      </div>

      {/* Hover accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-primary"
        initial={{ width: "0%" }}
        animate={{ width: isHovered ? "100%" : "0%" }}
        transition={{ duration: 0.3 }}
      />

      {/* Corner stamp on hover */}
      <motion.div
        className="absolute top-14 right-4 font-serif text-5xl font-black text-primary/10 pointer-events-none"
        initial={{ opacity: 0, rotate: 0, scale: 0.5 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          rotate: isHovered ? -12 : 0,
          scale: isHovered ? 1 : 0.5,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        {String(i + 1).padStart(2, "0")}
      </motion.div>
    </motion.article>
  )
}

export function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="projetos" className="relative bg-card py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-serif text-6xl md:text-8xl font-black text-card-foreground uppercase leading-none">
            <motion.span className="inline-block" whileHover={{ skewX: -5 }} transition={{ type: "spring", stiffness: 300 }}>
              .Proje
            </motion.span>
            <br />
            <motion.span className="text-primary inline-block" whileHover={{ letterSpacing: "0.05em" }} transition={{ duration: 0.3 }}>
              tos
            </motion.span>
          </h2>
          <motion.div className="mt-4 h-[3px] w-24 bg-primary" whileHover={{ width: 192 }} transition={{ duration: 0.4 }} />
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} i={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
