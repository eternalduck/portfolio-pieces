<?php
/**
 * The template for displaying search results pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#search-result
 *
 * @package WordPress
 * @subpackage Twenty_Nineteen
 * @since studio Theme 1.0
 */

get_header();
?>
<div class="page-wrap">
	<div class="grid-container">
		<div class="grid-content">

		<?php if ( have_posts() ) : ?>

			<header class="page-header">
				<h1 class="page-title">
					<?php _e( 'Search results for: ', 'studio' ); ?>
					<span class="page-description"><?php echo get_search_query(); ?></span>
				</h1>
			</header><!-- .page-header -->

			<?php
			// Start the Loop.
			while ( have_posts() ) :
				the_post();

				/*
				 * Include the Post-Format-specific template for the content.
				 * If you want to override this in a child theme, then include a file
				 * called content-___.php (where ___ is the Post Format name) and that
				 * will be used instead.
				 */
				get_template_part( 'template-parts/default-content/content', 'excerpt' );

				// End the loop.
			endwhile;

			// Previous/next page navigation.
			studio_the_posts_navigation();

			// If no content, include the "No posts found" template.
		else :
			get_template_part( 'template-parts/default-content/content', 'none' );

		endif;
		?>
		</div><!-- #main -->
	</div><!-- #primary -->
</div>

<?php
get_footer();
