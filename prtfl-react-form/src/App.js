import React, {Component} from 'react'
import {Route, BrowserRouter as Router} from 'react-router-dom'
import OnboardingForm from './modules/OnboardingForm/OnboardingForm'
import Header from './modules/Header-Footer/Header'
import Footer from './modules/Header-Footer/Footer'

import {LocalizationProvider, IntlProvider, load, loadMessages} from '@progress/kendo-react-intl'
import likelySubtags from 'cldr-core/supplemental/likelySubtags.json'
import weekData from 'cldr-core/supplemental/weekData.json'
import ruNumbers from 'cldr-numbers-full/main/ru/numbers.json'
import ruCaGregorian from 'cldr-dates-full/main/ru/ca-gregorian.json'
import dataRu from './data/dataRu.json'
import dataEn from './data/dataEn.json'
load(likelySubtags, weekData, ruNumbers, ruCaGregorian)
loadMessages(dataRu, "ru-RU")
loadMessages(dataEn, "en-US")

function App() {
	return (
		<Router>
			<>
				<Route exact path="/" component={Form} />
				{/*other routes were here*/}
			</>
		</Router>
	)
}

class Form extends Component {
	locales = [
		{
			language: "ru-RU",
			locale: "ru",
			nextLabel: "English"
		},
		{
			language: "en-US",
			locale: "en",
			nextLabel: "русский"
		}
	]
	constructor(props) {
		super(props)
		this.state = {
			currentLocale: this.locales[1]
		}
	}
	toggleLocaleHandler = () => {
		if(this.state.currentLocale.locale === "ru"){
			this.setState({currentLocale: this.locales[1]},
			localStorage.setItem("currentLocale", JSON.stringify( this.locales[1]))
			)
		}
		if(this.state.currentLocale.locale === "en"){
			this.setState({currentLocale: this.locales[0]},
			localStorage.setItem("currentLocale", JSON.stringify( this.locales[0]))
			)
		}
	}

	componentDidMount() {
		if (localStorage.getItem("currentLocale") !== null) {
			let value = JSON.parse(localStorage.getItem("currentLocale"))
			this.setState({currentLocale: value})
		}
	}
	render(){
		return (
			<LocalizationProvider language={this.state.currentLocale.language}>
				<IntlProvider locale={this.state.currentLocale.locale}>
					<>
					<OnboardingForm
						currentLocale={this.state.currentLocale}
						socialOptions={dataEn.socialOptions}
						toggleLocaleHandler={this.toggleLocaleHandler}
					/>
					<Footer
						footerClass="footer_orange"
					/>
					</>
				</IntlProvider>
			</LocalizationProvider>
		)
	}
}

export default App
