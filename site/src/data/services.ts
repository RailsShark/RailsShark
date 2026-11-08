export interface Service {
  slug: string;
  name: string;
  /** One line used in lists. */
  summary: string;
  /** Opening paragraph on the service page. */
  intro: string;
  /** What a client typically gets. */
  deliverables: string[];
  /** Problems we are usually brought in to solve. */
  calledFor: string[];
  stack: string[];
}

export const services: Service[] = [
  {
    slug: 'mobile',
    name: 'Mobile apps',
    summary: 'Native Android and iOS, Flutter when one codebase fits, and apps for the TV.',
    intro:
      'Mobile is where we started and where most of our work still lives. We build native apps when performance and platform feel matter, and Flutter when one team needs to ship to both stores at once. Either way you get a modular codebase that the next engineer can read.',
    deliverables: [
      'Android apps in Kotlin and Jetpack Compose',
      'iOS apps in Swift and SwiftUI',
      'Cross-platform apps in Flutter',
      'Android TV and big-screen apps',
      'Offline-first sync for field and low-connectivity users',
      'Store release, crash monitoring and staged rollouts',
    ],
    calledFor: [
      'A new product that needs to reach both stores',
      'An existing app that crashes, drains battery or feels slow',
      'A legacy XML or Objective-C codebase that needs a careful migration',
    ],
    stack: ['Kotlin', 'Jetpack Compose', 'Hilt', 'Room', 'Swift', 'SwiftUI', 'Flutter', 'Dart', 'Firebase', 'R8 / DexGuard'],
  },
  {
    slug: 'backend-cloud',
    name: 'Backend and cloud',
    summary: 'APIs, data models and infrastructure that stay calm under load.',
    intro:
      'Every app is only as good as the system behind it. We design the API contract first, agree it with your team in writing, then build the services, data model and infrastructure to match. The aim is a backend nobody has to think about.',
    deliverables: [
      'REST API design with written client and server contracts',
      'Multi-tenant data models',
      'Authentication, roles and row-level security',
      'Background jobs, queues and scheduled work',
      'Observability with OpenTelemetry and cloud monitoring',
      'Cost forecasts before you scale',
    ],
    calledFor: [
      'An MVP that needs a backend fast without painting you into a corner',
      'A system that worked at 1,000 users and is struggling at 50,000',
      'Moving between cloud providers or consolidating services',
    ],
    stack: ['Node.js', 'MongoDB', 'PostgreSQL', 'Supabase', 'PostGIS', 'AWS', 'Google Cloud', 'Firebase', 'Azure'],
  },
  {
    slug: 'devops',
    name: 'DevOps and release engineering',
    summary: 'Pipelines that turn a merged pull request into a safe release.',
    intro:
      'Slow, manual releases are where good teams lose weeks. We set up build and release pipelines for mobile and web, add the monitoring that tells you something broke before your users do, and leave you with a process your team can run without us.',
    deliverables: [
      'CI/CD for Android, iOS, web and backend',
      'Signed builds, build flavours and multi-client deployments',
      'Docker images and zero-downtime deploys',
      'Monitoring, logging and uptime alerts',
      'Release checklists and rollback plans',
    ],
    calledFor: [
      'Releases that take days and need one specific person present',
      'One codebase shipped to many clients with different configurations',
      'Outages you only hear about from customers',
    ],
    stack: ['Azure DevOps', 'GitHub Actions', 'Bitbucket Pipelines', 'Docker', 'PM2', 'Grafana', 'Application Insights'],
  },
  {
    slug: 'iot',
    name: 'IoT and embedded',
    summary: 'Firmware, telemetry and the apps that talk to your hardware.',
    intro:
      'We work on both sides of the wire: the microcontroller that reads the sensor and the cloud and mobile apps that make the data useful. That includes vehicles, where we work with the diagnostic buses that cars actually use.',
    deliverables: [
      'Firmware for ESP32, ESP8266 and Arduino boards',
      'Device-to-cloud messaging over MQTT and AWS IoT Core',
      'Bluetooth Low Energy companion apps',
      'Real-time sensor telemetry and dashboards',
      'Automotive diagnostics over CAN bus and K-line',
      'Managed fleets of rugged Android devices',
    ],
    calledFor: [
      'A hardware prototype that needs an app and a backend',
      'Devices in the field that drop offline and nobody knows why',
      'Vehicle or machine data that needs to reach a dashboard',
    ],
    stack: ['ESP32', 'ESP8266', 'Arduino', 'MQTT', 'AWS IoT Core', 'BLE', 'CAN bus', 'K-line', 'Android Enterprise'],
  },
  {
    slug: 'security',
    name: 'Security and hardening',
    summary: 'Mobile app security reviews, hardening and incident response.',
    intro:
      'Our team has worked on both the attacking and the defending side. We review apps against the OWASP mobile standards, fix what we find, and help you respond when something has already gone wrong on devices in the field.',
    deliverables: [
      'Mobile app security reviews aligned to OWASP MASVS',
      'Secure storage, encryption and certificate pinning',
      'Code obfuscation and tamper resistance',
      'Threat modelling for new features',
      'Incident response and device forensics',
      'Security baselines for managed device fleets',
    ],
    calledFor: [
      'An app handling payments, health or personal data before launch',
      'A partner or regulator asking for a security assessment',
      'Suspicious behaviour on devices you manage',
    ],
    stack: ['OWASP MASVS', 'OWASP Mobile Top 10', 'TLS', 'AES', 'Android Keystore', 'iOS Keychain', 'ADB'],
  },
  {
    slug: 'ai',
    name: 'AI integration',
    summary: 'Useful AI features with guardrails, in the cloud or on the device.',
    intro:
      'We add AI where it saves someone real time, and we design it so it fails safely. That usually means structured outputs your code can check, clear limits on what the model is allowed to do, and on-device models when privacy or latency matter.',
    deliverables: [
      'LLM features with structured, validated outputs',
      'On-device ML for vision and text',
      'Conversational assistants',
      'AI-assisted internal tools, such as pre-review of code',
      'Automation for repetitive operational work',
    ],
    calledFor: [
      'A product team that wants an AI feature that is more than a chat box',
      'Data that cannot leave the device',
      'Operations work that a script and a model could take over',
    ],
    stack: ['OpenAI API', 'ML Kit', 'TensorFlow Lite', 'Dialogflow', 'Python', 'Streamlit'],
  },
  {
    slug: 'streaming',
    name: 'Streaming and OTT',
    summary: 'Video on demand and live streaming with DRM, from phone to TV.',
    intro:
      'Streaming apps fail in public, during the one match or finale everybody is watching. We build video platforms with protected content, players that recover from bad networks, and infrastructure sized for the spike.',
    deliverables: [
      'Video on demand and live streaming apps',
      'DRM with Widevine and FairPlay',
      'Players for Android, Android TV and iOS',
      'Cloud media pipelines on AWS',
      'Load planning for live events',
    ],
    calledFor: [
      'A broadcaster or rights holder launching its own app',
      'Live events that have to survive a traffic spike',
      'Premium content that needs protection',
    ],
    stack: ['ExoPlayer / Media3', 'AVPlayer', 'Widevine', 'FairPlay', 'HLS', 'DASH', 'AWS'],
  },
  {
    slug: 'desktop',
    name: 'Desktop and systems',
    summary: 'Windows and cross-platform desktop tools, services and automation.',
    intro:
      'Some jobs belong on a desk: tools for technicians, operators and support teams. We build desktop applications and background services, including tools that talk to Android devices over USB for setup, diagnostics and bulk updates.',
    deliverables: [
      'Windows desktop apps in C# and WPF',
      'Cross-platform desktop apps in Avalonia',
      'Background services and scheduled automation',
      'Device setup and diagnostics tools over ADB',
    ],
    calledFor: [
      'Support staff doing the same device setup by hand every day',
      'An old desktop tool that needs to run on macOS and Linux too',
      'Back-office work that should run on a schedule',
    ],
    stack: ['C#', '.NET', 'WPF', 'Avalonia', 'Xamarin', 'ADB'],
  },
];
