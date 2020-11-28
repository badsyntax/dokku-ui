import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink, { LinkProps } from 'next/link';
import MuiLink, { LinkProps as MuiLinkProps } from '@material-ui/core/Link';

const NextComposed = React.forwardRef<
  HTMLAnchorElement,
  Omit<
    React.DetailedHTMLProps<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >,
    'href'
  > &
    React.PropsWithChildren<LinkProps>
>(function NextComposed(props, ref) {
  const { as, href, ...other } = props;
  return (
    <NextLink href={href} as={as}>
      <a ref={ref} {...other} />
    </NextLink>
  );
});

type StyledLinkProps = MuiLinkProps & {
  activeClassName?: string;
  className?: string;
  innerRef: React.Ref<HTMLAnchorElement>;
  naked?: boolean;
};

const StyledLink: React.FunctionComponent<StyledLinkProps> = ({
  href,
  activeClassName = 'active',
  className: classNameProps = '',
  innerRef,
  naked = false,
  ...other
}) => {
  const router = useRouter();
  const pathname = href;
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  });

  if (naked) {
    return (
      <NextComposed
        className={className}
        ref={innerRef}
        href={href}
        {...other}
      />
    );
  }

  return (
    <MuiLink
      component={NextComposed}
      className={className}
      ref={innerRef}
      href={href.toString()} // FIXME
      {...other}
    />
  );
};

export default React.forwardRef<
  HTMLAnchorElement,
  Omit<StyledLinkProps, 'innerRef'>
>((props, ref) => <StyledLink {...props} innerRef={ref} />);
