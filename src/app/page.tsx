import SiteShell from "@/components/SiteShell";
import { LanguageProvider } from "@/context/LanguageContext";

export default function Home() {
  return (
    <LanguageProvider>
      <SiteShell />
    </LanguageProvider>
  );
}
