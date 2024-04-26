import React from 'react'
import { useTheme, useMediaQuery } from '@mui/material'
import {
  // ChartContainer
  ResponsiveChartContainer,
  ChartsLegend,
  AllSeriesType,
  ChartsXAxis,
  ChartsYAxis,
  ChartsGrid,
  BarPlot,
  LinePlot,
  MarkPlot,
  legendClasses
} from '@mui/x-charts'

import { COLORS } from 'app/theme/theme'
import { Company } from 'types/global'
import { parseFloatSpaces } from 'lib/strings'
import PaperCard from '../common/PaperCard'

const CompanyIntensityChart = ({ company }: { company: Company }): React.ReactElement | null => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  if (company === undefined || company.emissions.length === 0) {
    return null
  }

  const dataLabels = company.emissions.map((company) => company.year)
  const emissions = company.emissions.map((company) => parseFloatSpaces(company?.['total_reported_emission_scope_1+2+3']))
  const revenue = company.emissions.map((company) => parseFloatSpaces(company.revenue))
  const intensity = emissions.map((emission, index) => emission / revenue[index])

  console.log('CompanyIntensityChart:', { dataLabels, emissions, revenue, intensity })

  // Gather data values and labels
  const dataSeries: AllSeriesType[] = [
    {
      label: 'Emissions',
      type: 'bar',
      color: COLORS.PINK_LIGHT,
      data: emissions
    },
    {
      label: 'Revenue',
      type: 'bar',
      color: COLORS.PURPLE_LIGHT,
      data: revenue,
      yAxisKey: 'revenueAxis'
    },
    {
      label: 'Intensity',
      type: 'line',
      color: COLORS.PURPLE_DARK,
      data: intensity,
      yAxisKey: 'intensityAxis',
      connectNulls: true
    }
  ]

  // const Container = isSmallScreen ? ResponsiveChartContainer : ChartContainer
  const sizingProps = isSmallScreen ? {} : { width: 500, height: 300 }

  return (
    <PaperCard>
      <ResponsiveChartContainer
        series={dataSeries}
        xAxis={[
          {
            data: dataLabels,
            scaleType: 'band',
            id: 'x-axis-id'
          }
        ]}
        yAxis={[
          { id: 'emissionsAxis', scaleType: 'linear' },
          { id: 'revenueAxis', scaleType: 'linear' },
          { id: 'intensityAxis', scaleType: 'linear' }
        ]}
        {...sizingProps}
      >
        <BarPlot
          leftAxis='emissionsAxis'
          rightAxis='revenueAxis'
        />
        <LinePlot />
        <MarkPlot />
        <ChartsGrid horizontal />
        <ChartsXAxis position='bottom' />
        <ChartsYAxis
          axisId='emissionsAxis'
          label='Emissions'
          position='left'
        />
        <ChartsYAxis
          axisId='revenueAxis'
          label='Revenue'
          position='right'
        />
        <ChartsLegend
          direction='row'
          itemMarkWidth={10}
          itemMarkHeight={10}
          sx={(theme: any) => ({
            [`.${legendClasses.root} text`]: {
              fontSize: '10px'
            }
          })}
        />
      </ResponsiveChartContainer>
    </PaperCard>
  )
}

export default CompanyIntensityChart
