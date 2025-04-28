import Particles from "./components/particles";

const AnimatedSeparator = () => <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

export default function NotFound({...rest}) {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      {/* <Navigation /> */}

      <AnimatedSeparator />

      <h1 className="py-3.5 px-0.5 z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
        404
      </h1>

      <AnimatedSeparator />

      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={1000}
      />
    </div>
  );
}