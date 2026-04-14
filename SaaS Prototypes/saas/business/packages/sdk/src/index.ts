export async function fetchHealth(apiUrl: string) {
  const res = await fetch(`${apiUrl}/health`);
  return res.json();
}
