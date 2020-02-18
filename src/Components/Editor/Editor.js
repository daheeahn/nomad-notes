import React, { useState } from "react";

import MarkdownRenderer from "react-markdown-renderer";

const Editor = ({ id: i, title: t, content: c, onSave }) => {
  const [id, setId] = useState(i || null);
  const [title, setTitle] = useState(t || "");
  const [content, setContent] = useState(c || "");

  return (
    <div>
      <input
        placeholder={"Untitled..."}
        style={{ borderColor: "transparent", fontSize: 40 }}
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <br />

      <textarea
        rows={5}
        placeholder={"Content..."}
        style={{ borderColor: "transparent", fontSize: 20 }}
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      <br />
      <MarkdownRenderer markdown={content} />

      <br />

      <button onClick={() => onSave(title, content, id)}>Save</button>
    </div>
  );
};

export default Editor;
