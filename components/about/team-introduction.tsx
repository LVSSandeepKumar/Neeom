"use client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

export function TeamIntroduction() {
  const [teamMembers, setTeamMembers] = useState<
    { fullName: string; role: string; profileImage: string; description: string }[]
  >([]);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const res = await fetch("/api/team-members");
        if (res.ok) {
          const data = await res.json();
          setTeamMembers(data);
        }
      } catch {
        setTeamMembers([]);
      }
    }
    fetchMembers();
  }, []);

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Meet Our Team</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our talented professionals bring diverse expertise and passion to every project
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src={member.profileImage || "/placeholder.svg"}
                    alt={member.fullName}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{member.fullName}</h3>
                <p className="text-gray-600 font-medium mb-3">{member.role}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}