"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

// Register GSAP plugins
gsap.registerPlugin(ScrambleTextPlugin);

interface GSAPLoadingProps {
  onComplete?: () => void;
}

export default function GSAPLoading({ onComplete }: GSAPLoadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Initial setup - hide elements
    gsap.set([titleRef.current, subtitleRef.current, progressBarRef.current, dotsRef.current], {
      opacity: 0,
      y: 30
    });

    // Main timeline without infinite animations
    const mainTl = gsap.timeline();

    // Animate container entrance
    mainTl.fromTo(containerRef.current, 
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" }
    )
    
    // Animate elements in sequence
    .to([titleRef.current, subtitleRef.current, progressBarRef.current, dotsRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.2,
      ease: "power2.out"
    }, 0.3)

    // Start scramble text animation for title
    .to(titleRef.current, {
      duration: 2,
      scrambleText: {
        text: "LOADING",
        chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        revealDelay: 0.1,
        speed: 0.8,
        newClass: "scramble-char"
      },
      ease: "none"
    }, 0.8)

    // Start scramble text animation for subtitle
    .to(subtitleRef.current, {
      duration: 1.5,
      scrambleText: {
        text: "GOLD DEPOSITS",
        chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        revealDelay: 0.05,
        speed: 1,
      },
      ease: "none"
    }, 1.2)

    // Animate progress bar
    .to(progressFillRef.current, {
      width: "100%",
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: function() {
        const progressValue = Math.round(this.progress() * 100);
        setProgress(progressValue);
      }
    }, 1.5)

    // Final pause before completion
    .to({}, { duration: 0.5 })

    // Fade out the entire loading screen
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        onComplete?.();
      }
    });

    // Separate infinite animation for loading dots
    const dotsAnimation = gsap.to(".loading-dot", {
      scale: 1.2,
      opacity: 0.5,
      duration: 0.3,
      stagger: 0.1,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      delay: 1.8
    });

    return () => {
      mainTl.kill();
      dotsAnimation.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black loading-backdrop flex items-center justify-center"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-gray-600 animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>
      </div>

      {/* Main loading content */}
      <div className="text-center space-y-8 relative z-10">
        {/* Main title */}
        <div 
          ref={titleRef}
          className="text-6xl md:text-8xl font-orbitron font-bold text-gray-400 uppercase tracking-wider"
        >
          ████████
        </div>

        {/* Subtitle */}
        <div 
          ref={subtitleRef}
          className="text-lg md:text-xl font-orbitron text-gray-500 uppercase tracking-widest"
        >
          ████████████████████
        </div>

        {/* Progress bar container */}
        <div ref={progressBarRef} className="w-80 mx-auto space-y-4">
          <div className="relative h-1 bg-gray-800 rounded-full overflow-hidden">
            <div 
              ref={progressFillRef}
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-gray-600 to-gray-400 rounded-full"
              style={{ width: "0%" }}
            />
          </div>
          
          {/* Progress percentage */}
          <div className="text-gray-500 font-orbitron text-sm uppercase tracking-wider">
            {progress}% COMPLETE
          </div>
        </div>

        {/* Loading dots */}
        <div ref={dotsRef} className="flex justify-center space-x-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div 
              key={i}
              className="loading-dot w-2 h-2 bg-gray-500 rounded-full"
            />
          ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 border border-gray-700 rotate-45 opacity-20" />
        <div className="absolute -bottom-20 -right-20 w-32 h-32 border border-gray-600 rotate-12 opacity-30" />
        
        {/* Scanning line effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent" 
            style={{ 
              animation: "scan 3s linear infinite",
              animationDelay: "2s"
            }} 
          />
        </div>
      </div>
    </div>
  );
}
