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

-   Need to add screenshots, code examples, and tests to the README

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

-   View the available quantity and sales of each medicine
-   Add a medicine with its details, price and available quantity
-   Upload medicine image
-   Edit medicine details and price
-   Archive / unarchive a medicine
-   View a total sales report based on a chosen month
-   Filter sales report based on a medicine / date
-   Chat with a patient
-   View the amount in my wallet
-   Receive a notification once a medicine is out of stock on the system and via email
</details>

<details>
<summary> Patients can </summary>

-   Upload / remove documents (PDF,JPEG,JPG,PNG) for their medical history
-   View uploaded health records
-   Add family members to the system
-   Link another existing patient's account as a family member
-   View registered family members
-   Choose to pay for their appointments using wallet or credit card
-   Enter credit card details and pay for an appointment using Stripe
-   Filter appointments by date / status
-   View all new and old prescriptions and their statuses
-   View health package options and details
-   Subscribe to a health package for themselves and their family members
-   Pay for the chosen health package using wallet or credit card
-   View subscribed health package for themselves and their family members
-   View the status of their health care package subscription
-   Cancel a subscription of a health package
-   View a list of all doctors along with their speciality, session price (based on subscribed health package if any)
-   Search for a doctor by name and/or speciality
-   Filter a doctor by speciality and/or availability on a certain date and at a specific time
-   View details about a specific selected doctor
-   Select an appointment date and time for themselves or for a family member
-   Receive a notification of their appointment on the system and by mail
-   View a list of their upcoming / past appointments
-   Filter appointments by date or status
-   Reschedule an appointment for themselves or for a family member
-   Cancel an appointment for themselves or for a family member
-   Receive a notification about cancelled or rescheduled appointments on the system and by mail
-   View a list of all their perscriptions
-   Filter prescriptions based on date or doctor or fulfillment status
-   View the details of a selected prescription
-   Pay directly for the prescription items by wallet or credit card
-   Download a prescription (PDF)
-   Start / End a video call with a doctor
-   Chat with a doctor or pharmacist
-   Request a follow-up to a previous appointment for themselves or a family member
-   Receive a refund in their wallet when a doctor cancels an appointment
-   View the amount in their wallet
-   Add an over the counter medicine or a prescription medicine included in their prescriptions in their cart
-   View their cart items
-   Remove an item from their cart
-   Update the amount of an item in their cart
-   Checkout their orders with address and payment method (wallet/COD/credit card)
-   Add new delivery addresses
-   View details and status of all their orders
-   Cancel a pending order
-   View alternatives to a medicine that is out of stock based on main active ingredient
</details>

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

## How to Use?

Start the server

```bash
> cd server && npm run dev
```

Start the client side

```bash
> cd client && npm start
```

### Environment Variables 📃

To run this project, you will need to add the following environment variables to your `server/.env` file

`MONGO_URI`

`PORT`

`JWT_SECRET`

`EMAIL`

`EMAILPASSWORD`

## API Reference

-   [Node.js docs](https://nodejs.org/en/docs/)
-   [Express.js docs](https://expressjs.com/en/4x/api.html)
-   [React.js docs](https://legacy.reactjs.org/docs/getting-started.html)
-   [MongoDB docs](https://www.mongodb.com/docs/)
-   [Mongoose docs](https://mongoosejs.com/docs/)

## Tests 🧪

## Contribute 🤝

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.

## Credits

-   [SimpliLearn Blog about MERN](https://www.simplilearn.com/tutorials/mongodb-tutorial/what-is-mern-stack-introduction-and-examples)
-   [MERN Stack | GeeksforGeeks](https://www.geeksforgeeks.org/mern-stack/)
-   [MongoDB guide to MERN](https://www.mongodb.com/languages/mern-stack-tutorial)
-   [NetNinja MERN playlist](https://www.youtube.com/watch?v=98BzS5Oz5E4&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE)
-   [MERN stack tutorial | freeCodecAmp](https://www.youtube.com/watch?v=-42K44A1oMA)

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
