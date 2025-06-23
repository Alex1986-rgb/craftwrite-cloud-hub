
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { projectId } = await req.json()

    // Get project data
    const { data: project, error: projectError } = await supabaseClient
      .from('bulk_seo_projects')
      .select('*')
      .eq('id', projectId)
      .single()

    if (projectError) throw projectError

    // Get all pages for the project
    const { data: pages, error: pagesError } = await supabaseClient
      .from('bulk_seo_pages')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: true })

    if (pagesError) throw pagesError

    // Generate CSV content
    const csvHeader = ['URL страницы', 'Название страницы', 'Мета-заголовок', 'Мета-описание', 'HTML текст', 'Статус']
    const csvRows = pages.map(page => [
      page.url,
      page.page_title || '',
      page.meta_title || '',
      page.meta_description || '',
      page.html_content || '',
      page.status
    ])

    const csvContent = [csvHeader, ...csvRows]
      .map(row => row.map(cell => `"${(cell || '').toString().replace(/"/g, '""')}"`).join(','))
      .join('\n')

    // Create blob URL (in real implementation, you would save to storage)
    const fileName = `seo_export_${project.project_name}_${new Date().toISOString().split('T')[0]}.csv`
    
    // In a real implementation, you would save this to Supabase Storage
    // For now, we'll return the CSV content directly
    
    return new Response(csvContent, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${fileName}"`
      }
    })

  } catch (error) {
    console.error('Error in excel-export-generator:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
