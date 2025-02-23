"use client"

import * as React from "react"
import { QRCodeSVG } from "qrcode.react"
import { motion } from "framer-motion"
import { QrCode, Download, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"

interface QRShareProps {
  shareableLink: string
}

export function QRShare({ shareableLink }: QRShareProps) {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = React.useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableLink)
    toast({
      title: "Copied!",
      description: "Link copied to clipboard",
    })
  }

  const handleDownloadQR = () => {
    const canvas = document.querySelector("canvas")
    if (canvas) {
      const url = canvas.toDataURL("image/png")
      const a = document.createElement("a")
      a.download = "encrypted-file-qr.png"
      a.href = url
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <QrCode className="w-4 h-4 mr-2" />
          Share via QR Code
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Encrypted File</DialogTitle>
          <DialogDescription>
            Scan this QR code to access the encrypted file or copy the link directly.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-4 bg-white rounded-lg"
          >
            <QRCodeSVG
              value={shareableLink}
              size={200}
              level="H"
              includeMargin
              imageSettings={{
                src: "/logo.png",
                height: 24,
                width: 24,
                excavate: true,
              }}
            />
          </motion.div>
          <div className="flex gap-2 w-full">
            <Button onClick={handleCopyLink} className="flex-1">
              <Copy className="w-4 h-4 mr-2" />
              Copy Link
            </Button>
            <Button onClick={handleDownloadQR} variant="outline" className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Download QR
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

