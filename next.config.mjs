/** @type {import('next').NextConfig} */
const nextConfig = {

  output: 'export',
  
  
  images: {
    unoptimized: true,
  },
  
  
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'))

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              // SVGO's default preset strips viewBox whenever it matches width/height
              // (every 24x24 icon), which makes the icon crop instead of scale.
              svgoConfig: {
                plugins: [
                  { name: 'preset-default', params: { overrides: { removeViewBox: false } } },
                  'prefixIds',
                ],
              },
            },
          },
        ],
      }
    )

    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
}

export default nextConfig
