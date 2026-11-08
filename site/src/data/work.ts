/**
 * Track record. Client names are withheld; each entry describes a real product
 * our engineers built and the result it reached.
 */
export interface WorkItem {
  sector: string;
  title: string;
  detail: string;
  /** Headline result. Omit when there is no number worth stating. */
  result?: string;
  resultLabel?: string;
  platforms: string;
  services: string[];
}

export const work: WorkItem[] = [
  {
    sector: 'Media',
    title: 'Streaming platform for national live events',
    detail:
      'Video on demand and live streaming with Widevine and FairPlay DRM, built natively for Android phones, Android TV and iPhone, running on AWS.',
    result: '50K+',
    resultLabel: 'installs in the first three months',
    platforms: 'Android, Android TV, iOS',
    services: ['streaming', 'mobile', 'backend-cloud'],
  },
  {
    sector: 'Fintech',
    title: 'Freelancing marketplace with mobile wallet payments',
    detail:
      'A two-sided marketplace with local mobile wallet payments integrated end to end, from checkout to payout.',
    result: '15K+',
    resultLabel: 'users in six months',
    platforms: 'Android',
    services: ['mobile', 'backend-cloud'],
  },
  {
    sector: 'Logistics',
    title: 'Customer, store and rider apps with live tracking',
    detail:
      'Three connected apps sharing one backend, so customers, shops and riders see the same order in real time.',
    result: '45%',
    resultLabel: 'better order efficiency',
    platforms: 'Android',
    services: ['mobile', 'backend-cloud'],
  },
  {
    sector: 'Marketplace',
    title: 'Classifieds platform across Canada and Pakistan',
    detail:
      'Infrastructure, pipelines and monitoring for a marketplace serving web and Android users in two countries.',
    result: '99.9%',
    resultLabel: 'uptime for 10K+ active users',
    platforms: 'Android, web',
    services: ['devops', 'backend-cloud'],
  },
  {
    sector: 'Healthcare',
    title: 'Telehealth platform',
    detail: 'Remote consultations connecting patients with doctors from their phones.',
    result: '5K+',
    resultLabel: 'patients served',
    platforms: 'Android, iOS',
    services: ['mobile'],
  },
  {
    sector: 'Software',
    title: 'Social media publishing app',
    detail: 'Scheduling and publishing across five social networks from one app, with encrypted communication throughout.',
    result: '10K+',
    resultLabel: 'installs within months',
    platforms: 'Android',
    services: ['mobile', 'security'],
  },
  {
    sector: 'Energy',
    title: 'Smart energy management',
    detail: 'Energy management combining machine learning and blockchain, running on Microsoft Azure.',
    platforms: 'Android, cloud',
    services: ['iot', 'ai', 'backend-cloud'],
  },
  {
    sector: 'Compliance',
    title: 'Drug and alcohol testing workflow',
    detail: 'A mobile platform that simplifies the drug and alcohol testing process for the people running it.',
    platforms: 'Android, iOS',
    services: ['mobile', 'security'],
  },
  {
    sector: 'Civic',
    title: 'Volunteer emergency response network',
    detail: 'A volunteer-based emergency response platform, built during Covid-19.',
    platforms: 'Android',
    services: ['mobile'],
  },
];

export const practice = [
  { value: '80%', label: 'shorter release time after rebuilding a mobile CI/CD pipeline' },
  { value: '60%', label: 'more stable deployments across web and mobile' },
  { value: '30%', label: 'less technical debt after a structured legacy refactor' },
  { value: '2 weeks', label: 'release cycle, down from 4, for a multi-app team' },
];
