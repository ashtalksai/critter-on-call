"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { MapPin, Camera, Loader2, ArrowLeft, AlertTriangle } from "lucide-react";

const animalTypes = [
  { id: "raccoon", label: "Raccoon", emoji: "🦝" },
  { id: "bat", label: "Bat", emoji: "🦇" },
  { id: "squirrel", label: "Squirrel", emoji: "🐿️" },
  { id: "snake", label: "Snake", emoji: "🐍" },
  { id: "bird", label: "Bird", emoji: "🐦" },
  { id: "opossum", label: "Opossum", emoji: "🐀" },
  { id: "skunk", label: "Skunk", emoji: "🦨" },
  { id: "other", label: "Other", emoji: "❓" },
];

export default function RequestPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [formData, setFormData] = useState({
    address: "",
    animalType: "",
    otherAnimal: "",
    urgency: "urgent",
    description: "",
    phone: "",
    email: "",
    photos: [] as File[],
  });

  const handleLocationDetect = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          // In production, reverse geocode this to an address
          const { latitude, longitude } = position.coords;
          // Mock address for demo
          setFormData(prev => ({
            ...prev,
            address: `Detected: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
          }));
          setIsLocating(false);
        },
        (error) => {
          console.error("Location error:", error);
          setIsLocating(false);
          alert("Could not detect location. Please enter address manually.");
        }
      );
    } else {
      setIsLocating(false);
      alert("Geolocation not supported. Please enter address manually.");
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...files].slice(0, 4) // Max 4 photos
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Store request data and redirect to matching screen
    const requestId = Math.random().toString(36).substring(7);
    localStorage.setItem(`request_${requestId}`, JSON.stringify({
      ...formData,
      id: requestId,
      status: "matching",
      createdAt: new Date().toISOString(),
    }));

    router.push(`/homeowner/dashboard?request=${requestId}`);
  };

  const isFormValid = formData.address && formData.animalType && formData.phone;

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-sm z-50 border-b">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="font-bold text-lg">Emergency Request</h1>
            <p className="text-sm text-muted-foreground">Get help in minutes</p>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Location */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="w-5 h-5 text-orange" />
              Where are you?
            </Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleLocationDetect}
                disabled={isLocating}
                className="flex-shrink-0"
              >
                {isLocating ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <MapPin className="w-4 h-4 mr-2" />
                )}
                {isLocating ? "Detecting..." : "Auto-detect"}
              </Button>
              <Input
                placeholder="Enter your address"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                className="flex-1"
              />
            </div>
          </div>

          {/* Animal Type */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold">What animal?</Label>
            <div className="grid grid-cols-4 gap-3">
              {animalTypes.map((animal) => (
                <button
                  key={animal.id}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, animalType: animal.id }))}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.animalType === animal.id
                      ? "border-orange bg-orange-light"
                      : "border-border hover:border-orange/50"
                  }`}
                >
                  <div className="text-3xl mb-1">{animal.emoji}</div>
                  <div className="text-sm font-medium">{animal.label}</div>
                </button>
              ))}
            </div>
            {formData.animalType === "other" && (
              <Input
                placeholder="Describe the animal"
                value={formData.otherAnimal}
                onChange={(e) => setFormData(prev => ({ ...prev, otherAnimal: e.target.value }))}
                className="mt-2"
              />
            )}
          </div>

          {/* Urgency */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange" />
              Urgency Level
            </Label>
            <RadioGroup
              value={formData.urgency}
              onValueChange={(value) => setFormData(prev => ({ ...prev, urgency: value }))}
              className="space-y-3"
            >
              <label
                className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  formData.urgency === "urgent"
                    ? "border-orange bg-orange-light"
                    : "border-border hover:border-orange/50"
                }`}
              >
                <RadioGroupItem value="urgent" className="mt-0.5" />
                <div>
                  <div className="font-semibold flex items-center gap-2">
                    URGENT
                    <Badge className="badge-urgent">Priority</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Animal inside, causing damage, or immediate threat
                  </p>
                </div>
              </label>
              <label
                className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  formData.urgency === "non-urgent"
                    ? "border-blue bg-blue-light"
                    : "border-border hover:border-blue/50"
                }`}
              >
                <RadioGroupItem value="non-urgent" className="mt-0.5" />
                <div>
                  <div className="font-semibold">NON-URGENT</div>
                  <p className="text-sm text-muted-foreground">
                    Outside, preventative, or can wait a few hours
                  </p>
                </div>
              </label>
            </RadioGroup>
          </div>

          {/* Photos */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold flex items-center gap-2">
              <Camera className="w-5 h-5 text-blue" />
              Photos <span className="text-muted-foreground font-normal">(optional but helpful)</span>
            </Label>
            <div className="flex flex-wrap gap-3">
              {formData.photos.map((file, index) => (
                <div key={index} className="w-20 h-20 rounded-lg bg-muted relative overflow-hidden">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({
                      ...prev,
                      photos: prev.photos.filter((_, i) => i !== index)
                    }))}
                    className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
              {formData.photos.length < 4 && (
                <label className="w-20 h-20 rounded-lg border-2 border-dashed border-border hover:border-orange cursor-pointer flex items-center justify-center transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    multiple
                  />
                  <Camera className="w-6 h-6 text-muted-foreground" />
                </label>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Add up to 4 photos to help operators assess the situation
            </p>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold">
              Additional Details <span className="text-muted-foreground font-normal">(optional)</span>
            </Label>
            <Textarea
              placeholder="Describe what's happening... (e.g., 'Raccoon has been in the attic for 2 days, scratching sounds at night')"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold">Your Contact Info</Label>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground">Phone (for SMS updates) *</Label>
                <Input
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">Email (for receipt)</Label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4">
            <Button
              type="submit"
              size="lg"
              disabled={!isFormValid || isSubmitting}
              className="w-full btn-primary text-lg py-6"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Dispatching to Operators...
                </>
              ) : (
                "Dispatch to Operators →"
              )}
            </Button>
            <p className="text-center text-sm text-muted-foreground mt-4">
              We&apos;ll SMS you when an operator accepts. Average response: 12 minutes.
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
