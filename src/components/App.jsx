import React from 'react'
// import mixpanel from 'mixpanel-browser'
// import MixpanelProvider from 'react-mixpanel'

import PrimaryAppBar from './PrimaryAppBar'
import Report from './Report/'
import Page from './Page/'
import Promo from './Promo/'
import Footer from './Footer/'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import META from '../data/meta'
import * as CONTENT from '../content/text'

import '../styles/App.css'

const App = () => {
  // mixpanel.init('cd074c278f7867740ac8cf157c98436f')

  return (
    <MuiThemeProvider>
      {/* <MixpanelProvider mixpanel={mixpanel}> */}
        <div className="App">
          <PrimaryAppBar style={{ backgroundColor: META.colors.primary }} />
          <Report />
          <Page
            headline={CONTENT.headline}
            subhead={CONTENT.subhead}
            source={CONTENT.source}
            disclaimer={CONTENT.disclaimer}
          />
          <Promo
            callToAction={CONTENT.callToAction}
            ctaButtonText={CONTENT.ctaButtonText}
          />
          <Footer
            copyright={CONTENT.copyright}
            overview={CONTENT.overview}
            quoteText={CONTENT.quote.text}
            quoteCite={CONTENT.quote.cite}
          />
        </div>
      {/* </MixpanelProvider> */}
    </MuiThemeProvider>
  )
}

export default App
