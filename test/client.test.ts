// Demo for FirstFix's source checks: a test-only shortcut. Still reported, labelled "test file". Never run.
import https from 'node:https';

export function testAgent(): https.Agent {
  return new https.Agent({ rejectUnauthorized: false });
}
