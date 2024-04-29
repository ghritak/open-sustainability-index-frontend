declare module 'postgraphile-plugin-nested-mutations'
declare module 'react-toastify'

declare global {
  interface Window {
    gtag: (event: string, action: string, options: any) => void
  }
}

interface PageProps {
  title: string
  description: string
  imageUrl?: string
  showFooter?: boolean
}

export interface ListPageOptions {
  sortBy?: string
  sortDirection?: string
  detailPageLink?: string
}

export interface Industry {
  name: string
  slug?: string
}

export interface CompaniesCompany {
  company_name: string
  commitment_type: null | string
  status: 'Active' | 'Target set' | 'Removed' | 'Extended' | null
  commitment_deadline: null | string
  total_reported_emission_scope_1_2_3: number
  revenue: number | null
  hq_country_move: string
  year: number
  industry: string
  currency: 'USD' | 'SEK' | 'EUR' | null
  emission_intensity: number | null
  target_type: 'Absolute' | 'Net-zero' | 'Intensity' | null
  target_scope: null | string
  target_year: number | null
  target: 'Near-term' | 'Net-zero' | null
}

export interface Company {
  company_name: string
  industry: null
  isic: null
  lei: null
  company_url: null
  source_reports_page: null
  autogenerated_contact: null
  sustainability_contact_name: null
  sustainability_contact_email: null
  sustainability_contact_linkedin: null
  sbt_status: null
  sbt_near_term_year: null
  sbt_near_term_target: null
  net_zero_year: null
  emissions: Emission[]
  targets: Target[]
  commitment: Commitment
}

export interface CompanyResponse {
  data: Company
  error: null
}

export interface Commitment {
  lei: string
  type: string
  scope: string
  action: string
  status: string
  target: string
  'sub-type': string
  base_year: string
  year_type: string
  target_year: string
  company_name: string
  target_value: string
  date_published: Date
  target_wording: string
  commitment_type: string
  commitment_deadline: string
  full_target_language: string
  target_classification: string
  company_temperature_alignment: string
  reason_for_commitment_extension_or_removal: string
}

export interface Emission {
  year: number | null
  cat_1: string | null
  cat_2: string | null
  cat_3: string | null
  cat_4: string | null
  cat_5: string | null
  cat_6: string | null
  cat_7: string | null
  cat_8: string | null
  cat_9: string | null
  cat_10: string | null
  cat_11: string | null
  cat_12: string | null
  cat_13: string | null
  cat_14: string | null
  cat_15: string | null
  source: string | null
  status: string | null
  comment: string | null
  revenue: number | null
  scope_1: number | null
  all_cats: string | null
  currency: string | null
  industry: string | null
  isic_rev_4: string | null
  fiscal_year: string | null
  company_name: string | null
  ghg_standard: string | null
  page_revenue: string | null
  emission_page: string | null
  total_scope_3: string | null
  cradle_to_gate: number | null
  source_revenue: string | null
  hq_country_move: string | null
  revenue_million: number | null
  scope_2_unknown: string | null
  publication_date: string | null
  upstream_scope_3: string | null
  emission_intensity: number | null
  source_revenue_link: string | null
  scope_2_market_based: string | null
  source_emission_link: string | null
  scope_2_location_based: string | null
  source_emission_report: string | null
  total_upstream_emissions: number | null
  share_upstream_of_scope_3: string | null
  source_emisions_page_move: string | null
  total_emission_market_based: string | null
  total_emission_location_based: string | null
  total_reported_emission_scope_1_2: number | null
  total_reported_emission_scope_1_2_3: number | null
  scope_1_share_of_total_upstream_emissions: string | null
}

export interface Target {
  lei: string
  type: string
  scope: string
  action: string
  status: string
  target: string
  'sub-type': string
  base_year: number
  year_type: string
  target_year: number
  company_name: string
  target_value: string
  date_published: Date
  target_wording: string
  commitment_type: string
  commitment_deadline: string
  full_target_language: string
  target_classification: string
  company_temperature_alignment: string
  reason_for_commitment_extension_or_removal: string
}
