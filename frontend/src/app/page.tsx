import CompaniesSection from "@/pages-section/home/Companies";
import FindTalentSection from "@/pages-section/home/FindTalent";
import FindWorkSection from "@/pages-section/home/FindWork";
import TalentCategorySection from "@/pages-section/home/TalentCategory";
import TopSkillsSection from "@/pages-section/home/TopSkills";
import TrustedBrandsSection from "@/pages-section/home/TrustedBrands";
import WhyUpworkSection from "@/pages-section/home/WhyUpwork";
import WorkGameSection from "@/pages-section/home/WorkGame";

export default function Home() {
  return (
    <>
      <WorkGameSection />
      <TalentCategorySection />
      <CompaniesSection />
      <FindTalentSection />
      <WhyUpworkSection />
      <FindWorkSection />
      <TrustedBrandsSection />
      <TopSkillsSection />
    </>
  );
}
