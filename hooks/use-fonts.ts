import {
    Outfit_400Regular,
    Outfit_600SemiBold,
    Outfit_700Bold,
    Outfit_800ExtraBold,
} from '@expo-google-fonts/outfit';
import {
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
} from '@expo-google-fonts/poppins';
import { useFonts } from 'expo-font';

export const useCustomFonts = () => {
  const [fontsLoaded] = useFonts({
    // Poppins - Primary fallback
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    // Outfit - Secondary fallback
    Outfit_400Regular,
    Outfit_600SemiBold,
    Outfit_700Bold,
    Outfit_800ExtraBold,
    // Gilroy (when available) - uncomment when you add Gilroy font files
    /*
    'Gilroy-Regular': require('../assets/fonts/Gilroy-Regular.ttf'),
    'Gilroy-SemiBold': require('../assets/fonts/Gilroy-SemiBold.ttf'),
    'Gilroy-Bold': require('../assets/fonts/Gilroy-Bold.ttf'),
    'Gilroy-ExtraBold': require('../assets/fonts/Gilroy-ExtraBold.ttf'),
    */
  });

  return { fontsLoaded };
};

// Typography hierarchy following AfroTech Connect design system
export const Typography = {
  // Headings / Logo text: Bold or ExtraBold (700–800), tight letter spacing (-1%), uppercase
  heading: {
    fontFamily: 'Poppins_800ExtraBold', // Fallback to Poppins ExtraBold
    fontWeight: '800' as const,
    letterSpacing: -0.01, // -1%
    textTransform: 'uppercase' as const,
  },
  
  // Logo text (same as heading but can be customized separately)
  logo: {
    fontFamily: 'Poppins_800ExtraBold',
    fontWeight: '800' as const,
    letterSpacing: -0.01,
    textTransform: 'uppercase' as const,
  },
  
  // Subtitles / Secondary labels: SemiBold (600), normal letter spacing, title case
  subtitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: '600' as const,
    letterSpacing: 0,
    textTransform: 'capitalize' as const,
  },
  
  // Body text: Regular (400), comfortable line height (1.5em), light gray color
  body: {
    fontFamily: 'Poppins_400Regular',
    fontWeight: '400' as const,
    letterSpacing: 0,
    lineHeight: 1.5,
    color: '#CFCFCF',
  },
  
  // Buttons: SemiBold (600), uppercase, increased letter spacing (1%)
  button: {
    fontFamily: 'Poppins_600SemiBold',
    fontWeight: '600' as const,
    letterSpacing: 0.01, // 1%
    textTransform: 'uppercase' as const,
  },
};

// Font family fallback hierarchy: Gilroy → Poppins → Outfit → System
export const FontFamily = {
  // When Gilroy is available (uncomment when Gilroy files are added)
  gilroy: {
    regular: 'Gilroy-Regular',
    semiBold: 'Gilroy-SemiBold', 
    bold: 'Gilroy-Bold',
    extraBold: 'Gilroy-ExtraBold',
  },
  
  // Poppins - Primary fallback (geometric, modern)
  poppins: {
    regular: 'Poppins_400Regular',
    semiBold: 'Poppins_600SemiBold',
    bold: 'Poppins_700Bold',
    extraBold: 'Poppins_800ExtraBold',
  },
  
  // Outfit - Secondary fallback (geometric, clean)
  outfit: {
    regular: 'Outfit_400Regular',
    semiBold: 'Outfit_600SemiBold',
    bold: 'Outfit_700Bold',
    extraBold: 'Outfit_800ExtraBold',
  },
};
