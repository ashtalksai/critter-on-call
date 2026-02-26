"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Phone, MessageSquare, Star, MapPin, Clock, CheckCircle } from "lucide-react";

// Mock operator data
const mockOperator = {
  name: "John Smith",
  company: "Wildlife Pros",
  rating: 4.9,
  jobsCompleted: 127,
  phone: "(555) 123-4567",
  photo: null,
  estimatedCost: "$350-500",
};

function DashboardContent() {
  const searchParams = useSearchParams();
  const requestId = searchParams.get("request");
  
  const [status, setStatus] = useState<"matching" | "accepted" | "enroute" | "arrived" | "completed">("matching");
  const [eta, setEta] = useState(12); // minutes
  const [matchingProgress, setMatchingProgress] = useState(0);

  // Simulate matching process
  useEffect(() => {
    if (status === "matching") {
      const interval = setInterval(() => {
        setMatchingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setStatus("accepted");
            setTimeout(() => setStatus("enroute"), 2000);
            return 100;
          }
          return prev + 20;
        });
      }, 500);
      return () => clearInterval(interval);
    }
  }, [status]);

  // Simulate ETA countdown
  useEffect(() => {
    if (status === "enroute" && eta > 0) {
      const interval = setInterval(() => {
        setEta(prev => {
          if (prev <= 1) {
            setStatus("arrived");
            return 0;
          }
          return prev - 1;
        });
      }, 60000); // Update every minute in production
      
      // For demo, update faster
      const demoInterval = setInterval(() => {
        setEta(prev => Math.max(0, prev - 1));
      }, 5000);
      
      return () => {
        clearInterval(interval);
        clearInterval(demoInterval);
      };
    }
  }, [status, eta]);

  const isImminent = eta <= 5 && status === "enroute";

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-sm z-50 border-b">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="font-bold text-lg">Request Status</h1>
            <p className="text-sm text-muted-foreground">ID: {requestId || "demo"}</p>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Matching State */}
        {status === "matching" && (
          <Card className="p-8 text-center">
            <div className="w-20 h-20 bg-orange/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <span className="text-4xl">🦝</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Finding Operators...</h2>
            <p className="text-muted-foreground mb-6">
              Sending SMS to wildlife removal operators in your area
            </p>
            <div className="w-full bg-muted rounded-full h-2 mb-4">
              <div 
                className="bg-orange h-2 rounded-full transition-all duration-500"
                style={{ width: `${matchingProgress}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {matchingProgress < 100 ? "Contacting 5 operators within 25 miles..." : "Match found!"}
            </p>
          </Card>
        )}

        {/* Operator Assigned / En Route */}
        {(status === "accepted" || status === "enroute" || status === "arrived") && (
          <div className="space-y-6">
            {/* Status Banner */}
            <Card className={`p-6 ${status === "arrived" ? "bg-success/10 border-success" : "bg-blue-light border-blue"}`}>
              <div className="flex items-center gap-3">
                {status === "arrived" ? (
                  <CheckCircle className="w-8 h-8 text-success" />
                ) : (
                  <Clock className="w-8 h-8 text-blue" />
                )}
                <div>
                  <h2 className="font-bold text-xl">
                    {status === "accepted" && "Operator Assigned!"}
                    {status === "enroute" && "Operator En Route"}
                    {status === "arrived" && "Operator Has Arrived!"}
                  </h2>
                  <p className="text-muted-foreground">
                    {status === "arrived" 
                      ? "Help is here. The operator will contact you." 
                      : "Help is on the way"}
                  </p>
                </div>
              </div>
            </Card>

            {/* ETA Countdown */}
            {status === "enroute" && (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground mb-2">Estimated Arrival</p>
                <div className={`eta-countdown ${isImminent ? "imminent" : ""}`}>
                  {eta}
                </div>
                <p className="text-xl text-muted-foreground">minutes</p>
                {isImminent && (
                  <Badge className="badge-enroute mt-4">
                    Almost There!
                  </Badge>
                )}
              </Card>
            )}

            {/* Operator Card */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-blue/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">👷</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg">{mockOperator.name}</h3>
                    <Badge className="bg-success/10 text-success border-success/20">Verified</Badge>
                  </div>
                  <p className="text-muted-foreground">{mockOperator.company}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-warning fill-warning" />
                      <span className="font-semibold">{mockOperator.rating}</span>
                      <span className="text-muted-foreground text-sm">
                        ({mockOperator.jobsCompleted} jobs)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Call
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Text
                </Button>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Estimated Cost</p>
                  <p className="font-bold text-lg text-blue">{mockOperator.estimatedCost}</p>
                </div>
                <p className="text-sm text-muted-foreground">Pay after completion</p>
              </div>
            </Card>

            {/* Location Card */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-orange" />
                <h3 className="font-semibold">Your Location</h3>
              </div>
              <div className="bg-muted rounded-lg h-48 flex items-center justify-center">
                <p className="text-muted-foreground">
                  Map view would show operator location here
                </p>
              </div>
            </Card>
          </div>
        )}

        {/* Completed State */}
        {status === "completed" && (
          <Card className="p-8 text-center">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Job Complete!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for using Critter On Call
            </p>
            <Link href="/">
              <Button className="btn-primary">Back to Home</Button>
            </Link>
          </Card>
        )}
      </div>
    </main>
  );
}

export default function HomeownerDashboard() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </main>
    }>
      <DashboardContent />
    </Suspense>
  );
}
