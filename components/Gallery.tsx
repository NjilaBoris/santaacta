"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { MoreVertical, ChevronDown } from "lucide-react";
import Image from "next/image";

type Photo = {
  id: string;
  src: string;
  alt: string;
  aspect: "square" | "portrait" | "landscape" | "tall";
  author?: {
    name: string;
    avatar: string;
  };
};

// Swap `src` for your own asset paths (e.g. /photos/xxx.jpg) or a CMS/Unsplash URL.
const photos: Photo[] = [
  {
    id: "1",
    src: "/images/1.jpg",
    alt: "Matcha being whisked in a bowl",
    aspect: "square",
    author: { name: "Tiffany Gleason", avatar: "https://i.pravatar.cc/64?img=47" },
  },
  {
    id: "2",
    src: "/images/2.jpg",
    alt: "Prickly pear cactus against pink backdrop",
    aspect: "square",
  },
  {
    id: "3",
    src: "/images/3.jpg",
    alt: "Pressed yellow flowers on paper",
    aspect: "square",
  },
  {
    id: "4",
    src: "/images/4.jpg",
    alt: "View above the clouds at dusk",
    aspect: "square",
  },
  {
    id: "5",
    src: "/images/5.jpg",
    alt: "Curved balconies of a modernist building",
    aspect: "tall",
  },
  {
    id: "6",
    src: "/images/6.jpg",
    alt: "Footprints in fine white sand",
    aspect: "square",
  },
  {
    id: "7",
    src: "/images/7.jpg",
    alt: "Wood-burning stove inside a cabin",
    aspect: "portrait",
  },
  {
    id: "8",
    src: "/images/8.jpg",
    alt: "Red protea flower on white background",
    aspect: "portrait",
  },
  {
    id: "9",
    src: "/images/9.jpg",
    alt: "Symmetrical hotel atrium balconies",
    aspect: "square",
  },
  {
    id: "10",
    src: "/images/10.jpg",
    alt: "Long exposure of car light trails",
    aspect: "landscape",
  },
  {
    id: "11",
    src: "/images/11.jpg",
    alt: "Slot canyon curves in warm light",
    aspect: "portrait",
  },
  {
    id: "12",
    src: "/images/12.jpg",
    alt: "Turquoise salt pools along a coastline",
    aspect: "square",
  },
  {
    id: "13",
    src: "/images/13.jpg",
    alt: "Rolling green mountain ridgeline",
    aspect: "square",
  },
  {
    id: "14",
    src: "/images/14.jpg",
    alt: "Pink blossoms against a soft sky",
    aspect: "square",
  },
  {
    id: "15",
    src: "/images/15.jpg",
    alt: "Pink blossoms against a soft sky",
    aspect: "square",
  },
  {
    id: "16",
    src: "/images/16.jpg",
    alt: "Soft morning light on a concrete wall",
    aspect: "portrait",
  },
  {
    id: "17",
    src: "/images/17.jpg",
    alt: "Layered desert hills under warm sun",
    aspect: "landscape",
  },
  {
    id: "18",
    src: "/images/18.jpg",
    alt: "Hands holding a ceramic mug by the window",
    aspect: "square",
  },
  {
    id: "19",
    src: "/images/19.jpg",
    alt: "Minimalist staircase in a bright interior",
    aspect: "tall",
  },
  {
    id: "20",
    src: "/images/20.jpg",
    alt: "Orange marigold petals in close detail",
    aspect: "square",
  },
  {
    id: "21",
    src: "/images/21.jpg",
    alt: "Rolling coastal cliffs in blue haze",
    aspect: "landscape",
  },
  {
    id: "22",
    src: "/images/22.jpg",
    alt: "Minimal green plant in a white ceramic pot",
    aspect: "portrait",
  },
  {
    id: "23",
    src: "/images/23.jpg",
    alt: "Sunlit kitchen counter with fresh lemons",
    aspect: "square",
  },
  {
    id: "24",
    src: "/images/24.jpg",
    alt: "Textured stone archway in warm evening light",
    aspect: "portrait",
  },
  {
    id: "25",
    src: "/images/25.jpg",
    alt: "Dark forest path fading into mist",
    aspect: "landscape",
  },
  {
    id: "26",
    src: "/images/26.jpg",
    alt: "Soft pink petals scattered across paper",
    aspect: "square",
  },
  {
    id: "27",
    src: "/images/27.jpg",
    alt: "Spiral staircase framed by a skylight",
    aspect: "tall",
  },
  {
    id: "28",
    src: "/images/28.jpg",
    alt: "A quiet beach at sunrise with gentle waves",
    aspect: "landscape",
  },
  {
    id: "29",
    src: "/images/29.jpg",
    alt: "Neutral-toned lounge chair by a window",
    aspect: "portrait",
  },
  {
    id: "30",
    src: "/images/30.jpg",
    alt: "Stacked books and a cup on a wooden table",
    aspect: "square",
  },
  // {
  //   id: "31",
  //   src: "/images/31.jpg",
  //   alt: "Aerial view of a winding river through green fields",
  //   aspect: "landscape",
  // },
  // {
  //   id: "32",
  //   src: "/images/32.jpg",
  //   alt: "White ceramic vase with dried grasses",
  //   aspect: "portrait",
  // },
  // {
  //   id: "33",
  //   src: "/images/33.jpg",
  //   alt: "Golden hour across a modern residential street",
  //   aspect: "square",
  // },
  // {
  //   id: "34",
  //   src: "/images/34.jpg",
  //   alt: "Rainy glass facade reflecting city lights",
  //   aspect: "tall",
  // },
  // {
  //   id: "35",
  //   src: "/images/35.jpg",
  //   alt: "Dried lavender stems in a soft linen backdrop",
  //   aspect: "square",
  // },
  // {
  //   id: "36",
  //   src: "/images/36.jpg",
  //   alt: "A line of umbrellas in a quiet city square",
  //   aspect: "landscape",
  // },
  // {
  //   id: "37",
  //   src: "/images/37.jpg",
  //   alt: "Open window with sheer curtains and sunlight",
  //   aspect: "portrait",
  // },
  // {
  //   id: "38",
  //   src: "/images/38.jpg",
  //   alt: "Fresh blueberries in a ceramic bowl",
  //   aspect: "square",
  // },
  // {
  //   id: "39",
  //   src: "/images/39.jpg",
  //   alt: "Cliffside house overlooking the ocean",
  //   aspect: "landscape",
  // },
  // {
  //   id: "40",
  //   src: "/images/40.jpg",
  //   alt: "Terracotta planters lined along a sunlit wall",
  //   aspect: "portrait",
  // },
  // {
  //   id: "41",
  //   src: "/images/41.jpg",
  //   alt: "Colorful market fruit display in a narrow street",
  //   aspect: "square",
  // },
  // {
  //   id: "42",
  //   src: "/images/42.jpg",
  //   alt: "Warm wooden cabin exterior under twilight sky",
  //   aspect: "landscape",
  // },
  // {
  //   id: "43",
  //   src: "/images/43.jpg",
  //   alt: "Monochrome arrangement of folded linens",
  //   aspect: "portrait",
  // },
  // {
  //   id: "44",
  //   src: "/images/44.jpg",
  //   alt: "Lush botanical garden path in soft morning fog",
  //   aspect: "square",
  // },
  // {
  //   id: "45",
  //   src: "/images/45.jpg",
  //   alt: "Curved roofline of a modern building at dusk",
  //   aspect: "tall",
  // },
  // {
  //   id: "46",
  //   src: "/images/46.jpg",
  //   alt: "White sand dunes with long shadows at noon",
  //   aspect: "landscape",
  // },
  // {
  //   id: "47",
  //   src: "/images/47.jpg",
  //   alt: "Vintage camera resting on a cream tablecloth",
  //   aspect: "square",
  // },
  // {
  //   id: "48",
  //   src: "/images/48.jpg",
  //   alt: "Glasshouse corridor lined with tropical plants",
  //   aspect: "portrait",
  // },
  // {
  //   id: "49",
  //   src: "/images/49.jpg",
  //   alt: "Cyan pool reflections beneath a stone bridge",
  //   aspect: "square",
  // },
  // {
  //   id: "50",
  //   src: "/images/50.jpg",
  //   alt: "Long shadows of trees in a dry field",
  //   aspect: "landscape",
  // },
  // {
  //   id: "51",
  //   src: "/images/51.jpg",
  //   alt: "Bent branch with white blossoms in sunlight",
  //   aspect: "portrait",
  // },
  // {
  //   id: "52",
  //   src: "/images/52.jpg",
  //   alt: "Stylish coffee corner with curved silhouettes",
  //   aspect: "square",
  // },
  // {
  //   id: "53",
  //   src: "/images/53.jpg",
  //   alt: "Quiet mountain lake with mirrored reflections",
  //   aspect: "landscape",
  // },
  // {
  //   id: "54",
  //   src: "/images/54.jpg",
  //   alt: "Soft floral arrangement beside a warm lamp",
  //   aspect: "square",
  // },
];

