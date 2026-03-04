import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Send, MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";

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

const contactInfo = [
  { icon: MapPin, label: "Location", value: "Abeokuta South, Ogun State" },
  { icon: Phone, label: "Phone", value: "+234 xxx xxx xxxx" },
  { icon: Mail, label: "Email", value: "contact@ladef2026.ng" },
];

const Contact = () => {
  const form = useForm<ContactForm>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", ward: "", email: "", phone: "", role: "", message: "" },
  });

  const onSubmit = (data: ContactForm) => {
    toast.success("Message sent successfully!", {
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
    form.reset();
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="section-divider absolute top-0 left-0 w-full" />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-2"
          >
            <span className="section-badge mb-6 inline-flex">Connect</span>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight mb-5 leading-[1.05]">
              Get in <span className="text-[#C5A54B]">Touch</span>
            </h2>
            <p className="text-muted-foreground text-[15px] leading-[1.7] mb-10">
              Have questions, ideas, or want to join the movement? Reach out today and become part of the LADEF vision.
            </p>

            <div className="space-y-4">
              {contactInfo.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/12 transition-colors duration-300">
                    <item.icon className="text-primary" size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">{item.label}</span>
                    <span className="text-foreground text-sm font-medium">{item.value}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="lg:col-span-3"
          >
            <div className="bento-card !p-8 sm:!p-10">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} className="bg-white border-border rounded-xl h-11 px-4 text-sm focus:border-primary/60 transition-all duration-300 shadow-sm" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="ward" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Ward</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Ake I" {...field} className="bg-white border-border rounded-xl h-11 px-4 text-sm focus:border-primary/60 transition-all duration-300 shadow-sm" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@email.com" {...field} className="bg-white border-border rounded-xl h-11 px-4 text-sm focus:border-primary/60 transition-all duration-300 shadow-sm" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="+234..." {...field} className="bg-white border-border rounded-xl h-11 px-4 text-sm focus:border-primary/60 transition-all duration-300 shadow-sm" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="role" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Role</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white border-border rounded-xl h-11 px-4 text-sm shadow-sm">
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white border-border rounded-xl shadow-lg">
                          {roles.map((r) => (
                            <SelectItem key={r} value={r} className="text-sm">{r}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Message</FormLabel>
                      <FormControl>
                        <Textarea rows={4} placeholder="Your message..." {...field} className="bg-white border-border rounded-xl px-4 py-3 text-sm resize-none focus:border-primary/60 transition-all duration-300 shadow-sm" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <button
                    type="submit"
                    className="btn-pill-primary w-full justify-center text-sm !py-3.5 mt-2"
                  >
                    <Send size={15} />
                    Send Message
                    <ArrowUpRight size={13} />
                  </button>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
