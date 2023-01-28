<?php
/**
 * Template part for displaying
 * generic page blocks for template _Block: Standard
 *
 * @package WordPress
 * @subpackage studio
 * @since Twenty Nineteen 1.0
 */
// template-parts/template-standard-block.php
?>

<section id="<?php the_field('block-class');?>" 
	class="grid-container prlx-container 
	<?php if (get_field('block-class')) {
			the_field('block-class'); 
	} ?>"
>
	<div class="grid-content prlx">
		<h1 class="<?php the_field('block-class'); ?>__title">
			<?php the_title(); ?>
		</h1>
		<div class="<?php the_field('block-class'); ?>__content">
			<?php the_content(); ?>
		</div>

	</div>
</section>


