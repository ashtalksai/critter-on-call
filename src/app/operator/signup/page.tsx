"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Loader2, CheckCircle } from "lucide-react";

export default function OperatorSignup() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    
    // Step 2: Business Info
    companyName: "",
    serviceArea: "",
    yearsExperience: "",
    
    // Step 3: Services
    services: [] as string[],
    priceRange: "",
    availability: "24/7",
  });

  const services = [
    { id: "raccoon", label: "Raccoon Removal", emoji: "🦝" },
    { id: "bat", label: "Bat Removal", emoji: "🦇" },
    { id: "squirrel", label: "Squirrel Removal", emoji: "🐿️" },
    { id: "snake", label: "Snake Removal", emoji: "🐍" },
    { id: "bird", label: "Bird Removal", emoji: "🐦" },
    { id: "opossum", label: "Opossum Removal", emoji: "🐀" },
    { id: "skunk", label: "Skunk Removal", emoji: "🦨" },
    { id: "other", label: "Other Wildlife", emoji: "🐾" },
  ];

  const toggleService = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(s => s !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    router.push("/operator/dashboard");
  };

  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-lg mx-auto">
        <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to home
        </Link>

        <Card className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-orange rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🦝</span>
            </div>
            <h1 className="text-2xl font-bold">Join as Operator</h1>
            <p className="text-muted-foreground">Get leads without marketing</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  s < step ? "bg-success text-white" :
                  s === step ? "bg-orange text-white" :
                  "bg-muted text-muted-foreground"
                }`}>
                  {s < step ? <CheckCircle className="w-5 h-5" /> : s}
                </div>
                {s < 3 && <div className={`w-8 h-0.5 ${s < step ? "bg-success" : "bg-muted"}`} />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>First Name</Label>
                    <Input
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <Input
                      placeholder="Smith"
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="john@wildlifepros.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label>Phone (for SMS alerts)</Label>
                  <Input
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>
              </>
            )}

            {/* Step 2: Business Info */}
            {step === 2 && (
              <>
                <div>
                  <Label>Company Name</Label>
                  <Input
                    placeholder="Wildlife Pros LLC"
                    value={formData.companyName}
                    onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label>Service Area (ZIP codes or city names)</Label>
                  <Textarea
                    placeholder="43201, 43202, Columbus, Dublin, Westerville"
                    value={formData.serviceArea}
                    onChange={(e) => setFormData(prev => ({ ...prev, serviceArea: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label>Years of Experience</Label>
                  <Input
                    type="number"
                    placeholder="5"
                    value={formData.yearsExperience}
                    onChange={(e) => setFormData(prev => ({ ...prev, yearsExperience: e.target.value }))}
                    required
                  />
                </div>
              </>
            )}

            {/* Step 3: Services */}
            {step === 3 && (
              <>
                <div>
                  <Label className="mb-3 block">What animals do you handle?</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {services.map((service) => (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => toggleService(service.id)}
                        className={`p-3 rounded-lg border-2 text-left transition-all ${
                          formData.services.includes(service.id)
                            ? "border-orange bg-orange-light"
                            : "border-border hover:border-orange/50"
                        }`}
                      >
                        <span className="mr-2">{service.emoji}</span>
                        <span className="text-sm">{service.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Typical Price Range</Label>
                  <Input
                    placeholder="$200-500"
                    value={formData.priceRange}
                    onChange={(e) => setFormData(prev => ({ ...prev, priceRange: e.target.value }))}
                    required
                  />
                </div>
              </>
            )}

            <div className="flex gap-3 pt-4">
              {step > 1 && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setStep(step - 1)}
                  className="flex-1"
                >
                  Back
                </Button>
              )}
              <Button 
                type="submit" 
                className="flex-1 btn-primary" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : step < 3 ? (
                  "Continue"
                ) : (
                  "Complete Registration"
                )}
              </Button>
            </div>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link href="/operator/login" className="text-orange hover:underline">
              Sign in
            </Link>
          </p>
        </Card>
      </div>
    </main>
  );
}
