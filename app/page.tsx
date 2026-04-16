"use client";
import { LangContext, useLangState } from "@/hooks/useLang";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import Comparison from "@/components/Comparison";
import Features from "@/components/Features";
import Founder from "@/components/Founder";
import Register from "@/components/Register";
import Footer from "@/components/Footer";

export default function Home() {
  const langState = useLangState();

  return (
    <LangContext.Provider value={langState}>
      <Nav />
      <Hero />
      <div className="g-divider" />
      <PainPoints />
      <div className="g-divider" />
      <Comparison />
      <div className="g-divider" />
      <Features />
      <Founder />
      <Register />
      <Footer />
    </LangContext.Provider>
  );
}
