import ChapterLabel from './components/ChapterLabel';
import ScrollIndicator from './components/ScrollIndicator';
import HeroSection from './components/HeroSection';
import TechMatrix from './components/TechMatrix';
import ReportEngine from './components/ReportEngine';
import AuditTrailFeature from './components/AuditTrailFeature';
import CertificationsGallery from './components/CertificationsGallery';
import Footer from './components/Footer';

function App() {
  return (
    <div className="antialiased">
      {/* Fixed UI Elements */}
      <ChapterLabel />
      <ScrollIndicator />

      {/* Storyboard Slides */}
      <HeroSection />
      <TechMatrix />
      <ReportEngine />
      <AuditTrailFeature />
      <CertificationsGallery />
      <Footer />
    </div>
  );
}

export default App;
