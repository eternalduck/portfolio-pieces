<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package WordPress
 * @subpackage studio
 * @since Twenty Nineteen 1.0
 */

get_header();
?>
<div class="page-wrap">
	<div class="single-page">

		<?php
		
		// Start the Loop.
		while ( have_posts() ) :
			the_post();
		
			get_template_part( 'template-parts/default-content/content', 'page' );
		
		endwhile; // End the loop.
		?>
	</div>
</div>

<?php
get_footer();
