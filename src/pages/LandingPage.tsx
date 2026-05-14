
import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import WhyChooseUs from '../components/landing/WhyChooseUs';
import AcademicCalendar from '../components/landing/AcademicCalendar';
import PrincipalMessage from '../components/landing/PrincipalMessage';
import Footer from '../components/landing/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <WhyChooseUs />
        <AcademicCalendar />
        <PrincipalMessage />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
