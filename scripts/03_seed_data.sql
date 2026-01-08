-- Insert chapters
INSERT INTO chapters (title_en, title_ru, slug, description_en, description_ru, order_index) VALUES
  ('Globalisation', 'Глобализация', 'globalisation', 'Understanding global business dynamics', 'Понимание динамики глобального бизнеса', 1),
  ('Political & Legal Environment', 'Политическая и правовая среда', 'political-legal', 'Navigating political and legal frameworks', 'Навигация по политическим и правовым структурам', 2),
  ('Economic Systems', 'Экономические системы', 'economic-systems', 'Exploring different economic models', 'Изучение различных экономических моделей', 3),
  ('Informal Institutions & Socio-Cultural Environment', 'Неформальные институты и социокультурная среда', 'socio-cultural', 'Cultural dimensions in business', 'Культурные аспекты в бизнесе', 4),
  ('CSR & Ethics', 'КСО и этика', 'csr-ethics', 'Corporate social responsibility and ethical practices', 'Корпоративная социальная ответственность и этические практики', 5),
  ('International Trade & Investment', 'Международная торговля и инвестиции', 'trade-investment', 'Global trade dynamics and FDI', 'Динамика глобальной торговли и ПИИ', 6);

-- Insert business cases for Globalisation
INSERT INTO business_cases (chapter_id, title, description_en, description_ru, transcript_en, transcript_ru, audio_url_male, audio_url_female, order_index)
SELECT 
  id,
  'TruckLabs',
  'Innovative logistics solutions transforming the trucking industry',
  'Инновационные логистические решения, меняющие грузоперевозки',
  'TruckLabs is revolutionizing the trucking industry with aerodynamic technologies...',
  'TruckLabs революционизирует индустрию грузоперевозок с помощью аэродинамических технологий...',
  '/audio/male/globalisation/trucklabs.mp3',
  '/audio/female/globalisation/trucklabs.mp3',
  1
FROM chapters WHERE slug = 'globalisation';

INSERT INTO business_cases (chapter_id, title, description_en, description_ru, transcript_en, transcript_ru, audio_url_male, audio_url_female, order_index)
SELECT 
  id,
  'Zohos',
  'Cloud software suite empowering businesses globally',
  'Облачный пакет программного обеспечения для бизнеса по всему миру',
  'Zoho Corporation provides a comprehensive suite of business applications...',
  'Zoho Corporation предоставляет комплексный набор бизнес-приложений...',
  '/audio/male/globalisation/zohos.mp3',
  '/audio/female/globalisation/zohos.mp3',
  2
FROM chapters WHERE slug = 'globalisation';

INSERT INTO business_cases (chapter_id, title, description_en, description_ru, transcript_en, transcript_ru, audio_url_male, audio_url_female, order_index)
SELECT 
  id,
  'Airbnb',
  'Transforming hospitality through the sharing economy',
  'Трансформация индустрии гостеприимства через экономику совместного потребления',
  'Airbnb has disrupted the traditional hospitality industry by creating a platform...',
  'Airbnb нарушил традиционную индустрию гостеприимства, создав платформу...',
  '/audio/male/globalisation/airbnb.mp3',
  '/audio/female/globalisation/airbnb.mp3',
  3
FROM chapters WHERE slug = 'globalisation';

-- Insert business cases for Political & Legal
INSERT INTO business_cases (chapter_id, title, description_en, description_ru, transcript_en, transcript_ru, audio_url_male, audio_url_female, order_index)
SELECT 
  id,
  'How Middle East Conflicts Shape the Future of International Business',
  'Analyzing geopolitical impacts on global commerce',
  'Анализ геополитического влияния на мировую торговлю',
  'Middle East conflicts have profound implications for international business...',
  'Конфликты на Ближнем Востоке имеют глубокие последствия для международного бизнеса...',
  '/audio/male/political-legal/middle-east-conflicts.mp3',
  '/audio/female/political-legal/middle-east-conflicts.mp3',
  1
FROM chapters WHERE slug = 'political-legal';

INSERT INTO business_cases (chapter_id, title, description_en, description_ru, transcript_en, transcript_ru, audio_url_male, audio_url_female, order_index)
SELECT 
  id,
  'China''s Strategic Evolution in Intellectual Property Rights Protection',
  'Understanding IP landscape transformation in China',
  'Понимание трансформации ландшафта интеллектуальной собственности в Китае',
  'China has undergone significant transformation in IP rights protection...',
  'Китай претерпел значительную трансформацию в защите прав интеллектуальной собственности...',
  '/audio/male/political-legal/china-ip.mp3',
  '/audio/female/political-legal/china-ip.mp3',
  2
FROM chapters WHERE slug = 'political-legal';

-- Continue with other chapters...
-- (Similar pattern for Economic Systems, Socio-Cultural, CSR & Ethics, Trade & Investment)
