const nodemailer = require("nodemailer");

function sendRegisterMail(req, res) {
  let { email } = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    post: 465,
    secure: true,
    auth: {
      user: "epicgames.store.pf2023@gmail.com",
      pass: "rinmzsbkfezkmlew",
    },
  });

  const htmlContent = `
  <h1>Bienvenido a Epic Games Store.</h1>
  <img src="https://esports.as.com/2023/03/16/counter-strike--global-offensive/CSGO-sigue-categoria_1665743414_1125508_1440x600.jpg" alt="imagen de agradecimiento" style="width: 800px; height: auto;" />
  <p> ¡Te registraste con éxito!</p>
  <p> Ya puedes continuar navegandon por nuestra tienda.</p>
`;

  const mailOptions = {
    from: "Epic Games Store",
    to: `${email}`,
    subject: "enviado desde Epic Games Store.",
    text: "¡Registro exitoso!",
    html: htmlContent,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      console.log("email enviado");
      res.status(200).json(req.body);
    }
  });
}

function sendPaymentSuccessMail(req, res) {
  let { email } = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    post: 465,
    secure: true,
    auth: {
      user: "epicgames.store.pf2023@gmail.com",
      pass: "rinmzsbkfezkmlew",
    },
  });

  const htmlContent2 = `
  <h1>¡Muchas gracias por tu compra</h1>
  <img src="https://www.chiquipedia.com/images/fondos-videojuegos-sonic.jpg?phpMyAdmin=9ea091c51a5aa3cf876fb3cf0a5f7f3d" alt="imagen de agradecimiento" style="width: 800px; height: 600;" />
  <p>¡Gracias por confiar en nosotros!</p>
  <p>¡Disfruta tu videojuego!</p>
`;

  const mailOptions2 = {
    from: "Epic Games Store",
    to: `${email}`,
    subject: "enviado desde Epic Games Store.",
    text: "¡Pago exitoso!",
    html: htmlContent2,
  };

  transporter.sendMail(mailOptions2, (error, info) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      console.log("email enviado");
      res.status(200).json(req.body);
    }
  });
}

module.exports = {
  sendRegisterMail,
  sendPaymentSuccessMail,
};
