import React from 'react'
import { render } from 'react-dom'
import moment from 'moment'

import BigCalendar from 'react-big-calendar'
BigCalendar.momentLocalizer(moment)

import { getEvents } from './gcal'

require('style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css')

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      events: []
    }
  }

  componentDidMount () {
    getEvents((events) => {
      this.setState({events})
    })
  }

  render () {
    return (
      <BigCalendar
        style={{height: '420px'}}
        events={this.state.events}
      />
    )
  }
}

render(<App />, document.getElementById('root'))
