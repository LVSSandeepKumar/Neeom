"use client";

import type React from "react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Users, ArrowLeft, Phone, MessageCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ImageCarousel } from "@/components/image-carousel";

interface ProjectDetailsProps {
  project?: {
    id: number;
    title: string;
    category: string;
    description: string;
    longDescription: string;
    images: string[];
    completionDate: string;
    location: string;
    area: string;
    team: { name: string; role: string }[];
    features: string[];
    client: string;
  };
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);

  // Default project with proper object structure for team
  const defaultProject = {
    id: 1,
    title: "Modern Residential Villa",
    category: "Residential",
    description: "A stunning modern villa with contemporary design elements",
    longDescription:
      "This project showcases our expertise in creating luxurious residential spaces that blend modern aesthetics with functional living. The villa features open-plan layouts, floor-to-ceiling windows, and sustainable design elements throughout.",
    images: ["/project-1.jpg", "/project-2.jpg", "/project-3.jpg"],
    completionDate: "2023",
    location: "Mumbai, India",
    area: "3,500 sq ft",
    team: [
      { name: "Sarah Johnson", role: "Lead Architect" },
      { name: "Mike Chen", role: "Interior Designer" },
      { name: "Emily Davis", role: "Project Manager" },
    ],
    features: [
      "Sustainable Materials",
      "Smart Home Integration",
      "Energy Efficient Design",
      "Luxury Finishes",
      "Landscaped Gardens",
    ],
    client: "Private Residence",
  };

  const currentProject = project || defaultProject;

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    const subject = "Project Contact Request";
    const html = `
      <h2>${subject}</h2>
      <p><strong>Name:</strong> ${contactForm.name}</p>
      <p><strong>Email:</strong> ${contactForm.email}</p>
      <p><strong>Phone:</strong> ${contactForm.phone}</p>
      <p><strong>Project Type:</strong> ${contactForm.projectType}</p>
      <p><strong>Budget:</strong> ${contactForm.budget}</p>
      <p><strong>Message:</strong></p>
      <p>${contactForm.message}</p>
    `;

    try {
      const res = await fetch("/api/contact/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          phone: contactForm.phone,
          subject,
          message: contactForm.message,
          html,
        }),
      });
      if (res.ok) {
        toast({
          title: "Contact Request Sent!",
          description: "We'll get back to you within 24 hours to discuss your project requirements.",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to send contact request.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to send contact request.",
        variant: "destructive",
      });
    }
    setIsSending(false);

    setIsContactOpen(false);
    setContactForm({
      name: "",
      email: "",
      phone: "",
      projectType: "",
      budget: "",
      message: "",
    });
  };

  const handleRequestQuote = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in a similar project to "${currentProject.title}". Can you provide a quote for my requirements?`
    );
    window.open(`https://wa.me/919032172303?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => router.back()} className="mb-6 hover:bg-gray-100 dark:hover:bg-gray-800">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Portfolio
        </Button>

        {/* Carousel */}
        <div className="mb-8 anim-slide-up">
          <ImageCarousel images={currentProject.images} title={currentProject.title} visibleItems={3} />
        </div>

        {/* Two-Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Title, Category, Description */}
          <Card className="mb-8 anim-slide-right">
            <CardContent className="p-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{currentProject.title}</h1>
              <Badge variant="secondary" className="mb-4">
                {currentProject.category}
              </Badge>
              <p className="text-gray-600 dark:text-gray-300 mb-6">{currentProject.longDescription}</p>

              {/* Features */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {currentProject.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Column: Project Details, Team, CTA */}
          <div className="space-y-6 anim-slide-left">
            {/* Project Details */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Project Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-orange-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
                      <p className="text-gray-900 dark:text-white">{currentProject.completionDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-orange-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                      <p className="text-gray-900 dark:text-white">{currentProject.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-orange-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Area</p>
                      <p className="text-gray-900 dark:text-white">{currentProject.area}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Project Team</h3>
                <div className="space-y-3">
                  {currentProject.team.length === 0 && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">No team members found.</p>
                  )}
                  {currentProject.team.map((member, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mr-3">
                        <Users className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <p className="text-gray-900 dark:text-white font-medium">
                          {typeof member === "object" ? member.name : member}
                        </p>
                        {typeof member === "object" && (
                          <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Interested in Similar Projects?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Get in touch with our team to discuss your project requirements.
                </p>
                <div className="space-y-3">
                  <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-orange-600 hover:bg-orange-700">
                        <Phone className="mr-2 h-4 w-4" />
                        Contact Us
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Contact Us for Similar Project</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleContactSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="name">Name *</Label>
                          <Input
                            id="name"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={contactForm.phone}
                            onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="projectType">Project Type</Label>
                            <Select
                              value={contactForm.projectType}
                              onValueChange={(value) => setContactForm({ ...contactForm, projectType: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="residential">Residential</SelectItem>
                                <SelectItem value="commercial">Commercial</SelectItem>
                                <SelectItem value="renovation">Renovation</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="budget">Budget Range</Label>
                            <Select
                              value={contactForm.budget}
                              onValueChange={(value) => setContactForm({ ...contactForm, budget: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select budget" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="under-50k">Under ₹50L</SelectItem>
                                <SelectItem value="50k-100k">₹50L - ₹1Cr</SelectItem>
                                <SelectItem value="100k-250k">₹1Cr - ₹2.5Cr</SelectItem>
                                <SelectItem value="over-250k">Over ₹2.5Cr</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            value={contactForm.message}
                            onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                            placeholder="Tell us about your project requirements..."
                            rows={3}
                          />
                        </div>
                        <Button type="submit" className="w-full" disabled={isSending}>
                          {isSending ? <Loader2 className="animate-spin h-4 w-4 mr-2 inline" /> : null}
                          Send Contact Request
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <Button onClick={handleRequestQuote} variant="outline" className="w-full bg-transparent">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Request Quote
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
