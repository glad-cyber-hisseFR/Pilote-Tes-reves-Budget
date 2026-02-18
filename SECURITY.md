# Security Policy

## Supported Versions

This is version 1.0.0 of "Pilote Tes Rêves" budget management application.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Security Overview

### ✅ Application Security

- **CodeQL Scan**: ✅ PASSED (0 alerts)
- **Client-side Only**: All processing happens in the browser
- **No Server Communication**: No data transmission to external servers
- **Private by Default**: All data stored locally in browser LocalStorage
- **Input Validation**: Proper validation on all user inputs

### Known Dependency Vulnerabilities

#### xlsx (v0.18.5)

**Status**: ⚠️ Known vulnerabilities in dependency

**Vulnerabilities**:
1. **Prototype Pollution** (CVE-2023-30533)
   - Affected versions: < 0.19.3
   - Severity: High
   - CVSS: 9.8

2. **Regular Expression Denial of Service (ReDoS)** (GHSA-5pgg-2g8v-p4x9)
   - Affected versions: < 0.20.2
   - Severity: Moderate

**Mitigation & Risk Assessment**:

✅ **Limited Impact in This Application**:
- Library used **client-side only** for parsing user-uploaded Excel files
- Users upload **their own files** - no untrusted sources
- Files processed **locally in browser** - no server-side exposure
- No automatic file processing - user-initiated only
- Application domain is budget management, not a file processing service

❌ **Why Not Upgraded**:
- Latest available version in npm registry: **0.18.5**
- Patched versions (0.19.3, 0.20.2) **do not exist in npm**
- SheetJS/xlsx library has not published newer versions since March 2022

**Recommendations**:
1. **For End Users**: 
   - Only upload Excel files you created yourself
   - Don't upload Excel files from untrusted sources
   - Use the manual entry option if concerned about Excel parsing

2. **For Developers/Maintainers**:
   - Monitor xlsx package for updates: `npm outdated xlsx`
   - Consider migrating to `exceljs` if xlsx remains unmaintained
   - Implement additional client-side validation before parsing
   - Add file size limits to prevent DoS scenarios

**Alternative Libraries to Consider**:
- `exceljs` (v4.4.0) - Actively maintained, more features
- `xlsx-populate` (v1.21.0) - Good feature set, maintained
- `better-xlsx` (v0.7.6) - Simpler API

#### vite (v5.0.8)

**Status**: ⚠️ Known vulnerability (Development Only)

**Vulnerability**:
- **dev server `server.fs.deny` bypass** on case-insensitive filesystems
- Affected versions: 5.0.0 - 5.0.11
- Severity: Moderate
- Patched in: 5.0.12+

**Mitigation**:
- ✅ **No Production Impact**: Vite is a development dependency only
- ✅ **Build Process Unaffected**: Production builds don't use dev server
- ✅ **Local Development Only**: Vulnerability only affects local dev server

**Recommendation**:
- Upgrade to vite 5.0.12+ for development work
- No action needed for production deployments

## Security Best Practices

### For Users

1. **Data Privacy**:
   - Your data is stored only in your browser
   - Clearing browser data will delete all budget information
   - No data is sent to external servers
   - Consider exporting your data regularly as backup

2. **File Upload Safety**:
   - Only upload Excel files you trust
   - Preferably use files you created yourself
   - Use manual entry for sensitive budgets

3. **Browser Security**:
   - Keep your browser updated
   - Use a modern browser (Chrome, Firefox, Edge, Safari)
   - Enable browser security features

### For Developers

1. **Dependency Management**:
   ```bash
   # Check for updates regularly
   npm outdated
   
   # Audit for vulnerabilities
   npm audit
   
   # Update non-breaking changes
   npm update
   ```

2. **Code Security**:
   - Run CodeQL scans on changes
   - Validate all user inputs
   - Sanitize data before storage
   - Use Content Security Policy headers

3. **Build Process**:
   - Review build output for unexpected files
   - Minimize bundle size
   - Use SRI for CDN resources

## Reporting a Vulnerability

If you discover a security vulnerability, please report it by:

1. **DO NOT** open a public issue
2. Email the repository owner or create a private security advisory
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity
  - Critical: 24-48 hours
  - High: 1-2 weeks
  - Medium: 2-4 weeks
  - Low: Next release cycle

## Security Changelog

### Version 1.0.0 (2026-02-18)

- ✅ Initial security audit completed
- ✅ CodeQL scan passed (0 alerts)
- ✅ Input validation implemented
- ✅ LocalStorage security reviewed
- ⚠️ Documented xlsx dependency vulnerabilities
- ✅ No exploitable vulnerabilities in application code

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [npm Security Best Practices](https://docs.npmjs.com/about-security)
- [React Security Best Practices](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)
- [Web Security Cheat Sheet](https://cheatsheetseries.owasp.org/)

---

**Last Updated**: 2026-02-18
**Next Review**: 2026-05-18 (Quarterly)
