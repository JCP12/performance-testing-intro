# Intro into performance testing

## K6
To install k6 (windows):
`winget k6`

To run k6 tests:
Navigate to k6-tests and in powershell execute the command
`k6 run "name-of-test.js"`

## Locust
To install locust (requires python/pip installed):
`pip install locust`

To run locust tests:
In powershell execute the command
`locust -f "name-of-test.py"`
Then open browser at http://localhost:8089 to start the test

## Artillery
To install artillery (requires npm installed):
`npm install -g artillery@latest`

To run artillery tests:
Navigate to artillery-tests and in powershell execute the command
`artillery run "name-of-test.yml"`
