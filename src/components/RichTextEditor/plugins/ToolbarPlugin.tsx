import { useCallback, useEffect, useRef, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  mergeRegister,
  $getNearestNodeOfType,
  $getNearestBlockElementAncestorOrThrow,
} from "@lexical/utils";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
  INDENT_CONTENT_COMMAND,
  OUTDENT_CONTENT_COMMAND,
} from "lexical";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
} from "@lexical/list";
import { $setBlocksType } from "@lexical/selection";

const LowPriority = 1;

const Divider = () => {
  return <div className="divider" />;
};

const blockTypeNames = {
  paragraph: "paragraph",
  bullet: "bullet",
  number: "number",
};

const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [blockType, setBlockType] = useState(blockTypeNames.paragraph);
  const [textAlign, setTextAlign] = useState("left");

  const isBulletList = blockType === blockTypeNames.bullet;
  const isNumberList = blockType === blockTypeNames.number;

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
    }

    const anchorNode = selection?.anchor?.getNode();
    const extractedNodes = selection?.extract();
    const extractedNode = extractedNodes?.[0];
    if (extractedNode) {
      const textNode = extractedNode;
      const element = $getNearestBlockElementAncestorOrThrow(textNode);

      if (element) {
        const eleTextAlign = element?.getFormatType() || "left";
        setTextAlign(eleTextAlign);

        if (element.getType() === "listitem") {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList?.getListType();
          setBlockType(type || "");
        } else {
          setBlockType(blockTypeNames.paragraph);
        }
      }
    }
  }, []);

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
    setBlockType(blockTypeNames.paragraph);
  };

  const formatBulletList = () => {
    if (!isBulletList) {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
      setBlockType(blockTypeNames.bullet);
    } else {
      formatParagraph();
    }
  };

  const formatNumberedList = () => {
    if (!isNumberList) {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
      setBlockType(blockTypeNames.number);
    } else {
      formatParagraph();
    }
  };

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          updateToolbar();
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, updateToolbar]);

  return (
    <div className="editor-toolbar" ref={toolbarRef}>
      <button
        type="button"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
        className={"toolbar-item spaced " + (isBold ? "active" : "")}
        aria-label="Format Bold"
      >
        <i className="fas fa-bold" />
      </button>
      <button
        type="button"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
        className={"toolbar-item spaced " + (isItalic ? "active" : "")}
        aria-label="Format Italics"
      >
        <i className="fas fa-italic" />
      </button>
      <button
        type="button"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
        className={"toolbar-item spaced " + (isUnderline ? "active" : "")}
        aria-label="Format Underline"
      >
        <i className="fas fa-underline" />
      </button>
      <button
        type="button"
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
        }}
        className={"toolbar-item spaced " + (isStrikethrough ? "active" : "")}
        aria-label="Format Strikethrough"
      >
        <i className="fas fa-strikethrough" />
      </button>

      <Divider />

      <button
        type="button"
        className={"toolbar-item spaced " + `${isBulletList ? "active" : ""}`}
        onClick={formatBulletList}
      >
        <i className="fas fa-list-ul" />
      </button>
      <button
        type="button"
        className={"toolbar-item spaced " + `${isNumberList ? "active" : ""}`}
        onClick={formatNumberedList}
      >
        <i className="fas fa-list-ol" />
      </button>
      <button
        type="button"
        className={"toolbar-item spaced"}
        onClick={() => {
          editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
        }}
      >
        <i className="fas fa-indent" />
      </button>
      <button
        type="button"
        className={"toolbar-item spaced"}
        onClick={() => {
          editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
        }}
      >
        <i className="fas fa-outdent" />
      </button>
      <button
        type="button"
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
        }}
        className={
          "toolbar-item spaced " + `${textAlign === "left" ? "active" : ""}`
        }
        aria-label="Left Align"
      >
        <i className="fas fa-align-left" />
      </button>
      <button
        type="button"
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
        }}
        className={
          "toolbar-item spaced " + `${textAlign === "center" ? "active" : ""}`
        }
        aria-label="Center Align"
      >
        <i className="fas fa-align-center" />
      </button>
      <button
        type="button"
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
        }}
        className={
          "toolbar-item spaced " + `${textAlign === "right" ? "active" : ""}`
        }
        aria-label="Right Align"
      >
        <i className="fas fa-align-right" />
      </button>
      <button
        type="button"
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
        }}
        className={
          "toolbar-item spaced " + `${textAlign === "justify" ? "active" : ""}`
        }
        aria-label="Justify Align"
      >
        <i className="fas fa-align-justify" />
      </button>

      <Divider />
      <button
        type="button"
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        className="toolbar-item spaced"
        aria-label="Undo"
      >
        <i className="fas fa-undo" />
      </button>
      <button
        type="button"
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        className="toolbar-item"
        aria-label="Redo"
      >
        <i className="fas fa-redo" />
      </button>
    </div>
  );
};

export default ToolbarPlugin;
