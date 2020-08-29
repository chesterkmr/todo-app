import { useRouter } from "next/router";

import "../styles/globals.scss";
import { withPageMetadata } from "shared/hocs";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return <Component {...pageProps} />;
}

export default withPageMetadata(MyApp);
