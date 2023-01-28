import React from "react"
import {Ripple} from "@progress/kendo-react-ripple"
import {Button} from "@progress/kendo-react-buttons"
import {dataFormTermsRu, dataFormTermsEn} from "../../../data/dataFormTerms.jsx"
import "./FormTerms.scss"

const FormTerms = (props) => {
	return (
		<div className="row justify-content-center no-gutters">
			<div className="form-terms col-xl-8 col-lg-9 col-md-10 col-12">
				<h1>{props.titleFormTerms}</h1>
				{props.currentLocale.locale === "ru" ?
					<div className="form-terms__content">
						{dataFormTermsRu}
					</div> :
					<div className="form-terms__content">
						{dataFormTermsEn}
					</div>
				}
				<Ripple>
					<Button
						onClick={props.showForm}
						className="form-terms__btn k-button k-primary"
					>
						{props.btnTerms}
						<i className="fas fa-check btn-icon"></i>
					</Button>
				</Ripple>
				{/* </div> */}
			</div>
		</div>
	)
}
export default FormTerms
