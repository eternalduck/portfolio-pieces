/**
 * File customize-preview.js.
 *
 * Theme Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 */

(function($) {
	// Primary color.
	wp.customize('primary_color', function(value) {
		value.bind(function(to) {
			// Update custom color CSS.
			var style = $('#custom-theme-colors'),
				hue = style.data('hue'),
				css = style.html(),
				color

			if('custom' === to){
				// If a custom primary color is selected, use the currently set primary_color_hue.
				color = wp.customize.get().primary_color_hue
			} else {
				// If the "default" option is selected, get the default primary_color_hue.
				color = 199
			}

			// Equivalent to css.replaceAll, with hue followed by comma to prevent values with units from being changed.
			css = css.split(hue + ',').join(color + ',')
			style.html(css).data('hue', color)
		})
	})

	// Primary color hue.
	wp.customize('primary_color_hue', function(value) {
		value.bind(function(to) {
			// Update custom color CSS.
			var style = $('#custom-theme-colors'),
				hue = style.data('hue'),
				css = style.html()

			// Equivalent to css.replaceAll, with hue followed by comma to prevent values with units from being changed.
			css = css.split(hue + ',').join(to + ',')
			style.html(css).data('hue', to)
		})
	})

	// Image filter.
	wp.customize('image_filter', function(value) {
		value.bind(function(to) {
			if (to) {
				$('body').addClass('image-filters-enabled')
			} else {
				$('body').removeClass('image-filters-enabled')
			}
		})
	})

	// Collect information from customize-controls.js about which panels are opening (ported from 2017 theme)
	// wp.customize.bind( 'preview-ready', function() {

	// 	// Initially hide the theme option placeholders on load.
	// 	$( '.panel-placeholder' ).hide();

	// 	wp.customize.preview.bind( 'section-highlight', function( data ) {

	// 		// Only on the front page.
	// 		if ( ! $( 'body' ).hasClass( 'studio-front-page' ) ) {
	// 			return;
	// 		}

	// 		// When the section is expanded, show and scroll to the content placeholders, exposing the edit links.
	// 		if ( true === data.expanded ) {
	// 			$( 'body' ).addClass( 'highlight-front-sections' );
	// 			$( '.panel-placeholder' ).slideDown( 200, function() {
	// 				$.scrollTo( $( '#panel1' ), {
	// 					duration: 600,
	// 					offset: { 'top': -70 } // Account for sticky menu.
	// 				});
	// 			});

	// 		// If we've left the panel, hide the placeholders and scroll back to the top.
	// 		} else {
	// 			$( 'body' ).removeClass( 'highlight-front-sections' );
	// 			// Don't change scroll when leaving - it's likely to have unintended consequences.
	// 			$( '.panel-placeholder' ).slideUp( 200 );
	// 		}
	// 	});
	// });
})(jQuery)
