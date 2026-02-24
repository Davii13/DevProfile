/*
  Este código implementa a seção "Experiência" do portfólio,
  exibindo uma linha do tempo profissional e uma área de formação
  acadêmica, com forte identidade visual editorial e animações
  usando Framer Motion.

  ======================================================
  🔹 Estrutura de Dados
  ======================================================

  - experiences:
      Lista de experiências profissionais contendo:
        * Período
        * Cargo
        * Empresa
        * Localização
        * Descrição
        * Tecnologias (tags)

  - education:
      Lista de formações acadêmicas e certificações,
      com período, título, instituição e descrição.

  ======================================================
  🔹 ExperienceSection (Componente Principal)
  ======================================================

  - useInView:
      Detecta quando a seção entra na viewport
      e dispara as animações de entrada.

  Estrutura:
    1) Cabeçalho animado ".Experiencia"
    2) Timeline profissional
    3) Seção de Educação

  ======================================================
  🔹 Timeline Profissional
  ======================================================

  - Linha vertical fixa no lado esquerdo (efeito linha do tempo).
  - Cada item é renderizado pelo componente TimelineCard.

  ------------------------------------------------------
  🔹 TimelineCard
  ------------------------------------------------------

  Cada card contém:

  - Animação de entrada (fade + slide).
  - Ponto da timeline:
      * Aumenta de tamanho ao hover.
      * Rotaciona levemente.
  - Borda animada que muda de cor no hover.
  - Selo retro no canto com número da experiência (#01, #02...).
  - Cargo (título principal com leve skew ao hover).
  - Empresa + localização.
  - Badge do período com animação de escala e cor.
  - Descrição que desliza levemente ao hover.
  - Tags de tecnologias:
      * Animação vertical sutil em sequência.
      * Mudam de cor ao passar o mouse.
  - Linha inferior animada que cresce ao hover.

  Objetivo visual:
    Simular uma linha do tempo moderna
    com estética inspirada em layout editorial/jornal.

  ======================================================
  🔹 Seção de Educação
  ======================================================

  - Título ".Educacao" com destaque em cor primária.
  - Divisor ornamental estilo jornal.
  - Cards exibidos em grid responsivo.

  ------------------------------------------------------
  🔹 EducationCard
  ------------------------------------------------------

  Cada card possui:

  - Animação de entrada (fade + slide).
  - Borda tracejada estilo recorte de jornal ao hover.
  - Ano em destaque grande no canto superior direito.
  - Badge de período com inversão de cores ao hover.
  - Título que desliza levemente.
  - Linha divisória animada.
  - Nome da instituição com mudança de cor.
  - Descrição com variação de opacidade.
  - Linha inferior animada.
  - Pequenas marcas gráficas decorativas no canto.

  Objetivo visual:
    Criar aparência de recorte editorial
    com microinterações elegantes.

  ======================================================
  🎯 Objetivo Geral
  ======================================================

  Construir uma seção de experiência profissional
  visualmente rica e interativa, combinando:

    - Linha do tempo moderna
    - Estética editorial/minimalista
    - Microinterações suaves
    - Animações progressivas ao scroll
    - Feedback visual claro em hover

  Tecnologias utilizadas:
    - React
    - Framer Motion
    - Tailwind CSS

  Foco principal:
    Experiência visual premium,
    organização clara de carreira
    e forte identidade de design.
*/
"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"

const experiences = [
  {
    period: "2024 - Atual",
    role: "Desenvolvedor Full Stack",
    company: "TechNova Solutions",
    location: "Recife, PE",
    description:
      "Desenvolvimento de aplicacoes web escalaveis utilizando Next.js e Node.js. Lideranca tecnica de squad de 4 desenvolvedores. Implementacao de CI/CD e melhoria de performance em 40%.",
    tags: ["Next.js", "Node.js", "AWS", "PostgreSQL"],
  },
  {
    period: "2023 - 2024",
    role: "Desenvolvedor Frontend",
    company: "StartupHub Digital",
    location: "Remoto",
    description:
      "Construcao de interfaces responsivas e acessiveis para produtos SaaS. Migracao de codebase legado de JavaScript para TypeScript. Reducao de bundle size em 35%.",
    tags: ["React", "TypeScript", "Tailwind", "Storybook"],
  },
  {
    period: "2022 - 2023",
    role: "Estagiario de Desenvolvimento",
    company: "Agencia Pixel Creative",
    location: "Recife, PE",
    description:
      "Desenvolvimento de landing pages e sistemas web para clientes corporativos. Primeiro contato com metodologias ageis e code review. Participacao em 15+ projetos.",
    tags: ["React", "JavaScript", "Sass", "Git"],
  },
]

