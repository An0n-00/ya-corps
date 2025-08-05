<!-- 
Thanks for contributing to ya-corps! 🏴‍☠️
Please fill out this template to help us review your changes.
-->

## 📋 Description

<!-- Provide a clear and concise description of your changes -->

**What does this PR do?**
- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Code cleanup/refactoring
- [ ] Performance improvement
- [ ] Security enhancement

**Summary:**
<!-- Briefly describe what this PR accomplishes -->

## 🔗 Related Issues

<!-- Link any related issues here -->
Fixes #(issue_number)
Closes #(issue_number)
Related to #(issue_number)

## 🧪 Testing

**How has this been tested?**
- [ ] Unit tests
- [ ] Integration tests
- [ ] Manual testing
- [ ] Tested with various CORS scenarios

**Test Configuration:**
- Node.js version:
- Operating System:
- Browser(s) tested:

**Test Cases:**
<!-- Describe the test cases you ran -->
```javascript
// Example test case or manual test steps
fetch('http://localhost:3000/request', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        url: 'https://api.example.com/test',
        method: 'GET'
    })
})
```

## 📝 Changes

**API Changes:**
- [ ] No API changes
- [ ] New endpoint added
- [ ] Existing endpoint modified
- [ ] Breaking changes to API

**Files Changed:**
<!-- List the main files that were changed -->
- `index.js` - Brief description of changes
- `README.md` - Updated documentation
- `openapi.yml` - Updated API specification

## 🔍 Code Quality

- [ ] My code follows the project's coding standards
- [ ] I have performed a self-review of my code
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation accordingly
- [ ] I have updated the OpenAPI specification if needed
- [ ] My changes generate no new warnings or errors
- [ ] I have added tests that prove my fix is effective or that my feature works

## 📖 Documentation

- [ ] README.md updated (if applicable)
- [ ] OpenAPI specification updated (if applicable)
- [ ] Code comments added/updated
- [ ] No documentation changes needed

## 🚨 Breaking Changes

<!-- If this is a breaking change, describe the impact and migration path -->

**What breaks:**
<!-- Describe what existing functionality might break -->

**Migration guide:**
<!-- Provide steps for users to migrate to the new version -->

## 📸 Screenshots/Examples

<!-- If applicable, add screenshots or examples of the changes -->

**Before:**
```javascript
// Old behavior/API
```

**After:**
```javascript
// New behavior/API
```

## 🎯 Checklist

- [ ] I have read the contributing guidelines
- [ ] My changes are focused and don't include unrelated modifications
- [ ] I have tested my changes thoroughly
- [ ] I have updated relevant documentation
- [ ] My commit messages are descriptive
- [ ] I understand this project is licensed under CC BY-NC-SA 4.0

---

**Additional Notes:**
<!-- Add any other context about the PR here -->