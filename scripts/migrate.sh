#!/bin/bash
# Database migration script
# Usage: ./scripts/migrate.sh [direction: up|down]

set -e

DIRECTION="${1:-up}"

echo "Running migration: $DIRECTION"

case "$DIRECTION" in
  up)
    echo "Applying forward migrations..."
    # Add your migration command here, e.g.:
    # npx knex migrate:latest
    # or: mysql -h $DB_HOST -u $DB_USER -p$DB_PASS $DB_NAME < migrations/001.sql
    ;;
  down)
    echo "Rolling back migrations..."
    # Add your rollback command here, e.g.:
    # npx knex migrate:rollback
    ;;
  *)
    echo "Unknown direction: $DIRECTION. Use 'up' or 'down'."
    exit 1
    ;;
esac

echo "Migration complete."
