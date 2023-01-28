<?php
/**
 * Template part for displaying
 * frontpage block .portfolio
 *
 * @package WordPress
 * @subpackage studio
 * @since Twenty Nineteen 1.0
 */

?>

<section class="prtfl prlx-container" id="front-portfolio">
		<div class="prtfl__title grid-container prlx">
			<div class="grid-content">
				<h1>
					<a href="/portfolio"><?php the_title(); ?></a>
				</h1>
			</div>
		</div>
		<div id="prtfl_turnip" class="prtfl_turnip prtfl_turnip__bg prtfl_turnip__bg_xs-sm grid-container">
			<div class="prtfl_turnip__grid prtfl_turnip__bg prtfl_turnip__bg_md-up grid-content">
				<div class="prtfl_turnip__txt prtfl__txt">
					<?php the_field("prtfl_turnip__txt");?>
				</div>
				<div class="prtfl_turnip__video prtfl__video" id="front-video-turnip">
					<iframe width="100%" height="100%" src="https://www.youtube.com/embed/<?php the_field("prtfl_turnip__video");?>" frameborder="0" allowfullscreen></iframe>
				</div>
				<div class="prtfl__bg-img prtfl_turnip__ded">
					<img src="<?php the_field('prtfl_turnip__ded');?>" alt=""/>
				</div>
				<div class="prtfl__bg-img prtfl_turnip__cloud-1">
					<img src="<?php the_field('prtfl_turnip__cloud-1');?>" alt="" class="cloud_right"/>
				</div>
				<div class="prtfl__bg-img prtfl_turnip__cloud-2">
					<img src="<?php the_field('prtfl_turnip__cloud-2');?>" alt="" class="cloud_left"/>
				</div>
			</div>
		</div>

		<div id="prtfl_dolly" class="prtfl_dolly grid-container">
			<div class="prtfl_dolly__grid grid-content">
				<div class="prtfl_dolly__txt prtfl__txt">
					<?php the_field("prtfl_dolly__txt");?>
				</div>
				<div class="prtfl_dolly__video prtfl__video" id="front-video-dolly">
					<iframe width="100%" height="100%" src="https://www.youtube.com/embed/<?php the_field("prtfl_dolly__video");?>" frameborder="0" allowfullscreen></iframe>
				</div>
				<div class="prtfl__bg-img prtfl_dolly__dolly">
					<img src="<?php the_field('prtfl_dolly__dolly');?>" alt=""/>
				</div>
				<div class="prtfl__bg-img prtfl_dolly__cloud-3">
					<img src="<?php the_field('prtfl_dolly__cloud-3');?>" alt="" class="cloud_right"/>
				</div>
			</div>
		</div>

</section>
