import React, { useState, useEffect } from "react";
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
import mockData from "../components/funds/Data.json";
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

const Funds = () => {
  // Separate states for events and transactions
  const [events, setEvents] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Pagination state for transactions
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      setIsLoading(true);
      
      // Validate and initialize mock data
      const validEvents = Array.isArray(mockData.events) ? mockData.events : [];
      const validTransactions = Array.isArray(mockData.transactions) ? mockData.transactions : [];
      
      // Initialize data
      setEvents(validEvents);
      setFilteredEvents(validEvents);
      setTransactions(validTransactions);
      
      // Use transactions directly for chart data instead of monthlyTransactions
      setChartData(validTransactions);
      
      // Calculate total pages
      const totalPagesCount = Math.max(1, Math.ceil(validTransactions.length / pageSize));
      setTotalPages(totalPagesCount);
      
      console.log("Data loaded:", { 
        eventsCount: validEvents.length,
        transactionsCount: validTransactions.length,
        calculatedPages: totalPagesCount
      });
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
      // Set default empty arrays in case of error
      setEvents([]);
      setFilteredEvents([]);
      setTransactions([]);
      setChartData([]);
      setTotalPages(1);
      setIsLoading(false);
    }
  }, []);

  // Update total pages when page size changes
  useEffect(() => {
    if (transactions.length > 0) {
      const newTotalPages = Math.max(1, Math.ceil(transactions.length / pageSize));
      setTotalPages(newTotalPages);
      
      // If current page is now out of bounds, adjust it
      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages);
      }
    }
  }, [transactions.length, pageSize]);

  // Event search handler
  const handleEventSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredEvents(events);
      return;
    }

    const filtered = events.filter((event) =>
      Object.values(event).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredEvents(filtered);
  };

  // Get paginated transactions with improved logic
  const getCurrentTransactions = () => {
    if (transactions.length === 0) return [];
    
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, transactions.length);
    
    return transactions.slice(startIndex, endIndex);
  };

  // Excel export functionality
  const exportToExcel = () => {
    try {
      // Prepare the data for export - use current page data
      const dataToExport = getCurrentTransactions().map(transaction => {
        return {
          'User': transaction.username,
          'Amount': `₹${(transaction.amount || 0).toLocaleString()}`,
          'Date': transaction.date 
            ? new Date(transaction.date).toLocaleDateString() 
            : "N/A"
        };
      });

      // Create a worksheet
      const worksheet = XLSX.utils.json_to_sheet(dataToExport);

      // Create a workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

      // Generate Excel file
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      
      // Save file
      const fileData = new Blob([excelBuffer], { type: 'application/octet-stream' });
      const fileName = `Transactions_Report_${new Date().toLocaleDateString().replace(/\//g, '-')}.xlsx`;
      saveAs(fileData, fileName);
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      alert("Failed to export data. Please try again.");
    }
  };

  // Pagination controls with validation
  const goToPage = (page) => {
    const validPage = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(validPage);
  };

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
          { title: "Total Funds", amount: "₹25,00,000", change: "+12%" },
          { title: "Allocated", amount: "₹18,50,000", change: "+8%" },
          { title: "Available", amount: "₹6,50,000", change: "-4%" },
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

      {/* Event Search */}
      <div className="flex justify-center mb-6">
        <DeBouncer
          onSearch={handleEventSearch}
          suggestions={filteredEvents}
          onSelectSuggestion={(event) => navigate(`/ngo/projects/${event.id}`)}
        />
      </div>

      {/* Chart - Pass transactions data directly */}
      <Chart data={chartData} />

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[#0d3320]">
            Recent Transactions
          </h2>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="py-10 text-center text-[#166856]">Loading transactions...</div>
          ) : transactions.length > 0 ? (
            <>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#166856]/10">
                    <th className="text-left py-3 px-4 text-[#166856]">User</th>
                    <th className="text-left py-3 px-4 text-[#166856]">Amount</th>
                    <th className="text-left py-3 px-4 text-[#166856]">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {getCurrentTransactions().map((transaction, index) => (
                    <tr
                      key={`${transaction.id}-${index}`}
                      className="border-b border-[#166856]/10 hover:bg-[#8df1e2]/5 transition-colors"
                    >
                      <td className="py-3 px-4 flex items-center gap-3">
                        <img
                          src={transaction.profileImage || "/api/placeholder/32/32"}
                          alt={transaction.username}
                          className="w-8 h-8 rounded-full"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/api/placeholder/32/32";
                          }}
                        />
                        {transaction.username}
                      </td>
                      <td className="py-3 px-4">
                        ₹{(transaction.amount || 0).toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        {transaction.date 
                          ? new Date(transaction.date).toLocaleDateString() 
                          : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                totalItems={transactions.length}
                onPageChange={goToPage}
                onPageSizeChange={setPageSize}
              />
            </>
          ) : (
            <div className="py-10 text-center text-[#166856]">No transaction data available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Funds;