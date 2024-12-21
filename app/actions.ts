'use server'

import { promises as fs } from 'fs'
import path from 'path'

export async function downloadPack(packName: string) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'packs', 'CG.mcpack')
    await fs.access(filePath) // Check if file exists
    return { success: true }
  } catch (error) {
    console.error('File access error:', error)
    return { success: false, error: 'File not found' }
  }
}

