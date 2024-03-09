import { LegacyRef, forwardRef } from "react";
import { Link } from "react-router-dom";

const RouterLink = forwardRef(({ href, ...other }: { href: string }, ref) => (
  <Link
    ref={ref as LegacyRef<HTMLAnchorElement> | undefined}
    to={href}
    {...other}
  />
));

export default RouterLink;
