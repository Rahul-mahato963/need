import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { PartnerApplications } from './collections/PartnerApplications'
import { PartnerKYCSubmissions } from './collections/PartnerKYCSubmissions'
import { Providers } from './collections/Providers'
import { Services } from './collections/Services'
import { Testimonials } from './collections/Testimonials'
import { HomePage } from './globals/HomePage'
import { SitePages } from './globals/SitePages'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Categories,
    Services,
    Testimonials,
    PartnerApplications,
    PartnerKYCSubmissions,
    Providers,
  ],
  globals: [HomePage, SitePages, SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
})
