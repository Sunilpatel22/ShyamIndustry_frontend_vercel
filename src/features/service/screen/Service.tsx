import React from 'react'
import { Wrench, Truck, Shield, PhoneCall } from 'lucide-react'

const Service = () => {
  const services = [
    {
      icon: <Wrench size={20} className="text-white stroke-[2.2]" />,
      title: "Custom Manufacturing",
      description: "We offer custom manufacturing services for agricultural equipment tailored to your specific needs and requirements."
    },
    {
      icon: <Truck size={20} className="text-white stroke-[2.2]" />,
      title: "Delivery & Installation",
      description: "Fast and reliable delivery across India with professional installation services to ensure optimal performance."
    },
    {
      icon: <Shield size={20} className="text-white stroke-[2.2]" />,
      title: "Warranty & Support",
      description: "Comprehensive warranty coverage and dedicated after-sales support for all our products."
    },
    {
      icon: <PhoneCall size={20} className="text-white stroke-[2.2]" />,
      title: "Expert Consultation",
      description: "Free consultation from our agricultural equipment experts to help you choose the right products."
    }
  ]

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-[#52C5C3]/30 py-16 md:py-24 px-6 md:px-12 lg:px-24 overflow-x-hidden">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* ====================================================
            1. SERVICES HEADER CONTAINER
           ==================================================== */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-14">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Our Services
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
            We provide comprehensive services to ensure you get the best agricultural equipment and 
            support for your farming needs.
          </p>
        </div>

        {/* ====================================================
            2. FOUR-COLUMN SERVICES CARD GRID
           ==================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100/80 flex flex-col items-center text-center group hover:shadow-md transition-all duration-200"
            >
              {/* Circular Icon Canvas Wrapper */}
              <div className="w-12 h-12 bg-[#52C5C3] text-white rounded-full flex items-center justify-center mb-5 shadow-inner group-hover:scale-105 transition-transform duration-200">
                {item.icon}
              </div>

              {/* Title Header */}
              <h3 className="text-sm font-semibold text-slate-800 tracking-wide mb-2.5">
                {item.title}
              </h3>

              {/* Description Body Paragraph */}
              <p className="text-[11px] sm:text-xs text-slate-400 font-light leading-relaxed max-w-[240px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* ====================================================
            3. DYNAMIC QUALITY ASSURANCE PANEL BLOCK
           ==================================================== */}
        <div className="w-full bg-white rounded-2xl border border-slate-100 p-8 sm:p-12 md:p-14 text-center space-y-8 shadow-sm">
          
          {/* Quality Subheading Text Content */}
          <div className="space-y-3 max-w-3xl mx-auto">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider">
              Quality Assurance
            </h2>
            <p className="text-[11px] sm:text-xs leading-relaxed text-slate-400 font-light max-w-2xl mx-auto">
              All our products undergo rigorous quality checks and testing to ensure they meet the highest standards of 
              durability and performance. We use premium grade materials and modern manufacturing techniques to 
              deliver equipment that stands the test of time.
            </p>
          </div>

          {/* Core Statistical Metric Numbers Row Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4 max-w-3xl mx-auto pt-4">
            
            {/* Metric Box Item 1 */}
            <div className="space-y-1 flex flex-col items-center">
              <span className="text-2xl font-semibold text-slate-800 tracking-tight">
                35+
              </span>
              <p className="text-[10px] font-light text-slate-400 tracking-wide uppercase">
                Years of Experience
              </p>
            </div>

            {/* Metric Box Item 2 */}
            <div className="space-y-1 flex flex-col items-center">
              <span className="text-2xl font-semibold text-slate-800 tracking-tight">
                5000+
              </span>
              <p className="text-[10px] font-light text-slate-400 tracking-wide uppercase">
                Satisfied Customers
              </p>
            </div>

            {/* Metric Box Item 3 */}
            <div className="space-y-1 flex flex-col items-center">
              <span className="text-2xl font-semibold text-slate-800 tracking-tight">
                100%
              </span>
              <p className="text-[10px] font-light text-slate-400 tracking-wide uppercase">
                Quality Guaranteed
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Service
