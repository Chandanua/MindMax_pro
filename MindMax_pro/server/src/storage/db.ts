import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = process.env.DATA_DIR || path.resolve(__dirname, "../../data");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const CHECKINS_FILE = path.join(DATA_DIR, "checkins.json");

interface UserRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

interface CheckInRecord {
  id: string;
  userId: string;
  mood: "happy" | "sad" | "anxious" | "calm" | "stressed" | "neutral";
  intensity: number;
  notes: string;
  timestamp: string;
}

async function ensureFiles() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  for (const f of [USERS_FILE, CHECKINS_FILE]) {
    try {
      await fs.access(f);
    } catch {
      await fs.writeFile(f, JSON.stringify([]));
    }
  }
}

async function readJson<T>(file: string): Promise<T> {
  await ensureFiles();
  const data = await fs.readFile(file, "utf8");
  return JSON.parse(data) as T;
}

async function writeJson<T>(file: string, value: T): Promise<void> {
  await ensureFiles();
  await fs.writeFile(file, JSON.stringify(value, null, 2));
}

export const db = {
  async getUserByEmail(email: string): Promise<UserRecord | undefined> {
    const users = await readJson<UserRecord[]>(USERS_FILE);
    return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  },
  async getUserById(id: string): Promise<UserRecord | undefined> {
    const users = await readJson<UserRecord[]>(USERS_FILE);
    return users.find((u) => u.id === id);
  },
  async createUser(input: { name: string; email: string; passwordHash: string }): Promise<UserRecord> {
    const users = await readJson<UserRecord[]>(USERS_FILE);
    const record: UserRecord = {
      id: uuidv4(),
      name: input.name,
      email: input.email,
      passwordHash: input.passwordHash,
      createdAt: new Date().toISOString(),
    };
    users.push(record);
    await writeJson(USERS_FILE, users);
    return record;
  },
  async getCheckIns(userId: string): Promise<CheckInRecord[]> {
    const checkins = await readJson<CheckInRecord[]>(CHECKINS_FILE);
    return checkins.filter((c) => c.userId === userId).sort((a, b) => a.timestamp.localeCompare(b.timestamp));
  },
  async addCheckIn(userId: string, input: Omit<CheckInRecord, "id" | "userId">): Promise<CheckInRecord> {
    const checkins = await readJson<CheckInRecord[]>(CHECKINS_FILE);
    const record: CheckInRecord = { id: uuidv4(), userId, ...input } as CheckInRecord;
    checkins.push(record);
    await writeJson(CHECKINS_FILE, checkins);
    return record;
  },
  async deleteCheckIn(userId: string, id: string): Promise<boolean> {
    const checkins = await readJson<CheckInRecord[]>(CHECKINS_FILE);
    const idx = checkins.findIndex((c) => c.id === id && c.userId === userId);
    if (idx === -1) return false;
    checkins.splice(idx, 1);
    await writeJson(CHECKINS_FILE, checkins);
    return true;
  },
};

export type { UserRecord, CheckInRecord };


