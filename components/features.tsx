"use client"

import { motion } from "framer-motion"
import { FileArchive, Shield, Sparkles } from "lucide-react"
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards"

export function Features() {
  return (
    <section id="features" className="py-20 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 mb-4">
            Modern File Security Made Simple
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Advanced encryption with an intuitive interface. Protect multiple files with a single click.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-colors"
            >
              <feature.icon className="w-12 h-12 text-purple-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
              <ul className="mt-4 space-y-2">
                {feature.points.map((point, i) => (
                  <li key={i} className="flex items-start text-sm text-white/60">
                    <span className="mr-2 text-purple-500">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10" />
          <InfiniteMovingCards items={technologies} direction="right" speed="slow" />
        </div>
      </div>
    </section>
  )
}

const features = [
  {
    icon: FileArchive,
    title: "Smart File Handling",
    description: "Efficiently manage and encrypt multiple files with our advanced archiving system.",
    points: [
      "Combined file encryption for better security",
      "Preserve folder structure and hierarchy",
      "Automatic file compression",
      "Real-time progress tracking",
    ],
  },
  {
    icon: Shield,
    title: "Zero-Knowledge Security",
    description: "Your data never leaves your device unprotected. All processing happens locally.",
    points: [
      "Client-side encryption only",
      "No server data storage",
      "Secure key derivation",
      "Perfect forward secrecy",
    ],
  },
  {
    icon: Sparkles,
    title: "Modern Experience",
    description: "A beautiful, responsive interface with intuitive controls and visual feedback.",
    points: [
      "Animated micro-interactions",
      "Real-time progress updates",
      "Drag and drop support",
      "Dark mode optimized",
    ],
  },
]

const technologies = [
  {
    name: "ZIP Archiving",
    description: "Secure file bundling",
  },
  {
    name: "AES-256-GCM",
    description: "Military-grade encryption",
  },
  {
    name: "PBKDF2-SHA512",
    description: "Secure key derivation",
  },
  {
    name: "Zero-Knowledge",
    description: "Complete privacy",
  },
]

