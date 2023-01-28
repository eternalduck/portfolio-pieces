import React from "react"
import {Popup} from "@progress/kendo-react-popup"
import "./SentStatusPopup.scss"

const SentStatusPopup = (props) => {
	console.log(props.isShown)
	return(
		<>
			<div className={
				props.isShown ? "popup__overlay" : "popup__overlay_hidden"
			} onClick={props.isToggled}>
			</div>
				<Popup
					show={props.isShown}
					popupClass={props.class}
					animate={true}
					openDuration={200}
					closeDuration={200}
				>
					<>
					<h4>{props.txtHeader}</h4>
					<p>{props.txt}</p>
					</>
				</Popup>
		</>
	)
}
export default SentStatusPopup
