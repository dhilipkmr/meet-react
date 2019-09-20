import React from 'react';
import MeetingSummary from './MeetingSummary';
import SchedulerBox from './SchedulerBox';

class MeetingScheduler extends React.Component {
  constructor(props) {
    super(props);
    this.meetingsList = [];
    this.state = {
      meetingsList: this.meetingsList
    }
  }

  updateMeetingsList = (mewMeeting) => {
    let updatedMeetingsList = [...this.state.meetingsList, mewMeeting];
    updatedMeetingsList = updatedMeetingsList.sort((a, b) => a.startMicro - b.startMicro);
    this.setState({
      meetingsList: updatedMeetingsList
    })
  }

  render() {
    const {meetingsList = []} = this.state;
    return (
      <div className="textCenter">
        <SchedulerBox addNewMeeting={this.updateMeetingsList} meetingsList={meetingsList}/>
        <MeetingSummary meetingsList={meetingsList}/>
      </div>
    );
  }
}
export default MeetingScheduler;