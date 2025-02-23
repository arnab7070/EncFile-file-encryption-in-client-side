"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Github, Menu, Shield, Twitter, X } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500"
          >
            <Shield className="w-6 h-6" />
            <span>EncFile</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#security">Security</NavLink>
            <NavLink href="#encrypt">Encrypt</NavLink>
            <div className="flex items-center space-x-4 ml-4">
              <Link href="https://twitter.com/mannupaaji" className="hover:text-purple-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="https://github.com" className="hover:text-purple-500 transition-colors">
                <Github className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        className="md:hidden overflow-hidden bg-black/50 backdrop-blur-xl"
      >
        <div className="container mx-auto px-4 py-4 space-y-4">
          <MobileNavLink href="#features" onClick={() => setIsOpen(false)}>
            Features
          </MobileNavLink>
          <MobileNavLink href="#security" onClick={() => setIsOpen(false)}>
            Security
          </MobileNavLink>
          <MobileNavLink href="#encrypt" onClick={() => setIsOpen(false)}>
            Encrypt
          </MobileNavLink>
          <div className="flex items-center space-x-4 pt-4 border-t border-white/10">
            <Link href="https://twitter.com/mannupaaji" className="hover:text-purple-500 transition-colors">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="https://github.com" className="hover:text-purple-500 transition-colors">
              <Github className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </motion.div>
    </nav>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="relative text-sm font-medium text-white/70 hover:text-white transition-colors group">
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all group-hover:w-full" />
    </Link>
  )
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block text-lg font-medium text-white/70 hover:text-white transition-colors"
    >
      {children}
    </Link>
  )
}

