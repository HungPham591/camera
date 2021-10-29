import React from "react";
import { Editor, EditorState } from 'draft-js';

export default function Blog(state) {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty(),
    );
    return <Editor editorState={editorState} onChange={setEditorState} />;
}