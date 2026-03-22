import HeroIntro from "@/components/HeroIntro";
import SiteShell from "@/components/SiteShell";
import { LanguageProvider } from "@/context/LanguageContext";

export default function Home() {
  return (
    <LanguageProvider>
      <SiteShell hero={<HeroIntro />} />
    </LanguageProvider>
  );
}
