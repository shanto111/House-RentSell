const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51Q1RstP9IGsP6B9fYnTkNLbMiurgQwRZkRmAS6lrfyVc80v2PaFujH2eng2lMV3J5WLnAqSQsfoWFrBnv1Ob6ewb00gPsWs8ZU"
);
const cron = require("node-cron");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

const uri =
  "mongodb+srv://hasibulHasan:qlqkZJZ987guZEk2@cluster0.m26rrk8.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const database = client.db("houseRent");
    const PropertyCollections = database.collection("propertys");
    const UserCollections = database.collection("users");
    const BookingCollections = database.collection("BookingInfo");
    const paymentCollections = database.collection("paymentInfo");

    console.log("form env", process.env.EMAIL_USER);

    //milddleware

    //setup nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    //send every 1-3 day mail
    const sendRentReminderEmail = (email) => {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Monthly Rent Reminder",
        text: `Dear ${email},\n\nThis is a reminder to pay your rent for this month.\n\nPlease make sure the payment is completed between 1st and 10th.\n\nThank you!`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error sending email:", error);
        } else {
          console.log("Rent reminder email sent: " + info.response);
        }
      });
    };

    // cron.schedule("* * * * *", async () => {
    //   // const email = BookingCollections.find({status : approve})
    //   const email = "mdhasibulhasan165@gmail.com";
    //   sendRentReminderEmail(email);
    //   console.log("Rent reminder emails sent successfully");
    // });

    //sned after payment email
    const sendPaymentConfirmation = (email, amount, transactionId) => {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Payment Confirmation - House Payment",
        text: `Dear ${email},

We are pleased to inform you that your rent payment of $${(
          amount / 100
        ).toFixed(
          2
        )} has been successfully processed. Please find the details of your payment below:

Transaction Details:
- Amount Paid: ${(amount / 100).toFixed(2)}
- Transaction ID: ${transactionId}

If you have any questions or concerns regarding this transaction, please feel free to contact our support team at support@renthousesystem.com.

Thank you for choosing our service!

Best regards,
The House Rent Management Team
${process.env.EMAIL_USER}
`,
      };
      console.log("paymnet email", mailOptions);
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error sending email:", error);
        } else {
          console.log("Payment confirmation email sent: " + info.response);
        }
      });
    };
    //verify admin
    const verifyadmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await UserCollections.findOne(query);
      const admin = user?.role === "admin";
      if (!admin) {
        return res.status(401).send({ message: "invalid email" });
      }
      next();
    };
    //verify token
    const verifyToken = (req, res, next) => {
      // console.log("from middleware", req.headers.authorization);
      if (!req.headers.authorization) {
        return res.status(401).send({ message: "no authorization" });
      }
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: "invalid token" });
        }
        req.decoded = decoded;
        next();
      });
    };

    //jwt token generate
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "1h",
      });
      console.log(token);
      res.send({ token });
    });

    //make admin role
    app.patch("/users/:id", verifyToken, verifyadmin, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateRole = {
        $set: { role: "admin" },
      };
      const result = await UserCollections.updateOne(filter, updateRole);
      res.send(result);
    });
    //make admin data
    app.get("/users/:email", async (req, res) => {
      const email = req.params.email;
      console.log(email);
      // if (!req.decoded || req.decoded.email !== email) {
      //   return res.status(401).send({ message: "invalid email" });
      // }
      // if (email !== req.decoded.email) {
      //   return res.status(401).send({ message: "invalid email" });
      // }
      const query = { email: email };
      const user = await UserCollections.findOne(query);
      let admin = false;
      if (user) {
        admin = user?.role === "admin";
      }
      res.send({ admin });
    });

    //users
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await UserCollections.insertOne(user);
      res.send(result);
      console.log(result);
    });

    app.get("/users", verifyToken, verifyadmin, async (req, res) => {
      const result = await UserCollections.find().toArray();
      res.send(result);
    });

    //access user
    app.get("/user/:email", async (req, res) => {
      const email = req.params.email;

      const filter = { email: email };
      const result = await UserCollections.findOne(filter);
      console.log(result);
      res.send(result);
    });

    app.delete("/users/:id", verifyToken, verifyadmin, async (req, res) => {
      const id = req.params.id;
      console.log("delete from database", id);
      const query = { _id: new ObjectId(id) };
      const result = await UserCollections.deleteOne(query);
      res.send(result);
    });

    //make admin

    //approve
    app.put("/propertys/:id", async (req, res) => {
      const id = req.params.id;
      const result = await PropertyCollections.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status: "Approved" } }
      );
      res.send(result);
    });
    //property delete
    app.delete("/propertys/:id", async (req, res) => {
      const id = req.params.id;
      console.log("delete from database", id);
      const query = { _id: new ObjectId(id) };
      const result = await PropertyCollections.deleteOne(query);
      res.send(result);
    });

    //all property
    app.post("/propertys", async (req, res) => {
      const propertys = req.body;
      const result = await PropertyCollections.insertOne(propertys);
      res.send(result);
    });

    app.patch("/properties/:id", async (req, res) => {
      const id = req.params.id;
      const booking = req.body;
      console.log(id);
      console.log(booking);
      try {
        const result = await PropertyCollections.updateOne(
          { _id: new ObjectId(id) }, // Ensure _id is correctly formatted as ObjectId
          { $set: booking },
          { upsert: true } // Use req.body for flexibility in updates
        );
        res.send(result);
        console.log(result);
      } catch (error) {
        res.status(500).send({ error: "Error updating the property" });
      }
    });

    app.get("/propertys", async (req, res) => {
      const page = parseInt(req.query.page) || 0;
      const size = parseInt(req.query.size) || 10;

      try {
        // Use {} as the filter to retrieve all documents
        const result = await PropertyCollections.find({})
          .skip(page * size) // Skip the documents based on the current page
          .limit(size) // Limit the result based on the specified size
          .toArray();

        res.send(result);
      } catch (error) {
        console.error("Error fetching properties:", error);
        res.status(500).send("Server error");
      }
    });

    app.get("/propertyCount", async (req, res) => {
      const count = await paymentCollections.estimatedDocumentCount();
      res.send({ count });
    });

    app.get("/propertys/:id", async (req, res) => {
      const id = req.params.id;
      const result = await PropertyCollections.findOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    //other
    app.get("/addHouse", async (req, res) => {
      const cursor = insertHouse.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/addHouse/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const house = await insertHouse.findOne(query);
      res.send(house);
    });

    app.post("/addHouse", async (req, res) => {
      const data = req.body;
      console.log(data);
      const result = await insertHouse.insertOne(data);
      res.send(result);
    });

    app.delete("/addhouse/:id", async (req, res) => {
      const id = req.params.id;
      console.log("delete from database", id);
      const query = { _id: new ObjectId(id) };
      const result = await insertHouse.deleteOne(query);
      res.send(result);
    });

    //booking relate api
    // POST route to add booking information
    app.post("/bookingInformation", async (req, res) => {
      const { userUid, propertyId } = req.body;

      try {
        console.log("form userid", userUid, propertyId);

        // Check if a booking already exists for this user and property
        const existingBooking = await BookingCollections.findOne({
          userUid,
          propertyId,
        });

        if (existingBooking) {
          return res
            .status(400)
            .send({ message: "You have already booked this house." });
        }

        // Insert new booking if it doesn't already exist
        const bookingInfo = req.body;
        console.log(bookingInfo);
        const result = await BookingCollections.insertOne(bookingInfo);
        res.send(result);
      } catch (error) {
        console.error("Error adding booking:", error);
        res.status(500).send({ message: "Failed to process booking" });
      }
    });

    // GET route to check if the user has already booked a property
    app.get("/bookingInformation/:userId/:houseId", async (req, res) => {
      const { userId, houseId } = req.params;

      try {
        const existingBooking = await BookingCollections.findOne({
          userUid: userId,
          propertyId: houseId,
        });

        if (existingBooking) {
          return res.status(200).send({ isBooked: true });
        } else {
          return res.status(200).send({ isBooked: false });
        }
      } catch (error) {
        console.error("Error checking booking:", error);
        res.status(500).send({ message: "Failed to check booking" });
      }
    });

    app.get("/bookingInformation/:propertyid", async (req, res) => {
      const propertyid = req.params.propertyid;
      console.log(propertyid);
      const filter = { propertyId: propertyid };
      const result = await BookingCollections.find(filter).toArray();
      res.send(result);
    });

    app.put("/bookingInformation/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: { status: "Approved" },
      };
      const result = await BookingCollections.updateOne(filter, updateDoc);
      res.send(result);
    });

    app.get("/bookingInformation", async (req, res) => {
      const result = await BookingCollections.find().toArray();
      res.send(result);
    });

    //payment related api

    app.post("/create-payment-intent", async (req, res) => {
      const { price } = req.body;
      // const { amount, email } = req.body;
      const amamount = parseInt(price * 100);
      const paymentIntent = await stripe.paymentIntents.create({
        // amamount: amamount,
        amount: amamount,
        currency: "usd",
        payment_method_types: ["card"],
      });
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    app.post("/confirm-payment", async (req, res) => {
      const { paymentIntentId, email, amount } = req.body;
      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId
      );
      if (paymentIntent.status === "succeeded") {
        // Send confirmation email with transaction ID
        sendPaymentConfirmation(email, amount, paymentIntentId);
        res.send({ success: true, message: "Payment successful" });
      } else {
        res
          .status(400)
          .send({ success: false, message: "Payment not successful" });
      }
    });

    app.post("/payment", async (req, res) => {
      const payment = req.body;
      console.log(payment);
      const result = await paymentCollections.insertOne(payment);
      res.send(result);
      //TODO : delete
    });

    app.get("/payment/:email", async (req, res) => {
      const query = { email: req.params.email };
      const result = await paymentCollections.find(query).toArray();
      res.send(result);
    });
    app.get("/paymentHistory", async (req, res) => {
      // const query = { email: req.params.email };
      const result = await paymentCollections.find().toArray();
      res.send(result);
    });
    app.get("/paymentHistory/:id", async (req, res) => {
      // const query = { email: req.params.email };
      const result = await paymentCollections.find().toArray();
      res.send(result);
    });

    //admin home
    app.get("/user-stats", async (req, res) => {
      try {
        const propertyCount = await PropertyCollections.countDocuments();
        const userCount = await UserCollections.countDocuments();
        const bookingCount = await BookingCollections.countDocuments();

        res.send({
          totalProperties: propertyCount,
          totalUsers: userCount,
          totalBookings: bookingCount,
        });
      } catch (error) {
        console.error("Error fetching user stats:", error);
        res.status(500).send({ error: "Internal Server Error" });
      }
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (err) {
    console.error(err);
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
