"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer>
      <p>{t("footerCopyright")}</p>
      <a href="mailto:info@hvacbms.sk">info@hvacbms.sk</a>
    </footer>
  );
}
