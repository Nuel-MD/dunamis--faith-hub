// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface Resource {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  externalLink: string;
  category: string;
  authorId?: string;
}

export interface PaginatedResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

// Helper function for fetch requests
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: "include", // Include credentials for CORS
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || response.statusText);
    }

    return response.json();
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}

// Public API calls (no token required)
export async function getFeaturedResources(): Promise<Resource[]> {
  try {
    const resources = await fetchApi<any[]>("/api/resources/featured");
    return resources.map((resource) => ({
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
  category: string,
  page: number = 1,
  limit: number = 9
): Promise<PaginatedResponse<Resource>> {
  return fetchApi<PaginatedResponse<Resource>>(
    `/api/resources/category/${category}?page=${page}&limit=${limit}`
  );
}

export async function getResourceById(id: string): Promise<Resource> {
  return fetchApi<Resource>(`/api/resources/${id}`);
}

// Authenticated API calls (token required)
export async function createResource(
  resource: Omit<Resource, "id">,
  token: string
): Promise<Resource> {
  return fetchApi<Resource>(
    "/api/resources",
    {
      method: "POST",
      body: JSON.stringify(resource),
    },
    token
  );
}

export async function updateResource(
  id: string,
  resource: Partial<Resource>,
  token: string
): Promise<Resource> {
  return fetchApi<Resource>(
    `/api/resources/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(resource),
    },
    token
  );
}

export async function deleteResource(id: string, token: string): Promise<void> {
  await fetchApi(
    `/api/resources/${id}`,
    {
      method: "DELETE",
    },
    token
  );
}

// Admin login function
export async function loginAdmin(
  email: string,
  password: string
): Promise<{ token: string }> {
  return fetchApi<{ token: string }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}
