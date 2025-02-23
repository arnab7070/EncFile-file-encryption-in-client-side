import JSZip from "jszip"

export async function combineFiles(files: File[]): Promise<Blob> {
  const zip = new JSZip()

  // Add each file to the zip
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer()
    // Preserve folder structure if present
    const path = (file as any).path || file.name
    zip.file(path, arrayBuffer)
  }

  // Generate zip file
  return zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: {
      level: 9,
    },
  })
}

export async function extractFiles(zipBlob: Blob): Promise<{ name: string; content: Blob }[]> {
  const zip = await JSZip.loadAsync(zipBlob)
  const files: { name: string; content: Blob }[] = []

  for (const [path, file] of Object.entries(zip.files)) {
    if (!file.dir) {
      const content = await file.async("blob")
      files.push({ name: path, content })
    }
  }

  return files
}

