"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LogOut,
  BarChart3,
  FolderOpen,
  ImageIcon,
  Users,
  TrendingUp,
  Award,
  Sparkles,
  Activity,
  UserCheck,
  Plus,
  Edit,
  Settings,
  Presentation,
} from "lucide-react";
import { ProjectManager } from "./project-manager";
import { SliderManager } from "./slider-manager";
import { LeadershipManager } from "./leadership-manager";
import { GalleryManager } from "./gallery-manager";
import { fetchAnalytics, type AnalyticsData } from "@/lib/api/admin";
import ReviewManager from "./review-manager";
import { ChangePasswordDialog } from "./change-password-dialog";
import { PartnerManager } from "./partner-manager";

const DASHBOARD_HEADER_TABS = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "slider", label: "Hero Slider", icon: Presentation },
  { id: "leadership", label: "Team", icon: Users },
  { id: "reviews", label: "Reviews", icon: Users },
  { id: "partners", label: "Partners", icon: Users },
  // { id: "gallery", label: "Gallery", icon: ImageIcon },
];

export function AdminDashboard() {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const data = await fetchAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  const handleLogout = () => {
    logout();
  };

  const stats = [
    {
      title: "Portfolio Projects",
      value: analytics?.portfolioProjects.totalCount.toString() ?? "-",
      change: analytics ? `${analytics.portfolioProjects.lastMonthCount}+` : "-",
      icon: FolderOpen,
      gradient: "from-blue-500 to-blue-600",
      iconBg: "bg-blue-100 text-blue-600",
    },
    {
      title: "Hero Slides",
      value: analytics?.heroSlides.totalCount.toString() ?? "-",
      change: analytics ? `${analytics.heroSlides.lastMonthCount}+` : "-",
      icon: Presentation,
      gradient: "from-purple-500 to-purple-600",
      iconBg: "bg-purple-100 text-purple-600",
    },
    {
      title: "Team Members",
      value: analytics?.teamMembers.totalCount.toString() ?? "-",
      change: analytics ? `${analytics.teamMembers.lastMonthCount}+` : "-",
      icon: UserCheck,
      gradient: "from-amber-500 to-amber-600",
      iconBg: "bg-amber-100 text-amber-600",
    },
  ];

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      );
    }

    switch (activeTab) {
      case "projects":
        return <ProjectManager />;
      case "slider":
        return <SliderManager />;
      case "leadership":
        return <LeadershipManager />;
      case "gallery":
        return <GalleryManager />;
      case "reviews":
        return <ReviewManager />;
      case "partners":
        return <PartnerManager />;
      default:
        return (
          <div className="space-y-8">
            {/* Welcome Banner */}
            <Card className="border-0 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 p-8 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-white mb-2">NEEOM Designs Admin</h1>
                      <p className="text-gray-300">Manage your portfolio projects and hero slider content</p>
                    </div>
                    <div className="hidden md:flex items-center space-x-2">
                      <Award className="h-8 w-8 text-yellow-400" />
                      <div className="text-right">
                        <p className="text-white font-semibold">Excellence</p>
                        <p className="text-gray-300 text-sm">Since 2009</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className={`relative overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-lg bg-gradient-to-r ${stat.gradient}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/80 text-sm font-medium">{stat.title}</p>
                        <p className="text-3xl font-bold text-white">{stat.value}</p>
                        <div className="flex items-center mt-2">
                          <TrendingUp className="h-4 w-4 text-green-300 mr-1" />
                          <span className="text-green-300 text-sm font-medium">{stat.change}</span>
                        </div>
                      </div>
                      <div className={`p-3 rounded-full ${stat.iconBg} shadow-lg`}>
                        <stat.icon className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-white/20 to-white/40" />
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
                <CardTitle className="flex items-center text-gray-800">
                  <Settings className="w-5 h-5 mr-2" />
                  Content Management
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <Button
                    onClick={() => setActiveTab("projects")}
                    className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                  >
                    <FolderOpen className="h-6 w-6" />
                    <span className="text-sm font-medium">Portfolio Projects</span>
                  </Button>
                  <Button
                    onClick={() => setActiveTab("slider")}
                    className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
                  >
                    <Presentation className="h-6 w-6" />
                    <span className="text-sm font-medium">Hero Slider</span>
                  </Button>
                  <Button
                    onClick={() => setActiveTab("leadership")}
                    className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white"
                  >
                    <Users className="h-6 w-6" />
                    <span className="text-sm font-medium">Team Management</span>
                  </Button>
                  {/* <Button
                    onClick={() => setActiveTab("gallery")}
                    className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
                  >
                    <ImageIcon className="h-6 w-6" />
                    <span className="text-sm font-medium">Gallery</span>
                  </Button> */}
                  <Button
                    onClick={() => setActiveTab("reviews")}
                    className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
                  >
                    <ImageIcon className="h-6 w-6" />
                    <span className="text-sm font-medium">Reviews</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            {/* <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
                <CardTitle className="flex items-center text-gray-800">
                  <Activity className="w-5 h-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                    >
                      <div className={`p-2 rounded-full ${activity.iconBg} shadow-sm`}>
                        <activity.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-2">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card> */}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Enhanced Header */}
      <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Company Branding */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full blur-sm"></div>
                  <div className="relative bg-gradient-to-br from-gray-100 to-white rounded-full p-2 border border-gray-200 shadow-sm">
                    <Image src="/logo-neeom.png" alt="NEEOM Logo" width={40} height={40} className="object-contain" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800 tracking-wide">NEEOM</h1>
                  <p className="text-sm font-light text-gray-600 tracking-widest">DESIGN STUDIO</p>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-2 ml-4">
                <Badge className="bg-gradient-to-r from-gray-600 to-gray-700 text-white border-0">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Admin Portal
                </Badge>
              </div>
            </div>

            {/* User Info & Actions */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-700">Welcome back,</p>
                  <p className="text-xs text-gray-500 capitalize">admin</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {/* {user?.charAt(0).toUpperCase()} */}A
                </div>
              </div>
              <ChangePasswordDialog />
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 bg-transparent"
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Tab Navigation */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-2">
            <nav className={`grid w-full grid-cols-6 bg-gray-50 rounded-lg p-1`}>
              {DASHBOARD_HEADER_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all duration-200 ${
                    activeTab === tab.id ? "bg-white shadow-sm text-blue-600" : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="hidden sm:inline text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        {renderContent()}
      </main>
    </div>
  );
}
