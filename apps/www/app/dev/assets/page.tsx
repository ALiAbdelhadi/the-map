import Image from "next/image";

import { AboutIcon } from "@themap/ui/icons/about";
import { AllInOneIcon } from "@themap/ui/icons/all-in-one";
import { ApostropheIcon } from "@themap/ui/icons/apostrophe";
import { AppIcon } from "@themap/ui/icons/app";
import { AppStoreIcon } from "@themap/ui/icons/app-store";
import { AreasIcon } from "@themap/ui/icons/areas";
import { ArrowIcon } from "@themap/ui/icons/arrow";
import { ChooseIcon } from "@themap/ui/icons/choose";
import { ContactUsIcon } from "@themap/ui/icons/contact-us";
import { EasyIcon } from "@themap/ui/icons/easy";
import { EmailIcon } from "@themap/ui/icons/email";
import { FacebookIcon } from "@themap/ui/icons/facebook";
import { FastIcon } from "@themap/ui/icons/fast";
import { FlexibleIcon } from "@themap/ui/icons/flexible";
import { FocusIcon } from "@themap/ui/icons/focus";
import { FullFlexibilityIcon } from "@themap/ui/icons/full-flexibility";
import { IncomeIcon } from "@themap/ui/icons/income";
import { InstagramIcon } from "@themap/ui/icons/instagram";
import { LanguageIcon } from "@themap/ui/icons/language";
import { MenuIcon } from "@themap/ui/icons/menu";
import { NearbyIcon } from "@themap/ui/icons/nearby";
import { ProvidersIcon } from "@themap/ui/icons/providers";
import { ReadyClientsIcon } from "@themap/ui/icons/ready-clients";
import { ServiceProviderIcon } from "@themap/ui/icons/service-provider";
import { SimpleIcon } from "@themap/ui/icons/simple";
import { StarIcon } from "@themap/ui/icons/star";
import { WiderReachIcon } from "@themap/ui/icons/wider-reach";
import { assertDevPage } from "../dev-only";

/**
 * Dev-only asset sheet.
 *
 * Renders every asset exported from Figma in Phase 3 so they can be checked by eye:
 * 27 monochrome icons as React components using currentColor, 7 multicolour SVGs kept
 * as files, and 25 WebP rasters. Mapping to Figma node ids: docs/assets-manifest.md.
 */

const ICONS = [
  { name: "about", Icon: AboutIcon },
  { name: "all-in-one", Icon: AllInOneIcon },
  { name: "apostrophe", Icon: ApostropheIcon },
  { name: "app", Icon: AppIcon },
  { name: "app-store", Icon: AppStoreIcon },
  { name: "areas", Icon: AreasIcon },
  { name: "arrow", Icon: ArrowIcon },
  { name: "choose", Icon: ChooseIcon },
  { name: "contact-us", Icon: ContactUsIcon },
  { name: "easy", Icon: EasyIcon },
  { name: "email", Icon: EmailIcon },
  { name: "facebook", Icon: FacebookIcon },
  { name: "fast", Icon: FastIcon },
  { name: "flexible", Icon: FlexibleIcon },
  { name: "focus", Icon: FocusIcon },
  { name: "full-flexibility", Icon: FullFlexibilityIcon },
  { name: "income", Icon: IncomeIcon },
  { name: "instagram", Icon: InstagramIcon },
  { name: "language", Icon: LanguageIcon },
  { name: "menu", Icon: MenuIcon },
  { name: "nearby", Icon: NearbyIcon },
  { name: "providers", Icon: ProvidersIcon },
  { name: "ready-clients", Icon: ReadyClientsIcon },
  { name: "service-provider", Icon: ServiceProviderIcon },
  { name: "simple", Icon: SimpleIcon },
  { name: "star", Icon: StarIcon },
  { name: "wider-reach", Icon: WiderReachIcon },
];

const SVGS = [
  "flag-arabic.svg",
  "flag-english.svg",
  "google-play.svg",
  "illustration-provider-phone.svg",
  "linkedin.svg",
  "logo-wordmark.svg",
  "x.svg",
];

