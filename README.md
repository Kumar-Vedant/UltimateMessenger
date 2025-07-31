# Messaging App

A full-stack real-time messaging web app using Node.js with Express for backend, PostgreSQL with Prisma ORM for database and HTML/Tailwind CSS with EJS for frontend.

# Features

- Real-time messaging with socket.io
- RESTful API in Node.js runtime with Express
- Secure login/signup using JsonWebTokens(JWTs)
- PostgreSQL for database with Prisma ORM

## Demo

<p align="center">
  <img src="demo/Main.png"/>
</p>
<p align="center">
  <img src="demo/Login.png"/>
</p>
<p align="center">
  <img src="demo/Register.png"/>
</p>
<p align="center">
  <img src="demo/Message.png"/>
</p>

## Usage

```bash
git clone https://github.com/Kumar-Vedant/MessagingApp.git
```

1. Install all dependencies from package.json using npm.
2. Set up your .env file with DATABASE_URL, PORT and JWT_SECRET.
3. Make sure your Database is running.
4. Run `bash nodemon run server`

## Tech Stack

- Server: JavaScript, Node.js, Express
- Client: Tailwind CSS, EJS
- Database: PostgreSQL, Prisma

## License
```
MIT License

Copyright (c) 2025 Kumar Vedant

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
