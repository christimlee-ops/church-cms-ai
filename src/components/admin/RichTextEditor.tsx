"use client";

import { useRef, useState, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import ImagePickerModal from "./ImagePickerModal";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    // eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
    return ({ forwardedRef, ...props }: any) => <RQ ref={forwardedRef} {...props} />;
  },
  { ssr: false }
);

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  style?: React.CSSProperties;
  className?: string;
}

export default function RichTextEditor({ value, onChange, style, className }: RichTextEditorProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const quillRef = useRef<any>(null);
  const [showImageModal, setShowImageModal] = useState(false);

  const handleImageInsert = useCallback((url: string) => {
    const editor = quillRef.current?.getEditor();
    if (editor) {
      const range = editor.getSelection(true);
      editor.insertEmbed(range.index, "image", url);
      editor.setSelection(range.index + 1);
    }
  }, []);

  const imageHandler = useCallback(() => {
    setShowImageModal(true);
  }, []);

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["blockquote", "code-block"],
        ["link", "image", "video"],
        ["clean"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  }), [imageHandler]);

  return (
    <>
      <ReactQuill
        forwardedRef={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        className={className || "bg-white rounded-lg"}
        style={style || { minHeight: "300px" }}
      />
      <ImagePickerModal
        open={showImageModal}
        onClose={() => setShowImageModal(false)}
        onInsert={handleImageInsert}
      />
    </>
  );
}
