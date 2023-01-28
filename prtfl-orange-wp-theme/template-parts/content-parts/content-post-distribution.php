<?php
/**
 * Template part for displaying
 * posts on Distribution page
 *
 *
 * @package WordPress
 * @subpackage studio
 * @since Twenty Nineteen 1.0
 */

?>

<?php $featured_img_url = get_the_post_thumbnail_url(get_the_ID(),'full'); ?>

<section class="grid-container distrib-post prlx-container <?php the_field('block-class'); ?>" id="<?php the_field('block-class'); ?>">

	<div class="grid-content prlx">
		<div class="distrib-post__img">
			<img src="<?php echo $featured_img_url; ?>" alt=""/>
		</div>

		<div class="distrib-post__content">
			<?php the_content(); ?>
		</div>

	</div>
</section>
