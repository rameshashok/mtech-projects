import requests
import time
import schedule

BACKEND_URL = "https://domain-llm-assistant-assignment-backend.onrender.com"

def ping_backend():
    try:
        response = requests.get(BACKEND_URL, timeout=30)
        if response.status_code == 200:
            print(f"✓ Backend is alive: {response.json()}")
        else:
            print(f"✗ Backend returned status: {response.status_code}")
    except Exception as e:
        print(f"✗ Error pinging backend: {e}")

# Ping every 10 minutes
schedule.every(10).minutes.do(ping_backend)

print("Keep-alive service started. Pinging backend every 10 minutes...")
ping_backend()  # Initial ping

while True:
    schedule.run_pending()
    time.sleep(60)
