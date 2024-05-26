import { ClinicsType } from '../../shared/types'
import { SearchType } from './types'

export const filterBy = {
  [SearchType.Address]: (el: ElementOfArray<ClinicsType>, value: string) =>
    el?.address.toLowerCase().includes(value.toLowerCase()),
  [SearchType.Name]: (el: ElementOfArray<ClinicsType>, value: string) =>
    el?.name.toLowerCase().includes(value.toLowerCase()),
  [SearchType.Id]: (el: ElementOfArray<ClinicsType>, value: string) =>
    String(el?.id).includes(value),
}

export const filteredClinics = (
  clinics: ClinicsType,
  type: SearchType,
  value: string
) => {
  const filterFn = filterBy[type]
  if (!filterFn) {
    console.error('Неизвестный тип фильтрации')
    return []
  }

  return clinics.filter(el => filterFn(el, value))
}
