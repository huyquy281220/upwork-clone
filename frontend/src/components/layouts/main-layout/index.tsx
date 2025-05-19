import { ChildrenProps } from "@/types";
import Footer from "../shared/footer";
import MainHeader from "./header";

export default function FreelancerLayout({ children }: ChildrenProps) {
  return (
    <div className="bg-main">
      <div className="w-full max-w-[120rem] mx-auto ">
        <div className="max-w-[100rem] mx-auto">
          <MainHeader />
          {children}
          <Footer />
        </div>
      </div>
    </div>
  );
}
