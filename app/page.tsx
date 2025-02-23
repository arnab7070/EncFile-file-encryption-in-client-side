import { HeroSection } from "@/components/hero-section"
import { Features } from "@/components/features"
import { SecurityFeatures } from "@/components/security-features"
import { FileEncryption } from "@/components/file-encryption"
import { ContactForm } from "@/components/contact-form"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BackgroundBeams } from "@/components/ui/background-beams"

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="pt-16">
        <HeroSection />
        <Features />
        <SecurityFeatures />
        <section className="relative py-20">
          <BackgroundBeams />
          <div className="container relative z-10 mx-auto px-4">
            <FileEncryption />
          </div>
        </section>
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}

