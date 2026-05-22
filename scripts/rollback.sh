#!/bin/bash
# Rollback script
# Usage: ./scripts/rollback.sh <stable-tag>

set -e

STABLE_TAG="${1:-latest}"

echo "Rolling back to: $STABLE_TAG"

# Rollback server
docker tag ghcr.io/vuco19725-jpg/cicd--server:$STABLE_TAG ghcr.io/vuco19725-jpg/cicd--server:stable 2>/dev/null || true
docker compose up -d --remove-orphans

# Stop canary if running
docker compose -f docker-compose.canary.yml stop 2>/dev/null || true

echo "Rollback complete."
docker compose ps
