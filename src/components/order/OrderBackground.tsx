
export default function OrderBackground() {
  return (
    <>
      {/* Ultra-modern background elements - responsive sizing */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-r from-blue-400/10 via-purple-400/8 to-pink-400/6 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-2/3 right-1/3 w-40 h-40 md:w-80 md:h-80 bg-gradient-to-r from-emerald-400/10 via-blue-400/8 to-purple-400/6 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-36 h-36 md:w-72 md:h-72 bg-gradient-to-r from-pink-400/8 via-orange-400/6 to-yellow-400/4 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Advanced grid pattern - hidden on mobile */}
        <div className="hidden md:block absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        
        {/* Floating particles - hidden on mobile */}
        <div className="hidden lg:block absolute top-1/3 left-1/5 w-3 h-3 bg-blue-400/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="hidden lg:block absolute top-2/3 right-1/4 w-2 h-2 bg-purple-400/40 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
        <div className="hidden lg:block absolute top-1/2 left-4/5 w-4 h-4 bg-emerald-400/25 rounded-full animate-bounce" style={{ animationDelay: '2.5s' }}></div>
      </div>
    </>
  );
}
