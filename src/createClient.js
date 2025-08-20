import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://mwsokxidywxepuxxjdgy.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13c29reGlkeXd4ZXB1eHhqZGd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1OTI4MjksImV4cCI6MjA3MTE2ODgyOX0.t2nMLpkWb0GZrRjXsoZbvSNwJ57dyHYxtiO81M76kKc"

export const supabase = createClient(supabaseUrl, supabaseKey)
