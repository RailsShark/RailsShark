/**
 * Site-wide settings. Everything a non-developer may need to change lives here.
 * Empty strings are treated as "not set up yet" and fall back to email.
 */
export const site = {
  name: 'RailsShark',
  /** Public URL once deployed. Update when a custom domain is attached. */
  url: 'https://railsshark.pages.dev',
  founded: 2015,
  location: 'Islamabad, Pakistan',
  tagline: 'Software engineering studio',
  description:
    'RailsShark designs, builds and runs mobile apps, backends, cloud infrastructure and connected devices for teams worldwide.',

  contact: {
    /** Placeholder until a domain mailbox exists. */
    email: 'railsshark@gmail.com',
    /** International format, digits only, e.g. "923001234567". Empty = not set up. */
    whatsapp: '',
    /** Full Calendly URL, e.g. "https://calendly.com/railsshark/30min". Empty = not set up. */
    calendly: '',
    /** Web3Forms access key (https://web3forms.com). Empty = form opens the visitor's mail app instead. */
    web3formsKey: '',
  },

  /**
   * Design lab (palette/type/shape switcher). Open the site with ?lab=1 to show it,
   * ?lab=0 to hide it and reset. Set to false to remove it from the build entirely.
   */
  lab: true,

  social: {
    linkedin: '',
    github: 'https://github.com/RailsShark',
  },
} as const;

export const stats = [
  { value: '2015', label: 'shipping since' },
  { value: '50+', label: 'apps shipped' },
  { value: '1M+', label: 'people using them' },
  { value: '99%', label: 'crash-free sessions' },
] as const;
