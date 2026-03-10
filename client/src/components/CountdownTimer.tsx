import { useState, useEffect } from "react";

const TARGET_DATE = new Date("2027-01-01T00:00:00+01:00").getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const diff = TARGET_DATE - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center shadow-lg relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="text-2xl sm:text-4xl font-black text-white tabular-nums relative z-10">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[10px] sm:text-xs font-black text-white/50 mt-3 uppercase tracking-[0.2em]">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-3 sm:gap-6 justify-center items-start">
      <TimeBlock value={timeLeft.days} label="Dagen" />
      <div className="flex items-center text-white/30 text-3xl sm:text-5xl font-black pt-4 sm:pt-8">:</div>
      <TimeBlock value={timeLeft.hours} label="Uren" />
      <div className="flex items-center text-white/30 text-3xl sm:text-5xl font-black pt-4 sm:pt-8">:</div>
      <TimeBlock value={timeLeft.minutes} label="Min" />
      <div className="flex items-center text-white/30 text-3xl sm:text-5xl font-black pt-4 sm:pt-8">:</div>
      <TimeBlock value={timeLeft.seconds} label="Sec" />
    </div>
  );
}
