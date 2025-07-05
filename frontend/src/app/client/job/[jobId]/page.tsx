"use client";

import {
  FreelancerDetailsModal,
  JobDetailsHeader,
  JobDetailsSidebar,
  ProposalsFilters,
  ProposalsList,
} from "@/pages-section/client/job-details";
import { useState } from "react";
const jobData = {
  id: 1,
  title: "Full Stack Developer for SaaS Platform",
  description:
    "We're looking for an experienced full-stack developer to help build our next-generation SaaS platform. You'll work with React, Node.js, and PostgreSQL to create scalable web applications. The ideal candidate should have 3+ years of experience and be comfortable working in an agile environment.",
  budget: { type: "hourly", min: 40, max: 80 },
  duration: "3-6 months",
  experienceLevel: "Expert",
  skills: ["React", "Node.js", "PostgreSQL", "TypeScript", "AWS"],
  postedDate: "2 days ago",
  proposalsCount: 24,
  questions: [
    "What is your experience with React and Node.js?",
    "Can you provide examples of similar SaaS platforms you've built?",
    "What is your availability for this project?",
  ],
};

const proposals = [
  {
    id: 1,
    freelancer: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=60&width=60",
      title: "Senior Full Stack Developer",
      location: "San Francisco, CA",
      rating: 4.9,
      reviewsCount: 127,
      totalEarned: "$85K+",
      successRate: 98,
      responseTime: "1 hour",
      languages: ["English (Native)", "Mandarin (Fluent)"],
      verified: true,
      topRated: true,
      skills: [
        "React",
        "Node.js",
        "PostgreSQL",
        "TypeScript",
        "AWS",
        "Docker",
        "GraphQL",
      ],
      hourlyRate: 75,
      availability: "30+ hrs/week",
    },
    submittedDate: "2 hours ago",
    proposalType: "hourly",
    rate: 75,
    coverLetter: `Dear TechCorp Solutions,

I'm excited about your SaaS platform project and believe I'm the perfect fit for this role. With over 6 years of experience in full-stack development, I've successfully built and scaled multiple SaaS applications using the exact tech stack you mentioned.

Here's what I bring to your project:
• 6+ years of React and Node.js development experience
• Built 12+ SaaS platforms from scratch, including user authentication, payment processing, and real-time features
• Expert in PostgreSQL optimization and database design
• AWS certified with experience in serverless architecture
• Strong background in TypeScript and modern development practices

Recent relevant projects:
1. E-commerce SaaS platform (React, Node.js, PostgreSQL) - 50K+ active users
2. Project management tool with real-time collaboration features
3. Financial dashboard with complex data visualization

I'm available to start immediately and can dedicate 40+ hours per week to your project. I'd love to discuss your specific requirements and share more details about my relevant experience.

Looking forward to hearing from you!

Best regards,
Sarah Chen`,
    timeline: "3-4 months",
    availability: "Immediately",
    clientQuestions: [
      "I have 6+ years of experience with React and Node.js, having built over 15 production applications. I'm particularly experienced with React hooks, context API, and server-side rendering with Next.js. On the backend, I've worked extensively with Express.js, building RESTful APIs and GraphQL endpoints.",
      "I've built several SaaS platforms including: 1) An e-commerce platform serving 50K+ users with features like inventory management, payment processing, and analytics dashboard. 2) A project management tool with real-time collaboration, file sharing, and team communication features. 3) A financial dashboard for small businesses with data visualization and reporting capabilities. I can share detailed case studies and demos during our interview.",
      "I'm available to start immediately and can dedicate 40+ hours per week to this project. I'm in PST timezone which should work well for collaboration. I typically work Monday-Friday 9 AM - 6 PM PST but I'm flexible with meeting times for important discussions.",
    ],
    attachments: [
      { name: "Portfolio_SaaS_Projects.pdf", size: "2.4 MB", type: "pdf" },
      { name: "Code_Samples_React_Node.zip", size: "15.7 MB", type: "zip" },
      { name: "Client_Testimonials.pdf", size: "1.2 MB", type: "pdf" },
    ],
    portfolio: [
      {
        title: "E-commerce SaaS Platform",
        description:
          "Full-stack e-commerce solution with React, Node.js, and PostgreSQL",
        image: "/placeholder.svg?height=200&width=300",
        technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
      },
      {
        title: "Project Management Tool",
        description:
          "Real-time collaboration platform with team management features",
        image: "/placeholder.svg?height=200&width=300",
        technologies: ["React", "Express", "Socket.io", "MongoDB"],
      },
    ],
    status: "active",
    viewed: true,
    shortlisted: false,
  },
  {
    id: 2,
    freelancer: {
      name: "Alex Rodriguez",
      avatar: "/placeholder.svg?height=60&width=60",
      title: "Full Stack Developer & DevOps Engineer",
      location: "Austin, TX",
      rating: 4.8,
      reviewsCount: 89,
      totalEarned: "$62K+",
      successRate: 95,
      responseTime: "2 hours",
      languages: ["English (Native)", "Spanish (Native)"],
      verified: true,
      topRated: false,
      skills: [
        "React",
        "Node.js",
        "AWS",
        "Docker",
        "Kubernetes",
        "PostgreSQL",
        "Redis",
      ],
      hourlyRate: 65,
      availability: "25+ hrs/week",
    },
    submittedDate: "5 hours ago",
    proposalType: "hourly",
    rate: 65,
    coverLetter: `Hi there,

I'm Alex, a full-stack developer with 5 years of experience building scalable SaaS applications. Your project caught my attention because it aligns perfectly with my expertise in React, Node.js, and PostgreSQL.

What I can offer:
• Proven track record with 8+ SaaS applications in production
• Strong focus on performance optimization and scalability
• DevOps expertise for seamless deployment and monitoring
• Experience with agile development methodologies

I'm particularly interested in the scalability challenges your platform might face and would love to discuss how we can architect a solution that grows with your business.

Available to start within a week and can commit 30+ hours weekly.

Best,
Alex`,
    timeline: "4-5 months",
    availability: "Within 1 week",
    clientQuestions: [
      "I have 5 years of hands-on experience with React and Node.js. I've built several complex SPAs with React including state management with Redux and Context API. On the Node.js side, I've developed RESTful APIs, implemented authentication systems, and worked with various databases.",
      "I've developed a CRM SaaS for real estate agents (10K+ users), a inventory management system for retail businesses, and a customer support platform with ticketing system. Each project involved complex business logic, user management, and integration with third-party services.",
      "I can start within a week and dedicate 30+ hours per week. I'm in CST timezone and typically available for meetings between 9 AM - 5 PM CST, but flexible for important discussions.",
    ],
    attachments: [
      { name: "Recent_Projects_Showcase.pdf", size: "3.1 MB", type: "pdf" },
      {
        name: "Technical_Architecture_Samples.pdf",
        size: "2.8 MB",
        type: "pdf",
      },
    ],
    portfolio: [
      {
        title: "Real Estate CRM",
        description: "Comprehensive CRM solution for real estate professionals",
        image: "/placeholder.svg?height=200&width=300",
        technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
      },
    ],
    status: "active",
    viewed: true,
    shortlisted: true,
  },
  {
    id: 3,
    freelancer: {
      name: "Priya Sharma",
      avatar: "/placeholder.svg?height=60&width=60",
      title: "React & Node.js Specialist",
      location: "Mumbai, India",
      rating: 4.7,
      reviewsCount: 156,
      totalEarned: "$45K+",
      successRate: 92,
      responseTime: "30 minutes",
      languages: ["English (Fluent)", "Hindi (Native)"],
      verified: true,
      topRated: false,
      skills: [
        "React",
        "Node.js",
        "MongoDB",
        "Express",
        "JavaScript",
        "TypeScript",
      ],
      hourlyRate: 35,
      availability: "40+ hrs/week",
    },
    submittedDate: "1 day ago",
    proposalType: "fixed",
    rate: 12000,
    coverLetter: `Hello,

I'm Priya, a dedicated full-stack developer with 4+ years of experience in building modern web applications. I'm excited about the opportunity to work on your SaaS platform.

My expertise includes:
• React.js with hooks, context, and modern patterns
• Node.js with Express for robust backend development
• Database design and optimization
• RESTful API development and integration
• Responsive and user-friendly UI development

I've successfully delivered 20+ projects on time and within budget. I'm committed to writing clean, maintainable code and following best practices.

I can complete this project in 3-4 months working full-time. Let's discuss your requirements in detail.

Thank you for considering my proposal.

Best regards,
Priya`,
    timeline: "3-4 months",
    availability: "Immediately",
    clientQuestions: [
      "I have 4+ years of experience with React and Node.js. I've built numerous SPAs with React including e-commerce sites, dashboards, and content management systems. My Node.js experience includes building APIs, authentication systems, and database integrations.",
      "I've built an e-learning platform with course management and payment integration, a social media dashboard for content creators, and a booking system for service providers. All projects included user authentication, payment processing, and admin panels.",
      "I'm available immediately and can work full-time (40+ hours per week) on this project. I'm in IST timezone but flexible with meeting times to accommodate your schedule.",
    ],
    attachments: [
      { name: "Portfolio_Web_Applications.pdf", size: "4.2 MB", type: "pdf" },
    ],
    portfolio: [
      {
        title: "E-learning Platform",
        description:
          "Complete learning management system with course creation and payments",
        image: "/placeholder.svg?height=200&width=300",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      },
    ],
    status: "active",
    viewed: false,
    shortlisted: false,
  },
];

