interface PageSelectionProps {
  onSelectPage: (page: string) => void
}

export default function PageSelection({ onSelectPage }: PageSelectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
      {['addons', 'communities', 'markets'].map((page) => (
        <button
          key={page}
          onClick={() => onSelectPage(page)}
          className="p-6 bg-zinc-900 border border-red-500/20 rounded-lg hover:bg-zinc-800 transition-colors"
        >
          <h3 className="text-2xl font-bold capitalize mb-2 text-red-500 text-shadow-red">
            {page}
          </h3>
          <p className="text-gray-400">
            {page === 'addons' ? 'เยี่ยมชมผลงานแอด-ออนต่างๆ' : 
             page === 'markets' ? '???' : 
             'ช่องทางชุมชนทั้งหมด'}
          </p>
        </button>
      ))}
    </div>
  )
}

