import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://rijhkmlnddzcwzonmbnu.supabase.co';
const supabaseKey = 'sb_publishable_3NQ4sSBj3wC56sdh3C_70g_ew0FwhMR'; 

export const supabase = createClient(supabaseUrl, supabaseKey);