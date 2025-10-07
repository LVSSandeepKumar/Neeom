import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Loader } from "lucide-react";

// Define interface for static info
interface StaticInfo {
  key: string;
  value: string;
}

// Define interface for form data
interface FormData {
  [key: string]: string;
}

const ReviewManager: React.FC = () => {
  const [stats, setStats] = useState<StaticInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch stats on component mount
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/staticInfo");
      const data: StaticInfo[] = await response.json();
      if (response.ok) {
        setStats(data);
        // Initialize form data with current stats
        const initialFormData: FormData = data.reduce(
          (acc, item) => ({
            ...acc,
            [item.key]: item.value,
          }),
          {}
        );
        setFormData(initialFormData);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setError("Failed to fetch stats");
      }
    } catch (err) {
      setError("Error fetching stats");
    }
  };

  const handleInputChange = (key: string, value: string): void => {
    let validatedValue = value;

    // Validation rules
    if (key === "averageRating" || key === "clientSatisfaction") {
      // Allow only numbers and limit to 5
      validatedValue = value.replace(/[^0-9.]/g, "");
      const numValue = parseFloat(validatedValue);
      if (!isNaN(numValue) && numValue > 5) {
        validatedValue = "5";
      }
    } else if (key === "happyClients" || key === "repeatClients" || key === "recommendationRate") {
      // Allow only numbers (and optionally a percentage sign for repeatClients/recommendationRate)
      validatedValue = value.replace(/[^0-9%]/g, "");
      if (validatedValue.includes("%") && (key === "repeatClients" || key === "recommendationRate")) {
        const numValue = parseInt(validatedValue.replace("%", ""), 10);
        if (!isNaN(numValue) && numValue > 100) {
          validatedValue = "100%";
        }
      }
    }

    setFormData((prev) => ({ ...prev, [key]: validatedValue }));
  };

  const handleSubmit = async (): Promise<void> => {
    setError(null);
    setSuccess(null);

    // Validate all fields before submission
    const validationErrors = [];
    if (formData.averageRating) {
      const numValue = parseFloat(formData.averageRating);
      if (isNaN(numValue) || numValue > 5) {
        validationErrors.push("Average Rating must be a number between 0 and 5");
      }
    }
    if (formData.happyClients) {
      const numValue = parseInt(formData.happyClients, 10);
      if (isNaN(numValue)) {
        validationErrors.push("Happy Clients must be a number");
      }
    }
    if (formData.repeatClients) {
      const numValue = parseInt(formData.repeatClients.replace("%", ""), 10);
      if (isNaN(numValue)) {
        validationErrors.push("Repeat Clients must be a number");
      } else if (numValue > 100) {
        validationErrors.push("Repeat Clients must not exceed 100%");
      }
    }
    if (formData.recommendationRate) {
      const numValue = parseInt(formData.recommendationRate.replace("%", ""), 10);
      if (isNaN(numValue)) {
        validationErrors.push("Recommendation Rate must be a number");
      } else if (numValue > 100) {
        validationErrors.push("Recommendation Rate must not exceed 100%");
      }
    }

    if (validationErrors.length > 0) {
      setError(validationErrors.join(", "));
      return;
    }

    // Prepare data for API
    const payload: StaticInfo[] = Object.entries(formData).map(([key, value]) => ({
      key,
      value,
    }));

    try {
      const response = await fetch("/api/staticInfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const updatedStats: StaticInfo[] = await response.json();
        setSuccess("Stats updated successfully");
        setStats(updatedStats);
        setIsEditing(false);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to update stats");
      }
    } catch (err) {
      setError("Error updating stats");
    }
  };

  const statLabels: { [key: string]: string } = {
    clientSatisfaction: "Client Satisfaction ( Rate out of 5 )",
    averageRating: "Average Rating ( Rate out of 5 )",
    happyClients: "Happy Clients ( Number of happy clients until now )",
    repeatClients: "Repeat Clients ( Percentage of repeat clients % )",
    recommendationRate: "Recommendation Rate ( Percentage of recommendation % )",
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Review Manager</h2>

      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{success}</div>}

      {isEditing ? (
        <div className="space-y-4">
          {Object.entries(statLabels).map(([key, label]) => (
            <div key={key} className="flex flex-col">
              <Label className="font-medium">{label}</Label>
              <Input
                type="text"
                value={formData[key] || ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(key, e.target.value)}
                className="border rounded p-2 mt-1"
                placeholder={`Enter ${label}`}
              />
            </div>
          ))}
          <div className="flex space-x-2">
            <Button onClick={handleSubmit} className="btn-custom">
              Save Changes
            </Button>
            <Button onClick={() => setIsEditing(false)} variant={"outline"} className="btn-custom">
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {isLoading && [...Array(5)].map((_, index) => (
              <div className="bg-gray-100 p-4 rounded h-32 w-32 flex items-center justify-center">
                <Loader className="animate-spin size-8"/>
              </div>
            ))}
            {stats.map((stat) => {
              // Display only the headers without those descriptions in ()
              const displayLabel = statLabels[stat.key].split("(")[0].trim() || stat.key;
              return (
              <div key={stat.key} className="bg-gray-100 p-4 rounded">
                <h3 className="text-lg font-semibold">{displayLabel}</h3>
                <p className="text-2xl">{stat.value}</p>
              </div>
            )})}
          </div>
          <Button onClick={() => setIsEditing(true)} className="btn-custom">
            Edit Stats
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewManager;
