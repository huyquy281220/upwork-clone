import "../globals.css";

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {children}
    </div>
  );
}
