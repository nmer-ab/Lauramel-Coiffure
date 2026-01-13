import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, Clock, User, Phone as PhoneIcon, Mail, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

gsap.registerPlugin(ScrollTrigger);

const services = [
  "Coupe Homme",
  "Coupe Femme",
  "Coloration",
  "Mise en plis",
  "Soin cheveux",
  "Brushing",
  "Coiffure mariée",
  "Autre"
];

const timeSlots = [
  "9:00", "9:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30"
];

const Booking = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    time: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the data to a backend
    console.log("Booking submitted:", formData);
    
    toast({
      title: "Demande envoyée !",
      description: "Nous vous contacterons bientôt pour confirmer votre rendez-vous.",
    });

    // Reset form
    setFormData({
      name: "",
      phone: "",
      email: "",
      service: "",
      date: "",
      time: "",
      message: ""
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="booking"
      ref={sectionRef}
      className="section-padding bg-muted"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4 font-medium">
            Réservation
          </p>
          <h2 className="heading-lg text-foreground mb-6">
            Prenez <span className="text-primary">Rendez-vous</span>
          </h2>
          <div className="divider" />
          <p className="text-elegant max-w-2xl mx-auto mt-8">
            Remplissez le formulaire ci-dessous pour réserver votre créneau. 
            Nous vous confirmerons votre rendez-vous par téléphone ou email.
          </p>
        </div>

        {/* Booking Form */}
        <div ref={formRef} className="bg-card rounded-2xl shadow-xl p-8 md:p-12 border border-border" style={{ opacity: 0 }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Nom complet *
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Votre nom"
                value={formData.name}
                onChange={handleChange}
                className="bg-background"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <PhoneIcon className="w-4 h-4 text-primary" />
                Téléphone *
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="06 XX XX XX XX"
                value={formData.phone}
                onChange={handleChange}
                className="bg-background"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={handleChange}
                className="bg-background"
              />
            </div>

            {/* Service */}
            <div className="space-y-2">
              <Label htmlFor="service" className="flex items-center gap-2">
                <Scissors className="w-4 h-4 text-primary" />
                Service souhaité *
              </Label>
              <select
                id="service"
                name="service"
                required
                value={formData.service}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Sélectionnez un service</option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            {/* Date and Time */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  Date souhaitée *
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="bg-background"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time" className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  Heure souhaitée *
                </Label>
                <select
                  id="time"
                  name="time"
                  required
                  value={formData.time}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Sélectionnez une heure</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">Message (optionnel)</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Précisez vos besoins ou demandes particulières..."
                value={formData.message}
                onChange={handleChange}
                className="bg-background min-h-[100px]"
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full btn-primary !py-6 text-lg">
              Envoyer ma demande
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              * Champs obligatoires
            </p>
          </form>
        </div>

        {/* Alternative Contact */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">
            Préférez-vous nous appeler directement ?
          </p>
          <a
            href="tel:0473385987"
            className="btn-primary inline-flex items-center gap-3"
          >
            <PhoneIcon className="w-5 h-5" />
            04 73 38 59 87
          </a>
        </div>
      </div>
    </section>
  );
};

export default Booking;
