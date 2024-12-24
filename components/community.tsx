'use client'

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface CommunityItemProps {
  title: string
  image: string
  imageType: string
  description: string
  link: string
  borderColor: string
}

function CommunityItem({ title, image, imageType, description, link, borderColor }: CommunityItemProps) {
  return (
    <div className={`bg-zinc-900 border-2 rounded-lg p-6 relative overflow-hidden`} style={{ borderColor }}>
      <div className="absolute inset-0 z-0" style={{ boxShadow: `inset 0 0 20px ${borderColor}` }} />
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
        <h3 className="text-2xl font-bold mb-2 text-shadow-custom" style={{ color: borderColor, textShadow: `0 0 10px ${borderColor}` }}>{title}</h3>
        <p className="text-gray-400 mb-4">{description}</p>
        <div className="flex justify-end">
          <Link href={link} target="_blank" rel="noopener noreferrer">
            <Button 
              variant="outline"
              className={`relative transition-all duration-300 border-2 hover:bg-opacity-20 animate-pulse`}
              style={{ 
                borderColor, 
                color: borderColor, 
                boxShadow: `0 0 10px ${borderColor}`,
                textShadow: `0 0 5px ${borderColor}`
              }}
            >
              เยี่ยมชม
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function Community() {
    const communityItems = [
      {
        title: "Instagram",
        image: "/images/ig",
        imageType: "png",
        description: "เข้าชมช่องทาง Instagram",
        link: "https://www.instagram.com/frenzied_inferno.th/",
        borderColor: "#9D00FF"  // Instagram purple
      },
        {
          title: "Discord",
          image: "/images/discord",
          imageType: "png",
          description: "เข้าชมกลุ่ม Discord ของ Barry the Dread",
          link: "http://tiny.cc/AmethystCore",
          borderColor: "#5865F2"  // Discord blue
        },
        {
            title: "Twitter / X",
            image: "/images/x",
            imageType: "png",
            description: "ยังไม่ถึงเวลา...",
            link: "https://twitter.com",
            borderColor: "#1DA1F2"  // Twitter blue
          },
        {
          title: "Youtube",
          image: "/images/you_tube",
          imageType: "png",
          description: "เข้าชม Youtube ช่องทางหลักของ Barry the Dread",
          link: "https://www.youtube.com/@barryaroy",
          borderColor: "#FF0000"  // YouTube Red
        },
        {
            title: "Partner",
            image: "/images/partner1",
            imageType: "png",
            description: "เข้าชม Youtube ช่องทางหลักของ Partner ท่านแรก",
            link: "https://www.youtube.com/@MrMaxing/videos",
            borderColor: "#FFA500"  // MrMaxing Orange
          }
      ]

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-20">
      {communityItems.map((item) => (
        <CommunityItem 
          key={item.title}
          {...item}
        />
      ))}
      <style jsx global>{`
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 0 10px currentColor;
          }
          50% {
            opacity: 0.8;
            box-shadow: 0 0 20px currentColor;
          }
        }
        .animate-pulse {
          animation: pulse-glow 2s infinite;
        }
      `}</style>
    </div>
  )
}

