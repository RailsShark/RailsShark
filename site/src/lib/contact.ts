import { site } from '../config/site';

const { email, whatsapp, calendly } = site.contact;

const mailto = (subject: string) => `mailto:${email}?subject=${encodeURIComponent(subject)}`;

/** Each channel falls back to email until it is set up in config/site.ts. */
export const channels = {
  email: {
    label: 'Email',
    value: email,
    href: mailto('New project enquiry'),
    ready: true,
  },
  whatsapp: {
    label: 'WhatsApp',
    value: whatsapp ? `+${whatsapp}` : 'Message us',
    href: whatsapp
      ? `https://wa.me/${whatsapp}?text=${encodeURIComponent('Hi RailsShark, I would like to talk about a project.')}`
      : mailto('WhatsApp contact request'),
    ready: Boolean(whatsapp),
  },
  calendly: {
    label: 'Book a call',
    value: '30 minutes, free',
    href: calendly || mailto('Book a 30 minute call'),
    ready: Boolean(calendly),
  },
};
