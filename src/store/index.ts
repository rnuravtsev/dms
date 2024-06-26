import { createEffect, createEvent, createStore, sample } from 'effector'

import { SearchType } from '@components/Clinics/types'
import { clinics as clinicsJSON } from '@shared/adapters/clinicsAdapter'
import type { ClinicsType, ThemeType } from '@shared/types'

export const updateSearchValue = createEvent<string>()
export const updateSearchType = createEvent<SearchType>('')
export const updateClinics = createEvent<ClinicsType>()
export const updateTheme = createEvent<ThemeType | null>('')

export const changeThemeUIFx = createEffect((theme: ThemeType | null) =>
  document.documentElement.setAttribute('data-theme', theme || ''),
)

export const $searchValue = createStore<string>('')
export const $searchType = createStore<SearchType>(SearchType.Address)
export const $clinics = createStore<ClinicsType>(clinicsJSON)
export const $theme = createStore<ThemeType | null>(null)

$searchType.on<SearchType>(updateSearchType, (_, type) => type)
$searchValue.on<string>(updateSearchValue, (_, value) => value)
$clinics.on<ClinicsType>(updateClinics, (_, value) => value)

$theme.on<ThemeType | null>(updateTheme, (store, value) => value)

// Создаём реакцию, так устроена обработка сайд-эффектов в effector
sample({
  clock: updateTheme,
  source: $theme,
  target: changeThemeUIFx,
})
