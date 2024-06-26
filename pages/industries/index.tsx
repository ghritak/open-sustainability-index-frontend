import React from 'react'
import type { GetStaticPropsContext, GetStaticPropsResult } from 'next'
import { ParsedUrlQuery } from 'querystring'

import { Industry } from 'types/global'
import toSlug from 'lib/toSlug'
import industries from 'app/services/industries.json'
import { industriesPageProps } from 'app/services/industries'
import IndustryList from 'app/components/industries/IndustryList'
import PageTopBanner from 'app/components/page/PageTopBanner'

export interface IndustryListPageParams extends ParsedUrlQuery {
  page: string
}

interface IndustryListPageProps {
  title: string
  description: string
  page: number
  industries?: Industry[]
}

function IndustryListPage ({ page }: IndustryListPageProps): React.ReactElement {
  const industriesWithSlug = industries.map((industry) => ({
    ...industry,
    slug: toSlug(industry.name)
  }))
  return (
    <>
      <PageTopBanner subtitle='Industries' title='Find any industry' />
      <IndustryList industries={industriesWithSlug} page={page} />
    </>
  )
}

export default IndustryListPage

export const getStaticProps = async (context: GetStaticPropsContext<IndustryListPageParams>): Promise<GetStaticPropsResult<{}>> => {
  return {
    props: {
      ...industriesPageProps(industries)
      // page,
      // industries
    }
  }
}
