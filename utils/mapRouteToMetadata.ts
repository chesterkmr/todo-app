import pathMatch from "path-match";

const path = pathMatch({
  strict: true,
  sensitive: false,
});

export interface IPageMetadata {
  title: string;
  description?: string;
}

export type IRouteToPageMetadataMap = Record<string, IPageMetadata>;

export function mapRouteToMetadata(
  map: IRouteToPageMetadataMap,
  route: string
): IPageMetadata | null {
  for (let route in map) {
    const isMatched = path(route);

    if (isMatched) {
      const meta = map[route];
      return meta;
    }
  }

  return null;
}
