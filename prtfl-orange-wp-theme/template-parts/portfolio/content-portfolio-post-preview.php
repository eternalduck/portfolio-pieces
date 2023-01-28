<?php
/**
 * Template part for displaying
 * posts previews on Portfolio page
 *
 *
 * @package WordPress
 * @subpackage studio
 * @since Twenty Nineteen 1.0
 */

?>

<section class="grid-container portfolio-preview prlx-container <?php the_field('block-class'); ?>" id="<?php the_field('portfolio-preview__id'); ?>">

	<div class="portfolio-preview__share">
		<?php 
			if ( is_active_sidebar( 'portfolio-share' ) ) {
				dynamic_sidebar( 'portfolio-share' ); 
			} 
		?>
	</div>

	<div class="grid-content portfolio-preview__flex prlx">

		<div class="portfolio-preview__content">
			<h1 class="portfolio-preview__title">
				<?php the_title(); ?>
			</h1>
			<div class="portfolio-preview__txt">
				<?php the_content(); ?>
			</div>
		</div>

	</div>

	<?php if(get_field('portfolio-preview__bg-center')) : ?>
		<div class="portfolio-preview__bg portfolio-preview__bg-center" style="background-image: url(<?php the_field('portfolio-preview__bg-center') ?>)"></div>
	<?php endif; ?>

	<?php if(get_field('portfolio-preview__bg-01')) : ?>
		<div class="portfolio-preview__bg portfolio-preview__bg-01" style="background-image: url(<?php the_field('portfolio-preview__bg-01') ?>)"></div>
	<?php endif; ?>

	<?php if(get_field('portfolio-preview__bg-02')) : ?>
		<div class="portfolio-preview__bg portfolio-preview__bg-02" style="background-image: url(<?php the_field('portfolio-preview__bg-02') ?>)"></div>
	<?php endif; ?>

	<?php if(get_field('portfolio-preview__bg-03')) : ?>
		<div class="portfolio-preview__bg portfolio-preview__bg-03" style="background-image: url(<?php the_field('portfolio-preview__bg-03') ?>)"></div>
	<?php endif; ?>

	<?php if(get_field('portfolio-preview__bg-04')) : ?>
		<div class="portfolio-preview__bg portfolio-preview__bg-04" style="background-image: url(<?php the_field('portfolio-preview__bg-04') ?>)"></div>
	<?php endif; ?>

</section>
