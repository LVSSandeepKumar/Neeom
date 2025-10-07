export function CompanyStory() {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Our Story Text */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
            <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300">
              <p>
                Founded in 2009, NEEOM Designs began as a small architectural firm with a big vision: to create spaces
                that not only look beautiful but also enhance the way people live and work.
              </p>
              <p>
                Over the years, we've grown from a team of three passionate designers to a full-service design and
                construction company with over 50 professionals. Our journey has been marked by continuous learning,
                innovation, and an unwavering commitment to excellence.
              </p>
              <p>
                Today, we're proud to have completed over 500 projects across residential, commercial, and institutional
                sectors, each one reflecting our dedication to quality, sustainability, and client satisfaction.
              </p>
            </div>
          </div>

          {/* NEEOM Logo Section - Clean logo only */}
          <div className="flex items-center justify-center">
  <div className="w-[500px] h-[500px] overflow-hidden relative group">
    <img 
      src="/logo-neeom.png" 
      alt="NEEOM Designs Logo" 
      className="w-full h-full object-contain transform transition-transform duration-300 ease-in-out scale-150"
    />
  </div>
</div>

        </div>
      </div>
    </section>
  )
}
