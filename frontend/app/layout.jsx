import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "BiasBoard",
  description: "Your ultimate K-pop bias tracker.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <footer className="footer">
          <p>Amanda Hezekiah - BiasBoard &copy; {new Date().getFullYear()}</p>
        </footer>
      </body>
    </html>
  );
}
