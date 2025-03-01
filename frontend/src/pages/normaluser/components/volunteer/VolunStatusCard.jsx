import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const VolunStatusCard = ({ activities = [] }) => {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">
        Your Volunteer Status
      </h2>

      {activities.length === 0 ? (
        <Card className="p-6 text-center text-muted-foreground">
          <p>You haven't registered for any volunteer events yet.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <Card
              key={activity.id}
              className={cn(
                "relative overflow-hidden",
                activity.status === "Confirmed"
                  ? "border-l-4 border-l-green-500"
                  : "border-l-4 border-l-yellow-500"
              )}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">{activity.event}</h3>
                  <Badge
                    variant={
                      activity.status === "Confirmed" ? "success" : "warning"
                    }
                  >
                    {activity.status === "Confirmed" ? (
                      <CheckCircle className="w-4 h-4 mr-1" />
                    ) : (
                      <Clock className="w-4 h-4 mr-1" />
                    )}
                    {activity.status}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {activity.date}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {activity.location}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    {activity.participants} participants
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default VolunStatusCard;
