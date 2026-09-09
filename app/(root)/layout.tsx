
import { cn } from "@/lib/utils";
import Navbar from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/Whatsaap";
import ActaAssistantFab from "@/components/ActaAssistant";


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
          <WhatsAppButton />
          <ActaAssistantFab/>
      </body>
    </html>
  );
}
