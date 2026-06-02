"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { heroImageAlt } from "@/lib/mock-data";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof schema>;

export function Newsletter() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  const onSubmit = (values: FormValues) => {
    toast.success("Welcome to StyleHub", {
      description: `We'll send first access to ${values.email}.`,
    });
    form.reset();
  };

  return (
    <section className="container py-20 md:py-28">
      <Reveal className="relative overflow-hidden rounded-3xl bg-ink">
        <Image
          src={heroImageAlt}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/30" />

        <div className="relative grid gap-8 px-6 py-16 sm:px-12 md:py-24 lg:grid-cols-2 lg:items-center">
          <div className="text-white">
            <span className="text-xs font-medium uppercase luxe-track text-gold">
              The Inner Circle
            </span>
            <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl md:text-5xl text-balance">
              Be first to know.
            </h2>
            <p className="mt-4 max-w-md text-white/70">
              Subscribe for private previews, early access to new collections,
              and 10% off your first order.
            </p>
          </div>

          <div className="glass-dark rounded-2xl p-6 sm:p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-3"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          className="h-12 border-white/20 bg-white/5 text-white placeholder:text-white/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-gold" />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" className="h-12">
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <p className="text-center text-xs text-white/50">
                  By subscribing you agree to our Privacy Policy.
                </p>
              </form>
            </Form>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
