import requests
import json

def test_mood_api():
    url = 'http://127.0.0.1:8000/api/detect/'
    headers = {'Content-Type': 'application/json'}
    data = {'text': 'I am feeling happy today'}
    
    try:
        response = requests.post(url, json=data, headers=headers)
        print(f'Status Code: {response.status_code}')
        print(f'Response: {response.json()}')
    except requests.exceptions.RequestException as e:
        print(f'Error: {e}')

if __name__ == '__main__':
    test_mood_api()