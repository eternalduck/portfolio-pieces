import React from "react"
import {Popup} from "@progress/kendo-react-popup"
import {dataFormTermsRu, dataFormTermsEn} from "../../../data/dataFormTerms.jsx"
import "./FormTerms.scss"

const FormTermsPopup = (props) => {
	return(
		<>
			<div className={
				props.isShown ? "popup__overlay" : "popup__overlay_hidden"
			} onClick={props.isToggled}>
			</div>
				<Popup
					show={props.isShown}
					animate={true}
					openDuration={200}
					closeDuration={200}
					popupClass={"terms-popup"}
				>
					{props.currentLocale.locale === "ru" ?
					<div className="popup__content terms-popup__content form-terms__content">
						{dataFormTermsRu}
					</div> :
					<div className="popup__content terms-popup__content form-terms__content">
						{dataFormTermsEn}
					</div>
				}
				</Popup>
		</>
	)
}
export default FormTermsPopup
