<?php
/**
* Template Name: Tech: Template Stats
*
* @package WordPress
* @subpackage studio
* @since Twenty Seventeen 1.0
*/


get_header(); ?>





<div class="page-wrap">
	<div class="grid-container">
		<div class="grid-content">
			
			<?php
			 while ( have_posts() ) : the_post();

				get_template_part( 'template-parts/content-parts/content', 'tech-stats' );

				endwhile

			?>
		</div>
	</div>
</div>

<?php
get_footer();