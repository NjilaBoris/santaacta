
import { cn } from "@/lib/utils";
import Navbar from "@/components/Nav";
import Footer from "@/components/Footer";


export default function MainLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
      )}
    >
      <body className="min-h-full">
          <Navbar />
          {children}
          <Footer/>
      </body>
    </html>
  );
}
