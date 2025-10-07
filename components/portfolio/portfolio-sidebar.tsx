"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Building2, Home, Sparkles, Send, Phone, Mail, MessageCircle } from "lucide-react"

interface PortfolioSidebarProps {
  selectedCategory: string
  selectedSubCategory: string
  onCategoryChange: (category: string) => void
  onSubCategoryChange: (subCategory: string) => void
}

export function PortfolioSidebar({
  selectedCategory,
  selectedSubCategory,
  onCategoryChange,
  onSubCategoryChange,
}: PortfolioSidebarProps) {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  })
  const { toast } = useToast()

  // Fetch categories from analytics API
  const [categories, setCategories] = useState<
    { name: string; icon: any; count: number; color: string }[]
  >([
    {
      name: "All Projects",
      icon: Sparkles,
      count: 0,
      color: "from-purple-500 to-pink-500",
    },
  ])

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await fetch("/api/analytics")
        if (res.ok) {
          const data = await res.json()
          // Map categories from analytics
          const catMap: Record<string, { icon: any; color: string }> = {
            Residential: { icon: Home, color: "from-blue-500 to-cyan-500" },
            Commercial: { icon: Building2, color: "from-emerald-500 to-teal-500" },
          }
          const cats = [
            {
              name: "All Projects",
              icon: Sparkles,
              count: data.portfolioProjects.totalCount,
              color: "from-purple-500 to-pink-500",
            },
            ...data.portfolioProjects.byCategory.map((cat: any) => ({
              name: cat.category,
              icon: catMap[cat.category]?.icon || Sparkles,
              count: cat.count,
              color: catMap[cat.category]?.color || "from-gray-500 to-gray-700",
            })),
          ]
          setCategories(cats)
        }
      } catch {
        setCategories([
          {
            name: "All Projects",
            icon: Sparkles,
            count: 0,
            color: "from-purple-500 to-pink-500",
          },
        ])
      }
    }
    fetchAnalytics()
  }, [])

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Here you would typically send the data to your backend/admin email
    console.log("Consultation request:", formData)

    toast({
      title: "Consultation Request Sent!",
      description:
        "We'll get back to you within 24 hours to discuss your project. Your request has been sent to our admin team.",
    })

    setIsConsultationOpen(false)
    setFormData({
      name: "",
      email: "",
      phone: "",
      projectType: "",
      budget: "",
      timeline: "",
      message: "",
    })
  }

  return (
    <div className="space-y-6">
      {/* Simplified Filter Card */}
      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-600 via-gray-700 to-gray-800 p-6">
          <CardTitle className="text-xl font-bold text-white flex items-center space-x-2">
            <Sparkles className="h-6 w-6" />
            <span>Browse Projects</span>
          </CardTitle>
          <p className="text-gray-200 text-sm mt-2">Discover our design excellence</p>
        </div>

        <CardContent className="p-6 space-y-3">
          {categories.map((category, index) => (
            <div key={category.name} className="space-y-2">
              {/* Main Category Button */}
              <div className="relative group">
                <Button
                  variant="ghost"
                  onClick={() => {
                    onCategoryChange(category.name)
                    onSubCategoryChange("")
                  }}
                  className={`w-full h-auto p-4 rounded-xl transition-all duration-300 ${
                    selectedCategory === category.name
                      ? "bg-gradient-to-r " + category.color + " text-white shadow-lg transform scale-[1.02]"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:shadow-md hover:transform hover:scale-[1.01]"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-lg ${
                          selectedCategory === category.name ? "bg-white/20" : "bg-gray-100 dark:bg-gray-800"
                        }`}
                      >
                        <category.icon
                          className={`h-5 w-5 ${
                            selectedCategory === category.name ? "text-white" : "text-gray-600 dark:text-gray-400"
                          }`}
                        />
                      </div>
                      <div className="text-left">
                        <div
                          className={`font-semibold ${
                            selectedCategory === category.name ? "text-white" : "text-gray-900 dark:text-white"
                          }`}
                        >
                          {category.name}
                        </div>
                        <div
                          className={`text-xs ${
                            selectedCategory === category.name ? "text-white/80" : "text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          {category.count} projects available
                        </div>
                      </div>
                    </div>
                    <Badge
                      className={`${
                        selectedCategory === category.name
                          ? "bg-white/20 text-white border-white/30"
                          : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {category.count}
                    </Badge>
                  </div>
                </Button>
              </div>

              {/* Elegant Separator */}
              {index < categories.length - 1 && (
                <div className="py-2">
                  <Separator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-700" />
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Stylish Stats Card */}
      {/* <Card className="border-0 shadow-xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-600 to-gray-700 p-4">
          <CardTitle className="text-lg font-bold text-white">Portfolio Overview</CardTitle>
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Total Projects", value: "8", color: "from-purple-500 to-pink-500" },
              { label: "Residential", value: "4", color: "from-blue-500 to-cyan-500" },
              { label: "Commercial", value: "4", color: "from-emerald-500 to-teal-500" },
              { label: "Featured", value: "2", color: "from-amber-500 to-orange-500" },
            ].map((stat, index) => (
              <div key={index} className="relative group">
                <div className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300 hover:transform hover:scale-105">
                  <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-medium mt-1">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card> */}

      {/* Premium Contact Card with Consultation Dialog */}
      <Card className="border-0 shadow-xl overflow-hidden">
        <div className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 p-6 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-600/20 to-transparent"></div>
          <div className="relative">
            <div className="flex items-center space-x-2 mb-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white">Start Your Dream Project</h3>
            </div>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              Transform your space with our award-winning design expertise. Let's create something extraordinary
              together.
            </p>

            {/* Contact Options */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-3 text-gray-300 text-sm">
                <Phone className="h-4 w-4" />
                <span>+91 9032172303</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 text-sm">
                <Mail className="h-4 w-4" />
                <span>Neeomdesigns@gmail.com</span>
              </div>
            </div>

            <Dialog open={isConsultationOpen} onOpenChange={setIsConsultationOpen}>
              <DialogTrigger asChild>
                <Button className="w-full bg-white text-gray-800 hover:bg-gray-100 font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Get Free Consultation
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                    <Sparkles className="h-6 w-6 text-gray-700" />
                    <span>Free Design Consultation</span>
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
                      <Label htmlFor="projectType">Project Type *</Label>
                      <Select
                        value={formData.projectType}
                        onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="residential">Residential</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="renovation">Renovation</SelectItem>
                          <SelectItem value="consultation">Design Consultation</SelectItem>
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
                    <Label htmlFor="message">Project Details (Optional)</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your project, space, style preferences, and any specific requirements..."
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-gray-700 hover:bg-gray-800 text-white py-3">
                    <Send className="h-4 w-4 mr-2" />
                    Send Consultation Request
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Card>
    </div>
  )
}
