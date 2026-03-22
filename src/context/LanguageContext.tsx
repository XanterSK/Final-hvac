"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export const LANGUAGE_KEY = "siteLanguage";

export const translations = {
  en: {
    navHome: "Home",
    navServices: "Services",
    navReferences: "References",
    navContact: "Contact",
    heroTitlePrefix: "Comprehensive solution of",
    heroTitleSuffix: "HVAC and BMS",
    heroQuotePhrases: [
      "Technologies you can rely on.",
      "Expertise in every detail.",
      "Your building in safe hands.",
      "Complete TZB from project to completion.",
    ],
    heroCta: "Our Services",
    servicesTitle: "The range of services offered",
    servicesConsultingTitle: "Consulting & Design",
    servicesConsultingItem1: "Consultancy and advisory services",
    servicesConsultingItem1Desc:
      "We offer professional advisory services throughout the entire project lifecycle, helping clients make informed decisions about their HVAC and BMS systems.",
    servicesConsultingItem2: "Concepts of heat and cold sources",
    servicesConsultingItem2Desc:
      "We design comprehensive concepts for heating and cooling sources, selecting the most efficient and sustainable solutions for each building type.",
    servicesConsultingItem3: "Securing project documentation",
    servicesConsultingItem3Desc:
      "We prepare and review all necessary project documentation ensuring full compliance with Slovak and EU technical standards.",
    servicesProjectTitle: "Project Management",
    servicesProjectItem1: "Control and optimization of project documentation",
    servicesProjectItem1Desc:
      "We thoroughly review and optimize all project documentation to ensure technical accuracy, regulatory compliance and cost efficiency.",
    servicesProjectItem2: "Tenders",
    servicesProjectItem2Desc:
      "We manage the entire tender process — preparing specifications, evaluating offers and selecting the most suitable contractors for each project.",
    servicesProjectItem3: "Implementation supervision",
    servicesProjectItem3Desc:
      "We provide expert on-site supervision throughout the implementation phase, ensuring work is carried out according to approved documentation and quality standards.",
    servicesLearnMore: "Learn more →",
    authBubble: "List of Authorisations",
    auth1: "Construction manager – Technical, technological and energy building equipment – electrical equipment",
    auth2: "Electrical engineer for work and operation management",
    auth3: "Construction manager – Technical, technological and energy building equipment – sanitary technical equipment and installations, heating and air conditioning equipment, heating equipment, gas equipment",
    auth4: "§24 Certificate 0005-IBA/2021 EZ RT E1A,B — In the range: E1B- technical equipment without voltage limitation, including lightning conductors in buildings with a risk of explosion",
    auth5: "§24 Certificate 1194/4/2008-EZ-E-E2-A",
    auth6: "Certificate for the engineering of specified technical electrical equipment according to EN ISO / IEC 17024-2012",
    auth7: "Operation of specified technical pressure equipment § 17 of Decree No. 508 Z.z. – boilers operation V. Class",
    auth8: "Certificate of professional qualification in heat-power engineering according to § 4 par. 4 of Act No. 657/2004 / 44-1027",
    auth9: "Authorisation for installation and engineering – EPS and HSP Bosch, ESSER",
    referencesTitle: "References",
    referencesProjectsFrom2017: "Projects from 2017 onwards",
    referencesExperienceBubble:
      "Previous experience before founding the company",
    projectNivyTower: "Nivy Tower",
    projectVydrica: "Vydrica",
    projectGuthaus: "Guthaus",
    projectNivyMall: "Nivy Mall Bratislava",
    projectEinpark: "Einpark",
    projectBlumental: "Blumental",
    projectNewApollo: "New Apollo",
    projectStenglCampus: "Stengl Campus",
    projectKolisky: "BD Kolísky",
    projectVolkswagenLoz: "Volkswagen LOZ III",
    referenceText1: "Superstructure of buildings Astrova 1",
    referenceText2: "Kvartet (Ljubljana) – rezidence",
    referenceText3: "Vilharia (Ljubljana) – office · Masarykova (Ljubljana) – rezidence",
    referenceText4: "Duett BR Košice · Pradiareň 1900 · NCR",
    experience1: "Slovak Philharmonic – Reduta",
    experience2: "Social insurance company Poprad",
    experience3: "Slovak Technical University Trnava",
    experience4: "Minebea",
    experience5: "State tangible reserves administration",
    experience6: "Polyfunctional object Dunajská",
    experience7: "Polyfunctional object Rozadol",
    experience8: "Aupark Tower Bratislava",
    experience9: "Apollo Business Center II Bratislava",
    experience10: "Logistic center Svätý Jur",
    experience11: "Logistic center Malý Šariš",
    experience12:
      "Polyfunctional object – manufacture and warehouse Rača – Administrative building",
    experience13: "Gdanski Business Center I Warsaw PL",
    experience14: "Aupark Tower Košice",
    experience15: "Logistic center Lovosice CZ",
    experience16: "River Garden Office I Praha CZ",
    experience17: "Vaci Corner Offices Budapest HU",
    experience18: "Metronom Business Center Praha CZ",
    experience19: "Postepu 14 Warsaw PL",
    experience20: "Gdanski Business Center II Warsaw PL",
    experience21: "33 Central London UK",
    experience22: "Aupark Shopping center Hradec Králové CZ",
    experience23: "Twin City Bratislava",
    experience24: "West Station I-II Warsaw PL",
    experience25: "Parking house Aupark",
    experience26: "Aupark Foodcourt",
    experience27: "Aupark Piešťany",
    experience28: "Aupark Žilina",
    experience29: "City Business Center III-V",
    experience30: "Aupark Košice",
    experience31: "Logistic center Mošnov CZ",
    experience32: "River Garden II III Praha CZ",
    experience33: "Konstruktorska Business Center Warsaw PL",
    experience34: "Forum Business Center I Bratislava",
    contactTitle: "Contact",
    contactCompany: "HVAC & BMS s.r.o.",
    contactAddress: "Tylova 1042/11, 831 04 Bratislava",
    contactOpenMaps: "Open in Maps",
    contactResponseTime: "We respond within 1 business day",
    contactName: "Name",
    contactEmail: "Email",
    contactSubject: "Subject",
    contactMessage: "Message (optional)",
    contactSend: "Send",
    contactSuccess: "Thank you for your message. We will get back to you shortly.",
    footerCopyright:
      "© Copyright 2025 HVAC & BMS, s.r.o. All Rights Reserved",
  },
  sk: {
    navHome: "Domov",
    navServices: "Služby",
    navReferences: "Referencie",
    navContact: "Kontakt",
    heroTitlePrefix: "Komplexné riešenia v oblasti",
    heroTitleSuffix: "TZB a MaR",
    heroQuotePhrases: [
      "Technológie, na ktoré sa môžete spoľahnúť.",
      "Odbornosť v každom detaile.",
      "Vaša stavba v bezpečných rukách.",
      "Komplexné TZB od projektu po realizáciu.",
    ],
    heroCta: "Naše služby",
    servicesTitle: "Ponuka služieb",
    servicesConsultingTitle: "Poradenstvo a návrh",
    servicesConsultingItem1: "Konzultačné a poradenské služby",
    servicesConsultingItem1Desc:
      "Poskytujeme odborné poradenské služby počas celého životného cyklu projektu, pomáhame klientom robiť informované rozhodnutia o ich systémoch TZB a MaR.",
    servicesConsultingItem2: "Koncepty zdrojov tepla a chladu",
    servicesConsultingItem2Desc:
      "Navrhujeme komplexné koncepty zdrojov tepla a chladu, vyberáme najefektívnejšie a najudržateľnejšie riešenia pre každý typ budovy.",
    servicesConsultingItem3: "Zabezpečenie projektovej dokumentácie",
    servicesConsultingItem3Desc:
      "Pripravujeme a kontrolujeme všetku potrebnú projektovú dokumentáciu v súlade so slovenskou a európskou technickou normou.",
    servicesProjectTitle: "Riadenie projektov",
    servicesProjectItem1: "Kontrola a optimalizácia projektovej dokumentácie",
    servicesProjectItem1Desc:
      "Dôkladne kontrolujeme a optimalizujeme projektovú dokumentáciu z hľadiska technickej správnosti, súladu s predpismi a nákladovej efektívnosti.",
    servicesProjectItem2: "Výberové konania",
    servicesProjectItem2Desc:
      "Zabezpečujeme celý proces výberového konania — prípravu špecifikácií, hodnotenie ponúk a výber najvhodnejších dodávateľov.",
    servicesProjectItem3: "Dozor pri realizácii",
    servicesProjectItem3Desc:
      "Vykonávame odborný dozor priamo na stavbe počas celej realizačnej fázy, dohliadame na súlad s dokumentáciou a štandardmi kvality.",
    servicesLearnMore: "Zistiť viac →",
    authBubble: "Zoznam oprávnení",
    auth1: "Stavbyvedúci – Technické, technologické a energetické zariadenia budov – elektrické zariadenia",
    auth2: "Elektrotechnik pre riadenie práce a prevádzky",
    auth3: "Stavbyvedúci – Technické, technologické a energetické zariadenia budov – zdravotnotechnické zariadenia a inštalácie, vykurovacie a klimatizačné zariadenia, vykurovacie zariadenia, plynové zariadenia",
    auth4: "§24 Osvedčenie 0005-IBA/2021 EZ RT E1A,B — V rozsahu: E1B- technické zariadenia bez obmedzenia napätia, vrátane bleskozvodov v budovách s nebezpečenstvom výbuchu",
    auth5: "§24 Osvedčenie 1194/4/2008-EZ-E-E2-A",
    auth6: "Osvedčenie na projektovanie určených technických elektrických zariadení podľa EN ISO / IEC 17024-2012",
    auth7: "Prevádzka určených technických tlakových zariadení § 17 vyhlášky č. 508 Z.z. – prevádzka kotlov V. triedy",
    auth8: "Osvedčenie o odbornej spôsobilosti v tepelnej energetike podľa § 4 ods. 4 zákona č. 657/2004 / 44-1027",
    auth9: "Oprávnenie na montáž a projektovanie – EPS a HSP Bosch, ESSER",
    referencesTitle: "Referencie",
    referencesProjectsFrom2017: "Projekty od roku 2017",
    referencesExperienceBubble: "Skúsenosti pred založením spoločnosti",
    projectNivyTower: "Nivy Tower",
    projectVydrica: "Vydrica",
    projectGuthaus: "Guthaus",
    projectNivyMall: "Nivy Mall Bratislava",
    projectEinpark: "Einpark",
    projectBlumental: "Blumental",
    projectNewApollo: "New Apollo",
    projectStenglCampus: "Stengl Campus",
    projectKolisky: "BD Kolísky",
    projectVolkswagenLoz: "Volkswagen LOZ III",
    referenceText1: "Nadstavba budov Astrova 1",
    referenceText2: "Kvartet (Ljubljana) – rezidencia",
    referenceText3:
      "Vilharia (Ljubljana) – kancelárie · Masarykova (Ljubljana) – rezidencia",
    referenceText4: "Duett BR Košice · Pradiareň 1900 · NCR",
    experience1: "Slovenská filharmónia – Reduta",
    experience2: "Sociálna poisťovňa Poprad",
    experience3: "Slovenská technická univerzita Trnava",
    experience4: "Minebea",
    experience5: "Správa štátnych hmotných rezerv",
    experience6: "Polyfunkčný objekt Dunajská",
    experience7: "Polyfunkčný objekt Rozadol",
    experience8: "Aupark Tower Bratislava",
    experience9: "Apollo Business Center II Bratislava",
    experience10: "Logistické centrum Svätý Jur",
    experience11: "Logistické centrum Malý Šariš",
    experience12:
      "Polyfunkčný objekt – výroba a sklad Rača – administratívna budova",
    experience13: "Gdanski Business Center I Varšava PL",
    experience14: "Aupark Tower Košice",
    experience15: "Logistické centrum Lovosice CZ",
    experience16: "River Garden Office I Praha CZ",
    experience17: "Vaci Corner Offices Budapešť HU",
    experience18: "Metronom Business Center Praha CZ",
    experience19: "Postepu 14 Varšava PL",
    experience20: "Gdanski Business Center II Varšava PL",
    experience21: "33 Central Londýn UK",
    experience22: "Aupark Shopping centrum Hradec Králové CZ",
    experience23: "Twin City Bratislava",
    experience24: "West Station I-II Varšava PL",
    experience25: "Parkovací dom Aupark",
    experience26: "Aupark Foodcourt",
    experience27: "Aupark Piešťany",
    experience28: "Aupark Žilina",
    experience29: "City Business Center III-V",
    experience30: "Aupark Košice",
    experience31: "Logistické centrum Mošnov CZ",
    experience32: "River Garden II III Praha CZ",
    experience33: "Konstruktorska Business Center Varšava PL",
    experience34: "Forum Business Center I Bratislava",
    contactTitle: "Kontakt",
    contactCompany: "HVAC & BMS s.r.o.",
    contactAddress: "Tylova 1042/11, 831 04 Bratislava",
    contactOpenMaps: "Otvoriť v Mapách",
    contactResponseTime: "Odpovedáme do 1 pracovného dňa",
    contactName: "Meno",
    contactEmail: "Email",
    contactSubject: "Predmet",
    contactMessage: "Správa (nepovinné)",
    contactSend: "Odoslať",
    contactSuccess: "Ďakujeme za vašu správu. Čoskoro vás budeme kontaktovať.",
    footerCopyright:
      "© Copyright 2025 HVAC & BMS, s.r.o. Všetky práva vyhradené",
  },
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
export type StringTranslationKey = {
  [Key in TranslationKey]: (typeof translations.en)[Key] extends string
    ? Key
    : never;
}[TranslationKey];

type LanguageContextValue = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: <K extends TranslationKey>(key: K) => (typeof translations.en)[K];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

type LanguageProviderProps = {
  children: ReactNode;
};

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [lang, setLang] = useState<Language>("en");

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_KEY);

    if (storedLanguage === "en" || storedLanguage === "sk") {
      setLang(storedLanguage);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem(LANGUAGE_KEY, lang);
  }, [lang]);

  function translate<K extends TranslationKey>(key: K) {
    return translations[lang][key];
  }

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, t: translate as LanguageContextValue["t"] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
}
