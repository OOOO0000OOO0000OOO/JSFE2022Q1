enum Movements {
  'minimalism',
  'realism',
  'post-modernism',
  'pre-modernism',
  'modernism',
  'ancientism',
}

enum Mediums {
  'acrylic',
  'charcoal',
  'ink',
  'oil',
  'pastel',
  'spray paint',
  'watercolor',
}

enum Materials {
  'canvas',
  'cardboard',
  'other',
  'paper',
  'soft',
  'wood',
}

interface IRangeFilter {
  from: number;
  to: number;
}

export default interface IFilterData {
  name?: string;
  year?: IRangeFilter;
  size?: IRangeFilter;
  price?: IRangeFilter;
  movement?: Movements[];
  medium?: Mediums[];
  material?: Materials[];
  unique?: boolean;
}

export { Materials, Mediums, Movements };
