'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface MarketItemProps {
  title: string
  image: string
  imageType: string
  description: string
  link: string
}

function MarketItem({ title, image, imageType, description, link }: MarketItemProps) {
  return (
    <div className="bg-zinc-900 border-2 rounded-lg p-6 relative overflow-hidden" style={{ borderColor: '#FFD700' }}>
      <div className="absolute inset-0 z-0" style={{ boxShadow: 'inset 0 0 20px rgba(255, 215, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.5)' }} />
      <div className="relative z-10">
        <div className="aspect-video relative mb-4 bg-zinc-800 rounded-lg overflow-hidden">
          <Image 
            src={`${image}.${imageType}`}
            alt={title}
            fill
            className="object-cover w-full"
            priority
          />
        </div>
        <h3 className="text-2xl font-bold mb-2" style={{ color: '#FFD700', textShadow: '0 0 10px rgba(255, 215, 0, 0.7)' }}>{title}</h3>
        <p className="text-gray-400 mb-4">{description}</p>
        <div className="flex justify-end">
          <Link href={link} target="_blank" rel="noopener noreferrer">
            <Button 
              variant="outline"
              className="relative transition-all duration-300 border-2 animate-pulse-gold"
              style={{ 
                borderColor: '#FFD700', 
                color: '#FFD700', 
                boxShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
                textShadow: '0 0 5px rgba(255, 215, 0, 0.5)'
              }}
            >
              ดูตัวอย่าง
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function Markets() {
  const marketItems = [
    {
      title: "กำลังลง.",
      image: "/images/404",
      imageType: "png",
      description: "กำลังลง...",
      link: "http://tiny.cc/AmethystCore"
    },
    {
      title: "กำลังลง..",
      image: "/images/404",
      imageType: "png",
      description: "กำลังลง...",
      link: "http://tiny.cc/AmethystCore"
    },
    {
      title: "กำลังลง...",
      image: "/images/404",
      imageType: "png",
      description: "กำลังลง...",
      link: "http://tiny.cc/AmethystCore"
    }
  ]

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {marketItems.map((item) => (
        <MarketItem 
          key={item.title}
          {...item}
        />
      ))}
      <style jsx global>{`
        @keyframes pulse-gold {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
          }
          50% {
            opacity: 0.8;
            box-shadow: 0 0 20px rgb(255, 217, 0);
          }
        }
        .animate-pulse-gold {
          animation: pulse-gold 2s infinite;
        }
      `}</style>
    </div>
  )
}
