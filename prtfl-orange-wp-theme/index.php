<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package WordPress
 * @subpackage studio
 * @since Twenty Nineteen 1.0
 */

get_header();
?>
<div class="page-wrap">
	<div id="primary" class="grid-container default-page">
		<main id="main" class="grid-content">

		<?php
		if ( have_posts() ) {

			// Load posts loop.
			while ( have_posts() ) {
				the_post();
				get_template_part( 'template-parts/default-content/content' );
			}

			// Previous/next page navigation.
			studio_the_posts_navigation();

		} else {

			// If no content, include the "No posts found" template.
			get_template_part( 'template-parts/default-content/content', 'none' );

		}
		?>

		</main><!-- .site-main -->
	</div><!-- .content-area -->
</div>

<?php
get_footer();
