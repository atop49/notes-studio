import { useEffect } from "react";
import { useNotesStore } from "../store";
import { MarkdownPreview } from "./markdown-preview";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

export function EditorPane() {
  const notes = useNotesStore((s) => s.notes);
  const activeId = useNotesStore((s) => s.activeId);
  const updateNote = useNotesStore((s) => s.updateNote);

  const note = notes.find((n) => n.id === activeId) ?? null;

  // ⌘S/⌘N 快捷键：保存提示（自动保存已生效，做防呆）+ 新建
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "n") {
        e.preventDefault();
        useNotesStore.getState().addNote();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!note) {
    return (
      <section className="flex h-full min-h-0 items-center justify-center bg-paper">
        <div className="border border-hairline px-8 py-14 text-center">
          <p className="font-display text-lg tracking-[0.04em] text-ink/80">
            没有打开的稿纸
          </p>
          <p className="mx-auto mt-2 max-w-[36ch] text-[13px] leading-relaxed text-muted">
            从左侧书架选一页笔记，或新建一页开始写作。
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex h-full min-h-0 flex-col bg-paper lg:grid lg:grid-cols-2">
      {/* 编辑侧 */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col border-b border-hairline lg:border-b-0 lg:border-r">
        <input
          type="text"
          value={note.title}
          onChange={(e) => updateNote(note.id, { title: e.target.value })}
          placeholder="笔记标题"
          aria-label="笔记标题"
          className="h-12 w-full border-b border-hairline bg-transparent px-6 font-display text-lg tracking-[0.03em] text-ink placeholder:text-muted/50 focus:outline-none"
        />
        <textarea
          value={note.content}
          onChange={(e) => updateNote(note.id, { content: e.target.value })}
          placeholder="# 从这里开始写…"
          aria-label="Markdown 正文"
          spellCheck={false}
          className="min-h-0 w-full flex-1 resize-none bg-transparent px-6 py-5 font-mono text-[13px] leading-[1.7] text-ink/90 placeholder:text-muted/50 focus:outline-none"
        />
      </div>

      {/* 预览侧：杂志排版 */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <div className="flex h-12 items-center justify-between border-b border-hairline px-6">
          <span className="mono-label">预览 · PREVIEW</span>
          <span className="mono-label tabular-nums">
            更新于 {format(note.updatedAt, "HH:mm:ss", { locale: zhCN })}
          </span>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-8 py-7">
          <MarkdownPreview source={note.content} />
        </div>
      </div>
    </section>
  );
}
