import React from 'react'
import {OutboundLink} from "gatsby-plugin-google-analytics";

export function Link(data) {
  if (data.target && '_blank' === data.target) {
    return <OutboundLink href={data.href} rel="noreferrer" target={data.target}>{data.children}</OutboundLink>
  } else {
    return <a href={data.href}>{data.children}</a>
  }
}
