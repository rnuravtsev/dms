import XLSX from 'xlsx'
import dotenv from 'dotenv'
dotenv.config({ path: '../../../.env' })

// Загрузка данных из Excel файла
const workbook = XLSX.readFile(process.env.VHI_INPUT)
const firstSheetName = workbook.SheetNames[0]
const data = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName])

const newData = data.map(item => ({
  Latitude: item['Latitude'],
  Longitude: item['Longitude'],
  Address: `${item['Address']}`,
  Label: `${item['Label']}`,
  Id: item['Placemark number'],
}))

const newWorkbook = XLSX.utils.book_new()
const newSheet = XLSX.utils.json_to_sheet(newData)
XLSX.utils.book_append_sheet(newWorkbook, newSheet, 'Results')
XLSX.writeFile(newWorkbook, 'vhi-map-output.xlsx')
