'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircleQuestionIcon as QuestionMarkCircle } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

interface AddonPackProps {
  title: string
  image: string
  imageType: string
  description: string
  filePath: string
  instructionsLink: string
  onDownload: (title: string) => void
}

function AddonPack({ title, image, imageType, description, filePath, instructionsLink, onDownload }: AddonPackProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [hasDownloaded, setHasDownloaded] = useState(false)
  const [cooldown, setCooldown] = useState(false)

  useEffect(() => {
    const downloadState = localStorage.getItem(`downloaded_${title}`)
    if (downloadState === 'true') {
      setHasDownloaded(true)
    }
  }, [title])

  const handleDownload = async () => {
    if (cooldown || isDownloading) return

    setIsDownloading(true)
    setCooldown(true)

    try {
      const response = await fetch(filePath)
      if (!response.ok) throw new Error('Download failed')
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      const fileName = filePath.split('/').pop() || `${title}.mcpack`
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(link)

      if (!hasDownloaded) {
        onDownload(title)
        setHasDownloaded(true)
        localStorage.setItem(`downloaded_${title}`, 'true')
      }
    } catch (error) {
      console.error('Download failed:', error)
      alert('Sorry, the download failed. Please try again later.')
    } finally {
      setIsDownloading(false)
      setTimeout(() => {
        setCooldown(false)
      }, 5000)
    }
  }

  return (
    <div className="bg-zinc-900 border-2 border-red-500/20 rounded-lg p-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0" style={{ boxShadow: 'inset 0 0 20px rgb(255, 0, 0), 0 0 20px rgb(255, 0, 0)' }} />
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
        <h3 className="text-2xl font-bold text-red-500 mb-2 text-shadow-red">{title}</h3>
        <div className="flex items-center justify-between">
          <p className="text-gray-400">{description}</p>
          <div className="flex items-center gap-2">
            <Link href={instructionsLink} target="_blank" rel="noopener noreferrer">
              <Button 
                variant="outline"
                className="relative transition-all duration-300 border-2 border-yellow-500 text-yellow-500 animate-pulse-yellow"
                style={{ 
                  boxShadow: '0 0 10px rgb(234, 179, 8)',
                  textShadow: '0 0 5px rgb(234, 179, 8)'
                }}
              >
                <QuestionMarkCircle className="w-4 h-4 mr-2" />
                คู่มือ
              </Button>
            </Link>
            <div className="relative">
              <div className={`absolute -inset-1 ${hasDownloaded ? 'bg-green-500/30' : 'bg-red-600/30'} rounded-lg blur-sm`} />
              <Button 
                variant={hasDownloaded ? "outline" : "default"}
                onClick={handleDownload}
                disabled={cooldown || isDownloading}
                className={`relative transition-all duration-300 border-2 ${
                  hasDownloaded ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'
                } animate-pulse-glow`}
              >
                <span className={`${isDownloading ? 'opacity-0' : 'opacity-100'} flex items-center gap-2`}>
                  {hasDownloaded ? (
                    <>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Downloaded
                    </>
                  ) : (
                    'Download'
                  )}
                </span>
                {isDownloading && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle 
                        className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"
                        fill="none"
                      />
                      <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  </span>
                )}
              </Button>
              {cooldown && (
                <div className="absolute -bottom-6 left-0 right-0 text-center text-sm text-gray-500">
                  Please wait...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AddonPacks() {
  const [downloadCounts, setDownloadCounts] = useState<Record<string, number>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('download_counts')
      return saved ? JSON.parse(saved) : {}
    }
    return {}
  })

  useEffect(() => {
    if (Object.keys(downloadCounts).length > 0) {
      localStorage.setItem('download_counts', JSON.stringify(downloadCounts))
    }
  }, [downloadCounts])

  const handleDownload = (title: string) => {
    setDownloadCounts(prev => ({
      ...prev,
      [title]: (prev[title] || 0) + 1
    }))
  }

  const packs = [
    {
      title: "Invincible Dummy [1.21+]",
      image: "/images/kill_ae",
      imageType: "png",
      description: "หุ่นโชว์เกราะ & ผู้เล่นปลอมล่องหน ทนทาน kill @e อย่างมาก",
      filePath: "/packs/superdummy.mcpack",
      instructionsLink: "https://youtu.be/bMv2HPAFL5k?si=1sOZR0e4_OuMbEGE"
    },
    {
      title: "Lobby System [1.21.51]",
      image: "/images/lobbysystem1",
      imageType: "png",
      description: "[Beta API] ยกระดับระบบป้องกันการใช้งานบล็อกต่างๆที่กำหนดด้วยแท็กพิเศษ ปกป้องไม่ให้คนสร้างความวินาศแก่สิ่งปลูกสร้างที่ท่านรักจงลองใช้แอดออนนี้!",
      filePath: "/packs/LobbySystem.mcpack",
      instructionsLink: "https://youtu.be/MmuX-NY3x5E?si=mugOrWTaBNjMKl5n"
    },
    {
      title: "Barry's Ultimate Template [1.21.51]",
      image: "/images/armorsystem1",
      imageType: "png",
      description: "สวมใส่เกราะและได้รับอุปกรณ์เข้าตัว พร้อมชื่อ, เอนชานต์, และ lore ที่กำหนดได้แบบสุดเท่ที่ ลองเลย!",
      filePath: "/packs/BarryTemplate.mcpack",
      instructionsLink: "https://youtu.be/4s_4QWhBBIM?si=_8aawmMIV-MEjkkn"
    },
    {
      title: "Join & Leave Notification [1.21.51]",
      image: "/images/join_leave1",
      imageType: "png",
      description: "[Beta API] ระบบแจ้งเตือนในแชท ระบุเวลาเมื่อมีผู้เข้า & ออกแมพด้วยเวลาจริงของเขตเวลาประเทศไทย",
      filePath: "/packs/BarryNotification_1.mcpack",
      instructionsLink: "https://youtu.be/StsQPQ9Pp4g"
    }
  ]

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-20">
      {packs.map((pack) => (
        <AddonPack 
          key={pack.title}
          {...pack}
          onDownload={handleDownload}
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
        .animate-pulse-glow {
          animation: pulse-glow 2s infinite;
        }
        @keyframes pulse-yellow {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 0 10px rgb(234, 179, 8);
          }
          50% {
            opacity: 0.8;
            box-shadow: 0 0 20px rgb(234, 179, 8);
          }
        }
        .animate-pulse-yellow {
          animation: pulse-yellow 2s infinite;
        }
      `}</style>
    </div>
  )
}

