// import libraries from npm for SQL connection and password encryption
const sql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;


app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://main.d1cn8qvc5511t6.amplifyapp.com"
    ]
}))

app.use(express.json())

// Variables containing the values of the fields
const userID = 1;
const firstName = "Bob";
const lastName = "Bush";
const email = "bob@gmail.com";
// Use bcrypt.hashSynch(enteredPassword, saltRounds) to create a hash password
const password = bcrypt.hashSync("Ilikeburger123", 0);
const phoneNumber = "530-123-7543";
const street = "1234 Oakland";
const city = "Sacramento";
const state = "CA";
const postalCode = 92387;

// This is a variable containing an array of the values corresponding to the fields
const values = [userID, firstName, lastName, email, password, phoneNumber, street, city, state, postalCode];

// database information
const host = "localhost";
const databaseUser = "root";
const databasePassword = "Fryingpan7#yolo";
const databaseName = "shop";

// Create connection to a local database
// createPool() allows the code to run multiple connections simultaneously
// const db = sql.createPool({
//     host: host,
//     user: databaseUser,
//     password: databasePassword,
//     database: databaseName
// });

const db = sql.createPool({
    host:"database-1.cpmyaqi484tz.us-east-2.rds.amazonaws.com",
    user:"admin",
    password:"Toastytito",
    database:"shop",
    port: 3306
})

// This function adds a user's credential into the table "User"
async function addUser(user) {
    // The 8 question marks are parameters for the query and each element
    // in "user" variable are passed as an argument in respective order
    await db.query(`INSERT INTO user VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, user);
    console.log("Account Created!");
}

// This function verifies the user's email and password
async function verifyUser(inputEmail, inputPassword) {
    // The query returns an email and password
    // result variable contains an object with email and password -> [{email: "", password: ""}]
    const [result] = await db.query(`SELECT email, password FROM user WHERE email = "${inputEmail}"`);
    // Check if email exists or not
    if (result[0] == undefined) {
        console.log("Incorrect Email");
        return;
    }
    // Proceed to verify password if email is found
    else {
        // use bcrypt.compareSync() to compare password
        const isVerified = bcrypt.compareSync(inputPassword, result[0].password);
        // Confirm verification if password is correct
        if (isVerified) {
            console.log("Logged In");
        } else {
            console.log("Incorrect Password");
        }
    }
}

// This function returns a table with the given name in a JSON format
async function retrieve(tableName) {
    const [result] = await db.query(`SELECT * FROM ${tableName}`);
    console.log(result);
}

// This function updates the quantity of a product in the cart and in stock
async function updateQuantity(cartItemID, changeInQuantity) {

    // query returns a product_id and its quantity filtered by a given cart item ID
    const [cartItemResult] = await db.query(`SELECT product_id, quantity FROM cart_item WHERE cart_item_id = ${cartItemID}`);

    // Stores values
    const productID = cartItemResult[0].product_id;
    const quantityInCart = cartItemResult[0].quantity;
    // New quantity in cart is equals to the sum of current quantity in cart and change in quantity (can be negative if removed)
    const newQuantityInCart = quantityInCart + changeInQuantity;

    // Get the value of the stock from the table "product"
    const [productResult] = await db.query("SELECT stock FROM product WHERE product_id = ?", productID);
    const stock = productResult[0].stock;
    
    // Check if there is enough stock quantity
    if (stock < changeInQuantity) {
        console.error("Not enough stock available");
        return; // end function if there is a stock shortage
    }
    // Check the amount of new quantity in cart before updating the amount
    // If the new amount of quantity in cart is less than or equal to zero
    // run a query to remove the row that contains that same cart item ID from Table "cart_item"
    else if (newQuantityInCart <= 0){
        await db.query(`DELETE FROM cart_item WHERE cart_item_id = ${cartItemID}`);
        console.log(`Product with cart item ID ${cartItemID} has been removed from Cart Item table`)
    }
    // else, update the cart item quantity in the cart and in stock
    else {
        await db.query("UPDATE cart_item SET quantity = ? WHERE cart_item_id = ?", [newQuantityInCart, cartItemID]);
    }

    // Update stock of a product
    await db.query("UPDATE product SET stock = ? WHERE product_id = ?", [stock - changeInQuantity, productID]);
}

async function select(){
    const [result] = await db.query(`SELECT * FROM user`);
    return result;
}

app.get('/', (req, res) => {
    select().then(data => {
        res.json(data);
    })
})

// // Catch-all route for handling 404 errors
// app.use((req, res, next) => {
//     res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
// });

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

// app.listen(3000, () => {
//     console.log("Listening")
// })