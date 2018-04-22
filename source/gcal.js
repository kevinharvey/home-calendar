import request from 'superagent'

let api_url = ''

export function getEvents (date, callback) {
  var y = date.getFullYear(), m = date.getMonth()
  var start = new Date(y, m, -6).toISOString()
  var end = new Date(y, m + 1, 7).toISOString()
  var query_url = `${api_url}?start=${start}&end=${end}`

  request
    .get(query_url)
    .end((err, resp) => {
      if (!err) {
        const events = []
        JSON.parse(resp.text).items.map((event) => {
          events.push({
            start: event.start.date || event.start.dateTime,
            end: event.end.date || event.end.dateTime,
            title: event.summary,
          })
        })
        callback(events)
      }
    })
}
