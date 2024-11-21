import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {APPLICATION_API_END_POINT , JOB_API_END_POINT } from "@/utils/constant";
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
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";

export default function JobDescription() {

  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true); 
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));  
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          ); 
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto my-10 px-4">
        <Card className="w-full">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl font-bold mb-2">
                  {singleJob?.title}
                </CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-blue-700">
                    <Briefcase className="w-4 h-4 mr-1" />
                    {singleJob?.position} Positions
                  </Badge>
                  <Badge variant="secondary" className="text-red-600">
                    <Clock className="w-4 h-4 mr-1" />
                    {singleJob?.jobType}
                  </Badge>
                  <Badge variant="secondary" className="text-purple-700">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {singleJob?.salary} LPA
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
                <span className="ml-2">{singleJob?.location}</span>
              </div>
              <div className="flex items-center">
                <Briefcase className="w-5 h-5 mr-2 text-gray-500" />
                <span className="font-medium">Experience:</span>
                <span className="ml-2">{singleJob?.experience} years</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-gray-500" />
                <span className="font-medium">Salary:</span>
                <span className="ml-2">{singleJob?.salary} LPA</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-gray-500" />
                <span className="font-medium">Total Applicants:</span>
                <span className="ml-2">{singleJob?.applications.length}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                <span className="font-medium">Posted Date:</span>
                <span className="ml-2">
                  {new Date(singleJob?.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <h2 className="text-lg font-semibold mt-6 mb-2">Description</h2>
            <p className="text-gray-700">{singleJob?.description}</p>
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
