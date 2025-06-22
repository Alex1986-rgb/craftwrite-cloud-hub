
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yotunjzgomkuuwpyftqr.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdHVuanpnb21rdXV3cHlmdHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0Mjk4NTMsImV4cCI6MjA2NjAwNTg1M30.bFCR2HIpdG_4L_ZCuojseZfqbMHaLAco3SFdPqDKkqU'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
