#!/bin/bash
set -e

mkdir -p maestro/debug && maestro test maestro/main.yml --flatten-debug-output --debug-output maestro/debug