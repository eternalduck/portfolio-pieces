<?php
/**
* Template Name: Portfolio Post
* Template Post Type: post
 *
 * @package WordPress
 * @subpackage Twenty_Nineteen
 * @since Twenty Nineteen 1.0
 */
get_header(); ?>

<div class="page-wrap">

	<?php 
		while ( have_posts() ) : the_post(); 

			get_template_part( 'template-parts/portfolio/content', 'portfolio-single' );

		endwhile; 
	?>


</div>
<?php get_footer(); ?>