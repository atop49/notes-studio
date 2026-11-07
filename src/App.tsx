import { Sidebar } from "./components/sidebar";
import { EditorPane } from "./components/editor-pane";

export default function App() {
  return (
    <div className="flex h-screen min-h-0 overflow-hidden max-lg:flex-col">
      {/* 侧边栏：桌面固定宽，移动端顶部条 */}
      <div className="h-full w-72 flex-none max-lg:h-auto max-lg:max-h-[45vh] max-lg:w-full max-lg:flex-none max-lg:border-b max-lg:border-hairline max-lg:order-1">
        <Sidebar />
      </div>
      {/* 编辑/预览：桌面左右分栏，移动端在下方占满剩余高度 */}
      <main className="h-full min-w-0 flex-1 max-lg:h-auto max-lg:min-h-0 max-lg:flex-1 max-lg:order-2 max-lg:overflow-y-auto">
        <EditorPane />
      </main>
    </div>
  );
}
