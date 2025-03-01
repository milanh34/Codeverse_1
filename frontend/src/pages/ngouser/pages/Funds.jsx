import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SERVER } from "@/config/constant";
import {
  IndianRupee,
  Download,
  Filter,
  ChevronRight,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Chart from "../components/funds/Chart";
import DeBouncer from "../components/funds/DeBouncer";
import { useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PaginationControls = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}) => {
  // Calculate for display, making sure values are valid
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);
  
  return (
    <div className="mt-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm text-[#166856]">Rows per page:</span>
        <Select
          value={pageSize.toString()}
          onValueChange={(value) => {
            const newSize = Number(value);
            onPageSizeChange(newSize);
          }}
        >
          <SelectTrigger className="w-[70px]">
            <SelectValue placeholder={pageSize} />
          </SelectTrigger>
          <SelectContent>
            {[10, 20, 30, 50].map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-[#166856]">
          {totalItems === 0 ? "0-0" : `${startItem}-${endItem}`} of {totalItems}
        </span>
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1 || totalItems === 0}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1 || totalItems === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalItems === 0}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages || totalItems === 0}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const Funds = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Fetch NGO complete details
  const { data: ngoDetails, isLoading } = useQuery({
    queryKey: ["ngoCompleteDetails"],
    queryFn: async () => {
      const response = await fetch(`${SERVER}/api/ngo/complete-details`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch NGO details");
      }
      const data = await response.json();
      return data.ngoDetails;
    },
  });

  // Add exportToExcel function
  const exportToExcel = () => {
    try {
      // Prepare the data for export - use all donations
      const dataToExport = ngoDetails?.recentDonations?.map(donation => {
        return {
          'Donor': donation.user.name,
          'Amount': `₹${donation.amount.toLocaleString()}`,
          'Date': new Date(donation.createdAt).toLocaleDateString(),
          'Order ID': donation.orderId
        };
      }) || [];

      // Create a worksheet
      const worksheet = XLSX.utils.json_to_sheet(dataToExport);

      // Create a workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Donations");

      // Generate Excel file
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      
      // Save file
      const fileData = new Blob([excelBuffer], { type: 'application/octet-stream' });
      const fileName = `Donations_Report_${new Date().toLocaleDateString().replace(/\//g, '-')}.xlsx`;
      saveAs(fileData, fileName);

      toast.success('Report exported successfully');
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      toast.error("Failed to export data. Please try again.");
    }
  };

  // Calculate total pages for donations
  const totalPages = Math.ceil((ngoDetails?.recentDonations?.length || 0) / pageSize);

  // Get current page donations
  const getCurrentDonations = () => {
    if (!ngoDetails?.recentDonations) return [];
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return ngoDetails.recentDonations.slice(startIndex, endIndex);
  };

  // Calculate allocated and available funds
  const totalFunds = ngoDetails?.totalFunds || 0;
  const allocatedFunds = ngoDetails?.events?.reduce((sum, event) => sum + (event.allocatedFund || 0), 0) || 0;
  const availableFunds = totalFunds - allocatedFunds;

  // Chart data preparation
  const chartData = ngoDetails?.recentDonations?.map(donation => ({
    amount: donation.amount,
    date: new Date(donation.createdAt).toLocaleDateString(),
    user: donation.user.name
  })) || [];

  return (
    <div className="p-6 space-y-6">
      {/* Header section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#0d3320]">
            Funds Management
          </h1>
          <p className="text-[#166856]">
            Track and manage your organization's funds
          </p>
        </div>
        <Button 
          className="bg-[#166856] hover:bg-[#0d3320] text-white rounded-xl px-6"
          onClick={exportToExcel}
        >
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { 
            title: "Total Funds", 
            amount: `₹${totalFunds.toLocaleString()}`,
            change: "+12%" // You might want to calculate this
          },
          { 
            title: "Allocated", 
            amount: `₹${allocatedFunds.toLocaleString()}`,
            change: "+8%" 
          },
          { 
            title: "Available", 
            amount: `₹${availableFunds.toLocaleString()}`,
            change: availableFunds >= 0 ? "+4%" : "-4%" 
          },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-[#166856]">{stat.title}</p>
                <h3 className="text-2xl font-bold text-[#0d3320] mt-1">
                  {stat.amount}
                </h3>
              </div>
              <span
                className={`text-sm ${stat.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}
              >
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Events List */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-[#0d3320] mb-4">Recent Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ngoDetails?.recentEvents?.map((event) => (
            <div key={event._id} className="border p-4 rounded-lg">
              <h3 className="font-semibold">{event.name}</h3>
              <p className="text-sm text-gray-600">{event.description}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-sm text-[#166856]">
                  Allocated: ₹{event.allocatedFund?.toLocaleString()}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(event.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart */}
      <Chart data={chartData} />

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[#0d3320]">
            Recent Donations
          </h2>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="py-10 text-center text-[#166856]">Loading donations...</div>
          ) : getCurrentDonations().length > 0 ? (
            <>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#166856]/10">
                    <th className="text-left py-3 px-4 text-[#166856]">Donor</th>
                    <th className="text-left py-3 px-4 text-[#166856]">Amount</th>
                    <th className="text-left py-3 px-4 text-[#166856]">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {getCurrentDonations().map((donation) => (
                    <tr
                      key={donation._id}
                      className="border-b border-[#166856]/10 hover:bg-[#8df1e2]/5 transition-colors"
                    >
                      <td className="py-3 px-4 flex items-center gap-3">
                        <img
                          src={donation.user.profile_image}
                          alt={donation.user.name}
                          className="w-8 h-8 rounded-full"
                        />
                        {donation.user.name}
                      </td>
                      <td className="py-3 px-4">
                        ₹{donation.amount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        {new Date(donation.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                totalItems={ngoDetails?.recentDonations?.length || 0}
                onPageChange={setCurrentPage}
                onPageSizeChange={setPageSize}
              />
            </>
          ) : (
            <div className="py-10 text-center text-[#166856]">No donations available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Funds;