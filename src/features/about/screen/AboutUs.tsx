import React, { useEffect, useRef } from 'react';
import { History, Wrench, ShieldCheck, Target, Sparkles, Building2, MapPin } from 'lucide-react';
import { Wrapper } from '@googlemaps/react-wrapper';

// Clean, unified Map Instance component using secure programmatic clicks
const MapInstance = ({ center, zoom }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      // Safe layout init
      const map = new window.google.maps.Map(ref.current, {
        center,
        zoom,
        disableDefaultUI: true,   // Keeps UI modern and minimal
        zoomControl: false,       
        gestureHandling: "cooperative", 
      });

      // Interactive location pin drop
      new window.google.maps.Marker({
        position: center,
        map,
        title: "Shyam Industries",
        animation: window.google.maps.Animation.DROP,
      });

      // Dynamic path generator for external redirection
      const redirectToGoogleMaps = () => {
        const googleMapsUrl = `https://google.com{center.lat},${center.lng}`;
        window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
      };

      // Native API triggers that pass browser pop-up filters
      window.google.maps.event.addListener(map, 'click', redirectToGoogleMaps);
    }
  }, [center, zoom]);

  return (
    <div className="w-full h-full min-h-[350px] relative group cursor-pointer overflow-hidden">
      {/* Visual Canvas */}
      <div ref={ref} className="w-full h-full min-h-[350px]" />
      
      {/* Visual Hover State UI Element */}
      <div className="absolute inset-0 bg-slate-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
        <div className="bg-white/95 text-slate-900 font-semibold px-4 py-2 rounded-xl shadow-lg border border-slate-200 flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 text-sm">
          <MapPin size={16} className="text-[#52C5C3]" />
          <span>Open in Google Maps</span>
        </div>
      </div>
    </div>
  );
};

