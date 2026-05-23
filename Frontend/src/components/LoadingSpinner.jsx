export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-darker/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-card rounded-2xl p-8 flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-300">Loading...</p>
      </div>
    </div>
  );
}