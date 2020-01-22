import React from 'react'

class Blockquote extends React.Component {
  render() {
    let {children, ...props} = this.props;
    if (children.props && children.props.children) {
      children = children.props.children
    }
    return <blockquote {...props}>{children}</blockquote>;
  }
}

export default Blockquote
