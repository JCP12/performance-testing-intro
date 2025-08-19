from locust import HttpUser, task, between

class APITestUser(HttpUser):
    wait_time = between(1, 3)  # Simulates user think time

    host = "https://tutserv-dev-uks-app-002.azurewebsites.net"

    @task
    def post_timetable_change(self):
        payload = {
            "timetableEventType": 0,
            "facultyName": "string",
            "moduleNumber": "string",
            "presentationPeriod": "string",
            "tutorialName": "string",
            "tutorialType": 0,
            "clusterOrTutorialGroupId": "string",
            "previousTutorialDate": "2025-08-14T09:20:56.254Z",
            "previousStartTime": "2025-08-14T09:20:56.254Z",
            "tutorialDate": "2025-08-14T09:20:56.254Z",
            "startTime": "2025-08-14T09:20:56.254Z",
            "endTime": "2025-08-14T09:20:56.254Z",
            "assignedTutors": ["string"],
            "maximumStudentAttendence": 0
        }

        headers = {'Content-Type': 'application/json'}
        self.client.put("/RequestTimetableChange", json=payload, headers=headers)

