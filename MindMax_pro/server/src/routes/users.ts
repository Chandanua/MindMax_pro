import { Router } from "express";
import { requireAuth } from "../util/requireAuth.js";
import { db } from "../storage/db.js";

export const router = Router();

router.get("/me", requireAuth, async (req, res) => {
  const user = await db.getUserById(req.userId!);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ id: user.id, name: user.name, email: user.email, createdAt: user.createdAt });
});

router.get("/stats", requireAuth, async (req, res) => {
  const userId = req.userId!;
  const checkins = await db.getCheckIns(userId);
  const total = checkins.length;
  const avg = total ? checkins.reduce((a, c) => a + c.intensity, 0) / total : 0;
  const moodCounts: Record<string, number> = {};
  for (const c of checkins) moodCounts[c.mood] = (moodCounts[c.mood] || 0) + 1;
  const mostCommon = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
  res.json({ totalCheckIns: total, averageIntensity: avg, mostCommonMood: mostCommon });
});


