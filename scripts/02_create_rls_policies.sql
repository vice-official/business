-- Enable Row Level Security
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Chapters policies (public read, admin write)
CREATE POLICY "Anyone can view chapters" ON chapters
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert chapters" ON chapters
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Only admins can update chapters" ON chapters
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Only admins can delete chapters" ON chapters
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Business cases policies (public read, admin write)
CREATE POLICY "Anyone can view business cases" ON business_cases
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert business cases" ON business_cases
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Only admins can update business cases" ON business_cases
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Only admins can delete business cases" ON business_cases
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- User profiles policies
CREATE POLICY "Users can view their own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON user_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id AND role = (SELECT role FROM user_profiles WHERE id = auth.uid()));

-- User progress policies
CREATE POLICY "Users can view their own progress" ON user_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress" ON user_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" ON user_progress
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all progress" ON user_progress
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
