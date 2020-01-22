const visit = require("unist-util-visit");

module.exports = ({markdownAST}, pluginOptions) => {
  visit(markdownAST, { type: 'paragraph' }, (node, index, parent) => {
    if (node.children.length === 1) {
      const child = node.children[0];
      if ('html' === child.type && (child.value.match(/<div /) || child.value.match(/<blockquote /))) {
        node.type = child.type;
        node.value = child.value;
        node.position = child.position;
        node.children = undefined;
      }
    }
  })
};
