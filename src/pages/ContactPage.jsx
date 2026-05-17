import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

export default function ContactPage() {
  const containerRef = useRef(null);
  
  // Parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  // Form states (purely interactive/cosmetic per rules)
  const [focusedField, setFocusedField] = useState(null);
  const [formSent, setFormSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 5000);
  };

  return (
    <div ref={containerRef} className="bg-[#fbf9f6] text-[#24180f] overflow-hidden selection:bg-[#c79b58] selection:text-white font-sans min-h-screen">
      
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative h-[55vh] min-h-[480px] w-full flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1b120c]/65 via-[#1b120c]/40 to-[#fbf9f6] z-10" />
          <img
            src="https://images.unsplash.com/photo-1508061253366-f7da158b6d96?q=80&w=2070&auto=format&fit=crop"
            className="w-full h-full object-cover scale-105"
            alt="Premium Golden Cashews"
          />
        </motion.div>

        {/* Ambient Hero Glow */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[70vw] h-[30vh] bg-[#c79b58]/20 blur-[130px] rounded-full" />
        </div>

        {/* Hero Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-20 text-center px-6 max-w-4xl pt-16"
        >
          <motion.p
            variants={fadeUp}
            className="uppercase tracking-[0.55em] text-[#e5c48d] text-[10px] md:text-xs font-semibold mb-6"
          >
            The Luxury Concierge
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-serif text-5xl md:text-8xl leading-[0.95] tracking-[-0.03em] text-white"
          >
            Contact
            <span className="block text-[#e5c48d] italic font-serif font-light mt-2 md:mt-4">Our Concierge</span>
          </motion.h1>
        </motion.div>
      </section>

      {/* 2. THE CONCIERGE & FORM SECTION */}
      <section className="relative py-24 lg:py-36 px-6 lg:px-16 max-w-[1400px] mx-auto z-20">
        
        {/* Soft luxury glow backgrounds */}
        <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-[#c79b58]/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 -left-40 w-[500px] h-[500px] bg-[#c79b58]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 relative z-10">

          {/* LEFT COLUMN: Luxury Concierge Information */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="lg:col-span-5 space-y-16"
          >
            <div className="space-y-6">
              <motion.div variants={fadeUp} className="flex items-center gap-4">
                <span className="h-[1px] w-12 bg-[#c79b58]" />
                <p className="uppercase tracking-[0.45em] text-[#b08a55] text-[10px] font-bold">Inquiries</p>
              </motion.div>
              
              <motion.h2
                variants={fadeUp}
                className="font-serif text-3xl md:text-5xl leading-[1.1] tracking-[-0.02em] font-light"
              >
                Personalized
                <span className="block italic text-[#b08a55] font-serif font-light mt-2">Elite Service</span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="text-[#24180f]/70 text-base md:text-lg font-light leading-relaxed"
              >
                Whether you seek corporate gifting solutions, private collections, customized boxes, or status updates on your order, our dedicated concierge team is at your command.
              </motion.p>
            </div>

            {/* Support Details Grid */}
            <motion.div variants={staggerContainer} className="space-y-8">
              {[
                {
                  label: "Concierge Address",
                  content: "123 Luxury Avenue, Fort, Mumbai, MH — 400001",
                  icon: (
                    <svg className="w-5 h-5 text-[#c79b58]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )
                },
                {
                  label: "Phone Concierge",
                  content: "+91 98765 43210 / +91 22 4567 8900",
                  icon: (
                    <svg className="w-5 h-5 text-[#c79b58]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  )
                },
                {
                  label: "Digital Concierge",
                  content: "concierge@shreeganesh.com / sales@shreeganesh.com",
                  icon: (
                    <svg className="w-5 h-5 text-[#c79b58]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )
                },
                {
                  label: "Concierge Hours",
                  content: "Monday – Sunday, 10:00 AM – 8:00 PM IST",
                  icon: (
                    <svg className="w-5 h-5 text-[#c79b58]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )
                }
              ].map((item, idx) => (
                <motion.div key={idx} variants={fadeUp} className="flex gap-6 group">
                  <div className="w-12 h-12 rounded-full border border-[#c79b58]/35 flex items-center justify-center shrink-0 group-hover:bg-[#24180f] group-hover:border-[#24180f] transition-all duration-500">
                    <span className="group-hover:scale-110 transition-transform duration-500">{item.icon}</span>
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#b08a55] mb-2">{item.label}</h4>
                    <p className="text-[#24180f]/85 font-light text-base leading-relaxed">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Interactive Luxury Form */}
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-[2.5rem] lg:rounded-[3.5rem] p-8 lg:p-16 border border-[#c79b58]/15 shadow-[0_45px_100px_-20px_rgba(36,24,15,0.06)] relative overflow-hidden">
              {/* Form Gold Gradient Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#c79b58]/10 to-transparent pointer-events-none" />
              
              <h3 className="font-serif text-3xl text-[#24180f] mb-12 tracking-[-0.02em] font-light">
                Submit an Inquiry
              </h3>

              <form className="space-y-10 relative z-10" onSubmit={handleSubmit}>
                
                <div className="grid md:grid-cols-2 gap-10">
                  {/* Name field */}
                  <div className="relative">
                    <input 
                      type="text" 
                      id="name"
                      required
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-transparent border-b border-[#24180f]/15 py-3 text-base text-[#24180f] focus:outline-none focus:border-[#c79b58] transition-colors peer placeholder-transparent"
                      placeholder="Your Name"
                    />
                    <label 
                      htmlFor="name" 
                      className={`absolute left-0 top-3 text-[#24180f]/40 text-sm transition-all pointer-events-none
                        peer-focus:-top-5 peer-focus:text-[10px] peer-focus:text-[#c79b58] peer-focus:tracking-[0.15em] peer-focus:uppercase peer-focus:font-bold 
                        peer-[:not(:placeholder-shown)]:-top-5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-[#c79b58] peer-[:not(:placeholder-shown)]:tracking-[0.15em] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:font-bold`}
                    >
                      Your Name
                    </label>
                    <motion.div 
                      className="absolute bottom-0 left-0 h-[1.5px] bg-[#c79b58]"
                      initial={{ width: 0 }}
                      animate={{ width: focusedField === 'name' ? '100%' : '0%' }}
                      transition={{ duration: 0.6, ease }}
                    />
                  </div>

                  {/* Email field */}
                  <div className="relative">
                    <input 
                      type="email" 
                      id="email"
                      required
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-transparent border-b border-[#24180f]/15 py-3 text-base text-[#24180f] focus:outline-none focus:border-[#c79b58] transition-colors peer placeholder-transparent"
                      placeholder="Email Address"
                    />
                    <label 
                      htmlFor="email" 
                      className={`absolute left-0 top-3 text-[#24180f]/40 text-sm transition-all pointer-events-none
                        peer-focus:-top-5 peer-focus:text-[10px] peer-focus:text-[#c79b58] peer-focus:tracking-[0.15em] peer-focus:uppercase peer-focus:font-bold 
                        peer-[:not(:placeholder-shown)]:-top-5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-[#c79b58] peer-[:not(:placeholder-shown)]:tracking-[0.15em] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:font-bold`}
                    >
                      Email Address
                    </label>
                    <motion.div 
                      className="absolute bottom-0 left-0 h-[1.5px] bg-[#c79b58]"
                      initial={{ width: 0 }}
                      animate={{ width: focusedField === 'email' ? '100%' : '0%' }}
                      transition={{ duration: 0.6, ease }}
                    />
                  </div>
                </div>

                {/* Subject field */}
                <div className="relative">
                  <input 
                    type="text" 
                    id="subject"
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-transparent border-b border-[#24180f]/15 py-3 text-base text-[#24180f] focus:outline-none focus:border-[#c79b58] transition-colors peer placeholder-transparent"
                    placeholder="Subject (Optional)"
                  />
                  <label 
                    htmlFor="subject" 
                    className={`absolute left-0 top-3 text-[#24180f]/40 text-sm transition-all pointer-events-none
                      peer-focus:-top-5 peer-focus:text-[10px] peer-focus:text-[#c79b58] peer-focus:tracking-[0.15em] peer-focus:uppercase peer-focus:font-bold 
                      peer-[:not(:placeholder-shown)]:-top-5 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-[#c79b58] peer-[:not(:placeholder-shown)]:tracking-[0.15em] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:font-bold`}
                  >
                    Subject (Optional)
                  </label>
                  <motion.div 
                    className="absolute bottom-0 left-0 h-[1.5px] bg-[#c79b58]"
                    initial={{ width: 0 }}
                    animate={{ width: focusedField === 'subject' ? '100%' : '0%' }}
                    transition={{ duration: 0.6, ease }}
                  />
                </div>

                {/* Message field */}
                <div className="relative pt-4">
                  <textarea 
                    id="message"
                    rows="4"
                    required
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-transparent border-b border-[#24180f]/15 py-3 text-base text-[#24180f] focus:outline-none focus:border-[#c79b58] transition-colors peer placeholder-transparent resize-none"
                    placeholder="Your Message"
                  ></textarea>
                  <label 
                    htmlFor="message" 
                    className={`absolute left-0 top-8 text-[#24180f]/40 text-sm transition-all pointer-events-none
                      peer-focus:-top-3 peer-focus:text-[10px] peer-focus:text-[#c79b58] peer-focus:tracking-[0.15em] peer-focus:uppercase peer-focus:font-bold 
                      peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-[#c79b58] peer-[:not(:placeholder-shown)]:tracking-[0.15em] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:font-bold`}
                  >
                    Your Message
                  </label>
                  <motion.div 
                    className="absolute bottom-0 left-0 h-[1.5px] bg-[#c79b58]"
                    initial={{ width: 0 }}
                    animate={{ width: focusedField === 'message' ? '100%' : '0%' }}
                    transition={{ duration: 0.6, ease }}
                  />
                </div>

                {/* Submit Container */}
                <div className="pt-6 relative">
                  <motion.div
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                  >
                    <button 
                      type="submit" 
                      className="group relative w-full px-12 py-5 rounded-2xl overflow-hidden bg-[#24180f] text-white text-[11px] font-semibold uppercase tracking-[0.3em] shadow-[0_20px_45px_rgba(36,24,15,0.15)] hover:shadow-[0_20px_50px_rgba(199,155,88,0.2)] transition-all duration-500 flex justify-center items-center"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#c79b58] to-[#e5c48d] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />
                      <span className="relative z-10 flex items-center gap-3">
                        Submit Inquiry
                        <svg className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </button>
                  </motion.div>

                  {/* Elegant Toast Success Notification */}
                  {formSent && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute inset-x-0 -bottom-16 text-center text-xs font-semibold tracking-wider text-[#b08a55] uppercase"
                    >
                      Inquiry received. A concierge will respond shortly.
                    </motion.div>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. MAP / BESPOKE EMBED DESIGN SECTION */}
      <section className="relative py-20 px-6 lg:px-16 bg-[#fbf9f6] border-t border-[#c79b58]/15">
        <div className="max-w-[1400px] mx-auto text-center space-y-6">
          <p className="uppercase tracking-[0.4em] text-[#b08a55] text-[10px] font-bold">Exclusive Gifting Inquiries</p>
          <h2 className="font-serif text-3xl lg:text-4xl font-light tracking-tight text-[#24180f]">
            Bespoke Solutions & Corporate Celebrations
          </h2>
          <p className="max-w-2xl mx-auto text-[#24180f]/60 text-sm font-light leading-relaxed">
            Planning an elegant affair? Connect directly with our bespoke gifting department at <span className="text-[#b08a55] font-semibold">gifts@shreeganesh.com</span> to create custom curated, velvet-lined dry fruit treasure chests suited for weddings, corporate galas, and VIP clients.
          </p>
        </div>
      </section>

    </div>
  );
}
