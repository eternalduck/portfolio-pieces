<?php
/**
 * The front page template file
 *
 * If the user has selected a static page for their homepage, this is what will
 * appear.
 * Learn more: https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package WordPress
 * @subpackage studio
 * @since Twenty Nineteen 1.0
 */

get_header();
?>
<div class="page-wrap">
	<?php 
	while ( have_posts() ) : the_post();

	get_template_part( 'template-parts/content-parts/content', 'page-default' );

	endwhile; ?>
</div>
<?php
get_footer();
