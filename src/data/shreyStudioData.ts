import { StoryItem, PillarItem, StudioStat, HeirloomCraftItem, StudioTestimonialItem, ShootProcessStep } from '../types';

export const STUDIO_MANIFESTO = {
  eyebrow: 'PROFESSIONAL PHOTOGRAPHY & CINEMATOGRAPHY STUDIO',
  headline: 'We Photograph the Moments You Never Want to Forget',
  description:
    'Based in Chakan, Pune, we create photographs and cinematic films that preserve real emotions, people, brands and stories. Serving Chakan, Pune, PCMC, and destination locations across Maharashtra, India, and international locations including Vietnam, Singapore and Malaysia.',
  tagline: 'Preserving quiet romance, royal architecture, and unrepeatable generational joy.',
};

export const STUDIO_STATS: StudioStat[] = [
  {
    value: '14+',
    label: 'METROS COVERED',
    detail: 'From Mumbai & Delhi to Jaipur, Udaipur, and Bangalore',
  },
  {
    value: '120+',
    label: 'HEIRLOOMS BOUND',
    detail: 'Physically crafted albums delivered to families worldwide',
  },
  {
    value: '10+',
    label: 'YEARS OF LEGACY ARTISTRY',
    detail: 'Captured across 15+ Indian states and European heritage landmarks',
  },
  {
    value: '350+',
    label: 'STORIES PRESERVED',
    detail: 'Over 350 couples documented with 99.4% recommendation rate',
  },
];

export const FOUNDER_DATA = {
  eyebrow: 'THE ARCHITECT OF MOMENTS',
  name: 'Shreyash gore',
  title: 'FOUNDER & CHIEF PHOTOGRAPHER',
  quote:
    '“I was built on the core belief that a photograph isn’t just pixels or glossy prints. It is a portal to an exact, unrepeatable second of life—the nervous squeeze of a father’s hand, the heavy breeze of a Rajasthani sunset, and the silent, heavy laugh of two lovers.”',
  body:
    'At Shrey Studio, we completely bypass standard template poses. We focus on slow, purposeful curation. By merging Indian warmth with a high-end luxury editorial look inspired by vintage journals, we create bespoke visual heirlooms that look timeless forever.',
  signatureText: 'Shreyash Gore — Founder & Chief Photographer',
  experienceBadge: {
    number: '10+',
    title: 'YEARS OF LEGACY ARTISTRY',
    description: 'Captured across 15+ Indian states and European heritage landmarks.',
  },
  palaceImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop', // Royal couple in palace archway
  brideImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop', // Beautiful bride in bridal jewellery
};

export const CORE_PILLARS: PillarItem[] = [
  {
    id: 'candid',
    title: 'Candid Perfection',
    description: 'We capture authentic emotional exchanges, not forced robotic postures.',
    icon: 'camera',
  },
  {
    id: 'heritage',
    title: 'Heritage Curations',
    description: 'We design architectural frames, integrating India’s historical majesty, symmetry, and soft morning shadows.',
    icon: 'scroll',
  },
  {
    id: 'heirloom',
    title: 'An Heirloom Legacy',
    description: 'We build gold-foiled physically bound books designed to survive generations.',
    icon: 'shield',
  },
];

