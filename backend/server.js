import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import { AImodel } from "./controllers/geminiAi.js"
import cors from "cors"
import bodyParser from "body-parser"
import { createOrUpdateDocument, fetchAllDocuments, readDocument, searchProductsByExactName, updateDocument } from "./controllers/CRUD.js"
import multer from "multer"
import { db } from "./controllers/firestore.js";
import twilio from 'twilio'
import placesRoute from './routes/places.js'
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';


const app = express()
const httpserver = createServer(app)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({ origin: true }));

const upload = multer({ storage: multer.memoryStorage() })

const all_vegetable = {
    "vegetables": []
}

const all_vendors = {
    "vendors": []
}

const profile = {
    "name": "Aryan Maurya",
    "contact": "9967855432",
    "gender": "Male",
    "address": "Wadala East, Mumbai-400037",
    "email": "aryan@gmail.com",
    "previous_orders": [],
    "latitude": "19.0684501",
    "longitude": "72.8389816"
}


async function fetch_all_vegetable() {
    console.log("fetching all products")
    all_vegetable.vegetables = await fetchAllDocuments("vegetable")
    console.log(all_vegetable)
}

async function fetch_previous_orders() {
    console.log("fetching all orders")
    profile.previous_orders = await fetchAllDocuments("orders")
}

async function fetch_all_vendors() {
    console.log("fetch all vendors")
    all_vendors.vendors = await fetchAllDocuments('vendors')
}

await fetch_all_vegetable()
await fetch_previous_orders()
await fetch_all_vendors()

// console.log("all_vegetables", all_vegetable)

const cart = {
    "cart_products": [
        {
            "pid": "pid1738153754889",
            "name": "Spinach",
            "desc": "Rich in iron and vitamins. Boosts immunity and strengthens bones.",
            "stock": 55,
            "category": "Vegetable",
            "price": 20,
            "vendor_name": "Fresh Farms",
            "status": true,
            "vendor_id": 1,
            "vendor_rating": 4.5,
            "images": ['https://storage.googleapis.com/tsechacks-14a28.firebasestorage.app/vegetable/pid1738153754889/1'],
            "unit": "bundle",
            "qauntity": 1

        },
        {
            "pid": "pid1738153871686",
            "name": "Apple",
            "desc": "Sweet and crispy red apples. Packed with antioxidants and fiber.",
            "stock": 80,
            "category": "Fruit",
            "price": 150,
            "vendor_name": "Green Harvest",
            "status": true,
            "vendor_id": 2,
            "vendor_rating": 4.5,
            "images": ['https://storage.googleapis.com/tsechacks-14a28.firebasestorage.app/vegetable/pid1738153871686/1'],
            "unit": "kg",
            "qauntity": 1
        },
    ]
}

const wishlist = {
    "wishlist_products": [
        {
            "pid": "pid1738154087920",
            "name": "Grapes",
            "desc": "Fresh and seedless green grapes. Perfect for snacking and juices.",
            "stock": 70,
            "category": "Fruit",
            "price": 90,
            "vendor_name": "Fresh Farms",
            "status": true,
            "vendor_id": 1,
            "vendor_rating": 4.5,
            "images": ['https://storage.googleapis.com/tsechacks-14a28.firebasestorage.app/vegetable/pid1738154087920/1'],
            "unit": "kg"
        }
    ]
}


const io = new Server(httpserver, {
    cors: {
        origin: "http://localhost:5173"
    }
})

io.use((socket, next) => {
    const user_name = socket.handshake.auth.user_name;
    console.log(user_name)
    socket.user_name = user_name
    next()
});


