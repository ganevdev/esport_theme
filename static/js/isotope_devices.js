// external js: isotope.pkgd.js

// filter functions
var filterFns = {};

function getHashFilter() {
  // get filter=filterName
  var matches = location.hash.match( /f=([^&]+)/i );
  var hashFilter = matches && matches[1];
  return hashFilter && decodeURIComponent( hashFilter );
}

// init Isotope
var $grid = $('.isotope_devices');

// bind filter button click
var $filterButtonGroup = $('.filter-button-group');
$filterButtonGroup.on( 'click', 'button', function() {
  var filterAttr = $( this ).attr('data-filter');
  // set filter in hash
  location.hash = 'f=' + encodeURIComponent( filterAttr );
});

var isIsotopeInit = false;

function onHashchange() {
  var hashFilter = getHashFilter();
  if ( !hashFilter && isIsotopeInit ) {
    return;
  }
  isIsotopeInit = true;
  // filter isotope
  $grid.isotope({
    itemSelector: '.element-item',
    layoutMode: 'vertical',
    // use filterFns
    filter: filterFns[ hashFilter ] || hashFilter
  });
  // set selected class on button
  if ( hashFilter ) {
    $filterButtonGroup.find('.active').removeClass('active');
    $filterButtonGroup.find('[data-filter="' + hashFilter + '"]').addClass('active');
  }
}

$(window).on( 'hashchange', onHashchange );

// trigger event handler to init Isotope
onHashchange(); 