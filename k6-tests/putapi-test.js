import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';

let responseTimeTrend = new Trend('response_time');


export let options = {
    stages: [
        { duration: '30s', target: 10 }, // Ramp-up to 10 VUs
        { duration: '1m', target: 10 },  // Stay at 10 VUs for 1 minute
        { duration: '10s', target: 0 },  // Ramp-down to 0 VUs
    ],
    thresholds: {
        'response_time': [
          'avg < 500',     // Average response time
          'p(95) < 800',   // 95th percentile
          'p(99) < 100',   // 99th percentile
        ],
      },
};


export default function () {
  const url = 'https://tutserv-dev-uks-app-002.azurewebsites.net/RequestTimetableChange'; 

  const payload = JSON.stringify({
    timetableEventType: 0,
    facultyName: "string",
    moduleNumber: "string",
    presentationPeriod: "string",
    tutorialName: "string",
    tutorialType: 0,
    clusterOrTutorialGroupId: "string",
    previousTutorialDate: "2025-08-14T09:01:50.167Z",
    previousStartTime: "2025-08-14T09:01:50.167Z",
    tutorialDate: "2025-08-14T09:01:50.167Z",
    startTime: "2025-08-14T09:01:50.167Z",
    endTime: "2025-08-14T09:01:50.167Z",
    assignedTutors: ["string"],
    maximumStudentAttendence: 0
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  responseTimeTrend.add(res.timings.duration); // Record response time

  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1);
}
