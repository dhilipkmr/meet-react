import React from 'react';
import App from './App';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


const renderApp = () => render(<App />);
const dateToUse = new Date(new Date().setDate(new Date().getDate() + 1));
const year = dateToUse.getFullYear();
let month = dateToUse.getMonth() + 1;
month = month < 10 ? ('0' + month) : month;
let day = dateToUse.getDate();
day = day < 10 ? ('0' + day) : day;


afterEach(() => {
  cleanup()
});

beforeEach(() => {
  const {
    getByText, getByTestId, queryByText, queryByTestId, container, asFragment
  } = renderApp();

  fireEvent.change(document.querySelector('[data-cy="blockSelector"]'), { target: { value: 'Block B' } });
  fireEvent.change(document.querySelector('[data-cy="floorSelector"]'), { target: { value: 'Floor 2' } });
  fireEvent.change(document.querySelector('[data-cy="roomSelector"]'), { target: { value: 'Meeting Room 2' } });

  fireEvent.change(document.querySelector('[data-cy="startDate"]'), { target: { value: year + '-' + month + '-' + day } });
  fireEvent.change(document.querySelector('[data-cy="startTime"]'), { target: { value: '13:00' } });
  fireEvent.change(document.querySelector('[data-cy="endDate"]'), { target: { value: year + '-' + month + '-' + day } });
  fireEvent.change(document.querySelector('[data-cy="endTime"]'), { target: { value: '14:00' } });
})

test('Should add Meeting under All meetings tab', () => {
  fireEvent.click(document.querySelector('[data-cy="scheduleBtn"]'));
  expect(document.querySelector('[data-cy="allMeetingsTab"]')).toHaveClass('activeTab');
  const $heading = document.querySelector('[data-cy="meetingSummary"] [data-cy="ul"] [data-cy="summaryHeading"]');
  expect($heading).toHaveTextContent('Block B');
  expect($heading).toHaveTextContent('Floor 2');
  expect($heading).toHaveTextContent('Meeting Room 2');

  const $startDate = document.querySelector('[data-cy="meetingSummary"] [data-cy="ul"] [data-cy="startSummary"]');
  expect($startDate).toHaveTextContent(year);
  expect($startDate).toHaveTextContent(day);
  // expect($startDate).toHaveTextContent(['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month]);
  expect($startDate).toHaveTextContent('13:00');

  const $endDate = document.querySelector('[data-cy="meetingSummary"] [data-cy="ul"] [data-cy="endSummary"]');
  expect($endDate).toHaveTextContent(year);
  expect($endDate).toHaveTextContent(day);
  // expect($endDate).toHaveTextContent(['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month]);
  expect($endDate).toHaveTextContent('14:00');
});

it('Should reset values after successful addition', () => {
  fireEvent.click(document.querySelector('[data-cy="scheduleBtn"]'));
  expect(document.querySelector('[data-cy="blockSelector"]').value).toBe('Block A');
  expect(document.querySelector('[data-cy="floorSelector"]').value).toBe('Floor 1');
  expect(document.querySelector('[data-cy="roomSelector"]').value).toBe('Meeting Room 1');
  expect(document.querySelector('[data-cy="startTime"]').value).toBe('');
  expect(document.querySelector('[data-cy="endTime"]').value).toBe('');
  expect(document.querySelector('[data-cy="startDate"]').value).toBe('');
  expect(document.querySelector('[data-cy="endDate"]').value).toBe('');
});

