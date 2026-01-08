export interface BusinessCase {
  id: string
  title: string
  description: string
  audioUrlMale: string // Male voice audio file
  audioUrlFemale: string // Female voice audio file
  transcript: {
    en: string
    ru: string
  }
  keyPoints: {
    en: string[]
    ru: string[]
  }
}

export interface Section {
  id: string
  title: {
    en: string
    ru: string
  }
  cases: BusinessCase[]
}

export const sections: Section[] = [
  {
    id: "globalisation",
    title: {
      en: "Section 1: Globalisation",
      ru: "Раздел 1: Глобализация",
    },
    cases: [
      {
        id: "trucklabs",
        title: "TruckLabs",
        description: "TruckLabs case study on globalisation",
        audioUrlMale: "/audio/section1/trucklabs-male.mp3",
        audioUrlFemale: "/audio/section1/trucklabs-female.mp3",
        transcript: {
          en: "TruckLabs is revolutionizing the trucking industry through innovative aerodynamic solutions...",
          ru: "TruckLabs революционизирует индустрию грузоперевозок через инновационные аэродинамические решения...",
        },
        keyPoints: {
          en: [
            "Innovative aerodynamic solutions",
            "Fuel efficiency improvements",
            "Global market expansion",
            "Technology adoption challenges",
          ],
          ru: [
            "Инновационные аэродинамические решения",
            "Улучшение топливной эффективности",
            "Расширение глобального рынка",
            "Проблемы внедрения технологий",
          ],
        },
      },
      {
        id: "zohos",
        title: "Zohos",
        description: "Zohos globalisation strategy",
        audioUrlMale: "/audio/section1/zohos-male.mp3",
        audioUrlFemale: "/audio/section1/zohos-female.mp3",
        transcript: {
          en: "Zohos demonstrates successful global expansion strategies in the software industry...",
          ru: "Zohos демонстрирует успешные стратегии глобальной экспансии в индустрии программного обеспечения...",
        },
        keyPoints: {
          en: [
            "Global expansion strategy",
            "Software industry insights",
            "Market penetration tactics",
            "Cultural adaptation",
          ],
          ru: [
            "Стратегия глобальной экспансии",
            "Инсайты индустрии ПО",
            "Тактики проникновения на рынок",
            "Культурная адаптация",
          ],
        },
      },
      {
        id: "airbnb",
        title: "Airbnb",
        description: "Airbnb's global platform evolution",
        audioUrlMale: "/audio/section1/airbnb-male.mp3",
        audioUrlFemale: "/audio/section1/airbnb-female.mp3",
        transcript: {
          en: "Airbnb transformed the hospitality industry through a global sharing economy platform...",
          ru: "Airbnb трансформировал индустрию гостеприимства через глобальную платформу экономики совместного потребления...",
        },
        keyPoints: {
          en: [
            "Sharing economy disruption",
            "Global platform scalability",
            "Regulatory challenges",
            "Community building",
          ],
          ru: [
            "Разрушение через экономику совместного потребления",
            "Масштабируемость глобальной платформы",
            "Регуляторные вызовы",
            "Построение сообщества",
          ],
        },
      },
    ],
  },
  {
    id: "political-legal",
    title: {
      en: "Section 2: Political & Legal Environment",
      ru: "Раздел 2: Политическая и правовая среда",
    },
    cases: [
      {
        id: "middle-east",
        title: "How Middle East Conflicts Shape the Future of International Business",
        description: "Impact of Middle East conflicts on international business",
        audioUrlMale: "/audio/section2/middle-east-male.mp3",
        audioUrlFemale: "/audio/section2/middle-east-female.mp3",
        transcript: {
          en: "The Middle East conflicts significantly impact international business operations and strategies...",
          ru: "Конфликты на Ближнем Востоке существенно влияют на международные бизнес-операции и стратегии...",
        },
        keyPoints: {
          en: [
            "Geopolitical risk analysis",
            "Supply chain disruptions",
            "Investment considerations",
            "Regional stability factors",
          ],
          ru: [
            "Анализ геополитических рисков",
            "Нарушения цепочек поставок",
            "Инвестиционные соображения",
            "Факторы региональной стабильности",
          ],
        },
      },
      {
        id: "china-ip",
        title: "China's Strategic Evolution in Intellectual Property Rights Protection",
        description: "China's IP rights evolution and business implications",
        audioUrlMale: "/audio/section2/china-ip-male.mp3",
        audioUrlFemale: "/audio/section2/china-ip-female.mp3",
        transcript: {
          en: "China's intellectual property landscape has evolved dramatically, impacting global business strategies...",
          ru: "Ландшафт интеллектуальной собственности Китая драматически эволюционировал, влияя на глобальные бизнес-стратегии...",
        },
        keyPoints: {
          en: [
            "IP protection improvements",
            "Legal framework changes",
            "Business strategy implications",
            "Innovation ecosystem development",
          ],
          ru: [
            "Улучшения защиты ИС",
            "Изменения правовой структуры",
            "Последствия для бизнес-стратегии",
            "Развитие инновационной экосистемы",
          ],
        },
      },
    ],
  },
  {
    id: "economic-systems",
    title: {
      en: "Section 3: Economic Systems",
      ru: "Раздел 3: Экономические системы",
    },
    cases: [
      {
        id: "transforming-kingdom",
        title: "Transforming the Kingdom",
        description: "Economic transformation case study",
        audioUrlMale: "/audio/section3/transforming-kingdom-male.mp3",
        audioUrlFemale: "/audio/section3/transforming-kingdom-female.mp3",
        transcript: {
          en: "The transformation of economic systems demonstrates the power of strategic planning and execution...",
          ru: "Трансформация экономических систем демонстрирует силу стратегического планирования и исполнения...",
        },
        keyPoints: {
          en: [
            "Economic diversification",
            "Strategic planning",
            "Implementation challenges",
            "Long-term vision",
          ],
          ru: [
            "Экономическая диверсификация",
            "Стратегическое планирование",
            "Проблемы внедрения",
            "Долгосрочное видение",
          ],
        },
      },
      {
        id: "government-interventions",
        title: "Government Interventions in Financial and Economic Spheres",
        description: "Analysis of government interventions in economy",
        audioUrlMale: "/audio/section3/government-interventions-male.mp3",
        audioUrlFemale: "/audio/section3/government-interventions-female.mp3",
        transcript: {
          en: "Government interventions play a crucial role in shaping economic outcomes and business environments...",
          ru: "Государственные вмешательства играют решающую роль в формировании экономических результатов и бизнес-среды...",
        },
        keyPoints: {
          en: [
            "Policy impacts",
            "Market regulation",
            "Economic stimulus measures",
            "Private sector implications",
          ],
          ru: [
            "Влияние политики",
            "Регулирование рынка",
            "Меры экономического стимулирования",
            "Последствия для частного сектора",
          ],
        },
      },
    ],
  },
  {
    id: "informal-institutions",
    title: {
      en: "Section 4: Informal Institutions & Socio-Cultural Environment",
      ru: "Раздел 4: Неформальные институты и социокультурная среда",
    },
    cases: [
      {
        id: "disney-world-tour",
        title: "Disney's World Tour",
        description: "Disney's global cultural adaptation strategy",
        audioUrlMale: "/audio/section4/disney-world-tour-male.mp3",
        audioUrlFemale: "/audio/section4/disney-world-tour-female.mp3",
        transcript: {
          en: "Disney's global expansion showcases the importance of cultural adaptation in international business...",
          ru: "Глобальная экспансия Disney демонстрирует важность культурной адаптации в международном бизнесе...",
        },
        keyPoints: {
          en: [
            "Cultural adaptation strategies",
            "Global brand localization",
            "Entertainment industry insights",
            "Market-specific customization",
          ],
          ru: [
            "Стратегии культурной адаптации",
            "Локализация глобального бренда",
            "Инсайты индустрии развлечений",
            "Кастомизация под конкретный рынок",
          ],
        },
      },
      {
        id: "hofstede-dimensions",
        title: "Applying Hofstede's Dimensions to Global Market Strategies: H&M and HSBC",
        description: "Cultural dimensions in global business strategy",
        audioUrlMale: "/audio/section4/hofstede-dimensions-male.mp3",
        audioUrlFemale: "/audio/section4/hofstede-dimensions-female.mp3",
        transcript: {
          en: "Hofstede's cultural dimensions provide a framework for understanding global market strategies...",
          ru: "Культурные измерения Хофстеде предоставляют основу для понимания стратегий глобального рынка...",
        },
        keyPoints: {
          en: [
            "Cultural dimensions theory",
            "H&M case analysis",
            "HSBC global strategy",
            "Cross-cultural management",
          ],
          ru: [
            "Теория культурных измерений",
            "Анализ кейса H&M",
            "Глобальная стратегия HSBC",
            "Межкультурный менеджмент",
          ],
        },
      },
    ],
  },
  {
    id: "csr-ethics",
    title: {
      en: "Section 5: CSR & Ethics",
      ru: "Раздел 5: КСО и этика",
    },
    cases: [
      {
        id: "kaspersky-csr",
        title: "Beyond Cybersecurity: Inside Kaspersky's CSR Journey",
        description: "Kaspersky's corporate social responsibility initiatives",
        audioUrlMale: "/audio/section5/kaspersky-csr-male.mp3",
        audioUrlFemale: "/audio/section5/kaspersky-csr-female.mp3",
        transcript: {
          en: "Kaspersky's CSR journey demonstrates how technology companies can contribute to society beyond their core business...",
          ru: "CSR путешествие Kaspersky демонстрирует, как технологические компании могут вносить вклад в общество за пределами основного бизнеса...",
        },
        keyPoints: {
          en: [
            "CSR strategy development",
            "Technology for good",
            "Community engagement",
            "Ethical business practices",
          ],
          ru: [
            "Разработка стратегии КСО",
            "Технологии во благо",
            "Вовлечение сообщества",
            "Этические бизнес-практики",
          ],
        },
      },
      {
        id: "offshore-trials",
        title: "Offshore Clinical Trials: Balancing Cost Savings and Ethical Concerns",
        description: "Ethical considerations in offshore clinical trials",
        audioUrlMale: "/audio/section5/offshore-trials-male.mp3",
        audioUrlFemale: "/audio/section5/offshore-trials-female.mp3",
        transcript: {
          en: "Offshore clinical trials raise important questions about balancing economic efficiency with ethical responsibilities...",
          ru: "Оффшорные клинические испытания поднимают важные вопросы о балансе экономической эффективности и этических обязательств...",
        },
        keyPoints: {
          en: [
            "Cost-benefit analysis",
            "Ethical considerations",
            "Regulatory compliance",
            "Patient protection measures",
          ],
          ru: [
            "Анализ затрат и выгод",
            "Этические соображения",
            "Соответствие регуляторным требованиям",
            "Меры защиты пациентов",
          ],
        },
      },
    ],
  },
  {
    id: "trade-investment",
    title: {
      en: "Section 6: International Trade & Investment",
      ru: "Раздел 6: Международная торговля и инвестиции",
    },
    cases: [
      {
        id: "trump-tariffs",
        title: "The Turbulent Journey of Trade: How Trump's Tariffs Reshaped Global Commerce",
        description: "Impact of trade tariffs on global commerce",
        audioUrlMale: "/audio/section6/trump-tariffs-male.mp3",
        audioUrlFemale: "/audio/section6/trump-tariffs-female.mp3",
        transcript: {
          en: "The trade policies and tariffs implemented during the Trump administration significantly reshaped global commerce patterns...",
          ru: "Торговая политика и тарифы, внедренные во время администрации Трампа, значительно изменили паттерны глобальной торговли...",
        },
        keyPoints: {
          en: [
            "Tariff impacts analysis",
            "Supply chain restructuring",
            "Trade war implications",
            "Global commerce patterns",
          ],
          ru: [
            "Анализ влияния тарифов",
            "Реструктуризация цепочек поставок",
            "Последствия торговых войн",
            "Паттерны глобальной торговли",
          ],
        },
      },
      {
        id: "fdi-oli",
        title: "FDI: Application of the OLI Framework",
        description: "OLI Framework in foreign direct investment",
        audioUrlMale: "/audio/section6/fdi-oli-male.mp3",
        audioUrlFemale: "/audio/section6/fdi-oli-female.mp3",
        transcript: {
          en: "The OLI framework provides a comprehensive approach to understanding foreign direct investment decisions...",
          ru: "OLI фреймворк предоставляет комплексный подход к пониманию решений по прямым иностранным инвестициям...",
        },
        keyPoints: {
          en: [
            "Ownership advantages",
            "Location advantages",
            "Internalization advantages",
            "FDI strategy development",
          ],
          ru: [
            "Преимущества владения",
            "Преимущества локации",
            "Преимущества интернализации",
            "Разработка стратегии ПИИ",
          ],
        },
      },
    ],
  },
]
