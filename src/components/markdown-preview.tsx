import { memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

/** 代码块：亮色 oneLight 主题 + 浅灰底，语言标签铭牌 */
function CodeBlock({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const match = /language-(\w+)/.exec(className ?? "");
  const lang = match?.[1] ?? "text";
  if (!match) {
    return (
      <code className="md-inline-code">{children}</code>
    );
  }
  return (
    <div className="md-code-wrap">
      <span className="mono-label md-code-lang">{lang}</span>
      <SyntaxHighlighter
        language={lang}
        style={oneLight}
        customStyle={{
          margin: 0,
          padding: "0.9rem 1rem",
          background: "#f4f4f4",
          fontSize: "0.8125rem",
          lineHeight: 1.6,
        }}
        codeTagProps={{
          style: { fontFamily: "var(--font-mono)" },
        }}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    </div>
  );
}

/** 杂志级 Markdown 预览。样式全部走 .md-prose 作用域（index.css）。 */
export const MarkdownPreview = memo(function MarkdownPreview({
  source,
}: {
  source: string;
}) {
  return (
    <div className="md-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code: CodeBlock,
          pre: ({ children }) => <>{children}</>,
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
});
