import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://npewbqhhkkwxumkqiqdd.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wZXdicWhoa2t3eHVta3FpcWRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEwMTk5MDQsImV4cCI6MjAwNjU5NTkwNH0.BTMahmt8d6qa0qSZVvfcP69KscVs2p6_Ifx1Zbpdet0"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase