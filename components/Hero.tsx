"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import NewsletterForm from "./NewsletterForm";
import { useConfetti } from "@/hooks/useConfetti";
import { STORAGE_KEYS, COLORS } from "@/lib/constants";
import leftLeafIcon from "../public/assets/leftLeaf.svg";
import rightLeafIcon from "../public/assets/rightLeaf.svg";
import startIcon from "../public/assets/star.svg";

export default function Hero() {
  const [success, setSuccess] = useState(false);

  // Check localStorage on mount to restore success state
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasSubmitted = localStorage.getItem(STORAGE_KEYS.FORM_SUBMITTED);
      if (hasSubmitted === "true") {
        setSuccess(true);
      }
    }
  }, []);

  // Use confetti hook with proper cleanup
  useConfetti(success);

  return (
    <section className="container mx-auto px-4 relative pb-10 sm:pb-14 md:pb-16 lg:pb-20">
      <div className="max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 mb-6 sm:mb-7 md:mb-8 px-2.5 sm:px-3 md:px-4 py-2 bg-white rounded-full text-[11px] sm:text-xs md:text-sm lg:text-md text-black shadow-sm border whitespace-nowrap" style={{ borderColor: COLORS.NEUTRAL.GRAY_400 }}>
          <Image src={startIcon} alt="star icon" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 object-contain" />
          <span className="whitespace-nowrap">Programmatic SEO without code or developers</span>
        </div>
        <div className="space-y-1 sm:space-y-2 md:space-y-3 lg:space-y-3 mb-4">
          <h1 className="text-[28px] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.15] tracking-tight text-gray-900">
            Attract long-tail traffic
          </h1>
          <h1 className="text-[28px] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight bg-clip-text text-transparent inline-block pb-2" style={{ backgroundImage: `linear-gradient(to right, ${COLORS.PRIMARY.PURPLE_500}, ${COLORS.PRIMARY.PURPLE_700})` }}>
            with SEO pages at scale
          </h1>
        </div>
        <p className="text-sm sm:text-base md:text-base lg:text-lg mb-6 md:mb-8 lg:mb-10 max-w-2xl mx-auto leading-relaxed" style={{ color: COLORS.NEUTRAL.GRAY_700 }}>
          Create one template, add your data, and generate thousands of SEO pages automatically to
          capture inbound leads at scale.
        </p>
        <NewsletterForm onSuccess={() => setSuccess(true)} />
        <p className="text-xs md:text-sm flex justify-center gap-2 max-w-2xl mx-auto items-center" style={{ color: COLORS.NEUTRAL.GRAY_700 }}>
          <Image
            src={leftLeafIcon}
            alt="left leaf"
            className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 object-contain"
          />
          The world top companies are doing programmatic SEO. We&apos;ll get you started!
          <Image
            src={rightLeafIcon}
            alt="right leaf"
            className="w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 object-contain"
          />
        </p>
      </div>
    </section>
  );
}
