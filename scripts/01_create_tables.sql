-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create chapters table
CREATE TABLE IF NOT EXISTS chapters (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_en TEXT NOT NULL,
  title_ru TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description_en TEXT,
  description_ru TEXT,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create business_cases table
CREATE TABLE IF NOT EXISTS business_cases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  chapter_id UUID REFERENCES chapters(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_ru TEXT NOT NULL,
  transcript_en TEXT NOT NULL,
  transcript_ru TEXT NOT NULL,
  audio_url_male TEXT,
  audio_url_female TEXT,
  duration INTEGER,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  business_case_id UUID REFERENCES business_cases(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  last_position INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, business_case_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_business_cases_chapter_id ON business_cases(chapter_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_business_case_id ON user_progress(business_case_id);
CREATE INDEX IF NOT EXISTS idx_chapters_slug ON chapters(slug);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_chapters_updated_at BEFORE UPDATE ON chapters
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_business_cases_updated_at BEFORE UPDATE ON business_cases
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_progress_updated_at BEFORE UPDATE ON user_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
