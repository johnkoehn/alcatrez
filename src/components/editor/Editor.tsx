import React, { useState } from 'react';
import MarkdownEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';

const Editor = () => {
    const [markdown, setMarkdown] = useState<string | undefined>('Content Here');

    const handleOnChange = (value: string | undefined) => {
        if (value?.length && value.length >= 1) {
            const character = value.charCodeAt(value.length - 1);
            if (character === 10) {
                setMarkdown(`${value}\n`);
            } else {
                setMarkdown(value);
            }
        } else {
            setMarkdown(value);
        }
    };

    return (
        <>
            <MarkdownEditor
                value={markdown}
                onChange={handleOnChange}
                previewOptions={{
                    rehypePlugins: [[rehypeSanitize]]
                }}
            />
            <MarkdownEditor.Markdown
                source={markdown}
                rehypePlugins={[[rehypeSanitize]]}
            />
        </>
    );
};

export default Editor;