export const FEATURED_STORIES: StoryItem[] = [
  {
    id: 'story-1',
    number: 'STORY 01',
    title: 'Aditi & Ranveer',
    season: 'Winter 2025',
    location: 'UMAID BHAWAN PALACE, JODHPUR',
    quote: '“A Regal Heritage Union”',
    description:
      'For Aditi and Ranveer, Jodhpur was not just a destination; it was a home of legacy. We spent three days capturing intimate moments amidst sandstone corridors, royal peacock gardens, and candlelit courtyard celebrations.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=900&auto=format&fit=crop',
    ],
    category: 'Royal Palace Destination',
    deliverables: [
      '3-Day Royal Wedding Coverage',
      '4K Cinematic Heirloom Film',
      'Handcrafted Italian Linen Book',
      'Drone Aerial Architectural Framing',
    ],
  },
  {
    id: 'story-2',
    number: 'STORY 02',
    title: 'Meera & Siddharth',
    season: 'Summer 2025',
    location: 'LAKE COMO VILLA, ITALY',
    quote: '“The Italian Serenade”',
    description:
      'Set against the dramatic alpine backdrop of Lake Como, Meera and Siddharth’s union harmonized classic European romance with vibrant Indian traditions. An intimate ceremony surrounded by cypress trees and glistening water.',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=900&auto=format&fit=crop',
    ],
    category: 'International Destination',
    deliverables: [
      'Lake Como Villa Coverage',
      'Monochromatic Editorial Series',
      'Bespoke Gold-Foiled Master Album',
      'Pre-Wedding Boat Session',
    ],
  },
  {
    id: 'story-3',
    number: 'STORY 03',
    title: 'Devika & Gautam',
    season: 'Spring 2026',
    location: 'CITY PALACE, JAIPUR',
    quote: '“Echoes of the Mewar Palace”',
    description:
      'A pre-wedding collection centering architectural lines and soft morning shadows. Devika and Gautam wanted to tell a story of quiet elegance and historical grandeur before their wedding celebrations.',
    image: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop',
    ],
    category: 'Pre-Wedding Editorial',
    deliverables: [
      'Heritage City Palace Shoot',
      'Architectural Shadows & Sunlight Curation',
      'Archival Fine-Art Prints',
      'Vintage Journal Style Lookbook',
    ],
  },
  {
    id: 'story-4',
    number: 'STORY 04',
    title: 'Rhea & Kabir',
    season: 'Autumn 2025',
    location: 'TAJ FALAKNUMA PALACE, HYDERABAD',
    quote: '“Nizami Splendor & Modern Poetry”',
    description:
      'From the world-renowned 101-seat dining hall to the grand marble terrace under twilight skies, capturing royal heritage with intimate modern warmth and candid joy.',
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=900&auto=format&fit=crop',
    ],
    category: 'Heritage Grand Wedding',
    deliverables: [
      'Falaknuma Palace 3-Day Coverage',
      'Hand-Bound Leather Folio',
      'Full Master Documentary Film',
      'Private Online Archival Gallery',
    ],
  },
];

