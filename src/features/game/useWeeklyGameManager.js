import { useState, useEffect } from 'react';

/**
 * Computes the ISO 8601 week number for a given Date.
 * Weeks start on Monday; the first week of the year contains January 4th.
 */
function getISOWeek(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const day = d.getUTCDay() || 7; // Convert Sunday (0) → 7
    d.setUTCDate(d.getUTCDate() + 4 - day); // Set to nearest Thursday
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 86_400_000 + 1) / 7);
}

/**
 * useWeeklyGameManager
 *
 * Fetches /games/schedule.json and resolves which game to show for the
 * current ISO week.
 *
 * Returns:
 *   status     — 'loading' | 'found' | 'not-found' | 'error'
 *   gameConfig — { type, dataPath, label } | null
 *   isoWeek    — number (current ISO week)
 */
export function useWeeklyGameManager() {
    const isoWeek = getISOWeek(new Date());

    const [status, setStatus] = useState('loading');
    const [gameConfig, setGameConfig] = useState(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchSchedule() {
            try {
                const res = await fetch(`/games/schedule.json?v=${isoWeek}`, { cache: 'no-store' });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);

                const schedule = await res.json();
                if (cancelled) return;

                const key = String(isoWeek);
                if (schedule[key]) {
                    setGameConfig(schedule[key]);
                    setStatus('found');
                } else {
                    setStatus('not-found');
                }
            } catch {
                if (!cancelled) setStatus('error');
            }
        }

        fetchSchedule();
        return () => { cancelled = true; };
    }, [isoWeek]);

    return { status, gameConfig, isoWeek };
}
