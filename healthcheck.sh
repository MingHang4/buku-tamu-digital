#!/bin/bash
set -e
response=$(curl -s -o /dev/null -w '%{http_code}' http://localhost:4000/health)
if [ "$response" = "200" ]; then
  exit 0
fi
exit 1
