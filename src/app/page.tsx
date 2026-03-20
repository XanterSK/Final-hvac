import { readdirSync } from "node:fs";
import path from "node:path";
import SiteShell from "@/components/SiteShell";
import {
  LanguageProvider,
  type StringTranslationKey,
} from "@/context/LanguageContext";
import type { CarouselEntry } from "@/components/ui/feature-carousel";

const IMAGE_EXTENSIONS = /\.(avif|gif|jpe?g|png|svg|webp)$/i;

const PHOTO_ORDER: Record<string, number> = {
  projectNivyTower: 1,
  projectVydrica: 2,
  projectGuthaus: 3,
  projectNivyMall: 4,
  projectEinpark: 5,
  projectBlumental: 6,
  projectNewApollo: 7,
  projectStenglCampus: 8,
  projectKolisky: 9,
  projectVolkswagenLoz: 10,
};

type MappedPhoto = {
  label: string;
  order: number;
  translationKey?: StringTranslationKey;
};

function cleanFilenameLabel(filename: string) {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/[_:-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function mapPhoto(filename: string): MappedPhoto {
  const lower = filename.toLowerCase();

  if (lower.includes("nivytower")) {
    return {
      label: "Nivy Tower",
      order: PHOTO_ORDER.projectNivyTower,
      translationKey: "projectNivyTower",
    };
  }

  if (lower.includes("vydrica")) {
    return {
      label: "Vydrica",
      order: PHOTO_ORDER.projectVydrica,
      translationKey: "projectVydrica",
    };
  }

  if (lower.includes("guthaus")) {
    return {
      label: "Guthaus",
      order: PHOTO_ORDER.projectGuthaus,
      translationKey: "projectGuthaus",
    };
  }

  if (lower.includes("stanica_nivy")) {
    return {
      label: "Nivy Mall Bratislava",
      order: PHOTO_ORDER.projectNivyMall,
      translationKey: "projectNivyMall",
    };
  }

  if (lower.includes("einpark")) {
    return {
      label: "Einpark",
      order: PHOTO_ORDER.projectEinpark,
      translationKey: "projectEinpark",
    };
  }

  if (lower.includes("blumental")) {
    return {
      label: "Blumental",
      order: PHOTO_ORDER.projectBlumental,
      translationKey: "projectBlumental",
    };
  }

  if (lower.includes("apollo")) {
    return {
      label: "New Apollo",
      order: PHOTO_ORDER.projectNewApollo,
      translationKey: "projectNewApollo",
    };
  }

  if (lower.includes("stengl")) {
    return {
      label: "Stengl Campus",
      order: PHOTO_ORDER.projectStenglCampus,
      translationKey: "projectStenglCampus",
    };
  }

  if (lower.includes("kolisky") || lower.includes("vrskami")) {
    return {
      label: "BD Kolísky",
      order: PHOTO_ORDER.projectKolisky,
      translationKey: "projectKolisky",
    };
  }

  if (lower.includes("volkswagen") || lower.includes("loz")) {
    return {
      label: "Volkswagen LOZ III",
      order: PHOTO_ORDER.projectVolkswagenLoz,
      translationKey: "projectVolkswagenLoz",
    };
  }

  if (lower.includes("pradiaren")) {
    return {
      label: "Pradiareň 1900",
      order: 14,
    };
  }

  return {
    label: cleanFilenameLabel(filename),
    order: 99,
  };
}

function buildCarouselEntries(): CarouselEntry[] {
  const photosDirectory = path.join(process.cwd(), "public/photos");
  const photoFiles = readdirSync(photosDirectory)
    .filter((file) => IMAGE_EXTENSIONS.test(file))
    .sort((left, right) => {
      const leftMapped = mapPhoto(left);
      const rightMapped = mapPhoto(right);

      if (leftMapped.order !== rightMapped.order) {
        return leftMapped.order - rightMapped.order;
      }

      if (left.endsWith(".png") && right.endsWith(".jpg")) {
        return -1;
      }

      if (left.endsWith(".jpg") && right.endsWith(".png")) {
        return 1;
      }

      return left.localeCompare(right);
    });

  const photoEntries = photoFiles.map((filename, index) => {
    const mapped = mapPhoto(filename);

    return {
      id: `photo-${index}-${filename}`,
      label: mapped.label,
      src: `/photos/${encodeURIComponent(filename)}`,
      translationKey: mapped.translationKey,
      type: "image" as const,
    };
  });

  const hasStenglPhoto = photoEntries.some(
    (entry) => entry.translationKey === "projectStenglCampus",
  );

  const textEntries: CarouselEntry[] = [];

  if (!hasStenglPhoto) {
    textEntries.push({
      id: "placeholder-stengl-campus",
      label: "Stengl Campus",
      translationKey: "projectStenglCampus",
      type: "text",
      isPlaceholder: true,
    });
  }

  textEntries.push(
    {
      id: "text-reference-1",
      label: "Superstructure of buildings Astrova 1",
      translationKey: "referenceText1",
      type: "text",
    },
    {
      id: "text-reference-2",
      label: "Kvartet (Ljubljana) – rezidence",
      translationKey: "referenceText2",
      type: "text",
    },
    {
      id: "text-reference-3",
      label: "Vilharia (Ljubljana) – office · Masarykova (Ljubljana) – rezidence",
      translationKey: "referenceText3",
      type: "text",
    },
    {
      id: "text-reference-4",
      label: "Duett BR Košice · Pradiareň 1900 · NCR",
      translationKey: "referenceText4",
      type: "text",
    },
  );

  return [...photoEntries, ...textEntries];
}

export default function Home() {
  const carouselEntries = buildCarouselEntries();

  return (
    <LanguageProvider>
      <SiteShell carouselEntries={carouselEntries} />
    </LanguageProvider>
  );
}
