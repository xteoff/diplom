// lib/uploadFile.ts
import { createWriteStream } from 'fs'
import { promisify } from 'util'
import { pipeline } from 'stream'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'

const pump = promisify(pipeline)

export async function uploadFile(file: any) {
  try {
    const uploadDir = path.join(process.cwd(), 'public/uploads')
    const fileExt = path.extname(file.originalFilename)
    const fileName = `${uuidv4()}${fileExt}`
    const filePath = path.join(uploadDir, fileName)
    
    await pump(file.file, createWriteStream(filePath))
    
    return `/uploads/${fileName}`
  } catch (error) {
    console.error('File upload error:', error)
    throw new Error('Failed to upload file')
  }
}