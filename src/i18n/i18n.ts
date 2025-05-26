import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// English translations
const enTranslations = {
  common: {
    next: 'Next',
    previous: 'Previous',
    fullscreen: 'Toggle Fullscreen',
    language: 'Language',
    dark: 'Dark',
    light: 'Light',
    outline: 'Contents',
      presentationTitle: 'COVID-19 Viral Mechanisms',
    presentationSubtitle: 'Interactive Presentation',
    close: 'Close',
    slide: 'Slide',
    of: 'of',
    loading: 'Loading...'
  },
  sections: {
      introduction: 'Introduction to SARS-CoV-2',
      'cellular-biology': 'Cellular Biology & Viral Entry',
      'molecular-pathways': 'Molecular Pathways & Mechanisms',
      hallmarks: 'Clinical Manifestations',
      treatment: 'Treatment Approaches',
      statistics: 'Statistics & Epidemiology',
    future: 'Future Directions',
  },
  welcome: {
      title: 'COVID-19 Viral Mechanisms',
      subtitle: 'Interactive Presentation on SARS-CoV-2 and ACE2 Receptor Interactions',
    presentedBy: 'Presented by',
    supervisedBy: 'Supervised by',
    startPresentation: 'Start Presentation',
    presenter: {
      name: 'Ali Shirzadi',
      name2: 'Matin Malek',
      affiliation: 'Your University'
    },
    supervisor: {
      name: 'Dr. Hanieh Jafari',
      title: 'Professor',
      affiliation: 'Department Name'
    }
  },
  slides: {
      // Introduction section - COVID-19 Theme
    'intro-1': {
        title: 'SARS-CoV-2: A Molecular Machine',
        content: 'Introduction to SARS-CoV-2 as a sophisticated biological entity with complex viral structure including spike protein, nucleocapsid, envelope, and membrane proteins. This molecular machine demonstrates remarkable complexity in its interaction with human cellular systems.',
        modelTitle: '3D SARS-CoV-2 Virion Structure',
        sketchfabTitle: 'SARS-CoV-2 Coronavirus 3D Model',
        visualDescription: '3D model of complete SARS-CoV-2 virion structure with rotating virus model showing key proteins',
        pdbIds: '6VXX (SARS-CoV-2 spike protein), 7C2L (complete virion structure)',
        educationalGoal: 'Understand SARS-CoV-2 as a complex molecular system'
    },
    'intro-2': {
        title: 'The ACE2 Receptor: Gateway to Infection',
        content: 'ACE2 receptor structure and normal physiological function in cardiovascular regulation. Distribution across human tissues including lungs, heart, kidneys, and gastrointestinal tract explains multi-organ involvement. ACE2 became the primary entry point due to high binding affinity with viral spike protein.',
        chartTitle: 'ACE2 Expression vs. COVID-19 Severity Across Tissues',
        lungTissue: 'Lung Tissue',
        heartTissue: 'Heart Tissue',
        kidneyTissue: 'Kidney Tissue',
        giTract: 'GI Tract',
        modelTitle: '3D ACE2 Receptor Structure',
        visualDescription: '3D structure of ACE2 receptor embedded in cell membrane showing binding domain',
        pdbIds: '6M0J (ACE2 receptor structure)',
        educationalGoal: 'Comprehend ACE2\'s dual role in health and disease'
    },
    'intro-3': {
        title: 'Molecular Recognition: The Key-Lock Paradigm',
        content: 'Molecular recognition between the spike protein RBD and ACE2 follows classic key-lock paradigm. This specific interaction determines viral tropism and provides targets for neutralizing antibodies and therapeutic intervention.',
        modelTitle: 'Spike-ACE2 Binding Interface',
        sketchfabTitle: 'SARS-CoV-2 Spike Protein-Human ACE2 Protein Complex',
        visualDescription: 'Interactive 3D model showing spike-ACE2 binding interface with binding site highlighting',
        pdbIds: '6M0J (spike-ACE2 complex), 6LZG (spike RBD)',
        educationalGoal: 'Visualize molecular recognition principles'
    },

      // Cellular Biology section - Viral Entry Focus
    'cell-1': {
        title: 'Viral Entry Mechanisms',
        content: 'Endocytosis vs. membrane fusion pathways, TMPRSS2 protease activation of spike protein, and clathrin-mediated endocytosis process.',
        modelTitle: 'Viral Entry Pathways',
        altText: 'Viral Entry Mechanisms',
        imageTitle: 'SARS-CoV-2 Viral Entry Mechanisms - Click to view full screen'
    },
    'cell-2': {
        title: 'Cellular Hijacking: Taking Control',
        content: 'Viral RNA release and translation initiation, ribosome hijacking and polyprotein processing, formation of replication-transcription complexes.',
        modelTitle: 'Viral Replication Machinery',
        altText: 'Cellular Hijacking Mechanisms',
        imageTitle: 'SARS-CoV-2 Cellular Hijacking Mechanisms - Click to view full screen'
    },
      'cell-3': {
          title: 'Organelle Remodeling and Viral Factories',
          content: 'SARS-CoV-2 infection dramatically remodels cellular architecture to create optimal conditions for replication. The virus induces formation of double-membrane vesicles (DMVs) and disrupts normal organelle function.',
          stepperTitle: 'Cellular Remodeling Events',
          exploreButton: 'Explore Events',
          nextButton: 'Next Event',
          events: {
              erModifications: {
                  title: 'ER Modifications',
                  description: 'Membrane reorganization for viral factories'
              },
              dmvFormation: {
                  title: 'DMV Formation',
                  description: 'Protected sites for viral replication'
              },
              mitochondrialDysfunction: {
                  title: 'Mitochondrial Dysfunction',
                  description: 'Altered energy metabolism'
              },
              golgiFragmentation: {
                  title: 'Golgi Fragmentation',
                  description: 'Disrupted protein trafficking'
              }
      },
        modelTitle: 'Infected Cell Structure'
    },
      'cell-4': {
          title: 'Viral Assembly and Egress',
          content: 'The final phase of viral life cycle involves assembly of new viral particles and their release from infected cells. This process requires coordinated packaging of viral RNA with nucleocapsid proteins and envelope formation.',
          pathwayTitle: 'Viral Assembly Pathway',
          pathwayDescription: 'Sequential steps in viral particle formation',
          modelTitle: 'Viral Assembly Process'
      },
      'cell-5': {
          title: 'Viral Budding and Release',
          content: 'Video demonstration of viral budding process.',
          videoNotSupported: 'Your browser does not support the video tag.'
      },

      // Molecular Pathways - COVID-19 Focus
      'mol-1': {
          title: 'ACE2-Angiotensin Pathway Disruption',
          content: 'Viral binding to ACE2 disrupts the renin-angiotensin system, leading to angiotensin II accumulation and inflammatory cascade activation. This explains many COVID-19 pathophysiological features.',
          altText: 'ACE2-Angiotensin Pathway Disruption',
          imageTitle: 'ACE2-Angiotensin Pathway Disruption - Click to view full screen',
          modelTitle: 'ACE2-Spike Complex Structure'
      },
      'mol-2': {
          title: 'Inflammatory Signaling Cascades',
          content: 'SARS-CoV-2 infection triggers massive inflammatory responses including cytokine storm. NF-κB pathway activation leads to excessive IL-6, TNF-α, and interferon production causing tissue damage.',
          altText: 'Inflammatory Signaling Cascades',
          imageTitle: 'Inflammatory Signaling Cascades - Click to view full screen',
          modelTitle: 'Inflammatory Protein Structures'
      },
    'mol-4': {
        title: 'Immune Evasion Strategies',
        content: 'Interferon response suppression by viral proteins, MHC-I downregulation mechanisms, and autophagy pathway manipulation.',
        diagramTitle: 'Viral Immune Evasion Network',
        diagramDescription: 'Viral proteins and their immune evasion mechanisms in infected cells.'
    },
      'mol-5': {
          title: 'Metabolic Reprogramming',
          content: 'Glycolysis enhancement for viral replication, lipid metabolism alteration for membrane synthesis, and amino acid metabolism changes.',
          modelTitle: 'Metabolic Enzyme Structures'
      },

      // Clinical Manifestations
      'hall-1': {
          title: 'Respiratory System Molecular Damage',
          content: 'High ACE2 expression in alveolar epithelial cells makes lungs primary target for SARS-CoV-2. Viral infection disrupts surfactant production and gas exchange leading to respiratory failure.',
          modelTitle: 'Lung ACE2 Distribution',
          sketchfabTitle: 'COVID-19 Patient Lungs - Animated 3D Model'
      },
      'hall-2': {
          title: 'Cardiovascular System Impact',
          content: 'SARS-CoV-2 directly infects cardiac tissue through ACE2 receptors, leading to myocarditis and arrhythmias. Viral-induced disruption of the renin-angiotensin system causes endothelial dysfunction and increased cardiovascular complications.',
          chartTitle: 'Cardiovascular ACE2 Expression vs COVID-19 Severity',
          sketchfabTitle: '3D Animated Realistic Human Heart'
      },
      'hall-3': {
          title: 'Neurological Manifestations',
          content: 'Blood-brain barrier ACE2 and viral neuroinvasion, neuroinflammation and microglia activation, olfactory pathway infection mechanisms.',
          altText: 'Neurological Manifestations',
          imageTitle: 'Neurological Manifestations of SARS-CoV-2 - Click to view full screen',
          modelTitle: 'Neural ACE2 Expression'
      },
      'hall-4': {
          title: 'Gastrointestinal Tract Involvement',
          content: 'High ACE2 expression in GI epithelium, viral RNA detection in fecal samples, and gut microbiome disruption mechanisms.',
          modelTitle: 'GI Tract ACE2 Distribution'
      },
      'hall-5': {
          title: 'Renal System Complications',
          content: 'Kidney ACE2 expression in tubular cells, acute kidney injury molecular pathways, and proteinuria and hematuria mechanisms.',
          modelTitle: 'Renal ACE2 Expression'
      },
      'hall-6': {
          title: 'Vascular Endothelial Dysfunction',
          content: 'Endothelial ACE2 and direct viral infection, nitric oxide pathway disruption, and thrombotic microangiopathy mechanisms.',
          modelTitle: 'Endothelial Cell Structure'
      },
      'hall-7': {
          title: 'Immune System Dysregulation',
          content: 'T-cell exhaustion and lymphopenia, antibody-dependent enhancement concerns, and long COVID immune dysfunction.',
          chartTitle: 'Immune Cell Changes in COVID-19'
      },

      // Treatment Approaches
      'treat-1': {
          title: 'Antiviral Drug Mechanisms',
          content: 'Remdesivir RNA polymerase inhibition, Paxlovid protease inhibition mechanism, and Molnupiravir mutagenesis strategy.',
          chartTitle: 'Antiviral Drug Targets',
          altText: 'Antiviral Drug Mechanisms',
          imageTitle: 'Antiviral Drug Mechanisms - Click to view full screen'
      },
      'treat-2': {
          title: 'Monoclonal Antibody Therapies',
          content: 'Neutralizing antibody binding sites on spike protein, antibody escape mutations and variants, Fc-mediated effector functions.',
          modelTitle: 'Antibody-Spike Complex'
      },
      'treat-3': {
          title: 'Vaccine-Induced Immunity',
          content: 'COVID-19 vaccines elicit robust immune responses through mRNA or viral vector platforms. These vaccines train the immune system to recognize SARS-CoV-2 spike protein, generating neutralizing antibodies and T-cell mediated immunity for long-term protection.',
          altText: 'Vaccines',
          imageTitle: 'Vaccines - Click to view full screen',
          modelTitle: 'Vaccine Spike Protein'
      },
      'treat-4': {
          title: 'Host-Directed Therapies',
          content: 'Anti-inflammatory approaches (dexamethasone, tocilizumab), ACE inhibitor and ARB considerations, complement inhibition strategies.',
          modelTitle: 'Host Target Structures'
      },
      'treat-5': {
          title: 'Combination Therapy Approaches',
          content: 'Synergistic drug combinations, timing considerations for optimal efficacy, and resistance prevention strategies.',
          chartTitle: 'Combination Therapy Efficacy'
      },
      'treat-6': {
          title: 'Future Therapeutic Targets',
          content: 'Novel viral protein targets (nsp14, ORF8), host pathway modulation opportunities, broad-spectrum antiviral development.',
          chartTitle: 'Emerging Drug Target Pipeline'
      },

      // Statistics
    'stats-1': {
        title: 'Global Epidemiological Data',
        content: 'Global epidemiological data reveals varying infection rates, hospitalization, and mortality across populations. Variant emergence patterns show continuous viral evolution and adaptation.',
        chartTitle: 'Global COVID-19 Epidemiological Data'
    },
    'stats-2': {
        title: 'ACE2 Expression Correlations',
        content: 'Tissue-specific ACE2 levels and COVID-19 severity, age, sex, and comorbidity ACE2 expression patterns.',
        chartTitle: 'ACE2 Expression Analysis'
    },
      'stats-3': {
          title: 'Treatment Efficacy Data',
          content: 'Clinical trial results for major therapeutics, real-world effectiveness studies, and cost-effectiveness analyses.',
          chartTitle: 'Treatment Efficacy Results'
      },
      'stats-4': {
          title: 'Long COVID Molecular Markers',
          content: 'Biomarkers associated with persistent symptoms, immune dysfunction indicators, and viral persistence evidence.',
          chartTitle: 'Long COVID Biomarker Analysis'
      },

      // Future Directions
      'future-1': {
          title: 'Variant Evolution and Adaptation',
          content: 'Molecular evolution of spike protein, immune escape mechanisms, and transmissibility enhancement mutations.',
          diagramTitle: 'Viral Evolution Timeline'
      },
      'future-2': {
          title: 'Next-Generation Vaccines',
          content: 'Pan-coronavirus vaccine development, nasal and mucosal vaccine approaches, T-cell focused vaccine strategies.',
          chartTitle: 'Next-Gen Vaccine Technologies'
      },
      'future-3': {
          title: 'Diagnostic Innovation',
          content: 'Point-of-care molecular diagnostics, breath-based detection technologies, wearable biosensor development.',
          diagramTitle: 'Diagnostic Technology Pipeline'
      },
      'future-4': {
          title: 'Pandemic Preparedness Molecular Tools',
          content: 'Rapid vaccine platform technologies, broad-spectrum antiviral development, real-time pathogen surveillance systems.',
          chartTitle: 'Preparedness Technology Readiness'
      },
      'future-5': {
          title: 'Research Frontiers and Open Questions',
          content: 'Unresolved molecular mechanisms, long COVID pathophysiology mysteries, future research priorities and methodologies.',
          diagramTitle: 'COVID-19 Research Roadmap'
    }
  }
};

