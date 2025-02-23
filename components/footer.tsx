import { Github, Mail, Shield, Twitter } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center space-x-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500"
            >
              <Shield className="w-6 h-6 text-purple-500" />
              <span>EncFile</span>
            </Link>
            <p className="text-sm text-white/70">
              Military-grade encryption for your files. That are completely Secure, private.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-sm text-white/70 hover:text-white transition-colors">
                  Zero-Knowledge Encryption
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-sm text-white/70 hover:text-white transition-colors">
                  File Integrity
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-sm text-white/70 hover:text-white transition-colors">
                  Secure Archive Encryption
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                  Security
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Link
                href="https://twitter.com/mannupaaji"
                className="text-white/70 hover:text-purple-500 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="https://github.com" className="text-white/70 hover:text-purple-500 transition-colors">
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="mailto:contact@EncFile.com"
                className="text-white/70 hover:text-purple-500 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/70">
            <p>© {new Date().getFullYear()} EncFile. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

