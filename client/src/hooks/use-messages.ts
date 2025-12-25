import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertMessage } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import emailjs from 'emailjs-com';

// POST /api/messages
export function useCreateMessage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertMessage) => {
      // 1. Send to EmailJS (Client-side)
      // Note: In a real env, use import.meta.env.VITE_EMAILJS_*
      // Fallback strings provided for demo stability if env vars missing
      try {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID || 'default_service',
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'default_template',
          {
            from_name: data.name,
            from_email: data.email,
            message: data.message,
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'default_key'
        );
      } catch (e) {
        console.warn("EmailJS failed, falling back to database only", e);
        // Continue to database save even if email fails
      }

      // 2. Save to Database (Backup)
      const validated = api.messages.create.input.parse(data);
      const res = await fetch(api.messages.create.path, {
        method: api.messages.create.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validated),
        credentials: "include",
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Failed to send message');
      }

      return api.messages.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Message sent",
        description: "Thank you for reaching out. I'll get back to you shortly.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  });
}
