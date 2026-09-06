import type { APIRoute } from 'astro';
import { getPricing } from '../../lib/pricing';

export const GET: APIRoute = async () => {
  const pricing = await getPricing();

  return new Response(JSON.stringify(pricing, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
    }
  });
};
