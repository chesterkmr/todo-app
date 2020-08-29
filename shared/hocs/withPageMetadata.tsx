import { useRouter } from "next/router";
import Head from "next/head";
import { buildPageTitle } from "utils/buildPageTitle";
import { APP_NAME } from "consts";
import { mapRouteToMetadata } from "utils/mapRouteToMetadata";
import { routeToPageMetadataMap } from "pages/pageMetadata/routeToPageMetadataMap";

export function withPageMetadata<TComponentProps>(
  Component: React.ComponentType<TComponentProps>
) {
  return function PageWithMetadata(props: TComponentProps) {
    const router = useRouter();
    const pageMetadata = mapRouteToMetadata(
      routeToPageMetadataMap,
      router.route
    );
    return (
      <>
        <Head>
          <title>
            {pageMetadata ? buildPageTitle(pageMetadata.title) : APP_NAME}
          </title>
        </Head>
        <Component {...props} />
      </>
    );
  };
}
