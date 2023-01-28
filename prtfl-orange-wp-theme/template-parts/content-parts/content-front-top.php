<?php
/**
 * Template part for displaying
 * frontpage block .front-top
 *
 * @package WordPress
 * @subpackage studio
 * @since Twenty Nineteen 1.0
 */

?>

<section class="front-top prlx-container" id="front-top">
	<div class="front-top__grid prlx">
		
		<img class="front-top__bg front-top__bg_top-left" id="egg" src="<?php the_field('front-top__bg_top-left'); ?>" alt=""/>
		<img class="front-top__bg front-top__bg_top-right" src="<?php the_field('front-top__bg_top-right'); ?>" alt=""/>
		<img class="front-top__bg front-top__bg_bottom-left" src="<?php the_field('front-top__bg_bottom-left'); ?>" alt=""/>
		<img class="front-top__bg front-top__bg_bottom-right" src="<?php the_field('front-top__bg_bottom-right'); ?>" alt=""/>

		<div class="front-top__logo">
			<img class="front-top__logo-img" src="<?php the_field('front-top__logo'); ?>" alt=""/>
			<div class="front-top__logo-txt">
				<?php the_field("front-top__logo-txt"); ?>
			</div>
		</div>

		<div class="front-top__content">

			<div class="front-top__txt-01">
				<?php the_field("front-top__txt-01"); ?>
				<div class="front-top__btn-contaner">
					<a id="contact-intro" class="btn btn_big btn_orange" data-fancybox="popup" href="#form-contact">
						<?php the_field("front-top__btn"); ?>
					</a>
				</div>
			</div>

			<div class="front-top__txt-02">
				<img src="<?php the_field('front-top__icon'); ?>" alt=""/>
				<?php the_field("front-top__txt-02"); ?>
			</div>
		</div>

	</div>
</section>
