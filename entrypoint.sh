#!/bin/sh

# Replace placeholders in env.template.js with actual environment variables
envsubst < /usr/share/nginx/html/env.template.js > /usr/share/nginx/html/env.js

cat /usr/share/nginx/html/env.js

# Start Nginx
exec "$@"