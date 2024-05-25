import { clinics } from './adapters/clinicsAdapter'

export type Clinics = typeof clinics
export type ClinicUI = Clinics[number]
