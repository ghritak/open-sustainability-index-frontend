// pages/upload.js
import React, { useState, useMemo } from 'react'
import type { GetStaticPropsResult } from 'next'
import { Container, Typography, Button, Box, TextField, CircularProgress } from '@mui/material'

import jsonToTSV from 'app/utils/jsonToTSV'
import DataTable, { DataTableHeader } from 'app/components/common/DataTable'

// import testImageAnalysis from 'test/imageAnalysis.json'

const headers: readonly DataTableHeader[] = [
  { field: 'source' },
  { field: 'Bonn_company' },

  { field: 'year', displayOnMobile: true },
  { field: 'fiscal_year' },
  { field: 'company_name' },
  { field: 'company_lookup' },
  { field: 'sbti_lookup' },
  { field: 'sbti_group_level' },
  { field: 'sbti_comment' },
  { field: 'csrd_comment_report' },
  { field: 'industry' },
  { field: 'isic_rev_4' },
  { field: 'hq_country_move' },

  { field: 'scope_1' },
  { field: 'scope_2_market_based' },
  { field: 'scope_2_location_based' },
  { field: 'scope_2_unknown' },
  { field: 'total_scope_3', displayOnMobile: true },
  { field: 'total_emission_market_based' },
  { field: 'total_emission_location_based' },
  { field: 'total_reported_emission_scope_1_2' },
  { field: 'total_reported_emission_scope_1_2_3' },
  { field: 'cat_1' },
  { field: 'cat_2' },
  { field: 'cat_3' },
  { field: 'cat_4' },
  { field: 'cat_5' },
  { field: 'cat_6' },
  { field: 'cat_7' },
  { field: 'cat_8' },
  { field: 'cat_9' },
  { field: 'cat_10' },
  { field: 'cat_11' },
  { field: 'cat_12' },
  { field: 'cat_13' },
  { field: 'cat_14' },
  { field: 'cat_15' },
  { field: 'all_cats' },

  { field: 'Observation_comment' },
  { field: 'All Cats_comment_from report' },

  { field: 'upstream_scope_3' },
  { field: 'share_upstream_of_scope_3' },
  { field: 'scope_1_share_of_total_upstream_emissions' },
  { field: 'total_upstream_emissions' },
  { field: 'revenue' },
  { field: 'currency' },
  { field: 'revenue_million' },
  { field: 'cradle_to_gate' },
  { field: 'ghg_standard' },

  { field: 'source_emissions_page_move' },
  { field: 'emission_intensity' },
  { field: 'source_emission_report' },
  { field: 'emission_page' },
  { field: 'source_emission_link' },
  { field: 'source_revenue' },
  { field: 'page_revenue' },
  { field: 'source_revenue_link' },
  { field: 'publication_date' },
  { field: 'comment' },
  { field: 'status' }
]

interface AnalysisResults {
  message?: string
  analysis: {
    yearlyReports: Array<Record<string, string>>
  }
}

const UploadReportPage = ({ title }: { title: string }): React.ReactElement => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>()
  const [specialInstructions, setSpecialInstructions] = useState<string>('')
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>() // testImageAnalysis
  const inProgress = useMemo(() => analysisResults === null, [analysisResults])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files?.[0] !== null) {
      setSelectedFile(event.target.files?.[0])
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (selectedFile !== undefined) {
      setAnalysisResults(null)
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('specialInstructions', specialInstructions)

      const res = await fetch('/api/uploadAnalysis', {
        method: 'POST',
        body: formData
      })

      const analysisData = await res.json()
      setAnalysisResults(analysisData)
    }
  }

  return (
    <Container>
      <Typography variant='h1' gutterBottom>{title}</Typography>
      <Box component='form' onSubmit={(e) => { void handleSubmit(e) }} sx={{ mt: 2 }}>
        <TextField
          type='file'
          inputProps={{ accept: 'image/*' }}
          onChange={handleFileChange}
          fullWidth
        />
        <TextField
          label='Special instructions to the AI (optional)'
          placeholder='e.g. “Note that all emissions are reported as millions of tonnes and need to be converted”'
          fullWidth
          value={specialInstructions}
          onChange={(event) => setSpecialInstructions(event.target.value)}
          sx={{ mb: 2 }}
        />
        {(selectedFile !== undefined) && (
          <Box sx={{ mt: 2 }}>
            <Typography variant='body1'>
              Selected file: {selectedFile?.name}
            </Typography>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              sx={{ mt: 2, mb: 2 }}
              disabled={inProgress}
            >
              Start the AI analysis
            </Button>
          </Box>
        )}
      </Box>
      {(inProgress) && (
        <CircularProgress />
      )}
      {(analysisResults !== null && analysisResults !== undefined) && (
        <>
          <CopyToClipboardButton
            textToCopy={jsonToTSV(analysisResults?.analysis?.yearlyReports, headers)}
            label='Copy sheet data'
          />
          <DataTable
            data={analysisResults?.analysis?.yearlyReports ?? []}
            headers={headers}
          />
        </>
      )}
    </Container>
  )
}
export default UploadReportPage

function CopyToClipboardButton ({ textToCopy, label = 'Copy' }: { textToCopy: string, label: string }): React.ReactElement {
  const handleCopyClick = (): void => {
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        alert('Text copied to clipboard!')
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err)
      })
  }

  return (
    <Button variant='outlined' color='primary' type='submit' sx={{ mt: 2 }} onClick={handleCopyClick}>
      {label}
    </Button>
  )
}

export const getStaticProps = async (): Promise<GetStaticPropsResult<{}>> => {
  return {
    props: {
      title: 'Upload image for analysis'
    }
  }
}
