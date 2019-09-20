import React from 'react';
class MeetingSummary extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div id="tabs" className="tabs marginT20">
          <span data-cy="allMeetingsTab" className="padL10 d-inbl tab cursorPtr activeTab">All Meetings</span>
          <span data-cy="todayMeetingsTab" className="padL10 d-inbl tab cursorPtr">Today's Meetings</span>
          <div id="meetingSummary" data-cy="meetingSummary" className="meetingSummary">
            <ul className="card d-inbl" data-cy="ul">
              <li className="fb" data-cy="summaryHeading">{'Block A' + ' - ' + 'Floor 2' + ' - ' + 'Meeting Room 1'}</li>
              <li className="padT10" data-cy="startSummary">
                <span className="fb">Starts at:</span>
                <span>{new Date().toDateString() + ', '}</span>
                <span>16:00</span>
              </li>
              <li className="padT10" data-cy="endSummary">
                <span className="fb">Ends at:</span>
                <span>{new Date().toDateString() + ', '}</span>
                <span>18:00</span>
              </li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MeetingSummary;
