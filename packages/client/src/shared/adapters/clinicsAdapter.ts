import data from '../../../clinics.json'

const clinicsAdapter = (el: ElementOfArray<typeof data>) => ({
  id: el['Id'],
  name: el['Label'],
  address: el['Address'],
  coordinates: {
    latitude: el['Latitude'],
    longitude: el['Longitude'],
  },
  hint: {
    name: el['Label'],
    address: el['Address'],
  },
})

export const clinics = data.map(clinicsAdapter)
