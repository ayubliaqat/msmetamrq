// app/layout.tsx
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export const metadata = {
  title: "MS Metamarq",
  description: "Graphic Designer & Digital Growth Specialist",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-800">
        {/* Navbar */}
        <Navbar />

        {/* Page content */}
        <main className="pt-16">{children}</main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
