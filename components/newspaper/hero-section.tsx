/*
======================================================
HERO SECTION - DOCUMENTAÇÃO DO COMPONENTE
======================================================

Descrição:
Esta seção representa a capa principal (Hero) do portfólio.
Ela ocupa a altura total da tela e aplica efeitos avançados
de animação, parallax 3D e microinterações com Framer Motion.

------------------------------------------------------
FUNCIONALIDADES PRINCIPAIS
------------------------------------------------------

1) Parallax baseado no mouse
- Captura posição do cursor relativa ao container.
- useMotionValue armazena posição X/Y.
- useSpring suaviza o movimento.
- useTransform converte valores em deslocamento e rotação.
- Cria efeito de profundidade (camadas independentes).

2) Rotação 3D sutil
- rotateX e rotateY variam levemente conforme o mouse.
- transformPerspective cria sensação real de profundidade.

3) Efeito Scramble (texto embaralhado)
- Texto original: "Transformando ideias em codigo".
- Durante ~30 frames, caracteres aleatórios aparecem.
- Progressivamente o texto real é revelado.
- Implementado com useEffect + setInterval.
- Gera efeito estilo glitch/hacker elegante.

4) Grain Overlay (textura)
- SVG noise embutido em base64.
- Opacidade extremamente baixa.
- Simula textura de papel/jornal.
- Animação contínua para efeito orgânico.

5) Elementos Visuais
- Letras decorativas "M" gigantes com baixa opacidade.
- Headline principal com tipografia serif forte.
- Hover com tracking, skew e scale.
- Informações secundárias com underline animado.
- Linha editorial dupla decorativa.
- Indicador animado de scroll.

------------------------------------------------------
ESTRUTURA VISUAL
------------------------------------------------------

Topo:
Linha editorial com "Portfolio & Resume".

Centro:
Nome principal com parallax em camadas.
Subtítulo e informações profissionais.

Base:
Linha decorativa estilo jornal.
Informações de edição (Vol. I - Ed. 2026).
Indicador animado de scroll.

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

Criar uma primeira impressão impactante com:

- Profundidade visual
- Movimento fluido
- Microinterações refinadas
- Identidade editorial moderna
- Experiência premium

======================================================
*/
"use client"

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { useRef, useEffect, useState } from "react"

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  // Parallax layers based on mouse
  const layer1X = useTransform(smoothX, [-0.5, 0.5], [20, -20])
  const layer1Y = useTransform(smoothY, [-0.5, 0.5], [15, -15])
  const layer2X = useTransform(smoothX, [-0.5, 0.5], [-15, 15])
  const layer2Y = useTransform(smoothY, [-0.5, 0.5], [-10, 10])
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [3, -3])
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-3, 3])

  // Scramble text effect
  const [scrambledSubtitle, setScrambledSubtitle] = useState("Transformando ideias em codigo")
  const originalText = "Transformando ideias em codigo"
  const chars = "!@#$%^&*()_+-={}[]|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

  useEffect(() => {
    let frame = 0
    const totalFrames = 30
    const interval = setInterval(() => {
      frame++
      const progress = frame / totalFrames
      const revealed = Math.floor(progress * originalText.length)
      const result = originalText
        .split("")
        .map((char, i) => {
          if (i < revealed) return char
          if (char === " ") return " "
          return chars[Math.floor(Math.random() * chars.length)]
        })
        .join("")
      setScrambledSubtitle(result)
      if (frame >= totalFrames) clearInterval(interval)
    }, 40)
    return () => clearInterval(interval)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
          animation: "grain 8s steps(10) infinite",
        }}
      />

      {/* Background decorative text that follows mouse */}
      <motion.div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        style={{ x: layer2X, y: layer2Y }}
      >
        <span className="absolute top-[10%] left-[5%] font-serif text-[12rem] md:text-[20rem] font-black text-foreground/[0.02] uppercase leading-none -rotate-12">
          M
        </span>
        <span className="absolute bottom-[10%] right-[5%] font-serif text-[12rem] md:text-[20rem] font-black text-primary/[0.04] uppercase leading-none rotate-6">
          M
        </span>
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6 py-32 w-full">
        <motion.div
          className="flex flex-col gap-8"
          style={{ rotateX, rotateY, transformPerspective: 1200 }}
        >
          {/* Top line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4"
          >
            <div className="h-px flex-1 bg-border" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Portfolio & Resume
            </span>
            <div className="h-px flex-1 bg-border" />
          </motion.div>

          {/* Main headline with parallax */}
          <div className="flex flex-col items-center text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-mono text-xs uppercase tracking-[0.3em] text-primary mb-4"
              style={{ x: layer2X }}
            >
              .Software Engineer
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black leading-[0.85] tracking-tight text-foreground uppercase"
              style={{ x: layer1X, y: layer1Y }}
            >
              <span className="inline-block hover:tracking-[0.05em] transition-all duration-500">Matheus</span>
              <br />
              <motion.span
                className="text-primary inline-block"
                whileHover={{ skewX: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                Malta
              </motion.span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 flex flex-col sm:flex-row items-center gap-6 font-mono text-xs uppercase tracking-widest text-muted-foreground"
            >
              {["Recife, Brasil", "Eng. de Software", "Full Stack Developer"].map((text, i) => (
                <span key={text}>
                  {i > 0 && <span className="hidden sm:inline mr-6">|</span>}
                  <span className="group relative inline-block">
                    <span className="group-hover:text-primary transition-colors duration-200">{text}</span>
                    <span className="absolute bottom-[-2px] left-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-300" />
                  </span>
                </span>
              ))}
            </motion.div>
          </div>

          {/* Bottom decoration */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-8 flex flex-col gap-1"
          >
            <div className="h-[3px] bg-foreground" />
            <div className="h-px bg-foreground" />
          </motion.div>

          {/* Edition info with scramble */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex justify-between items-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
          >
            <span>Vol. I - Ed. 2026</span>
            <span className="hidden sm:block">{`"${scrambledSubtitle}"`}</span>
            <span className="hidden sm:block">Preco: Gratuito</span>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex justify-center mt-12"
          >
            <motion.a
              href="#sobre"
              data-cursor-text="Scroll"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center gap-2 group"
            >
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
                Scroll
              </span>
              <div className="w-px h-8 bg-primary group-hover:h-12 transition-all duration-300" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
