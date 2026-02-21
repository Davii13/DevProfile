"use client"

import { motion, useInView, useMotionValue, useTransform } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6])

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredStat, setHoveredStat] = useState<number | null>(null)
  const [imgHovered, setImgHovered] = useState(false)

  return (
    <section id="sobre" className="relative bg-card py-24 md:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-serif text-6xl md:text-8xl font-black text-card-foreground uppercase leading-none">
            <motion.span
              className="inline-block"
              whileHover={{ skewX: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              .Sobre
            </motion.span>
            <br />
            <motion.span
              className="text-primary inline-block"
              whileHover={{ letterSpacing: "0.05em" }}
              transition={{ duration: 0.3 }}
            >
              Mim
            </motion.span>
          </h2>
          <motion.div
            className="mt-4 h-[3px] w-24 bg-primary"
            whileHover={{ width: 96 * 2, transition: { duration: 0.4 } }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Left column - Photo + Bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-7"
          >
            {/* Profile Image - Editorial Style */}
            <motion.div
              className="relative mb-10 group"
              onMouseEnter={() => setImgHovered(true)}
              onMouseLeave={() => setImgHovered(false)}
              data-cursor-hover
              data-cursor-text="FOTO"
            >
              <div className="relative overflow-hidden border-2 border-card-foreground/20 max-w-xs">
                <motion.div
                  animate={{ scale: imgHovered ? 1.05 : 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <Image
                    src="/images/profile.jpg"
                    alt="Davi Nunes"
                    width={320}
                    height={400}
                    className="w-full h-auto object-cover grayscale contrast-125"
                    style={{ filter: imgHovered ? "grayscale(0%) contrast(1.1)" : "grayscale(100%) contrast(1.25)" }}
                  />
                </motion.div>

                {/* Newspaper overlay caption */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-card-foreground/90 px-4 py-3"
                  initial={{ y: "100%" }}
                  animate={{ y: imgHovered ? "0%" : "100%" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-widest text-card">
                    Fig. 01 - Matheus Malta, Engenheiro de Software
                  </p>
                </motion.div>

                {/* Registration marks on corners */}
                <motion.div
                  className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-primary"
                  animate={{ opacity: imgHovered ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.div
                  className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-primary"
                  animate={{ opacity: imgHovered ? 1 : 0 }}
                  transition={{ duration: 0.2, delay: 0.05 }}
                />
                <motion.div
                  className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-primary"
                  animate={{ opacity: imgHovered ? 1 : 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                />
                <motion.div
                  className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-primary"
                  animate={{ opacity: imgHovered ? 1 : 0 }}
                  transition={{ duration: 0.2, delay: 0.15 }}
                />
              </div>

              {/* Photo credit line */}
              <motion.p
                className="font-mono text-[9px] uppercase tracking-[0.3em] text-card-foreground/40 mt-2"
                animate={{ opacity: imgHovered ? 1 : 0.4 }}
              >
                Foto: Arquivo Pessoal / 2025
              </motion.p>
            </motion.div>

            <p className="font-serif text-2xl md:text-3xl text-card-foreground leading-relaxed mb-8">
              Sou um engenheiro de software apaixonado por criar
              experiencias digitais elegantes e performaticas.
              Atualmente cursando Engenharia de Software
              com foco em desenvolvimento full stack.
            </p>
            <p className="font-sans text-base text-card-foreground/70 leading-relaxed mb-6">
              Com mais de 3 anos de experiencia no desenvolvimento web,
              trabalho com tecnologias modernas como React, Next.js,
              Node.js e TypeScript. Meu objetivo e construir aplicacoes
              que resolvam problemas reais com codigo limpo e interfaces
              intuitivas.
            </p>
            <p className="font-sans text-base text-card-foreground/70 leading-relaxed">
              Quando nao estou programando, voce me encontra estudando
              novas tecnologias, contribuindo para projetos open source
              ou jogando videogames.
            </p>

            <div className="mt-8 pt-8 border-t-2 border-card-foreground/10">
              <p className="font-mono text-xs uppercase tracking-widest text-card-foreground/50 mb-2">
                Assinatura
              </p>
              <motion.p
                className="font-serif text-2xl italic text-card-foreground inline-block"
                whileHover={{ rotate: -3, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                Davi Nunes
              </motion.p>
              <p className="font-mono text-xs text-primary uppercase tracking-widest mt-1">
                Software Engineer
              </p>
            </div>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-5"
          >
            <TiltCard className="bg-card-foreground/5 p-8 border border-card-foreground/10">
              <h3 className="font-mono text-xs uppercase tracking-widest text-primary mb-8">
                Dados Pessoais
              </h3>

              {[
                { label: "Nome", value: "Davi Nunes Carvalho" },
                { label: "Local", value: "Recife, PE - Brasil" },
                { label: "Formacao", value: "Eng. de Software" },
                { label: "Email", value: "matheus@malta.dev" },
                { label: "Idiomas", value: "Portugues, Ingles" },
                { label: "Disponivel", value: "Freelance & CLT" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  className={`group flex justify-between py-3 ${
                    i !== 5 ? "border-b border-card-foreground/10" : ""
                  }`}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <span className="font-mono text-xs uppercase tracking-widest text-card-foreground/50 group-hover:text-primary transition-colors">
                    {item.label}
                  </span>
                  <span className="font-sans text-sm text-card-foreground font-medium group-hover:font-bold transition-all">
                    {item.value}
                  </span>
                </motion.div>
              ))}
            </TiltCard>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { number: "3+", label: "Anos Exp." },
                { number: "20+", label: "Projetos" },
                { number: "10+", label: "Tecnologias" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="relative bg-primary text-primary-foreground p-4 text-center overflow-hidden"
                  onMouseEnter={() => setHoveredStat(i)}
                  onMouseLeave={() => setHoveredStat(null)}
                  whileHover={{ scale: 1.08, rotate: i === 1 ? 0 : i === 0 ? -2 : 2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  data-cursor-hover
                >
                  {hoveredStat === i && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{
                        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)",
                      }}
                    />
                  )}
                  <p className="font-serif text-3xl font-black relative z-10">{stat.number}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest mt-1 relative z-10">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
