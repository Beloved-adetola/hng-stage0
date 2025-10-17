import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
app.use(cors());

app.get("/me", async (req, res) => {
  try {
    const response = await axios.get("https://catfact.ninja/fact", {
      timeout: 5000,
    });

    const catFact = response.data.fact;

    const payload = {
      status: "success",
      user: {
        name: "Adetola Beloved",
        email: "belovedadetola@gmail.com",
        stack: "Node.js/Express",
      },
      timestamp: new Date().toISOString(),
      fact: catFact,
    };
    res.status(200).json(payload);
  } catch (error) {
    console.error("Error fetching cat fact: ", error.message);

    res.status(200).json({
      status: "success",
      user: {
        name: "Adetola Beloved",
        email: "belovedadetola@gmail.com",
        stack: "Node.js/Express",
      },
      timestamp: new Date().toISOString(),
      fact: "Cats are mysterious, but our fact service is currently unavailable.",
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
