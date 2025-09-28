// Единая точка доступа к данным
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function getManifestPrinciples() {
  const res = await fetch(`${API_URL}/manifest-principles?limit=100`);
  return res.json();
}