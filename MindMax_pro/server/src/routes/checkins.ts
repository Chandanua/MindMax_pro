import { Router } from "express";
import { z } from "zod";
import { db } from "../storage/db.js";
import { requireAuth } from "../util/requireAuth.js";

export const router = Router();

const CheckInSchema = z.object({
  mood: z.enum(["happy", "sad", "anxious", "calm", "stressed", "neutral"]),
  intensity: z.number().int().min(1).max(10),
  notes: z.string().max(2000).optional().default(""),
  timestamp: z.string().datetime().optional(),
});

router.get("/", requireAuth, async (req, res) => {
  const userId = req.userId!;
  const items = await db.getCheckIns(userId);
  res.json(items);
});

router.post("/", requireAuth, async (req, res) => {
  const parse = CheckInSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });
  const userId = req.userId!;
  const item = await db.addCheckIn(userId, {
    ...parse.data,
    timestamp: parse.data.timestamp || new Date().toISOString(),
  });
  res.status(201).json(item);
});

router.delete("/:id", requireAuth, async (req, res) => {
  const userId = req.userId!;
  const { id } = req.params;
  const ok = await db.deleteCheckIn(userId, id);
  if (!ok) return res.status(404).json({ error: "Not found" });
  res.status(204).send();
});


