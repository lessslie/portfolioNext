"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

import { useState } from "react"
// ...resto de imports

export default function Contact() {
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSending(true);
    setSuccess("");
    setError("");
    try {
      const response = await fetch("https://formspree.io/f/xbjeerer", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          message: values.message
        })
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess("¡Mensaje enviado correctamente! Pronto me pondré en contacto.");
        form.reset();
      } else {
        setError(data.error || "Ocurrió un error al enviar el mensaje.");
      }
    } catch (err) {
      setError("Ocurrió un error al enviar el mensaje.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="relative overflow-hidden bg-zinc-900 py-20">
      <div className="container relative z-10 mx-auto px-4">
        {/* ...resto igual... */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mx-auto max-w-md"
        >
          {success && <div className="mb-4 text-green-400 font-semibold">{success}</div>}
          {error && <div className="mb-4 text-red-400 font-semibold">{error}</div>}
          <Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Nombre</FormLabel>
          <FormControl>
            <Input placeholder="Tu nombre" {...field} className="bg-zinc-800 text-white placeholder-gray-400 border-gray-700 focus:border-white" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input placeholder="tu@email.com" {...field} className="bg-zinc-800 text-white placeholder-gray-400 border-gray-700 focus:border-white" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="message"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Mensaje</FormLabel>
          <FormControl>
            <Textarea placeholder="Contame tu idea o proyecto..." className="min-h-[120px] bg-zinc-800 text-white placeholder-gray-400 border-gray-700 focus:border-white" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button type="submit" className="w-full" disabled={sending}>
      {sending ? "Enviando..." : "Enviar Mensaje"}
    </Button>
  </form>
</Form>
        </motion.div>
        {/* ...resto igual... */}
      </div>
      {/* ...resto igual... */}
    </section>
  )
}
