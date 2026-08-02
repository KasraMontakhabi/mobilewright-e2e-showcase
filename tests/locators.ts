import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parse } from 'yaml';
import type { Locator, Role, Screen } from '@mobilewright/core';

type LocatorDef =
  | { label: string; index?: number }
  | { text: string; index?: number }
  | { testId: string; index?: number }
  | { role: Role; name?: string; index?: number };

type LocatorGroup = Record<string, LocatorDef>;
type LocatorFile = Record<string, LocatorGroup>;

const locators: LocatorFile = parse(readFileSync(resolve(process.cwd(), 'locators.yaml'), 'utf8'));

/** Look up `<screenName>.<name>` in locators.yaml and resolve it against `screen`. */
export function find(screen: Screen, screenName: string, name: string, bundleId?: string): Locator {
  const def = locators[screenName]?.[name];
  if (!def) {
    throw new Error(`No locator "${name}" defined under "${screenName}" in locators.yaml`);
  }

  let locator: Locator;
  if ('label' in def) locator = screen.getByLabel(def.label);
  else if ('text' in def) locator = screen.getByText(def.text);
  else if ('testId' in def) locator = screen.getByTestId(def.testId.replace('{bundleId}', bundleId ?? ''));
  else locator = screen.getByRole(def.role, def.name ? { name: def.name } : undefined);

  return def.index !== undefined ? locator.nth(def.index) : locator;
}
