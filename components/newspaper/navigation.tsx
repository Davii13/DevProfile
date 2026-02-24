/*
======================================================
NAVIGATION - DOCUMENTAÇÃO DO COMPONENTE
======================================================

Descrição:
Componente de navegação fixo do portfólio, responsivo
para desktop e mobile, com animações suaves usando
Framer Motion e microinterações detalhadas.

------------------------------------------------------
FUNCIONALIDADES PRINCIPAIS
------------------------------------------------------

1) Scroll Detection
- Detecta quando a página é rolada > 50px.
- Altera background e borda do navbar para efeito
  de transparência com backdrop blur.
- Atualiza estado 'scrolled'.

2) Menu Desktop
- Lista de links horizontais para seções do site.
- Hover com:
  * Underline animado (retro strike effect)
  * Estrela (&#x2605) com rotação e opacidade
- Botão CV com hover que anima fundo e ícone.

3) Menu Mobile
- Botão toggle Hamburger/X para abrir/fechar menu.
- AnimatePresence controla a entrada/saída com animação de height e opacity.
- Links animados individualmente (delay incremental).
- Inclui botão de download CV adaptado para mobile.

4) Animações e Microinterações
- Framer Motion para:
  * Entrada do navbar (slide down)
  * Hover em links (underline, estrela, escala)
  * Menu mobile (fade + expand/collapse)
- Transições suaves (spring, easeOut, duration controlada).

------------------------------------------------------
ESTRUTURA VISUAL
------------------------------------------------------

- Topo fixo (fixed) com z-index alto.
- Logo "MM." com hover animado (skew e scale).
- Links desktop em flex horizontal.
- Menu mobile expande em flex-col quando ativo.
- Botão de download CV sempre visível e animado.

------------------------------------------------------
TECNOLOGIAS UTILIZADAS
------------------------------------------------------

- React
- Next.js (Client Component)
- Framer Motion
- Tailwind CSS
- Lucide React (ícones)

------------------------------------------------------
OBJETIVO DO DESIGN
------------------------------------------------------

- Navegação clara e responsiva
- Microinterações visuais para engajamento
- Estilo retro editorial com hover effects
- Compatível com desktop e mobile
- Suavidade na experiência do usuário

======================================================
*/
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Download } from "lucide-react"

const navItems = [
  { label: "Sobre", href: "#sobre" },
  { label: "Habilidades", href: "#habilidades" },
  { label: "Projetos", href: "#projetos" },
  { label: "Experiencia", href: "#experiencia" },
  { label: "Contato", href: "#contato" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <a
          href="#"
          className="group font-serif text-2xl font-black text-foreground tracking-tight relative"
          data-cursor-text="Inicio"
        >
          <span className="relative inline-block transition-transform duration-200 group-hover:skew-x-[-4deg] group-hover:text-primary">
            MM
          </span>
          <span className="text-primary transition-transform duration-200 group-hover:scale-150 inline-block">.</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-cursor-hover
              className="group relative font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="relative z-10">{item.label}</span>
              {/* Retro underline strike effect */}
              <motion.span
                className="absolute left-0 bottom-[-4px] h-[2px] bg-primary origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.25 }}
                style={{ width: "100%" }}
              />
              {/* Stamp rotation on hover */}
              <span className="absolute -top-3 -right-3 font-serif text-[8px] font-black text-primary opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:rotate-[-12deg] inline-block">
                &#x2605;
              </span>
            </a>
          ))}
          <a
            href="#download"
            data-cursor-text="Baixar"
            className="group relative flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 font-mono text-xs uppercase tracking-widest overflow-hidden transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            <span className="absolute inset-0 bg-foreground translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <Download size={14} className="relative z-10" />
            <span className="relative z-10">CV</span>
          </a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setIsOpen(false)}
                  className="font-mono text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
              <a
                href="#download"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-3 font-mono text-xs uppercase tracking-widest w-fit"
              >
                <Download size={14} />
                Baixar CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
