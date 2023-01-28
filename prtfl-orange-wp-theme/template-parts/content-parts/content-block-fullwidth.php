<?php
/**
 * Template part for displaying
 * generic page blocks for template _Block: Full-width
 *
 * @package WordPress
 * @subpackage studio
 * @since Twenty Nineteen 1.0
 */
// template-parts/template-standard-block.php
?>

<section id="<?php the_field('block-class');?>" 
	class="prlx-container 
	<?php if (get_field('block-class')) {
			the_field('block-class'); 
	} ?>"
>

	<h1 class="content-width <?php the_field('block-class'); ?>__title">
		<?php the_title(); ?>
	</h1>
	<div class="content-fullwidth <?php the_field('block-class'); ?>__content">
		<?php the_content(); ?>
	</div>

</section>