const education = [
  {
    period: "2021 - 2025",
    title: "Bacharelado em Engenharia de Software",
    institution: "Universidade Federal de Pernambuco",
    description: "Foco em desenvolvimento de software, arquitetura de sistemas e engenharia de requisitos.",
  },
  {
    period: "2023",
    title: "AWS Cloud Practitioner",
    institution: "Amazon Web Services",
    description: "Certificacao em fundamentos de cloud computing, servicos AWS e melhores praticas.",
  },
]

function TimelineCard({ exp, i, isInView }: { exp: typeof experiences[0]; i: number; isInView: boolean }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.15 }}
      className="relative pl-8 md:pl-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Timeline dot - pulses on hover */}
      <motion.div
        className="absolute left-0 md:left-8 top-2 -translate-x-[6px] bg-primary"
        animate={{
          width: isHovered ? 16 : 12,
          height: isHovered ? 16 : 12,
          rotate: isHovered ? 45 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      />

      <motion.div
        className="border border-border p-6 md:p-8 relative overflow-hidden"
        animate={{
          borderColor: isHovered ? "rgba(200, 16, 46, 0.5)" : "rgba(58, 58, 58, 1)",
        }}
        transition={{ duration: 0.3 }}
        data-cursor-hover
      >
        {/* Retro label stamp in corner */}
        <motion.div
          className="absolute -top-1 -right-1 bg-primary text-primary-foreground px-3 py-1 font-mono text-[9px] uppercase tracking-widest"
          initial={{ x: 100, rotate: 0 }}
          animate={{ x: isHovered ? 0 : 100, rotate: isHovered ? 0 : 12 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          #{String(i + 1).padStart(2, "0")}
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-2">
          <div>
            <motion.h3
              className="font-serif text-2xl md:text-3xl font-black text-foreground uppercase leading-none"
              whileHover={{ skewX: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {exp.role}
            </motion.h3>
            <p className="font-mono text-xs uppercase tracking-widest text-primary mt-2">
              {exp.company} - {exp.location}
            </p>
          </div>
          <motion.span
            className="font-mono text-xs uppercase tracking-widest text-muted-foreground whitespace-nowrap bg-muted px-4 py-2"
            whileHover={{ scale: 1.05, backgroundColor: "#c8102e", color: "#f5f0e8" }}
            transition={{ duration: 0.2 }}
          >
            {exp.period}
          </motion.span>
        </div>

        <motion.p
          className="font-sans text-sm text-foreground/70 leading-relaxed mb-4"
          animate={{ x: isHovered ? 4 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {exp.description}
        </motion.p>

        <div className="flex flex-wrap gap-2">
          {exp.tags.map((tag, tagI) => (
            <motion.span
              key={tag}
              className="font-mono text-[10px] uppercase tracking-wider border border-border px-3 py-1 text-muted-foreground"
              whileHover={{
                backgroundColor: "#c8102e",
                color: "#f5f0e8",
                borderColor: "#c8102e",
              }}
              animate={{ y: isHovered ? [0, -3, 0] : 0 }}
              transition={{ y: { delay: tagI * 0.06, duration: 0.3 } }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Bottom reveal line */}
        <motion.div
          className="absolute bottom-0 left-0 h-[3px] bg-primary"
          initial={{ width: "0%" }}
          animate={{ width: isHovered ? "100%" : "0%" }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </motion.div>
  )
}

function EducationCard({ edu, i, isInView }: { edu: typeof education[0]; i: number; isInView: boolean }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.6 + i * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-muted p-6 md:p-8 border border-border relative overflow-hidden"
      data-cursor-hover
    >
      {/* Newspaper clipping dashed border on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          border: "2px dashed rgba(200, 16, 46, 0.4)",
          margin: "6px",
        }}
      />

      {/* Retro edition number in top right */}
      <motion.div
        className="absolute top-3 right-3 font-serif font-black text-foreground/5 pointer-events-none leading-none"
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.7,
          rotate: isHovered ? -12 : 0,
          color: isHovered ? "rgba(200, 16, 46, 0.15)" : "rgba(245, 240, 232, 0.05)",
          fontSize: isHovered ? "4rem" : "3rem",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        {edu.period.substring(0, 4)}
      </motion.div>

      {/* Period tag */}
      <motion.span
        className="inline-block font-mono text-xs uppercase tracking-widest px-3 py-1 mb-4 border"
        animate={{
          backgroundColor: isHovered ? "#c8102e" : "transparent",
          color: isHovered ? "#f5f0e8" : "#c8102e",
          borderColor: isHovered ? "#c8102e" : "#c8102e",
        }}
        transition={{ duration: 0.25 }}
      >
        {edu.period}
      </motion.span>

      <motion.h4
        className="font-serif text-xl font-black text-foreground uppercase mt-3 mb-1"
        animate={{ x: isHovered ? 4 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {edu.title}
      </motion.h4>

      {/* Newspaper style divider */}
      <motion.div
        className="h-px bg-foreground/20 my-3"
        animate={{ width: isHovered ? "100%" : "40%" }}
        transition={{ duration: 0.4 }}
      />

      <motion.p
        className="font-mono text-xs uppercase tracking-widest mb-4"
        animate={{
          color: isHovered ? "#c8102e" : "#a0998e",
        }}
        transition={{ duration: 0.25 }}
      >
        {edu.institution}
      </motion.p>

      <motion.p
        className="font-sans text-sm text-foreground/70 leading-relaxed"
        animate={{ opacity: isHovered ? 1 : 0.7 }}
        transition={{ duration: 0.3 }}
      >
        {edu.description}
      </motion.p>

      {/* Newspaper column rule line at bottom */}
      <motion.div
        className="absolute bottom-0 left-0 h-[3px] bg-primary"
        animate={{ width: isHovered ? "100%" : "0%" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* Small registration mark bottom-left */}
      <motion.div
        className="absolute bottom-3 left-3 flex gap-1 pointer-events-none"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2, delay: 0.1 }}
      >
        <span className="block w-1.5 h-1.5 bg-primary" />
        <span className="block w-1.5 h-1.5 bg-primary/50" />
        <span className="block w-1.5 h-1.5 bg-primary/25" />
      </motion.div>
    </motion.div>
  )
}

export function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="experiencia" className="relative bg-background py-24 md:py-32" ref={ref}>
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
              .Experi
            </motion.span>
            <br />
            <motion.span className="text-primary inline-block" whileHover={{ letterSpacing: "0.05em" }} transition={{ duration: 0.3 }}>
              encia
            </motion.span>
          </h2>
          <motion.div className="mt-4 h-[3px] w-24 bg-primary" whileHover={{ width: 192 }} transition={{ duration: 0.4 }} />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-border" />
          <div className="flex flex-col gap-12">
            {experiences.map((exp, i) => (
              <TimelineCard key={exp.company} exp={exp} i={i} isInView={isInView} />
            ))}
          </div>
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-24"
        >
          <h3 className="font-serif text-4xl md:text-5xl font-black text-foreground uppercase leading-none mb-4">
            <motion.span className="inline-block" whileHover={{ skewX: -4 }} transition={{ type: "spring", stiffness: 300 }}>
              .Edu<span className="text-primary">cacao</span>
            </motion.span>
          </h3>

          {/* Newspaper style ornamental divider */}
          <div className="flex items-center gap-3 mb-12">
            <div className="h-[2px] w-8 bg-primary" />
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
              Formacao Academica
            </span>
            <div className="h-[2px] flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu, i) => (
              <EducationCard key={edu.title} edu={edu} i={i} isInView={isInView} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
