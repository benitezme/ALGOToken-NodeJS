/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
const users = [
  {
    caption: 'User1',
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/docusaurus.svg'.
    image: '/img/docusaurus.svg',
    infoLink: 'https://www.facebook.com',
    pinned: true,
  },
];

const siteConfig = {
  title: 'Explore ALGO Smart Contracts', // Title for your website.
  tagline: 'Docs for developing, using and auditing ALGO Smart Contracts',
  url: 'https://smartcontracts.superalgos.org', // Your website URL
  baseUrl: '/', // Base URL for your project */
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: 'algotoken-nodejs-docs',
  organizationName: 'superalgos',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {doc: 'docs/introduction', label: 'Docs'},
    {doc: 'contracts/contracts', label: 'Contracts'},
    {page: 'help', label: 'Help'}
  ],

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: 'img/Superalgos-logo-horz-dark.svg',
  footerIcon: 'img/Superalgos-logo-vert-dark.svg',
  favicon: 'img/favicon.png',

  /* Colors for website */
  colors: {
    primaryColor: '#e3493c',
    secondaryColor: '#5bc0de',
  },

  /* Custom fonts for website */
  fonts: {
    fontRegular: ['Saira', 'Arial', 'sans-serif'],
    fontCondensed: ['Saira Condensed', 'Arial Narrow', 'Arial', 'sans-serif']
  },

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} Superalgos Project`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/docusaurus.png',
  twitterImage: 'img/docusaurus.png',

  // Show documentation's last contributor's name.
  // enableUpdateBy: true,

  // Show documentation's last update time.
  // enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',
  docsSideNavCollapsible: true,
  noIndex: true,
  stylesheets: [
    "https://fonts.googleapis.com/css?family=Saira+Condensed:300,600|Saira:300,600&amp;subset=latin-ext",
    "/css/main.css"
  ],
};

module.exports = siteConfig;
