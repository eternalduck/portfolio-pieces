<?php
/**
 * Template part for displaying
 * page block .teaser
 *
 * @package WordPress
 * @subpackage studio
 * @since Twenty Nineteen 1.0
 */
?>

<section id="<?php the_field('teaser-id');?>" class="grid-container teaser">

	<div class="grid-content teaser__content">
		<?php if(get_field('teaser_img-left')) : ?>
			<img class="teaser__img teaser__img_left" src="<?php the_field('teaser_img-left') ?>"/>
		<?php endif; ?>

		<?php the_content(); ?>

		<?php if(get_field('teaser_img-right')) : ?>
			<img class="teaser__img teaser__img_right" src="<?php the_field('teaser_img-right') ?>"/>
		<?php endif; ?>
	</div>


</section>


<div id="form-contact" class="popup__container popup_form">
	<?php
		get_template_part( 'template-parts/content-parts/content', 'form-contact' );
	?>
</div>

<div id="form-order" class="popup__container popup_form">
	<?php
		get_template_part( 'template-parts/content-parts/content', 'form-order' );
	?>
</div> 

