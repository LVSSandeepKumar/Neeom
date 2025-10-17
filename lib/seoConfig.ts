// lib/seoConfig.ts
import { Metadata } from "next";

const WEB_URL = process.env.WEB_URL || "https://neeom.vercel.app";
const LOGO_URL = `${WEB_URL}/logo-neeom.png`;
const SITE_NAME = "NEEOM Design Studio";

export const seoConfig: Record<string, Metadata> = {
  home: {
    title: "Best Interior Designer in Hyderabad",
    description: "Transform your space with Hyderabad's top interior designers.",
    'google-site-verification' : "l_mDqcI6fWATWEoMtJ5OmMYTg000qiHY7riHdwnDy1U",
    keywords: [
      "best interior designer Hyderabad",
      "home interior design",
      "office interior design",
      "luxury interiors",
    ],
    openGraph: {
      title: SITE_NAME,
      description: "Transform your space with Hyderabad's top interior designers.",
      url: WEB_URL,
      siteName: SITE_NAME,
      images: [
        {
          url: LOGO_URL,
          width: 800,
          height: 600,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_NAME,
      description: "Transform your space with Hyderabad's top interior designers.",
      images: [LOGO_URL],
    },
  },

  about: {
    title: "About | Neeom Design Studio",
    description: "Expert designers, quality materials, timely delivery. Your trusted partner for dream interiors.",
    keywords: [
      "stunning projects",
      "quality materials",
      "talented designers",
      "top designers",
      "best works",
      "residential projects",
      "commercial projects",
    ],
    openGraph: {
      title: "About Neeom Design Studio",
      description: "Expert designers, quality materials, timely delivery. Your trusted partner for dream interiors.",
      url: `${WEB_URL}/about`,
      siteName: SITE_NAME,
      images: [
        {
          url: LOGO_URL,
          width: 800,
          height: 600,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "About Neeom Design Studio",
      description: "Expert designers, quality materials, timely delivery. Your trusted partner for dream interiors.",
      images: [LOGO_URL],
    },
  },

  portfolio: {
    title: "Portfolio Gallery | Neeom Design Studio",
    description: "Explore our stunning interior design projects.",
    keywords: [
      "stunning projects",
      "modern home interiors",
      "luxury interiors",
      "office interiors",
      "commercial spaces",
      "residential spaces",
      "design interior projects",
      "stunning portfolio",
      "our best works",
    ],
    openGraph: {
      title: "Portfolio Gallery | Neeom Design Studio",
      description: "Explore our stunning interior design projects.",
      url: `${WEB_URL}/portfolio`,
      siteName: SITE_NAME,
      images: [
        {
          url: LOGO_URL,
          width: 800,
          height: 600,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Portfolio Gallery | Neeom Design Studio",
      description: "Explore our stunning interior design projects.",
      images: [LOGO_URL],
    },
  },

  services: {
    title: "Services | Neeom Design Studio",
    description:
      "Complete interior design services in Hyderabad. Modular kitchens, bedroom design, office interiors, turnkey solutions. Quality work with warranty.",
    keywords: [
      "complete interior design services",
      "modular kitchens",
      "bedroom design",
      "office interiors",
      "personal space designs",
      "kids rooms",
      "quality work",
      "warranty",
    ],
    openGraph: {
      title: "Services | Neeom Design Studio",
      description:
        "Complete interior design services in Hyderabad. Modular kitchens, bedroom design, office interiors, turnkey solutions. Quality work with warranty.",
      url: "https://yourdomain.com/contact",
      siteName: SITE_NAME,
      images: [
        {
          url: "https://yourdomain.com/og-contact.jpg",
          width: 800,
          height: 600,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Services | Neeom Design Studio",
      description: "Complete interior design services in Hyderabad.",
      images: [LOGO_URL],
    },
  },

  reviews: {
    title: "Client Reviews | Neeom Design Studio",
    description: "Top Interior Designer Hyderabad Testimonials",
    keywords: [
      "authentic reviews",
      "satisfied clients",
      "best interior designers in Hyderabad",
      "5-star service guaranteed",
    ],
    openGraph: {
      title: "Client Reviews | Neeom Design Studio",
      description:
        "Top Interior Designer Hyderabad Testimonials",
      url: `${WEB_URL}/reviews`,
      siteName: SITE_NAME,
      images: [
        {
          url: LOGO_URL,
          width: 800,
          height: 600,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Client Reviews | Neeom Design Studio",
      description: "Top Interior Designer Hyderabad Testimonials",
      images: [LOGO_URL],
    },
  },
};
