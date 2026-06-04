const LoadingScreen = () => (
  <div className="fixed inset-0 z-[80] grid place-items-center bg-[#F8FAFC]">
    <div className="flex flex-col items-center gap-5">
      <div className="relative h-16 w-16 rounded-2xl border border-white/80 bg-white/85 shadow-[0_22px_60px_rgba(37,99,235,0.16)] backdrop-blur-xl">
        <div className="absolute inset-2 animate-spin rounded-xl border-2 border-[#06B6D4] border-t-transparent" />
        <div className="absolute inset-5 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#06B6D4]" />
      </div>
      <p className="text-sm font-semibold tracking-[0.24em] text-[#64748B]">
        ERP PATHWAY
      </p>
    </div>
  </div>
);

export default LoadingScreen;
