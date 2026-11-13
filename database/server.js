const sql = require('mysql2/promise');
const bcrypt = require('bcrypt');

// Variables containing the values of the fields
const userID = 6;
const email = "NotSuperman@gmail.com";
// Use bcrypt.hashSynch(enteredPassword, saltRounds) to create a hash password
const password = bcrypt.hashSync("Smooth", 2);
const phoneNumber = "558-147-6731";
const street = "221B Baker Street";
const city = "Gotham";
const state = "NJ";
const postalCode = 32056;

const enteredEmail = "noobmaster69@gmail.com";
const enteredPassword = "HulkSmash!";

// This is a variable containing an array of the values corresponding to the fields
const values = [userID, email, password, phoneNumber, street, city, state, postalCode];

const host = "localhost";
const databaseUser = "root";
const databasePassword = "Fryingpan7#yolo";
const databaseName = "shop";
// Create connection to a local database
// createPool() allows the code to run multiple connections simultaneously
const db = sql.createPool({
    host: host,
    user: databaseUser,
    password: databasePassword,
    database: databaseName
});

// This function adds a user's credential into the table "User"
async function addUser(user) {
    // The 8 question marks are parameters for the query and each element
    // in "user" variable are passed as an argument in respective order
    await db.query(`INSERT INTO user VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, user);
}

// This function verifies the user's email and password
async function verifyUser(email, password) {
    const [result] = await db.query(`SELECT email, password FROM user WHERE email = ${email}`);
    if (result[0] == undefined) {
        console.log("Incorrect Email");
        return;
    } else {
        const isVerified = bcrypt.compareSync(password, result[0].password);
        if (isVerified) {
            console.log("Logged In");
        } else {
            console.log("Incorrect Password");
        }
    }
}

async function retrieve(tableName) {
    const [result] = await db.query(`SELECT * FROM ${tableName}`);
    console.log(result);
}

async function addToCart(product_id, quantity){}

async function updateQuantity(cartItemID, changeInQuantity) {

    const [cartItemResult] = await db.query(`SELECT product_id, quantity FROM cart_item WHERE cart_item_id = ${cartItemID}`);

    const productID = cartItemResult[0].product_id;
    const quantityInCart = cartItemResult[0].quantity;
    const newQuantityInCart = quantityInCart + changeInQuantity;

    // If the new amount of quantity in cart is less than or equal to zero, run a query to remove it from Table "cart_item"
    if (newQuantityInCart <= 0){
        await db.query(`DELETE FROM cart_item WHERE cart_item_id = ${cartItemID}`);
        return;
    }

    await db.query("UPDATE cart_item SET quantity = ? WHERE cart_item_id = ?", [newQuantityInCart, cartItemID]);

    const [productResult] = await db.query("SELECT stock FROM product WHERE product_id = ?", productID);
    const stock = productResult[0].stock;
    await db.query("UPDATE product SET stock = ? WHERE product_id = ?", [stock - changeInQuantity, productID]);
}