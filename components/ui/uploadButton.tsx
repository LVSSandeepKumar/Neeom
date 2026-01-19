"use client"; // This component must be a client component
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { useRef, useState } from "react";
// import "@/styles/globals.css"

interface ImageUploadButtonProps {
  onUploadComplete?: (urls: string[]) => void; // Callback to pass URLs to parent
  multiple?: boolean; // Allow multiple file selection
}

const ImageUploadButton = ({ onUploadComplete, multiple = true }: ImageUploadButtonProps) => {
  const [progress, setProgress] = useState(0);
  const [urls, setUrls] = useState<string[]>([]); // State to store uploaded URLs
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert("Please select at least one file to upload");
      return;
    }

    const files = Array.from(fileInput.files);
    const newUrls: string[] = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const getSignUrlResponse = await fetch("/api/upload-url", {
          method: "POST",
          body: {
            fileName: file.name,
            contentType: file.type,
          },
        });

        if (!getSignUrlResponse.ok) throw new Error(`Upload failed: ${getSignUrlResponse.status}`);

        const { signedUrl } = await getSignUrlResponse.json();


        const uploadFileResponse = await fetch(signedUrl, {
          method: "PUT",
          headers: {
            "Content-Type": file.type,
          },
          body: file,
        });

        if (!uploadFileResponse.ok) throw new Error(`S3 Upload failed: ${uploadFileResponse.status}`);

        const location = signedUrl.split("?")[0]; 
        console.log("File uploaded successfully. Accessible at:", location);

        newUrls.push(location);
      } catch (err) {
        console.error("Upload error:", err);
      }
    }

    setUrls((prev) => {
      const updated = [...prev, ...newUrls];
      onUploadComplete?.(updated);
      return updated;
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input type="file" ref={fileInputRef} multiple={multiple} className="w-full" />
        {/* <Button type="button" onClick={handleUpload} className="btn-custom"> */}
        <Button type="button" onClick={handleUpload} className="btn-custom">
          Upload {multiple ? "Files" : "File"}
        </Button>
      </div>
      <div>
        <p className="text-sm font-medium mb-1">Upload progress</p>
        <Progress value={progress} className="w-full" />
      </div>
      {urls.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">Uploaded Images:</p>
          <ScrollArea className="h-[300px] w-full rounded-md border p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {urls.map((url, index) => (
                <Card key={index}>
                  <CardContent className="p-2">
                    <Image
                      src={url}
                      alt={`Uploaded image ${index + 1}`}
                      width={150}
                      height={150}
                      className="object-cover w-full h-[150px] rounded-md"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

// Example Parent Component
const ParentComponent = () => {
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  const handleUploadComplete = (urls: string[]) => {
    setUploadedUrls(urls);
    console.log("Parent received URLs:", urls);
  };

  return (
    <div>
      <h2>Image Upload Example</h2>
      <ImageUploadButton onUploadComplete={handleUploadComplete} multiple={true} />
      {uploadedUrls.length > 0 && (
        <div>
          <h3>URLs from Parent:</h3>
          <ul>
            {uploadedUrls.map((url, index) => (
              <li key={index}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export { ImageUploadButton, ParentComponent };

