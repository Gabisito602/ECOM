import { Hero } from "@/components/sections/Hero";
import { Transform } from "@/components/sections/Transform";
import { Products } from "@/components/sections/Products";
import { Cups } from "@/components/sections/Cups";
import { Bottles } from "@/components/sections/Bottles";
import { Packaging } from "@/components/sections/Packaging";
import { Industrial } from "@/components/sections/Industrial";
import { UseCases } from "@/components/sections/UseCases";
import { Process } from "@/components/sections/Process";
import { Configurator } from "@/components/configurator/Configurator";
import { Trust } from "@/components/sections/Trust";
import { Quote } from "@/components/sections/Quote";
import { FinalCta } from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <Transform />
      <Products />
      <Cups />
      <Bottles />
      <Packaging />
      <Industrial />
      <UseCases />
      <Process />
      <Configurator />
      <Trust />
      <Quote />
      <FinalCta />
    </>
  );
}
