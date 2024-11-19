import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nujwijngbbzmgyopdqhc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51andpam5nYmJ6bWd5b3BkcWhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5NzUwOTEsImV4cCI6MjA0NzU1MTA5MX0.EiN7FPbHuu3UpRNKpMwH5d0_b5moCimWBMw-vHRhC_I';

export const supabase = createClient(supabaseUrl, supabaseKey);
