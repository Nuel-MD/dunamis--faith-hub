import axiosClient from "../axios-client";
import { AxiosError } from "axios";

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
}

export interface PaginatedResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
  pagingCounter: number;
}

export interface ResourceError {
  message: string;
  code?: string;
  status?: number;
}

export const resourcesApi = {
  async getResources(params?: {
    page?: number;
    limit?: number;
    category?: string;
  }): Promise<PaginatedResponse<Resource>> {
    try {
      const { data } = await axiosClient.get("/api/resources", { params });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ResourceError>;
      throw {
        message:
          axiosError.response?.data?.message || "Failed to fetch resources",
        status: axiosError.response?.status,
        code: axiosError.code,
      };
    }
  },

  async getResource(id: string): Promise<Resource> {
    try {
      const { data } = await axiosClient.get(`/api/resources/${id}`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ResourceError>;
      throw {
        message:
          axiosError.response?.data?.message || "Failed to fetch resource",
        status: axiosError.response?.status,
        code: axiosError.code,
      };
    }
  },

  async createResource(resource: Omit<Resource, "id">): Promise<Resource> {
    try {
      const { data } = await axiosClient.post("/api/resources", resource);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ResourceError>;
      throw {
        message:
          axiosError.response?.data?.message || "Failed to create resource",
        status: axiosError.response?.status,
        code: axiosError.code,
      };
    }
  },

  async updateResource(
    id: string,
    resource: Partial<Resource>
  ): Promise<Resource> {
    try {
      const { data } = await axiosClient.put(`/api/resources/${id}`, resource);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ResourceError>;
      throw {
        message:
          axiosError.response?.data?.message || "Failed to update resource",
        status: axiosError.response?.status,
        code: axiosError.code,
      };
    }
  },

  async deleteResource(id: string): Promise<void> {
    try {
      await axiosClient.delete(`/api/resources/${id}`);
    } catch (error) {
      const axiosError = error as AxiosError<ResourceError>;
      throw {
        message:
          axiosError.response?.data?.message || "Failed to delete resource",
        status: axiosError.response?.status,
        code: axiosError.code,
      };
    }
  },
};
