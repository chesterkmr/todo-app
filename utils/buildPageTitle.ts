import { APP_NAME } from "consts";

export function buildPageTitle(title: string): string {
  return `${APP_NAME} | ${title}`;
}
