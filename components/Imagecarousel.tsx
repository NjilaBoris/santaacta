"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  type PanInfo,
  type Variants,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  {
    id: "31",
    src: "/images/31.jpg",
    alt: "Aerial view of a winding river through green fields",
    aspect: "landscape",
  },
  {
    id: "32",
    src: "/images/32.jpg",
    alt: "White ceramic vase with dried grasses",
    aspect: "portrait",
  },
  {
    id: "33",
    src: "/images/33.jpg",
    alt: "Golden hour across a modern residential street",
    aspect: "square",
  },
  {
    id: "34",
    src: "/images/34.jpg",
    alt: "Rainy glass facade reflecting city lights",
    aspect: "tall",
  },
  {
    id: "35",
    src: "/images/35.jpg",
    alt: "Dried lavender stems in a soft linen backdrop",
    aspect: "square",
  },
  {
    id: "36",
    src: "/images/36.jpg",
    alt: "A line of umbrellas in a quiet city square",
    aspect: "landscape",
  },
  {
    id: "37",
    src: "/images/37.jpg",
    alt: "Open window with sheer curtains and sunlight",
    aspect: "portrait",
  },
  {
    id: "38",
    src: "/images/38.jpg",
    alt: "Fresh blueberries in a ceramic bowl",
    aspect: "square",
  },
  {
    id: "39",
    src: "/images/39.jpg",
    alt: "Cliffside house overlooking the ocean",
    aspect: "landscape",
  },
  {
    id: "40",
    src: "/images/40.jpg",
    alt: "Terracotta planters lined along a sunlit wall",
    aspect: "portrait",
  },
  {
    id: "41",
    src: "/images/41.jpg",
    alt: "Colorful market fruit display in a narrow street",
    aspect: "square",
  },
  {
    id: "42",
    src: "/images/42.jpg",
    alt: "Warm wooden cabin exterior under twilight sky",
    aspect: "landscape",
  },
  {
    id: "43",
    src: "/images/43.jpg",
    alt: "Monochrome arrangement of folded linens",
    aspect: "portrait",
  },
  {
    id: "44",
    src: "/images/44.jpg",
    alt: "Lush botanical garden path in soft morning fog",
    aspect: "square",
  },
  {
    id: "45",
    src: "/images/45.jpg",
    alt: "Curved roofline of a modern building at dusk",
    aspect: "tall",
  },
  {
    id: "46",
    src: "/images/46.jpg",
    alt: "White sand dunes with long shadows at noon",
    aspect: "landscape",
  },
  {
    id: "47",
    src: "/images/47.jpg",
    alt: "Vintage camera resting on a cream tablecloth",
    aspect: "square",
  },
  {
    id: "48",
    src: "/images/48.jpg",
    alt: "Glasshouse corridor lined with tropical plants",
    aspect: "portrait",
  },
  {
    id: "49",
    src: "/images/49.jpg",
    alt: "Cyan pool reflections beneath a stone bridge",
    aspect: "square",
  },
  {
    id: "50",
    src: "/images/50.jpg",
    alt: "Long shadows of trees in a dry field",
    aspect: "landscape",
  },
  {
    id: "51",
    src: "/images/51.jpg",
    alt: "Bent branch with white blossoms in sunlight",
    aspect: "portrait",
  },
  {
    id: "52",
    src: "/images/52.jpg",
    alt: "Stylish coffee corner with curved silhouettes",
    aspect: "square",
  },
  {
    id: "53",
    src: "/images/53.jpg",
    alt: "Quiet mountain lake with mirrored reflections",
    aspect: "landscape",
  },
  {
    id: "54",
    src: "/images/54.jpg",
    alt: "Soft floral arrangement beside a warm lamp",
    aspect: "square",
  },
];

const SWIPE_DISTANCE_THRESHOLD = 60;
const SWIPE_VELOCITY_THRESHOLD = 500;

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "12%" : "-12%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-12%" : "12%",
    opacity: 0,
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] },
  }),
};

