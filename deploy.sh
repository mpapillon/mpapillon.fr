#!/bin/bash
set -e

if [[ ! -f ".env" ]]; then
  echo "Error : missing .env file"
  exit 1
fi
source .env

if [[ -z "$HOST" || -z "$USER" ]]; then
  echo "Error : HOST and USER should be defined in .env"
  exit 1
fi

read -rs -p "Password: " PASS
echo

lftp -u "$USER,$PASS" "sftp://$HOST" << EOF
mirror -R \
  --exclude '\.git/' \
  --exclude-glob '*.sh' \
  --exclude-glob '^\.(?!htaccess)' \
  . www
bye
EOF
