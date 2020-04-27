module.exports = {
  stories: ['../src/**/*.stories.js|mdx'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-storysource',
    '@storybook/addon-knobs',
    '@storybook/react',
    '@storybook/addon-backgrounds/register',
    '@storybook/addon-docs'
  ],
};