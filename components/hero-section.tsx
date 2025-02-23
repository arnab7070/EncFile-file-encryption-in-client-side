"use client"

import { motion } from "framer-motion"
import { ArrowRight, FileArchive, Lock, Shield } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { SparklesCore } from "@/components/ui/sparkles"

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute inset-0 h-40">
              <SparklesCore
                id="tsparticlesfullpage"
                background="transparent"
                minSize={0.6}
                maxSize={1.4}
                particleDensity={100}
                className="w-full h-full"
                particleColor="#FFFFFF"
              />
            </div>
            <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 mb-8 relative z-10">
              Secure File Encryption Made Beautiful
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto"
          >
            Protect multiple files with AES-256 encryption, smart archiving, and an elegant interface. Your data stays
            private with client-side processing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="#encrypt">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                Start Encrypting <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="#security">
              <Button size="lg" variant="outline" className="border-purple-500/20 hover:bg-purple-500/10">
                Learn More <Shield className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <feature.icon className="w-10 h-10 mx-auto mb-4 text-purple-500" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <BackgroundBeams />
    </section>
  )
}

const features = [
  {
    icon: Shield,
    title: "Smart Archiving",
    description: "Securely bundle multiple files with automatic compression and structure preservation.",
  },
  {
    icon: Lock,
    title: "AES-256 Encryption",
    description: "Military-grade encryption with secure key derivation using PBKDF2-SHA512.",
  },
  {
    icon: FileArchive,
    title: "Beautiful Experience",
    description: "Elegant interface with real-time progress tracking and animated feedback.",
  },
]

