let primary = {
  50: '#36c0ff',
  100: '#1db8ff',
  200: '#03b0ff',
  300: '#00a0e9',
  400: '#008ecf',
  500: 'rgb(0,125,182)',
  600: '#006b9c',
  700: '#005a83',
  800: '#004869',
  900: '#003750',
  A100: '#50c8ff',
  A200: '#69d0ff',
  A400: '#83d8ff',
  A700: '#002536',
  contrastDefaultColor: 'light'
};

let accent = {
  50: '#8f5504',
  100: '#a86404',
  200: '#c17305',
  300: '#da8205',
  400: '#f39106',
  500: '#f99c19',
  600: '#fbb24b',
  700: '#fbbc64',
  800: '#fcc77d',
  900: '#fcd296',
  A100: '#fbb24b',
  A200: 'rgb(250,167,50)',
  A400: '#f99c19',
  A700: '#fddcae',
  contrastDefaultColor: 'light'
};

// let background = {
//   50: '#ffffff',
//   100: '#ffffff',
//   200: '#ffffff',
//   300: '#ffffff',
//   400: '#ffffff',
//   500: '#fff',
//   600: '#f2f2f2',
//   700: '#e6e6e6',
//   800: '#d9d9d9',
//   900: '#cccccc',
//   A100: '#ffffff',
//   A200: '#ffffff',
//   A400: '#ffffff',
//   A700: '#bfbfbf',
//   contrastDefaultColor: 'dark'
// };

let mdThemeConfig = function($mdThemingProvider) {
  $mdThemingProvider.definePalette('customPrimary', primary);
  $mdThemingProvider.definePalette('customAccent', accent);
  // $mdThemingProvider.definePalette('customBackground', background);
  $mdThemingProvider
    .theme('default')
    .primaryPalette('customPrimary')
    .accentPalette('customAccent');
    // .warnPalette('customBackground');
    // .backgroundPalette('customBackground');
};

mdThemeConfig.$inject = ["$mdThemingProvider"];

export default mdThemeConfig;
