/*
======================================================
SKILLS SECTION - DOCUMENTAÇÃO DO COMPONENTE
======================================================

Descrição:
Componente de seção de habilidades e tecnologias do portfólio,
com cards de categorias, barras de proficiência animadas e tags
interativas usando Framer Motion. Inclui microinterações e efeitos
retro/hover.

------------------------------------------------------
FUNCIONALIDADES PRINCIPAIS
------------------------------------------------------

1) Grid de Habilidades
- Exibe categorias de habilidades (Frontend, Backend, Ferramentas)
- Cada card exibe:
  * Título da categoria
  * Skills com nome e nível (%)
  * Barra de progresso animada
- Interações:
  * Efeito parallax 3D baseado no mouse
  * Registro retro/quadros de impressão nas bordas ao hover
  * Habilidades animam (deslocamento, cor, escala e rotação) ao hover

2) Barra de Habilidade (SkillBar)
- Animação do preenchimento da barra baseado no nível da skill
- Brilho animado sobre a barra ao hover
- Nomes e níveis animam levemente com escala e rotação

3) Tags de Tecnologias (TechTag)
- Lista de tecnologias/ferramentas com microinterações
- Efeito hover:
  * Escala e rotação leve
  * Mudança de cor de fundo e borda
  * Retro ink stamp animado
- Sequência de entrada animada com delay incremental

4) Layout e Estrutura
- Section com id="habilidades" e padding top/bottom
- Header estilizado com efeito tipográfico e underline animado
- Grid responsivo adaptável (1 coluna mobile, 3 colunas desktop)
- Uso de useRef e useInView para animações só quando visíveis

------------------------------------------------------
TECNOLOGIAS UTILIZADAS
------------------------------------------------------

- React
- Next.js (Client Component)
- Framer Motion
- Tailwind CSS

------------------------------------------------------
OBJETIVO DO DESIGN
------------------------------------------------------

- Destacar habilidades de forma visual e interativa
- Engajar usuário com microinterações e efeitos retro
- Layout limpo, moderno e responsivo
- Experiência imersiva com parallax, hover e animações suaves

======================================================
*/
"use client"

import { motion, useInView, useMotionValue, useTransform } from "framer-motion"
import { useRef, useState, useCallback } from "react"

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React / Next.js", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 95 },
      { name: "HTML / CSS", level: 90 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Python", level: 70 },
      { name: "PostgreSQL", level: 75 },
      { name: "REST APIs", level: 85 },
    ],
  },
  {
    title: "Ferramentas",
    skills: [
      { name: "Git / GitHub", level: 90 },
      { name: "Docker", level: 65 },
      { name: "Figma", level: 75 },
      { name: "Linux", level: 70 },
    ],
  },
]

const techTags = [
  "React", "Next.js", "TypeScript", "JavaScript", "Node.js",
  "Python", "PostgreSQL", "MongoDB", "Tailwind CSS", "Sass",
  "Docker", "Git", "Figma", "Jest", "Prisma", "GraphQL",
  "Firebase", "Vercel", "AWS", "Redis",
]

function SkillCard({ category, catIndex, isInView }: { category: typeof skillCategories[0]; catIndex: number; isInView: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-0.5, 0.5], [5, -5])
  const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5])
  const [isHovered, setIsHovered] = useState(false)

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: catIndex * 0.15 }}
      onMouseMove={handleMouse}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { x.set(0); y.set(0); setIsHovered(false) }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className="relative border border-border p-8 group overflow-hidden"
      data-cursor-hover
    >
      {/* Retro print registration marks on hover */}
      <motion.div
        className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-primary"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-primary"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2, delay: 0.05 }}
      />
      <motion.div
        className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-primary"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
      />
      <motion.div
        className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-primary"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2, delay: 0.15 }}
      />

      <motion.h3
        className="font-serif text-2xl font-black text-foreground uppercase mb-2"
        whileHover={{ skewX: -4 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {category.title}
      </motion.h3>
      <div className="h-[2px] w-12 bg-primary mb-8 group-hover:w-full transition-all duration-500" />

      <div className="flex flex-col gap-6">
        {category.skills.map((skill, skillIndex) => (
          <SkillBar key={skill.name} skill={skill} catIndex={catIndex} skillIndex={skillIndex} isInView={isInView} />
        ))}
      </div>
    </motion.div>
  )
}

