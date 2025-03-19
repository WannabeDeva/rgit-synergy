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
import axios from "axios"


const app = express()
const httpserver = createServer(app)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({ origin: true }));

const upload = multer({ storage: multer.memoryStorage() })

// const all_vegetable = {
//     "vegetables": []
// }

// const all_vendors = {
//     "vendors": []
// }

let profile = {}

async function getUserProfile() {
    profile = await readDocument('users', 'user_2uVOAnN74OXrAmkb6BvcNERddW1')
}


export const nearby_hospitals = {
    "nearby_hospitals" : []
}

await getUserProfile()

// async function fetch_all_vegetable() {
//     console.log("fetching all products")
//     all_vegetable.vegetables = await fetchAllDocuments("vegetable")
//     console.log(all_vegetable)
// }

// async function fetch_previous_orders() {
//     console.log("fetching all orders")
//     profile.previous_orders = await fetchAllDocuments("orders")
// }

// async function fetch_all_vendors() {
//     console.log("fetch all vendors")
//     all_vendors.vendors = await fetchAllDocuments('vendors')
// }

// await fetch_all_vegetable()
// await fetch_previous_orders()
// await fetch_all_vendors()

// console.log("all_vegetables", all_vegetable)

// const cart = {
//     "cart_products": [
//         {
//             "pid": "pid1738153754889",
//             "name": "Spinach",
//             "desc": "Rich in iron and vitamins. Boosts immunity and strengthens bones.",
//             "stock": 55,
//             "category": "Vegetable",
//             "price": 20,
//             "vendor_name": "Fresh Farms",
//             "status": true,
//             "vendor_id": 1,
//             "vendor_rating": 4.5,
//             "images": ['https://storage.googleapis.com/tsechacks-14a28.firebasestorage.app/vegetable/pid1738153754889/1'],
//             "unit": "bundle",
//             "qauntity": 1

//         },
//         {
//             "pid": "pid1738153871686",
//             "name": "Apple",
//             "desc": "Sweet and crispy red apples. Packed with antioxidants and fiber.",
//             "stock": 80,
//             "category": "Fruit",
//             "price": 150,
//             "vendor_name": "Green Harvest",
//             "status": true,
//             "vendor_id": 2,
//             "vendor_rating": 4.5,
//             "images": ['https://storage.googleapis.com/tsechacks-14a28.firebasestorage.app/vegetable/pid1738153871686/1'],
//             "unit": "kg",
//             "qauntity": 1
//         },
//     ]
// }

