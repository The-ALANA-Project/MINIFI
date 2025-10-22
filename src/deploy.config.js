// Deployment configuration for ALANA Project
// This is a frontend-only React application

module.exports = {
  // Explicitly disable all backend deployments
  backend: false,
  supabase: false,
  serverless: false,
  edgeFunctions: false,
  
  // Frontend-only configuration
  type: 'static',
  buildTarget: 'client',
  
  // Build settings
  build: {
    command: 'npm run build',
    directory: 'dist',
    environment: 'browser'
  },
  
  // Explicitly prevent any server deployments
  server: {
    enabled: false
  },
  
  // No database needed
  database: {
    enabled: false
  }
};