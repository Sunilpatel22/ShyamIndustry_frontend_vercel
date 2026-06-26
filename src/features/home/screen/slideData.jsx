
import HydraulicSystem from '../../../assets/image/baba/hydraulic.png'; 
import SepticTankSystem from '../../../assets/image/baba/sewer.png'; 
import AirCompressorSystem from '../../../assets/image/baba/compressor.png'; 
import TractorLoaderSystem from '../../../assets/image/baba/tractorLoader.png'; 
import BladeAttachmentSystem from '../../../assets/image/baba/tractorBlade.png'; 


export const slideData = [
  {
    id: 'hydraulic-systems',
    /* TOP-TO-BOTTOM LINEAR GRADIENT: Bright red-crimson at the top, fading to a dark burgundy at the bottom */
    gradientStyle: {
      background: 'linear-gradient(to bottom, #751216 0%, #560a0d 40%, #2f0406 100%)'
    },
    accentColor: '#ea4335',
    accentBorder: 'border-[#ea4335]/40',
    accentText: 'text-[#ff6b6b]',
    category: 'Waste Management',
    title: 'Hydraulic Collection Systems',
    subtitle: 'Automated Municipal Solutions',
    description: 'State-of-the-art hydraulic waste collection trolleys manufactured with precision engineering. Features advanced hydraulic controls, reinforced steel construction, and optimized load distribution for maximum efficiency.',
    specs: [
      { label: 'Load Capacity', value: '2000 Kg' },
      { label: 'Hydraulic Pressure', value: '180 Bar' },
      { label: 'Material', value: 'Steel Grade' }
    ],
    tags: [
      { icon: '⚡', text: 'Hydraulic Power' },
      { icon: '✓', text: 'Reinforced' },
      { icon: '⚙', text: 'Tested Quality' }
    ],
    stats: [
      { label: '▲ Production', value: '150+', subtext: 'Units / Year' },
      { label: '👥 Clients', value: '1000+', subtext: 'Nationwide' }
    ],
    image: HydraulicSystem, 
    imageAlt: 'Hydraulic Waste Collection Trolley',
    status: 'In Production'
  },
  {
  id: 'septic-tank-systems',
  /* TOP-TO-BOTTOM LINEAR GRADIENT: Dark teal-grey at the top, fading to deep navy-black at the bottom */
  gradientStyle: {
    background: 'linear-gradient(to bottom, #11222b 0%, #0d1a21 40%, #05080c 100%)'
  },
  accentColor: '#f1c40f', // Gold accent color for borders and highlights
  accentBorder: 'border-[#f1c40f]/40',
  accentText: 'text-[#f39c12]',
  category: 'Sanitation Equipment',
  title: 'Mobile Septic Tank Systems',
  subtitle: 'Engineering Excellence in Waste Management',
  description: 'Precision-manufactured mobile septic suction units built to industrial standards. High-capacity vacuum systems with corrosion-resistant materials, engineered for municipal and commercial applications.',
  specs: [
    { label: 'Capacity', value: '5000L+' },
    { label: 'Vacuum Power', value: '850 mBar' },
    { label: 'Build Quality', value: 'ISO 9001' }
  ],
  tags: [
    { icon: '🛡️', text: 'Anti-Corrosion' },
    { icon: '✓', text: 'ISO Certified' },
    { icon: '⚙', text: 'Heavy Duty' }
  ],
  stats: [
    { label: '▲ Production', value: '300+', subtext: 'Units / Year' },
    { label: '👥 Clients', value: '1000+', subtext: 'Nationwide' }
  ],
  image: SepticTankSystem, 
  imageAlt: 'Mobile Septic Tank Suction System',
  status: 'In Production'
},
{
  id: 'air-compressor-systems',
  /* TOP-TO-BOTTOM LINEAR GRADIENT: Deep ocean navy-blue at the top, fading to a dark midnight black at the bottom */
  gradientStyle: {
    background: 'linear-gradient(to bottom, #162436 0%, #101a26 40%, #06090e 100%)'
  },
  accentColor: '#3cdba2', // Cyan/Teal accent color for highlights and framing borders
  accentBorder: 'border-[#3cdba2]/40',
  accentText: 'text-[#4be3c9]',
  category: 'Industrial Equipment', // You can change this to match your category system
  title: 'Air Compressor Systems',
  subtitle: 'Power & Reliability Combined',
  description: 'Industrial grade mobile compressor units engineered for continuous operation. Built with precision machined components, heavy duty diesel engines, and advanced pneumatic systems for demanding applications.',
  specs: [
    { label: 'Air Output', value: '12 CFM' },
    { label: 'Pressure', value: '150 PSI' },
    { label: 'Engine Power', value: '25 HP' }
  ],
  tags: [
    { icon: '⚡', text: 'High Output' },
    { icon: '⚙', text: 'Precision Built' },
    { icon: '🛡️', text: 'Durable' }
  ],
  stats: [
    { label: '▲ Production', value: '200+', subtext: 'Units / Year' },
    { label: '👥 Clients', value: '1000+', subtext: 'Nationwide' }
  ],
  image: AirCompressorSystem, 
  imageAlt: 'Industrial Mobile Air Compressor System',
  status: 'In Production'
},
{
  id: 'tractor-loader-systems',
  /* TOP-TO-BOTTOM LINEAR GRADIENT: Deep forest green at the top, fading to a dark pine-black at the bottom */
  gradientStyle: {
    background: 'linear-gradient(to bottom, #093921 0%, #062616 40%, #020805 100%)'
  },
  accentColor: '#3cdba2', // Mint/Cyan accent color for framing highlights and active tags
  accentBorder: 'border-[#3cdba2]/40',
  accentText: 'text-[#4be3c9]',
  category: 'Agricultural Machinery',
  title: 'Tractor Loader Systems',
  subtitle: 'Built for Peak Performance',
  description: 'Heavy-duty agricultural tractors with front-end loader attachments. Manufactured with high-grade steel, advanced hydraulic systems, and ergonomic design for maximum productivity in farming and construction operations.',
  specs: [
    { label: 'Engine Power', value: '75 HP' },
    { label: 'Lift Capacity', value: '1500 Kg' },
    { label: 'Hydraulic Flow', value: '45 LPM' }
  ],
  tags: [
    { icon: '⚙', text: 'Engineered' },
    { icon: '🛡️', text: 'Heavy Frame' },
    { icon: '✓', text: 'Field Tested' }
  ],
  stats: [
    { label: '▲ Production', value: '500+', subtext: 'Units / Year' },
    { label: '👥 Clients', value: '1000+', subtext: 'Nationwide' }
  ],
  image: TractorLoaderSystem, 
  imageAlt: 'Agricultural Tractor Loader Machinery',
  status: 'In Production'
},
{
  id: 'blade-attachment-systems',
  /* TOP-TO-BOTTOM LINEAR GRADIENT: Rich dark crimson at the top, fading to a deep wine-black at the bottom */
  gradientStyle: {
    background: 'linear-gradient(to bottom, #751414 0%, #560c0c 40%, #2a0303 100%)'
  },
  accentColor: '#e67e22', // Orange accent color for framing highlights and active tags
  accentBorder: 'border-[#e67e22]/40',
  accentText: 'text-[#ff9f43]',
  category: 'Municipal Equipment',
  title: 'Blade Attachment Systems',
  subtitle: 'Precision Engineering for Every Task',
  description: 'Multi-purpose tractor blade systems manufactured for municipal and agricultural applications. Features adjustable angle mechanisms, reinforced blade construction, and superior torque transmission for grading and snow removal.',
  specs: [
    { label: 'Blade Width', value: '2.5 Meter' },
    { label: 'Material', value: 'Hardened Steel' },
    { label: 'Angle Range', value: '30° - 90°' }
  ],
  tags: [
    { icon: '🏅', text: 'Premium Build' },
    { icon: '⚙', text: 'Adjustable' },
    { icon: '✓', text: 'Reinforced' }
  ],
  stats: [
    { label: '▲ Production', value: '25+', subtext: 'Units / Year' },
    { label: '👥 Clients', value: '1000+', subtext: 'Nationwide' }
  ],
  image: BladeAttachmentSystem, 
  imageAlt: 'Tractor Blade Attachment Equipment',
  status: 'In Production'
}
];
