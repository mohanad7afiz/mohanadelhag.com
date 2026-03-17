-- Run this in the Supabase SQL editor to set up the database schema.

-- Newsletter subscribers
CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Page views (privacy-friendly analytics)
CREATE TABLE page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  path TEXT NOT NULL,
  referrer TEXT,
  device_type TEXT,
  session_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);
CREATE INDEX idx_page_views_path ON page_views(path);
CREATE INDEX idx_page_views_created_at ON page_views(created_at);

-- Post overrides (toggle published state without modifying MDX files)
CREATE TABLE post_overrides (
  slug TEXT PRIMARY KEY,
  published BOOLEAN NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Row Level Security
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_overrides ENABLE ROW LEVEL SECURITY;

-- newsletter_subscribers: public INSERT, authenticated SELECT/DELETE
CREATE POLICY "Anyone can subscribe"
  ON newsletter_subscribers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Only admin can view subscribers"
  ON newsletter_subscribers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Only admin can delete subscribers"
  ON newsletter_subscribers FOR DELETE
  TO authenticated
  USING (true);

-- page_views: public INSERT, authenticated SELECT
CREATE POLICY "Anyone can track page views"
  ON page_views FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Only admin can view analytics"
  ON page_views FOR SELECT
  TO authenticated
  USING (true);

-- post_overrides: all operations authenticated only
CREATE POLICY "Only admin can manage post overrides"
  ON post_overrides FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
