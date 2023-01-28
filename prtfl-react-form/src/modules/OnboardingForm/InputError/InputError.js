import React from "react"
import "./InputError.scss"

const InputError = (props) => {
	return(
		<>
			{props.errInvalid ?
				<div className="k-text input-error input-error_invalid">
					{props.errInvalid}
				</div> :
				null
			}
			<div className="k-text input-error input-error_empty">
				{props.errEmpty}
			</div>
		</>
	)
}
export default InputError
