<?php
/**
* Template Name: block - Teaser

* @package WordPress
* @subpackage studio
* @since Twenty Nineteen 1.0
*/
?>

<?php
 while ( have_posts() ) : the_post();

	get_template_part( 'template-parts/content-parts/content', 'teaser' );

	endwhile
	
?>