test('should add content to All meetings tab in sorted order', () => {
  expect(document.querySelector('[data-cy="allMeetingsTab"]')).toHaveClass('activeTab');

  const futureDateToUse = new Date();
  const yearF = futureDateToUse.getFullYear();
  let monthF = futureDateToUse.getMonth() + 1;
  monthF = monthF < 10 ? ('0' + monthF) : monthF;
  let dayF = futureDateToUse.getDate();
  dayF = dayF < 10 ? ('0' + dayF) : dayF;
  
  fireEvent.click(document.querySelector('[data-cy="scheduleBtn"]'));
  fireEvent.change(document.querySelector('[data-cy="blockSelector"]'), { target: { value: 'Block B' } });
  fireEvent.change(document.querySelector('[data-cy="floorSelector"]'), { target: { value: 'Floor 2' } });
  fireEvent.change(document.querySelector('[data-cy="roomSelector"]'), { target: { value: 'Meeting Room 2' } });
  fireEvent.change(document.querySelector('[data-cy="startDate"]'), { target: { value: yearF + '-' + monthF + '-' + dayF } });
  fireEvent.change(document.querySelector('[data-cy="startTime"]'), { target: { value: '23:58' } });
  fireEvent.change(document.querySelector('[data-cy="endDate"]'), { target: { value: yearF + '-' + monthF + '-' + dayF } });
  fireEvent.change(document.querySelector('[data-cy="endTime"]'), { target: { value: '23:59' } });
  fireEvent.click(document.querySelector('[data-cy="scheduleBtn"]'));


  const $headings = document.querySelectorAll('[data-cy="meetingSummary"] [data-cy="ul"] [data-cy="summaryHeading"]');
  expect($headings[0]).toHaveTextContent('Block B');
  expect($headings[1]).toHaveTextContent('Block B');
  expect($headings[0]).toHaveTextContent('Floor 2');
  expect($headings[1]).toHaveTextContent('Floor 2');
  expect($headings[0]).toHaveTextContent('Meeting Room 2');
  expect($headings[1]).toHaveTextContent('Meeting Room 2');

  const $startDates = document.querySelectorAll('[data-cy="meetingSummary"] [data-cy="ul"] [data-cy="startSummary"]');
  expect($startDates[0]).toHaveTextContent(yearF);
  expect($startDates[0]).toHaveTextContent(dayF);
  // expect($startDates[0].toLowerCase()).toHaveTextContent(['', 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'aug', 'sep', 'oct', 'nov', 'dec'][date.getMonth()]);
  expect($startDates[0]).toHaveTextContent('23:58');

  expect($startDates[1]).toHaveTextContent(year);
  expect($startDates[1]).toHaveTextContent(day);
  // expect($startDates[1].toLowerCase()).toHaveTextContent(['', 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'aug', 'sep', 'oct', 'nov', 'dec'][date.getMonth()]);
  expect($startDates[1]).toHaveTextContent('13:00');
  
  const $endDates = document.querySelectorAll('[data-cy="meetingSummary"] [data-cy="ul"] [data-cy="endSummary"]');
  expect($endDates[0]).toHaveTextContent(yearF);
  expect($endDates[0]).toHaveTextContent(dayF);
  // expect($endDates[0].toLowerCase()).toHaveTextContent(['', 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'aug', 'sep', 'oct', 'nov', 'dec'][date.getMonth()]);
  expect($endDates[0]).toHaveTextContent('23:59');

  expect($endDates[1]).toHaveTextContent(year);
  expect($endDates[1]).toHaveTextContent(day);
  // expect($endDates[1].toLowerCase()).toHaveTextContent(['', 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'aug', 'sep', 'oct', 'nov', 'dec'][date.getMonth()]);
  expect($endDates[1]).toHaveTextContent('14:00');
});

it('should show error message while trying to book pre-booked room and should not add a card', () => {
  fireEvent.click(document.querySelector('[data-cy="scheduleBtn"]'));
  fireEvent.change(document.querySelector('[data-cy="blockSelector"]'), { target: { value: 'Block B' } });
  fireEvent.change(document.querySelector('[data-cy="floorSelector"]'), { target: { value: 'Floor 2' } });
  fireEvent.change(document.querySelector('[data-cy="roomSelector"]'), { target: { value: 'Meeting Room 2' } });
  fireEvent.change(document.querySelector('[data-cy="startDate"]'), { target: { value: year + '-' + month + '-' + day } });
  fireEvent.change(document.querySelector('[data-cy="startTime"]'), { target: { value: '13:00' } });
  fireEvent.change(document.querySelector('[data-cy="endDate"]'), { target: { value: year + '-' + month + '-' + day } });
  fireEvent.change(document.querySelector('[data-cy="endTime"]'), { target: { value: '14:00' } });
  fireEvent.click(document.querySelector('[data-cy="scheduleBtn"]'));

  expect(document.querySelectorAll('[data-cy="meetingSummary"] [data-cy="ul"] [data-cy="summaryHeading"]').length).toBe(1);
  expect(document.querySelectorAll('[data-cy="meetingSummary"] [data-cy="ul"] [data-cy="startSummary"]').length).toBe(1);
  expect(document.querySelectorAll('[data-cy="meetingSummary"] [data-cy="ul"] [data-cy="endSummary"]').length).toBe(1);

  expect(document.querySelector('[data-cy="error"]')).toHaveTextContent('Invalid Input');
});

