import React from 'react';

// material-ui
import { useTheme } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';

// third-party
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark, a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

//-----------------------|| SYNTAX HIGHLIGHTER ||-----------------------//

const ReactSyntaxHighlighter = ({ codeString, showLineNumbers = true }) => {
    const theme = useTheme();
    return (
        <Card
            sx={{
                fontSize: '1rem !important',
                overflow: 'hidden',
                '& pre': {
                    m: 0,
                    p: '16px !important',
                    fontFamily: theme.typography.fontFamily,
                    bgcolor:
                        theme.palette.mode === 'dark' ? theme.palette.grey[50] + ' !important' : theme.palette.grey[900] + ' !important'
                }
            }}
        >
            <SyntaxHighlighter
                language="javacript"
                showLineNumbers={showLineNumbers}
                style={theme.palette.mode === 'dark' ? a11yLight : a11yDark}
            >
                {codeString}
            </SyntaxHighlighter>
        </Card>
    );
};

export default ReactSyntaxHighlighter;
