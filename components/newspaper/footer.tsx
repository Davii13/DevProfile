"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-card-foreground/10 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            className="flex flex-col items-center md:items-start"
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.span
              className="font-serif text-2xl font-black text-card-foreground"
              whileHover={{ skewX: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Matheus Malta<span className="text-primary">.</span>
            </motion.span>
            <p className="font-mono text-[10px] uppercase tracking-widest text-card-foreground/50 mt-1">
              Software Engineer
            </p>
          </motion.div>

          <div className="flex items-center gap-6">
            {[
              { icon: Github, href: "#", label: "GitHub" },
              { icon: Linkedin, href: "#", label: "LinkedIn" },
              { icon: Mail, href: "mailto:matheus@malta.dev", label: "Email" },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="text-card-foreground/50 hover:text-primary transition-colors"
                aria-label={social.label}
                whileHover={{ scale: 1.3, rotate: -12, y: -2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 12 }}
                data-cursor-hover
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </div>

          <p className="font-mono text-[10px] uppercase tracking-widest text-card-foreground/30">
            &copy; 2026 Matheus Malta. Todos os direitos reservados.
          </p>
        </div>

        {/* Newspaper bottom bar */}
        <div className="mt-8 pt-6 border-t border-card-foreground/10">
          <div className="flex flex-col gap-1">
            <div className="h-[2px] bg-card-foreground/10" />
            <div className="h-px bg-card-foreground/10" />
          </div>
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-card-foreground/20 text-center mt-4">
            Desenvolvido com Next.js, Tailwind CSS & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  )
}
