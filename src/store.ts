import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Note } from "./types";
import { createId } from "./types";

const WELCOME = `# 欢迎来到 Notes Studio

这是你的第一页笔记。左侧是书架，右边是稿纸 —— **在明亮书房里写作**。

## 试试这些

- 直接在左侧编辑，右侧**实时渲染**
- 用上方搜索框按标题找笔记
- 选中笔记左侧的橙色粗线标记当前书页

## 代码高亮（亮色主题）

\`\`\`ts
interface Book {
  title: string;
  pages: number;
}

function read(book: Book): string {
  return \`Reading \${book.title}, \${book.pages} pages.\`;
}
\`\`\`

> 写作是把混沌誊写成句子。

| 功能 | 状态 |
| --- | --- |
| 实时预览 | ✓ |
| 代码高亮 | ✓ |
| 本地保存 | ✓ |
`;

/** 首次加载的欢迎笔记（localStorage 无数据时种入） */
function welcomeNote(): Note {
  const now = Date.now();
  return {
    id: createId(),
    title: "欢迎使用 Notes Studio",
    content: WELCOME,
    createdAt: now,
    updatedAt: now,
  };
}

interface NotesState {
  notes: Note[];
  activeId: string | null;
  query: string;
  addNote: () => void;
  removeNote: (id: string) => void;
  updateNote: (id: string, patch: Partial<Pick<Note, "title" | "content">>) => void;
  setActive: (id: string) => void;
  setQuery: (q: string) => void;
}

/** 排序：最近编辑的在最上面 */
function byRecency(a: Note, b: Note): number {
  return b.updatedAt - a.updatedAt;
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set) => ({
      notes: [welcomeNote()],
      activeId: null,
      query: "",

      addNote: () => {
        const now = Date.now();
        const note: Note = {
          id: createId(),
          title: "无标题笔记",
          content: "",
          createdAt: now,
          updatedAt: now,
        };
        set((s) => ({
          notes: [note, ...s.notes],
          activeId: note.id,
          query: "",
        }));
      },

      removeNote: (id) =>
        set((s) => {
          const notes = s.notes.filter((n) => n.id !== id);
          const activeId =
            s.activeId === id ? (notes[0]?.id ?? null) : s.activeId;
          return { notes, activeId };
        }),

      updateNote: (id, patch) =>
        set((s) => ({
          notes: s.notes.map((n) =>
            n.id === id ? { ...n, ...patch, updatedAt: Date.now() } : n,
          ),
        })),

      setActive: (id) => set({ activeId: id }),
      setQuery: (query) => set({ query }),
    }),
    {
      name: "notes-studio.v1",
      version: 1,
      migrate: (persisted) => {
        const raw = persisted as { notes?: unknown[] } | undefined;
        const notes = Array.isArray(raw?.notes) ? raw.notes : [];
        const clean: Note[] = [];
        for (const item of notes) {
          const n = item as Partial<Note>;
          if (typeof n.id !== "string" || n.id === "") continue;
          clean.push({
            id: n.id,
            title: typeof n.title === "string" ? n.title : "无标题笔记",
            content: typeof n.content === "string" ? n.content : "",
            createdAt: typeof n.createdAt === "number" ? n.createdAt : Date.now(),
            updatedAt: typeof n.updatedAt === "number" ? n.updatedAt : Date.now(),
          });
        }
        const active = clean.find((n) => n.id === (raw as { activeId?: string })?.activeId);
        if (clean.length === 0) {
          const seed = welcomeNote();
          return { notes: [seed], activeId: seed.id, query: "" };
        }
        return {
          notes: clean.sort(byRecency),
          activeId: active?.id ?? clean[0]?.id ?? null,
          query: "",
        };
      },
      // 持久化时排除 query
      partialize: (s) => ({ notes: s.notes, activeId: s.activeId }),
    },
  ),
);

/** 按标题模糊匹配（大小写不敏感） */
export function matchesQuery(note: Note, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return note.title.toLowerCase().includes(q);
}
