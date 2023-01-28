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

?>
<!-- content not in use yet(May, 26, 2020) -->
<div class="single-post portfolio-single <?php the_field('block-class'); ?>">
<div class="grid-container">
	<div class="grid-content">
		<h2 class="portfolio-single__post-title">
			<?php the_title(); ?>
		</h2>

		<div class="portfolio-single__post-content">
			<?php the_content(); ?>
		</div>

		<div class="portfolio-single__featured-img">
			<?php studio_post_thumbnail(); ?>
		</div>
	</div>
</div>



	<div class="grid-container">
		<div class="portfolio-single__nav grid-content">
			<?php
				if ( is_singular( 'post' ) ) {
					// Previous/next post navigation.
					the_post_navigation(
						array(
							'next_text' => '<span class="meta-nav">' . __( 'Next: ', 'studio' ) . '</span> ' .
								'<span class="post-title">%title</span>',

							'prev_text' => '<span class="meta-nav">' . __( 'Previous: ', 'studio' ) . '</span> ' .
								'<span class="post-title">%title</span>',
						)
					);
				}//if
			?>
		</div>
	</div>





</div>

