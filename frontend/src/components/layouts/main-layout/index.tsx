import { ChildrenProps } from "@/types";
import Footer from "./footer";
import MainHeader from "./header";

export default function MainLayout({ children }: ChildrenProps) {
  return (
    <div className="w-full max-w-[120rem] mx-auto ">
      <div className="max-w-[100rem] mx-auto">
        <MainHeader />
        {children}
        <Footer />
      </div>
    </div>
  );
}
