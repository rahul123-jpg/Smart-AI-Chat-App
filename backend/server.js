  import express from "express";
  import dotenv from "dotenv";
  import cors from "cors"
  import mongoose from "mongoose";
  import chatRoutes from "./routes/Chat.js";
  import authRoutes from "./routes/auth.js"; 
  import session from "express-session";
import passport from "./config/passport.js";


  dotenv.config();


  const app = express();
  app.use(express.json());
  
 app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://smart-ai-chat-app4c.netlify.app",
    "https://6985ac6372da5d0ddf2e68d2--smart-ai-chat-app4c.netlify.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


// 👉 SESSION SETUP
app.use(
  session({
    secret:  process.env.SESSION_SECRET,       
    resave: false,
    saveUninitialized: false,
      cookie: { secure: false }
  })
);

// 👉 PASSPORT INIT
app.use(passport.initialize());
app.use(passport.session());


  app.use("/api",chatRoutes)
  app.use("/api", authRoutes); 
  
  const PORT=8080

  app.listen(PORT, () =>{
    console.log(`Server running on ${PORT}` )
  connectDB()
  })


  const connectDB=async()=>{
    try{
      await mongoose.connect(process.env.MONGODB_URL)
      console.log("connected succesfuly");
      
    }catch(err){
      console.log("failed to connect to db",err);
      
    }
  }


// const MODEL = "models/gemini-2.5-flash";
// const API_KEY = process.env.GEMINI_API_KEY;

// app.post("/chat", async (req, res) => {
//   try {
//     const userMessage = req.body.message;

//     const response = await fetch(
//       `https://generativelanguage.googleapis.com/v1/${MODEL}:generateContent?key=${API_KEY}`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           contents: [
//             {
//               parts: [{ text: userMessage }],
//             },
//           ],
//         }),
//       }
//     );

//     const data = await response.json();

//     res.json({
//       reply: data.candidates[0].content.parts[0].text,
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Something went wrong" });
//   }
// });

