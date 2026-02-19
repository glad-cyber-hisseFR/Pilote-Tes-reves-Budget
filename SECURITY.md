# Security Policy

## Supported Versions

This is version 1.0.0 of "Pilote Tes Rêves" budget management application.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Security Overview

### ✅ Application Security

- **CodeQL Scan**: ✅ PASSED (0 alerts)
- **Production Dependencies**: ✅ NO VULNERABILITIES
- **Excel Library**: ✅ Using secure `exceljs` v4.4.0
- **Client-side Only**: All processing happens in the browser
- **No Server Communication**: No data transmission to external servers
- **Private by Default**: All data stored locally in browser LocalStorage
- **Input Validation**: Proper validation on all user inputs

### Known Dependency Vulnerabilities

#### ✅ Excel Library - FIXED

**Previous Issue (RESOLVED)**:
- The application previously used `xlsx` v0.18.5 which had known vulnerabilities
- **Action Taken**: Migrated to `exceljs` v4.4.0
- **Status**: ✅ **NO VULNERABILITIES** in exceljs v4.4.0

**Why exceljs?**
- Actively maintained (latest update: October 2023)
- No known security vulnerabilities
- Better feature set and more modern API
- Better TypeScript support
- Widely used in production applications

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
- ✅ **Migrated from xlsx to exceljs** - Eliminated 2 high-severity vulnerabilities
- ✅ No vulnerabilities in production dependencies

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [npm Security Best Practices](https://docs.npmjs.com/about-security)
- [React Security Best Practices](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)
- [Web Security Cheat Sheet](https://cheatsheetseries.owasp.org/)

---

**Last Updated**: 2026-02-18
**Next Review**: 2026-05-18 (Quarterly)
