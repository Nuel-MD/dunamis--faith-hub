// lib/api.ts
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface Resource {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  externalLink: string;
  category: "sermon" | "worship" | "book" | "movie";
  featured: boolean;
  authorId?: {
    id: string;
    name: string;
  };
  createdAt?: string;
  updatedAt?: string;
  viewCount?: number;
  __v?: number;
}

// Helper function for fetch requests, optionally with token
const fetchApi = async (
  url: string,
  options: RequestInit = {},
  token?: string
): Promise<any> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || response.statusText);
  }
  return response.json();
};

// Public API calls (no token required)
export async function getFeaturedResources(): Promise<Resource[]> {
  try {
    const resources = await fetchApi(`${API_BASE_URL}/resources/featured`);
    return resources.map((resource: any) => ({
      ...resource,
      id: resource._id,
      authorId: resource.authorId
        ? { id: resource.authorId._id, name: resource.authorId.name }
        : undefined,
    }));
  } catch (error) {
    console.error("Error fetching featured resources:", error);
    throw error;
  }
}

export async function getResourcesByCategory(
  category: string
): Promise<Resource[]> {
  const data = await fetchApi(`${API_BASE_URL}/resources/category/${category}`);
  return data.docs.map((resource: any) => ({
    ...resource,
    id: resource._id,
    authorId: resource.authorId
      ? { id: resource.authorId._id, name: resource.authorId.name }
      : undefined,
  }));
}

// Authenticated API calls (token required)
export async function createResource(
  resource: Omit<Resource, "id" | "createdAt" | "updatedAt" | "authorId">,
  token: string
): Promise<Resource> {
  const response = await fetchApi(
    `${API_BASE_URL}/resources`,
    {
      method: "POST",
      body: JSON.stringify(resource),
    },
    token
  );
  return {
    ...response,
    id: response._id,
    authorId: response.authorId
      ? { id: response.authorId._id, name: response.authorId.name }
      : undefined,
  };
}

// Admin login function (example)
export async function loginAdmin(
  email: string,
  password: string
): Promise<{ token: string }> {
  const response = await fetchApi(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  return response; // Expecting { token: "jwt-token" } from backend
}
