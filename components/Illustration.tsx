import HeroContainerSVG from "./HeroContainerSVG";

export default function Illustration() {
  return (
    <section className="container mx-auto px-4">
      <div className="max-w-6xl mx-auto">
        <div className="relative min-h-[200px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[401px] 2xl:min-h-[700px] p-4 sm:p-8 md:p-12 lg:p-16 xl:p-24 w-full flex items-center justify-center">
          <div className="absolute inset-0 w-full h-full">
            <HeroContainerSVG />
          </div>
        </div>
      </div>
    </section>
  );
}
