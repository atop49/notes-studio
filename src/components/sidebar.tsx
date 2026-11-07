import { useMemo } from "react";
import { useNotesStore, matchesQuery } from "../store";
import { IconPlus, IconSearch, IconTrash } from "./icons";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

function relativeStamp(ts: number): string {
  return format(ts, "M月d日 HH:mm", { locale: zhCN });
}

export function Sidebar() {
  const notes = useNotesStore((s) => s.notes);
  const activeId = useNotesStore((s) => s.activeId);
  const query = useNotesStore((s) => s.query);
  const setActive = useNotesStore((s) => s.setActive);
  const setQuery = useNotesStore((s) => s.setQuery);
  const addNote = useNotesStore((s) => s.addNote);
  const removeNote = useNotesStore((s) => s.removeNote);

  const visible = useMemo(
    () => notes.filter((n) => matchesQuery(n, query)),
    [notes, query],
  );

  return (
    <aside className="flex h-full min-h-0 flex-col border-r border-hairline bg-paper-deep">
      {/* 品牌行 */}
      <div className="px-5 pb-4 pt-6">
        <h1 className="font-display text-2xl leading-none tracking-[0.04em] text-ink select-none">
          笔记
        </h1>
        <p className="mono-label mt-2">NOTES STUDIO — 明亮书房</p>
      </div>

      {/* 搜索 + 新建 */}
      <div className="flex items-center gap-2 px-5 pb-3">
        <div className="relative min-w-0 flex-1">
          <IconSearch
            width={13}
            height={13}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索笔记…"
            aria-label="搜索笔记"
            className="field h-9 w-full rounded-none pl-8 pr-3"
          />
        </div>
        <button
          type="button"
          onClick={addNote}
          aria-label="新建笔记"
          title="新建笔记"
          className="flex h-9 w-9 flex-none items-center justify-center border border-hairline text-muted transition-colors duration-150 hover:border-hairline-strong hover:text-ink"
        >
          <IconPlus width={14} height={14} />
        </button>
      </div>

      {/* 计数 */}
      <div className="flex items-center justify-between border-y border-hairline px-5 py-2">
        <span className="mono-label">
          {query.trim() ? `匹配 ${visible.length} / ${notes.length}` : `书架 ${notes.length}`}
        </span>
        {query.trim() && visible.length !== notes.length && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="mono-label transition-colors duration-150 hover:text-accent"
          >
            清除
          </button>
        )}
      </div>

      {/* 笔记列表：纯白卡片 */}
      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
        {visible.length === 0 ? (
          <div className="px-3 py-10 text-center">
            <p className="font-display text-sm tracking-[0.04em] text-ink/70">
              {notes.length === 0 ? "书架还是空的" : "没有匹配的笔记"}
            </p>
            <p className="mx-auto mt-2 max-w-[24ch] text-xs leading-relaxed text-muted">
              {notes.length === 0
                ? "点右上角 ＋ 放上第一页稿纸。"
                : "换个关键词，或清除搜索。"}
            </p>
          </div>
        ) : (
          <ul className="space-y-1.5">
            {visible.map((note) => {
              const active = note.id === activeId;
              return (
                <li key={note.id} className="note-enter">
                  <button
                    type="button"
                    onClick={() => setActive(note.id)}
                    className={`group relative block w-full border bg-card px-4 py-3 text-left transition-colors duration-150 ${
                      active
                        ? "border-hairline-strong"
                        : "border-hairline hover:border-hairline-strong"
                    }`}
                  >
                    {/* 选中态：左侧橙色粗线 */}
                    {active && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-y-0 left-0 w-[3px] bg-accent"
                      />
                    )}
                    <span className="flex items-start justify-between gap-2">
                      <span
                        className={`block max-w-[16ch] truncate text-[13px] font-medium ${
                          active ? "text-ink" : "text-ink/80"
                        }`}
                      >
                        {note.title || "无标题笔记"}
                      </span>
                      <span
                        role="button"
                        tabIndex={0}
                        aria-label={`删除「${note.title || "无标题笔记"}」`}
                        onClick={(e) => {
                          e.stopPropagation();
                          removeNote(note.id);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.stopPropagation();
                            removeNote(note.id);
                          }
                        }}
                        className="mt-0.5 flex-none p-0.5 text-muted/50 opacity-0 transition-opacity duration-150 hover:text-accent focus:opacity-100 focus:text-accent group-hover:opacity-100"
                      >
                        <IconTrash width={12} height={12} />
                      </span>
                    </span>
                    <span className="mono-label mt-1.5 block">
                      {relativeStamp(note.updatedAt)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </aside>
  );
}
