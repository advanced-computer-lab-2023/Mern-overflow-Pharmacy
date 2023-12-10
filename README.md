<p align="center">
    <img width="100" src="https://i.imgur.com/M5HToBU.png" alt="logo">
</p>

# El7a2ny Pharmacy App

El7a2ny Pharmacy is a platform that facilitates a streamlined healthcare experience, catering to the distinct needs of pharmacists and patients. Pharmacists efficiently manage medicine-related activities, monitoring sales, updating medicine details, and receiving real-time notifications about stock levels. They can engage in direct communication with patients, view detailed sales reports, and effectively handle their wallets. On the patient side, the interface is user-friendly, allowing for easy management of wallets, cart items, and orders. Patients can effortlessly check out using multiple payment methods, add new delivery addresses, and receive alternative suggestions for out-of-stock medicines based on active ingredients. This platform prioritizes efficiency, transparency, and personalized healthcare interactions for pharmacists and patients alike.

## Badges

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23EFD81D.svg?style=for-the-badge&logo=javascript&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React.js](https://img.shields.io/badge/react-%235ED3F3.svg?style=for-the-badge&logo=react&logoColor=black)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Stripe](https://img.shields.io/badge/stripe-%235469D4.svg?style=for-the-badge&logo=stripe&logoColor=white)
![JEST](https://img.shields.io/badge/jest-%23C21325.svg?style=for-the-badge&logo=jest&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%231D63ED.svg?style=for-the-badge&logo=docker&logoColor=white)
![Postman](https://img.shields.io/badge/postman-%23F76935.svg?style=for-the-badge&logo=postman&logoColor=white)
![NPM](https://img.shields.io/badge/npm-%23C53635.svg?style=for-the-badge&logo=npm&logoColor=white)

## Table of Contents

-   [Build Status 🔨](#build-status-)
-   [Code Style 📜](#code-style-)
-   [Demo \& Screenshots 📸](#demo--screenshots-)
-   [Tech Stack 🧰🔧](#tech-stack-)
-   [Features ✨](#features-)
-   [Code Examples 👉](#code-examples-)
-   [Installation 📥](#installation-)
-   [How to Use ❓](#how-to-use-)
-   [API Reference 📖](#reference-)
-   [Tests 🧪](#tests-)
-   [Contribute 🤝](#contribute-)
-   [Credits 🙏](#credits-)
-   [Authors 🧑‍💻️](#authors-️)
-   [License ⚖️](#license-️)

## Build Status 🔨

The project is currently in development.

-   Need to add screenshots, code examples, and tests to the README
<p align="right" title="Return to Table of Contents"> <a href="#table-of-contents">&#11014;</a></p>

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

<p align="right" title="Return to Table of Contents"> <a href="#table-of-contents">&#11014;</a></p>

## Demo & Screenshots 📸

<details>
<summary>Authentication</summary>

| ![Sign in Page](https://github.com/advanced-computer-lab-2023/Mern-overflow-Pharmacy/assets/97978852/ec63621d-4c1c-4569-8cb1-4f2139caf211) |
| :----------------------------------------------------------------------------------------------------------------------------------------: |
|                                               <p style="text-align:center">Sign In Page</p>                                                |

| ![Patient Registration](https://github.com/advanced-computer-lab-2023/Mern-overflow-Pharmacy/assets/97978852/b9062c53-6345-4e67-af7a-5b866c2ce1dc) |
| :------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                               <p style="text-align:center">Pharmacist Registration</p>                                                |

| ![Patient Profile](https://github.com/advanced-computer-lab-2023/Mern-overflow-Pharmacy/assets/97978852/6abc3044-78b5-4e47-8e19-b174d9b79bb6) |
| :-------------------------------------------------------------------------------------------------------------------------------------------: |
|                                               <p style="text-align:center">Patient Profile</p>                                                |

</details>

<details>
<summary>Admin Controls</summary>

| ![View Registered Patients](https://github.com/advanced-computer-lab-2023/Mern-overflow-Pharmacy/assets/97978852/310f0579-6ce2-450a-b765-8f348c07be35) |
| :----------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                               <p style="text-align:center">View Registered Patients</p>                                                |

| ![Add Admin](https://github.com/advanced-computer-lab-2023/Mern-overflow-Pharmacy/assets/97978852/ff48a122-ca16-4e1e-81a6-9f3d68fa8179) |
| :-------------------------------------------------------------------------------------------------------------------------------------: |
|                                               <p style="text-align:center">Manage System Admins</p>                                                |

| ![View Pharamcist Requests](https://github.com/advanced-computer-lab-2023/Mern-overflow-Pharmacy/assets/97978852/1a296030-2517-40f7-9740-a1c6b1016d76) |
| :----------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                               <p style="text-align:center">View Pharamcist Requests</p>                                                |

</details>

<details>
<summary>Viewing Medicines</summary>

| ![Admin view Medicines](https://github.com/advanced-computer-lab-2023/Mern-overflow-Pharmacy/assets/97978852/cbc6a728-cd17-4e83-940f-1958f0de99d7) |
| :------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                               <p style="text-align:center">Admin view Medicines</p>                                                |

| ![Patient view Medicines](https://github.com/advanced-computer-lab-2023/Mern-overflow-Pharmacy/assets/97978852/97dd1ae2-d3c6-4286-96c2-836be565bd60) |
| :--------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                               <p style="text-align:center">Patient view Medicines</p>                                                |

</details>

<details>
<summary>Cart</summary>

| ![Empty Cart](https://github.com/advanced-computer-lab-2023/Mern-overflow-Pharmacy/assets/97978852/7398ee73-216d-4a3e-93f4-a3e26bcc03a2) |
| :--------------------------------------------------------------------------------------------------------------------------------------: |
|                                               <p style="text-align:center">Empty Cart</p>                                                |

| ![Items in Cart](https://github.com/advanced-computer-lab-2023/Mern-overflow-Pharmacy/assets/97978852/f52178e3-4dc9-4b58-8903-a45fdea8c8ca) |
| :-----------------------------------------------------------------------------------------------------------------------------------------: |
|                                               <p style="text-align:center">Items in Cart</p>                                                |

</details>

<details>
<summary>Order Details</summary>

| ![Order Summary](https://github.com/advanced-computer-lab-2023/Mern-overflow-Pharmacy/assets/97978852/21fd7b42-6995-4d2a-a512-56773e69c8f2) |
| :-----------------------------------------------------------------------------------------------------------------------------------------: |
|                                               <p style="text-align:center"> Order Summary</p>                                               |

| ![Submitted Order Details](https://github.com/advanced-computer-lab-2023/Mern-overflow-Pharmacy/assets/97978852/0deac0c8-6fd8-4731-a245-1cfe5c7968e6) |
| :---------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                               <p style="text-align:center">Submitted Order Details</p>                                                |

</details>

<p align="right" title="Return to Table of Contents"> <a href="#table-of-contents">&#11014;</a></p>

## Tech Stack 🧰🔧

**Client:** React, Redux, Material-UI, JavaScript

**Server:** Node, Express, MongoDB, Mongoose, TypeScript, JWT, Stripe API, Postman, Jest

**General:** Docker, Git & GitHub, VSCode

<p align="right" title="Return to Table of Contents"> <a href="#table-of-contents">&#11014;</a></p>

## Features ✨

<details>
<summary> Guests can </summary>

-   Sign in to their account
-   Sign up as a patient
-   Request to sign up as a pharmacist
-   Reset forgotten password through OTP sent to email
</details>

<details>
<summary> Logged in System Users can </summary>

-   Change their password
-   Sign out
-   View a list of all available medicines (photo, price, description)
-   Search for medicine based on name
-   Filter medicines based on medicinal use
</details>

<details>
<summary> Admins can </summary>

-   Add another admin with a set username and password
-   Remove pharmacist/patient/admin from the system
-   View all information uploaded by pharmacists who applied to join the platform
-   Accept or reject pharmacist proposals
-   View a total sales report based on a chosen month
-   View information about any user on the system
</details>

<details>
<summary> Pharmacists can </summary>

-   View the available quantity and sales of each medicine
-   Add a medicine with its details, price, and available quantity
-   Upload medicine image
-   Edit medicine details and price
-   Archive / unarchive a medicine
-   View a total sales report based on a chosen month
-   Filter sales report based on a medicine/date
-   Chat with a patient
-   View the amount in my wallet
-   Receive a notification once a medicine is out of stock on the system and via email
</details>

<details>
<summary> Patients can </summary>

-   Chat with a pharmacist
-   View the amount in their wallet
-   Add an over-the-counter medicine or a prescription medicine included in their prescriptions in their cart
-   View their cart items
-   Remove an item from their cart
-   Update the amount of an item in their cart
-   Check out their orders with address and payment method (wallet/COD/credit card)
-   Add new delivery addresses
-   View details and status of all their orders
-   Cancel a pending order
-   View alternatives to a medicine that is out of stock based on main active ingredient
</details>

<p align="right" title="Return to Table of Contents"> <a href="#table-of-contents">&#11014;</a></p>

## Code Examples 👉

<details>
<summary> Add Address to a Patient </summary>

```javascript
const addAddress = async (req: Request, res: Response) => {
    const patientId = req.params.patientId;
    const newAddress = req.body.newAddress;
    try {
        const existingPatient = await patient.findOne({ _id: patientId });
        if (!existingPatient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        existingPatient.address.push(newAddress);
        await existingPatient.save();
        res.json({ message: "Address added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
```

</details>

<details>
<summary> Archive / Unarchive a Medicine </summary>

```javascript
const archiveMedicine = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const existingMedicine = await medicine.findById(id);
        if (!existingMedicine) {
            return res.status(404).send({ message: "Medicine not found" });
        }
        existingMedicine.isArchived = !existingMedicine.isArchived;
        const updatedMed = await existingMedicine.save();
        res.status(200).send(updatedMed);
    } catch (error) {
        res.status(400).send(error);
    }
};
```

</details>

<details>
<summary> List Adminstrators </summary>

```javascript
const listAdminstrators = async (req: Request, res: Response) => {
    const adminstrators = adminstrator
        .find({})
        .then((admns) => res.status(200).json(admns))
        .catch((err) => {
            res.status(400).json(err);
        });
};
```

</details>

<details>
<summary>Not Found Page Component</summary>

```javascript
import NotFoundImg from "./assets/photos/not-found.png";

<Container>
    <div>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you're looking for does not exist.</p>
        <img src={NotFoundImg} />
    </div>
    <Button variant="contained" component={Link} to="/patient/medicines">
        {" "}
        Return to Homepage{" "}
    </Button>
</Container>;
```

</details>

<details>
<summary>AppBar Component</summary>

```javascript
<AppBar position="static">
    <Toolbar>
        <IconButton>
            <MenuIcon />
        </IconButton>
        <Typography>{props.title}</Typography>
        {props.cart && (
            <IconButton component={Link} to="/patient/cart">
                <ShoppingCartIcon />
            </IconButton>
        )}
        <IconButton component={Link} onClick={handleLogout}>
            <LogoutIcon />
        </IconButton>
    </Toolbar>
</AppBar>
```

</details>

 <p align="right" title="Return to Table of Contents"> <a href="#table-of-contents">&#11014;</a></p>

## Installation 📥

Clone the project

```bash
> git clone https://github.com/advanced-computer-lab-2023/Mern-overflow-Pharmacy
```

Go to the project directory

```bash
> cd Mern-overflow-Pharmacy
```

Install dependencies

```bash
> cd server && npm i && cd -
> cd client && npm i && cd -
```

<p align="right" title="Return to Table of Contents"> <a href="#table-of-contents">&#11014;</a></p>

## How to Use ❓

<details open>
<summary>Using Docker</summary>

First, you need to build the container. You need to do this the first time only.

```bash
> make build
```

Start the back-end

```bash
> make up
```

Start the client side

```bash
> make f-up
```

</details>

<details>
<summary>Manually</summary>

Start the back-end server

```bash
> cd server && npm run dev
```

Start the client side

```bash
> cd client && npm start
```

</details>

### Environment Variables 📃

To run this project, you will need to add the following environment variables to your `server/.env` file. You can find an environment variables file example in `server/.env.example`

`MONGO_URI`

`PORT`

`JWT_SECRET`

`EMAIL`

`EMAILPASSWORD`

 <p align="right" title="Return to Table of Contents"> <a href="#table-of-contents">&#11014;</a></p>

## API Reference 📖

<details>
    <summary>Authentication routes</summary>

|method|route|returns|
|--|--|--|
|POST|```/auth/login/```|Log in|
|POST|```/auth/logout/```|Log out|
|POST|```/auth/reset/```|Reset Password|
|POST|```/auth/resetwithtoken/```|Reset Password with Token|
|POST|```/auth/change/```|Change Password|
</details>

<details>
    <summary>Admin routes</summary>

|method|route|returns|
|--|--|--|
|GET|```/adminstrators/```|View all admins|
|POST|```/adminstrators/```|Create an admin|
|DELETE|```/adminstrators/:id/```|Delete an admin|
</details>

<details>
    <summary> Patient routes</summary>

|method|route|returns|
|--|--|--|
|GET|```/patients/```|View all patients|
|GET|```/patients/:id/```|View details of a patient|
|GET|```/patients/address/:id/```|View addresses of a patient|
|POST|```/patients/```|Create a patient|
|PUT|```/patients/address/:id/```|Add an adderss to a patient|
|DELETE|```/patients/:id/```|Delete a patient|
</details>

<details>
    <summary> Pharmacist routes</summary>

|method|route|returns|
|--|--|--|
|GET|```/pharmacists/```|View all accepted pharmacists|
|GET|```/pharmacists/listAll/```|View all pending pharmacist requests|
|GET|```/pharmacists/viewAll/```|View all pharmacist requests|
|GET|```/pharmacists/:id/```|View details of a pharmacist|
|POST|```/pharmacists/```|Create a pharmacist request|
|POST|```/pharmacists/acceptPharmacist/```|Accept a pharmacist request|
|POST|```/pharmacists/rejectPharmacist/```|Reject a pharmacist request|
|PUT|```/pharmacists/:id/```|Update pharmacist request to accepted|
|DELETE|```/pharmacists/:id/```|Delete a pharmacist|
</details>

<details>
    <summary> Medicine routes</summary>

|method|route|returns|
|--|--|--|
|GET|```/medicines/```|View the sales and quantity of medicines|
|GET|```/medicines/view/```|View all available medicines only|
|GET|```/medicines/viewAll/```|View all details about all medicines|
|GET|```/medicines/search/```|View medicines by selected name query|
|GET|```/medicines/filter/```|View medicines by selected medicinal use|
|POST|```/medicines/```|Create a medicine|
|PUT|```/medicines/:id/```|Update medicine details|
|PUT|```/medicines/:id/archive/```|Archive / Unarchive a medicine|
</details>

<details>
    <summary> Cart routes</summary>

|method|route|returns|
|--|--|--|
|GET|```/cart/:id/```|View cart items|
|POST|```/cart/:id/add/```|Add a medicine to cart|
|POST|```/cart/:id/changeAmount/```|Change a medicine's quantity in cart|
|PUT|```/cart/:id/empty/```|Empty cart|
|DELETE|```/cart/:id/:medName/```|Remove a medicine by name from cart|
</details>

<details>
    <summary> Order routes</summary>

|method|route|returns|
|--|--|--|
|GET|```/orders/:id/```|View orders by patient id|
|GET|```/orders/salesreport/```|View sales report|
|POST|```/orders/:id/add/```|Add an order|
|PUT|```/orders/:id/```|Cancel pending order|
</details>

<details>
    <summary> Payment routes</summary>

|method|route|returns|
|--|--|--|
|POST|```/walletPayment/shoppingCart/```|Pay for an order using wallet|
|POST|```/create-checkout-session/shoppingCart/```|Pay for an order using credit card|
</details>

<p align="right" title="Return to Table of Contents"> <a href="#table-of-contents">&#11014;</a></p>

## Tests 🧪

<p align="right" title="Return to Table of Contents"> <a href="#table-of-contents">&#11014;</a></p>

## Contribute 🤝

Contributions are always welcome!

### Getting Started

1. Fork the repository
2. Clone the repository
3. Install dependencies
4. Create a new branch
5. Make your changes
6. Commit and push your changes
7. Create a pull request
8. Wait for your pull request to be reviewed and merged

### Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/). Please read the full text so that you can understand what actions will and will not be tolerated.

<p align="right" title="Return to Table of Contents"> <a href="#table-of-contents">&#11014;</a></p>

## Credits 🙏

-   [JWT docs](https://jwt.io/introduction)
-   [Stripe docs](https://stripe.com/docs)
-   [Node.js docs](https://nodejs.org/en/docs/)
-   [Express.js docs](https://expressjs.com/en/4x/api.html)
-   [React.js docs](https://legacy.reactjs.org/docs/getting-started.html)
-   [MongoDB docs](https://www.mongodb.com/docs/)
-   [Mongoose docs](https://mongoosejs.com/docs/)
-   [SimpliLearn Blog about MERN](https://www.simplilearn.com/tutorials/mongodb-tutorial/what-is-mern-stack-introduction-and-examples)
-   [MERN Stack | GeeksforGeeks](https://www.geeksforgeeks.org/mern-stack/)
-   [MongoDB guide to MERN](https://www.mongodb.com/languages/mern-stack-tutorial)
-   [NetNinja MERN playlist](https://www.youtube.com/watch?v=98BzS5Oz5E4&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE)
-   [MERN stack tutorial | freeCodecAmp](https://www.youtube.com/watch?v=-42K44A1oMA)

 <p align="right" title="Return to Table of Contents"> <a href="#table-of-contents">&#11014;</a></p>

## Authors 🧑‍💻️

| [Abdelrahman Saleh](https://github.com/19AbdelrahmanSalah19) | [Ahmed Wael](https://github.com/ahmedwael216) | [John Fayez](https://www.github.com/john-roufaeil)  | [Logine Mohamed](https://github.com/logine20) | [Mohamed Mohey](https://github.com/mmi333)            |
| ------------------------------------------------------------ | --------------------------------------------- | --------------------------------------------------- | --------------------------------------------- | ----------------------------------------------------- |
| [Ahmed Yasser](https://github.com/ahmedyasser07)             | [Alaa Aref](https://github.com/AlaM-01)       | [Ibrahim Soltan](https://github.com/Ibrahim-Soltan) | [Omar Wael](https://github.com/o-wael)        | [Mohamed Elsheka](https://github.com/MOHAMEDELSHEKHA) |

<p align="right" title="Return to Table of Contents"> <a href="#table-of-contents">&#11014;</a></p>

## License ⚖️

This project is under [Apache 2.0](https://choosealicense.com/licenses/apache-2.0/)
license

<p align="right" title="Return to Table of Contents"> <a href="#table-of-contents">&#11014;</a></p>
