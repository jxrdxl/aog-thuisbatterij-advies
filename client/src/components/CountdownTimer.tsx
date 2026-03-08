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
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
        <span className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[11px] sm:text-xs font-medium text-white/70 mt-1.5 uppercase tracking-wider">
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
    <div className="flex gap-2 sm:gap-3 justify-center">
      <TimeBlock value={timeLeft.days} label="Dagen" />
      <div className="flex items-center text-white/40 text-2xl font-bold pt-0 -mt-4">:</div>
      <TimeBlock value={timeLeft.hours} label="Uren" />
      <div className="flex items-center text-white/40 text-2xl font-bold pt-0 -mt-4">:</div>
      <TimeBlock value={timeLeft.minutes} label="Min" />
      <div className="flex items-center text-white/40 text-2xl font-bold pt-0 -mt-4">:</div>
      <TimeBlock value={timeLeft.seconds} label="Sec" />
    </div>
  );
}
