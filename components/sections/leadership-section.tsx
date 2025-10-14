"use client";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function LeadershipSection() {
  const [leaders, setLeaders] = useState<
    { id: string; fullName: string; role: string; description: string; profileImage: string }[]
  >([]);
  useEffect(() => {
    async function fetchLeaders() {
      try {
        const res = await fetch("/api/team-members");
        if (res.ok) {
          const data = await res.json();
          setLeaders(data);
        }
      } catch {
        setLeaders([]);
      }
    }
    fetchLeaders();
  }, []);

  // Show only first 3 members
  const topLeaders = leaders.slice(0, 3);

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 anim-slide-up">
            Our Leadership Team
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto anim-slide-up">
            Meet the experienced professionals who lead our design and construction teams
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {topLeaders.map((leader, index) => (
            <Card
              key={leader.id}
              className="text-center hover:shadow-lg transition-shadow duration-300 anim-slide-up"
              style={{ "--index": index }}
            >
              <CardContent className="p-6">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src={leader.profileImage || "/placeholder.svg"}
                    alt={leader.fullName}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{leader.fullName}</h3>
                <p className="text-gray-600 font-medium mb-3">{leader.role}</p>
                <p className="text-gray-600 dark:text-gray-300">{leader.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/about">
            <Button className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-3">Know More About Our Team</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
