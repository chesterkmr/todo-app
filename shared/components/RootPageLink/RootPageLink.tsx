import Link from "next/link";

interface Props {
  children: JSX.Element;
}

export const RootPageLink = (props: Props) => {
  return <Link href="/">{props.children}</Link>;
};
