"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { MessageCircle } from "lucide-react"
import { Loader2 } from "lucide-react"

export function ServicesHero() {
  const router = useRouter()
  const { toast } = useToast()
  const [isConsultationOpen, setIsConsultationOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    budget: "",
    timeline: "",
    message: "",
  })
  const [isSending, setIsSending] = useState(false)

  const handleViewWork = () => {
    router.push("/portfolio")
  }

  const handleConsultationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)

    const subject = "Service Consultation Request"
    const html = `
      <h2>${subject}</h2>
      <p><strong>Name:</strong> ${formData.name}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Phone:</strong> ${formData.phone}</p>
      <p><strong>Service Type:</strong> ${formData.serviceType}</p>
      <p><strong>Budget:</strong> ${formData.budget}</p>
      <p><strong>Timeline:</strong> ${formData.timeline}</p>
      <p><strong>Message:</strong></p>
      <p>${formData.message}</p>
    `

    try {
      const res = await fetch("/api/contact/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject,
          message: formData.message,
          html,
        }),
      })
      if (res.ok) {
        toast({
          title: "Consultation Request Sent!",
          description: "We'll get back to you within 24 hours to discuss your service requirements.",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to send consultation request.",
          variant: "destructive",
        })
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to send consultation request.",
        variant: "destructive",
      })
    }
    setIsSending(false)
    setIsConsultationOpen(false)
    setFormData({
      name: "",
      email: "",
      phone: "",
      serviceType: "",
      budget: "",
      timeline: "",
      message: "",
    })
  }

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Background Logo */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-10"
        style={{
          backgroundImage: "url(/logo-neeom-new.jpg)",
          backgroundSize: "500px 500px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">Our Services</h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          From concept to completion, we provide comprehensive design solutions that transform your vision into reality
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={handleViewWork}
            className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 text-lg font-medium"
          >
            View Our Work
          </Button>
          <Dialog open={isConsultationOpen} onOpenChange={setIsConsultationOpen}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white px-8 py-3 text-lg font-medium bg-transparent"
              >
                Get Consultation
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                  <MessageCircle className="h-6 w-6 text-gray-700" />
                  <span>Service Consultation</span>
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleConsultationSubmit} className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 9032172303"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="serviceType">Service Type *</Label>
                    <Select
                      value={formData.serviceType}
                      onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="architectural">Architectural Design</SelectItem>
                        <SelectItem value="interior">Interior Design</SelectItem>
                        <SelectItem value="construction">Construction</SelectItem>
                        <SelectItem value="consultation">Design Consultation</SelectItem>
                        <SelectItem value="renovation">Renovation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="budget">Budget Range (in ₹)</Label>
                    <Select
                      value={formData.budget}
                      onValueChange={(value) => setFormData({ ...formData, budget: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget in Rupees" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-5lakh">Under ₹5,00,000</SelectItem>
                        <SelectItem value="5-10lakh">₹5,00,000 - ₹10,00,000</SelectItem>
                        <SelectItem value="10-25lakh">₹10,00,000 - ₹25,00,000</SelectItem>
                        <SelectItem value="25-50lakh">₹25,00,000 - ₹50,00,000</SelectItem>
                        <SelectItem value="over-50lakh">Over ₹50,00,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="timeline">Project Timeline</Label>
                  <Select
                    value={formData.timeline}
                    onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="When do you want to start?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asap">As soon as possible</SelectItem>
                      <SelectItem value="1-3months">1-3 months</SelectItem>
                      <SelectItem value="3-6months">3-6 months</SelectItem>
                      <SelectItem value="6-12months">6-12 months</SelectItem>
                      <SelectItem value="planning">Just planning</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Service Requirements</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your service requirements, project details, and any specific needs..."
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full bg-gray-700 hover:bg-gray-800 text-white py-3" disabled={isSending}>
                  {isSending ? (
                    <Loader2 className="animate-spin h-4 w-4 mr-2 inline" />
                  ) : <MessageCircle className="h-4 w-4 mr-2" />}
                  Send Consultation Request
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  )
}
