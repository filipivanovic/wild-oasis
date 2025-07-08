import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://gxgjesglnrpqkakhmnqp.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4Z2plc2dsbnJwcWtha2htbnFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MTc2NjEsImV4cCI6MjA2NzQ5MzY2MX0.QIrfkhgu72Ca-TXr9CFJu2SvP7vW1WiXx-kUWcHGsJg'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase