/**
 * The groups, in the order a gallery shows them. Each is a folder of `src/icons/`, and every icon is
 * in exactly one. Food joins when its first icon does.
 */
export const GROUPS = [
  { id: 'arrows', label: 'Arrows' },
  { id: 'actions', label: 'Actions' },
  { id: 'alerts', label: 'Alerts' },
  { id: 'communication', label: 'Communication' },
  { id: 'content', label: 'Content' },
  { id: 'commerce', label: 'Commerce' },
  { id: 'data', label: 'Data' },
  { id: 'design', label: 'Design' },
  { id: 'people', label: 'People' },
  { id: 'places', label: 'Places' },
  { id: 'security', label: 'Security' },
  { id: 'system', label: 'System' },
  { id: 'technology', label: 'Technology' },
  { id: 'time', label: 'Time' },
  { id: 'brands', label: 'Brands' },
] as const;

export type Group = (typeof GROUPS)[number]['id'];
