import { getFilteredDoctors } from '../../backend.ts';

export async function POST(req) {
  const body = await req.json();
// Pseudocode
  const filteredDoctors = await getFilteredDoctors(body);

  return new Response(JSON.stringify(filteredDoctors), {
    headers: { 'Content-Type': 'application/json' },
  });
}
