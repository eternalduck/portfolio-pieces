<?php
/**
 * Template part for displaying
 * page block .remote
 *
 * @package WordPress
 * @subpackage studio
 * @since Twenty Nineteen 1.0
 */

?>

<section class="remote" id="remote">
	<div class="grid-container">
		<div class="grid-content">
			<div class="remote__bg-holder">
				<div class="remote__bg"></div>
			</div>
			<h1 class="remote__title">
				<?php the_title(); ?>
			</h1>
			<div class="remote__content">
				<?php the_content();?>
			</div>
		</div>
	</div>
</section>
