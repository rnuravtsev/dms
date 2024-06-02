import { createEvent, createStore } from 'effector'

import { SearchType } from '@components/Clinics/types'
import { clinics as clinicsJSON } from '@shared/adapters/clinicsAdapter'
import type { ClinicsType } from '@shared/types'

export const updateSearchValue = createEvent<string>()
export const updateSearchType = createEvent<SearchType>('')
export const updateClinics = createEvent<ClinicsType>()

export const $searchValue = createStore<string>('')
export const $searchType = createStore<SearchType>(SearchType.Address)
export const $clinics = createStore<ClinicsType>(clinicsJSON)

$searchType.on<SearchType>(updateSearchType, (_, type) => type)
$searchValue.on<string>(updateSearchValue, (_, value) => value)
$clinics.on<ClinicsType>(updateClinics, (_, value) => value)
