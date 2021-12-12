import React from 'react'
import { endOfToday, set } from 'date-fns'
import TimeRange from 'react-timeline-range-slider'

const now = new Date()
const getTodayAtSpecificHour = (hour = 12) =>
    set(now, { hours: hour, minutes: 0, seconds: 0, milliseconds: 0 })

const selectedStart = getTodayAtSpecificHour()
const selectedEnd = getTodayAtSpecificHour(14)

const startTime = getTodayAtSpecificHour(1)
const endTime = endOfToday()



export default class TimeSlider extends React.Component {
    state = {
        error: false,
        selectedInterval: [selectedStart, selectedEnd],
    }

    errorHandler = ({ error }) => this.setState({ error })

    onChangeCallback = selectedInterval => this.setState({ selectedInterval })

    render() {
        const { selectedInterval, error } = this.state
        return (
            <TimeRange
                error={error}
                ticksNumber={36}
                selectedInterval={selectedInterval}
                timelineInterval={[startTime, endTime]}
                onUpdateCallback={this.errorHandler}
                onChangeCallback={this.onChangeCallback}
            />
        )
    }
}