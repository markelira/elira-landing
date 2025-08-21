declare namespace JSX {
  interface IntrinsicElements {
    widgetbot: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        server?: string;
        channel?: string;
        width?: string;
        height?: string;
      },
      HTMLElement
    >;
  }
}