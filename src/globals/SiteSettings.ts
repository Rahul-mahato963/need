import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'brandName',
      type: 'text',
      defaultValue: 'NEED',
      required: true,
    },
    {
      name: 'brandInitial',
      type: 'text',
      defaultValue: 'N',
      maxLength: 2,
      required: true,
    },
    {
      name: 'navLinks',
      type: 'array',
      defaultValue: [
        { href: '/', label: 'Home' },
        { href: '/services', label: 'Services' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
      ],
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
        },
      ],
      minRows: 1,
    },
    {
      name: 'primaryActionLabel',
      type: 'text',
      defaultValue: 'Book now',
      required: true,
    },
    {
      name: 'primaryActionHref',
      type: 'text',
      defaultValue: '/book',
      required: true,
    },
    {
      name: 'secondaryActionLabel',
      type: 'text',
      defaultValue: 'Join  as a service Partner',
      required: true,
    },
    {
      name: 'secondaryActionHref',
      type: 'text',
      defaultValue: '/partner',
      required: true,
    },
    {
      name: 'footerCopy',
      type: 'textarea',
      defaultValue: 'Reliable home services for busy households, from urgent fixes to planned upkeep.',
      required: true,
    },
    {
      name: 'footerLinks',
      type: 'array',
      defaultValue: [
        { href: '/', label: 'Home' },
        { href: '/services', label: 'Services' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
        { href: '/book', label: 'Book' },
        { href: '/partner', label: 'Join  as a service Partner' },
      ],
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
        },
      ],
      minRows: 1,
    },
  ],
}
