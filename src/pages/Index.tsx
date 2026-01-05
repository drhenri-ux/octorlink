import Header from "@/components/Header";
import Hero from "@/components/Hero";

import Plans from "@/components/Plans";
import ComboBuilder from "@/components/ComboBuilder";
import BusinessSolutions from "@/components/BusinessSolutions";
import TechnicalDetails from "@/components/TechnicalDetails";
import Benefits from "@/components/Benefits";
import Comparison from "@/components/Comparison";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Comparison />
        <Plans />
        <ComboBuilder />
        <BusinessSolutions />
        <TechnicalDetails />
        <Benefits />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
