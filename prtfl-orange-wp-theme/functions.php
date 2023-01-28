<?php
/**
 * Twenty Nineteen functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package WordPress
 * @subpackage studio
 * @since Twenty Nineteen 1.0
 */

/**
 * Twenty Nineteen only works in WordPress 4.7 or later.
 */
if ( version_compare( $GLOBALS['wp_version'], '4.7', '<' ) ) {
	require get_template_directory() . '/inc/back-compat.php';
	return;
}

if ( ! function_exists( 'studio_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function studio_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on Twenty Nineteen, use a find and replace
		 * to change 'studio' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'studio', get_template_directory() . '/languages' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );
		set_post_thumbnail_size( 1568, 9999 );

		// This theme uses wp_nav_menu() in two locations.
		register_nav_menus(
			array(
				'header-menu' => __( 'Header Menu', 'studio' ),
				'lang-menu' => __( 'Language Switcher in Top Menu', 'studio' ),
				'footer-menu' => __( 'Footer Menu', 'studio' ),
				'social' => __( 'Social Links Menu', 'studio' ),
				'sidebar-menu' => __( 'Sidebar Menu', 'studio' ),
			)
		);

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support(
			'custom-logo',
			array(
				'height'      => 190,
				'width'       => 190,
				'flex-width'  => false,
				'flex-height' => false,
			)
		);

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		// Add support for Block Styles.
		add_theme_support( 'wp-block-styles' );

		// Add custom editor font sizes.
		add_theme_support(
			'editor-font-sizes',
			array(
				array(
					'name'      => __( 'Small', 'studio' ),
					'shortName' => __( 'S', 'studio' ),
					'size'      => 19.5,
					'slug'      => 'small',
				),
				array(
					'name'      => __( 'Normal', 'studio' ),
					'shortName' => __( 'M', 'studio' ),
					'size'      => 22,
					'slug'      => 'normal',
				),
				array(
					'name'      => __( 'Large', 'studio' ),
					'shortName' => __( 'L', 'studio' ),
					'size'      => 36.5,
					'slug'      => 'large',
				),
				array(
					'name'      => __( 'Huge', 'studio' ),
					'shortName' => __( 'XL', 'studio' ),
					'size'      => 49.5,
					'slug'      => 'huge',
				),
			)
		);

		// Editor color palette.
		add_theme_support(
			'editor-color-palette',
			array(
				array(
					'name'  => __( 'brand-gray', 'studio' ),
					'slug'  => 'brand-gray',
					'color' => '#5A595E',
				),
				array(
					'name'  => __( 'black', 'studio' ),
					'slug'  => 'black',
					'color' => '#333',
				),
				array(
					'name'  => __( 'brand-orange', 'studio' ),
					'slug'  => 'brand-orange',
					'color' => '#F15927',
				),
				array(
					'name'  => __( 'brand-green', 'studio' ),
					'slug'  => 'brand-green',
					'color' => '#7BCF00',
				),
				array(
					'name'  => __( 'brand-blue', 'studio' ),
					'slug'  => 'brand-blue',
					'color' => '#56CAF3',
				),
				array(
					'name'  => __( 'turq', 'studio' ),
					'slug'  => 'turq',
					'color' => '#38829D',
				),
				array(
					'name'  => __( 'yellow', 'studio' ),
					'slug'  => 'yellow',
					'color' => '#FFC700',
				),
			)
		);

		// Add support for responsive embedded content.
		add_theme_support( 'responsive-embeds' );
	}
endif;
add_action( 'after_setup_theme', 'studio_setup' );

/**
 * Add preconnect for Google Fonts.
 *
 * @since Twenty Seventeen 1.0
 *
 * @param array  $urls          URLs to print for resource hints.
 * @param string $relation_type The relation type the URLs are printed.
 * @return array URLs to print for resource hints.
 */
