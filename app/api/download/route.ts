import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET(request: Request) {
  try {
    // Get the file path from the URL
    const url = new URL(request.url)
    const filePath = path.join(process.cwd(), 'public', 'packs', 'CG.mcpack')

    // Read the file
    const fileBuffer = await fs.readFile(filePath)

    // Create response with proper headers
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Disposition': 'attachment; filename=CG.mcpack',
        'Content-Type': 'application/octet-stream',
      },
    })
  } catch (error) {
    console.error('Download error:', error)
    return new NextResponse('File not found', { status: 404 })
  }
}

