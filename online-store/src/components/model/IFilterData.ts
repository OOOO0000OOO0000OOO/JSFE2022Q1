enum Movements {
  'minimalism' = 'minimalism',
  'realism' = 'realism',
  'post-modernism' = 'post-modernism',
  'pre-modernism' = 'pre-modernism',
  'modernism' = 'modernism',
  'ancientism' = 'ancientism',
}

enum Mediums {
  'acrylic' = 'acrylic',
  'charcoal' = 'charcoal',
  'ink' = 'ink',
  'oil' = 'oil',
  'pastel' = 'pastel',
  'spray paint' = 'spray paint',
  'watercolor' = 'watercolor',
}

enum Materials {
  'canvas' = 'canvas',
  'cardboard' = 'cardboard',
  'other' = 'other',
  'paper' = 'paper',
  'soft' = 'soft',
  'wood' = 'wood',
}

interface IRangeFilter {
  from: number;
  to: number;
}

interface IFilterData {
  name: string;
  year: IRangeFilter;
  size: IRangeFilter;
  price: IRangeFilter;
  movement: Movements[];
  medium: Mediums[];
  material: Materials[];
  unique: boolean;
}

export { Materials, Mediums, Movements, IRangeFilter };
export default IFilterData;
