# Keep-Alive Service

This script prevents Render's free tier from spinning down your backend by pinging it every 10 minutes.

## Setup

1. Install dependencies:
```bash
pip install -r keep_alive_requirements.txt
```

2. Run the script:
```bash
python keep_alive.py
```

## Alternative: Use a Free Cron Service

Instead of running this locally, you can use a free cron service:

### Option 1: Cron-Job.org
1. Go to https://cron-job.org
2. Create a free account
3. Add a new cron job:
   - URL: `https://domain-llm-assistant-assignment-backend.onrender.com`
   - Schedule: Every 10 minutes
   - Method: GET

### Option 2: UptimeRobot
1. Go to https://uptimerobot.com
2. Create a free account
3. Add a new monitor:
   - Monitor Type: HTTP(s)
   - URL: `https://domain-llm-assistant-assignment-backend.onrender.com`
   - Monitoring Interval: 5 minutes (free tier)

### Option 3: Render Cron Job (Paid)
Deploy this as a separate cron job service on Render (requires paid plan).

## Note

Render's free tier has a 750 hour/month limit. Keep-alive services will use up these hours faster. Consider upgrading to a paid plan for production use.
