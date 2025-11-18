const BASE_URL = "http://localhost:4000/api/";

export async function get<T>(url: string): Promise<T> {
  const res = await fetch(BASE_URL + url);
  return await res.json();
}

export async function post<T>(url: string, body: any): Promise<T> {
  const res = await fetch(BASE_URL + url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const err = await res.json();
    throw err;
  }

  return await res.json();
}

export async function del(url: string) {
  return await fetch(BASE_URL + url, { method: "DELETE" });
}
