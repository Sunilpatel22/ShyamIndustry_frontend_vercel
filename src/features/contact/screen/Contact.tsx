import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Sparkles, ShieldCheck, HelpCircle, ArrowUpRight } from 'lucide-react';

const Contact = () => {
    // Local reactive input state model container
    const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("📨 Message Form Data:", formData);
    alert("Message sent successfully!");
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

    return (
        <div className="w-full min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-[#52C5C3]/30 overflow-x-hidden">

            {/* ====================================================
          1. IMMERSIVE EDITORIAL HERO BANNER
         ==================================================== */}
            <div className="w-full bg-slate-950 relative py-20 md:py-28 px-6 text-center overflow-hidden">
                {/* Technical abstract grid background styling arrays */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:3rem_3rem]" />
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#52C5C3] rounded-full blur-3xl opacity-20 animate-pulse duration-[8000ms]" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-600 rounded-full blur-3xl opacity-10" />

                <div className="relative max-w-3xl mx-auto space-y-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#52C5C3] bg-[#52C5C3]/10 px-3.5 py-1.5 rounded-full border border-[#52C5C3]/20">
                        <Sparkles size={12} className="text-[#52C5C3]" />
                        <span>Global Manufacturing Support</span>
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                        Connect With Our Engineering Team
                    </h1>
                    <p className="text-sm md:text-base text-slate-400 font-normal max-w-2xl mx-auto leading-relaxed">
                        Have custom industrial specification requirements, wholesale fleet distribution inquiries, or technical support requests regarding Shyam Industries hardware tools? Let's talk.
                    </p>
                </div>
            </div>

            {/* Main Grid Content Workspace Layout Wrapper Canvas */}
            <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-16">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                    {/* ====================================================
              2. LEFT PANEL: PREMIUM CONTEXT DIRECTORY CARDS
             ==================================================== */}
                    <div className="lg:col-span-5 space-y-4 flex flex-col">

                        {/* Address Card */}
                        <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex items-start space-x-4 group">
                            <div className="w-10 h-10 bg-[#EEFAFA] text-[#52C5C3] rounded-xl flex items-center justify-center border border-cyan-100 shrink-0 shadow-inner">
                                <MapPin size={18} className="stroke-[2.5]" />
                            </div>
                            <div className="space-y-1.5">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Headquarters Location</h3>
                                <p className="text-sm text-slate-900 font-bold leading-relaxed whitespace-pre-line">
                                    Baba Pal, Opposite Nagar Palika Parishad{"\n"}
                                    Station Road, Orai, Jalaun{"\n"}
                                    Uttar Pradesh, India - 285001
                                </p>
                            </div>
                        </div>

                        {/* Standard Phone Lines Card */}
                        <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex items-start space-x-4 group">
                            <div className="w-10 h-10 bg-[#EEFAFA] text-[#52C5C3] rounded-xl flex items-center justify-center border border-cyan-100 shrink-0 shadow-inner">
                                <Phone size={18} className="stroke-[2.5]" />
                            </div>
                            <div className="space-y-1.5 w-full">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Direct Phone Lines</h3>
                                <div className="text-sm text-slate-900 font-bold space-y-1">
                                    <p className="hover:text-[#52C5C3] transition-colors"><a href="tel:+919415064551">+91 94150 64551</a></p>
                                    <p className="hover:text-[#52C5C3] transition-colors"><a href="tel:+919519508882">+91 95195 08882</a></p>
                                </div>
                            </div>
                        </div>

                        {/* Premium WhatsApp Quick Connect Card */}
                        <a
                            href="https://wa.me"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm hover:shadow-xl hover:border-emerald-200 hover:bg-emerald-50/5 transition-all duration-300 flex items-start space-x-4 group"
                        >
                            <div className="w-10 h-10 bg-[#25D366] text-white rounded-xl flex items-center justify-center shadow-md shadow-emerald-500/10 shrink-0 group-hover:scale-105 transition-all duration-200">
                                <MessageCircle size={20} className="fill-white text-[#25D366]" />
                            </div>
                            <div className="space-y-1 flex-1">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Instant Chat Support</h3>
                                    <div className="flex items-center space-x-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider">Online</span>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-900 font-bold tracking-wide">+91 94150 64551</p>
                                <span className="text-xs font-normal text-emerald-600/80 group-hover:underline inline-flex items-center gap-1 mt-1">
                                    Message Business Line <ArrowUpRight size={12} />
                                </span>
                            </div>
                        </a>

                        {/* Email Card */}
                        <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex items-start space-x-4 group">
                            <div className="w-10 h-10 bg-[#EEFAFA] text-[#52C5C3] rounded-xl flex items-center justify-center border border-cyan-100 shrink-0 shadow-inner">
                                <Mail size={18} className="stroke-[2.5]" />
                            </div>
                            <div className="space-y-1.5 truncate w-full">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Secure Email Routing</h3>
                                <a href="mailto:shyamindustriesorai@gmail.com" className="text-sm text-slate-900 font-bold hover:text-[#52C5C3] hover:underline block truncate">
                                    shyamindustriesorai@gmail.com
                                </a>
                            </div>
                        </div>

                        {/* Business Hours Card */}
                        <div className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex items-start space-x-4 group">
                            <div className="w-10 h-10 bg-[#EEFAFA] text-[#52C5C3] rounded-xl flex items-center justify-center border border-cyan-100 shrink-0 shadow-inner">
                                <Clock size={18} className="stroke-[2.5]" />
                            </div>
                            <div className="space-y-1.5">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Plant Availability</h3>
                                <div className="text-sm text-slate-900 font-bold space-y-0.5">
                                    <p>Mon - Sat: 9:00 AM - 6:00 PM</p>
                                    <p>Sunday: <span className="text-rose-500 font-bold">Closed</span></p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* ====================================================
              3. RIGHT PANEL: HIGH-READABILITY CORRESPONDENCE FORM CARD
             ==================================================== */}
                    <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-100/50 relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#52C5C3]" />
                        <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-1">Send us a Message</h2>
                        <p className="text-xs text-slate-400 font-normal mb-8">All fields marked with an asterisk (*) are required parameters for query classification.</p>

                          <form onSubmit={handleFormSubmit} className="w-full flex flex-col space-y-4" autoComplete="off">
        
        {/* Your Name Input Field */}
        <div className="w-full">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="Your Name *"
            className="w-full bg-[#F3F4F6] text-slate-700 placeholder:text-gray-400 text-sm px-4 py-3 rounded-lg border border-transparent focus:outline-none focus:border-[#52C5C3] focus:bg-white transition-all duration-150 font-light"
          />
        </div>

        {/* Your Email Input Field */}
        <div className="w-full">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="Your Email *"
            className="w-full bg-[#F3F4F6] text-slate-700 placeholder:text-gray-400 text-sm px-4 py-3 rounded-lg border border-transparent focus:outline-none focus:border-[#52C5C3] focus:bg-white transition-all duration-150 font-light"
          />
        </div>

        {/* Your Phone Number Input Field */}
        <div className="w-full">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Your Phone Number"
            className="w-full bg-[#F3F4F6] text-slate-700 placeholder:text-gray-400 text-sm px-4 py-3 rounded-lg border border-transparent focus:outline-none focus:border-[#52C5C3] focus:bg-white transition-all duration-150 font-light"
          />
        </div>

        {/* Subject Input Field */}
        <div className="w-full">
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
            placeholder="Subject *"
            className="w-full bg-[#F3F4F6] text-slate-700 placeholder:text-gray-400 text-sm px-4 py-3 rounded-lg border border-transparent focus:outline-none focus:border-[#52C5C3] focus:bg-white transition-all duration-150 font-light"
          />
        </div>

        {/* Your Message Textarea Field */}
        <div className="w-full">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows="4"
            placeholder="Your Message *"
            className="w-full bg-[#F3F4F6] text-slate-700 placeholder:text-gray-400 text-sm px-4 py-3 rounded-lg border border-transparent focus:outline-none focus:border-[#52C5C3] focus:bg-white transition-all duration-150 font-light resize-none leading-relaxed"
          />
        </div>

        {/* Primary Call to Action Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#52C5C3] hover:bg-[#45b4b2] text-slate-900 py-3 rounded-lg font-medium text-sm transition-colors shadow-sm mt-4 text-center block tracking-wide select-none"
        >
          Send Message
        </button>

      </form>
                    </div>
                    </div>

                    </div>

                    </div>

    )}
    export default Contact;