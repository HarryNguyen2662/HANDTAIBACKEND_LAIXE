const { createClient } = require('@supabase/supabase-js');

const options = {
  db: {
    schema: 'public',
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: { 'x-my-custom-header': 'my-app-name' },
  },
};
// Use a custom domain as the supabase URL
const supabase = createClient(
  'https://pezwalqtfgvpfqtqfqbt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlendhbHF0Zmd2cGZxdHFmcWJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE4MzQ4OTQsImV4cCI6MjAzNzQxMDg5NH0.FcYfLPUyP0yft1ZViuq_92nKp4kIpY6dG3KES0FBLHE'
);

module.exports = supabase;