export default function ClientProposalsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filterBy, setFilterBy] = useState("all");
  const [selectedProposal, setSelectedProposal] = useState<any>(null);
  const [messageModalOpen, setMessageModalOpen] = useState(false);

  const handleViewDetails = (proposal: any) => {
    setSelectedProposal(proposal);
  };

  const handleMessage = (proposal: any) => {
    setSelectedProposal(proposal);
    setMessageModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <JobDetailsHeader
        proposalsCount={proposals.length}
        jobTitle={jobData.title}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Job Details Sidebar */}
          <div className="lg:col-span-1">
            <JobDetailsSidebar jobData={jobData} />
          </div>

          {/* Proposals List */}
          <div className="lg:col-span-3">
            <ProposalsFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              sortBy={sortBy}
              setSortBy={setSortBy}
              filterBy={filterBy}
              setFilterBy={setFilterBy}
            />

            <ProposalsList
              proposals={proposals}
              onViewDetails={handleViewDetails}
              onMessage={handleMessage}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <FreelancerDetailsModal
        proposal={selectedProposal}
        jobData={jobData}
        isOpen={!!selectedProposal && !messageModalOpen}
        onClose={() => setSelectedProposal(null)}
        onMessage={() => setMessageModalOpen(true)}
      />
    </div>
  );
}
