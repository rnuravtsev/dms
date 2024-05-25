import { Clinics } from '../../shared/types'
import { SearchType } from './types'

export const filterBy = {
  [SearchType.Address]: (el: ElementOfArray<Clinics>, value: string) =>
    el?.address.toLowerCase().includes(value.toLowerCase()),
  [SearchType.Id]: (el: ElementOfArray<Clinics>, value: string) =>
    String(el?.id).includes(value),
}

export const filteredClinics = (
  clinics: Clinics,
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
