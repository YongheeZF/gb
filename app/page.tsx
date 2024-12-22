'use client'

import { useState, useRef, useEffect } from 'react'
import { BackgroundEffects } from '../components/background-effects'
import AddonPacks from '../components/addon-packs'
import Community from '../components/community'
import PageSelection from '../components/page-selection'
import { Button } from '@/components/ui/button'
import { Volume2, VolumeX } from 'lucide-react'
import Markets from '../components/markets'
import CommandBlocks from '../components/command-blocks' // Added import

const textShadowStyles = `
  .text-shadow-red {
    text-shadow: 0 0 10px rgba(239, 68, 68, 0.7);
  }
  .text-shadow-white {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
  }
`

export default function Home() {
  const [currentPage, setCurrentPage] = useState<string | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleVolumeChange = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume
      setVolume(newVolume)
    }
  }

  const handlePageSelection = (page: string) => {
    setCurrentPage(page)
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = volume
      audio.loop = true
      
      const playAudio = () => {
        audio.play().catch(error => console.log("Audio playback failed:", error))
        document.removeEventListener('click', playAudio)
      }
      
      document.addEventListener('click', playAudio)
      
      return () => {
        document.removeEventListener('click', playAudio)
      }
    }
  }, [volume])

  const renderContent = () => {
    switch (currentPage) {
      case 'addons':
        return <AddonPacks />
      case 'markets':
        return <Markets />
      case 'communities':
        return <Community />
      case 'command-blocks': // Added case
        return <CommandBlocks /> // Added case
      default:
        return <PageSelection onSelectPage={handlePageSelection} />
    }
  }

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <style jsx global>{textShadowStyles}</style>
      <BackgroundEffects />
      <audio 
        ref={audioRef} 
        src="/audio/a.mp3"
      />
      
      <header className="relative z-10 pt-12">
        <h1 className="text-6xl font-bold mb-4 text-center">
          <span className="text-red-500 text-shadow-red">Barry the Dread</span>
        </h1>
        <h2 className="text-4xl font-bold text-center text-white mb-12 text-shadow-white">
          {currentPage ? currentPage.charAt(0).toUpperCase() + currentPage.slice(1) : "ยินดีต้อนรับท่านผู้มาเยือน"}
        </h2>
      </header>

      <div className="container mx-auto px-4 pb-20 relative z-10"> {/* Updated container div */}
        <div className="min-h-[50vh]">
          {renderContent()}
        </div>

      </div>

      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-4">
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
          className="w-24 h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-500 [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(239,68,68,0.5)] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-red-500 [&::-moz-range-thumb]:shadow-[0_0_10px_rgba(239,68,68,0.5)] [&::-moz-range-thumb]:cursor-pointer [&::-ms-thumb]:w-4 [&::-ms-thumb]:h-4 [&::-ms-thumb]:rounded-full [&::-ms-thumb]:bg-red-500 [&::-ms-thumb]:shadow-[0_0_10px_rgba(239,68,68,0.5)] [&::-ms-thumb]:cursor-pointer"
        />
        <Button
          size="default"
          variant="outline"
          onClick={toggleMute}
        >
          {isMuted ? <VolumeX /> : <Volume2 />}
        </Button>
      </div>
      {currentPage && (
        <div className="fixed bottom-4 left-4 z-50">
          <Button
            variant="destructive"
            onClick={() => setCurrentPage(null)}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 transition-colors shadow-lg"
          >
            กลับไปก่อนหน้า
          </Button>
        </div>
      )}
    </main>
  )
}

