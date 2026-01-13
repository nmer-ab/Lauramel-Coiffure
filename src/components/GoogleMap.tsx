import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GoogleMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        mapRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: mapRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, mapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={mapRef}
      className="w-full h-[400px] lg:h-[500px] rounded-lg overflow-hidden border border-border shadow-lg"
      style={{ opacity: 0 }}
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2794.8453068640397!2d3.0844!3d45.8947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f71a8f7c8e8a8d%3A0x8e8e8e8e8e8e8e8e!2sCentre%20Commercial%20Leclerc%2C%20Espace%20Mozac%2C%20Av.%20Jean%20Jaur%C3%A8s%2C%2063530%20Enval!5e0!3m2!1sfr!2sfr!4v1699999999999!5m2!1sfr!2sfr"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Localisation Lauramel Coiffure - Centre Commercial Leclerc Enval"
        className="grayscale hover:grayscale-0 transition-all duration-500"
      />
    </div>
  );
};

export default GoogleMap;
