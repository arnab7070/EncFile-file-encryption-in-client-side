"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Send, User, MessageSquare } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.target as HTMLFormElement)

    // Google Forms URL
    const googleFormUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLSdDd_J8DarkiRWOu4gdrDcUCi174QlUuBFpClhnIewunISmWg/formResponse"

    try {
      await fetch(googleFormUrl, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      })

      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      })
    } catch (error) {
      console.error("Form submission error:", error)
      toast({
        title: "Error!",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      })
    }

    setIsSubmitting(false)
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <section id="contact" className="py-20 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Have questions about our encryption technology? We'd love to hear from you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-lg mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-base flex items-center">
                <User className="w-4 h-4 mr-2" /> Your Name
              </Label>
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <Input
                  required
                  name="entry.2005620554"
                  placeholder="John Doe"
                  className="bg-white/5 border-purple-500/20 focus:border-purple-500/50"
                />
              </motion.div>
            </div>

            <div className="space-y-2">
              <Label className="text-base flex items-center">
                <Mail className="w-4 h-4 mr-2" /> Email Address
              </Label>
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <Input
                  required
                  type="email"
                  name="entry.1045781291"
                  placeholder="john@example.com"
                  className="bg-white/5 border-purple-500/20 focus:border-purple-500/50"
                />
              </motion.div>
            </div>

            <div className="space-y-2">
              <Label className="text-base flex items-center">
                <MessageSquare className="w-4 h-4 mr-2" /> Message
              </Label>
              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <Textarea
                  required
                  name="entry.839337160"
                  placeholder="Your message..."
                  className="min-h-[150px] bg-white/5 border-purple-500/20 focus:border-purple-500/50"
                />
              </motion.div>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white",
                  "transition-all duration-300 ease-out",
                )}
              >
                {isSubmitting ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center"
                  >
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Sending...
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center">
                    <Send className="mr-2 h-4 w-4" /> Send Message
                  </motion.div>
                )}
              </Button>
            </motion.div>
          </form>

          <motion.div
            className="mt-8 p-4 rounded-xl bg-white/5 border border-purple-500/20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm text-white/70 text-center">
              We typically respond within 24 hours
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
