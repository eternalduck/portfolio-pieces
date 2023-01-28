<?php
/**
* Template Name: _Single Distribution Page
*
* @package WordPress
* @subpackage studio
* @since Twenty Seventeen 1.0
*/

get_header(); ?>

<div class="page-wrap">
	<?php the_content(); ?>
	<div class="distribution-category-posts">
		<?php 
			$wp_query = new WP_Query( array(
				'category_name' => 'distribution',
				'order' => 'DESC',
				'nopaging' => true
			)); 
			while ( $wp_query->have_posts() ) : $wp_query->the_post(); 

				get_template_part( 'template-parts/content-parts/content', 'post-distribution' );

			endwhile;
			wp_reset_postdata();
		?>
	</div>
</div>

<?php get_footer();