'use client'

import { HTMLProps } from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json'
import solidity from 'react-syntax-highlighter/dist/esm/languages/prism/solidity'

SyntaxHighlighter.registerLanguage('json', json)
SyntaxHighlighter.registerLanguage('solidity', solidity)

const CodeBlock = ({
  codeString,
  language,
  showLineNumbers,
  lineProps,
  customStyle,
  renderer,
  lineNumberStyle,
  codeTagProps,
}: {
  codeString: string
  language?: 'json' | 'solidity'
  showLineNumbers?: boolean
  lineProps?: lineTagPropsFunction
  customStyle?: React.CSSProperties
  renderer?: (props: rendererProps) => React.ReactNode
  lineNumberStyle?: React.CSSProperties | lineNumberStyleFunction
  codeTagProps?: HTMLProps<HTMLElement>
}) => {
  return (
    <SyntaxHighlighter
      language={language}
      customStyle={customStyle}
      renderer={renderer}
      style={style}
      codeTagProps={codeTagProps}
      wrapLongLines={true}
      showLineNumbers={showLineNumbers}
      lineProps={lineProps}
      lineNumberStyle={lineNumberStyle}
    >
      {codeString}
    </SyntaxHighlighter>
  )
}

export default CodeBlock

const style: { [key: string]: React.CSSProperties } = {
  'code[class*="language-"]': {
    background: 'hsla(223, 26%, 13%, 1)',
    color: 'hsla(220, 7%, 74%, 1)',
    textShadow: '0 1px rgba(0, 0, 0, 0.3)',
    fontFamily:
      '"Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace',
    fontSize: 14,
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre-wrap',
    wordSpacing: 'normal',
    wordBreak: 'break-all',
    lineHeight: '1.5',
    MozTabSize: '2',
    OTabSize: '2',
    tabSize: '2',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
  },
  'pre[class*="language-"]': {
    background: 'hsla(223, 26%, 13%, 1)',
    color: 'hsla(220, 7%, 74%, 1)',
    textShadow: '0 1px rgba(0, 0, 0, 0.3)',
    fontFamily:
      '"Fira Code", "Fira Mono", Menlo, Consolas, "DejaVu Sans Mono", monospace',
    fontSize: 14,
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    lineHeight: '1.5',
    MozTabSize: '2',
    OTabSize: '2',
    tabSize: '2',
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
    padding: '1em',
    margin: '0',
    overflow: 'auto',
    borderRadius: '0.3em',
    minHeight: '80px',
  },
  'code[class*="language-"]::-moz-selection': {
    background: 'hsla(223, 26%, 13%, 1)',
    color: 'inherit',
    textShadow: 'none',
  },
  'code[class*="language-"] *::-moz-selection': {
    background: 'hsla(223, 26%, 13%, 1)',
    color: 'inherit',
    textShadow: 'none',
  },
  'pre[class*="language-"] *::-moz-selection': {
    background: 'hsla(223, 26%, 13%, 1)',
    color: 'inherit',
    textShadow: 'none',
  },
  'code[class*="language-"]::selection': {
    background: 'hsla(223, 26%, 13%, 1)',
    color: 'inherit',
    textShadow: 'none',
  },
  'code[class*="language-"] *::selection': {
    background: 'hsla(223, 26%, 13%, 1)',
    color: 'inherit',
    textShadow: 'none',
  },
  'pre[class*="language-"] *::selection': {
    background: 'hsla(223, 26%, 13%, 1)',
    color: 'inherit',
    textShadow: 'none',
  },
  ':not(pre) > code[class*="language-"]': {
    padding: '0.2em 0.3em',
    borderRadius: '0.3em',
    whiteSpace: 'normal',
  },
  comment: {
    color: 'hsla(102, 28%, 43%, 1)',
  },
  prolog: {
    color: 'hsl(220, 10%, 40%)',
  },
  cdata: {
    color: 'hsl(220, 10%, 40%)',
  },
  doctype: {
    color: 'hsla(220, 7%, 74%, 1)',
  },
  punctuation: {
    color: 'hsla(220, 7%, 74%, 1)',
  },
  entity: {
    color: 'hsla(220, 7%, 74%, 1)',
    cursor: 'help',
  },
  'attr-name': {
    color: 'hsla(169, 55%, 51%, 1)',
  },
  'class-name': {
    color: 'hsla(169, 55%, 51%, 1)',
  },
  boolean: {
    color: 'hsla(17, 47%, 64%, 1)',
  },
  constant: {
    color: 'hsla(169, 55%, 51%, 1)',
  },
  number: {
    color: 'hsla(17, 47%, 64%, 1)',
  },
  atrule: {
    color: 'hsla(169, 55%, 51%, 1)',
  },
  keyword: {
    color: 'hsla(207, 61%, 59%, 1)',
  },
  property: {
    color: 'hsla(222, 60%, 55%, 1)',
  },
  tag: {
    color: 'hsla(222, 60%, 55%, 1)',
  },
  symbol: {
    color: 'hsla(222, 60%, 55%, 1)',
  },
  deleted: {
    color: 'hsl(355, 65%, 65%)',
  },
  important: {
    color: 'hsl(355, 65%, 65%)',
  },
  selector: {
    color: 'hsla(237, 16%, 77%, 1)',
  },
  string: {
    color: 'hsla(17, 47%, 64%, 1)',
    wordBreak: 'break-all',
  },
  char: {
    color: 'hsla(237, 16%, 77%, 1)',
  },
  builtin: {
    color: 'hsla(237, 16%, 77%, 1)',
  },
  inserted: {
    color: 'hsla(237, 16%, 77%, 1)',
  },
  regex: {
    color: 'hsla(237, 16%, 77%, 1)',
  },
  linenumber: {
    color: 'hsla(221, 8%, 46%, 1)',
    backgroundColor: '#10141E',
    fontStyle: 'normal',
    borderRight: '1px solid #252E42',
    paddingLeft: '8px',
    paddingRight: '8px',
  },
  'attr-value': {
    color: 'hsla(237, 16%, 77%, 1)',
  },
  'attr-value > .token.punctuation': {
    color: 'hsla(237, 16%, 77%, 1)',
  },
  variable: {
    color: 'hsla(169, 55%, 51%, 1)',
  },
  operator: {
    color: 'hsla(169, 55%, 51%, 1)',
  },
  function: {
    color: 'hsla(169, 55%, 51%, 1)',
  },
  url: {
    color: 'hsl(187, 47%, 55%)',
  },
  'attr-value > .token.punctuation.attr-equals': {
    color: 'hsla(220, 7%, 74%, 1)',
  },
  'special-attr > .token.attr-value > .token.value.css': {
    color: 'hsla(220, 7%, 74%, 1)',
  },
  '.language-css .token.selector': {
    color: 'hsl(355, 65%, 65%)',
  },
  '.language-css .token.property': {
    color: 'hsla(220, 7%, 74%, 1)',
  },
  '.language-css .token.function': {
    color: 'hsl(187, 47%, 55%)',
  },
  '.language-css .token.url > .token.function': {
    color: 'hsl(187, 47%, 55%)',
  },
  '.language-css .token.url > .token.string.url': {
    color: 'hsla(237, 16%, 77%, 1)',
  },
  '.language-css .token.important': {
    color: 'hsl(286, 60%, 67%)',
  },
  '.language-css .token.atrule .token.rule': {
    color: 'hsl(286, 60%, 67%)',
  },
  '.language-javascript .token.operator': {
    color: 'hsl(286, 60%, 67%)',
  },
  '.language-javascript .token.template-string > .token.interpolation > .token.interpolation-punctuation.punctuation':
    {
      color: 'hsl(5, 48%, 51%)',
    },
  '.language-json .token.operator': {
    color: 'hsla(220, 7%, 74%, 1)',
  },
  '.language-json .token.null.keyword': {
    color: 'hsla(169, 55%, 51%, 1)',
  },
  '.language-markdown .token.url': {
    color: 'hsla(220, 7%, 74%, 1)',
  },
  '.language-markdown .token.url > .token.operator': {
    color: 'hsla(220, 7%, 74%, 1)',
  },
  '.language-markdown .token.url-reference.url > .token.string': {
    color: 'hsla(220, 7%, 74%, 1)',
  },
  '.language-markdown .token.url > .token.content': {
    color: 'hsla(169, 55%, 51%, 1)',
  },
  '.language-markdown .token.url > .token.url': {
    color: 'hsl(187, 47%, 55%)',
  },
  '.language-markdown .token.url-reference.url': {
    color: 'hsl(187, 47%, 55%)',
  },
  '.language-markdown .token.blockquote.punctuation': {
    color: 'hsl(220, 10%, 40%)',
    fontStyle: 'italic',
  },
  '.language-markdown .token.hr.punctuation': {
    color: 'hsl(220, 10%, 40%)',
    fontStyle: 'italic',
  },
  '.language-markdown .token.code-snippet': {
    color: 'hsla(237, 16%, 77%, 1)',
  },
  '.language-markdown .token.bold .token.content': {
    color: 'hsla(169, 55%, 51%, 1)',
  },
  '.language-markdown .token.italic .token.content': {
    color: 'hsl(286, 60%, 67%)',
  },
  '.language-markdown .token.strike .token.content': {
    color: 'hsla(222, 60%, 55%, 1)',
  },
  '.language-markdown .token.strike .token.punctuation': {
    color: 'hsla(222, 60%, 55%, 1)',
  },
  '.language-markdown .token.list.punctuation': {
    color: 'hsla(222, 60%, 55%, 1)',
  },
  '.language-markdown .token.title.important > .token.punctuation': {
    color: 'hsl(355, 65%, 65%)',
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
  namespace: {
    opacity: '0.8',
  },
  'token.tab:not(:empty):before': {
    color: 'hsla(220, 14%, 71%, 0.15)',
    textShadow: 'none',
  },
  'token.cr:before': {
    color: 'hsla(220, 14%, 71%, 0.15)',
    textShadow: 'none',
  },
  'token.lf:before': {
    color: 'hsla(220, 14%, 71%, 0.15)',
    textShadow: 'none',
  },
  'token.space:before': {
    color: 'hsla(220, 14%, 71%, 0.15)',
    textShadow: 'none',
  },
  'div.code-toolbar > .toolbar.toolbar > .toolbar-item': {
    marginRight: '0.4em',
  },
  'div.code-toolbar > .toolbar.toolbar > .toolbar-item > button': {
    background: 'hsl(220, 13%, 26%)',
    color: 'hsl(220, 9%, 55%)',
    padding: '0.1em 0.4em',
    borderRadius: '0.3em',
  },
  'div.code-toolbar > .toolbar.toolbar > .toolbar-item > a': {
    background: 'hsl(220, 13%, 26%)',
    color: 'hsl(220, 9%, 55%)',
    padding: '0.1em 0.4em',
    borderRadius: '0.3em',
  },
  'div.code-toolbar > .toolbar.toolbar > .toolbar-item > span': {
    background: 'hsl(220, 13%, 26%)',
    color: 'hsl(220, 9%, 55%)',
    padding: '0.1em 0.4em',
    borderRadius: '0.3em',
  },
  'div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:hover': {
    background: 'hsla(223, 26%, 13%, 1)',
    color: 'hsla(220, 7%, 74%, 1)',
  },
  'div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:focus': {
    background: 'hsla(223, 26%, 13%, 1)',
    color: 'hsla(220, 7%, 74%, 1)',
  },
  'div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:hover': {
    background: 'hsla(223, 26%, 13%, 1)',
    color: 'hsla(220, 7%, 74%, 1)',
  },
  'div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:focus': {
    background: 'hsla(223, 26%, 13%, 1)',
    color: 'hsla(220, 7%, 74%, 1)',
  },
  'div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:hover': {
    background: 'hsla(223, 26%, 13%, 1)',
    color: 'hsla(220, 7%, 74%, 1)',
  },
  'div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:focus': {
    background: 'hsla(223, 26%, 13%, 1)',
    color: 'hsla(220, 7%, 74%, 1)',
  },
  '.line-highlight.line-highlight': {
    background: 'hsla(220, 100%, 80%, 0.04)',
  },
  '.line-highlight.line-highlight:before': {
    background: 'hsl(220, 13%, 26%)',
    color: 'hsla(220, 7%, 74%, 1)',
    padding: '0.1em 0.6em',
    borderRadius: '0.3em',
    boxShadow: '0 2px 0 0 rgba(0, 0, 0, 0.2)',
  },
  '.line-highlight.line-highlight[data-end]:after': {
    background: 'hsl(220, 13%, 26%)',
    color: 'hsla(220, 7%, 74%, 1)',
    padding: '0.1em 0.6em',
    borderRadius: '0.3em',
    boxShadow: '0 2px 0 0 rgba(0, 0, 0, 0.2)',
  },
  'pre[id].linkable-line-numbers.linkable-line-numbers span.line-numbers-rows > span:hover:before':
    {
      backgroundColor: 'hsla(220, 100%, 80%, 0.04)',
    },
  '.line-numbers.line-numbers .line-numbers-rows': {
    borderRightColor: 'hsla(220, 14%, 71%, 0.15)',
  },
  '.command-line .command-line-prompt': {
    borderRightColor: 'hsla(220, 14%, 71%, 0.15)',
  },
  '.line-numbers .line-numbers-rows > span:before': {
    color: 'hsl(220, 14%, 45%)',
  },
  '.command-line .command-line-prompt > span:before': {
    color: 'hsl(220, 14%, 45%)',
  },
  '.rainbow-braces .token.token.punctuation.brace-level-1': {
    color: 'hsla(222, 60%, 55%, 1)',
  },
  '.rainbow-braces .token.token.punctuation.brace-level-5': {
    color: 'hsla(222, 60%, 55%, 1)',
  },
  '.rainbow-braces .token.token.punctuation.brace-level-9': {
    color: 'hsla(222, 60%, 55%, 1)',
  },
  '.rainbow-braces .token.token.punctuation.brace-level-2': {
    color: 'hsla(237, 16%, 77%, 1)',
  },
  '.rainbow-braces .token.token.punctuation.brace-level-6': {
    color: 'hsla(237, 16%, 77%, 1)',
  },
  '.rainbow-braces .token.token.punctuation.brace-level-10': {
    color: 'hsla(237, 16%, 77%, 1)',
  },
  '.rainbow-braces .token.token.punctuation.brace-level-3': {
    color: 'hsla(169, 55%, 51%, 1)',
  },
  '.rainbow-braces .token.token.punctuation.brace-level-7': {
    color: 'hsla(169, 55%, 51%, 1)',
  },
  '.rainbow-braces .token.token.punctuation.brace-level-11': {
    color: 'hsla(169, 55%, 51%, 1)',
  },
  '.rainbow-braces .token.token.punctuation.brace-level-4': {
    color: 'hsl(286, 60%, 67%)',
  },
  '.rainbow-braces .token.token.punctuation.brace-level-8': {
    color: 'hsl(286, 60%, 67%)',
  },
  '.rainbow-braces .token.token.punctuation.brace-level-12': {
    color: 'hsl(286, 60%, 67%)',
  },
  'pre.diff-highlight > code .token.token.deleted:not(.prefix)': {
    backgroundColor: 'hsla(353, 100%, 66%, 0.15)',
  },
  'pre > code.diff-highlight .token.token.deleted:not(.prefix)': {
    backgroundColor: 'hsla(353, 100%, 66%, 0.15)',
  },
  'pre.diff-highlight > code .token.token.deleted:not(.prefix)::-moz-selection':
    {
      backgroundColor: 'hsla(353, 95%, 66%, 0.25)',
    },
  'pre.diff-highlight > code .token.token.deleted:not(.prefix) *::-moz-selection':
    {
      backgroundColor: 'hsla(353, 95%, 66%, 0.25)',
    },
  'pre > code.diff-highlight .token.token.deleted:not(.prefix)::-moz-selection':
    {
      backgroundColor: 'hsla(353, 95%, 66%, 0.25)',
    },
  'pre > code.diff-highlight .token.token.deleted:not(.prefix) *::-moz-selection':
    {
      backgroundColor: 'hsla(353, 95%, 66%, 0.25)',
    },
  'pre.diff-highlight > code .token.token.deleted:not(.prefix)::selection': {
    backgroundColor: 'hsla(353, 95%, 66%, 0.25)',
  },
  'pre.diff-highlight > code .token.token.deleted:not(.prefix) *::selection': {
    backgroundColor: 'hsla(353, 95%, 66%, 0.25)',
  },
  'pre > code.diff-highlight .token.token.deleted:not(.prefix)::selection': {
    backgroundColor: 'hsla(353, 95%, 66%, 0.25)',
  },
  'pre > code.diff-highlight .token.token.deleted:not(.prefix) *::selection': {
    backgroundColor: 'hsla(353, 95%, 66%, 0.25)',
  },
  'pre.diff-highlight > code .token.token.inserted:not(.prefix)': {
    backgroundColor: 'hsla(137, 100%, 55%, 0.15)',
  },
  'pre > code.diff-highlight .token.token.inserted:not(.prefix)': {
    backgroundColor: 'hsla(137, 100%, 55%, 0.15)',
  },
  'pre.diff-highlight > code .token.token.inserted:not(.prefix)::-moz-selection':
    {
      backgroundColor: 'hsla(135, 73%, 55%, 0.25)',
    },
  'pre.diff-highlight > code .token.token.inserted:not(.prefix) *::-moz-selection':
    {
      backgroundColor: 'hsla(135, 73%, 55%, 0.25)',
    },
  'pre > code.diff-highlight .token.token.inserted:not(.prefix)::-moz-selection':
    {
      backgroundColor: 'hsla(135, 73%, 55%, 0.25)',
    },
  'pre > code.diff-highlight .token.token.inserted:not(.prefix) *::-moz-selection':
    {
      backgroundColor: 'hsla(135, 73%, 55%, 0.25)',
    },
  'pre.diff-highlight > code .token.token.inserted:not(.prefix)::selection': {
    backgroundColor: 'hsla(135, 73%, 55%, 0.25)',
  },
  'pre.diff-highlight > code .token.token.inserted:not(.prefix) *::selection': {
    backgroundColor: 'hsla(135, 73%, 55%, 0.25)',
  },
  'pre > code.diff-highlight .token.token.inserted:not(.prefix)::selection': {
    backgroundColor: 'hsla(135, 73%, 55%, 0.25)',
  },
  'pre > code.diff-highlight .token.token.inserted:not(.prefix) *::selection': {
    backgroundColor: 'hsla(135, 73%, 55%, 0.25)',
  },
  '.prism-previewer.prism-previewer:before': {
    borderColor: 'hsl(224, 13%, 17%)',
  },
  '.prism-previewer-gradient.prism-previewer-gradient div': {
    borderColor: 'hsl(224, 13%, 17%)',
    borderRadius: '0.3em',
  },
  '.prism-previewer-color.prism-previewer-color:before': {
    borderRadius: '0.3em',
  },
  '.prism-previewer-easing.prism-previewer-easing:before': {
    borderRadius: '0.3em',
  },
  '.prism-previewer.prism-previewer:after': {
    borderTopColor: 'hsl(224, 13%, 17%)',
  },
  '.prism-previewer-flipped.prism-previewer-flipped.after': {
    borderBottomColor: 'hsl(224, 13%, 17%)',
  },
  '.prism-previewer-angle.prism-previewer-angle:before': {
    background: 'hsl(219, 13%, 22%)',
  },
  '.prism-previewer-time.prism-previewer-time:before': {
    background: 'hsl(219, 13%, 22%)',
  },
  '.prism-previewer-easing.prism-previewer-easing': {
    background: 'hsl(219, 13%, 22%)',
  },
  '.prism-previewer-angle.prism-previewer-angle circle': {
    stroke: 'hsla(220, 7%, 74%, 1)',
    strokeOpacity: '1',
  },
  '.prism-previewer-time.prism-previewer-time circle': {
    stroke: 'hsla(220, 7%, 74%, 1)',
    strokeOpacity: '1',
  },
  '.prism-previewer-easing.prism-previewer-easing circle': {
    stroke: 'hsla(220, 7%, 74%, 1)',
    fill: 'transparent',
  },
  '.prism-previewer-easing.prism-previewer-easing path': {
    stroke: 'hsla(220, 7%, 74%, 1)',
  },
  '.prism-previewer-easing.prism-previewer-easing line': {
    stroke: 'hsla(220, 7%, 74%, 1)',
  },
}
