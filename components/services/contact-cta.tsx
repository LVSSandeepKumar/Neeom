"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, Calendar, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export function ContactCTA() {
  const router = useRouter()
  const { toast } = useToast()
  const [isConsultationOpen, setIsConsultationOpen] = useState(false)
  const [isScheduleOpen, setIsScheduleOpen] = useState(false)
  const [isSendingConsultation, setIsSendingConsultation] = useState(false)
  const [isSendingSchedule, setIsSendingSchedule] = useState(false)
  const [consultationForm, setConsultationForm] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    budget: "",
    message: "",
  })
  const [scheduleForm, setScheduleForm] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    serviceType: "",
    message: "",
  })

  const handleConsultationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSendingConsultation(true)

    const subject = "Free Consultation Request"
    const html = `
      <h2>${subject}</h2>
      <p><strong>Name:</strong> ${consultationForm.name}</p>
      <p><strong>Email:</strong> ${consultationForm.email}</p>
      <p><strong>Phone:</strong> ${consultationForm.phone}</p>
      <p><strong>Service Type:</strong> ${consultationForm.serviceType}</p>
      <p><strong>Budget:</strong> ${consultationForm.budget}</p>
      <p><strong>Message:</strong></p>
      <p>${consultationForm.message}</p>
    `

    try {
      const res = await fetch("/api/contact/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: consultationForm.name,
          email: consultationForm.email,
          phone: consultationForm.phone,
          subject,
          message: consultationForm.message,
          html,
        }),
      })
      if (res.ok) {
        toast({
          title: "Consultation Request Sent!",
          description: "We'll get back to you within 24 hours with a free consultation.",
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
    setIsSendingConsultation(false)
    setIsConsultationOpen(false)
    setConsultationForm({
      name: "",
      email: "",
      phone: "",
      serviceType: "",
      budget: "",
      message: "",
    })
  }

  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSendingSchedule(true)

    const subject = "Schedule Consultation Request"
    const html = `
      <h2>${subject}</h2>
      <p><strong>Name:</strong> ${scheduleForm.name}</p>
      <p><strong>Email:</strong> ${scheduleForm.email}</p>
      <p><strong>Phone:</strong> ${scheduleForm.phone}</p>
      <p><strong>Preferred Date:</strong> ${scheduleForm.preferredDate}</p>
      <p><strong>Preferred Time:</strong> ${scheduleForm.preferredTime}</p>
      <p><strong>Service Type:</strong> ${scheduleForm.serviceType}</p>
      <p><strong>Message:</strong></p>
      <p>${scheduleForm.message}</p>
    `

    try {
      const res = await fetch("/api/contact/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: scheduleForm.name,
          email: scheduleForm.email,
          phone: scheduleForm.phone,
          subject,
          message: scheduleForm.message,
          html,
        }),
      })
      if (res.ok) {
        toast({
          title: "Consultation Scheduled!",
          description: "We'll confirm your appointment and send you the details via email.",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to schedule consultation.",
          variant: "destructive",
        })
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to schedule consultation.",
        variant: "destructive",
      })
    }
    setIsSendingSchedule(false)
    setIsScheduleOpen(false)
    setScheduleForm({
      name: "",
      email: "",
      phone: "",
      preferredDate: "",
      preferredTime: "",
      serviceType: "",
      message: "",
    })
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-gradient-to-r from-gray-600 to-gray-700 text-white anim-zoom-in">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-xl mb-8 text-gray-100">
              Let's discuss how we can bring your vision to life with our expert design and construction services.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center justify-center space-x-3">
                <Phone className="h-6 w-6" />
                <span>+91 9032172303</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Mail className="h-6 w-6" />
                <span>Neeomdesigns@gmail.com</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Calendar className="h-6 w-6" />
                <span>Schedule Consultation</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Dialog open={isConsultationOpen} onOpenChange={setIsConsultationOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-white text-gray-600 hover:bg-gray-100 px-8 py-3">
                    Get Free Consultation
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Free Consultation Request</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleConsultationSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          value={consultationForm.name}
                          onChange={(e) => setConsultationForm({ ...consultationForm, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={consultationForm.email}
                          onChange={(e) => setConsultationForm({ ...consultationForm, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={consultationForm.phone}
                        onChange={(e) => setConsultationForm({ ...consultationForm, phone: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="serviceType">Service Type</Label>
                        <Select
                          value={consultationForm.serviceType}
                          onValueChange={(value) => setConsultationForm({ ...consultationForm, serviceType: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="architectural">Architectural Design</SelectItem>
                            <SelectItem value="interior">Interior Design</SelectItem>
                            <SelectItem value="construction">Construction</SelectItem>
                            <SelectItem value="renovation">Renovation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                          <Label htmlFor="budget">Budget Range (in ₹)</Label>
                          <Select
                            value={consultationForm.budget}
                            onValueChange={(value) => setConsultationForm({ ...consultationForm, budget: value })}
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
                      <Label htmlFor="message">Project Details</Label>
                      <Textarea
                        id="message"
                        value={consultationForm.message}
                        onChange={(e) => setConsultationForm({ ...consultationForm, message: e.target.value })}
                        placeholder="Tell us about your project requirements..."
                        rows={3}
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSendingConsultation}>
                      {isSendingConsultation ? (
                        <Loader2 className="animate-spin h-4 w-4 mr-2 inline" />
                      ) : null}
                      Send Consultation Request
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>

              <Dialog open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-gray-600 px-8 py-3 bg-transparent"
                  >
                    Schedule Consultation
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Schedule Consultation</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleScheduleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          value={scheduleForm.name}
                          onChange={(e) => setScheduleForm({ ...scheduleForm, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={scheduleForm.email}
                          onChange={(e) => setScheduleForm({ ...scheduleForm, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={scheduleForm.phone}
                        onChange={(e) => setScheduleForm({ ...scheduleForm, phone: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="preferredDate">Preferred Date</Label>
                        <Input
                          id="preferredDate"
                          type="date"
                          value={scheduleForm.preferredDate}
                          onChange={(e) => setScheduleForm({ ...scheduleForm, preferredDate: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="preferredTime">Preferred Time</Label>
                        <Select
                          value={scheduleForm.preferredTime}
                          onValueChange={(value) => setScheduleForm({ ...scheduleForm, preferredTime: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="9am">9:00 AM</SelectItem>
                            <SelectItem value="10am">10:00 AM</SelectItem>
                            <SelectItem value="11am">11:00 AM</SelectItem>
                            <SelectItem value="2pm">2:00 PM</SelectItem>
                            <SelectItem value="3pm">3:00 PM</SelectItem>
                            <SelectItem value="4pm">4:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="serviceType">Service Type</Label>
                      <Select
                        value={scheduleForm.serviceType}
                        onValueChange={(value) => setScheduleForm({ ...scheduleForm, serviceType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="architectural">Architectural Design</SelectItem>
                          <SelectItem value="interior">Interior Design</SelectItem>
                          <SelectItem value="construction">Construction</SelectItem>
                          <SelectItem value="renovation">Renovation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="message">Additional Notes</Label>
                      <Textarea
                        id="message"
                        value={scheduleForm.message}
                        onChange={(e) => setScheduleForm({ ...scheduleForm, message: e.target.value })}
                        placeholder="Any specific requirements or questions..."
                        rows={3}
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSendingSchedule}>
                      {isSendingSchedule ? (
                        <Loader2 className="animate-spin h-4 w-4 mr-2 inline" />
                      ) : <Calendar className="h-4 w-4 mr-2" />}
                      Schedule Consultation
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
