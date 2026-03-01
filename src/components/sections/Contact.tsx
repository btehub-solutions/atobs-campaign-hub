import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Send } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  ward: z.string().min(1, "Ward is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone number"),
  role: z.string().min(1, "Select your role"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof schema>;

const roles = ["Constituent", "Youth Leader", "Ward Executive", "Party Agent", "Business Owner", "Other"];

const Contact = () => {
  const form = useForm<ContactForm>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", ward: "", email: "", phone: "", role: "", message: "" },
  });

  const onSubmit = (data: ContactForm) => {
    console.log("Contact form:", data);
    toast.success("Message sent successfully!", {
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
    form.reset();
  };

  return (
    <section id="contact" className="py-20">
      <div className="section-container">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-3">
              Get in <span className="text-accent">Touch</span>
            </h2>
            <p className="text-muted-foreground font-body">
              Have questions, ideas, or want to join the movement? Reach out today.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-body text-sm">Full Name</FormLabel>
                      <FormControl><Input placeholder="Your name" {...field} className="bg-card border-border" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="ward" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-body text-sm">Ward</FormLabel>
                      <FormControl><Input placeholder="e.g. Ake I" {...field} className="bg-card border-border" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-body text-sm">Email</FormLabel>
                      <FormControl><Input type="email" placeholder="you@email.com" {...field} className="bg-card border-border" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-body text-sm">Phone</FormLabel>
                      <FormControl><Input placeholder="+234..." {...field} className="bg-card border-border" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="role" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-body text-sm">Role</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-card border-border">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roles.map((r) => (
                          <SelectItem key={r} value={r}>{r}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-body text-sm">Message</FormLabel>
                    <FormControl><Textarea rows={4} placeholder="Your message..." {...field} className="bg-card border-border resize-none" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <button
                  type="submit"
                  className="w-full py-3 bg-primary text-primary-foreground font-body font-semibold rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={18} /> Send Message
                </button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
