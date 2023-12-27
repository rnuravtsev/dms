// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const XLSX = require('xlsx')

// Загрузка данных из Excel файла
const workbook = XLSX.readFile(
  '/Users/albertmuravcev/WebstormProjects/dms/vhi-input.xlsx'
)
const firstSheetName = workbook.SheetNames[0]
const data = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName])

const formatRequestString = str => {
  return str.replaceAll(' ', '+')
}

async function geocodeAddress(address) {
  const apiKey = '9e879368-809c-4e7c-86b3-659954dd1d3c' // Замените на ваш API ключ Яндекс
  const url = `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&format=json&geocode=${formatRequestString(
    address
  )}`

  try {
    const response = await axios.get(url)
    const coords =
      response.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(
        ' '
      )

    return {
      longitude: coords[0],
      latitude: coords[1],
    }
  } catch (error) {
    console.error(`Ошибка при геокодировании адреса ${address}:`, error)
    return { longitude: null, latitude: null }
  }
}

async function geocodeAddresses() {
  for (const item of data) {
    const { longitude, latitude } = await geocodeAddress(item['Address'])
    item['Longitude'] = longitude || ''
    item['Latitude'] = latitude || ''
  }

  const newData = data.map(item => ({
    Latitude: item['Latitude'],
    Longitude: item['Longitude'],
    Description: item['Address'],
    Label: item['Label'],
    'Placemark number': item['Placemark number'],
  }))

  const newWorkbook = XLSX.utils.book_new()
  const newSheet = XLSX.utils.json_to_sheet(newData)
  XLSX.utils.book_append_sheet(newWorkbook, newSheet, 'Results')
  XLSX.writeFile(newWorkbook, 'vhi-output.xlsx')
}

geocodeAddresses()