const IMAGES = [
  { file: "app-screen-documents.webp", width: 420, height: 1273, bytes: 49088 },
  { file: "app-screen-find-missing-people.webp", width: 420, height: 1435, bytes: 31900 },
  { file: "app-screen-meal-details.webp", width: 420, height: 941, bytes: 36684 },
  { file: "app-screen-new-order.webp", width: 420, height: 1218, bytes: 29244 },
  { file: "app-screen-search-results.webp", width: 420, height: 1176, bytes: 44138 },
  { file: "app-screen-splash.webp", width: 420, height: 910, bytes: 20340 },
  { file: "avatar-6661.webp", width: 420, height: 614, bytes: 7974 },
  { file: "avatar-6662.webp", width: 420, height: 614, bytes: 7548 },
  { file: "avatar-6663.webp", width: 420, height: 614, bytes: 10840 },
  { file: "avatar-6664.webp", width: 420, height: 614, bytes: 10800 },
  { file: "footer-watermark.webp", width: 2878, height: 810, bytes: 11426 },
  { file: "hero-map-scene.webp", width: 2880, height: 2048, bytes: 33252 },
  { file: "illustration-blinkz.webp", width: 538, height: 294, bytes: 2422 },
  { file: "illustration-emergency.webp", width: 724, height: 395, bytes: 5010 },
  { file: "illustration-employee.webp", width: 646, height: 352, bytes: 4848 },
  { file: "illustration-food.webp", width: 568, height: 309, bytes: 4600 },
  { file: "illustration-medical.webp", width: 746, height: 406, bytes: 7444 },
  { file: "illustration-needed.webp", width: 480, height: 262, bytes: 3402 },
  { file: "illustration-real-estate.webp", width: 586, height: 320, bytes: 5622 },
  { file: "illustration-service.webp", width: 458, height: 250, bytes: 2518 },
  { file: "illustration-special.webp", width: 644, height: 351, bytes: 4984 },
  { file: "illustration-the-map.webp", width: 458, height: 250, bytes: 2774 },
  { file: "service-areas-scene.webp", width: 2880, height: 2048, bytes: 85858 },
  { file: "why-choose-character.webp", width: 2880, height: 2384, bytes: 41020 },
  { file: "why-choose-maze.webp", width: 2880, height: 2048, bytes: 192854 },
];

const TOTAL_IMAGE_BYTES = 656590;

function kb(bytes: number) {
  return `${Math.round(bytes / 1024)} KB`;
}

export default function AssetsPage() {
  assertDevPage();

  return (
    <main className="mx-auto flex max-w-desktop flex-col gap-12 p-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-38 font-bold text-primary-500">Assets</h1>
        <p className="text-16 text-natural-600">
          {ICONS.length} icon components · {SVGS.length} multicolour SVGs · {IMAGES.length} WebP
          images ({kb(TOTAL_IMAGE_BYTES)} total). Dev only.
        </p>
      </header>

      <section className="flex flex-col gap-4 border-t border-natural-200 pt-8">
        <h2 className="text-24 font-semibold">Icons — currentColor</h2>
        <div className="flex flex-wrap gap-4">
          {ICONS.map(({ name, Icon }) => (
            <div
              key={name}
              className="flex w-40 flex-col items-center gap-2 rounded-card bg-primary-50 p-4 text-secondary-500"
            >
              <Icon width={40} height={40} />
              <span className="text-12 text-natural-600">{name}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 rounded-card bg-secondary-500 p-4">
          {ICONS.map(({ name, Icon }) => (
            <div key={name} className="flex w-24 flex-col items-center gap-2 text-bg">
              <Icon width={28} height={28} />
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4 border-t border-natural-200 pt-8">
        <h2 className="text-24 font-semibold">Multicolour SVGs — used as files</h2>
        <div className="flex flex-wrap items-end gap-6">
          {SVGS.map((file) => (
            <div key={file} className="flex w-56 flex-col items-center gap-2">
              <Image src={`/svg/${file}`} alt={file} width={120} height={60} unoptimized />
              <span className="text-12 text-natural-600">{file}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4 border-t border-natural-200 pt-8">
        <h2 className="text-24 font-semibold">Rasters — WebP</h2>
        <div className="flex flex-wrap gap-6">
          {IMAGES.map((image) => (
            <figure key={image.file} className="flex w-72 flex-col gap-2">
              <Image
                src={`/images/${image.file}`}
                alt={image.file}
                width={image.width}
                height={image.height}
                className="h-40 w-full rounded-button bg-natural-100 object-contain"
              />
              <figcaption className="text-12 text-natural-600">
                {image.file} — {image.width}x{image.height}, {kb(image.bytes)}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}
