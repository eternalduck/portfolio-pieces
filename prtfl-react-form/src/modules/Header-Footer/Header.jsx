import React from "react"
import "./header-footer.scss"
import dataEn from '../../data/dataEn.json'// for non-translatable strings

const Header = (props) => {
	const {currentLocale, toggleLocaleHandler, headerClass, currentItem, userIsAdmin, isAdminPage, hasLangSwitch, hasMenu, menuHasTerms, toggleTerms, titleFormTerms} = props

	const logoCol = "col-xl-3 col-lg-2 col-md-3 col-sm-6 col-10 align-self-start"
	const langCol = "col-xl-1 col-2 align-self-start order-md-3"
	const menuAdminCol = "col-xl-8 col-12 order-xl-2"
	const menuAdminPageCol = "col-xl-9 col-lg-10 col-md-9 col-sm-6 col-12"
	const menuCol = "col-lg-8 col-md-7 col-12 order-md-2"
	const menuRow = "row justify-content-end flex-md-row flex-column"
	const menuAdminPageRow = "row justify-content-sm-end justify-content-start"
	return(
		<header className={"container-fluid header " + headerClass}>
		{hasLangSwitch &&
			<div className="lang-switch" onClick={toggleLocaleHandler}>
				<i className="fas fa-globe-europe lang-switch__icon"></i>
				<span>{
					currentLocale.nextLabel
				}</span>
			</div>
		}
		<div className="container">
			<div className="row justify-content-between">
				<div className={"header__logo " + logoCol}></div>
			{hasMenu &&
				<div className={userIsAdmin ?
					(isAdminPage ?
						"header-menu header-menu_admin-page " + menuAdminPageCol :
						"header-menu " + menuAdminCol) :
					"header-menu " + menuCol}
				>
					<div className={isAdminPage ? menuAdminPageRow : menuRow}>
					{userIsAdmin && 
						<>
						{currentItem !== "form" &&
							<div className="header-menu__item">
								<a href="/"
									className="underline_solid"
								>
									<span>{dataEn.menuForm}</span>
								</a>
							</div>
						}
						
						{currentItem !== "profile" || "directory" ?
							<div className="header-menu__item">
								<a href="#"
									className="underline_solid"
								>
									<span>{dataEn.menuEmployeeProfile}</span>
								</a>
							</div> : null
						}

						</>
					}
						{menuHasTerms &&
							<div className={userIsAdmin ?
								"header-menu__item header-menu__item_terms header-menu__item_terms_admin" :
								"header-menu__item header-menu__item_terms"
							}>
								<span onClick={toggleTerms} className="underline_dashed">
									<span>{titleFormTerms}</span>
								</span>
							</div>
						}
						
					</div>
				</div>
			}
			</div>
		</div>
		</header>
	)
}
export default Header
