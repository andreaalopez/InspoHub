import { createClient } from '@supabase/supabase-js'

const URL = 'https://ntqbjxaknwlpgygxkjdk.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50cWJqeGFrbndscGd5Z3hramRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk2NjQ0NzgsImV4cCI6MjAxNTI0MDQ3OH0.Uw3tyRY3jynxpoRyGf1XFTipQcCULled8756DrnV-co';

export const supabase = createClient(URL, API_KEY);

