# Bug Tracker

This problem statement was taken from Tri-Nit Hackathon'22(DEV02). [Link](https://drive.google.com/file/d/1tf9DMPKDeJlnDGKPoq9U73neI5AwcxWo/view?usp=sharing)
- It is made using

  - NodeJS and ExpressJS for backend

  - ReactJS and chakra-ui for frontend

  - MySQL for Database

  - Prisma as ORM

## Features

- Users can create an org,add and remove memebers in the orgs
- Any member in an org can raise bugs that will be visible to all the org members.
- Admin(creator of org) has provision to assign and update status of the bug
- Other members can request for a bug.
- Chat thread for the bug has been implemented, which the assigned users and admin can acess.
---
## Getting Started

- Requirements

  - NodeJS Runtime

  - MySQL Database

- Clone this Repository

```bash
git clone https://github.com/Yeshwanth-G/BugTracker
```

- Install dependencies

```bash
cd bugt-backend && npm i
cd bugt-frontend && npm i
```

- Setup database and then sync the database with schema

```bash
npx prisma migrate dev --name 'name_of_the_migration'
```

- Start Servers

```
cd backend && npm run dev
cd frontend && npm start
```