const aspectClass: Record<Photo["aspect"], string> = {
  square: "aspect-[1/1]",
  portrait: "aspect-[4/5]",
  landscape: "aspect-[16/10]",
  tall: "aspect-[3/4.6]",
};

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.045,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

function PhotoCard({ photo }: { photo: Photo }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.figure
      variants={item}
      className="group relative mb-3 break-inside-avoid overflow-hidden rounded-2xl bg-neutral-100 sm:mb-4"
    >
      <div className={`relative w-full ${aspectClass[photo.aspect]}`}>
        <Image
          src={photo.src}
          width={300}
          height={800}
          alt={photo.alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-500 ease-out group-hover:scale-[1.03] ${
            loaded ? "opacity-100 blur-0" : "opacity-0 blur-sm"
          }`}
        />

        {/* subtle hover scrim so overlays stay legible */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* {photo.author && (
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-2.5 sm:p-3">
            <div className="flex items-center gap-1.5 rounded-full bg-black/35 py-1 pl-1 pr-2.5 backdrop-blur-sm sm:gap-2 sm:pr-3">
              <img
                src={photo.author.avatar}
                alt={photo.author.name}
                className="h-5 w-5 rounded-full ring-1 ring-white/70 sm:h-6 sm:w-6"
              />
              <span className="text-[11px] font-medium text-white sm:text-xs">
                {photo.author.name}
              </span>
            </div>
            <button
              type="button"
              aria-label="More options"
              className="rounded-full p-1 text-white/90 transition-colors hover:bg-black/25 sm:p-1.5"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>
        )} */}
      </div>
    </motion.figure>
  );
}

export default function PhotoGallery() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-3 py-6 sm:px-5 sm:py-8 lg:px-8">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4"
      >
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </motion.div>

      {/* floating scroll-to-more affordance */}
      <motion.button
        type="button"
        aria-label="Scroll for more photos"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.96 }}
        onClick={() =>
          window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" })
        }
        className="fixed bottom-5 left-1/2 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 sm:h-12 sm:w-12"
      >
        <ChevronDown className="h-5 w-5" />
      </motion.button>
    </section>
  );
}