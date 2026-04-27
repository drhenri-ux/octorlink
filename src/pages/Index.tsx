import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import Plans from "@/components/Plans";
import Octorlink5G from "@/components/Octorlink5G";
import Octorlink5GPlans from "@/components/Octorlink5GPlans";
import ComboBuilder from "@/components/ComboBuilder";
import BusinessSolutions from "@/components/BusinessSolutions";
import TechnicalDetails from "@/components/TechnicalDetails";
import RegionalCoverage from "@/components/RegionalCoverage";
import Comparison from "@/components/Comparison";
import Testimonials from "@/components/Testimonials";
import SupportCTA from "@/components/SupportCTA";
import Contact from "@/components/Contact";
import RastreadorVeicularPromo from "@/components/RastreadorVeicularPromo";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <WhyChooseUs />
        <Plans />
        <Comparison />
        <Octorlink5G />
        <Octorlink5GPlans />
        <ComboBuilder />
        <BusinessSolutions />
        <TechnicalDetails />
        <RegionalCoverage />
        <Testimonials />
        <SupportCTA />
        <Contact />
        <RastreadorVeicularPromo />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
