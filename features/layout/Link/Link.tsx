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
  /* eslint-disable jsx-a11y/anchor-has-content */
  const { as, href, ...other } = props;
  return (
    <NextLink href={href} as={as}>
      <a ref={ref} {...other} />
    </NextLink>
  );
});

function rootPathSegment(url: string): string {
  return url.split('/')[1];
}

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
    [activeClassName]:
      rootPathSegment(router.pathname) === rootPathSegment(pathname) &&
      activeClassName,
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
