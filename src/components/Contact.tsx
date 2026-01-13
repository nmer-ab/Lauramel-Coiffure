import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Phone, Globe, Clock } from "lucide-react";
import GoogleMap from "./GoogleMap";

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: MapPin,
    title: "Adresse",
    lines: ["CC LECLERC, Espace Mozac", "Avenue Jean Jaurès", "63530 Enval"],
  },
  {
    icon: Phone,
    title: "Téléphone",
    lines: ["04 73 38 59 87"],
    link: "tel:0473385987",
  },
  {
    icon: Globe,
    title: "Site Web",
    lines: ["www.lauramel.fr"],
    link: "https://www.lauramel.fr",
  },
  {
    icon: Clock,
    title: "Horaires",
    lines: [
      "Lun - Ven : 9h - 19h",
      "Samedi : 9h - 19h", 
      "Dimanche : Fermé"
    ],
  },
];

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
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

      const cards = cardsRef.current?.querySelectorAll(".contact-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
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
      id="contact"
      ref={sectionRef}
      className="section-padding bg-background"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={contentRef} className="text-center mb-16" style={{ opacity: 0 }}>
          <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4 font-medium">
            Nous Trouver
          </p>
          <h2 className="heading-lg text-foreground mb-6">
            Prenez <span className="text-primary">Rendez-vous</span>
          </h2>
          <div className="divider" />
          <p className="text-elegant max-w-2xl mx-auto mt-8">
            Nous vous accueillons au Centre Commercial Leclerc à Enval. 
            N'hésitez pas à nous contacter pour prendre rendez-vous ou pour toute question.
          </p>
        </div>

        {/* Contact Cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="contact-card bg-card p-8 text-center border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              style={{ opacity: 0 }}
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <info.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg mb-3 text-foreground">
                {info.title}
              </h3>
              {info.link ? (
                <a
                  href={info.link}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  target={info.link.startsWith("http") ? "_blank" : undefined}
                  rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {info.lines.map((line, i) => (
                    <p key={i} className="text-sm leading-relaxed">
                      {line}
                    </p>
                  ))}
                </a>
              ) : (
                info.lines.map((line, i) => (
                  <p key={i} className="text-sm text-muted-foreground leading-relaxed">
                    {line}
                  </p>
                ))
              )}
            </div>
          ))}
        </div>

        {/* Google Map */}
        <div className="mb-16">
          <GoogleMap />
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="tel:0473385987"
            className="btn-primary inline-flex items-center gap-3"
          >
            <Phone className="w-5 h-5" />
            Appelez-nous
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
