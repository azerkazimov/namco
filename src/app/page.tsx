"use client";

import GSAPLoading from "@/components/ui/gsap-loading";
import Hero from "@/features/components/main/hero";
import AboutUs from "@/features/components/main/about-us";
import News from "@/features/components/main/news";
import OreTypes from "@/features/components/main/ore-types";
import BorniteOreTypes from "@/features/components/main/ore-types-bornite";
import ChalcopyriteOreTypes from "@/features/components/main/ore-types-chalcopyrite";
import MetalOreTypes from "@/features/components/main/ore-types-metal";
import PyriteOreTypes from "@/features/components/main/ore-types-pyrite";
import MarcaciteOreTypes from "@/features/components/main/ore-types-marcacite";
import { useLoading } from "@/features/store/useLoading";

export default function Home() {
  const { isLoading, setLoading, setLoadingComplete } = useLoading();

  const handleLoadingComplete = () => {
    setLoading(false);
    setLoadingComplete(true);
  };

  return (
    <div className="overflow-x-hidden">
      {isLoading && <GSAPLoading onComplete={handleLoadingComplete} />}
      <Hero />
      <AboutUs />
      <News />
      <OreTypes />
      <MetalOreTypes />
      <BorniteOreTypes />
      <ChalcopyriteOreTypes />
      <PyriteOreTypes />
      <MarcaciteOreTypes />
      <News />
    </div>
  );
}
