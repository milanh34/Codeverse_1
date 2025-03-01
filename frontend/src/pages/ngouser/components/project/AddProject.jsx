import React from "react";
import { Calendar, MapPin, Users, Upload, Tag, AlertTriangle, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const AddEvent = ({ onClose }) => {
  return (
    <div className="p-6 space-y-6 bg-white rounded-lg max-w-3xl mx-auto shadow-lg">
      <h2 className="text-2xl font-bold text-[#166856]">Create New Event</h2>
      
      {/* Image Upload */}
      <div className="border-2 border-dashed border-[#8df1e2] rounded-xl p-8 text-center cursor-pointer hover:bg-[#8df1e2]/5 transition-colors">
        <Upload className="h-8 w-8 mx-auto text-[#166856] mb-2" />
        <p className="text-sm text-[#166856]">
          Drag and drop an image, or <span className="underline">browse</span>
        </p>
      </div>
      
      {/* Event Details Form */}
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2">
          <label className="text-sm font-medium text-[#0d3320]">
            Event Title
          </label>
          <Input className="mt-1" placeholder="Enter event title" />
        </div>
        
        <div>
          <label className="text-sm font-medium text-[#0d3320]">Date</label>
          <div className="relative mt-1">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-[#166856]" />
            <Input type="date" className="pl-10" />
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium text-[#0d3320]">Category</label>
          <div className="relative mt-1">
            <Tag className="absolute left-3 top-3 h-4 w-4 text-[#166856]" />
            <select className="w-full pl-10 pr-4 py-2 border rounded-md">
              <option>Fundraising</option>
              <option>Community</option>
              <option>Education</option>
              <option>Volunteering</option>
              <option>Other</option>
            </select>
          </div>
        </div>
        
        {/* Split Location Fields */}
        <div className="col-span-2 grid grid-cols-2 gap-4">
          <h3 className="col-span-2 text-sm font-medium text-[#0d3320] flex items-center">
            <MapPin className="h-4 w-4 text-[#166856] mr-2" />
            Location Details
          </h3>
          
          <div>
            <label className="text-xs text-[#0d3320]">Street Address</label>
            <Input className="mt-1" placeholder="Street address" />
          </div>
          
          <div>
            <label className="text-xs text-[#0d3320]">City</label>
            <Input className="mt-1" placeholder="City" />
          </div>
          
          <div>
            <label className="text-xs text-[#0d3320]">State</label>
            <Input className="mt-1" placeholder="State" />
          </div>
          
          <div>
            <label className="text-xs text-[#0d3320]">Pincode</label>
            <Input className="mt-1" type="number" placeholder="Pincode" />
          </div>
        </div>
        
        <div className="col-span-2">
          <label className="text-sm font-medium text-[#0d3320]">
            Description
          </label>
          <Textarea
            className="mt-1"
            placeholder="Describe your event"
            rows={4}
          />
        </div>
        
        <div>
          <label className="text-sm font-medium text-[#0d3320]">
            Expected Attendees
          </label>
          <div className="relative mt-1">
            <Users className="absolute left-3 top-3 h-4 w-4 text-[#166856]" />
            <Input
              type="number"
              className="pl-10"
              placeholder="Number of attendees"
            />
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium text-[#0d3320] flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            Emergency Event
          </label>
          <div className="relative mt-1">
            <select className="w-full px-4 py-2 border rounded-md">
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>
        </div>
        
        {/* Volunteer and Staff Allocation */}
        <div className="col-span-2 grid grid-cols-2 gap-4 pt-2 border-t">
          <h3 className="col-span-2 text-sm font-medium text-[#0d3320] flex items-center">
            <UserCheck className="h-4 w-4 text-[#166856] mr-2" />
            Volunteer & Staff Allocation
          </h3>
          
          <div>
            <label className="text-xs text-[#0d3320]">Volunteers Required</label>
            <Input className="mt-1" type="number" placeholder="Number of volunteers" />
          </div>
          
          <div>
            <label className="text-xs text-[#0d3320]">Staff Required</label>
            <Input className="mt-1" type="number" placeholder="Number of staff" />
          </div>
          
          <div className="col-span-2">
            <label className="text-xs text-[#0d3320]">Volunteer Skills Needed</label>
            <Textarea
              className="mt-1"
              placeholder="Describe skills required for volunteers"
              rows={2}
            />
          </div>
          
          <div className="col-span-2">
            <label className="text-xs text-[#0d3320]">Staff Responsibilities</label>
            <Textarea
              className="mt-1"
              placeholder="Describe staff responsibilities"
              rows={2}
            />
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-4">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button className="bg-[#166856] hover:bg-[#0d3320] text-white">
          Create Event
        </Button>
      </div>
    </div>
  );
};

export default AddEvent;