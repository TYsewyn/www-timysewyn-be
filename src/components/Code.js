import React from 'react'
import {useSelector} from "react-redux";
import Highlight, { defaultProps } from 'prism-react-renderer';
import Prism from "prismjs"
import "./Code.scss"

export function Code({children}) {
  const className = children.props.className || '';
  const matches = className.match(/language-(?<lang>.*)/);
  const language = matches && matches.groups && matches.groups.lang ? matches.groups.lang.trim().toLowerCase() : '';
  const appearance = useSelector(state => state.appearance);
  return (
    <Highlight
      {...defaultProps}
      code={children.props.children.trim()}
      language={language}
      Prism={Prism}>
      {({
          tokens,
          getLineProps,
          getTokenProps,
        }) => (
        <div className={`prism-code appearance-${appearance}`} data-language={language}>
            <pre className={`language-${language}`}>
              <code>
              {tokens.map((line, k) => {
                const lineProps = getLineProps({line, key: k});
                return (
                  <div key={k} className={lineProps.className}>
                    {line.map((token, key) => {
                      const tokenProps = getTokenProps({token, key});
                      return (
                        <span key={key} className={tokenProps.className} children={tokenProps.children} />
                      )
                    })}
                  </div>
                )
              })}
              </code>
            </pre>
        </div>
      )}
    </Highlight>
  )
}
