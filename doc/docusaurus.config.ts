import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Japit',
  tagline: 'SVG animations made easy',
  //favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://japit.dev',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'janekhaertter', // Usually your GitHub org/user name.
  projectName: 'Japit', // Usually your repo name.
  deploymentBranch: 'gh-pages',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/janekhaertter/Japit/tree/master/doc',
          //routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    //image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Japit',
      //logo: {
      //  alt: 'My Site Logo',
      //  src: 'img/logo.svg',
      //},
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docSidebar',
          position: 'left',
          label: 'Documentation',
        },
        //{ to: '/blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/janekhaertter/Japit',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      //links: [
      //  {
      //    items: [
      //      {
      //        label: 'Legal Notice (Impressum)',
      //        to: '/legal-notice',
      //      },
      //      {
      //        label: 'Privacy Policy',
      //        to: '/privacy-policy',
      //      },
      //    ],
      //  },
      //],
      copyright: `Copyright © ${new Date().getFullYear()} Janek Härtter &nbsp;·&nbsp; <a href="/legal-notice">Legal Notice (Impressum)</a> &nbsp;·&nbsp; <a href="/privacy-policy">Privacy Policy</a>`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
