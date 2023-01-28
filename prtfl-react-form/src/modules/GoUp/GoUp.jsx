import React from "react"
import "./GoUp.scss"

const GoUp = () => {
	return(
		<div id="go-up"
			onClick={
				() => window.scrollTo({
					top: 0,
					left: 0,
					behavior: "smooth"
				})
			}
		>
			<i className="fas fa-chevron-up"></i>
		</div>
	)
}
export default GoUp