export const SHOOT_PROCESS_STEPS: ShootProcessStep[] = [
  {
    stepNumber: '01',
    phaseName: 'DISCOVERY',
    timeline: 'T-Minus 90 Days',
    title: 'The Vision Blueprint',
    subtitle: 'Private consultation & creative directive',
    philosophy: '“A wedding portrait is a sacred collaboration built on quiet trust.”',
    description: 'An unhurried consultation to map family rituals, venue geometry, and couture palettes into an exact shooting plan.',
    deliverables: [
      'Bespoke Moodboard & Creative Dossier',
      'Couture & Light Color Harmonization',
      'Curated VIP Family Shot List',
      'Ritual Lighting & Solar Timeline'
    ],
    specs: [
      { label: 'Timeframe', value: '90 Days Prior' },
      { label: 'Lead', value: 'Shreyash Gore' },
      { label: 'Format', value: 'Private Atelier' }
    ],
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop',
    iconName: 'compass'
  },
  {
    stepNumber: '02',
    phaseName: 'SPATIAL RECCE',
    timeline: 'T-Minus 14 Days',
    title: 'Palatial Recce & Solar Mapping',
    subtitle: 'On-site light cartography',
    philosophy: '“Architectural light calculated down to the exact minute of sunset.”',
    description: 'On-site technical walkthrough tracking solar angles across mandaps and locating private palace corridors for portraits.',
    deliverables: [
      'Golden-Hour Sun Timeline',
      'Discreet Angle & Sightline Mapping',
      'Production & Floral Sync',
      'Twilight Lighting Strategy'
    ],
    specs: [
      { label: 'Location', value: 'On-Site Venue' },
      { label: 'Scope', value: 'Solar Mapping' },
      { label: 'Duration', value: '48-Hour Recce' }
    ],
    image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=1200&auto=format&fit=crop',
    iconName: 'map'
  },
  {
    stepNumber: '03',
    phaseName: 'DOCUMENTATION',
    timeline: 'Wedding Days',
    title: 'Nuptial Documentation',
    subtitle: 'Candid rituals & regal portraiture',
    philosophy: '“Discreet, quiet observation preserving genuine emotion.”',
    description: 'Discreet, whisper-quiet coverage during sacred Vedic rituals, paired with calm guidance during intimate couple sessions.',
    deliverables: [
      'Medium Format & Leica Capture',
      'Natural & Ambient Light Only',
      '24-Hour Express Preview',
      'Full Multi-Day Coverage'
    ],
    specs: [
      { label: 'Team', value: 'Senior Master Squad' },
      { label: 'Hardware', value: 'Leica & Hasselblad' },
      { label: 'Coverage', value: 'Multi-Day Events' }
    ],
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop',
    iconName: 'camera'
  },
  {
    stepNumber: '04',
    phaseName: 'MUSEUM CURATION',
    timeline: '6–8 Weeks Post-Event',
    title: 'Museum Grading & Master Binding',
    subtitle: 'Archival tone curves & bespoke albums',
    philosophy: '“A tactile 100-year work of museum-grade art for your family.”',
    description: 'Custom color grading calibrated for Indian skin tones and embroidery, bound by hand into an archival flush-mount heirloom.',
    deliverables: [
      'Color-Calibrated Master Vault',
      'Handcrafted 16x12" Heirloom Album',
      'Pocket Keepsake Books for Parents',
      'Hand-Carved Archival Chest'
    ],
    specs: [
      { label: 'Paper Stock', value: '310 GSM Cotton Rag' },
      { label: 'Binding', value: '180° Layflat Flush-Mount' },
      { label: 'Longevity', value: '100+ Years Archival' }
    ],
    image: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=1200&auto=format&fit=crop',
    iconName: 'bookOpen'
  }
];

export const HEIRLOOM_CRAFT_ITEMS: HeirloomCraftItem[] = [
  {
    id: 'leather',
    craftNumber: '01',
    title: 'Handcrafted Tuscan Leather & Japanese Bookcloth',
    description: 'Each cover is sourced from centuries-old vegetable tanneries in Tuscany and archival mills in Kyoto. Hand-cut and fitted by master bookbinders.',
    material: 'Full-Grain Tuscan Calfskin & Organic Indigo Bookcloth',
    badge: 'Tuscan Tannery Certified',
    highlight: 'Naturally patinas over decades with personal family touch',
    iconName: 'book',
  },
  {
    id: 'paper',
    craftNumber: '02',
    title: '100-Year Archival Cotton Rag Paper',
    description: 'Heavyweight museum-grade cotton rag crafted without optical brighteners or acid. Engineered to resist UV fading, yellowing, or paper brittleness.',
    material: '310 GSM Fine-Art Archival Velvet Matte',
    badge: 'Museum Conservation Grade',
    highlight: 'True 100+ years generational preservation guarantee',
    iconName: 'layers',
  },
  {
    id: 'foil',
    craftNumber: '03',
    title: 'Bespoke 22k Gold Foil Debossing',
    description: 'Custom family monograms, couple calligraphy, and sacred wedding dates individually pressed with heated heavy brass dies and genuine leaf.',
    material: 'Deep Heated Brass Hot Foil Stamping',
    badge: 'Hand-Milled Brass Dies',
    highlight: 'Tactile, three-dimensional impression you can feel',
    iconName: 'sparkles',
  },
  {
    id: 'layflat',
    craftNumber: '04',
    title: 'Seamless 180° Panoramic Layflat Binding',
    description: 'Ultra-rigid composite core pages allowing seamless, gutter-free double-page spreads. Grand palace architecture uninterrupted by book seams.',
    material: 'Flush-Mount Ultra-Rigid Core Architecture',
    badge: 'Seamless Double-Page Spread',
    highlight: 'Zero gutter loss for panoramic royal palace frames',
    iconName: 'bookOpen',
  },
  {
    id: 'silk',
    craftNumber: '05',
    title: 'Hand-Stitched Silk Headbands & Marker Ribbons',
    description: 'Intricately woven Japanese silk thread binding the book spine edge-to-edge, fortified with archival mull and linen reinforcing gauze.',
    material: 'Pure Mulberry Silk Thread & Hand-Stitched Mull',
    badge: 'Master Artisan Stitched',
    highlight: 'Spine integrity tested for over 50,000 page turns',
    iconName: 'shield',
  },
  {
    id: 'grading',
    craftNumber: '06',
    title: 'Bespoke Editorial Master Color Grading',
    description: 'Hand-calibrated CMYK ICC profiles formulated specifically for Indian skin tones, regal velvets, deep Rajasthani reds, and Mediterranean blues.',
    material: 'Custom Film Emulation & Pigment Ink Chemistry',
    badge: 'Individually Proofed Prints',
    highlight: 'Color fidelity tailored for tangible paper, not screens',
    iconName: 'palette',
  },
];

