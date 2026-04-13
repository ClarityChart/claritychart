// Responsive font sizing utility
export function clamp(min, preferred, max) {
  return `clamp(${min}px, ${preferred}, ${max}px)`;
}

export const C = {
  // Backgrounds
  bg: '#0f1923',
  bgCard: '#1e3045',
  bgCardHover: '#254060',
  bgCardActive: '#2a4870',

  // Borders  
  border: 'rgba(196,168,130,0.4)',
  borderHover: '#c4a882',

  // Gold - brighter and more visible
  gold: '#d4b896',
  goldDim: '#a08060',
  goldFaint: 'rgba(196,168,130,0.15)',

  // Text - much brighter
  text: '#f8f0e4',
  textDim: '#d8c8b4',
  textFaint: '#a09080',

  // Green
  green: '#5dc48e',
  greenDim: 'rgba(93,196,142,0.15)',
  greenBorder: 'rgba(93,196,142,0.5)',

  // Blue
  blue: '#5aaac0',
  blueDim: 'rgba(90,170,192,0.15)',
  blueBorder: 'rgba(90,170,192,0.5)',

  // Fonts
  mono: "Courier New, monospace",
  serif: "Georgia, 'Times New Roman', serif",
};