const About = () => {
  // Update coordinates here if needed
  const locationCoordinates = { lat: 25.4484, lng: 78.5685 }; 

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-[#52C5C3]/30 overflow-x-hidden">
      
      {/* ====================================================
          1. IMMERSIVE HERO BANNER SECTION
         ==================================================== */}
      <div className="w-full bg-slate-950 relative py-20 md:py-28 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#52C5C3] rounded-full blur-3xl opacity-20" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-600 rounded-full blur-3xl opacity-10" />

        <div className="relative max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#52C5C3] bg-[#52C5C3]/10 px-3.5 py-1.5 rounded-full border border-[#52C5C3]/20">
            <Sparkles size={12} className="text-[#52C5C3]" />
            <span>Our Multi-Generational History</span>
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Shaping Agricultural Innovation Since the 1980s
          </h1>
          <p className="text-sm md:text-base text-slate-400 font-normal max-w-2xl mx-auto leading-relaxed">
            From a humble local engineering workshop to an industry-leading machinery manufacturer, explore the history of Shyam Industries.
          </p>
        </div>
      </div>

      {/* Main Content Area Layout Canvas Wrapper */}
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 space-y-12">

        {/* ====================================================
            2. HIGH-READABILITY TEXT BODY CONTENT CARD
           ==================================================== */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-100/40 p-8 sm:p-12 md:p-14 space-y-12">
          
          {/* SECTION 1: HOW WE STARTED */}
          <div className="space-y-5">
            <div className="flex items-center space-x-3 text-[#52C5C3]">
              <div className="p-2 bg-[#EEFAFA] rounded-xl">
                <History size={22} className="stroke-[2.5]" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider">
                How we started
              </h2>
            </div>
            
            <div className="text-sm sm:text-base leading-relaxed text-slate-700 font-normal space-y-6 text-justify">
              <p>
                Back in the late 80's Our founder Late Shri Shyam Lal started it as a small Agricultural instrument 
                manufacturing and Repairing shop with a mission to help farmers having agricultural instruments in a 
                cost-effective budget and with high efficiency. Fondly known as Baba Ji, he was called by many of the 
                farmers in this area an <strong className="text-slate-900 font-semibold bg-[#EEFAFA] px-1 rounded">illiterate Engineer (Unpadh Engineer)</strong> as 
                even though he was illiterate he was able to build any machine that he sees and gets his hands on.
              </p>
              <p>
                His Son Late Mr. Jay Prakash Pal carried forward his legacy and started manufacturing other machinery. 
                Talented as his father, he built several machineries with a vision to make the <strong className="text-slate-900 font-semibold underline decoration-[#52C5C3] decoration-2 underline-offset-4">Bundelkhand area in Uttar Pradesh as number one in manufacturing sector</strong>.
              </p>
              
              {/* Dynamic Callout Highlight Frame Block */}
              <div className="bg-slate-50 border-l-4 border-[#52C5C3] rounded-r-xl p-4 md:p-5 my-4 flex items-start space-x-3">
                <Building2 size={20} className="text-[#52C5C3] shrink-0 mt-0.5" />
                <p className="font-semibold text-slate-900 text-sm sm:text-base m-0">
                  Now this vision is being carried forward by his son Mr. Sunanjay Kumar Pal.
                </p>
              </div>
            </div>
          </div>

          {/* Minimalist Separator Line */}
          <div className="w-full h-px bg-slate-200/80" />

          {/* SECTION 2: WHAT WE DO TODAY */}
          <div className="space-y-5">
            <div className="flex items-center space-x-3 text-[#52C5C3]">
              <div className="p-2 bg-[#EEFAFA] rounded-xl">
                <Wrench size={22} className="stroke-[2.5]" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider">
                What we do today
              </h2>
            </div>
            
            <p className="text-sm sm:text-base leading-relaxed text-slate-700 font-normal text-justify">
              Currently Shyam Industries focuses on manufacturing various agricultural products along with a number of 
              Machineries and tools. Our organization specializes in <span className="font-semibold text-slate-900">Manufacturing, Exporting and Trading</span> a 
              qualitative array of Agricultural Cultivator, Hydraulic Disc Harrow, Storage Tanker, and various types of Tractor Trolleys.
            </p>
          </div>

          {/* Minimalist Separator Line */}
          <div className="w-full h-px bg-slate-200/80" />

          {/* SECTION 3: OUR MISSION */}
          <div className="space-y-5">
            <div className="flex items-center space-x-3 text-[#52C5C3]">
              <div className="p-2 bg-[#EEFAFA] rounded-xl">
                <Target size={22} className="stroke-[2.2]" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider">
                Our Mission
              </h2>
            </div>
            
            <p className="text-sm sm:text-base leading-relaxed text-slate-700 font-normal text-justify">
              To provide high-quality, durable agricultural equipment that helps farmers improve their productivity 
              while maintaining affordability. We are committed to innovation and excellence in every product we manufacture.
            </p>
          </div>

          {/* Minimalist Separator Line */}
          <div className="w-full h-px bg-slate-200/80" />

          {/* ====================================================
              4. INTERACTIVE GOOGLE MAPS LOCATION SECTION
             ==================================================== */}
          <div className="space-y-5">
            <div className="flex items-center space-x-3 text-[#52C5C3]">
              <div className="p-2 bg-[#EEFAFA] rounded-xl">
                <MapPin size={22} className="stroke-[2.5]" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wider">
                Our Workshop Location
              </h2>
            </div>
            
            {/* Structural Wrapper Box for Map Asset */}
            <div className="w-full rounded-xl overflow-hidden border border-slate-200 shadow-md bg-slate-100 relative min-h-[350px]">
              <Wrapper apiKey={"YOUR_GOOGLE_MAPS_API_KEY"}>
                <MapInstance center={locationCoordinates} zoom={13} />
              </Wrapper>
            </div>
            <p className="text-xs text-slate-500 italic flex items-center gap-1">
              <span>📍 Click anywhere on the map above to get turn-by-turn driving directions.</span>
            </p>
          </div>

        </div>

        {/* ====================================================
            5. CERTIFICATION & TRUST BADGING FOOTER ACCORD
           ==================================================== */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-slate-400 text-xs font-semibold tracking-wider uppercase pt-4">
          <div className="flex items-center space-x-2">
            <ShieldCheck size={16} className="text-[#52C5C3]" />
            <span>Premium Agriculture Grade Infrastructure</span>
          </div>
          <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-300" />
          <span>Made In India</span>
        </div>

      </div>
    </div>
  );
};

export default About;
