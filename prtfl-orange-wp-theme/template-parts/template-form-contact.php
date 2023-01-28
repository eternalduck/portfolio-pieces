<?php
/**
* Template Name: block - Form (contact)

* @package WordPress
* @subpackage studio
* @since Twenty Nineteen 1.0
*/
?>

<?php
while ( have_posts() ) : the_post();

	get_template_part( 'template-parts/content-parts/content', 'form-contact' );

endwhile ?>
