
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

    const { projectId, urls, settings } = await req.json()

    console.log('Processing bulk SEO project:', projectId)

    // Insert pages into database
    const pages = urls.map((url: string) => ({
      project_id: projectId,
      url: url.trim(),
      status: 'pending'
    }))

    const { error: insertError } = await supabaseClient
      .from('bulk_seo_pages')
      .insert(pages)

    if (insertError) {
      throw insertError
    }

    // Create tasks for each page
    const tasks = urls.flatMap((url: string, index: number) => [
      {
        project_id: projectId,
        page_id: null, // Will be updated after page creation
        task_type: 'analyze_page',
        priority: 1
      },
      {
        project_id: projectId,
        page_id: null,
        task_type: 'generate_seo',
        priority: 2
      }
    ])

    // Update project status
    await supabaseClient
      .from('bulk_seo_projects')
      .update({ 
        status: 'processing',
        total_pages: urls.length,
        updated_at: new Date().toISOString()
      })
      .eq('id', projectId)

    // Start background processing
    processPages(supabaseClient, projectId, settings)

    return new Response(
      JSON.stringify({ success: true, message: 'Processing started' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in bulk-seo-processor:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})

async function processPages(supabaseClient: any, projectId: string, settings: any) {
  try {
    // Get all pending pages
    const { data: pages, error } = await supabaseClient
      .from('bulk_seo_pages')
      .select('*')
      .eq('project_id', projectId)
      .eq('status', 'pending')

    if (error) throw error

    for (const page of pages) {
      try {
        // Update status to processing
        await supabaseClient
          .from('bulk_seo_pages')
          .update({ status: 'processing' })
          .eq('id', page.id)

        // Analyze page content
        const pageData = await analyzePage(page.url, settings)
        
        // Generate SEO content
        const seoContent = await generateSeoContent(pageData, settings)

        // Update page with results
        await supabaseClient
          .from('bulk_seo_pages')
          .update({
            page_title: seoContent.pageTitle,
            meta_title: seoContent.metaTitle,
            meta_description: seoContent.metaDescription,
            html_content: seoContent.htmlContent,
            keywords: seoContent.keywords,
            status: 'completed',
            processed_at: new Date().toISOString()
          })
          .eq('id', page.id)

        console.log(`Processed page: ${page.url}`)

      } catch (pageError) {
        console.error(`Error processing page ${page.url}:`, pageError)
        
        await supabaseClient
          .from('bulk_seo_pages')
          .update({
            status: 'failed',
            error_message: pageError.message,
            processed_at: new Date().toISOString()
          })
          .eq('id', page.id)
      }
    }

  } catch (error) {
    console.error('Error in processPages:', error)
  }
}

async function analyzePage(url: string, settings: any) {
  try {
    // Fetch page content
    const response = await fetch(url)
    const html = await response.text()
    
    // Extract title and meta description
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i)
    const metaDescMatch = html.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"[^>]*>/i)
    
    const title = titleMatch ? titleMatch[1].trim() : ''
    const metaDescription = metaDescMatch ? metaDescMatch[1].trim() : ''
    
    // Extract main content (simplified)
    const bodyMatch = html.match(/<body[^>]*>(.*?)<\/body>/is)
    const bodyContent = bodyMatch ? bodyMatch[1] : ''
    
    // Remove scripts and styles
    const cleanContent = bodyContent
      .replace(/<script[^>]*>.*?<\/script>/gis, '')
      .replace(/<style[^>]*>.*?<\/style>/gis, '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()

    return {
      url,
      originalTitle: title,
      originalMetaDescription: metaDescription,
      content: cleanContent.substring(0, 2000), // Limit content length
      contentLength: cleanContent.length
    }
  } catch (error) {
    throw new Error(`Failed to analyze page ${url}: ${error.message}`)
  }
}

async function generateSeoContent(pageData: any, settings: any) {
  const { url, originalTitle, content } = pageData
  
  // Extract domain and path for context
  const urlObj = new URL(url)
  const domain = urlObj.hostname
  const path = urlObj.pathname
  
  // Generate SEO content based on settings
  const pageTitle = originalTitle || `Страница ${path.split('/').pop() || 'главная'} - ${domain}`
  
  const metaTitle = settings.includeKeywords 
    ? `${pageTitle} | SEO-оптимизированный заголовок`
    : pageTitle
  
  const metaDescription = `Профессиональные услуги ${domain}. ${content.substring(0, 100)}... ⭐ Быстро и качественно.`
  
  const htmlContent = `
    <div class="seo-content">
      <h2>О нас</h2>
      <p>${content.substring(0, 200)}...</p>
      <h3>Наши преимущества</h3>
      <ul>
        <li>Профессиональный подход к каждому проекту</li>
        <li>Быстрые сроки выполнения работ</li>
        <li>Гарантия качества результата</li>
        <li>Индивидуальный подход к клиентам</li>
      </ul>
      <p>Свяжитесь с нами для получения консультации и оформления заказа. Мы поможем вам достичь ваших целей!</p>
    </div>
  `
  
  const keywords = ['seo', 'оптимизация', 'профессиональные услуги', domain]
  
  return {
    pageTitle,
    metaTitle,
    metaDescription,
    htmlContent,
    keywords
  }
}
