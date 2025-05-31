const skillCategories = [
  {
    title: "Top skills",
    skills: [
      "Data Entry Specialist",
      "Video Editor",
      "Data Analyst",
      "Shopify Developer",
      "Ruby on Rails Developer",
      "Android Developer",
      "Bookkeeper",
      "Content Writer",
      "Copywriter",
      "Database Administrator",
      "Data Scientist",
      "Front-End Developer",
      "Game Developer",
      "Graphic Designer",
      "iOS Developer",
      "Java Developer",
    ],
  },
  {
    title: "Trending in Upwork",
    skills: [
      "Data Entry Specialist",
      "Video Editor",
      "Data Analyst",
      "Shopify Developer",
      "Ruby on Rails Developer",
      "Android Developer",
      "Bookkeeper",
      "Content Writer",
      "Copywriter",
      "Database Administrator",
      "Data Scientist",
    ],
  },
  {
    title: "Top Skill in USA",
    skills: [
      "Logo Designer",
      "Mobile App Developer",
      "PHP Developer",
      "Python Developer",
      "React Developer",
      "SEO Expert",
      "Social Media Manager",
      "Software Developer",
      "Software Engineer",
      "UI Designer",
      "UX Designer",
      "Virtual Assistant",
      "Web Designer",
      "WordPress Developer",
    ],
  },
];

export default function TopSkillsSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index}>
              <h3 className="font-bold text-xl mb-4">{category.title}</h3>
              <ul className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex}>
                    <a
                      href="#"
                      className="text-sm text-gray-600 hover:text-green-600"
                    >
                      {skill}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
