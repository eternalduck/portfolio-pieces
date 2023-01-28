import React, {Component} from "react"
import GoUp from "../GoUp/GoUp.jsx"
import "./header-footer.scss"

const Footer = (props) => {
	return(
		<footer className={"footer " + props.footerClass}>
			<GoUp />
		</footer>
	)
}

export default Footer
