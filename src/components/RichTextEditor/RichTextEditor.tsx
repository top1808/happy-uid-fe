import { EditorState, LexicalEditor } from "lexical";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { $generateHtmlFromNodes } from "@lexical/html";
import { EDITOR_THEME } from "./theme";
import { MarkNode } from '@lexical/mark';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
interface RichTextEditorProps {
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor = ({
  onChange,
  placeholder,
}: RichTextEditorProps) => {
  function onChangeEditor(editorState: EditorState, editor: LexicalEditor) {
    editorState.read(() => {
      const htmlString = $generateHtmlFromNodes(editor) as string;
      onChange(htmlString);
    });
  }
  function onError(error: Error) {
    alert(error?.message);
  }

  const initialConfig = {
    namespace: "RichTextEditor",
    theme: EDITOR_THEME,
    onError,
    nodes: [
        HeadingNode,
        ListNode,
        ListItemNode,
        QuoteNode,
        CodeNode,
        TableNode,
        TableCellNode,
        TableRowNode,
        CodeHighlightNode,
        AutoLinkNode,
        LinkNode,
        HorizontalRuleNode,
        MarkNode,
    ]
  };
  return (
    <div>
      <LexicalComposer initialConfig={initialConfig}>
        <div className="editor-container">
          <ToolbarPlugin />
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={
                <div className="bg-gray-400 text-sm">{placeholder}</div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <AutoFocusPlugin />
            <ListPlugin />
            <LinkPlugin />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
            <OnChangePlugin onChange={onChangeEditor} />
          </div>
        </div>
      </LexicalComposer>
    </div>
  );
};

export default RichTextEditor;
