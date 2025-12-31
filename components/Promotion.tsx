import Image from "next/image";
import { COLORS } from "@/lib/constants";
import footerImage from "../public/assets/footer.svg";

export default function Promotion() {
  return (
    <section className="container mx-auto px-4 py-10 sm:py-14 md:py-20 lg:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="relative sm:rounded-[50px] rounded-[30px] overflow-hidden" style={{ background: `linear-gradient(to bottom right, ${COLORS.PRIMARY.PURPLE_500}, ${COLORS.PRIMARY.PURPLE_600}, ${COLORS.PRIMARY.PURPLE_700})` }}>
          <div className="grid grid-cols-1 xl:grid-cols-[1fr,auto] 2xl:grid-cols-[1fr,auto] items-center gap-0">
            <div className="p-6 sm:p-7 md:p-8 lg:p-10 z-10">
              <h2 className="text-base sm:text-lg md:text-xl lg:text-xl font-bold mb-4 sm:mb-5 md:mb-6 leading-tight text-white">
                Need backlinks while waiting? 🎁
              </h2>
              <p className="text-sm md:text-md text-white/90 mb-8 leading-relaxed">

                MediaBoost is another product we built for backlinks and media coverage.
              </p>
              <a
                href="http://mediaboost.cc/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 sm:px-4 md:px-5 lg:px-5 py-2 sm:py-2.5 md:py-2.5 bg-white rounded-xl font-bold text-xs sm:text-sm md:text-sm hover:bg-gray-50 hover:scale-[1.02] transition-all duration-200 shadow-lg"
                style={{ color: COLORS.PRIMARY.PURPLE_500 }}
              >
                <span>👉</span>
                Visit Mediaboost
                <span className="inline-flex items-center justify-center w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full text-white text-[10px] sm:text-xs md:text-sm" style={{ backgroundColor: COLORS.PRIMARY.PURPLE_500 }}>
                  M
                </span>
              </a>
            </div>
            <div className="hidden xl:flex 2xl:flex relative xl:absolute 2xl:absolute xl:right-0 2xl:right-0 xl:top-0 2xl:top-0 xl:bottom-0 2xl:bottom-0 xl:w-1/2 2xl:w-1/2 items-center justify-end overflow-hidden">
              <div className="animate-scroll-y w-full h-full flex items-center justify-end">
                <Image
                  src={footerImage}
                  alt="Media publications showcase"
                  className="h-full w-auto max-w-none scale-[4.5] origin-right"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
