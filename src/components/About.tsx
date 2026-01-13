import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import salonReception from "@/assets/salon-reception.webp";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        contentRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div ref={imageRef} className="image-frame" style={{ opacity: 0 }}>
            <img
              src={salonReception}
              alt="Accueil du salon Lauramel"
              className="w-full h-[500px] object-cover"
            />
          </div>

          {/* Content */}
          <div ref={contentRef} style={{ opacity: 0 }}>
            <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4 font-medium">
              Notre Histoire
            </p>
            <h2 className="heading-lg text-foreground mb-6">
              L'Art de la Coiffure
              <span className="text-primary"> Personnalisée</span>
            </h2>
            <div className="divider !mx-0" />
            <p className="text-elegant mb-6">
              Bienvenue chez Lauramel Coiffure, votre salon de coiffure situé au sein 
              du Centre Commercial Leclerc à Enval. Notre équipe passionnée vous accueille 
              dans un espace moderne et chaleureux.
            </p>
            <p className="text-elegant mb-8">
              Nous mettons notre expertise à votre service pour sublimer votre beauté 
              naturelle. Que ce soit pour une coupe, une coloration ou un soin capillaire, 
              nous vous offrons une expérience personnalisée et relaxante.
            </p>
            <div className="flex flex-wrap gap-8">
              <div>
                <p className="text-4xl font-display text-primary font-medium">15+</p>
                <p className="text-muted-foreground text-sm uppercase tracking-wider">Années d'expérience</p>
              </div>
              <div>
                <p className="text-4xl font-display text-primary font-medium">1000+</p>
                <p className="text-muted-foreground text-sm uppercase tracking-wider">Clients satisfaits</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
