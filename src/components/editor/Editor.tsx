import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor as WEditor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from './Editor.module.css';

const Editor = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onEditorStateChange = (newEditorState: EditorState) => {
        setEditorState(newEditorState);
    };

    return (
        <WEditor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName={styles.editorBorder}
            onEditorStateChange={onEditorStateChange}
        />
    );
};

export default Editor;
