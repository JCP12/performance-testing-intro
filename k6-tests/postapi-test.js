import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';

// Load the url and payload from services and payloads files
const config = JSON.parse(open('./services/services.json'));
const payload = JSON.parse(open('./payloads/timetableChangeRequest.json'));

const baseUrl = config.PostUrl;

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
  const url = `${baseUrl}/TimetableChangeRequest`;

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, JSON.stringify(payload), params);

  responseTimeTrend.add(res.timings.duration); // Record response time

  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1);
}
