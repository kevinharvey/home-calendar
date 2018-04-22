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
      events: [],
      viewDate: new Date()
    }
  }

  updateEvents (currentDate) {
    getEvents(currentDate, (events) => {
      this.setState({events})
    })
  }

  componentDidMount () {
    this.updateEvents(this.state.viewDate)
  }

  render () {
    return (
      <BigCalendar
        defaultDate={this.state.viewDate}
        events={this.state.events}
        views={['month']}
        style={{height: '420px'}}
        onNavigate={(currentDate, viewName, actionName) => {this.updateEvents(currentDate)}}
      />
    )
  }
}

render(<App />, document.getElementById('root'))
