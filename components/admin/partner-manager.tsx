"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Globe } from "lucide-react";
import Image from "next/image";
import { ImageUploadButton } from "../ui/uploadButton";
import {
  Partner,
  CreatePartner,
  fetchPartners,
  createPartner,
  updatePartner,
  deletePartner,
} from "@/lib/api/partners";

export function PartnerManager() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState<CreatePartner>({
    name: "",
    logo: "",
    website: "",
    description: "",
    isActive: true,
  });

  useEffect(() => {
    loadPartners();
  }, []);

  const loadPartners = async () => {
    try {
      const data = await fetchPartners();
      setPartners(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load partners",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isEditing && editingPartner) {
        await updatePartner(editingPartner.id, formData);
        toast({
          title: "Success",
          description: "Partner updated successfully",
        });
      } else {
        await createPartner(formData);
        toast({
          title: "Success",
          description: "Partner created successfully",
        });
      }
      await loadPartners();
      resetForm();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save partner",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePartner(id);
      toast({
        title: "Success",
        description: "Partner deleted successfully",
      });
      await loadPartners();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete partner",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (partner: Partner) => {
    setEditingPartner(partner);
    setFormData({
      name: partner.name,
      logo: partner.logo,
      website: partner.website || "",
      description: partner.description || "",
      isActive: partner.isActive,
    });
    setIsEditing(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      logo: "",
      website: "",
      description: "",
      isActive: true,
    });
    setIsEditing(false);
    setEditingPartner(null);
  };

  const handleImageUpload = (urls: string[]) => {
    if (urls.length > 0) {
      setFormData({ ...formData, logo: urls[0] });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {isEditing ? "Edit Partner" : "Add New Partner"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Partner Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="website">Website URL</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                  placeholder="https://..."
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
              />
            </div>

            <div>
              <Label>Partner Logo *</Label>
              <ImageUploadButton
                onUploadComplete={handleImageUpload}
                multiple={false}
              />
              {formData.logo && (
                <div className="mt-2 relative w-40 h-20">
                  <Image
                    src={formData.logo}
                    alt="Logo Preview"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isActive: checked })
                }
              />
              <Label htmlFor="isActive">Active Partner</Label>
            </div>

            <div className="flex space-x-2">
              <Button type="submit" disabled={isLoading}>
                {isEditing ? "Update Partner" : "Add Partner"}
              </Button>
              {isEditing && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Partners ({partners.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {partners.map((partner) => (
              <Card key={partner.id}>
                <CardContent className="p-4">
                  <div className="relative w-full h-24 mb-4">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{partner.name}</h3>
                      {!partner.isActive && (
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          Inactive
                        </span>
                      )}
                    </div>
                    {partner.website && (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 flex items-center"
                      >
                        <Globe className="h-4 w-4 mr-1" />
                        Website
                      </a>
                    )}
                    {partner.description && (
                      <p className="text-sm text-gray-600">
                        {partner.description}
                      </p>
                    )}
                    <div className="flex space-x-2 mt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(partner)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(partner.id)}
                        className="text-red-500 border-red-500 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
