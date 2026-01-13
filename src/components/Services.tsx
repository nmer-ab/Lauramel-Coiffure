import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scissors, Sparkles, Droplets, Crown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Scissors,
    title: "Coupe & Coiffage",
    description:
      "Coupes personnalisées pour femmes, hommes et enfants. Techniques modernes et classiques pour sublimer votre style.",
  },
  {
    icon: Sparkles,
    title: "Coloration",
    description:
      "Colorations, mèches, balayages et techniques créatives pour des résultats lumineux et durables.",
  },
  {
    icon: Droplets,
    title: "Soins Capillaires",
    description:
      "Soins professionnels Kérastase et traitements en profondeur pour des cheveux sains et brillants.",
  },
  {
    icon: Crown,
    title: "Coiffure Événementielle",
    description:
      "Chignons, coiffures de mariée et styles sophistiqués pour vos événements spéciaux.",
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const cards = cardsRef.current?.querySelectorAll(".service-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-padding bg-charcoal text-secondary-foreground"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16" style={{ opacity: 0 }}>
          <p className="text-terracotta uppercase tracking-[0.2em] text-sm mb-4 font-medium">
            Ce Que Nous Offrons
          </p>
          <h2 className="heading-lg mb-6">
            Nos <span className="text-terracotta">Services</span>
          </h2>
          <div className="divider !bg-terracotta" />
        </div>

        {/* Service Cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group p-8 bg-secondary/50 border border-warm-gray/20 hover:border-terracotta/50 transition-all duration-500 hover:-translate-y-2"
              style={{ opacity: 0 }}
            >
              <div className="w-16 h-16 rounded-full bg-terracotta/10 flex items-center justify-center mb-6 group-hover:bg-terracotta/20 transition-colors duration-300">
                <service.icon className="w-8 h-8 text-terracotta" />
              </div>
              <h3 className="font-display text-xl mb-4 text-secondary-foreground">
                {service.title}
              </h3>
              <p className="text-warm-gray text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
