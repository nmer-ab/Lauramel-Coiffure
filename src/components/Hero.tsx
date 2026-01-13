import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import salonInterior from "@/assets/salon-interior.webp";
import salonWash from "@/assets/salon-wash.webp";
import salonReception from "@/assets/salon-reception.webp";
import img2697 from "@/assets/IMG_2697.webp";
import img2706 from "@/assets/IMG_2706.webp";
import img2722 from "@/assets/IMG_2722.webp";
import capture1 from "@/assets/Capture d'écran 2026-01-13 160002.png";
import capture2 from "@/assets/Capture d'écran 2026-01-13 160404.png";

const heroImages = [
  salonInterior,
  salonWash,
  salonReception,
  img2697,
  img2706,
  img2722,
  capture1,
  capture2,
];

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      )
        .fromTo(
          subtitleRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ctaRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image Slideshow */}
      <div className="absolute inset-0 w-full h-full">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Salon Lauramel Coiffure ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-charcoal/50" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <p className="text-terracotta-light uppercase tracking-[0.3em] text-sm mb-6 font-medium">
          Salon de Coiffure
        </p>
        <h1
          ref={titleRef}
          className="heading-xl text-primary-foreground mb-8"
          style={{ opacity: 0 }}
        >
          Lauramel
          <span className="block text-terracotta-light italic font-normal">
            Coiffure
          </span>
        </h1>
        <p
          ref={subtitleRef}
          className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed"
          style={{ opacity: 0 }}
        >
          Un espace dédié à votre beauté au cœur du Centre Commercial Leclerc Enval
        </p>
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center" style={{ opacity: 0 }}>
          <a href="tel:0473385987" className="btn-primary">
            Prendre Rendez-vous
          </a>
          <a href="#services" className="btn-outline border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-charcoal">
            Nos Services
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-primary-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
