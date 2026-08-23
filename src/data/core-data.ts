export type ResourceCategory =
  | 'Field skills'
  | 'Reference'
  | 'Health'
  | 'Navigation'
  | 'Weather'
  | 'Civic';

export type Resource = {
  id: string;
  title: string;
  shortTitle: string;
  category: ResourceCategory;
  description: string;
  detail: string;
  size: string;
  format: string;
  source: string;
  sourceLabel: string;
  maintained: string;
  tags: string[];
  color: string;
  featured?: boolean;
};

export type CorePack = {
  id: string;
  name: string;
  description: string;
  resourceIds: string[];
  size: string;
  tone: string;
};

export const categories: ResourceCategory[] = [
  'Field skills',
  'Reference',
  'Health',
  'Navigation',
  'Weather',
  'Civic',
];

export const resources: Resource[] = [
  {
    id: 'red-cross-first-aid',
    title: 'First Aid / Emergency Reference',
    shortTitle: 'First Aid',
    category: 'Health',
    description: 'Practical guidance for common injuries, urgent decisions, and emergency response.',
    detail: 'A compact, plain-language field reference for assessing injuries, managing immediate threats, and deciding when to escalate. Keep it close to your medical kit and review it before you need it.',
    size: '8.4 MB',
    format: 'PDF / HTML',
    source: 'https://www.redcross.org/take-a-class/first-aid',
    sourceLabel: 'American Red Cross',
    maintained: 'Reviewed 2024',
    tags: ['triage', 'injury', 'urgent'],
    color: '#F97316',
    featured: true,
  },
  {
    id: 'nps-wilderness-survival',
    title: 'Wilderness Survival Basics',
    shortTitle: 'Wilderness Basics',
    category: 'Field skills',
    description: 'Foundational principles for shelter, water, fire, signaling, and staying oriented.',
    detail: 'An approachable field primer grounded in park-service guidance. Built for preparation and sound decisions, not bravado: observe, conserve energy, and make your position known.',
    size: '5.1 MB',
    format: 'PDF',
    source: 'https://www.nps.gov/subjects/healthandsafety/wilderness-safety.htm',
    sourceLabel: 'National Park Service',
    maintained: 'Reviewed 2023',
    tags: ['shelter', 'water', 'signal'],
    color: '#22C55E',
    featured: true,
  },
  {
    id: 'ready-emergency-plan',
    title: 'Make a Plan: Emergency Communications',
    shortTitle: 'Emergency Plan',
    category: 'Civic',
    description: 'A printable framework for contacts, meeting points, alerts, and household continuity.',
    detail: 'Turn a vague intention into a plan the whole household can use. Includes contact trees, meeting locations, accessible copies of key information, and a checklist for reviewing it twice a year.',
    size: '2.8 MB',
    format: 'PDF / DOC',
    source: 'https://www.ready.gov/plan',
    sourceLabel: 'Ready.gov',
    maintained: 'Reviewed 2024',
    tags: ['contacts', 'household', 'planning'],
    color: '#0084FF',
    featured: true,
  },
  {
    id: 'usgs-topographic-maps',
    title: 'USGS Topographic Map Guide',
    shortTitle: 'Topo Map Guide',
    category: 'Navigation',
    description: 'Read terrain, contour lines, scale, declination, and coordinates without a signal.',
    detail: 'A visual guide to the language of the land. Use it to translate contours into slopes, find water and routes, and pair a printed map with a simple compass.',
    size: '12.6 MB',
    format: 'PDF',
    source: 'https://www.usgs.gov/programs/national-geospatial-program/topographic-maps',
    sourceLabel: 'USGS',
    maintained: 'Reviewed 2024',
    tags: ['maps', 'contours', 'compass'],
    color: '#2E8D9E',
  },
  {
    id: 'weather-spotter-handbook',
    title: 'Sky & Weather Field Notes',
    shortTitle: 'Weather Notes',
    category: 'Weather',
    description: 'Recognize cloud patterns, pressure changes, fronts, and severe weather signals.',
    detail: 'A calm, visual primer for reading conditions when forecasts are out of reach. Learn what the sky is telling you and which signs deserve an early change of plan.',
    size: '6.7 MB',
    format: 'PDF',
    source: 'https://www.weather.gov/jetstream/',
    sourceLabel: 'National Weather Service',
    maintained: 'Reviewed 2023',
    tags: ['clouds', 'storms', 'forecast'],
    color: '#8BA6B8',
  },
  {
    id: 'cdc-water-treatment',
    title: 'Household Water Treatment',
    shortTitle: 'Water Treatment',
    category: 'Health',
    description: 'Clear methods for making uncertain water safer for drinking and cooking.',
    detail: 'A precise reference for boiling, disinfection, filtration, storage, and the limits of each method. Pair with a clean container and a written water rotation plan.',
    size: '3.3 MB',
    format: 'HTML / PDF',
    source: 'https://www.cdc.gov/healthy-water/about/index.html',
    sourceLabel: 'Centers for Disease Control',
    maintained: 'Reviewed 2024',
    tags: ['water', 'hygiene', 'storage'],
    color: '#22C55E',
  },
  {
    id: 'wiki-mechanical-advantage',
    title: 'Mechanical Advantage Reference',
    shortTitle: 'Mechanical Advantage',
    category: 'Reference',
    description: 'Levers, pulleys, gears, and the small mathematics behind useful force.',
    detail: 'A compact reference for understanding how simple machines multiply force or change direction. Useful context for repairs, hauling, and making do with the tools already at hand.',
    size: '1.9 MB',
    format: 'HTML',
    source: 'https://en.wikipedia.org/wiki/Mechanical_advantage',
    sourceLabel: 'Wikipedia',
    maintained: 'Community maintained',
    tags: ['repair', 'tools', 'principles'],
    color: '#C49352',
  },
  {
    id: 'fema-home-safety',
    title: 'Home Preparedness Checklist',
    shortTitle: 'Home Checklist',
    category: 'Civic',
    description: 'A practical inventory for light, food, information, and household readiness.',
    detail: 'A low-drama checklist for the things that keep a home working: copies, light, water, medications, power, and a way to communicate. Start small, then make it yours.',
    size: '1.2 MB',
    format: 'PDF',
    source: 'https://www.ready.gov/kit',
    sourceLabel: 'Ready.gov',
    maintained: 'Reviewed 2024',
    tags: ['home', 'inventory', 'continuity'],
    color: '#0084FF',
  },
];

export const packs: CorePack[] = [
  {
    id: 'weekend-field-kit',
    name: 'Weekend Field Kit',
    description: 'A lean, capable starting point for a day beyond the signal.',
    resourceIds: ['nps-wilderness-survival', 'usgs-topographic-maps', 'weather-spotter-handbook', 'red-cross-first-aid'],
    size: '32.8 MB',
    tone: 'FIELD / 01',
  },
  {
    id: 'home-continuity',
    name: 'Home Continuity',
    description: 'Keep the household informed, hydrated, and able to coordinate.',
    resourceIds: ['ready-emergency-plan', 'cdc-water-treatment', 'fema-home-safety', 'red-cross-first-aid'],
    size: '15.7 MB',
    tone: 'HOME / 02',
  },
  {
    id: 'read-the-land',
    name: 'Read the Land',
    description: 'A cartographic set for understanding terrain and changing weather.',
    resourceIds: ['usgs-topographic-maps', 'weather-spotter-handbook', 'nps-wilderness-survival'],
    size: '24.4 MB',
    tone: 'LAND / 03',
  },
];

export const getResource = (id: string) => resources.find((resource) => resource.id === id);