export const translations = {
  en: {
    'Executive Intelligence Hub': 'Executive Intelligence Hub',
    'Regional Node: Western India (BRICS Pilot)': 'Regional Node: Western India',
    'Government Planning Dashboard': 'Government Planning Dashboard',
    'Review AI Project Insights': 'Review AI Project Insights',
    'Total Citizen Requests': 'Total Citizen Requests',
    'Active Demand Hotspots': 'Active Demand Hotspots',
    'Infrastructure Gaps': 'Infrastructure Gaps',
    'Active Projects Funded': 'Active Projects Funded',
    'Population Impacted': 'Population Impacted',
    'Top AI-Generated Project Insights': 'Top AI-Generated Project Insights',
    'View All': 'View All',
    'Citizen Demand by Sector': 'Citizen Demand by Sector',
    'Recent Ingested Requests': 'Recent Ingested Requests',
    'View Full Requests Hub': 'View Full Requests Hub'
  },
  hi: {
    'Executive Intelligence Hub': 'कार्यकारी खुफिया हब',
    'Regional Node: Western India (BRICS Pilot)': 'क्षेत्रीय नोड: पश्चिमी भारत',
    'Government Planning Dashboard': 'सरकारी योजना डैशबोर्ड',
    'Review AI Project Insights': 'एआई परियोजना अंतर्दृष्टि की समीक्षा करें',
    'Total Citizen Requests': 'कुल नागरिक अनुरोध',
    'Active Demand Hotspots': 'सक्रिय मांग हॉटस्पॉट',
    'Infrastructure Gaps': 'बुनियादी ढांचा अंतराल',
    'Active Projects Funded': 'वित्त पोषित सक्रिय परियोजनाएं',
    'Population Impacted': 'प्रभावित जनसंख्या',
    'Top AI-Generated Project Insights': 'शीर्ष एआई-जनित परियोजना अंतर्दृष्टि',
    'View All': 'सभी देखें',
    'Citizen Demand by Sector': 'क्षेत्र द्वारा नागरिक मांग',
    'Recent Ingested Requests': 'हाल ही में प्राप्त अनुरोध',
    'View Full Requests Hub': 'पूरा अनुरोध हब देखें'
  },
  gu: {
    'Executive Intelligence Hub': 'એક્ઝિક્યુટિવ ઇન્ટેલિજન્સ હબ',
    'Regional Node: Western India (BRICS Pilot)': 'પ્રાદેશિક નોડ: પશ્ચિમ ભારત',
    'Government Planning Dashboard': 'સરકારી આયોજન ડેશબોર્ડ',
    'Review AI Project Insights': 'AI પ્રોજેક્ટ આંતરદૃષ્ટિની સમીક્ષા કરો',
    'Total Citizen Requests': 'કુલ નાગરિક વિનંતીઓ',
    'Active Demand Hotspots': 'સક્રિય માંગ હોટસ્પોટ્સ',
    'Infrastructure Gaps': 'ઇન્ફ્રાસ્ટ્રક્ચર ગેપ્સ',
    'Active Projects Funded': 'ભંડોળ પૂરું પાડવામાં આવેલ સક્રિય પ્રોજેક્ટ્સ',
    'Population Impacted': 'અસરગ્રસ્ત વસ્તી',
    'Top AI-Generated Project Insights': 'ટોચની AI-જનરેટેડ પ્રોજેક્ટ આંતરદૃષ્ટિ',
    'View All': 'બધા જુઓ',
    'Citizen Demand by Sector': 'ક્ષેત્ર દ્વારા નાગરિક માંગ',
    'Recent Ingested Requests': 'તાજેતરમાં પ્રાપ્ત વિનંતીઓ',
    'View Full Requests Hub': 'સંપૂર્ણ વિનંતીઓ હબ જુઓ'
  }
};

export const translate = (key, lang = 'en') => {
  if (translations[lang] && translations[lang][key]) {
    return translations[lang][key];
  }
  if (translations['en'] && translations['en'][key]) {
    return translations['en'][key];
  }
  return key;
};
