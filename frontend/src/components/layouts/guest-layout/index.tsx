import Footer from "./footer";
import Header from "./header";

export default function GuestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <div className="md:max-w-[80rem] mx-auto">{children}</div>
      <Footer />
    </div>
  );
}
