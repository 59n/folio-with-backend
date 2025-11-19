#!/usr/bin/env node

const { spawn } = require('node:child_process');
const { resolve } = require('node:path');

require('./patch-next-build.js');

const root = resolve(__dirname, '..');

const services = [
  {
    name: 'api',
    command: 'npm',
    args: ['run', 'dev', '--prefix', 'backend']
  },
  {
    name: 'web',
    command: 'npm',
    args: ['run', 'dev', '--prefix', 'frontend']
  }
];

const children = [];

function startService(service) {
  const child = spawn(service.command, service.args, {
    cwd: root,
    env: process.env,
    stdio: 'inherit'
  });

  child.on('exit', (code) => {
    shutdown(code ?? 0);
  });

  children.push(child);
}

function shutdown(code = 0) {
  children.forEach((child) => {
    if (child && !child.killed) {
      child.kill('SIGINT');
    }
  });
  process.exit(code);
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

services.forEach(startService);

setTimeout(() => {
  console.log('\n────────────────────────────');
  console.log('Backend API:     http://localhost:4000');
  console.log('Frontend app:    http://localhost:3000');
  console.log('Admin dashboard: http://localhost:3000/admin');
  console.log('────────────────────────────\n');
}, 2000);

