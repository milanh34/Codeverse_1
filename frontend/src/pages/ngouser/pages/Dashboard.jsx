import React, { useState, useEffect } from "react";
import {
  Users,
  TrendingUp,
  Package,
  AlertCircle,
  ExternalLink,
  ArrowRight,
  IndianRupee,
  Calendar,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ScrollArea } from "@/components/ui/scroll-area";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";

const NewsCard = ({ news }) => (
  <div
    className="p-4 bg-gradient-to-r from-[#8df1e2]/5 to-transparent hover:from-[#8df1e2]/10 
    hover:to-transparent transition-colors rounded-lg"
  >
    <div className="flex items-start gap-3">
      <div className="w-16 h-16 rounded-lg overflow-hidden">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-[#0d3320] line-clamp-2">
          {news.title}
        </h4>
        <p className="text-sm text-[#166856] mt-1">{news.date}</p>
      </div>
    </div>
  </div>
);

const ScrollableCard = ({ title, viewAllText, children, height = "400px" }) => (
  <Card className="p-6 border-[#8df1e2]/20 bg-white/50 backdrop-blur-sm shadow-xl shadow-[#166856]/10">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-[#0d3320]">{title}</h2>
      <Button
        variant="link"
        className="text-[#166856] hover:text-[#0d3320] font-medium flex items-center gap-2"
      >
        {viewAllText} <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
    <ScrollArea 
      className={`h-[${height}] pr-4 overflow-auto custom-scrollbar`}
      style={{
        '--scrollbar-width': '8px',
        '--scrollbar-track': 'rgba(141, 241, 226, 0.1)',
        '--scrollbar-thumb': 'rgba(22, 104, 86, 0.2)',
      }}
    >
      <div className="space-y-4">
        {children}
      </div>
    </ScrollArea>
  </Card>
);

const mockNewsData = [
  {
    id: '1',
    title: 'Local NGO Launches Environmental Initiative',
    description: 'Community-based organization starts new recycling program',
    date: '2024-02-20',
    source: 'Environmental News',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3',
  },
  {
    id: '2',
    title: 'NGO Partners with Government for Education Program',
    description: 'New partnership aims to improve rural education access',
    date: '2024-02-19',
    source: 'Education Weekly',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3',
  },
  {
    id: '3',
    title: 'Community Engagement: Best Practices for NGOs',
    description: 'New guidelines for community engagement released',
    date: '2024-02-18',
    source: 'NGO Times',
    image: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-4.0.3',
  }
];

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalDonations: 0,
    activeProjects: 0,
    beneficiaries: 0,
    pendingRequests: 0,
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);

  const mockChartData = [
    { month: "Jan", donations: 4000, projects: 5 },
    { month: "Feb", donations: 3000, projects: 4 },
    { month: "Mar", donations: 5000, projects: 7 },
    { month: "Apr", donations: 2780, projects: 3 },
    { month: "May", donations: 6890, projects: 8 },
    { month: "Jun", donations: 2390, projects: 4 },
  ];

  const mockProjects = [
    {
      id: 1,
      name: "Education Initiative",
      progress: 75,
      raised: 150000,
      goal: 200000,
      deadline: "2024-03-15",
    },
    {
      id: 2,
      name: "Healthcare Program",
      progress: 45,
      raised: 90000,
      goal: 200000,
      deadline: "2024-04-01",
    },
    // Add more projects...
  ];

  const mockNews = [
    {
      title: "New Government Initiative for NGO Funding",
      date: "1 hour ago",
      image: "/path/to/image1.jpg",
    },
    {
      title: "Sustainable Development Goals: NGO Progress Report 2024",
      date: "3 hours ago",
      image: "/path/to/image2.jpg",
    },
    {
      title: "Community Engagement: Best Practices for NGOs",
      date: "5 hours ago",
      image: "/path/to/image3.jpg",
    },
  ];

  useEffect(() => {
    // Fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        // const response = await axios.get('/api/dashboard');
        // setStats(response.data.stats);
        // setRecentActivities(response.data.activities);

        // Temporary mock data
        setStats({
          totalDonations: 25000,
          activeProjects: 12,
          beneficiaries: 450,
          pendingRequests: 8,
        });

        setRecentActivities([
          {
            title: "New donation received",
            time: "2 minutes ago",
            icon: <TrendingUp className="h-4 w-4 text-white" />,
            color: "bg-green-500",
          },
          {
            title: "Project milestone completed",
            time: "1 hour ago",
            icon: <Package className="h-4 w-4 text-white" />,
            color: "bg-blue-500",
          },
          // Add more activities...
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    const loadNews = async () => {
      try {
        const fetchedNews = await fetchNGONews();
        setNewsData(fetchedNews.length > 0 ? fetchedNews : mockNewsData);
      } catch (error) {
        console.error('Error loading news:', error);
        setNewsData(mockNewsData);
      } finally {
        setNewsLoading(false);
      }
    };

    fetchDashboardData();
    loadNews();
  }, []);

  const generatePDF = () => {
    try {
      const pdfDoc = new jsPDF();
      let yPos = 40; // Start position after header

      // Theme colors
      const themeColors = {
        primary: "#166856",
        secondary: "#0d3320",
        accent: "#8df1e2",
      };

      const pageWidth = pdfDoc.internal.pageSize.getWidth();

      // Header Section
      pdfDoc.setFillColor(themeColors.primary);
      pdfDoc.rect(0, 0, pageWidth, 40, "F");
      pdfDoc.setTextColor(255, 255, 255);
      pdfDoc.setFontSize(24);
      pdfDoc.text("NGO Activity Report", pageWidth / 2, 20, {
        align: "center",
      });
      pdfDoc.setFontSize(12);
      pdfDoc.text(
        `Generated on: ${format(new Date(), "PPP")}`,
        pageWidth / 2,
        30,
        { align: "center" }
      );

      // Stats Summary Title
      pdfDoc.setTextColor(themeColors.secondary);
      pdfDoc.setFontSize(16);
      yPos += 10;
      pdfDoc.text("Summary Statistics", 14, yPos);
      yPos += 10;

      // Stats Table
      const statsData = [
        [
          "Total Donations",
          `₹${stats.totalDonations}`,
          "Active Projects",
          stats.activeProjects,
        ],
        [
          "Beneficiaries",
          stats.beneficiaries,
          "Pending Requests",
          stats.pendingRequests,
        ],
      ];

      autoTable(pdfDoc, {
        startY: yPos,
        head: [],
        body: statsData,
        theme: "grid",
        styles: {
          fillColor: [141, 241, 226, 0.1],
          textColor: themeColors.secondary,
          fontSize: 12,
          cellPadding: 5,
        },
        columnStyles: {
          0: { cellWidth: 40 },
          1: { cellWidth: 40 },
          2: { cellWidth: 40 },
          3: { cellWidth: 40 },
        },
        didDrawPage: (data) => {
          yPos = data.cursor.y + 15;
        },
      });

      // Projects Section Title
      pdfDoc.setFontSize(16);
      pdfDoc.text("Active Projects", 14, yPos);
      yPos += 10;

      // Projects Table
      const projectsData = mockProjects.map((project) => [
        project.name,
        `${project.progress}%`,
        `₹${project.raised.toLocaleString()}`,
        `₹${project.goal.toLocaleString()}`,
        format(new Date(project.deadline), "PP"),
      ]);

      autoTable(pdfDoc, {
        startY: yPos,
        head: [["Project Name", "Progress", "Raised", "Goal", "Deadline"]],
        body: projectsData,
        theme: "grid",
        headStyles: {
          fillColor: themeColors.primary,
          textColor: "#ffffff",
          fontSize: 12,
        },
        styles: {
          fontSize: 10,
          cellPadding: 5,
        },
        didDrawPage: (data) => {
          yPos = data.cursor.y + 15;
        },
      });

      // Recent Activities Section Title
      pdfDoc.setFontSize(16);
      pdfDoc.text("Recent Activities", 14, yPos);
      yPos += 10;

      // Recent Activities Table
      const activitiesData = recentActivities.map((activity) => [
        activity.title,
        activity.time,
      ]);

      autoTable(pdfDoc, {
        startY: yPos,
        head: [["Activity", "Time"]],
        body: activitiesData,
        theme: "grid",
        headStyles: {
          fillColor: themeColors.primary,
          textColor: "#ffffff",
          fontSize: 12,
        },
        styles: {
          fontSize: 10,
          cellPadding: 5,
        },
        didDrawPage: (data) => {
          yPos = data.cursor.y;
        },
      });

      // Save and download
      pdfDoc.save(`NGO_Report_${format(new Date(), "yyyy-MM-dd")}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      // Here you could add a toast notification for the user
    }
  };

  return (
    <div className="p-6 space-y-8 bg-gradient-to-br from-[#8df1e2]/5 to-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center bg-[#166856]/95 p-6 rounded-xl shadow-lg">
        <div>
          <h1 className="text-3xl font-bold text-white">NGO Dashboard</h1>
          <p className="text-[#8df1e2]/80">Welcome back, Organization Name</p>
        </div>
        <Button
          onClick={generatePDF}
          className="rounded-full bg-[#8df1e2] hover:bg-[#6dcebe] text-[#0d3320] font-medium
            shadow-lg shadow-[#166856]/20 px-6 py-2 transition-all duration-300 hover:scale-105"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Donations",
            value: "₹25,000",
            icon: IndianRupee,
            color: "bg-[#166856]",
          },
          {
            title: "Active Projects",
            value: "12",
            icon: Package,
            color: "bg-[#0d3320]",
          },
          {
            title: "Beneficiaries",
            value: "450",
            icon: Users,
            color: "bg-[#166856]",
          },
          {
            title: "Pending Requests",
            value: "8",
            icon: AlertCircle,
            color: "bg-[#0d3320]",
          },
        ].map((stat, index) => (
          <Card
            key={index}
            className="p-6 hover:shadow-[0_20px_50px_-15px_rgba(22,104,86,0.3)]
            transition-all duration-300 border-[#8df1e2]/20 bg-white/50 backdrop-blur-sm"
          >
            <div className="flex items-center space-x-4">
              <div
                className={`${stat.color} p-4 rounded-xl shadow-lg shadow-[#166856]/20`}
              >
                <stat.icon className="h-6 w-6 text-[#8df1e2]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#166856]">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-bold text-[#0d3320]">
                  {stat.value}
                </h3>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Projects Card - Left Side */}
        <ScrollableCard title="Active Projects" viewAllText="View All">
          {mockProjects.map((project) => (
            <div
              key={project.id}
              className="p-4 
              bg-gradient-to-r from-[#8df1e2]/5 to-transparent
              hover:from-[#8df1e2]/10 hover:to-transparent transition-colors rounded-lg"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-800">{project.name}</h3>
                  <p className="text-sm text-gray-600">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Due: {new Date(project.deadline).toLocaleDateString()}
                  </p>
                </div>
                <Link
                  to={`/projects/${project.id}`}
                  className="text-emerald-600 hover:text-emerald-700"
                >
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-sm text-[#166856]">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-[#8df1e2]/20 rounded-full h-2.5 mt-1">
                  <div
                    className="h-2.5 rounded-full bg-gradient-to-r from-[#166856] to-[#0d3320]
                    shadow-lg shadow-[#166856]/30"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <div className="mt-2 text-sm text-[#0d3320] font-medium">
                  Raised: ₹{project.raised.toLocaleString()} of ₹
                  {project.goal.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </ScrollableCard>

        {/* Recent Activity Card - Right Side */}
        <ScrollableCard title="Recent Activity" viewAllText="View All">
          {recentActivities.map((activity, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 p-3 
              bg-gradient-to-r from-[#8df1e2]/5 to-transparent
              hover:from-[#8df1e2]/10 hover:to-transparent transition-colors rounded-lg"
            >
              <div className="p-2 rounded-full bg-[#166856] shadow-lg shadow-[#166856]/20">
                {activity.icon}
              </div>
              <div>
                <p className="font-medium text-[#0d3320]">{activity.title}</p>
                <p className="text-sm text-[#166856]">{activity.time}</p>
              </div>
            </div>
          ))}
        </ScrollableCard>
      </div>

      {/* Bottom Section Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Donation Trends Chart - Bottom Left */}
        <ScrollableCard
          title="Donation Trends"
          viewAllText="View Details"
          height="350px"
        >
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockChartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#8df1e2"
                  opacity={0.2}
                />
                <XAxis dataKey="month" stroke="#166856" />
                <YAxis stroke="#166856" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #8df1e2",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="donations"
                  stroke="#166856"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="projects"
                  stroke="#0d3320"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ScrollableCard>

        {/* Updated News Feed Card */}
        <ScrollableCard 
          title="Latest NGO News" 
          viewAllText="View More" 
          height="h-[350px]"
        >
          {newsLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#166856]" />
            </div>
          ) : (
            <div className="space-y-4">
              {newsData.slice(0, 5).map((article) => (
                <NewsCard key={article.id} news={article} />
              ))}
            </div>
          )}
        </ScrollableCard>
      </div>
    </div>
  );
};

// Add this to your global CSS or component styles
const styles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: var(--scrollbar-width);
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: var(--scrollbar-track);
    border-radius: 4px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: var(--scrollbar-thumb);
    border-radius: 4px;
    transition: background-color 0.3s;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(22, 104, 86, 0.3);
  }
`;

export default Dashboard;
