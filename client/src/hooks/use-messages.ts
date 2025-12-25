import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";
import emailjs from 'emailjs-com';

export function useCreateMessage() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertMessage) => {
      // Send directly to EmailJS (Gmail inbox)
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          message: data.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      return data;
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
        description: error instanceof Error ? error.message : "Failed to send message. Please check your email settings.",
        variant: "destructive",
      });
    }
  });
}
