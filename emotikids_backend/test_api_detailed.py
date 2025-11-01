import sys
import requests
import json
from datetime import datetime

def log_message(msg):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{timestamp}] {msg}")

def test_api_connection():
    base_url = 'http://127.0.0.1:8000'
    endpoints = [
        ('GET', '/'),
        ('POST', '/api/detect/'),
    ]
    
    for method, endpoint in endpoints:
        url = base_url + endpoint
        log_message(f"Testing {method} {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, timeout=5)
            else:
                headers = {'Content-Type': 'application/json'}
                data = {'text': 'I am feeling happy today'}
                response = requests.post(url, json=data, headers=headers, timeout=5)
            
            log_message(f"Status Code: {response.status_code}")
            log_message(f"Response Headers: {dict(response.headers)}")
            log_message(f"Response Body: {response.text}")
            
        except requests.exceptions.ConnectionError as e:
            log_message(f"Connection Error: {e}")
        except requests.exceptions.Timeout as e:
            log_message(f"Timeout Error: {e}")
        except Exception as e:
            log_message(f"Unexpected Error: {e}")
        
        log_message("-" * 50)

if __name__ == '__main__':
    log_message("Starting API Tests")
    test_api_connection()
    log_message("Finished API Tests")