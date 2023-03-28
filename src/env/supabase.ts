import { createClient } from '@supabase/supabase-js';

/**
 * Global supabase instance.
 * Url and API key can be found in the Supabase dashboard.
 */
const env = {
    url: 'https://snslqhqfljnhdqjicgbw.supabase.co',
    apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuc2xxaHFmbGpuaGRxamljZ2J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg3OTA2ODAsImV4cCI6MTk5NDM2NjY4MH0.UYmOGtqPCrZ48w4KnEIZNoL2RkBEjogqfNWjqVPsW0o'
}

export const supabase = createClient(env.url, env.apiKey);
