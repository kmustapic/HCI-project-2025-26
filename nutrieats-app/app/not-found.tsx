import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-start text-center bg-white dark:bg-gray-900 overflow-hidden pt-20 md:pt-10">

      {/* Typography Section - Extra Large as requested */}
      <h1 className="text-[35vw] leading-none font-bold text-[#1a4d3e]/60 tracking-tighter opacity-90 select-none mb-[-5vw] md:mb-[-6vw]">
        404
      </h1>
      <h2 className="text-3xl md:text-6xl font-bold text-gray-700 dark:text-gray-200 mb-2 relative z-10 mt-[-20px] md:mt-[-40px]">
        Page Not Found
      </h2>
      <p className="text-gray-400 text-lg md:text-2xl font-light max-w-md mx-auto relative z-10">
        Sorry, the page you're looking for doesn't exist.
      </p>

      {/* Illustration - Visually cropped via height and overlap */}
      <div className="relative w-full max-w-4xl h-[50vh] mt-[-5vh] grayscale-[0.1] hover:grayscale-0 transition-all duration-700 animate-in fade-in zoom-in duration-1000 pointer-events-none">
        <Image
          src="/sad-avocado.png"
          alt="Sad avocado illustration"
          fill
          className="object-cover object-top md:object-contain"
          priority
        />
      </div>

      <Link
        href="/"
        style={{ color: '#ffffff' }}
        className="px-10 py-4 bg-[#1a4d3e] !text-white hover:opacity-90 rounded-full transition-all hover:scale-105 font-bold text-lg shadow-xl hover:shadow-[#1a4d3e]/50 z-20 mt-[-40px] md:mt-[-60px]"
      >
        Go Back Home
      </Link>
    </div>
  );
}
