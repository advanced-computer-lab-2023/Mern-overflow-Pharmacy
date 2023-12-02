<p align="center">
    <img width="100" src="https://i.imgur.com/M5HToBU.png" alt="logo">
</p>

# El7a2ny App

El7a2ny is a robust software solution designed to enhance and automate interactions within the healthcare ecosystem, catering to clinics, doctors, pharmacists, and patients. Our platform seamlessly connects patients with healthcare providers, offering a comprehensive suite of features to streamline the entire healthcare process. We offer a holistic approach to healthcare management, addressing a spectrum of needs that includes discovering the right healthcare professional, seamlessly coordinating appointments, facilitating both on-premise and online consultations, managing prescriptions, receiving timely reminders for follow-ups, securely accessing comprehensive medical histories, and effortlessly ordering prescribed medications. Our platform is designed to streamline and enhance every facet of the healthcare journey, ensuring a seamless and patient-centric experience from finding the right doctor to managing ongoing care.

## Badges

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

## Table of Contents

-   [Build Status](#build-status-)
-   [Code Style](#code-style-)
-   [Demo \& Screenshots](#demo--screenshots-)
-   [Tech Stack](#tech-stack-)
-   [Features](#features-)
-   [Code Examples](#code-examples)
-   [Installation](#installation-)
-   [API Reference](#api-reference)
-   [Tests](#tests-)
-   [How to Use?](#how-to-use)
-   [Contribute](#contribute-)
-   [Credits](#credits)
-   [Authors](#authors-️)
-   [License](#license-️)

## Build Status 🔨

The project is currently in development.

-   Need to add screenshots to the README

## Code Style 📜

The code style used is `eslint` and [`prettier`](https://prettier.io/docs/en/). The code style is enforced using `pre-commit` hooks

To use the code style we follow, run these commands

Install pre-commit package by running

```bash
> pip install pre-commit
```

Once installed, run the following for a one-time setup

```bash
> pre-commit install
```

You will then need to run the following command each time before your next commit attempt

```javascript
> npx prettier . --write
```

## Demo & Screenshots 📸

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

## Tech Stack 🧰🔧

**Client:** React, Redux, Material-UI, JavaScript

**Server:** Node, Express, MongoDB, Mongoose, TypeScript, JWT, Stripe API, Postman, Jest

**General:** Docker, Git & GitHub, VSCode

## Features ✨

<details>
<summary> Guests can </summary>

-   Sign in to my account
-   Sign up as a patient
-   Request to sign up as a pharmacist
-   Request to sign up as a doctor
-   Reset forgotten password through OTP sent to email
</details>

<details>
<summary> Logged in System Users can </summary>

-   Change my password
-   Sign out
-   View a list of all available medicines (photo, price, description)
-   Search for medicine based on name
-   Filter medicines based on medicinal use
</details>

<details>
<summary> Admins can </summary>

-   Add another admin with a set username and password
-   Remove doctor/pharmacist/patient/admin from the system
-   View all information uploaded by doctors/pharmacists who applied to join the platform
-   Accept or reject doctor and pharmacist proposals
-   Add/Update/Delete health packages with different price ranges
-   View a total sales report based on a chosen month
-   View information about any user on the system
</details>

<details>
<summary> Doctors can </summary>

-   Update their information (email, hourly rate, affiliation)
-   View and accept employment contract
-   Add their available time slots for appointments
-   Filter appointments by date/status
-   View information and health records of patients registered with them
-   View all new and old prescriptions and their statuses
-   View a list with all their patients
-   Search for a patient using their name
-   Filter patients based on upcoming appointments
-   Receive notifications of their appointments on the system and by mail
-   View a list of all their upcoming / past appointments
-   Filter appointments by date or status
-   Reschedule an appointment for a patient
-   Cancel an appointment
-   Receive notifications about cancelled or rescheduled appointments on the system and by mail
-   Schedule a follow-up for a patient
-   Add / Delete medicine to / from the prescription from the pharmacy platform
-   Add / Update dosage for each medicine added to the prescription
-   Download selected prescription (PDF)
-   Add new health records for a patient
-   Start / End a video call with a patient
-   Chat with a patient
-   Add a patient's prescription
-   Update a patient's prescription before it is submitted to the pharmacy
-   Accept or revoke a follow-up session request from a patient
-   View the amount in their wallet
</details>

<details>
<summary> Pharmacists can </summary>

-   </details>

<details>
<summary> Patients can </summary>

-   </details>

## Code Examples

## Installation 📥

Clone the project

```bash
> git clone https://github.com/advanced-computer-lab-2023/Mern-overflow-Clinic
```

Go to the project directory

```bash
> cd Mern-overflow-Clinic
```

Install dependencies

```bash
> cd server && npm i && cd -
> cd client && npm i && cd -
```

Start the server

```bash
> cd server && npm run dev
```

Start the client side

```bash
> cd client && npm start
```

### Environment Variables 📃

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI`

`PORT`

`JWT_SECRET`

`EMAIL`

`EMAILPASSWORD`

## API Reference

## Tests 🧪

## How to Use?

## Contribute 🤝

## Credits

## Authors 🧑‍💻️

-   [John Fayez](https://www.github.com/john-roufaeil)
-   [Ahmed Wael](https://github.com/ahmedwael216)
-   [Mohamed Mohey](https://github.com/mmi333)
-   [Abdelrahman Saleh](https://github.com/19AbdelrahmanSalah19)
-   [Ibrahim Soltan](https://github.com/Ibrahim-Soltan)
-   [Logine](https://github.com/logine20)
-   [Alaa Aref](https://github.com/AlaM-01)
-   [Ahmed Yasser](https://github.com/ahmedyasser07)
-   [Omar Wael](https://github.com/o-wael)
-   Mohamed Elsheka

## License ⚖️

This project is under [MIT](https://choosealicense.com/licenses/mit/)
license
