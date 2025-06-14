
const SectionSkeleton = ({ height = "400px" }: { height?: string }) => {
  return (
    <div 
      className="w-full bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 relative overflow-hidden" 
      style={{ height }}
    >
      {/* Enhanced shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer"></div>
      
      <div className="container mx-auto px-4 py-16 relative">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Enhanced skeleton elements */}
          <div className="space-y-4">
            <div className="h-10 bg-slate-200/80 rounded-xl w-1/2 mx-auto animate-pulse"></div>
            <div className="h-6 bg-slate-200/60 rounded-lg w-2/3 mx-auto animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className="bg-white/90 rounded-2xl p-8 space-y-6 shadow-sm backdrop-blur-sm animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="h-8 bg-slate-200/80 rounded-lg w-3/4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-slate-200/60 rounded w-full"></div>
                  <div className="h-4 bg-slate-200/60 rounded w-5/6"></div>
                  <div className="h-4 bg-slate-200/60 rounded w-2/3"></div>
                </div>
                <div className="h-12 bg-slate-200/40 rounded-xl w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionSkeleton;
