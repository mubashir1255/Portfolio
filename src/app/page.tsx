import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";
import Background from "@/components/Background";
import MouseGlow from "@/components/MouseGlow";
export default function Home() {
  return (
    <>
      <Background />
      <MouseGlow />

      <Navbar />
      <main id="main-content">
        <Hero />
        <TechStack />
        <About />
        <Projects />
        <Experience />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}