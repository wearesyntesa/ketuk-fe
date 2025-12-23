"use client";

import { 
  FormLink, 
  CreateFormLinkRequest, 
  UpdateFormLinkRequest,
  PublicFormResponse,
  PublicFormSubmitRequest,
  PublicFormSubmitResponse,
  Ticket
} from "@/components/type";
import { useState } from "react";
import { toast } from "sonner";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://192.168.10.184:8081";

interface UseFormLinksOptions {
  translations?: {
    formLinkCreated?: string;
    formLinkUpdated?: string;
    formLinkDeleted?: string;
    formLinkDeactivated?: string;
    formLinkCloned?: string;
    formSubmitted?: string;
    unableToCreateFormLink?: string;
    unableToUpdateFormLink?: string;
    unableToDeleteFormLink?: string;
    unableToLoadFormLinks?: string;
    unableToSubmitForm?: string;
    connectionError?: string;
  };
}

export const useFormLinks = (options?: UseFormLinksOptions) => {
  const t = options?.translations || {
    formLinkCreated: "Form link created successfully!",
    formLinkUpdated: "Form link updated successfully!",
    formLinkDeleted: "Form link deleted successfully!",
    formLinkDeactivated: "Form link deactivated successfully!",
    formLinkCloned: "Form link cloned successfully!",
    formSubmitted: "Form submitted successfully!",
    unableToCreateFormLink: "Unable to create form link. Please try again.",
    unableToUpdateFormLink: "Unable to update form link. Please try again.",
    unableToDeleteFormLink: "Unable to delete form link. Please try again.",
    unableToLoadFormLinks: "Unable to load form links. Please try again.",
    unableToSubmitForm: "Unable to submit form. Please try again.",
    connectionError: "Connection error. Please check your internet and try again.",
  };

  const [formLinks, setFormLinks] = useState<FormLink[]>([]);
  const [loading, setLoading] = useState(false);

  // Get all form links (admin)
  const handleGetAllFormLinks = async (token: string): Promise<FormLink[]> => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/form-links/v1`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || t.unableToLoadFormLinks);
      }

      setFormLinks(data.data || []);
      return data.data || [];
    } catch (error: unknown) {
      console.error("Failed to fetch form links:", error);
      toast.error(t.connectionError);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Get form link by ID (admin)
  const handleGetFormLinkByID = async (id: number, token: string): Promise<FormLink | null> => {
    try {
      const response = await fetch(`${API_URL}/api/form-links/v1/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || t.unableToLoadFormLinks);
      }

      return data.data;
    } catch (error: unknown) {
      console.error("Failed to fetch form link:", error);
      return null;
    }
  };

  // Create form link (admin)
  const handleCreateFormLink = async (formLink: CreateFormLinkRequest, token: string): Promise<FormLink | null> => {
    try {
      const requestBody = {
        ...formLink,
        expiresAt: formLink.expiresAt.toISOString(),
      };

      const response = await fetch(`${API_URL}/api/form-links/v1`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || t.unableToCreateFormLink);
      }

      toast.success(t.formLinkCreated);
      return data.data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : t.unableToCreateFormLink;
      toast.error(message);
      return null;
    }
  };

  // Update form link (admin)
  const handleUpdateFormLink = async (id: number, formLink: UpdateFormLinkRequest, token: string): Promise<FormLink | null> => {
    try {
      const requestBody = {
        ...formLink,
        expiresAt: formLink.expiresAt?.toISOString(),
      };

      const response = await fetch(`${API_URL}/api/form-links/v1/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || t.unableToUpdateFormLink);
      }

      toast.success(t.formLinkUpdated);
      return data.data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : t.unableToUpdateFormLink;
      toast.error(message);
      return null;
    }
  };

  // Delete form link (admin)
  const handleDeleteFormLink = async (id: number, token: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/api/form-links/v1/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || t.unableToDeleteFormLink);
      }

      toast.success(t.formLinkDeleted);
      return true;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : t.unableToDeleteFormLink;
      toast.error(message);
      return false;
    }
  };

  // Deactivate form link (admin)
  const handleDeactivateFormLink = async (id: number, token: string): Promise<FormLink | null> => {
    try {
      const response = await fetch(`${API_URL}/api/form-links/v1/${id}/deactivate`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || t.unableToUpdateFormLink);
      }

      toast.success(t.formLinkDeactivated);
      return data.data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : t.unableToUpdateFormLink;
      toast.error(message);
      return null;
    }
  };

  // Clone form link (admin)
  const handleCloneFormLink = async (id: number, expiresAt: Date, token: string): Promise<FormLink | null> => {
    try {
      const response = await fetch(`${API_URL}/api/form-links/v1/${id}/clone`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ expiresAt: expiresAt.toISOString() }),
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || t.unableToCreateFormLink);
      }

      toast.success(t.formLinkCloned);
      return data.data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : t.unableToCreateFormLink;
      toast.error(message);
      return null;
    }
  };

  // Get submissions for a form link (admin)
  const handleGetSubmissions = async (formLinkId: number, token: string): Promise<Ticket[]> => {
    try {
      const response = await fetch(`${API_URL}/api/form-links/v1/${formLinkId}/submissions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || t.unableToLoadFormLinks);
      }

      return data.data || [];
    } catch (error: unknown) {
      console.error("Failed to fetch submissions:", error);
      return [];
    }
  };

  // PUBLIC ENDPOINTS (no auth required)

  // Get public form by code
  const handleGetPublicForm = async (code: string): Promise<PublicFormResponse | null> => {
    try {
      const response = await fetch(`${API_URL}/api/public/form/${code}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "Form not found");
      }

      return data.data;
    } catch (error: unknown) {
      console.error("Failed to fetch public form:", error);
      return null;
    }
  };

  // Submit public form
  const handleSubmitPublicForm = async (code: string, submission: PublicFormSubmitRequest): Promise<PublicFormSubmitResponse | null> => {
    try {
      const requestBody = {
        ...submission,
        startDate: submission.startDate.toISOString(),
        endDate: submission.endDate.toISOString(),
      };

      const response = await fetch(`${API_URL}/api/public/form/${code}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || t.unableToSubmitForm);
      }

      toast.success(t.formSubmitted);
      return data.data;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : t.unableToSubmitForm;
      toast.error(message);
      return null;
    }
  };

  // Helper to generate full form URL
  const getFormUrl = (code: string): string => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/form/${code}`;
    }
    return `/form/${code}`;
  };

  return {
    formLinks,
    setFormLinks,
    loading,
    handleGetAllFormLinks,
    handleGetFormLinkByID,
    handleCreateFormLink,
    handleUpdateFormLink,
    handleDeleteFormLink,
    handleDeactivateFormLink,
    handleCloneFormLink,
    handleGetSubmissions,
    handleGetPublicForm,
    handleSubmitPublicForm,
    getFormUrl,
  };
};
