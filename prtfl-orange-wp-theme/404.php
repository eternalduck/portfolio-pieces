<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since studio Theme 1.0
 * @version 1.0
 */

get_header(); ?>

<div class="page404 grid-container">
	<div class="page404__content grid-content">
		<?php dynamic_sidebar( 'page404' ); ?>
	</div>
</div>
<?php
get_footer();
