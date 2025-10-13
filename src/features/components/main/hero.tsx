"use client";

import { Button } from "@/components/ui/button";
import Ore3D from "../../../components/ui/3d-ore";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useLoading } from "../../store/useLoading";

// Register GSAP plugins
gsap.registerPlugin(ScrambleTextPlugin);

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const ore3DRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { loadingComplete } = useLoading();

  useEffect(() => {
    if (loadingComplete) {
      console.log("Hero: Loading complete, starting animations...");
      
      // Show all content immediately - no delays
      gsap.set([containerRef.current, subtitleRef.current, buttonsRef.current, ore3DRef.current], {
        opacity: 1,
        y: 0,
        scale: 1
      });

      // Set fixed dimensions to prevent layout shift during scramble
      if (titleRef.current) {
        const titleElement = titleRef.current;
        
        // Temporarily set the final text to measure natural dimensions
        const originalText = titleElement.textContent;
        titleElement.textContent = "DISCOVER THE POWER OF GOLD";
        
        // Get natural dimensions
        const rect = titleElement.getBoundingClientRect();
        const naturalWidth = rect.width;
        const naturalHeight = rect.height;
        
        // Set fixed dimensions to prevent layout shift
        titleElement.style.width = `${naturalWidth}px`;
        titleElement.style.height = `${naturalHeight}px`;
        titleElement.style.display = 'block';
        titleElement.style.overflow = 'hidden';
        
        // Restore original text for scramble animation
        titleElement.textContent = originalText || "";
      }

      // Start ScrambleTextPlugin immediately for title
      const scrambleAnimation = gsap.to(titleRef.current, {
        duration: 2,
        scrambleText: {
          text: "DISCOVER THE POWER OF GOLD",
          chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
          revealDelay: 0.05,
          speed: 0.8,
        },
        ease: "none",
        onComplete: () => {
          console.log("Title scramble animation completed");
          // Restore natural layout after animation
          if (titleRef.current) {
            titleRef.current.style.width = 'auto';
            titleRef.current.style.height = 'auto';
            titleRef.current.style.overflow = 'visible';
          }
        }
      });

      // Add floating animation to 3D model after a short delay
      const floatingAnimation = gsap.to(ore3DRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: 0.5
      });

      return () => {
        scrambleAnimation.kill();
        floatingAnimation.kill();
      };
    }
  }, [loadingComplete]);

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <div className="space-y-6">
            <h1 
              ref={titleRef}
              className="hero-element text-5xl lg:text-7xl font-bold text-white leading-tight uppercase font-orbitron tracking-wider"
            >
              DISCOVER THE POWER OF GOLD
            </h1>
            <p 
              ref={subtitleRef}
              className="hero-element text-xl text-slate-300 leading-relaxed"
            >
              Explore the fascinating world of copper ore mining and processing.
              Experience cutting-edge technology in mineral extraction.
            </p>
            <div ref={buttonsRef} className="hero-element flex gap-4">
              <Button variant="default" className="cursor-pointer font-orbitron">Get Started</Button>
              <Button variant="outline" className="cursor-pointer">Learn More</Button>
            </div>
          </div>

          {/* 3D Ore Model Section */}
          <div ref={ore3DRef} className="hero-element flex justify-center">
            <Ore3D />
          </div>
        </div>
      </div>
    </div>
  );
}
