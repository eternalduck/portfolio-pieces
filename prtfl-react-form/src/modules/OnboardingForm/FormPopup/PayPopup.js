import React from "react"
import {Popup} from "@progress/kendo-react-popup"
import {Input} from "@progress/kendo-react-inputs"
import {Button} from "@progress/kendo-react-buttons"
import InputError from "../InputError/InputError"
import "./PayPopup.scss"

const PayPopup = (props) => {
	return(
		<>
			<div className={
				props.isShown ? "popup__overlay" : "popup__overlay_hidden"
			}>
			</div>
				<Popup
					show={props.isShown}
					animate={true}
					openDuration={200}
					closeDuration={200}
					popupClass={"pay-popup"}
				>
				<form
					noValidate
					className="popup__content pay-popup__content"
					// onSubmit={}
				>
					<span className="popup__close"
						onClick={props.isToggled}><i
						className="fas fa-times">
					</i></span>
					<div className="container-fluid">
						<div className="row">
							<div className="col-12" id="payConfirm">
							<p>
								<span style={{color: "red"}}>{props.valPayWarnHeader}</span>
								{props.valPayWarn.split('\n').map((item, key) => {return <span key={key}>{item}<br/></span>})}
							</p>
							</div>
						</div>
						<div className="row justify-content-between align-items-center">
							<div className="field__wrap col-sm-9 col-12" id="payConfirm">
								<Input
									name="payConfirm"
									label={props.fieldTxt}
									required={true}
									value={props.value}
									validityStyles={props.validityStyles}
									onChange={props.handleChange}
									onBlur={props.handleBlur}
								/>
								<InputError
									errEmpty={props.valPayReason}
								/>
							</div>
							<div className="col-sm-3 col-12">
								<Button className="btn-small pay-popup__btn" type="submit">
									{props.btnSave}
								</Button>

							</div>
						</div>
					</div>
				</form>
				</Popup>
		</>
	)
}
export default PayPopup
