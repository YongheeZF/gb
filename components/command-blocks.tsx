'use client'

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface CommandBlockItemProps {
  title: string
  image: string
  imageType: string
  description: string
  link: string
  borderColor: string
}

function CommandBlockItem({ title, image, imageType, description, link, borderColor }: CommandBlockItemProps) {
  return (
    <div className={`bg-zinc-900 border-2 rounded-lg p-6 relative overflow-hidden h-full`} style={{ borderColor }}>
      <div className="absolute inset-0 z-0" style={{ boxShadow: `inset 0 0 20px ${borderColor}` }} />
      <div className="relative z-10 flex flex-col h-full">
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
        <p className="text-gray-400 mb-4 flex-1">{description}</p>
        <div className="flex justify-end mt-auto">
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
              ดูวิธีทำ
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function CommandBlocks() {
    const commandBlockItems = [
      {
        title: "Auto TNT (1.21.51)",
        image: "/images/auto_tnt",
        imageType: "png",
        description: "ระบบจุด TNT อัตโนมัติเมื่อวาง",
        link: "https://youtu.be/w9CkV1ZVaQc?si=C-vjSMYte561-JMO",
        borderColor: "#FF0000"  
      },
      {
        title: "Particle นำทาง (1.21.51)",
        image: "/images/particle_waypoint",
        imageType: "png",
        description: "ระบบ Particle ชี้ทางไปหาเป้าหมายที่กำหนด หรือ พิกัดที่กำหนด",
        link: "https://youtu.be/Fhmz3qSYqLw?si=Mj0C-1uJlr11GTKM",
        borderColor: "#2196F3"  
      },
      {
        title: "ล็อคขา และ หัว (1.21.51)",
        image: "/images/lock_system",
        imageType: "png",
        description: "ระบบล็อคการหันจอ, เดิน, วิ่ง, กระโดด, ย่อตัว, และ ว่ายน้ำ ของคนที่กำหนด",
        link: "https://youtu.be/Q46Ftyd5sjA?si=RjffXIpyDfNb_XcG",
        borderColor: "#FF0000"  
      },
      {
        title: "ซ่อนของที่ถืออยู่",
        image: "/images/hide_item",
        imageType: "png",
        description: "แกล้งเพื่อนด้วยหมัดติดไฟ แต่จริงๆแล้วดาบซ่อนอยู่",
        link: "https://youtu.be/kKiUdA4s7YU?si=rdurjNjg0saPfq7d",
        borderColor: "#9C27B0" 
      }
    ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto pb-20">
      {commandBlockItems.map((item) => (
        <CommandBlockItem 
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

