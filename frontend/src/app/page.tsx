import CompaniesSection from "@/pages/home/Companies";
import FindTalentSection from "@/pages/home/FindTalent";
import FindWorkSection from "@/pages/home/FindWork";
import TalentCategorySection from "@/pages/home/TalentCategory";
import TopSkillsSection from "@/pages/home/TopSkills";
import TrustedBrandsSection from "@/pages/home/TrustedBrands";
import WhyUpworkSection from "@/pages/home/WhyUpwork";
import WorkGameSection from "@/pages/home/WorkGame";

export default function Home() {
  return (
    <div className="w-full">
      <WorkGameSection />
      <TalentCategorySection />
      <CompaniesSection />
      <FindTalentSection />
      <WhyUpworkSection />
      <FindWorkSection />
      <TrustedBrandsSection />
      <TopSkillsSection />
    </div>
  );
}
