"use client";

import Hero from "@/features/components/main/hero";
import GSAPLoading from "@/components/ui/gsap-loading";
import { useLoading } from "@/features/store/useLoading";

export default function Home() {
  const { isLoading, setLoading, setLoadingComplete, loadingComplete } = useLoading();

  const handleLoadingComplete = () => {
    setLoading(false);
    setLoadingComplete(true);
  };

  return (
    <div className="min-h-screen">
      {isLoading && <GSAPLoading onComplete={handleLoadingComplete} />}
      {loadingComplete && <Hero />}
    </div>
  );
}
