"use client"

import { motion } from "framer-motion"
import { Shield, Lock, Key } from "lucide-react"
import { SpotlightCard } from "@/components/ui/spotlight-card"

export function SecurityFeatures() {
  return (
    <section id="security" className="py-20 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 mb-4">
            Enterprise-Grade Security
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Built with the most advanced encryption technologies to ensure your data remains private and secure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {securityFeatures.map((feature, index) => (
            <SpotlightCard key={index}>
              <div className="p-8">
                <feature.icon className="w-12 h-12 text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
                <ul className="mt-4 space-y-2">
                  {feature.points.map((point, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2 text-purple-500">•</span>
                      <span className="text-sm text-white/70">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}
// Update the security features section
const securityFeatures = [
  {
    icon: Shield,
    title: "Zero-Knowledge Architecture",
    description: "Your data never leaves your device unencrypted.",
    points: [
      "Client-side encryption",
      "No server-side key storage",
      "End-to-end encryption",
      "Perfect forward secrecy",
    ],
  },
  
  {
    icon: Key,
    title: "Advanced Security",
    description: "Enterprise-grade encryption and security features.",
    points: ["AES-256-GCM encryption", "SHA-512 integrity checks", "Steganography support", "Multi-file encryption"],
  },

  {
  icon: Lock,
  title: "Secure File Protection",
  description: "Encrypt your files with military-grade standards, all in your browser.",
  points: [
    "AES-256-GCM encryption",
    "Multi-file and folder support",
    "SHA-512 file integrity verification",
    "Local key derivation with PBKDF2"
  ]
},
]

