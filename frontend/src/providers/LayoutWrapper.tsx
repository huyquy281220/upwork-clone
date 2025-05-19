import Footer from "@/components/layouts/main-layout/footer";
import MainHeader from "@/components/layouts/main-layout/header";
import { ChildrenProps } from "@/types";

export default function LayoutWrapper({ children }: ChildrenProps) {
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
