/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      // Add rule for .node files
      config.module.rules.push({ test: /\.node$/, use: "raw-loader" });
  
      // Ensure `config.externals` exists and modify it appropriately
      if (!isServer) {
        if (!Array.isArray(config.externals)) {
          config.externals = []; // Initialize as an empty array if undefined
        }
        config.externals.push("canvas");
      }
  
      return config;
    },
  };
  
  export default nextConfig;
  