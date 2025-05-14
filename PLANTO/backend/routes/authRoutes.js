import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// 🔹 REGISTER
router.post("/register", upload.single("profileImage"), async (req, res) => {
  try {
    const { firstname, lastname, email, phone, password } = req.body;
    const profileImage = req.file ? req.file.filename : null;

    if (!firstname || !lastname || !email || !phone || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstname, lastname, email, phone, password: hashedPassword, profileImage });

    await newUser.save();
    console.log("New user registered:", newUser);

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user: {
        email: newUser.email,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        profileImage: newUser.profileImage ? `http://localhost:5173/uploads/${newUser.profileImage}` : null,
      },
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Server error, please try again!" });
  }
});

// 🔹 LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found, please register" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }

    res.json({
      success: true,
      message: "Login successful!",
      user: {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        profileImage: user.profileImage ? `http://localhost:5173/uploads/${user.profileImage}` : null,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/plants", (req, res) => {
  res.json([ {
      "id": 1,
      "image": "https://png.pngtree.com/png-vector/20240127/ourmid/pngtree-cartoon-beautiful-tulsi-plant-design-png-image_11584723.png",
      "name": "Tulsi",
      "description": "Sacred herb with healing powers, worshipped in Indian homes.",
      "price": 49
    },
    {
      "id": 2,
      "image": "https://pngimg.com/d/tree_PNG92749.png",
      "name": "Neem",
      "description": "Bitter medicinal tree used widely in Indian natural remedies.",
      "price": 89
    },
    {
      "id": 3,
      "image": "https://static.vecteezy.com/system/resources/previews/048/046/840/non_2x/aloe-vera-plant-in-pot-on-transparent-background-free-png.png",
      "name": "Aloe Vera",
      "description": "Succulent plant with soothing gel used in traditional medicine.",
      "price": 75
    },
    {
      "id": 4,
      "image": "https://png.pngtree.com/png-vector/20240731/ourmid/pngtree-banana-tree-plant-png-image_13315512.png",
      "name": "Banana Plant",
      "description": "Tropical plant offering fruit and leaves for cooking, rituals.",
      "price": 120
    },
    {
      "id": 5,
      "image": "https://images.jdmagicbox.com/quickquotes/images_main/alphonso-mango-plant-for-garden-green-2222678765-dw7yyeui.png",
      "name": "Mango Tree",
      "description": "Famous Indian fruit tree, symbol of love and prosperity.",
      "price": 199
    },
    {
      "id": 6,
      "image": "https://syedgarden.in/wp-content/uploads/2022/10/hibiscus-orange.png",
      "name": "Hibiscus",
      "description": "Bright flowering plant often offered in prayers to deities.",
      "price": 60
    },
    {
      "id": 7,
      "image": "https://www.pngplay.com/wp-content/uploads/9/Lemongrass-PNG-Pic-Background.png",
      "name": "Lemongrass",
      "description": "Fragrant grass used in tea, medicine, and mosquito repellent.",
      "price": 55
    },
    {
      "id": 8,
      "image": "https://images.jdmagicbox.com/quickquotes/images_main/marigold-flower-plant-for-garden-2223267089-f2cmukep.png",
      "name": "Marigold",
      "description": "Popular yellow-orange flowers used in garlands and rituals.",
      "price": 40
    },
    {
      "id": 9,
      "image": "https://www.mandalanaturals.com/wp-content/uploads/2019/03/ashwagandha-Chocolate-Ingredients.png",
      "name": "Ashwagandha",
      "description": "Ancient Indian herb known for boosting energy and immunity.",
      "price": 130
    } ]);
});

app.get("/Populer", (req, res) => {
  res.json([  {
      "id": 1,
      "image": "https://png.pngtree.com/png-vector/20240728/ourmid/pngtree-city-greens-sow-and-grow-thai-basil-plant-png-image_13236051.png",
      "name": "Basil",
      "description": "Aromatic herb used in cooking and traditional remedies.",
      "price": 45
    },
    {
      "id": 2,
      "image": "https://static.vecteezy.com/system/resources/previews/051/989/695/non_2x/potted-red-rose-plant-free-png.png",
      "name": "Rose",
      "description": "Beautiful flowering plant symbolizing love and elegance.",
      "price": 70
    },
    {
      "id": 3,
      "image": "https://static.vecteezy.com/system/resources/thumbnails/044/245/774/small_2x/green-cactus-in-a-brown-pot-isolated-on-a-clean-background-png.png",
      "name": "Cactus",
      "description": "Low-maintenance desert plant that thrives in dry climates.",
      "price": 35
    },
    {
      "id": 4,
      "image": "https://static.vecteezy.com/system/resources/thumbnails/057/127/868/small/realistic-snake-plant-in-a-white-pot-on-a-transparent-background-free-png.png",
      "name": "Snake Plant",
      "description": "Air-purifying indoor plant known for its upright leaves.",
      "price": 95
    },
    {
      "id": 5,
      "image": "https://png.pngtree.com/png-vector/20240320/ourmid/pngtree-orchid-elegance-in-a-pot-on-transparent-background-png-image_12016667.png",
      "name": "Orchid",
      "description": "Exotic flowering plant loved for its delicate blooms.",
      "price": 150
    },
    {
      "id": 6,
      "image": "https://static.vecteezy.com/system/resources/previews/046/567/387/non_2x/fern-plant-with-intricate-fronds-free-png.png",
      "name": "Fern",
      "description": "Lush green plant often used for indoor decor.",
      "price": 55
    },
    {
      "id": 7,
      "image": "https://static.vecteezy.com/system/resources/previews/051/419/507/non_2x/a-bamboo-plant-with-leaves-on-it-free-png.png",
      "name": "Bamboo",
      "description": "Lucky plant believed to bring prosperity and harmony.",
      "price": 80
    },
    {
      "id": 8,
      "image": "https://static.vecteezy.com/system/resources/thumbnails/051/320/770/small/lavender-flowers-in-a-pot-on-a-white-background-png.png",
      "name": "Lavender",
      "description": "Fragrant herb used in aromatherapy and skincare.",
      "price": 65
    },
    {
      "id": 9,
      "image": "https://png.pngtree.com/png-vector/20231113/ourmid/pngtree-chilli-plant-spice-png-image_10434104.png",
      "name": "Pepper Plant",
      "description": "Spicy vegetable plant often grown in home gardens.",
      "price": 90
    } ]);
});


export default router;
