export function LoadingSection() {
  return (
    <div className="py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="animate-pulse">
          {/* Title skeleton */}
          <div className="h-12 bg-neutral-200 rounded-lg w-1/2 mx-auto mb-8" />
          
          {/* Content skeleton */}
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-neutral-100 rounded-xl p-8 h-64" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}