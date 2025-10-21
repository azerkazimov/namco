"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useLoading } from "../../store/useLoading";
import Slider from "./slider";

// Register GSAP plugins
gsap.registerPlugin(ScrambleTextPlugin);

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const secondTitleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const ore3DRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { loadingComplete } = useLoading();

  useEffect(() => {
    if (loadingComplete) {
      console.log("Hero: Loading complete, starting animations...");

      // Show all content immediately - no delays
      gsap.set(
        [
          containerRef.current,
          subtitleRef.current,
          buttonsRef.current,
          ore3DRef.current,
        ],
        {
          opacity: 1,
          y: 0,
          scale: 1,
        }
      );

      // Set fixed dimensions to prevent layout shift during scramble for both titles
      if (titleRef.current && secondTitleRef.current) {
        const titleElement = titleRef.current;
        const secondTitleElement = secondTitleRef.current;

        // Temporarily set the final text to measure natural dimensions for first title
        const originalText = titleElement.textContent;
        titleElement.textContent = "GROWING BEYOND";

        // Get natural dimensions for first title
        const rect = titleElement.getBoundingClientRect();
        const naturalWidth = rect.width;
        const naturalHeight = rect.height;

        // Set fixed dimensions to prevent layout shift for first title
        titleElement.style.width = `${naturalWidth}px`;
        titleElement.style.height = `${naturalHeight}px`;
        titleElement.style.display = "block";
        titleElement.style.overflow = "hidden";

        // Restore original text for scramble animation
        titleElement.textContent = originalText || "";

        // Do the same for second title
        const originalSecondText = secondTitleElement.textContent;
        secondTitleElement.textContent = "EXPECTATION";

        // Get natural dimensions for second title
        const secondRect = secondTitleElement.getBoundingClientRect();
        const secondNaturalWidth = secondRect.width;
        const secondNaturalHeight = secondRect.height;

        // Set fixed dimensions to prevent layout shift for second title
        secondTitleElement.style.width = `${secondNaturalWidth}px`;
        secondTitleElement.style.height = `${secondNaturalHeight}px`;
        secondTitleElement.style.display = "block";
        secondTitleElement.style.overflow = "hidden";

        // Restore original text for scramble animation
        secondTitleElement.textContent = originalSecondText || "";
      }

      // Start ScrambleTextPlugin immediately for title
      const scrambleAnimation = gsap.to(titleRef.current, {
        duration: 2,
        scrambleText: {
          text: "GROWING BEYOND",
          chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
          revealDelay: 0.05,
          speed: 0.8,
        },
        ease: "none",
        onComplete: () => {
          console.log("Title scramble animation completed");
          // Restore natural layout after animation
          if (titleRef.current) {
            titleRef.current.style.width = "auto";
            titleRef.current.style.height = "auto";
            titleRef.current.style.overflow = "visible";
          }
        },
      });

      // Start ScrambleTextPlugin immediately for title
      const secodndScrambleAnimation = gsap.to(secondTitleRef.current, {
        duration: 2,
        scrambleText: {
          text: "EXPECTATION",
          chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
          revealDelay: 0.05,
          speed: 0.8,
        },
        ease: "none",
        onComplete: () => {
          console.log("Second title scramble animation completed");
          // Restore natural layout after animation for both titles
          if (titleRef.current) {
            titleRef.current.style.width = "auto";
            titleRef.current.style.height = "auto";
            titleRef.current.style.overflow = "visible";
          }
          if (secondTitleRef.current) {
            secondTitleRef.current.style.width = "auto";
            secondTitleRef.current.style.height = "auto";
            secondTitleRef.current.style.overflow = "visible";
          }
        },
      });

      // Add floating animation to 3D model after a short delay
      const floatingAnimation = gsap.to(ore3DRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: 0.5,
      });

      return () => {
        scrambleAnimation.kill();
        secodndScrambleAnimation.kill();
        floatingAnimation.kill();
      };
    }
  }, [loadingComplete]);

  return (
    <div  className=" flex items-center justify-center pb-[30vh] md:pb-[10vh] lg:pb-[40vh]">
      <div ref={containerRef} className="relative w-full">
        <div className="flex flex-col">
          {/* Top section with sky background and centered titles */}
          <div
            className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] bg-cover  bg-no-repeat"
            style={{
              backgroundImage: "url(/atas.png)",
            }}
          >
            <div className="absolute  inset-0 flex flex-col items-center justify-center gap-6 text-center px-4">
              <h1
                ref={titleRef}
                className="hero-element text-4xl md:text-6xl lg:text-8xl font-extrabold text-white leading-tight uppercase font-orbitron tracking-wider z-10"
              >
                GROWING BEYOND
              </h1>
              <h1
                ref={secondTitleRef}
                className="hero-element inline-block text-4xl md:text-6xl lg:text-8xl font-extrabold text-white leading-tight uppercase font-orbitron tracking-wider px-6 py-2"
                style={{ backgroundColor: "#EE1C25" }}
              >
                EXPECTATION
              </h1>
            </div>
          </div>

          {/* Bottom section with excavator image */}
          <div
            className="absolute top-[50vh] w-full h-[60vh] md:h-[70vh] lg:h-[80vh] bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url(/mining.png)",
            }}
          />
          <div className="absolute bottom-[-340px] right-[-100px] max-w-[400px]">
            <Slider />
          </div>
        </div>
      </div>
    </div>
  );
}
