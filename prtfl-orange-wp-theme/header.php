<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WordPress
 * @subpackage studio
 * @since Twenty Nineteen 1.0

 */
?>

<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<link rel="profile" href="https://gmpg.org/xfn/11" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;0,800;1,400&family=Ubuntu:wght@400;700&display=swap" rel="stylesheet" rel="preload" as="style">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

<?php wp_body_open(); ?>
<div class="preloader">
	<div class="preloader__bg">
		<div class="preloader__spinner"></div>
	</div>
</div>

<div class="sidebar__toggle" id="sidebar-toggle"></div>
<div class="sidebar" id="sidebar">

	<?php if ( has_nav_menu( 'sidebar-menu' ) ) : ?>
		<?php
			wp_nav_menu(array(
				'theme_location' => 'sidebar-menu',
				'items_wrap' => '<ul class="sidebar__menu">%3$s</ul>',
				'container' => false
			));
		?>
		<?php endif; ?>

		<?php if ( has_nav_menu( 'lang-menu' ) ) : ?>
		<div class="sidebar__lang">
			<?php
				wp_nav_menu(array(
					'theme_location' => 'lang-menu',
					'items_wrap' => '<ul class="lang-menu">%3$s</ul>',
					'container' => false
				));
			?>
		</div>
		<?php endif; ?>

</div>

<header class="header">
	<div class="header__grid">
		<div class="header__logo">
			<a href="/">
				<div class="header__logo-spinner"></div>
			</a>
		</div>

		<?php if ( has_nav_menu( 'header-menu' ) ) : ?>
		<nav class="header__menu menu">
			<?php
				wp_nav_menu(array(
					'theme_location' => 'header-menu',
					'items_wrap' => '<ul class="menu__flex main-menu">%3$s</ul>',
					'container' => false
				));
			?>
		</nav>
		<?php endif; ?>

		<?php if ( has_nav_menu( 'lang-menu' ) ) : ?>
		<div class="header__lang">
				<?php
					wp_nav_menu(array(
						'theme_location' => 'lang-menu',
						'items_wrap' => '<ul class="lang-menu">%3$s</ul>',
						'container' => false
					));
				?>
		</div>
		<?php endif; ?>

		<div class="header__btn">
			<?php if ( is_active_sidebar( 'header-form-btn' ) ) {
					dynamic_sidebar( 'header-form-btn' ); 
				} 
			?>
		</div>
	</div>

	<div class="progress" id="progress">
		<div class="progress__bar"></div>
	</div>
	<div id="go-up"></div>
</header>

<div id="form-contact" class="popup__container popup_form">
	<?php
		get_template_part( 'template-parts/content-parts/content', 'form-contact' );
	?>
</div>