type ImageCarouselProps = {
  images?: Photo[];
  autoPlayMs?: number; // defaults to 4000ms auto-swipe; pass 0 to disable
};

export default function ImageCarousel({
  images = photos,
  autoPlayMs = 4000,
}: ImageCarouselProps) {
  const [[index, direction], setIndexState] = useState<[number, number]>([0, 0]);
  const [isPaused, setIsPaused] = useState(false);
  const thumbRailRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const count = images.length;
  const current = images[index];

  const goTo = useCallback(
    (nextIndex: number, dir: number) => {
      const wrapped = ((nextIndex % count) + count) % count;
      setIndexState([wrapped, dir]);
    },
    [count]
  );

  const goNext = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1, -1), [goTo, index]);

  // keyboard navigation
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev]);

  // optional autoplay, pauses on hover/focus/interaction
  useEffect(() => {
    if (!autoPlayMs || isPaused) return;
    const id = setInterval(goNext, autoPlayMs);
    return () => clearInterval(id);
  }, [autoPlayMs, isPaused, goNext]);

  // keep the active thumbnail scrolled into view
//   useEffect(() => {
//     const el = thumbRefs.current[index];
//     el?.scrollIntoView({
//       behavior: "smooth",
//       inline: "center",
//       block: "nearest",
//     });
//   }, [index]);

  function handleDragEnd(
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) {
    const { offset, velocity } = info;
    if (
      offset.x < -SWIPE_DISTANCE_THRESHOLD ||
      velocity.x < -SWIPE_VELOCITY_THRESHOLD
    ) {
      goNext();
    } else if (
      offset.x > SWIPE_DISTANCE_THRESHOLD ||
      velocity.x > SWIPE_VELOCITY_THRESHOLD
    ) {
      goPrev();
    }
  }

  return (
    <div
      className="mx-auto w-full max-w-4xl select-none px-3 py-6 sm:px-5 sm:py-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* main slide */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-100 sm:aspect-[16/10]">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragStart={() => setIsPaused(true)}
            onDragEnd={(event, info) => {
              handleDragEnd(event, info);
              setIsPaused(false);
            }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <img
              src={current.src}
              alt={current.alt}
              draggable={false}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* gradient + caption */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
        {/* <p className="pointer-events-none absolute inset-x-4 bottom-3 line-clamp-1 text-sm font-medium text-white sm:inset-x-5 sm:bottom-4 sm:text-base">
          {current.alt}
        </p> */}

        {/* counter */}
        <span className="absolute right-3 top-3 rounded-full bg-black/35 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm sm:right-4 sm:top-4">
          {index + 1} / {count}
        </span>

        {/* prev / next arrows */}
        <button
          type="button"
          aria-label="Previous image"
          onClick={goPrev}
          className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-neutral-800 shadow-md transition-transform hover:scale-105 active:scale-95 sm:left-3 sm:h-10 sm:w-10"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next image"
          onClick={goNext}
          className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-neutral-800 shadow-md transition-transform hover:scale-105 active:scale-95 sm:right-3 sm:h-10 sm:w-10"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* thumbnail rail */}
      <div
        ref={thumbRailRef}
        className="mt-3 flex gap-2 overflow-x-auto scroll-smooth pb-1 sm:mt-4 sm:gap-2.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((photo, i) => {
          const isActive = i === index;
          return (
            <button
              key={photo.id}
              ref={(el) => {
                thumbRefs.current[i] = el;
              }}
              type="button"
              aria-label={`Go to image ${i + 1}: ${photo.alt}`}
              aria-current={isActive}
              onClick={() => goTo(i, i > index ? 1 : -1)}
              className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-lg ring-2 transition-all duration-200 sm:h-16 sm:w-16 ${
                isActive
                  ? "ring-indigo-500 opacity-100"
                  : "ring-transparent opacity-60 hover:opacity-90"
              }`}
            >
              <img
                src={photo.src}
                alt=""
                draggable={false}
                className="h-full w-full object-cover"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}