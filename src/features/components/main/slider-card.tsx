import { Mining } from "@/types/mining.types";
import Image from "next/image";
import React from "react";

export default function SliderCard({ mining }: { mining: Mining }) {
  return (
    <div className="flex flex-col justify-between ">
      <div className="max-h-40 flex items-center justify-center relative overflow-hidden">
        <Image src={mining.img} alt="icon" className="z-[1] rounded-xs object-cover min-w-[220px] min-h-[140px]" width={200} height={200} objectFit="cover"/>
      </div>
    </div>
  );
}
