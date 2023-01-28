<?php
/**
 * Template part for displaying
 * frontpage block: .offers
 *
 * @package WordPress
 * @subpackage studio
 * @since Twenty Nineteen 1.0
 */

?>

<section class="offers offers_3d grid-container prlx-container" id="offers3d">
	<div class="offers_3d__grid grid-content prlx">
		<div class="offers_3d__txt">
			<?php the_field("offers_3d__txt"); ?>
		</div>
		<div class="offers_3d__links">
			<?php the_field("offers_3d__links"); ?>
		</div>
		<div class="offers_3d__left offers__bg">
			<img src="<?php the_field('offers_3d__left'); ?>" alt=""/>
		</div>
		<div class="offers_3d__right offers__bg">
			<img src="<?php the_field('offers_3d__right'); ?>" alt=""/>
		</div>
	</div>
</section>

<section class="offers offers_2d grid-container prlx-container" id="offers2d">
	<div class="offers_2d__grid grid-content prlx">
		<div class="offers_2d__txt">
			<?php the_field("offers_2d__txt"); ?>
		</div>
		<div class="offers_2d__top-left offers__bg">
			<img src="<?php the_field('offers_2d__top-left'); ?>" alt=""/>
		</div>
		<div class="offers_2d__bottom-right offers__bg">
			<img src="<?php the_field('offers_2d__bottom-right'); ?>" alt=""/>
		</div>
		<div class="offers_2d__center offers__bg">
			<img src="<?php the_field('offers_2d__center'); ?>" alt=""/>
		</div>
	</div>
</section>
