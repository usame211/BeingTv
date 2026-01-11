import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tearbiwdydmmfmufwgrc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlYXJiaXdkeWRtbWZtdWZ3Z3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgwODk5NjQsImV4cCI6MjA4MzY2NTk2NH0.m20xne62d-gGkRXISJNzcprFXU9hQUaRAr2r3NZgzFE';

export const isSupabaseConfigured = true;
export const supabase = createClient(supabaseUrl, supabaseKey);