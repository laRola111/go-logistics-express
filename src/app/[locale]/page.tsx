import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Promotion from '@/components/sections/Promotion';
import Stats from '@/components/sections/Stats';
import Services from '@/components/sections/Services';
import Pricing from '@/components/sections/Pricing';
import Coverage from '@/components/sections/Coverage';
import HowItWorks from '@/components/sections/HowItWorks';
import Gallery from '@/components/sections/Gallery';
import WhyUs from '@/components/sections/WhyUs';
import Testimonials from '@/components/sections/Testimonials';
import ContactForm from '@/components/sections/ContactForm';
import FinalCTA from '@/components/sections/FinalCTA';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Promotion />
      <Stats />
      <Services />
      <Pricing />
      <Coverage />
      <HowItWorks />
      <Gallery />
      <WhyUs />
      <Testimonials />
      <ContactForm />
      <FinalCTA />
      <Footer />
    </main>
  );
}
