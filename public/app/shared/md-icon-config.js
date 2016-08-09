let mdIconConfig = function($mdIconProvider) {
  $mdIconProvider
    .fontSet('md', 'material-icons') // register material icons
    .fontSet('mdi', 'material-design-icons')
    .icon('logo', 'app/assets/svg/logo.svg');
};

mdIconConfig.$inject = ["$mdIconProvider"];

export default mdIconConfig;