test('should show error message while trying to book in past', () => {
  const pastDateToUse = new Date(new Date().setDate(new Date().getDate() - 1));
  const yearP = pastDateToUse.getFullYear();
  let monthP = pastDateToUse.getMonth() + 1;
  monthP = monthP < 10 ? ('0' + monthP) : monthP;
  let dayP = pastDateToUse.getDate();
  dayP = dayP < 10 ? ('0' + dayP) : dayP;

  fireEvent.change(document.querySelector('[data-cy="blockSelector"]'), { target: { value: 'Block B' } });
  fireEvent.change(document.querySelector('[data-cy="floorSelector"]'), { target: { value: 'Floor 2' } });
  fireEvent.change(document.querySelector('[data-cy="roomSelector"]'), { target: { value: 'Meeting Room 2' } });

  fireEvent.change(document.querySelector('[data-cy="startDate"]'), { target: { value: yearP + '-' + monthP + '-' + dayP } });
  fireEvent.change(document.querySelector('[data-cy="startTime"]'), { target: { value: '13:00' } });
  fireEvent.change(document.querySelector('[data-cy="endDate"]'), { target: { value: yearP + '-' + monthP + '-' + dayP } });
  fireEvent.change(document.querySelector('[data-cy="endTime"]'), { target: { value: '14:00' } });
  fireEvent.click(document.querySelector('[data-cy="scheduleBtn"]'));

  expect(document.querySelectorAll('[data-cy="meetingSummary"] [data-cy="ul"] [data-cy="summaryHeading"]').length).toBe(0);
  expect(document.querySelectorAll('[data-cy="meetingSummary"] [data-cy="ul"] [data-cy="startSummary"]').length).toBe(0);
  expect(document.querySelectorAll('[data-cy="meetingSummary"] [data-cy="ul"] [data-cy="endSummary"]').length).toBe(0);

  expect(document.querySelector('[data-cy="error"]')).toHaveTextContent('Invalid Input');
});

it('should show only today\'s meeting in Today\'s Meeting Tab', () => {
  fireEvent.click(document.querySelector('[data-cy="scheduleBtn"]'));
  fireEvent.click(document.querySelector('[data-cy="todayMeetingsTab"]'));
  expect(document.querySelector('[data-cy="todayMeetingsTab"]')).toHaveClass('activeTab');

  const CurrdateToUse = new Date();
  const yearC = CurrdateToUse.getFullYear();
  let monthC = CurrdateToUse.getMonth() + 1;
  monthC = monthC < 10 ? ('0' + monthC) : monthC;
  let dayC = CurrdateToUse.getDate();
  dayC = dayC < 10 ? ('0' + dayC) : dayC;


  fireEvent.change(document.querySelector('[data-cy="blockSelector"]'), { target: { value: 'Block B' } });
  fireEvent.change(document.querySelector('[data-cy="floorSelector"]'), { target: { value: 'Floor 2' } });
  fireEvent.change(document.querySelector('[data-cy="roomSelector"]'), { target: { value: 'Meeting Room 2' } });
  fireEvent.change(document.querySelector('[data-cy="startDate"]'), { target: { value: yearC + '-' + monthC + '-' + dayC } });
  fireEvent.change(document.querySelector('[data-cy="startTime"]'), { target: { value: '23:58' } });
  fireEvent.change(document.querySelector('[data-cy="endDate"]'), { target: { value: yearC + '-' + monthC + '-' + dayC } });
  fireEvent.change(document.querySelector('[data-cy="endTime"]'), { target: { value: '23:59' } });
  fireEvent.click(document.querySelector('[data-cy="scheduleBtn"]'));

  const $headings = document.querySelectorAll('[data-cy="meetingSummary"] [data-cy="ul"] [data-cy="summaryHeading"]');
  expect($headings[0]).toHaveTextContent('Block B');
  expect($headings[0]).toHaveTextContent('Floor 2');
  expect($headings[0]).toHaveTextContent('Meeting Room 2');

  const $startDates = document.querySelectorAll('[data-cy="meetingSummary"] [data-cy="ul"] [data-cy="startSummary"]');
  expect($startDates[0]).toHaveTextContent(yearC);
  expect($startDates[0]).toHaveTextContent(dayC);
  // expect($startDates[0].toLowerCase()).toHaveTextContent(['', 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'aug', 'sep', 'oct', 'nov', 'dec'][date.getMonth()]);
  expect($startDates[0]).toHaveTextContent('23:58');

  const $endDates = document.querySelectorAll('[data-cy="meetingSummary"] [data-cy="ul"] [data-cy="endSummary"]');
  expect($endDates[0]).toHaveTextContent(yearC);
  expect($endDates[0]).toHaveTextContent(dayC);
  // expect($endDates[0].toLowerCase()).toHaveTextContent(['', 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'aug', 'sep', 'oct', 'nov', 'dec'][date.getMonth()]);
  expect($endDates[0]).toHaveTextContent('23:59');
});

