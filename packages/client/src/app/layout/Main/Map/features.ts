export const features = [
  {
    id: '1',
    style: {
      fillRule: 'nonZero',
      fill: 'var(--map-no-data-color)',
      fillOpacity: 0.6,
      stroke: [
        {
          color: 'var(--map-no-data-color)',
          width: 5,
        },
      ],
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [37.8, 55.8],
          [37.8, 55.75],
          [37.9, 55.75],
          [37.9, 55.8],
        ],
      ],
    },
    properties: { hint: 'Polygon 1' },
  },
  {
    id: '2',
    style: {
      fillRule: 'nonZero',
      fill: 'var(--map-success-color)',
      fillOpacity: 0.6,
      stroke: [
        {
          color: 'var(--map-success-color)',
          width: 5,
        },
      ],
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [37.9, 55.8],
          [37.9, 55.75],
          [38.0, 55.75],
          [38.0, 55.8],
        ],
      ],
    },
    properties: { hint: 'Polygon 2' },
  },
  {
    id: '3',
    style: {
      fillRule: 'nonZero',
      fill: 'var(--map-danger-color)',
      fillOpacity: 0.6,
      stroke: [
        {
          color: 'var(--map-danger-color)',
          width: 5,
        },
      ],
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [38.0, 55.8],
          [38.0, 55.75],
          [38.1, 55.75],
          [38.1, 55.8],
        ],
      ],
    },
    properties: { hint: 'Polygon 3' },
  },
]

export const location = { center: [37.95, 55.65], zoom: 10 }
