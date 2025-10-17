---
layout: base.liquid
title: Auth Patterns
eleventyNavigation:
  key: /system-design/auth-patterns/
  parent: /system-design/
---

SAML vs SSO

## Authentication

- Token based authentication
- HMAC (Hash-based Message Authentication Code) authentication

### Session Management

## Authorization

### JWT

```js
// Generate JWT
const jwt = require("jsonwebtoken");

function generateToken(user) {
  return jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
}

// Verify middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
```

### OAuth 2.0

```js
// Express with Passport
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await findOrCreateUser(profile);
      return done(null, user);
    }
  )
);
```
