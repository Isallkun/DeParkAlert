export function AmbientBackground() {
  return (
    <>
      {/* Ambient Lighting Effects (Blur Orbs) */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed top-[20%] left-[40%] w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none z-0" />
    </>
  )
}
