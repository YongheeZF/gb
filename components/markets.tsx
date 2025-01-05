'use client'

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface MarketItemProps {
  title: string
  image: string
  imageType: string
  description: string
  link: string
  exampleLink?: string // New optional property
}

function MarketItem({ title, image, imageType, description, link, exampleLink }: MarketItemProps) {
  return (
    <div className="bg-zinc-900 border-2 rounded-lg p-6 relative overflow-hidden h-full" style={{ borderColor: '#FFD700' }}>
      <div className="absolute inset-0 z-0" style={{ boxShadow: 'inset 0 0 20px rgba(255, 215, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.5)' }} />
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
        <h3 className="text-2xl font-bold mb-2" style={{ color: '#FFD700', textShadow: '0 0 10px rgba(255, 215, 0, 0.7)' }}>{title}</h3>
        <p className="text-gray-400 mb-4 flex-1">{description}</p>
        <div className="flex justify-end space-x-4 mt-auto"> {/* Added space between buttons */}
          {exampleLink && ( // Render "Example" button only if exampleLink is provided
            <Link href={exampleLink} target="_blank" rel="noopener noreferrer">
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
                ตัวอย่าง
              </Button>
            </Link>
          )}
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
              ติดต่อสอบถาม
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
        title: "Amulets",
        image: "/images/amulet",
        imageType: "png",
        description: "สวมเครื่องรางในช่องพิเศษโดยไม่พึ่งพาช่องของในตัว ลดภาระการใช้งานช่องโดยไม่จำเป็น แถมยังกำหนดบัฟต่างๆได้ตามใจชอบ",
        link: "http://tiny.cc/AmethystCore",
        exampleLink: "https://youtu.be/3P9lUP-L7ks?si=oEqnpp2n6JLK9CdT" 
      },
        {
          title: "Floating Text & Leaderboard Pro Max (No Resource Pack)",
          image: "/images/leaderboard1_2",
          imageType: "png",
          description: "อักษรลอยรองรับการพิมพ์ข้อความยาวๆหลายบรรทัด และ กระดานผู้นำที่กำหนดการแสดงผลได้สุดเฟี้ยว",
          link: "http://tiny.cc/AmethystCore",
          exampleLink: "https://youtu.be/nLuNIqkq97Q?si=RVqUz9fYc1_n3025" 
        },
        {
          title: "HP & DMG Indicator",
          image: "/images/hpsystem",
          imageType: "png",
          description: "แสดงจำนวนดาเมจ และ ฮีลเลือดอย่างสมบูรณ์แบบโดยไม่มีผลกระทบต่อม็อบกับสิ่งแวดล้อมในแมพใดๆ อีกทั้งแสดงเลือดปัจจุบัน/เลือดสูงสุดของสิ่งมีชีวิตที่กำหนดได้ ",
          link: "http://tiny.cc/AmethystCore",
          exampleLink: "https://youtu.be/tZCmop1KB9I?si=NgZWu1kpW9PdUg2y"
        },
        {
          title: "Private Safe House",
          image: "/images/vault1_2",
          imageType: "png",
          description: "บ้าน หรือ ห้องเก็บของส่วนตัวใครๆก็ทำได้ใช่ไหมล่ะ แต่จะมีซักเท่าไหร่ที่จะไม่บัคและไม่โดนเกรียน?",
          link: "http://tiny.cc/AmethystCore" 
        }
      ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto pb-20">
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
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.8);
          }
        }
        .animate-pulse-gold {
          animation: pulse-gold 2s infinite;
        }
      `}</style>
    </div>
  )
}

