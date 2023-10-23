import { defineConfig } from 'tinacms'

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'main'

export default defineConfig({
  branch,
  clientId: null, // Get this from tina.io
  token: null, // Get this from tina.io

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: '',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'pages',
        label: 'Pages',
        path: 'pages',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'boolean',
            name: 'eleventyExcludeFromCollections',
            label: 'Draft',
            parse: (val) => (val ? true : undefined),
            format: (val) => Boolean(val),
          },
          {
            type: 'boolean',
            name: 'eleventyNoIndex',
            label: 'No-Index',
            parse: (val) => (val ? true : undefined),
            format: (val) => Boolean(val),
          },
          {
            type: 'string',
            name: 'redirect',
            label: 'Redirection URL',
            parse: (val) => val || undefined,
          },
          {
            type: 'object',
            name: 'eleventyNavigation',
            label: 'Navigation',
            fields: [
              {
                label: 'Parent',
                name: 'parent',
                type: 'reference',
                collections: ['pages'],
                parse: (val) => val || undefined,
              },
              {
                label: 'Order',
                name: 'order',
                type: 'number',
                step: 1,

                parse: (val) => {
                  const num = Number(val)
                  if (Number.isNaN(num) || num < 0) {
                    return undefined
                  }
                  return num
                },
                format: (val) => {
                  const num = Number(val)
                  if (Number.isNaN(num) || num < 0) {
                    return 0
                  }
                  return num
                },
              },
              {
                label: 'Link',
                name: 'link',
                type: 'string',
                parse: (val) => val || undefined,
              },
            ],
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
          },
          {
            type: 'string',
            name: 'permalink',
            label: 'Permalink',
            parse: (val) => val || undefined,
          },
          {
            type: 'datetime',
            name: 'date',
            label: 'Date',
            ui: {
              dateFormat: 'YYYY-MM-DD',
              timeFormat: false,
            },
            parse: (val) => val || undefined,
          },
        ],
        ui: {
          // Setting a default will auto-populate new items with the given values
          defaultItem: () => {
            return {
              title: 'New Page',
            }
          },
        },
      },
    ],
  },
})