export const CLIENT_TESTIMONIALS: StudioTestimonialItem[] = [
  {
    id: 't-1',
    couple: 'Aditi & Ranveer',
    venue: 'Umaid Bhawan Palace',
    location: 'Jodhpur',
    date: 'December 2024',
    weddingType: 'Royal Heritage',
    heirloomDelivered: 'Tuscan Leather Heirloom',
    quote:
      'Shreyash captured our wedding with quiet grace. Looking through our album brings back every emotion. Absolutely priceless artistry.',
    rating: 5,
  },
  {
    id: 't-2',
    couple: 'Snehal & Rohan',
    venue: 'Oxford Golf Resort',
    location: 'Pune',
    date: 'February 2025',
    weddingType: 'Pre-Wedding & Film',
    heirloomDelivered: 'Cinematic 4K Master',
    quote:
      'The cinematic film feels like a European romance movie. Completely natural and zero awkward posing throughout our sessions.',
    rating: 5,
  },
  {
    id: 't-3',
    couple: 'Priya & Tanmay',
    venue: 'Grand Heritage Mandap',
    location: 'Chakan, Pune',
    date: 'November 2024',
    weddingType: 'Traditional Wedding',
    heirloomDelivered: 'Archival Heritage Book',
    quote:
      'From haldi rituals to late-night vidai, their timing was flawless. Everyone in our family is raving about the photographs.',
    rating: 5,
  },
  {
    id: 't-4',
    couple: 'Meera & Siddharth',
    venue: 'Villa Balbianello',
    location: 'Lake Como, Italy',
    date: 'July 2024',
    weddingType: 'Destination Wedding',
    heirloomDelivered: 'Japanese Bookcloth Folio',
    quote:
      'Completely effortless and discreet. Their candid eye captured tender glances, and our portraits look like vintage Italian cinema.',
    rating: 5,
  },
  {
    id: 't-5',
    couple: 'Pooja & Nikhil',
    venue: 'Botanical Studio & Suite',
    location: 'PCMC, Pune',
    date: 'January 2025',
    weddingType: 'Maternity & Family',
    heirloomDelivered: 'Fine-Art Keepsake Folio',
    quote:
      'Gentle, warm, and breathtaking natural lighting for our maternity shoot. Shrey Studio made us feel so comfortable and cared for.',
    rating: 5,
  },
];

export const STUDIO_HUBS = [
  { city: 'Chakan, Pune', role: 'Flagship Studio & Production Suite' },
  { city: 'Pune & PCMC', role: 'Metropolitan & Banquet Liaison' },
  { city: 'Maharashtra & India', role: 'Royal Heritage & Destination Shoots' },
  { city: 'International', role: 'Vietnam, Singapore & Malaysia' },
];
