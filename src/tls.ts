// Demo for FirstFix's source checks: insecure TLS settings. Never run or imported.
import https from 'node:https';

// FF-TLS-001 (high): turns off certificate verification for every connection the process makes.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// FF-TLS-002 (medium): one client that accepts any certificate.
export const insecureAgent = new https.Agent({ keepAlive: true, rejectUnauthorized: false });

// Not flagged: a comment or a string that only mentions the setting.
// rejectUnauthorized: false
export const warning = 'Never set rejectUnauthorized: false outside local development.';
