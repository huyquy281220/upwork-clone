import React from "react";

export const JobDescription = () => {
  const responsibilities = [
    "Managing customer inquiries via email, chat, and phone",
    "Providing product support and troubleshooting assistance",
    "Maintaining customer satisfaction and building relationships",
    "Documenting customer interactions and feedback",
  ];

  const requirements = [
    "Native or fluent Mandarin Chinese speaker",
    "2+ years of customer support experience",
    "Proficiency with CRM systems and support tools",
    "Excellent written and verbal communication skills",
    "Ability to work independently in a remote setting",
    "Availability to work flexible hours when needed",
  ];

  const additionalSkills = [
    "Experience with e-commerce platforms",
    "Knowledge of additional languages",
    "Technical support background",
    "Experience with video support tools",
  ];

  return (
    <div className="border-b pb-6 mt-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3">Job Summary</h2>
        <p className="text-gray-600">
          We are seeking a dedicated Mandarin-speaking Customer Support
          Specialist to join our remote team. This role requires providing
          exceptional customer service across multiple channels, ensuring
          customer satisfaction, and contributing to our company&#39;s growth in
          Mandarin-speaking markets.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3">
          Work Responsibilities
        </h2>
        <ul className="list-disc pl-5 space-y-1 text-gray-600">
          {responsibilities.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3">Requirements</h2>
        <ul className="list-disc pl-5 space-y-1 text-gray-600">
          {requirements.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-3">
          Additional Skills
        </h2>
        <ul className="list-disc pl-5 space-y-1 text-gray-600">
          {additionalSkills.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
