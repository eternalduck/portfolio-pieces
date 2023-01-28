<?php
/**
* Template Name: _Single Portfolio Page
*
* @package WordPress
* @subpackage studio
* @since Twenty Seventeen 1.0
*/

// no grid here, layout is in "portfolio-post-preview" template
get_header(); ?>

<div id="portfolio-page" class="page-wrap portfolio-page">

	<?php
		$paged = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;
		$wp_query = new WP_Query( array(
				'category_name' => 'portfolio',
				'order' => 'DESC',
				'posts_per_page' => 5,
				'paged' => $paged,
				'nopaging' => true//change this & uncomment all related below if paging is needed
		) );

		if ( $wp_query->have_posts() ) : while ( $wp_query->have_posts() ) : $wp_query->the_post(); 

			get_template_part( 'template-parts/portfolio/content', 'portfolio-post-preview' );

		endwhile;
	?>

	<?php
		wp_reset_postdata(); 
		else :
	?>
		<p><?php _e( 'Sorry, no content here' ); ?></p>
	<?php endif; ?>

</div>

<?php get_footer();
