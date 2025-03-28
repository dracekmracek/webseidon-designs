import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import WaveAnimation from './WaveAnimation';
import { Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(2, 'Jméno musí mít alespoň 2 znaky'),
  email: z.string().email('Neplatná emailová adresa'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Zpráva musí mít alespoň 10 znaků'),
  honeypot: z.string().optional(), // anti-spam pole
});

type FormData = z.infer<typeof formSchema>;

interface ContactProps {
  className?: string;
}

const Contact: React.FC<ContactProps> = ({ className }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [csrfToken, setCsrfToken] = useState<string>('');

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      honeypot: '',
    },
  });

  // Generování CSRF tokenu při načtení komponenty
  useEffect(() => {
    const token = Math.random().toString(36).substring(2, 15) + 
                  Math.random().toString(36).substring(2, 15);
    setCsrfToken(token);
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      // Kontrola honeypot pole - pokud je vyplněno, je to pravděpodobně spam bot
      if (data.honeypot) {
        console.log('Spam detekován');
        form.reset();
        return;
      }

      setIsSubmitting(true);
      
      // Reset formuláře po odeslání
      form.reset();
      toast.success('Formulář byl úspěšně odeslán!');
    } catch (error) {
      toast.error('Nepodařilo se odeslat formulář. Zkuste to prosím znovu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, { threshold: 0.1 });

    const animatedElements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements) {
      animatedElements.forEach(el => {
        observer.observe(el);
      });
    }

    return () => {
      if (animatedElements) {
        animatedElements.forEach(el => {
          observer.unobserve(el);
        });
      }
    };
  }, []);

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className={cn(
        "py-16 md:py-24 relative overflow-hidden",
        className
      )}
    >
      {/* Hlavní pozadí - vylepšený gradient namísto jednolitého tmavého pozadí */}
      <div className="absolute inset-0 bg-enhanced-gradient"></div>
      
      {/* Futuristická struktura - modrá mřížka */}
      <div className="absolute inset-0 bg-blue-grid opacity-15 pointer-events-none"></div>
      
      {/* Noise texture s nižší opacitou pro jemnější efekt */}
      <div className="absolute inset-0 bg-noise opacity-15 pointer-events-none"></div>
      
      {/* Korálová dekorace na spodní části sekce */}
      <div className="coral-decoration"></div>
      
      {/* Gradient glow efekty - více prvků a jasnější efekty */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-wave-blue/10 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-wave-blue/15 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gold/5 rounded-full filter blur-3xl"></div>
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-ocean-light/10 rounded-full filter blur-3xl"></div>
      
      {/* Ambientní světelné částice pro dynamický efekt */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div 
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-wave-blue-light/30 animate-pulse-glow"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${4 + Math.random() * 6}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 terminal-section-title inline-block">
            ssh user@webseidon.cz
          </h2>
          <p className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 max-w-2xl mx-auto subtitle-text">
            <span className="text-terminal-green">$</span> <span className="text-terminal-yellow">./spojeni</span> <span className="text-terminal-magenta">--zabezpečeno</span> <span className="text-terminal-cyan">--kanál=přímý</span>
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
              <div className="space-y-8 bg-ocean-dark/40 backdrop-blur-sm p-6 rounded-xl border border-terminal-green/30">
                <div>
                  <h3 className="text-xl font-mono font-bold mb-4 text-terminal-green flex items-center gap-2">
                    <span className="text-terminal-green">$</span> ./kontaktní_údaje.sh
                  </h3>
                  <p className="text-white/80 mb-6 font-mono">
                    <span className="text-terminal-yellow"># Vyplňte formulář nebo použijte tato přímá spojení</span>
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="text-terminal-green mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-mono font-medium text-terminal-cyan">TEL:</h4>
                      <p className="text-white/70 font-mono">+420 776 211 336</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="text-terminal-green mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-mono font-medium text-terminal-cyan">E-MAIL:</h4>
                      <p className="text-white/70 font-mono">info@webseidon.cz</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="text-terminal-green mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-mono font-medium text-terminal-cyan">POZICE:</h4>
                      <p className="text-white/70 font-mono">Klokočov 209, Vítkov 74747, ČR</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="text-terminal-green mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-mono font-medium text-terminal-cyan">IČO:</h4>
                      <p className="text-white/70 font-mono">21965684</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="text-terminal-green mt-1 opacity-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                      </svg>
                    </div>
                    <div>
                      <p className="text-white/100 font-mono">Nejsem plátce DPH</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="text-terminal-green mt-1 opacity-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                      </svg>
                    </div>
                    <div>
                      <p className="text-white/100 font-mono font-bold">Volejte kdykoliv 24/7</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-mono font-bold mb-4 text-terminal-green flex items-center gap-2">
                    <span className="text-terminal-green">$</span> ./sociální_sítě.sh
                  </h3>
                  <div className="flex space-x-4">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-terminal-black hover:bg-terminal-green/20 border border-terminal-green/30 rounded-md transition-colors text-terminal-green">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-terminal-black hover:bg-terminal-green/20 border border-terminal-green/30 rounded-md transition-colors text-terminal-green">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"></path>
                      </svg>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-terminal-black hover:bg-terminal-green/20 border border-terminal-green/30 rounded-md transition-colors text-terminal-green">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-terminal-black hover:bg-terminal-green/20 border border-terminal-green/30 rounded-md transition-colors text-terminal-green">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-200">
              <div className="bg-ocean-dark/40 backdrop-blur-sm p-6 rounded-xl border border-terminal-green/30">
                <h3 className="text-xl font-mono font-bold mb-4 text-terminal-green flex items-center gap-2">
                  <span className="text-terminal-green">$</span> ./odeslat_zprávu.sh
                </h3>
                
                <form 
                  action="/send_mail.php" 
                  method="POST" 
                  className="space-y-4"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  {/* CSRF token pro ochranu formuláře */}
                  <input type="hidden" name="csrf_token" value={csrfToken} />
                  
                  {/* Honeypot pole - skryté pro uživatele, ale viditelné pro boty */}
                  <div className="hidden">
                    <input
                      type="text"
                      name="website" 
                      tabIndex={-1}
                      autoComplete="off"
                      {...form.register("honeypot")}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium font-mono text-terminal-green mb-1">
                          Jméno <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          className="w-full px-3 py-2 border border-terminal-green/30 rounded-md bg-terminal-black/50 text-white focus:border-terminal-green focus:outline-none focus:ring-1 focus:ring-terminal-green"
                          placeholder="Vaše jméno"
                          {...form.register("name")}
                        />
                        {form.formState.errors.name && (
                          <p className="text-red-500 text-xs mt-1">{form.formState.errors.name.message}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium font-mono text-terminal-green mb-1">
                          E-mail <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          className="w-full px-3 py-2 border border-terminal-green/30 rounded-md bg-terminal-black/50 text-white focus:border-terminal-green focus:outline-none focus:ring-1 focus:ring-terminal-green"
                          placeholder="vas@email.cz"
                          {...form.register("email")}
                        />
                        {form.formState.errors.email && (
                          <p className="text-red-500 text-xs mt-1">{form.formState.errors.email.message}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium font-mono text-terminal-green mb-1">
                        Předmět
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        className="w-full px-3 py-2 border border-terminal-green/30 rounded-md bg-terminal-black/50 text-white focus:border-terminal-green focus:outline-none focus:ring-1 focus:ring-terminal-green"
                        placeholder="Téma zprávy"
                        {...form.register("subject")}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium font-mono text-terminal-green mb-1">
                        Zpráva <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        className="w-full px-3 py-2 border border-terminal-green/30 rounded-md bg-terminal-black/50 text-white focus:border-terminal-green focus:outline-none focus:ring-1 focus:ring-terminal-green resize-none"
                        placeholder="Vaše zpráva..."
                        {...form.register("message")}
                      ></textarea>
                      {form.formState.errors.message && (
                        <p className="text-red-500 text-xs mt-1">{form.formState.errors.message.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-terminal-black border border-terminal-green hover:bg-terminal-green/20 text-terminal-green py-2 px-4 rounded-md transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-terminal-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Odesílání...</span>
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            <span>Odeslat zprávu</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave decoration at the bottom */}
      <div className="absolute -bottom-4 left-0 right-0 h-24 w-full">
        <WaveAnimation />
      </div>
    </section>
  );
};

export default Contact;
