import React from 'react';
import MeetingSummary from './MeetingSummary';
import SchedulerBox from './SchedulerBox';

class MeetingScheduler extends React.Component {
  render() {
    return (
      <div className="textCenter">
        <SchedulerBox />
        <MeetingSummary/>
      </div>
    );
  }
}
export default MeetingScheduler;