io.on('connection', (socket) => {
    console.log(socket.id, socket.user_name)

    const actual_history = [{
        role: "user",
        parts: [
            {
                text: `You are a personal assistant named MarketHelper, designed to assist users on an online marketplace where they can buy fresh vegetables and fruits.

For commands related to ordering or adding an item to the wishlist, respond with "order VEGETABLE NAME," "wishlist VEGETABLE NAME," or "cart VEGETABLE NAME," depending on whether the user wants to place an order, add the item to their wishlist, or add the item to their cart.

If the user inquires about a particular vegetable, initially provide them with the name, rating, and price of the vegetable, making sure to include the price in Indian currency (INR). If the user expresses interest, follow up with additional details such as the description of the vegetable. Keep responses concise and ask relevant questions based on the user’s queries.

When the user wants to search for a vegetable, look for matching vegetables from the given list of vegetables only and generate the response in JSON format as follows:
{
  "data-type": "JSON",
  "search_result": [{vegetable1}, {vegetable2}, ...],
  "summary": ""
}
The search result should include complete product details only for vegetables that exist in the given list. The summary should provide a quick overview of the search results. Ensure that the response strictly adheres to this JSON format, with no additional comments, text, or formatting included.

As an assistant for a fresh produce marketplace, you will help users find and buy high-quality vegetables, provide information about their nutritional benefits, suggest storage tips, and assist with any inquiries related to fresh produce shopping. Keep responses concise and focused on enhancing the user's shopping experience.

The response must not include special characters, extra formatting, or line breaks. When the user asks to navigate to a page, respond with the following command: open PageName. The available pages are home, cart, vegetable, vendor, order, wishlist, and profile.

`
            },
        ],
    },
    {
        role: "user",
        parts: [
            { text: JSON.stringify(profile) },
        ],
    },
    {
        role: "user",
        parts: [
            { text: JSON.stringify(all_vegetable) },
        ],
    },
    {
        role: "user",
        parts: [
            { text: JSON.stringify(cart) },
        ],
    },
    {
        role: "user",
        parts: [
            { text: JSON.stringify(wishlist) },
        ],
    },
    {
        role: "user",
        parts: [
            { text: JSON.stringify(all_vendors) }
        ],
    },
    {
        role: "model",
        parts: [
            { text: "Hello, I am your personal shopping assistant. How may I assist you?" },
        ],
    },]


        const chatSession = AImodel.startChat({

            // safetySettings: Adjust safety settings
            // See https://ai.google.dev/gemini-api/docs/safety-settings
            history: actual_history
        });

        socket.on('prompt', async (response) => {
            console.log(response)

            actual_history.push({
                role: "user",
                parts: [
                    { text: `${response}` }
                ]
            })

            try {
                const result = await chatSession.sendMessage(response);
                const Airesponse = result.response.text();

                if (Airesponse) {
                    actual_history.push({
                        role: "model",
                        parts: [
                            { text: `${Airesponse}` }
                        ]
                    })
                }
                console.log(Airesponse)
                socket.emit("response", Airesponse)

            }
            catch (err) {
                socket.emit("error", "some internal error occured")
                console.error(err)
            }

        })
    })

app.use(cors())
app.use(bodyParser.json())

app.get("/all_products", async (req, res) => {
    res.status(200).send(await fetchAllDocuments('vegetable'))
})

app.get("/profile", (req, res) => {
    res.status(200).send(profile)
})

app.post("/search-product", async (req, res) => {
    console.log("search query", req.body.search_value)
    const products = await searchProductsByExactName(req.body.search_value)
    res.status(200).send(products)
})

app.post("/get-single-product", async (req, res) => {
    const pid = req.body.pid
    const data = await readDocument('vegetable', pid)
    res.status(200).send(data)
})

const accountSid = 'AC38dee8a7fbcb4412340bea1687f6be62';
const authToken = 'ef67d0cece853b2fc379c0854e757eab';
const client = twilio(accountSid, authToken);

app.post('/send-message', (req, res) => {
    const { message = "Donation of 5kg Tomato received from Farm Fresh. Pickup time - 5pm - 7pm. " } = req.body;

    client.messages
        .create({
            body: message,
            from: '+18453779534',
            to: '+919967855433'
        })
        .then((message) => res.json({ sid: message.sid }))
        .catch((error) => res.status(500).json({ error: error.message }));
});

app.post("/create-order", async (req, res) => {
    const { name, email, amount, address, items } = req.body
    const date = Date.now()
    const orderId = `order${date}`
    const status = "pending"

    const order_data = {
        orderId, name, email, status, date, amount, address, items
    }

    await createOrUpdateDocument('orders', orderId, order_data)
    fetch_previous_orders()
    res.status(200).send("order placed successfully")
})

app.get("/get-orders", async (req, res) => {
    const data = await fetchAllDocuments('orders')
    res.status(200).send(data)
})

app.get("/get-vendors", async (req, res) => {
    res.status(200).send(await fetchAllDocuments('vendors'))
})

app.get("/cart", (req, res) => {
    res.status(200).send(cart)
})

app.get("/wishlist", (req, res) => {
    res.status(200).send(wishlist)
})

app.post("/add_to_cart", (req, res) => {
    const keyword = req.body.product_name
    console.log(req.body)
    console.log(keyword)
    const str_keyword = String(keyword)
    const search_list = all_vegetable.vegetables

    let search_result
    for (let i = 0; i < search_list.length; i++) {
        // console.log("product ", search_list[i])
        // Check if the product name contains the keyword (case-insensitive)

        if (search_list[i].name.toLowerCase() == str_keyword.toLowerCase()) {
            search_result = search_list[i];
            break
        }
    }
    console.log("search result", search_result)
    const isInCart = cart.cart_products.some(product => product.pid === search_result.pid);

    if (!isInCart) {
        // Add the product to the cart if it is not already present
        cart.cart_products.push({ ...search_result, qauntity: 1 });
        res.status(200).send(`${search_result.name} added successfully to cart`);
    } else {
        // Send a response indicating that the product is already in the cart
        res.status(200).send(`${search_result.name} is already present in cart`);
    }

})

