import { createClient } from '@supabase/supabase-js'
import Constants from 'expo-constants'
const url = process.env.EXPO_PUBLIC_SUPABASE_URL!
const anon = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
export const supabase = createClient(url, anon)