// const wishlist = {
//     "wishlist_products": [
//         {
//             "pid": "pid1738154087920",
//             "name": "Grapes",
//             "desc": "Fresh and seedless green grapes. Perfect for snacking and juices.",
//             "stock": 70,
//             "category": "Fruit",
//             "price": 90,
//             "vendor_name": "Fresh Farms",
//             "status": true,
//             "vendor_id": 1,
//             "vendor_rating": 4.5,
//             "images": ['https://storage.googleapis.com/tsechacks-14a28.firebasestorage.app/vegetable/pid1738154087920/1'],
//             "unit": "kg"
//         }
//     ]
// }


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
                text: `You are a personal assistant named MedHelper, designed to assist users with medical-related inquiries. Your primary function is to provide information about nearby hospitals and pharmacies. When a user searches for a hospital or pharmacy, you must strictly respond in the following JSON format:
                {
  "data-type": "JSON",
  "type":"hospital || pharmacy",
  "search_result": [{hospital1}, {hospital2}, ...],  
  "summary": ""
}
The search_result should contain complete details only for hospitals and pharmacies available in the given dataset. The summary should provide a quick overview of the results, it should include some of the hospital names. Your response should strictly adhere to this JSON format without any additional text, formatting, or special characters.

Beyond location-based assistance, you also provide first aid guidance and basic diagnostic suggestions based on symptoms described by the user. If a user mentions symptoms, you can offer general insights into possible causes but must clarify that this is not a substitute for professional medical advice. Your responses should be clear, concise, and focused on delivering helpful medical information.

Additionally, users can navigate through different sections of the platform by requesting specific pages. If a user asks to navigate, respond with the command: open PageName. The available pages include home, emergencySos (for immediate medical help), hospital_locator (to find nearby hospitals and pharmacies), symptom_checker (for basic symptom analysis), first_aid_guide (for emergency instructions), medical_records (to manage health data), and community (for discussions and support). If the user says "help" twice (e.g., "help help"), you must immediately emit the command HELP. Your goal is to provide precise, reliable, and accessible medical assistance while ensuring users receive accurate and structured information.
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
            { text: JSON.stringify(nearby_hospitals) },
        ],
    },
    {
        role: "model",
        parts: [
            { text: "Hello, I am your personal medical assistant. How may I assist you?" },
        ],
    },
]


        const chatSession = AImodel.startChat({
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

app.get('/profile', (req, res) => {
    res.status(200).json(profile)
})

app.post("/create-sos", async (req, res) => {
    const { userId, location, lat, long, heartRate = 'N/A', bloodPressure = 'N/A', Spo2 = 'N/A', priority = 'medium', cause = 'Trauma' } = req.body
    const date = Date.now()
    const emergencyId = `E-${String(date).slice(9, 12)}`
    const status = "pending"

    
    
    const userData = await readDocument('users', userId);

    const emergency_data = {
        emergencyId, userId, name : userData.username, location, lat, long, heartRate, bloodPressure, Spo2, priority, status, cause, date : Date.now()
    }

    await createOrUpdateDocument('emergencies', emergencyId, emergency_data);

    const message = `${userData.username || ''} is in emergency at ${location}`

    await client.messages
        .create({
            body: message,
            from: '+18453779534',
            to: `+919967855433`
        })

    await client.messages
        .create({
            body: message,
            from: '+18453779534',
            to: '+919321543686' // Replace with your second number
        });

    res.status(200).send("Emergency created successfully")
})

app.get("/get-emergency-data/:id", async (req, res) => {
    const emergencyId = req.params.id;
    console.log(emergencyId)
    const emergencyData = await readDocument('emergencies', emergencyId)
    const userData = await readDocument('users', emergencyData.userId)

    const complete_data = {...emergencyData, user : userData}

    res.status(200).send(complete_data)
})

app.get("/all-emergency", async (req, res) => {
    const emergencyData = await fetchAllDocuments('emergencies')

    res.status(200).send(emergencyData)
})

app.post("/create-call", async(req, res) => {
    const {doctor, symptoms} = req.body;
    const videoCallId = String(Date.now());
    const videoCallData = { doctor, symptoms, date : Date.now(), meetLink : 'https://console-api-sig.zegocloud.com/s/uikit/QnqQrm'}
    await createOrUpdateDocument('videoCall', videoCallId, videoCallData)
    res.status(200).send("Video Call created successfully")

})

app.get("/all-calls", async(req, res) => {
    const videoCallData = await fetchAllDocuments('videoCall')
    res.status(200).send(videoCallData)
})


app.use('/api/places', placesRoute);

app.use(ClerkExpressWithAuth());

//Scraping
app.post('/api/search', async (req, res) => {
    try {
      const { query , page = 0, hitsPerPage = 12 } = req.body;
  
      if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
      }
  
      // Netmeds Algolia search URL
      const url = 'https://0z9q3se3dl-dsn.algolia.net/1/indexes/*/queries';
  
      // Headers
      const headers = {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'x-algolia-api-key': 'daff858f97cc3361e1a3f722e3729753',
        'x-algolia-application-id': '0Z9Q3SE3DL'
      };
  
      // Payload
      const payload = {
        requests: [
          {
            indexName: 'prod_meds',
            params: `clickAnalytics=true&facets=["in_stock","categories","brand","manufacturer_name","algolia_facet.Benefits","algolia_facet.Product Characteristic","algolia_facet.Skin Concern","algolia_facet.Skin Type","selling_price","discount_pct"]&highlightPostTag=/ais-highlight&highlightPreTag=ais-highlight&hitsPerPage=${hitsPerPage}&maxValuesPerFacet=50&page=${page}&query=${encodeURIComponent(query)}`
          }
        ]
      };
  
      // Make the request to Algolia
      const response = await axios.post(url, payload, { headers });
  
      // Extract product data from the response
      const products = extractProductData(response.data);
  
      // Send the products array in the response
      res.json(products);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'An error occurred while processing your request' });
    }
  });
  
  const extractProductData = results => {
    if (!results?.results?.[0]?.hits) {
      return [];
    }
  
    const { hits } = results.results[0];
    
    return hits.map(hit => ({
      id: hit.product_code || '',
      name: hit.display_name || '',
      url: hit.url_path ? `https://www.netmeds.com/${hit.url_path}` : '',
      price: hit.selling_price || 0,
      mrp: hit.mrp || 0,
      discount: hit.discount_pct || 0,
      manufacturer: hit.manufacturer_name || '',
      in_stock: hit.in_stock || false,
      categories: hit.categories || [],
      image_url: hit.image_url || ''
    }));
  };

// User Profile
app.post('/api/profile', async (req, res) => {
  try {
    // After Clerk middleware, req.auth contains the authenticated user info.
    const { userId: clerkUserId } = req.auth;
    
    if (!clerkUserId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { email, phone, bloodGroup, diseases, emergencyContacts, aadharDetails, username, age} = req.body;
 
    await db.collection('users').doc(clerkUserId).set({
      username,
      age,
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