app.post('/clear-cart', async (req, res) => {
    cart.cart_products = []
    return res.status(200).send("Cart is cleared")
})

app.post("/add_to_wishlist", (req, res) => {
    const keyword = req.body.product_name
    console.log(keyword)
    const str_keyword = String(keyword)
    const search_list = all_vegetable.vegetables

    let search_result
    for (let i = 0; i < search_list.length; i++) {
        console.log("product ", search_list[i])
        // Check if the product name contains the keyword (case-insensitive)

        if (search_list[i].name.toLowerCase() == str_keyword.toLowerCase()) {
            search_result = search_list[i];
            break
        }
    }
    console.log("search result", search_result)
    const isInwishlist = wishlist.wishlist_products.some(product => product.pid === search_result.pid);

    if (!isInwishlist) {
        // Add the product to the cart if it is not already present
        wishlist.wishlist_products.push(search_result);
        res.status(200).send(`${search_result.name} added successfully to wishlist`);
    } else {
        // Send a response indicating that the product is already in the cart
        res.status(200).send(`${search_result.name} is already present in wishlist`);
    }

})

app.post("/edit-vegetable", async (req, res) => {
    try {
        const { pid, name, desc, stock, category, price, vender_name, status } = req.body;
        const product_data = {
            pid,
            name,
            desc,
            stock,
            category,
            price,
            vender_name,
            status
        };
        await updateDocument("product", pid, product_data)
        res.status(200).send("Product updated successfully")
    }
    catch (err) {
        res.status(500).send("Internal server error")
    }
})



app.get("/vendor-vegetable/:id", async (req, res) => {
    try {
        const vendorId = req.params.id; // Convert id to an integer
        const vegetablesRef = db.collection("vegetable"); // Replace with your collection name
        const querySnapshot = await vegetablesRef.where("vendor_id", "==", vendorId).get();

        if (querySnapshot.empty) {
            return res.status(404).json({ message: "No vegetables found for this vendor." });
        }

        const vegetables = [];
        querySnapshot.forEach((doc) => {
            vegetables.push(doc.data());
        });

        res.status(200).json(vegetables);
    } catch (error) {
        console.error("Error fetching vendor vegetables:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/vendor-details/:id", async (req, res) => {
    try {
        const vendorId = parseInt(req.params.id)
        const data = await readDocument('vendors', String(vendorId))
        res.status(200).send(data)
    } catch (error) {
        console.error("Error fetching vendor vegetables:", error);
        res.status(500).json({ error: "Internal server error" });
    }

})

app.put("/update-stock/:vegetableId", async (req, res) => {
    try {
        const { vegetableId } = req.params;
        let { stock } = req.body; // Expecting stock as a string in request body

        if (!stock || isNaN(stock)) {
            return res.status(400).json({ error: "Stock value must be a valid number string" });
        }

        stock = parseInt(stock, 10); // Convert stock from string to integer

        const vegetableRef = db.collection("vegetable").doc(vegetableId);
        const vegetableDoc = await vegetableRef.get();

        if (!vegetableDoc.exists) {
            return res.status(404).json({ message: "Vegetable not found" });
        }

        // Get current stock from Firestore (stored as a string)
        const currentStock = vegetableDoc.data().stock;
        const updatedStock = (parseInt(currentStock, 10) || 0) + stock; // Ensure numeric calculation

        // Update stock in Firestore as a string
        await vegetableRef.update({
            stock: updatedStock.toString()
        });

        res.status(200).json({ message: "Stock updated successfully", updatedStock });
    } catch (error) {
        console.error("Error updating stock:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.use('/api/places', placesRoute);

app.use(ClerkExpressWithAuth());

app.post('/api/profile', async (req, res) => {
  try {
    // After Clerk middleware, req.auth contains the authenticated user info.
    const { userId: clerkUserId } = req.auth;
    
    if (!clerkUserId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Extract data from the request body using destructuring
    const { email, phone, bloodGroup, diseases, emergencyContacts, aadharDetails } = req.body;
    
    // Optionally, add further verification that the email from Clerk matches the one provided.
    
    // Save the user data to Firestore using the Clerk user ID as the document ID.
    await db.collection('users').doc(clerkUserId).set({
      email,
      phone,
      bloodGroup,
      diseases,
      emergencyContacts,
      aadharDetails,
      createdAt: new Date().toISOString(),
    });
    
    res.status(200).json({ message: 'Profile saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

httpserver.listen(3000, () => {
    console.log("server is running on port 3000")
})

export { io }
