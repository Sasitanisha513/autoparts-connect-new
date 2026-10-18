const mongoose = require("mongoose");
const Article = require("./models/Article");

const MONGO_URI = "mongodb://127.0.0.1:27017/autoparts_connect";

const sampleArticles = [
  {
    title: "How to Choose the Right Brake Pads",
    content:
      "Learn how to choose quality brake pads that improve safety, braking performance and durability.",
    author: "AutoParts Connect",
    category: "Maintenance",
    image: ""
  },

  {
    title: "5 Signs Your Car Battery Needs Replacement",
    content:
      "Find out the warning signs of a weak battery before it leaves you stranded on the road.",
    author: "AutoParts Connect",
    category: "Battery",
    image: ""
  },

  {
    title: "Why Regular Engine Oil Changes Matter",
    content:
      "Changing engine oil regularly protects your engine and improves fuel efficiency.",
    author: "AutoParts Connect",
    category: "Engine",
    image: ""
  },

  {
    title: "How to Replace Your Air Filter",
    content:
      "A clean air filter keeps your engine healthy and increases fuel economy.",
    author: "AutoParts Connect",
    category: "Maintenance",
    image: ""
  },

  {
    title: "Choosing the Best Headlights",
    content:
      "Compare LED, HID and Halogen headlights for safer night driving.",
    author: "AutoParts Connect",
    category: "Lighting",
    image: ""
  },

  {
    title: "Radiator Maintenance Tips",
    content:
      "Simple radiator maintenance tips to prevent engine overheating.",
    author: "AutoParts Connect",
    category: "Cooling",
    image: ""
  }
];

const seedArticles = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("MongoDB connected.");

    const existingArticles = await Article.countDocuments();

    if (existingArticles > 0) {
      console.log(
        "Articles already exist. No sample articles were added."
      );

      await mongoose.connection.close();
      return;
    }

    await Article.insertMany(sampleArticles);

    console.log(
      "6 sample blog articles added successfully."
    );

    await mongoose.connection.close();

  } catch (error) {

    console.error(
      "Error adding sample articles:",
      error
    );

    process.exit(1);
  }
};

seedArticles();