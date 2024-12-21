'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface AddonPackProps {
  title: string
  image: string
  imageType: string
  globalDownloads: number
  filePath: string
  onDownload: (title: string) => void
}

function AddonPack({ title, image, imageType, globalDownloads, filePath, onDownload }: AddonPackProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [hasDownloaded, setHasDownloaded] = useState(false)
  const [downloadCount, setDownloadCount] = useState(globalDownloads)
  const [cooldown, setCooldown] = useState(false)

  // Load download state from localStorage
  useEffect(() => {
    const downloadState = localStorage.getItem(`downloaded_${title}`)
    if (downloadState === 'true') {
      setHasDownloaded(true)
    }
    setDownloadCount(globalDownloads)
  }, [title, globalDownloads])

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
        setDownloadCount(prev => prev + 1)
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
      <div className="absolute inset-0 z-0" style={{ boxShadow: 'inset 0 0 20px rgba(239, 68, 68, 0.5), 0 0 20px rgba(239, 68, 68, 0.5)' }} />
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
        <p className="text-gray-400">{globalDownloads} Total Downloads</p>
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
  )
}

export default function AddonPacks() {
  // Load download counts from localStorage
  const [downloadCounts, setDownloadCounts] = useState<Record<string, number>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('download_counts')
      return saved ? JSON.parse(saved) : {}
    }
    return {}
  })

  const [totalDownloads, setTotalDownloads] = useState(0);

  // Save download counts to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(downloadCounts).length > 0) {
      localStorage.setItem('download_counts', JSON.stringify(downloadCounts))
    }
  }, [downloadCounts])

  useEffect(() => {
    const savedTotalDownloads = localStorage.getItem('total_downloads');
    if (savedTotalDownloads) {
      setTotalDownloads(parseInt(savedTotalDownloads, 10));
    }
  }, []);

  const handleDownload = (title: string) => {
    setDownloadCounts(prev => {
      const newCounts = {
        ...prev,
        [title]: (prev[title] || 0) + 1
      };
      localStorage.setItem('download_counts', JSON.stringify(newCounts));
      return newCounts;
    });

    setTotalDownloads(prevTotal => {
      const newTotal = prevTotal + 1;
      localStorage.setItem('total_downloads', newTotal.toString());
      return newTotal;
    });
  }

  const packs = [
    {
      title: "Barry's Revenge",
      image: "/images/barry1",
      imageType: "gif",
      downloads: downloadCounts["Barry's Revenge"] || 0,
      filePath: "/packs/CG.mcpack"
    },
    {
      title: "Barry's Challenge",
      image: "/images/barry2",
      imageType: "png",
      downloads: downloadCounts["Barry's Challenge"] || 0,
      filePath: "/packs/V.mcpack"
    }
  ]

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="text-center mb-8 text-2xl font-bold text-red-500">
        Total Downloads: {totalDownloads}
      </div>
      {packs.map((pack) => (
        <AddonPack 
          key={pack.title}
          {...pack}
          globalDownloads={totalDownloads}
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
      `}</style>
    </div>
  )
}

