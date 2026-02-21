"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Mail, MapPin, Phone, Github, Linkedin, Send } from "lucide-react"

const contactInfo = [
  { icon: Mail, label: "Email", value: "matheus@malta.dev", href: "mailto:matheus@malta.dev" },
  { icon: Phone, label: "Telefone", value: "+55 (81) 99999-9999", href: "tel:+5581999999999" },
  { icon: MapPin, label: "Localizacao", value: "Recife, PE - Brasil", href: "#" },
]

const socials = [
  { icon: Github, label: "GitHub", value: "github.com/matheusmalta", href: "#" },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/matheusmalta", href: "#" },
]

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [focusedField, setFocusedField] = useState<string | null>(null)

  return (
    <section id="contato" className="relative bg-card py-24 md:py-32" ref={ref}>
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
              .Con
            </motion.span>
            <br />
            <motion.span className="text-primary inline-block" whileHover={{ letterSpacing: "0.05em" }} transition={{ duration: 0.3 }}>
              tato
            </motion.span>
          </h2>
          <motion.div className="mt-4 h-[3px] w-24 bg-primary" whileHover={{ width: 192 }} transition={{ duration: 0.4 }} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Left - contact info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-5"
          >
            <p className="font-serif text-2xl text-card-foreground leading-relaxed mb-8">
              Vamos conversar? Estou sempre aberto a novas oportunidades
              e parcerias interessantes.
            </p>

            <div className="flex flex-col gap-6 mb-8">
              {contactInfo.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  whileHover={{ x: 8 }}
                  className="group flex items-start gap-4"
                  data-cursor-hover
                >
                  <motion.div
                    className="bg-card-foreground/5 p-3 group-hover:bg-primary transition-colors"
                    whileHover={{ rotate: -8, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <item.icon size={18} className="text-card-foreground group-hover:text-primary-foreground transition-colors" />
                  </motion.div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-card-foreground/50">
                      {item.label}
                    </p>
                    <p className="font-sans text-sm text-card-foreground group-hover:text-primary transition-colors">
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="border-t border-card-foreground/10 pt-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-card-foreground/50 mb-4">
                Redes Sociais
              </p>
              <div className="flex flex-col gap-4">
                {socials.map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    className="group flex items-center gap-3 text-card-foreground hover:text-primary transition-colors"
                    whileHover={{ x: 8 }}
                    data-cursor-hover
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <item.icon size={18} />
                    </motion.div>
                    <span className="font-mono text-xs uppercase tracking-widest">
                      {item.value}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right - contact form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-7"
          >
            <motion.div
              className="border border-card-foreground/10 p-8 md:p-10 relative overflow-hidden"
              whileHover={{ borderColor: "rgba(200, 16, 46, 0.3)" }}
              transition={{ duration: 0.3 }}
            >
              {/* Typing cursor blinking on focused label */}
              <h3 className="font-mono text-xs uppercase tracking-widest text-primary mb-8">
                Envie uma mensagem
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
                  className="inline-block ml-1 w-[2px] h-3 bg-primary align-middle"
                />
              </h3>

              <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { id: "nome", label: "Nome", type: "text", placeholder: "Seu nome" },
                    { id: "email", label: "Email", type: "email", placeholder: "seu@email.com" },
                  ].map((field) => (
                    <div key={field.id} className="relative">
                      <motion.label
                        className="font-mono text-[10px] uppercase tracking-widest text-card-foreground/50 mb-2 block"
                        animate={{
                          color: focusedField === field.id ? "#c8102e" : "rgba(26,26,26,0.5)",
                          x: focusedField === field.id ? 4 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {field.label}
                      </motion.label>
                      <input
                        type={field.type}
                        onFocus={() => setFocusedField(field.id)}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-transparent border-b-2 border-card-foreground/20 py-3 font-sans text-sm text-card-foreground focus:border-primary outline-none transition-colors placeholder:text-card-foreground/30"
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}
                </div>

                <div className="relative">
                  <motion.label
                    className="font-mono text-[10px] uppercase tracking-widest text-card-foreground/50 mb-2 block"
                    animate={{
                      color: focusedField === "assunto" ? "#c8102e" : "rgba(26,26,26,0.5)",
                      x: focusedField === "assunto" ? 4 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    Assunto
                  </motion.label>
                  <input
                    type="text"
                    onFocus={() => setFocusedField("assunto")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-transparent border-b-2 border-card-foreground/20 py-3 font-sans text-sm text-card-foreground focus:border-primary outline-none transition-colors placeholder:text-card-foreground/30"
                    placeholder="Assunto da mensagem"
                  />
                </div>

                <div className="relative">
                  <motion.label
                    className="font-mono text-[10px] uppercase tracking-widest text-card-foreground/50 mb-2 block"
                    animate={{
                      color: focusedField === "mensagem" ? "#c8102e" : "rgba(26,26,26,0.5)",
                      x: focusedField === "mensagem" ? 4 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    Mensagem
                  </motion.label>
                  <textarea
                    rows={5}
                    onFocus={() => setFocusedField("mensagem")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-transparent border-b-2 border-card-foreground/20 py-3 font-sans text-sm text-card-foreground focus:border-primary outline-none transition-colors resize-none placeholder:text-card-foreground/30"
                    placeholder="Escreva sua mensagem..."
                  />
                </div>

                <motion.button
                  type="submit"
                  className="group relative flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-4 font-mono text-xs uppercase tracking-widest self-start overflow-hidden"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  data-cursor-text="Enviar"
                >
                  <motion.span
                    className="absolute inset-0 bg-card-foreground"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.35 }}
                  />
                  <Send size={14} className="relative z-10" />
                  <span className="relative z-10">Enviar Mensagem</span>
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