function SkillBar({ skill, catIndex, skillIndex, isInView }: { skill: { name: string; level: number }; catIndex: number; skillIndex: number; isInView: boolean }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between mb-2">
        <motion.span
          className="font-mono text-xs uppercase tracking-widest text-foreground"
          animate={{ x: isHovered ? 4 : 0, color: isHovered ? "#c8102e" : "#f5f0e8" }}
          transition={{ duration: 0.2 }}
        >
          {skill.name}
        </motion.span>
        <motion.span
          className="font-serif text-lg font-black text-primary"
          animate={{ scale: isHovered ? 1.3 : 1, rotate: isHovered ? -4 : 0 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {skill.level}%
        </motion.span>
      </div>
      <div className="h-2 bg-muted overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : {}}
          transition={{
            duration: 1,
            delay: catIndex * 0.15 + skillIndex * 0.1 + 0.3,
            ease: "easeOut",
          }}
          className="h-full bg-primary relative"
        >
          {isHovered && (
            <motion.div
              className="absolute inset-0"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.8 }}
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                width: "50%",
              }}
            />
          )}
        </motion.div>
      </div>
    </div>
  )
}

function TechTag({ tag, index, isInView }: { tag: string; index: number; isInView: boolean }) {
  const [isHovered, setIsHovered] = useState(false)
  const rotation = useCallback(() => {
    const rotations = [2, -3, 1.5, -2, 3, -1, 2.5, -2.5, 1, -1.5]
    return rotations[index % rotations.length]
  }, [index])

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.3, delay: 0.6 + index * 0.03 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative font-mono text-xs uppercase tracking-wider border px-4 py-2 select-none inline-block"
      style={{
        backgroundColor: isHovered ? "#c8102e" : "transparent",
        color: isHovered ? "#f5f0e8" : "#f5f0e8",
        borderColor: isHovered ? "#c8102e" : "#3a3a3a",
        transform: isHovered
          ? `scale(1.15) rotate(${rotation()}deg)`
          : "scale(1) rotate(0deg)",
        transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
        cursor: "pointer",
        zIndex: isHovered ? 10 : 1,
      }}
      data-cursor-hover
      data-cursor-text={tag}
    >
      {/* Retro ink stamp effect on hover */}
      {isHovered && (
        <motion.span
          className="absolute -top-1 -right-1 w-2 h-2 bg-primary-foreground"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.15 }}
          style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
        />
      )}
      {tag}
    </motion.span>
  )
}

export function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="habilidades" className="relative bg-background py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-serif text-6xl md:text-8xl font-black text-foreground uppercase leading-none">
            <motion.span className="inline-block" whileHover={{ skewX: -5 }} transition={{ type: "spring", stiffness: 300 }}>
              .Habili
            </motion.span>
            <br />
            <motion.span className="text-primary inline-block" whileHover={{ letterSpacing: "0.05em" }} transition={{ duration: 0.3 }}>
              dades
            </motion.span>
          </h2>
          <motion.div className="mt-4 h-[3px] w-24 bg-primary" whileHover={{ width: 192 }} transition={{ duration: 0.4 }} />
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, catIndex) => (
            <SkillCard key={category.title} category={category} catIndex={catIndex} isInView={isInView} />
          ))}
        </div>

        {/* Tech tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t-2 border-b-2 border-foreground py-8"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-6 text-center">
            Tecnologias & Ferramentas
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {techTags.map((tag, i) => (
              <TechTag key={tag} tag={tag} index={i} isInView={isInView} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
