"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Globe } from "lucide-react";

interface Partner {
  id: string;
  name: string;
  logo: string;
  website?: string;
  description?: string;
  isActive: boolean;
}

export function PartnersSection() {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    async function fetchPartners() {
      try {
        const res = await fetch("/api/partners");
        if (res.ok) {
          const data = await res.json();
          // Only show active partners
          setPartners(data.filter((p: Partner) => p.isActive));
        }
      } catch {
        setPartners([]);
      }
    }
    fetchPartners();
  }, []);

  // Show only first 6 partners
  const featuredPartners = partners.slice(0, 6);

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Trusted Partners
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Working with industry leaders to deliver excellence in design and construction
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 mb-8">
          {featuredPartners.map((partner : any) => (
            <Card key={partner.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="relative w-full h-32 mb-4">
                  <Image
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {partner.name}
                  </h3>
                  {partner.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {partner.description}
                    </p>
                  )}
                  {partner.website && (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                    >
                      <Globe className="h-4 w-4 mr-1" />
                      Visit Website
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* {partners.length > 6 && (
          <div className="text-center">
            <Link href="/partners">
              <Button className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-3">
                View All Partners
              </Button>
            </Link>
          </div>
        )} */}
      </div>
    </section>
  );
}
