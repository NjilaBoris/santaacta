"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { IconBuildingCommunity, IconDroplets, IconHeartHandshake, IconHome2, IconHospital, IconRecycle, IconRoad, IconSchool } from "@tabler/icons-react";

type PollOption = {
  id: string;
  icon: React.ReactNode;
  label: string;
  accent: string;
};

const POLL_ID = "a0000000-0000-0000-0000-000000000001";

const POLL_OPTIONS: PollOption[] = [
  { id: "Construction-and-improvement-of-market-sheds", icon: <IconHome2 stroke={2} />, label: "Construction and improvement of market sheds", accent: "bg-sky-600" },
  { id: "Waste-disposal-and-sanitation", icon: <IconRecycle stroke={2} />, label: "Waste disposal and sanitation", accent: "bg-rose-600" },
  { id: "Road-maintenance-and-accessibility", icon: <IconRoad stroke={2} />, label: "Road maintenance and accessibility", accent: "bg-violet-600" },
  { id: "Water-supply", icon: <IconDroplets stroke={2} />, label: "Water supply", accent: "bg-emerald-600" },
  { id: "Community-infrastructure-and-public-facilities", icon: <IconBuildingCommunity stroke={2} />, label: "Community infrastructure and public facilities", accent: "bg-emerald-600" },
];

const INITIAL_VOTES: Record<string, number> = {
  "Construction-and-improvement-of-market-sheds": 0,
  "Waste-disposal-and-sanitation": 0,
  "Road-maintenance-and-accessibility": 0,
  "Water-supply": 0,
  "Community-infrastructure-and-public-facilities": 0,
};

const MIN_SAMPLE_SIZE = 100;
const DEVICE_ID_KEY = "parli-poll-device-id";

function calculatePercentages(votes: Record<string, number>): Record<string, number> {
  const total = Object.values(votes).reduce((sum, v) => sum + v, 0);
  const denominator = Math.max(total, MIN_SAMPLE_SIZE);
  return Object.fromEntries(
    Object.entries(votes).map(([key, count]) => [key, Math.round((count / denominator) * 100)]),
  );
}

function getOrCreateDeviceId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem(DEVICE_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(DEVICE_ID_KEY, id);
  }
  return id;
}

export default function ParliamentPoll() {
  const [votes, setVotes] = useState<Record<string, number>>(INITIAL_VOTES);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVoting, setIsVoting] = useState(false);

  const percentages = useMemo(() => calculatePercentages(votes), [votes]);

  const totalVotes = useMemo(
    () => Object.values(votes).reduce((sum, v) => sum + v, 0),
    [votes],
  );

  useEffect(() => {
    let isMounted = true;

    async function loadResults() {
      try {
        const res = await fetch("/api/poll/results");
        if (!res.ok) throw new Error("Failed to load poll results");
        const { options } = await res.json();

        if (isMounted && options) {
          const nextVotes = Object.fromEntries(
            options.map((o: { id: string; vote_count: number }) => [o.id, o.vote_count]),
          );
          setVotes((prev) => ({ ...prev, ...nextVotes }));
        }
      } catch (err) {
        console.error("Failed to load poll results:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadResults();
    return () => {
      isMounted = false;
    };
  }, []);

  async function handleVote(id: string) {
    if (isVoting || selectedId === id) return;

    setIsVoting(true);
    const deviceId = getOrCreateDeviceId();

    try {
      const res = await fetch("/api/poll/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceId, optionId: id, pollId: POLL_ID }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Vote failed");
      }

      const { votes: updated } = await res.json();
      const nextVotes = Object.fromEntries(
        updated.map((o: { id: string; vote_count: number }) => [o.id, o.vote_count]),
      );
      setVotes(nextVotes);
      setSelectedId(id);
    } catch (err) {
      console.error("Failed to cast vote:", err);
    } finally {
      setIsVoting(false);
    }
  }

  return (
    <section className="w-full bg-white px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-xl">
        <h2 className="text-[clamp(1.25rem,3.5vw,1.75rem)] font-bold leading-tight text-neutral-900">
         Which issue should receive greater attention in Santa?
        </h2>
        <p className="mt-2 text-[13px] text-neutral-500 sm:text-sm">
          Tap an issue to cast your vote &middot; {totalVotes} vote{totalVotes === 1 ? "" : "s"} so far
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:gap-3.5">
          {POLL_OPTIONS.map((option) => {
            const percent = percentages[option.id] ?? 0;
            const isSelected = selectedId === option.id;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleVote(option.id)}
                disabled={isVoting}
                aria-pressed={isSelected}
                className={`relative flex w-full items-center gap-3 overflow-hidden rounded-xl p-3 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-70 sm:gap-4 sm:p-4 ${
                  isSelected ? "bg-orange-50" : "bg-neutral-100 hover:bg-neutral-200/70"
                }`}
              >
                <motion.div
                  className={`absolute inset-y-0 left-0 ${isSelected ? "bg-orange-100" : "bg-neutral-200"}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />

                {isSelected && (
                  <motion.div
                    layoutId="pollAccentTick"
                    className="absolute inset-y-0 right-0 w-1 bg-orange-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                )}

                <span
                  className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-base text-white sm:h-10 sm:w-10 sm:text-lg ${option.accent}`}
                  aria-hidden="true"
                >
                  {option.icon}
                </span>

                <span className="relative z-10 flex-1 truncate text-[13.5px] font-semibold text-neutral-900 sm:text-[15px]">
                  {option.label}
                </span>

                <span
                  className={`relative z-10 shrink-0 font-mono text-sm font-bold sm:text-base ${
                    isSelected ? "text-orange-600" : "text-neutral-900"
                  }`}
                >
                  {isLoading ? "—" : `${percent}%`}
                </span>
              </button>
            );
          })}
        </div>

        <p className="mt-8 text-center font-serif text-lg italic text-neutral-700 sm:mt-10 sm:text-xl">
          Poll results will be made available to promote informed community discussion and support constructive citizen– Council dialogue.
        </p>
      </div>
    </section>
  );
}