test('should add content to All meetings tab in sorted order', () => {
  fireEvent.click(document.querySelector('[data-cy="scheduleBtn"]'));
  fireEvent.click(document.querySelector('[data-cy="todayMeetingsTab"]'));
  
  const CurrdateToUse = new Date();
  const yearC = CurrdateToUse.getFullYear();
  let monthC = CurrdateToUse.getMonth() + 1;
  monthC = monthC < 10 ? ('0' + monthC) : monthC;
  let dayC = CurrdateToUse.getDate();
  dayC = dayC < 10 ? ('0' + dayC) : dayC;

  fireEvent.change(document.querySelector('[data-cy="blockSelector"]'), { target: { value: 'Block B' } });
  fireEvent.change(document.querySelector('[data-cy="floorSelector"]'), { target: { value: 'Floor 2' } });
  fireEvent.change(document.querySelector('[data-cy="roomSelector"]'), { target: { value: 'Meeting Room 2' } });
  fireEvent.change(document.querySelector('[data-cy="startDate"]'), { target: { value: yearC + '-' + monthC + '-' + dayC } });
  fireEvent.change(document.querySelector('[data-cy="startTime"]'), { target: { value: '23:58' } });
  fireEvent.change(document.querySelector('[data-cy="endDate"]'), { target: { value: yearC + '-' + monthC + '-' + dayC } });
  fireEvent.change(document.querySelector('[data-cy="endTime"]'), { target: { value: '23:59' } });
  fireEvent.click(document.querySelector('[data-cy="scheduleBtn"]'));

  fireEvent.change(document.querySelector('[data-cy="blockSelector"]'), { target: { value: 'Block B' } });
  fireEvent.change(document.querySelector('[data-cy="floorSelector"]'), { target: { value: 'Floor 2' } });
  fireEvent.change(document.querySelector('[data-cy="roomSelector"]'), { target: { value: 'Meeting Room 2' } });
  fireEvent.change(document.querySelector('[data-cy="startDate"]'), { target: { value: yearC + '-' + monthC + '-' + dayC } });
  fireEvent.change(document.querySelector('[data-cy="startTime"]'), { target: { value: '23:56' } });
  fireEvent.change(document.querySelector('[data-cy="endDate"]'), { target: { value: yearC + '-' + monthC + '-' + dayC } });
  fireEvent.change(document.querySelector('[data-cy="endTime"]'), { target: { value: '23:57' } });
  fireEvent.click(document.querySelector('[data-cy="scheduleBtn"]'));

  const $headings = document.querySelectorAll('[data-cy="meetingSummary"] [data-cy="ul"] [data-cy="summaryHeading"]');
  expect($headings[0]).toHaveTextContent('Block B');
  expect($headings[1]).toHaveTextContent('Block B');
  expect($headings[0]).toHaveTextContent('Floor 2');
  expect($headings[1]).toHaveTextContent('Floor 2');
  expect($headings[0]).toHaveTextContent('Meeting Room 2');
  expect($headings[1]).toHaveTextContent('Meeting Room 2');

  const $startDates = document.querySelectorAll('[data-cy="meetingSummary"] [data-cy="ul"] [data-cy="startSummary"]');
  expect($startDates[0]).toHaveTextContent(yearC);
  expect($startDates[0]).toHaveTextContent(dayC);
  // expect($startDates[0].toLowerCase()).toHaveTextContent(['', 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'aug', 'sep', 'oct', 'nov', 'dec'][date.getMonth()]);
  expect($startDates[0]).toHaveTextContent('23:56');

  expect($startDates[1]).toHaveTextContent(yearC);
  expect($startDates[1]).toHaveTextContent(dayC);
  // expect($startDates[1].toLowerCase()).toHaveTextContent(['', 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'aug', 'sep', 'oct', 'nov', 'dec'][date.getMonth()]);
  expect($startDates[1]).toHaveTextContent('23:58');
  
  const $endDates = document.querySelectorAll('[data-cy="meetingSummary"] [data-cy="ul"] [data-cy="endSummary"]');
  expect($endDates[0]).toHaveTextContent(yearC);
  expect($endDates[0]).toHaveTextContent(dayC);
  // expect($endDates[0].toLowerCase()).toHaveTextContent(['', 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'aug', 'sep', 'oct', 'nov', 'dec'][date.getMonth()]);
  expect($endDates[0]).toHaveTextContent('23:57');

  expect($endDates[1]).toHaveTextContent(yearC);
  expect($endDates[1]).toHaveTextContent(dayC);
  // expect($endDates[1].toLowerCase()).toHaveTextContent(['', 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'aug', 'sep', 'oct', 'nov', 'dec'][date.getMonth()]);
  expect($endDates[1]).toHaveTextContent('23:59');
});
