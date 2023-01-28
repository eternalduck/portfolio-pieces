<?php
/**
 * Template part for displaying
 * page block .form
 *
 * @package WordPress
 * @subpackage studio
 * @since Twenty Nineteen 1.0
 */

?>

<?php 
	$post_id = '519';//change if the page holding thihs form was [accidentally] deleted and recreated in admin
	$featured_img_url = get_the_post_thumbnail_url($post_id, 'full');
?>

<div class="form form_order grid-container">
	<div class="grid-content form__grid">
		<h2 class="form__title">
			<?php echo get_the_title($post_id); ?>
		</h2>
		<?php 
			$post = get_post($post_id);
			$output = apply_filters( 'the_content', $post->post_content );
			echo $output;
		?>
		<div class="form__img">
			<img src="<?php echo $featured_img_url; ?>" alt=""/>
		</div>
	</div>
</div>
