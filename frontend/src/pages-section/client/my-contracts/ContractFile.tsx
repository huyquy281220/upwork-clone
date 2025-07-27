"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  ImageIcon,
  Video,
  Archive,
  Download,
  Upload,
  Search,
  Calendar,
  User,
  Eye,
  Trash2,
} from "lucide-react";
import { ContractProps } from "@/types/contract";

interface ContractFilesProps {
  contract: ContractProps;
}

// Mock files data
const mockFiles = [
  {
    id: 1,
    name: "Project Requirements.pdf",
    type: "document",
    size: "2.4 MB",
    uploadedBy: "client",
    uploadedAt: "2024-01-15",
    category: "requirements",
    url: "#",
  },
  {
    id: 2,
    name: "Wireframes_v1.fig",
    type: "design",
    size: "15.8 MB",
    uploadedBy: "freelancer",
    uploadedAt: "2024-01-20",
    category: "design",
    url: "#",
  },
  {
    id: 3,
    name: "Homepage_Design.png",
    type: "image",
    size: "3.2 MB",
    uploadedBy: "freelancer",
    uploadedAt: "2024-01-25",
    category: "design",
    url: "#",
  },
  {
    id: 4,
    name: "Database_Schema.sql",
    type: "code",
    size: "45 KB",
    uploadedBy: "freelancer",
    uploadedAt: "2024-02-01",
    category: "development",
    url: "#",
  },
  {
    id: 5,
    name: "Demo_Video.mp4",
    type: "video",
    size: "125 MB",
    uploadedBy: "freelancer",
    uploadedAt: "2024-02-10",
    category: "deliverable",
    url: "#",
  },
  {
    id: 6,
    name: "Source_Code.zip",
    type: "archive",
    size: "8.7 MB",
    uploadedBy: "freelancer",
    uploadedAt: "2024-02-15",
    category: "deliverable",
    url: "#",
  },
];

export function ContractFiles({ contract }: ContractFilesProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="w-8 h-8 text-red-500" />;
      case "image":
        return <ImageIcon className="w-8 h-8 text-green-500" />;
      case "video":
        return <Video className="w-8 h-8 text-purple-500" />;
      case "archive":
        return <Archive className="w-8 h-8 text-orange-500" />;
      default:
        return <FileText className="w-8 h-8 text-gray-500" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "requirements":
        return "bg-blue-100 text-blue-800";
      case "design":
        return "bg-purple-100 text-purple-800";
      case "development":
        return "bg-green-100 text-green-800";
      case "deliverable":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const clientFiles = mockFiles.filter((file) => file.uploadedBy === "client");
  const freelancerFiles = mockFiles.filter(
    (file) => file.uploadedBy === "freelancer"
  );
  const totalSize = mockFiles.reduce((sum, file) => {
    const size = Number.parseFloat(file.size.replace(/[^\d.]/g, ""));
    const unit = file.size.includes("MB")
      ? 1
      : file.size.includes("KB")
      ? 0.001
      : 1;
    return sum + size * unit;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Files Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Files Overview</CardTitle>
            <Button>
              <Upload className="w-4 h-4 mr-2" />
              Upload Files
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">
                {mockFiles.length}
              </p>
              <p className="text-sm text-gray-600">Total Files</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <User className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">
                {clientFiles.length}
              </p>
              <p className="text-sm text-gray-600">Client Files</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <User className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-600">
                {freelancerFiles.length}
              </p>
              <p className="text-sm text-gray-600">Freelancer Files</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Archive className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-orange-600">
                {totalSize.toFixed(1)} MB
              </p>
              <p className="text-sm text-gray-600">Total Size</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Search files..." className="pl-10" />
              </div>
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="requirements">Requirements</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="deliverable">Deliverables</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Uploaded By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="client">Client</SelectItem>
                  <SelectItem value="freelancer">Freelancer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Files List */}
      <Card>
        <CardHeader>
          <CardTitle>Project Files</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockFiles.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">{getFileIcon(file.type)}</div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{file.name}</h3>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                      <span>{file.size}</span>
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>
                          {file.uploadedBy === "client"
                            ? "You"
                            : contract.freelancer.user.fullName}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(file.uploadedAt)}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={getCategoryColor(file.category)}>
                    {file.category.charAt(0).toUpperCase() +
                      file.category.slice(1)}
                  </Badge>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  {file.uploadedBy === "client" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 bg-transparent"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
