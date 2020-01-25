const React = require("react");

// Material UI SSR support

const styles = require("@material-ui/styles");
const CleanCSS = require("clean-css");
const create = require("jss").create;

// Keep track of sheets for each page
const globalLeak = new Map();
const cleanCSS = new CleanCSS();

exports.wrapRootElement = ({ element, pathname }) => {
  const jss = create({ ...styles.jssPreset() });
  const sheets = new styles.ServerStyleSheets({ jss: jss, injectFirst: true, });
  globalLeak.set(pathname, sheets);

  return sheets.collect(element);
};

exports.onRenderBody = ({ setHeadComponents, pathname}, pluginOptions) => {
  const className = pluginOptions.className
    ? pluginOptions.className
    : "gatsbyRemarkImagesGrid";

  const sheets = globalLeak.get(pathname);

  let css;
  if (sheets) {
    css = sheets.toString();
    css = cleanCSS.minify(css).styles;
    globalLeak.delete(pathname);
  }

  return setHeadComponents([
    <style key={`gatsby-remark-images-grid`} type="text/css">
      {`
        .${className} {
          ${pluginOptions.margin ? `margin: ${pluginOptions.margin}` : "margin: 20px auto"};
        }

        .${className}-grid {
          display: grid;
          min-height: 0;
          min-width: 0;
          ${pluginOptions.gridGap ? `grid-gap: ${pluginOptions.gridGap}` : "grid-gap: 20px"};
        }

        .${className}-figcaption {
          text-align: center;
        }
      `}
    </style>,
    (css ?
    <style
      id="jss-server-side"
      key="jss-server-side"
      dangerouslySetInnerHTML={{ __html: css }}
    /> : undefined),
  ])
};
