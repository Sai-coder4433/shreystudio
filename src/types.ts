export interface PhotoItem {
  id: string;
  title: string;
  category: string;
  year: string;
  url: string;
  aspectRatio?: number;
}

export interface CarouselState {
  rotation: number;
  velocity: number;
  isDragging: boolean;
  hoveredId: string | null;
  activeId: string | null;
}

export interface WorkItem {
  id: string;
  title: string;
  client: string;
  category: 'Creator IPs' | 'Brand Campaigns' | 'Commercials' | 'Docu-Series';
  metrics: string;
  subMetric?: string;
  year: string;
  image: string;
  description: string;
  tags: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  handle: string;
  role: string;
  platform: string;
  followers: string;
  avatar: string;
  quote: string;
  highlightedCampaign: string;
}

export interface BestThingItem {
  id: string;
  number: string;
  title: string;
  tag: string;
  description: string;
  metrics: string;
}

export interface StoryItem {
  id: string;
  number: string;
  title: string;
  season: string;
  location: string;
  quote: string;
  description: string;
  image: string;
  gallery: string[];
  category: string;
  deliverables: string[];
}

export interface PillarItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface StudioStat {
  value: string;
  label: string;
  detail?: string;
}

export interface ShootProcessStep {
  stepNumber: string;
  phaseName: string;
  timeline: string;
  title: string;
  subtitle: string;
  philosophy: string;
  description: string;
  deliverables: string[];
  specs: { label: string; value: string }[];
  image: string;
  iconName: string;
}

export interface HeirloomCraftItem {
  id: string;
  craftNumber: string;
  title: string;
  description: string;
  material: string;
  badge: string;
  highlight: string;
  iconName: string;
}

export interface StudioTestimonialItem {
  id: string;
  couple: string;
  location: string;
  venue: string;
  date: string;
  quote: string;
  rating: number;
  weddingType: string;
  heirloomDelivered: string;
}

export interface VerticalItem {
  id: string;
  code: string;
  name: string;
  tagline: string;
  description: string;
  creators: string;
  reach: string;
  highlights: string[];
  image: string;
}
