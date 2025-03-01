import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SERVER } from "@/config/constant";
import { Loader2, CheckCircle2, XCircle, Users } from "lucide-react";
import { toast } from "react-hot-toast";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

const RequestDialog = ({ eventId, open, onOpenChange }) => {
  const queryClient = useQueryClient();

  // Fetch requests for the event
  const { data: requests, isLoading } = useQuery({
    queryKey: ["eventRequests", eventId],
    queryFn: async () => {
      console.log(eventId);
      const response = await fetch(
        `${SERVER}/api/ngo/event/${eventId}/requests`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      // Filter only pending requests
      return data.requests.filter((request) => request.status === "pending");
    },
    enabled: !!eventId && open,
  });

  // Handle request mutation
  const { mutate: handleRequest, isPending: isHandlingRequest } = useMutation({
    mutationFn: async ({ requestId, action }) => {
      const response = await fetch(
        `${SERVER}/api/ngo/volunteer-request/${requestId}/${action}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    },
    onSuccess: () => {
      toast.success("Request handled successfully");
      queryClient.invalidateQueries({ queryKey: ["eventRequests", eventId] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white border-0">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-xl font-semibold text-[#0d3320]">
            Pending Volunteer Requests
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin h-8 w-8 rounded-full border-2 border-[#166856] border-t-transparent" />
            </div>
          ) : !requests?.length ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 mx-auto text-gray-300 mb-2" />
              <p className="text-gray-500">No pending requests</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {requests.map((request) => (
                <div
                  key={request._id}
                  className="bg-gray-50 rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-[#166856]/20">
                      <AvatarImage src={request.user.profile_image} />
                      <AvatarFallback className="bg-[#166856] text-white">
                        {request.user.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium text-[#0d3320]">
                        {request.user.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {format(new Date(request.createdAt), "PPp")}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                      onClick={() =>
                        handleRequest({
                          requestId: request._id,
                          action: "accept",
                        })
                      }
                      disabled={isHandlingRequest}
                    >
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() =>
                        handleRequest({
                          requestId: request._id,
                          action: "reject",
                        })
                      }
                      disabled={isHandlingRequest}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Add this to your global CSS
const styles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #166856;
    border-radius: 3px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #0d3320;
  }
`;

export default RequestDialog;