// Farsi translations
const faTranslations = {
  common: {
    next: 'بعدی',
    previous: 'قبلی',
    fullscreen: 'تغییر حالت نمایش کامل',
    language: 'زبان',
    dark: 'تیره',
    light: 'روشن',
    outline: 'فهرست مطالب',
      presentationTitle: 'مکانیسم‌های ویروسی COVID-19',
    presentationSubtitle: 'ارائه تعاملی',
    close: 'بستن',
    slide: 'اسلاید',
    of: 'از',
    loading: 'در حال بارگذاری...'
  },
  sections: {
      introduction: 'مقدمه‌ای بر SARS-CoV-2',
      'cellular-biology': 'بیولوژی سلولی و ورود ویروس',
      'molecular-pathways': 'مسیرهای مولکولی و مکانیسم‌ها',
      hallmarks: 'تظاهرات بالینی',
      treatment: 'روش‌های درمان',
      statistics: 'آمار و اپیدمیولوژی',
    future: 'جهت‌گیری‌های آینده',
  },
  welcome: {
      title: 'مکانیسم‌های ویروسی COVID-19',
      subtitle: 'ارائه تعاملی در مورد SARS-CoV-2 و تعاملات گیرنده ACE2',
    presentedBy: 'ارائه شده توسط',
    supervisedBy: 'استاد راهنما',
    startPresentation: 'شروع ارائه',
    presenter: {
      name: 'علی شیرزادی',
        name2: 'متین ملک',
      affiliation: 'دانشگاه شما'
    },
    supervisor: {
        name: 'دکتر هانیه جعفری',
      title: 'استاد',
      affiliation: 'نام بخش'
    }
  },
  slides: {
      // Introduction section - COVID-19 Theme
    'intro-1': {
        title: 'SARS-CoV-2: یک ماشین مولکولی',
        content: 'معرفی SARS-CoV-2 به عنوان یک موجود بیولوژیکی پیچیده با ساختار ویروسی پیچیده شامل پروتئین اسپایک، نوکلئوکپسید، پوشش، و پروتئین‌های غشایی. این ماشین مولکولی نشان‌دهنده پیچیدگی قابل توجه در تعامل با سیستم‌های سلولی انسان است.',
        sketchfabTitle: 'مدل 3D ویروس کرونا SARS-CoV-2'
    },
    'intro-2': {
        title: 'گیرنده ACE2: دروازه عفونت',
        content: 'ساختار گیرنده ACE2 و عملکرد فیزیولوژیکی طبیعی آن در تنظیم قلب-عروقی. توزیع در بافت‌های انسان شامل ریه، قلب، کلیه، و دستگاه گوارش توضیح می‌دهد که چرا ACE2 به نقطه ورود اصلی تبدیل شد. ACE2 به دلیل تمایل اتصال بالا با پروتئین اسپایک ویروسی، نقطه ورود اصلی شد.',
        chartTitle: 'بیان ACE2 نسبت به شدت COVID-19 در بافت‌ها',
        lungTissue: 'ریه',
        heartTissue: 'قلب',
        kidneyTissue: 'کلیه',
        giTract: 'دستگاه گوارش',
        modelTitle: 'ساختار 3D گیرنده ACE2',
        visualDescription: 'ساختار 3D گیرنده ACE2 درون غشای سلولی نشان‌دهنده دامنه اتصال',
        pdbIds: '6M0J (ساختار گیرنده ACE2)',
        educationalGoal: 'درک نقش دوگانه ACE2 در سلامت و بیماری'
    },
    'intro-3': {
        title: 'شناسایی مولکولی: پارادایم کلید-قفل',
        content: 'دامنه اتصال گیرنده پروتئین اسپایک (RBD) نشان‌دهنده تکمیل مولکولی عالی با گیرنده ACE2 است. این مکانیسم کلید-قفل شامل تعاملات اسیدهای آمینه خاص، پیوندهای هیدروژنی، و نیروهای الکترواستاتیک است که تمایل اتصال و ویژگی عفونت را تعیین می‌کنند.',
        modelTitle: 'رابط اتصال اسپایک-ACE2',
        sketchfabTitle: 'کمپلکس پروتئین اسپایک SARS-CoV-2-پروتئین ACE2 انسان',
        visualDescription: 'مدل تعامل اسپایک-ACE2 با برجسته‌سازی نقاط اتصال'
    },

      // Cellular Biology section - Viral Entry Focus
    'cell-1': {
        title: 'مکانیسم‌های ورود ویروس',
        content: 'مسیرهای اندوسیتوز در مقابل فیوژن غشا، فعال‌سازی پروتئاز TMPRSS2 پروتئین اسپایک، و فرآیند اندوسیتوز واسطه‌ی کلاترین.',
        modelTitle: 'مسیرهای ورود ویروس'
    },
    'cell-2': {
        title: 'هایجک سلولی: کنترل کردن',
        content: 'آزادسازی RNA ویروسی و شروع ترجمه، هایجک ریبوزوم و پردازش پلی‌پروتئین، تشکیل کمپلکس‌های تکثیر-رونویسی.',
        modelTitle: 'ماشین‌آلات تکثیر ویروس'
    },
      'cell-3': {
          title: 'بازسازی اورگانل‌ها و کارخانه‌های ویروسی',
          content: 'تغییرات غشای شبکه آندوپلاسمی، تشکیل وزیکول‌های دوغشایه، و اختلال عملکرد میتوکندری در طول عفونت ویروسی.',
          stepperTitle: 'رویدادهای بازسازی سلولی',
          exploreButton: 'کاوش رویدادها',
          nextButton: 'رویداد بعدی',
          events: {
              erModifications: {
                  title: 'تغییرات ER',
                  description: 'بازسازی غشا برای کارخانه‌های ویروسی'
              },
              dmvFormation: {
                  title: 'تشکیل DMV',
                  description: 'مکان‌های محافظت‌شده برای تکثیر ویروس'
              },
              mitochondrialDysfunction: {
                  title: 'اختلال میتوکندری',
                  description: 'تغییر متابولیسم انرژی'
              },
              golgiFragmentation: {
                  title: 'تکه‌تکه شدن گلژی',
                  description: 'اختلال حمل‌ونقل پروتئین'
              }
      },
        modelTitle: 'ساختار سلول آلوده'
    },
      'cell-4': {
          title: 'مونتاژ و خروج ویروس',
          content: 'بسته‌بندی پروتئین نوکلئوکپسید و RNA، درج پروتئین پوشش در غشاهای ER/گلژی، و مکانیسم‌های جوانه‌زنی ویروسی.',
          pathwayTitle: 'مسیر مونتاژ ویروس',
          pathwayDescription: 'مراحل متوالی در تشکیل ذره ویروسی',
          modelTitle: 'فرآیند مونتاژ ویروس'
      },
      'cell-5': {
          title: 'جوانه‌زنی ویروس و خروج',
          content: 'نمونه‌نمایی ویدئویی از فرآیند جوانه‌زنی ویروس.',
          videoNotSupported: 'مرورگر شما از تگ ویدئو پشتیبانی نمی‌کند.'
      },

      // Molecular Pathways - COVID-19 Focus
      'mol-1': {
          title: 'اختلال مسیر ACE2-آنژیوتانسین',
          content: 'عملکرد طبیعی ACE2 در سیستم رنین-آنژیوتانسین و اثرات اتصال SARS-CoV-2 بر فعالیت ACE2 منجر به تجمع آنژیوتانسین II.',
          modelTitle: 'ساختار کمپلکس ACE2-اسپایک'
      },
      'mol-2': {
          title: 'آبشارهای سیگنال‌دهی التهابی',
          content: 'فعال‌سازی مسیر NF-κB، مکانیسم‌های مولکولی طوفان سایتوکین، و مسیرهای سیگنال‌دهی IL-6، TNF-α و اینترفرون.',
          modelTitle: 'ساختارهای پروتئین التهابی'
      },
    'mol-4': {
        title: 'استراتژی‌های فرار ایمنی',
        content: 'سرکوب پاسخ اینترفرون توسط پروتئین‌های ویروسی، مکانیسم‌های کاهش MHC-I، و دستکاری مسیر اتوفاژی.',
        diagramTitle: 'شبکه فرار ایمنی ویروس',
        diagramDescription: 'پروتئین‌های ویروسی و مکانیسم‌های فرار ایمنی آنها در سلول‌های آلوده.'
    },
      'mol-5': {
          title: 'بازبرنامه‌ریزی متابولیک',
          content: 'افزایش گلیکولیز برای تکثیر ویروسی، تغییر متابولیسم لیپید برای سنتز غشا، و تغییرات متابولیسم اسیدهای آمینه.',
          modelTitle: 'ساختارهای آنزیم متابولیک'
      },

      // Clinical Manifestations
      'hall-1': {
          title: 'آسیب مولکولی سیستم تنفسی',
          content: 'سطح بیان ACE2 سلول‌های اپیتلیال آلوئولار، اختلال تولید سورفاکتانت، و مکانیسم‌های تخریب سد تبادل گاز.',
          modelTitle: 'توزیع ACE2 ریه',
          sketchfabTitle: 'ریه بیمار COVID-19 - مدل 3D انیمیشن'
      },
      'hall-2': {
          title: 'تأثیر سیستم قلبی‌عروقی',
          content: 'ACE2 مستقیم عفونت بافت قلبی، منجر به میوکاردیت و آریتمی قلبی. اختلال ویروسی در سیستم رنین-آنژیوتانسین منجر به اختلال اندوتلیال و افزایش عوارض قلبی-عروقی.',
          chartTitle: 'بیان ACE2 قلبی‌عروقی در مقابل شدت COVID-19',
          sketchfabTitle: 'قلب انسان واقعی 3D انیمیشن'
      },
      'hall-3': {
          title: 'تظاهرات نورولوژیک',
          content: 'ACE2 سد خونی-مغزی و نورواسیون ویروسی، نوروالتهاب و فعال‌سازی میکروگلیا، مکانیسم‌های عفونت مسیر بویایی.',
          altText: 'تظاهرات نورولوژیک',
          imageTitle: 'تظاهرات نورولوژیک SARS-CoV-2 - برای نمایش کامل کلیک کنید',
          modelTitle: 'بیان ACE2 عصبی'
      },
      'hall-4': {
          title: 'درگیری دستگاه گوارش',
          content: 'بیان بالای ACE2 در اپیتلیوم GI، تشخیص RNA ویروسی در نمونه‌های مدفوع، و مکانیسم‌های اختلال میکروبیوم روده.',
          modelTitle: 'توزیع ACE2 دستگاه گوارش'
      },
      'hall-5': {
          title: 'عوارض سیستم کلیوی',
          content: 'بیان ACE2 کلیه در سلول‌های توبولار، مسیرهای مولکولی آسیب حاد کلیه، و مکانیسم‌های پروتئینوری و هماتوری.',
          modelTitle: 'بیان ACE2 کلیوی'
      },
      'hall-6': {
          title: 'اختلال اندوتلیال عروقی',
          content: 'ACE2 اندوتلیال و عفونت مستقیم ویروسی، اختلال مسیر اکسید نیتریک، و مکانیسم‌های میکروآنژیوپاتی ترومبوتیک.',
          modelTitle: 'ساختار سلول اندوتلیال'
      },
      'hall-7': {
          title: 'اختلال تنظیم سیستم ایمنی',
          content: 'خستگی سلول T و لنفوپنی، نگرانی‌های تقویت وابسته به آنتی‌بادی، و اختلال ایمنی COVID طولانی.',
          chartTitle: 'تغییرات سلول‌های ایمنی در COVID-19'
      },

      // Treatment Approaches
      'treat-1': {
          title: 'مکانیسم‌های داروی ضدویروسی',
          content: 'مهار RNA پلیمراز رمدسیویر، مکانیسم مهار پروتئاز پکسلووید، و استراتژی جهش‌زایی مولنوپیراویر.',
          chartTitle: 'اهداف داروی ضدویروسی',
          altText: 'مکانیسم‌های داروی ضدویروسی',
          imageTitle: 'مکانیسم‌های داروی ضدویروسی - برای نمایش کامل کلیک کنید'
      },
      'treat-2': {
          title: 'درمان‌های آنتی‌بادی مونوکلونال',
          content: 'مکان‌های اتصال آنتی‌بادی خنثی‌کننده روی پروتئین اسپایک، جهش‌های فرار آنتی‌بادی و انواع، عملکردهای تأثیرگذار Fc.',
          modelTitle: 'کمپلکس آنتی‌بادی-اسپایک'
      },
      'treat-3': {
          title: 'ایمنی القا شده توسط واکسن',
          content: 'واکسن‌های COVID-19 پاسخ‌های ایمنی قوی از طریق پلتفرم‌های mRNA یا وکتور ویروسی ایجاد می‌کنند. این واکسن‌ها سیستم ایمنی را برای شناسایی پروتئین اسپایک SARS-CoV-2 آموزش می‌دهند، آنتی‌بادی‌های خنثی‌کننده و ایمنی سلول T را برای حفاظت بلندمدت ایجاد می‌کنند.',
          altText: 'واکسن‌ها',
          imageTitle: 'واکسن‌ها - برای نمایش کامل کلیک کنید',
          modelTitle: 'پروتئین اسپایک واکسن'
      },
      'treat-4': {
          title: 'درمان‌های هدایت‌شده میزبان',
          content: 'رویکردهای ضدالتهابی (دگزامتازون، توسیلیزوماب)، ملاحظات مهارکننده ACE و ARB، استراتژی‌های مهار کمپلمان.',
          modelTitle: 'ساختارهای هدف میزبان'
      },
      'treat-5': {
          title: 'رویکردهای درمان ترکیبی',
          content: 'ترکیبات دارویی هم‌افزا، ملاحظات زمان‌بندی برای اثربخشی بهینه، و استراتژی‌های پیشگیری از مقاومت.',
          chartTitle: 'اثربخشی درمان ترکیبی'
      },
      'treat-6': {
          title: 'اهداف درمانی آینده',
          content: 'اهداف پروتئین ویروسی جدید (nsp14، ORF8)، فرصت‌های تعدیل مسیر میزبان، توسعه ضدویروسی گسترده‌طیف.',
          chartTitle: 'خط لوله هدف دارویی نوظهور'
      },

      // Statistics
    'stats-1': {
        title: 'داده‌های اپیدمیولوژیک جهانی',
        content: 'نرخ عفونت، بستری در بیمارستان، و آمار مرگ‌ومیر. داده‌های ظهور و شیوع گونه، معیارهای پوشش واکسیناسیون.',
        chartTitle: 'آمار جهانی COVID-19'
    },
    'stats-2': {
        title: 'همبستگی‌های بیان ACE2',
        content: 'سطوح ACE2 خاص بافت و شدت COVID-19، الگوهای بیان ACE2 سن، جنس، و همراهی.',
        chartTitle: 'تحلیل بیان ACE2'
    },
      'stats-3': {
          title: 'داده‌های اثربخشی درمان',
          content: 'نتایج آزمایش‌های بالینی برای درمان‌های اصلی، مطالعات اثربخشی دنیای واقعی، و تحلیل‌های مقرون‌به‌صرفه.',
          chartTitle: 'نتایج اثربخشی درمان'
      },
      'stats-4': {
          title: 'نشانگرهای مولکولی COVID طولانی',
          content: 'بیومارکرهای مرتبط با علائم مداوم، شاخص‌های اختلال ایمنی، و شواهد ماندگاری ویروس.',
          chartTitle: 'تحلیل بیومارکر COVID طولانی'
      },

      // Future Directions
      'future-1': {
          title: 'تکامل و سازگاری گونه',
          content: 'تکامل مولکولی پروتئین اسپایک، مکانیسم‌های فرار ایمنی، و جهش‌های بهبود انتقال‌پذیری.',
          diagramTitle: 'جدول زمانی تکامل ویروس'
      },
      'future-2': {
          title: 'واکسن‌های نسل بعدی',
          content: 'توسعه واکسن پان-کروناویروس، رویکردهای واکسن بینی و مخاطی، استراتژی‌های واکسن متمرکز بر سلول T.',
          chartTitle: 'فناوری‌های واکسن نسل بعدی'
      },
      'future-3': {
          title: 'نوآوری تشخیصی',
          content: 'تشخیص‌های مولکولی نقطه‌مراقبت، فناوری‌های تشخیص مبتنی بر تنفس، توسعه بیوسنسور پوشیدنی.',
          diagramTitle: 'خط لوله فناوری تشخیصی'
      },
      'future-4': {
          title: 'ابزارهای مولکولی آمادگی پاندمی',
          content: 'فناوری‌های پلتفرم واکسن سریع، توسعه ضدویروسی گسترده‌طیف، سیستم‌های نظارت پاتوژن بلادرنگ.',
          chartTitle: 'آمادگی فناوری آمادگی'
      },
      'future-5': {
          title: 'مرزهای تحقیق و سؤالات باز',
          content: 'مکانیسم‌های مولکولی حل‌نشده، اسرار پاتوفیزیولوژی COVID طولانی، اولویت‌های تحقیقاتی آینده و روش‌شناسی‌ها.',
          diagramTitle: 'نقشه راه تحقیقات COVID-19'
    }
  },

    // Chart and diagram data
    chartData: {
        organs: {
            colon: 'کولون',
            gallbladder: 'کیسه صفرا',
            heartMuscle: 'عضله قلب',
            kidney: 'کلیه',
            epididymis: 'اپیدیدیم',
            breast: 'پستان',
            ovary: 'تخمدان',
            lung: 'ریه',
            prostate: 'پروستات',
            esophagus: 'مری',
            tongue: 'زبان',
            liver: 'کبد',
            pancreas: 'پانکراس',
            cerebellum: 'مخچه'
        },
        systems: {
            respiratory: 'تنفسی',
            cardiovascular: 'قلبی-عروقی',
            neurological: 'عصبی',
            gastrointestinal: 'گوارشی',
            renal: 'کلیوی'
        },
        labels: {
            ace2Expression: 'بیان ACE2'
        }
    },

    // Default slide content for missing slides
    defaultSlide: {
        underConstruction: 'این اسلاید در حال ساخت است. حاوی محتوای تفصیلی در مورد',
        context: 'در بافت مکانیسم‌های ویروسی SARS-CoV-2 و تعاملات گیرنده ACE2 خواهد بود.'
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      fa: { translation: faTranslations }
    },
    lng: 'en',
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false // React already escapes values
    },
    react: {
      useSuspense: true,
    }
  });

export default i18n;
