import React from 'react';

class SchedulerBox extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="margin20 textCenter fs20">Meeting Scheduler</div>
        <div className="textCenter inputContent">
          <div className="txtLeft marginTB40 fb">
            <label className="" htmlFor="buildingName">Block Name: </label>
            <select data-cy="blockSelector" defaultValue="Block A">
              <option value="Block A">Block A</option>
              <option value="Block B">Block B</option>
              <option value="Block C">Block C</option>
            </select>
            <label className="padL10" htmlFor="floorNumber">Floor No:</label>
            <select data-cy="floorSelector" defaultValue="Floor 1">
              <option value="Floor 1">Floor 1</option>
              <option value="Floor 2">Floor 2</option>
              <option value="Floor 3">Floor 3</option>
            </select>
            <label className="padL10" htmlFor="meetingRoomName">Meeting Room No:</label>
            <select data-cy="roomSelector" defaultValue="Meeting Room 1">
              <option value="Meeting Room 1">Room 1</option>
              <option value="Meeting Room 2">Room 2</option>
              <option value="Meeting Room 3">Room 3</option>
            </select>
          </div>
          <div className="txtLeft">
            <div className="marginTB40 fb">Meeting Start at :
              <input type="date" data-cy="startDate" />
              <input type="time" data-cy="startTime" />
            </div>
            <div className="marginTB40 fb">Meeting Ends at :
              <input type="date" data-cy="endDate" />
              <input type="time" data-cy="endTime" />
            </div>
          </div>
          <div data-cy="error" className="error padB10">Error Message</div>
          <button data-cy="scheduleBtn" type="button" className="marginB20 btn">Schedule Meeting</button>
        </div>
      </React.Fragment>
    );
  }
}

export default SchedulerBox;
