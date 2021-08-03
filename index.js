const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.get("/", (req, res) => {
    res.send("Welcome to My Portfolio Backend");
})

const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "kotwani953@gmail.com",
        pass: "Palak2211"
    }
});

contactEmail.verify((error) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log("Ready to send the Mail");
    }
})

router.post("/contact", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    const mail = {
        from: name,
        to: "kotwani953@gmail.com",
        subject: "Contact Us Form",
        html: `<p>Name:${name}</p>
        <p>Email:${email}</p>
        <p>Message:${message}</p>
        `
    }

    contactEmail.sendMail(mail, (error) => {
        if (error)
            res.json({ status: "ERROR" });
        else
            res.json({ status: "Message Sent" });
    });
});
app.listen(5000, () => {
    console.log(`Server is up and Running!!`);
})
