
const SectionSkeleton = ({ height = "400px" }: { height?: string }) => {
  return (
    <div className="w-full bg-gradient-to-r from-slate-200 via-slate-50 to-slate-200 animate-pulse" style={{ height }}>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="h-8 bg-slate-300 rounded-lg w-1/3 mx-auto"></div>
          <div className="h-4 bg-slate-300 rounded w-2/3 mx-auto"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 space-y-4">
                <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionSkeleton;
