"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Phone, 
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Navigation,
  User,
  LogOut
} from "lucide-react";

// Mock data for incoming requests
const mockRequests = [
  {
    id: "req1",
    animal: "Raccoon",
    emoji: "🦝",
    urgency: "urgent",
    address: "1234 Main St, Columbus OH",
    distance: 2.3,
    submittedAgo: "3 min",
    estimatedPay: "$350-500",
    description: "Raccoon in chimney, scratching sounds for 2 days",
    hasPhotos: true,
  },
  {
    id: "req2",
    animal: "Bat",
    emoji: "🦇",
    urgency: "urgent",
    address: "567 Oak Ave, Dublin OH",
    distance: 4.1,
    submittedAgo: "8 min",
    estimatedPay: "$400-600",
    description: "Multiple bats in attic, need full removal",
    hasPhotos: false,
  },
  {
    id: "req3",
    animal: "Squirrel",
    emoji: "🐿️",
    urgency: "non-urgent",
    address: "890 Elm Rd, Westerville OH",
    distance: 6.5,
    submittedAgo: "15 min",
    estimatedPay: "$200-350",
    description: "Squirrel nest in garage rafters",
    hasPhotos: true,
  },
];

// Mock active job
const mockActiveJob = {
  id: "job1",
  animal: "Snake",
  emoji: "🐍",
  address: "222 Pine St, Columbus OH",
  customerName: "Sarah Johnson",
  customerPhone: "(555) 987-6543",
  acceptedAgo: "25 min",
  estimatedPay: "$250-400",
  status: "enroute",
};

export default function OperatorDashboard() {
  const [requests, setRequests] = useState(mockRequests);
  const [activeJob, setActiveJob] = useState(mockActiveJob);
  const [acceptedRequests, setAcceptedRequests] = useState<string[]>([]);
  const [declinedRequests, setDeclinedRequests] = useState<string[]>([]);

  const handleAccept = (requestId: string) => {
    setAcceptedRequests(prev => [...prev, requestId]);
    // In production, this would send an API request and SMS to homeowner
  };

  const handleDecline = (requestId: string) => {
    setDeclinedRequests(prev => [...prev, requestId]);
    setRequests(prev => prev.filter(r => r.id !== requestId));
  };

  const availableRequests = requests.filter(
    r => !acceptedRequests.includes(r.id) && !declinedRequests.includes(r.id)
  );

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-sm z-50 border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">🦝</span>
            </div>
            <div>
              <h1 className="font-bold text-lg">Operator Dashboard</h1>
              <p className="text-sm text-muted-foreground">Wildlife Pros • John Smith</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-success/10 text-success border-success/20">
              Online
            </Badge>
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <Tabs defaultValue="incoming" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-6">
            <TabsTrigger value="incoming" className="relative">
              Incoming
              {availableRequests.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-orange text-white w-5 h-5 p-0 flex items-center justify-center text-xs">
                  {availableRequests.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="active">
              Active
              {activeJob && (
                <Badge className="absolute -top-2 -right-2 bg-blue text-white w-5 h-5 p-0 flex items-center justify-center text-xs">
                  1
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          {/* Incoming Requests */}
          <TabsContent value="incoming" className="space-y-4">
            {availableRequests.length === 0 ? (
              <Card className="p-8 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">No Incoming Requests</h3>
                <p className="text-muted-foreground">
                  New requests in your area will appear here. Stay online to receive alerts.
                </p>
              </Card>
            ) : (
              availableRequests.map((request) => (
                <Card key={request.id} className="card-urgent">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge className={request.urgency === "urgent" ? "badge-urgent" : "badge-pending"}>
                        {request.urgency === "urgent" ? "URGENT" : "Standard"}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {request.submittedAgo} ago
                      </span>
                    </div>
                    {request.hasPhotos && (
                      <Badge variant="outline" className="text-xs">
                        📷 Photos
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{request.emoji}</span>
                    <div>
                      <h3 className="font-bold text-lg">{request.animal}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {request.address}
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {request.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Navigation className="w-4 h-4 text-blue" />
                        {request.distance} miles
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-orange">
                        <DollarSign className="w-4 h-4" />
                        {request.estimatedPay}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={() => handleAccept(request.id)}
                      className="bg-success hover:bg-success/90 text-white"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Accept Job
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleDecline(request.id)}
                      className="border-destructive text-destructive hover:bg-destructive/10"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Decline
                    </Button>
                  </div>

                  {acceptedRequests.includes(request.id) && (
                    <div className="mt-4 p-3 bg-success/10 rounded-lg">
                      <div className="flex items-center gap-2 text-success">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-semibold">Job Accepted!</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        SMS sent to homeowner with your contact info and ETA.
                      </p>
                    </div>
                  )}
                </Card>
              ))
            )}
          </TabsContent>

          {/* Active Jobs */}
          <TabsContent value="active" className="space-y-4">
            {activeJob ? (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge className="badge-enroute">En Route</Badge>
                  <span className="text-sm text-muted-foreground">
                    Accepted {activeJob.acceptedAgo} ago
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">{activeJob.emoji}</span>
                  <div>
                    <h3 className="font-bold text-xl">{activeJob.animal}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {activeJob.address}
                    </div>
                  </div>
                </div>

                <div className="bg-muted rounded-lg p-4 mb-4">
                  <h4 className="font-semibold mb-2">Customer</h4>
                  <p className="font-medium">{activeJob.customerName}</p>
                  <p className="text-muted-foreground">{activeJob.customerPhone}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Call Customer
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Text Customer
                  </Button>
                </div>

                <Button 
                  className="w-full bg-blue hover:bg-blue-hover"
                  onClick={() => setActiveJob({ ...activeJob, status: "arrived" })}
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Navigate to Location
                </Button>

                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Estimated Pay</p>
                      <p className="font-bold text-lg text-orange">{activeJob.estimatedPay}</p>
                    </div>
                    <Button
                      variant="outline"
                      className="border-success text-success hover:bg-success/10"
                      onClick={() => {
                        setActiveJob(null as any);
                        // In production, mark job as complete
                      }}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark Complete
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-8 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Navigation className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">No Active Jobs</h3>
                <p className="text-muted-foreground">
                  Accept a request to start working on a job.
                </p>
              </Card>
            )}
          </TabsContent>

          {/* History */}
          <TabsContent value="history" className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-3">
                <Badge className="bg-success/10 text-success border-success/20">Completed</Badge>
                <span className="text-sm text-muted-foreground">Yesterday</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🦝</span>
                <div>
                  <h3 className="font-semibold">Raccoon Removal</h3>
                  <p className="text-sm text-muted-foreground">456 Maple Dr, Columbus OH</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="font-bold text-success">$425</p>
                  <p className="text-sm text-muted-foreground">Paid</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-3">
                <Badge className="bg-success/10 text-success border-success/20">Completed</Badge>
                <span className="text-sm text-muted-foreground">2 days ago</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🦇</span>
                <div>
                  <h3 className="font-semibold">Bat Colony Removal</h3>
                  <p className="text-sm text-muted-foreground">789 Cedar Ln, Dublin OH</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="font-bold text-success">$550</p>
                  <p className="text-sm text-muted-foreground">Paid</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
