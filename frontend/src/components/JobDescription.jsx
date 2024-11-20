import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  Users,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import Navbar from "./shared/Navbar";

export default function JobDescription() {
  // Dummy data for testing
  const dummyJob = {
    _id: "1",
    title: "Frontend Developer",
    position: 3,
    jobType: "Full-Time",
    salary: 15, // in LPA
    location: "New York, USA",
    experience: 2, // in years
    applications: [{ applicant: "user_1" }, { applicant: "user_2" }],
    createdAt: "2024-11-10T12:00:00Z",
    description:
      "We are looking for a skilled Frontend Developer to join our team. The ideal candidate will have experience in React and TypeScript.",
  };

  const dummyUser = {
    _id: "user_3",
    name: "John Doe",
  };

  const isInitiallyApplied = dummyJob.applications.some(
    (application) => application.applicant === dummyUser._id
  );

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = () => {
    if (!isApplied) {
      setIsApplied(true);
      toast.success("You have successfully applied for this job.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto my-10 px-4">
        <Card className="w-full">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl font-bold mb-2">
                  {dummyJob.title}
                </CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-blue-700">
                    <Briefcase className="w-4 h-4 mr-1" />
                    {dummyJob.position} Positions
                  </Badge>
                  <Badge variant="secondary" className="text-red-600">
                    <Clock className="w-4 h-4 mr-1" />
                    {dummyJob.jobType}
                  </Badge>
                  <Badge variant="secondary" className="text-purple-700">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {dummyJob.salary} LPA
                  </Badge>
                </div>
              </div>
              <Button
                onClick={isApplied ? undefined : applyJobHandler}
                disabled={isApplied}
                className={`rounded-lg ${
                  isApplied
                    ? "bg-gray-400"
                    : "bg-purple-600 hover:bg-purple-700"
                }`}
              >
                {isApplied ? "Already Applied" : "Apply Now"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b">
              Job Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                <span className="font-medium">Location:</span>
                <span className="ml-2">{dummyJob.location}</span>
              </div>
              <div className="flex items-center">
                <Briefcase className="w-5 h-5 mr-2 text-gray-500" />
                <span className="font-medium">Experience:</span>
                <span className="ml-2">{dummyJob.experience} years</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-gray-500" />
                <span className="font-medium">Salary:</span>
                <span className="ml-2">{dummyJob.salary} LPA</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-gray-500" />
                <span className="font-medium">Total Applicants:</span>
                <span className="ml-2">{dummyJob.applications.length}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                <span className="font-medium">Posted Date:</span>
                <span className="ml-2">
                  {new Date(dummyJob.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <h2 className="text-lg font-semibold mt-6 mb-2">Description</h2>
            <p className="text-gray-700">{dummyJob.description}</p>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="outline" onClick={() => window.history.back()}>
              Back to Jobs
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
