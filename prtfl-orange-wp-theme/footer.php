<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WordPress
 * @subpackage studio
 * @since Twenty Nineteen 1.0
 */

?>

<footer class="footer grid-container">
	<div class="footer__grid grid-content">

		<?php if ( has_nav_menu( 'footer' ) ) : ?>
			<nav class="footer-navigation" class="footer__menu menu" aria-label="<?php esc_attr_e( 'Footer Menu', 'studio' ); ?>">
				<?php
				wp_nav_menu(
					array(
						'theme_location' => 'footer',
						'items_wrap' => '<ul class="menu__flex">%3$s</ul>',
						'container' => false
					)
				);
				?>
			</nav>
		<?php endif; ?>

		<div class="footer__contact">
			<?php if ( is_active_sidebar( 'footer-contact' ) ) {
				dynamic_sidebar( 'footer-contact' ); 
			} ?>
		</div>


	<?php if ( has_nav_menu( 'footer-menu' ) ) : ?>
		<nav id="site-navigation" class="footer__menu menu main-navigation" aria-label="<?php esc_attr_e( 'Footer Menu', 'studio' ); ?>">
				<?php
					wp_nav_menu(array(
						'theme_location' => 'footer-menu',
						'items_wrap' => '<ul class="menu__flex main-menu">%3$s</ul>',
						'container' => false
					));
				?>
			</nav>
	<?php endif; ?>

		<div class="footer__logo">
			<?php if ( is_active_sidebar( 'footer-logo' ) ) {
				dynamic_sidebar( 'footer-logo' ); 
			} ?>
		</div>

		<div class="footer__slogan">
			<?php if ( is_active_sidebar( 'footer-slogan' ) ) {
				dynamic_sidebar( 'footer-slogan' ); 
			} ?>
		</div>

		<div class="footer__copy">
			<?php if ( is_active_sidebar( 'footer-copy' ) ) {
				dynamic_sidebar( 'footer-copy' ); 
			} ?>
		</div>

		<?php if ( has_nav_menu( 'social' ) ) : ?>
				<?php
				wp_nav_menu(
					array(
						'theme_location' => 'social',
						'container' => false,
						'menu_class'     => 'footer__social social',
						'link_after'     => studio_get_icon_svg( 'link' ),
						'depth'          => 1,
					)
				);
				?>
		<?php endif; ?>


	</div>
</footer>

<?php wp_footer(); ?>
<!--[if lte IE 10]>
<div class="deprecated"><p>Sorry, this browser is not supported since 2016</p></div>
<![endif]-->

</body>
</html>
