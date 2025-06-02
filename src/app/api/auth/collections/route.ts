import { NextResponse } from 'next/server'
import prisma from '../../../lib/prisma'

export async function GET() {
  try {
    const collections = await prisma.collection.findMany({
      orderBy: { name: 'asc' }
    })
    return NextResponse.json(collections)
  } catch (error) {
    console.error('Error fetching collections:', error)
    return NextResponse.json(
      { error: 'Failed to fetch collections' },
      { status: 500 }
    )
  }
}