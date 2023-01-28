<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package WordPress
 * @subpackage Twenty_Nineteen
 * @since Twenty Nineteen 1.0
 */


// the_title( sprintf( '<h1 class="portfolio-preview__title"><a href="%s">', esc_url( get_permalink() ) ), '</a></h1>' );


?>
<div class="grid-container" id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="grid-content">
		<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>

	<?php if ( studio_post_thumbnail() ) : ?>
		<?php studio_post_thumbnail(); ?>

	<?php endif; ?>

	<?php
	the_content();
	
	// wp_link_pages(
	// 	array(
	// 		'before' => '<div class="page-links">' . __( 'Pages:', 'studio' ),
	// 		'after'  => '</div>',
	// 	)
	// );
	?><!-- .entry-content -->

	</div>
</div>