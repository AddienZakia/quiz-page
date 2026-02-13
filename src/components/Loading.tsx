export default function Loading() {
  return (
    <div className="from-primary-surface via-neutral-20 to-secondary-surface fixed inset-0 flex items-center justify-center bg-linear-to-br">
      <div className="text-center">
        <div className="relative mx-auto mb-4 h-16 w-16">
          <div className="border-primary-main absolute inset-0 animate-spin rounded-full border-4 border-t-transparent"></div>
        </div>
        <p className="text-neutral-70">Loading...</p>
      </div>
    </div>
  );
}
