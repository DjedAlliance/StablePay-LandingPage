declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement> & { title?: string }>;
  const src: string;
  export default src;
}
