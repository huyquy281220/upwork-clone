import Footer from "./footer";
import Header from "./header";
import { Suspense } from "react";
import Loading from "@/components/common/Loading";

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <div className="md:max-w-[80rem] mx-auto">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
      <Footer />
    </div>
  );
}
