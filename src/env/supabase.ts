import { createClient } from '@supabase/supabase-js';

/**
 * Global supabase instance.
 * Url and API key can be found in the Supabase dashboard.
 */
const env = {
    url: window["env" as any]["apiUrl" as any]?.toString(),
    apiKey: window["env" as any]["apiToken" as any]?.toString()
}

export const supabase = createClient(env.url, env.apiKey);
