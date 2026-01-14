
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ihzsvzzmtbzeqmkokhwo.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_CdEorvhSzWJ3uRj1kFpoCQ_YywEmKTl';

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
