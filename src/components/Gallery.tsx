import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import salonInterior from "@/assets/salon-interior.webp";
import salonWash from "@/assets/salon-wash.webp";
import salonReception from "@/assets/salon-reception.webp";
import img20200507 from "@/assets/2020-05-07.webp";
import img20200514 from "@/assets/2020-05-14.webp";
import img20200514b from "@/assets/2020-05-14 (1).webp";
import img20201111 from "@/assets/2020-11-11.webp";
import img2697 from "@/assets/IMG_2697.webp";
import img2706 from "@/assets/IMG_2706.webp";
import img2722 from "@/assets/IMG_2722.webp";
import capture1 from "@/assets/Capture d'écran 2026-01-13 160002.png";
import capture2 from "@/assets/Capture d'écran 2026-01-13 160404.png";

gsap.registerPlugin(ScrollTrigger);

const images = [
  { src: salonInterior, alt: "Espace coiffure" },
  { src: salonWash, alt: "Bacs à shampoing" },
  { src: salonReception, alt: "Accueil du salon" },
  { src: img20200507, alt: "Réalisation coiffure" },
  { src: img20200514, alt: "Style moderne" },
  { src: img20200514b, alt: "Coupe et coloration" },
  { src: img20201111, alt: "Mise en beauté" },
  { src: img2697, alt: "Transformation" },
  { src: img2706, alt: "Look élégant" },
  { src: img2722, alt: "Tendance coiffure" },
  { src: capture1, alt: "Détail salon" },
  { src: capture2, alt: "Ambiance salon" },
];

const Gallery = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

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

      const items = carouselRef.current?.querySelectorAll(".gallery-item");
      if (items) {
        gsap.fromTo(
          items,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: carouselRef.current,
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
    <section ref={sectionRef} className="section-padding bg-muted">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16" style={{ opacity: 0 }}>
          <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4 font-medium">
            Notre Espace
          </p>
          <h2 className="heading-lg text-foreground mb-6">
            Découvrez le <span className="text-primary">Salon</span>
          </h2>
          <div className="divider" />
        </div>

        {/* Gallery Carousel */}
        <div ref={carouselRef} className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div
                    className={`gallery-item group relative overflow-hidden rounded-lg`}
                    style={{ opacity: 0 }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Hover overlay with dark background */}
                    <div className="absolute inset-0 flex items-end">
                      {/* Background overlay - transparent by default, dark on hover */}
                      <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors duration-500" />
                      
                      {/* Text label - hidden by default, slides up on hover */}
                      <p className="relative p-6 font-display text-lg text-primary-foreground opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                        {image.alt}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
