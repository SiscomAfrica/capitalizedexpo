# AfroTech Connect Typography System

## Design Principles
- **Geometric**: Clean, modern geometric sans-serif fonts
- **Hierarchy**: Clear visual hierarchy with distinct font weights
- **Consistency**: Consistent spacing and sizing across the app
- **Accessibility**: Comfortable reading with proper contrast and line heights

## Font Hierarchy

### Primary: Gilroy (when available)
- Modern geometric sans-serif
- Smooth round terminals
- Professional and contemporary feel

### Fallback 1: Poppins
- Google Fonts geometric sans-serif
- Similar proportions to Gilroy
- Excellent readability

### Fallback 2: Outfit  
- Alternative geometric font
- Clean, minimalist design
- Good web font performance

## Typography Styles

### 1. Headings / Logo Text
- **Font**: ExtraBold (800 weight)
- **Letter Spacing**: -1% (tight)
- **Case**: UPPERCASE
- **Usage**: Main headings, logo text, primary CTAs

```javascript
Typography.heading
Typography.logo
```

### 2. Subtitles / Secondary Labels
- **Font**: SemiBold (600 weight)
- **Letter Spacing**: Normal (0%)
- **Case**: Title Case
- **Usage**: Section headers, secondary labels

```javascript
Typography.subtitle
```

### 3. Body Text
- **Font**: Regular (400 weight)
- **Line Height**: 1.5em (comfortable reading)
- **Color**: #CFCFCF (light gray)
- **Letter Spacing**: Normal (0%)
- **Usage**: Descriptive text, paragraphs, explanations

```javascript
Typography.body
```

### 4. Buttons
- **Font**: SemiBold (600 weight)
- **Letter Spacing**: +1% (increased for clarity)
- **Case**: UPPERCASE
- **Usage**: All button labels, CTAs

```javascript
Typography.button
```

## Implementation

Import the typography system:
```javascript
import { Typography, useCustomFonts } from '@/hooks/use-fonts';
```

Apply to styles:
```javascript
const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    ...Typography.heading,
    color: '#FFFFFF',
  },
  bodyText: {
    fontSize: 16,
    ...Typography.body,
  },
});
```

## Color Combinations

### High Contrast (Headers)
- White text (#FFFFFF) on dark backgrounds
- Dark text (#000000) on light backgrounds

### Medium Contrast (Body)
- Light gray (#CFCFCF) for body text
- Maintains readability while being subtle

### Brand Colors
- Primary Green: #A3E635
- Background: #000000 (pure black)
- Surface: Various grays for cards/sections

## Best Practices

1. **Consistency**: Always use Typography constants instead of custom font styles
2. **Hierarchy**: Maintain clear visual hierarchy with font sizes and weights
3. **Accessibility**: Ensure sufficient color contrast for all text
4. **Spacing**: Use consistent letter spacing as defined in the system
5. **Responsive**: Adjust font sizes appropriately for different screen sizes
