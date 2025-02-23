"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lock, Unlock, Key, FileKey, Trash2, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { generateAESKey, encryptData, decryptData } from "@/lib/encryption"
import { combineFiles, extractFiles } from "@/lib/archive"

type FileWithPath = File & { path?: string }

export function FileEncryption() {
  const [files, setFiles] = React.useState<FileWithPath[]>([])
  const [key, setKey] = React.useState("")
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [progressStatus, setProgressStatus] = React.useState("")
  const [tab, setTab] = React.useState<"encrypt" | "decrypt">("encrypt")
  const { toast } = useToast()

  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files) as FileWithPath[]
      setFiles((prev) => [...prev, ...fileList])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const processFiles = async (encrypt: boolean) => {
    if (files.length === 0 || !key) {
      toast({ title: "Error", description: "Select files and enter a key", variant: "destructive" })
      return
    }

    try {
      setIsProcessing(true)
      setProgress(0)

      const cryptoKey = await generateAESKey(key)

      if (encrypt) {
        // Combine files into a zip
        setProgressStatus("Combining files...")
        setProgress(10)
        const zipBlob = await combineFiles(files)
        setProgress(30)

        // Encrypt the zip file
        setProgressStatus("Encrypting files...")
        const arrayBuffer = await zipBlob.arrayBuffer()
        const result = await encryptData(arrayBuffer, cryptoKey)
        setProgress(70)

        // Convert encrypted data to final format
        const ivBytes = new Uint8Array(Buffer.from(result.iv, "base64"))
        const encryptedBytes = new Uint8Array(Buffer.from(result.encrypted, "base64"))
        const finalData = new Uint8Array(ivBytes.length + encryptedBytes.length)
        finalData.set(ivBytes, 0)
        finalData.set(encryptedBytes, ivBytes.length)

        // Save the encrypted archive
        setProgressStatus("Saving encrypted archive...")
        const blob = new Blob([finalData])
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = files.length === 1 ? `${files[0].name}.encrypted` : "encrypted_files.zip.encrypted"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        setProgress(100)
      } else {
        // Decrypt the archive
        setProgressStatus("Decrypting files...")
        setProgress(20)

        const arrayBuffer = await files[0].arrayBuffer()
        const ivBytes = new Uint8Array(arrayBuffer.slice(0, 12))
        const iv = Buffer.from(ivBytes).toString("base64")
        const encryptedData = new Uint8Array(arrayBuffer.slice(12))
        const decryptedData = await decryptData(Buffer.from(encryptedData).toString("base64"), cryptoKey, iv)
        setProgress(60)

        // Extract files from the zip
        setProgressStatus("Extracting files...")
        const zipBlob = new Blob([decryptedData])
        const extractedFiles = await extractFiles(zipBlob)
        setProgress(80)

        // Save all extracted files
        setProgressStatus("Saving decrypted files...")
        for (const file of extractedFiles) {
          const url = URL.createObjectURL(file.content)
          const a = document.createElement("a")
          a.href = url
          a.download = file.name
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          URL.revokeObjectURL(url)
        }
        setProgress(100)
      }

      toast({ title: "Success", description: `Files ${encrypt ? "encrypted" : "decrypted"} successfully` })
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: `Failed to ${encrypt ? "encrypt" : "decrypt"} files`,
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
      setProgress(0)
      setProgressStatus("")
    }
  }

  React.useEffect(() => {
    setFiles([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [tab])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="w-full max-w-2xl mx-auto backdrop-blur-sm border-purple-500/20 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{
            backgroundSize: "200% 200%",
          }}
        />
        <CardContent className="relative p-6">
          <Tabs
            defaultValue="encrypt"
            className="w-full"
            onValueChange={(value) => setTab(value as "encrypt" | "decrypt")}
          >
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="encrypt" className="text-lg">
                <motion.div className="flex items-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Lock className="mr-2" /> Encrypt
                </motion.div>
              </TabsTrigger>
              <TabsTrigger value="decrypt" className="text-lg">
                <motion.div className="flex items-center" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Unlock className="mr-2" /> Decrypt
                </motion.div>
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              {["encrypt", "decrypt"].map((mode) => (
                <TabsContent key={mode} value={mode}>
                  <motion.div
                    initial={{ opacity: 0, x: mode === "encrypt" ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: mode === "encrypt" ? -20 : 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="p-6 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20">
                      <div className="space-y-4">
                        <motion.div className="space-y-2" layout>
                          <Label className="text-base flex items-center">
                            <FileKey className="w-4 h-4 mr-2" /> Select Files
                          </Label>
                          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                            <Input
                              type="file"
                              multiple={mode === "encrypt"}
                              onChange={handleFileChange}
                              ref={fileInputRef}
                              className="file:text-purple-500 file:border-purple-500/20 file:bg-purple-500/10 hover:file:bg-purple-500/20 transition-all"
                            />
                          </motion.div>
                        </motion.div>

                        <motion.div className="space-y-2" layout>
                          <Label htmlFor="key" className="text-base flex items-center">
                            <Key className="w-4 h-4 mr-2" /> {mode === "encrypt" ? "Encryption" : "Decryption"} Key
                          </Label>
                          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                            <Input
                              id="key"
                              type="password"
                              value={key}
                              onChange={(e) => setKey(e.target.value)}
                              placeholder="Enter your secret key"
                              className="pr-10"
                            />
                          </motion.div>
                        </motion.div>

                        {files.length > 0 && (
                          <motion.div
                            className="space-y-2"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <Label className="text-base flex items-center">
                              <Package className="w-4 h-4 mr-2" /> Selected Files ({files.length})
                            </Label>
                            <div className="max-h-32 overflow-y-auto space-y-1">
                              <AnimatePresence>
                                {files.map((file, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="flex items-center justify-between text-sm text-white/70 p-2 rounded-md hover:bg-white/5"
                                  >
                                    <span className="truncate">{file.path || file.name}</span>
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => removeFile(index)}
                                      className="text-red-400 hover:text-red-300"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </motion.button>
                                  </motion.div>
                                ))}
                              </AnimatePresence>
                            </div>
                          </motion.div>
                        )}

                        {isProcessing && (
                          <motion.div className="space-y-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <Progress value={progress} className="h-2" />
                            <p className="text-sm text-center text-white/70">
                              {progressStatus || "Processing..."} {Math.round(progress)}%
                            </p>
                          </motion.div>
                        )}

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            onClick={() => processFiles(mode === "encrypt")}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                            disabled={!files.length || !key || isProcessing}
                          >
                            {mode === "encrypt" ? (
                              <motion.div className="flex items-center" layout>
                                <Lock className="mr-2 h-4 w-4" />
                                {files.length > 1 ? "Encrypt Files as Archive" : "Encrypt File"}
                              </motion.div>
                            ) : (
                              <motion.div className="flex items-center" layout>
                                <Unlock className="mr-2 h-4 w-4" />
                                Decrypt Files
                              </motion.div>
                            )}
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
              ))}
            </AnimatePresence>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  )
}

