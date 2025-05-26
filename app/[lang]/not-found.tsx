import Particles from './components/particles'

const AnimatedSeparator = () => (
  <div className="animate-glow hidden h-px w-screen animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 md:block" />
)

export default function NotFound({ ...rest }) {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      {/* <Navigation /> */}

      <AnimatedSeparator />

      <h1 className="text-edge-outline z-10 animate-title cursor-default whitespace-nowrap bg-white bg-clip-text px-0.5 py-3.5 font-display text-4xl text-transparent duration-1000 sm:text-6xl md:text-9xl">
        404
      </h1>

      <AnimatedSeparator />

      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={1000}
      />
    </div>
  )
}
