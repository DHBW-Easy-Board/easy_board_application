import { createClient } from '@supabase/supabase-js';

/**
 * Global supabase instance.
 * Url and API key can be found in the Supabase dashboard.
 */
const env = {
    url: window["env" as any]["apiUrl" as any]?.toString() || "http://baumstamm:3000/api/v1",
    apiKey: window["env" as any]["apiToken" as any]?.toString() || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuc2xxaHFmbGpuaGRxamljZ2J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg3OTA2ODAsImV4cCI6MTk5NDM2NjY4MH0.UYmOGtqPCrZ48w4KnEIZNoL2RkBEjogqfNWjqVPsW0o'
}

export const supabase = createClient(env.url, env.apiKey);
