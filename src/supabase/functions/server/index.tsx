// Minimal Deno edge function for ALANA Project
// This function provides basic health check and environment variable endpoints

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      status: 200, 
      headers: CORS_HEADERS 
    });
  }

  // Health check endpoint
  if (url.pathname === '/make-server-d0bf8aba/health' && req.method === 'GET') {
    return new Response(
      JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          ...CORS_HEADERS 
        } 
      }
    );
  }

  // Environment variables endpoint
  if (url.pathname === '/make-server-d0bf8aba/env' && req.method === 'GET') {
    try {
      const env = {
        NEXT_PUBLIC_PRIVY_APP_ID: 'demo-app-id' // Always return demo value
      };
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          env,
          timestamp: new Date().toISOString()
        }),
        { 
          status: 200, 
          headers: { 
            'Content-Type': 'application/json',
            ...CORS_HEADERS 
          } 
        }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Server error',
          env: { NEXT_PUBLIC_PRIVY_APP_ID: 'demo-app-id' }
        }),
        { 
          status: 500, 
          headers: { 
            'Content-Type': 'application/json',
            ...CORS_HEADERS 
          } 
        }
      );
    }
  }

  // Default 404 response
  return new Response(
    JSON.stringify({ error: 'Not found' }),
    { 
      status: 404, 
      headers: { 
        'Content-Type': 'application/json',
        ...CORS_HEADERS 
      } 
    }
  );
}

Deno.serve(handler);