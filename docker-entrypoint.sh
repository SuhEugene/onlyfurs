#!/usr/bin/env bash

set -e

echo "Migrating database..."
pnpm db:migrate

echo "Starting server..."
node .output/server/index.mjs
