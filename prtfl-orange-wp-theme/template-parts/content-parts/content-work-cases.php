<?php
/**
 * Template part for displaying
 * page block .work-cases
 * there's no page template, this is included directly
 *
 * @package WordPress
 * @subpackage studio
 * @since Twenty Nineteen 1.0
 */

?>

<?php $featured_img_url = get_the_post_thumbnail_url(get_the_ID(),'full'); ?>

<section class="work-cases prlx-container" id="work-cases">
		<div class="work-cases__gif-container prlx">
			<h1 class="work-cases__title txt_extra">
				<?php the_title(); ?>
			</h1>
			<div class="work-cases__overlay"></div>
			<div class="work-cases__img" style="background: url('<?php echo $featured_img_url; ?>') center/cover no-repeat">
			</div>
		</div>

		<div class="grid-container">
			<div class="grid-content">
				<div class="work-cases__txt">
					<?php the_content(); ?>
				</div>
			</div>
		</div>
</section>
