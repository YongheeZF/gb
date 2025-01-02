import Image from 'next/image'

interface PageItem {
  id: string
  title: string
  description: string
  hoverImage: string
  imageType: string
}

interface PageSelectionProps {
  onSelectPage: (page: string) => void
}

export default function PageSelection({ onSelectPage }: PageSelectionProps) {
  const pages: PageItem[] = [
    {
      id: 'addons',
      title: 'Addons',
      description: 'เยี่ยมชมผลงานแอด-ออนต่างๆ',
      hoverImage: '/images/addon0',
      imageType: 'gif'
    },
    {
      id: 'command-blocks',
      title: 'Command Blocks',
      description: 'สอนระบบคอมมานด์บล็อกต่างๆ',
      hoverImage: '/images/command0',
      imageType: 'gif'
    },
    {
      id: 'communities',
      title: 'Communities', 
      description: 'ช่องทางชุมชนทั้งหมด',
      hoverImage: '/images/community0',
      imageType: 'gif'
    },
    {
      id: 'markets',
      title: 'Markets',
      description: 'ระบบที่ควรต้องพกไว้ประดับบารมี',
      hoverImage: '/images/market0',
      imageType: 'gif'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
      {pages.map((page) => (
        <button
          key={page.id}
          onClick={() => onSelectPage(page.id)}
          className="p-6 bg-zinc-900 border border-red-500/20 rounded-lg transition-all relative group"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg overflow-hidden">
            <Image
              src={`${page.hoverImage}.${page.imageType}`}
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold capitalize mb-2 text-red-500 text-shadow-red">
              {page.title}
            </h3>
            <p className="text-gray-400 group-hover:text-white transition-all duration-300 px-2 py-1 rounded group-hover:bg-black/50 group-hover:font-medium">
              {page.description}
            </p>
          </div>
        </button>
      ))}
    </div>
  )
}

