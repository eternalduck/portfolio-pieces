<?php
/**
* Template Name: _Single Page with Blocks
*
* @package WordPress
* @subpackage studio
* @since Twenty Seventeen 1.0
*/

// no grid here, layout is in content parts

get_header(); ?>

<div class="page-wrap">
	<?php 
	while ( have_posts() ) : the_post(); 
		get_template_part( 'template-parts/content-parts/content', 'page-default' );
	endwhile; ?>
</div>

<?php
get_footer();