function studio_resource_hints( $urls, $relation_type ) {
	if ( wp_style_is( 'studio-fonts', 'queue' ) && 'preconnect' === $relation_type ) {
		$urls[] = array(
			'href' => 'https://fonts.gstatic.com',
			'crossorigin',
		);
	}

	return $urls;
}
add_filter( 'wp_resource_hints', 'studio_resource_hints', 10, 2 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function studio_widgets_init() {

// Custom: 
	register_sidebar(
		array(
			'name'          => __( 'Header Form Popup', 'studio' ),
			'id'            => 'header-form-btn',
			'description'   => __( 'The button that calls a contact form popup', 'studio' )
		)
	);
	register_sidebar(
		array(
			'name'          => __( 'Footer Contact', 'studio' ),
			'id'            => 'footer-contact',
			'description'   => __( 'Add contact email or footer menu', 'studio' )
		)
	);
	register_sidebar(
		array(
			'name'          => __( 'Footer Logo', 'studio' ),
			'id'            => 'footer-logo',
			'description'   => __( 'Add logo in footer', 'studio' )
		)
	);
	register_sidebar(
		array(
			'name'          => __( 'Footer Slogan', 'studio' ),
			'id'            => 'footer-slogan',
			'description'   => __( 'Add slogan or another short phrase', 'studio' )
		)
	);
	register_sidebar(
		array(
			'name'          => __( 'Footer Copyright', 'studio' ),
			'id'            => 'footer-copy',
			'description'   => __( 'Add copyrght text', 'studio' )
		)
	);
	register_sidebar(
		array(
			'name'          => __( 'Porfolio Social Share', 'studio' ),
			'id'            => 'portfolio-share',
			'description'   => __( 'Add share plugin\'s item', 'studio' )
		)
	);

	register_sidebar(
		array(
			'name' => '404 Page',
			'id' => 'page404',
			'description'  => __( 'Text for 404 error page:' ),
			'before_widget' => '<div class="page404__item">',
			'after_widget' => '</div>'
		)
	);
	register_sidebar(
		array(
			'name' => 'Side Menu',
			'id' => 'side-menu',
			'description'  => __( 'Side Menu:' ),
			'before_widget' => '',
			'after_widget' => ''
		)
	);

}
add_action( 'widgets_init', 'studio_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function studio_scripts() {
	wp_enqueue_style( 'studio-style', get_stylesheet_uri(), array(), wp_get_theme()->get( 'Version' ) );

	// Custom: popup plugin
	wp_enqueue_style( 'studio-fancybox-css', get_template_directory_uri() . '/js/fancybox/fancybox.css' );

	wp_enqueue_script( 'studio-fancybox', get_theme_file_uri( '/js/fancybox/fancybox.js' ), '20200511', true );

	// Custom: additional general script
	wp_enqueue_script( 'studio-custom-script', get_theme_file_uri( '/js/custom.js' ), array(), '20200423', true );

}
add_action( 'wp_enqueue_scripts', 'studio_scripts' );

// Custom: move native jquery to footer
function mytheme_move_jquery_to_footer() {
	wp_scripts()->add_data( 'jquery', 'group', 1 );
	wp_scripts()->add_data( 'jquery-core', 'group', 1 );
	wp_scripts()->add_data( 'jquery-migrate', 'group', 1 );
}
add_action( 'wp_enqueue_scripts', 'mytheme_move_jquery_to_footer' );

// Custom: Remove extra rtl loading
function abort_loading_rtl_stylesheet() {
	remove_action( 'wp_head', 'locale_stylesheet' );
}
add_action( 'init', 'abort_loading_rtl_stylesheet' );

// Custom: preload all resources
add_action('wp_head', function () {
	global $wp_scripts;

	foreach ($wp_scripts->queue as $handle) {
		$script = $wp_scripts->registered[$handle];
		
		//-- If version is set, append to end of source.
		$source = $script->src . ($script->ver ? "?ver={$script->ver}" : "");

		//-- Spit out the tag.
		echo "<link rel='preload' href='{$source}' as='script'/>\n";
	}
}, 1);

// Custom: Add js to the backend
function add_backend_js( $hook ) {
	if ( 'post.php' != $hook ) {
		return;
	}
	wp_enqueue_script( 'my_custom_script', get_template_directory_uri() . '/js/backend.js');
}
add_action( 'admin_enqueue_scripts', 'add_backend_js' );

// Custom: add custom styles to the backend
function admin_style() {
	wp_enqueue_style('backend-tweaks', get_template_directory_uri().'/backend.css');

}
add_action('admin_enqueue_scripts', 'admin_style');


// Custom: Custom loop pagination (27 sept 2020)
function custom_posts_nav() {
	global $wp_query;

	$big = 999999999;

	$args = array(
		'base'    => str_replace( $big, '%#%', get_pagenum_link( $big ) ),
		'format'  => '',
		'current' => max( 1, get_query_var('paged') ),
		'total'   => $wp_query->max_num_pages,
		'show_all'     => false,
		'type'         => 'plain',
		'end_size'     => 2,
		'mid_size'     => 1,
		'prev_next'    => true,
		'prev_text'    => sprintf( '<i></i> %1$s', __( 'Newer Works', 'text-domain' ) ),
		'next_text'    => sprintf( '%1$s <i></i>', __( 'Older Works', 'text-domain' ) ),
		'add_args'     => false,
		'add_fragment' => '',
	);
	$result = paginate_links( $args );
	$result = preg_replace( '~/page/1/?([\'"])~', '\1', $result );
	echo $result;
}
// end custom loop pagination

// Custom: change excerpt length
function mytheme_custom_excerpt_length( $length ) {
	return 100;//words
}
add_filter( 'excerpt_length', 'mytheme_custom_excerpt_length', 999 );

// Custom: Disable generated image sizes
function shapeSpace_disable_image_sizes($sizes) {
	unset($sizes['thumbnail']);
	unset($sizes['medium']);
	unset($sizes['large']);
	unset($sizes['medium_large']);
	unset($sizes['1536x1536']);
	unset($sizes['2048x2048']);
	return $sizes;
}

add_action('intermediate_image_sizes_advanced', 'shapeSpace_disable_image_sizes');

// Disable scaled image size
add_filter('big_image_size_threshold', '__return_false');

// Disable other image sizes
function shapeSpace_disable_other_image_sizes() {
	
	remove_image_size('post-thumbnail');
	remove_image_size('another-size');
	
}
add_action('init', 'shapeSpace_disable_other_image_sizes');
// end disable generated image sizes


// Custom: Disable srcset on frontend
function disable_wp_responsive_images() {
	return 1;
}
add_filter('max_srcset_image_width', 'disable_wp_responsive_images');
// end disable srcset


/**
 * Fix skip link focus in IE11.
 *
 * This does not enqueue the script because it is tiny and because it is only for IE11,
 * thus it does not warrant having an entire dedicated blocking script being loaded.
 *
 * @link https://git.io/vWdr2
 */
function studio_skip_link_focus_fix() {
	// The following is minified via `terser --compress --mangle -- js/skip-link-focus-fix.js`.
	?>
	<script>
	/(trident|msie)/i.test(navigator.userAgent)&&document.getElementById&&window.addEventListener&&window.addEventListener("hashchange",function(){var t,e=location.hash.substring(1);/^[A-z0-9_-]+$/.test(e)&&(t=document.getElementById(e))&&(/^(?:a|select|input|button|textarea)$/i.test(t.tagName)||(t.tabIndex=-1),t.focus())},!1);
	</script>
	<?php
}
add_action( 'wp_print_footer_scripts', 'studio_skip_link_focus_fix' );


// Custom: 
require get_template_directory() . '/inc/shortcodes.php';
// end shortcodes

/**
 * SVG Icons class.
 */
require get_template_directory() . '/classes/class-studio-svg-icons.php';

/**
 * Custom Comment Walker template - deleted
 */
// require get_template_directory() . '/classes/class-twentynineteen-walker-comment.php';

/**
 * Common theme functions.
 */
require get_template_directory() . '/inc/helper-functions.php';

/**
 * SVG Icons related functions.
 */
require get_template_directory() . '/inc/icon-functions.php';

/**
 * Enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Custom template tags for the theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';


// Custom: dev scss option - not used anymore
// define('WP_SCSS_ALWAYS_RECOMPILE', true);

