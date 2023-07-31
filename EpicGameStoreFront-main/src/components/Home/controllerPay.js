
const renderPaymentBrick = async (bricksBuilder) => {
  const settings = {
    initialization: {
      /*
       "amount" es el monto total a pagar por todos los medios de pago con excepción de la Cuenta de Mercado Pago y Cuotas sin tarjeta de crédito, las cuales tienen su valor de procesamiento determinado en el backend a través del "preferenceId"
      */
      amount: 100,
      preferenceId: "<PREFERENCE_ID>",
    },
    customization: {
      paymentMethods: {
        ticket: "all",
        creditCard: "all",
        debitCard: "all",
        mercadoPago: "all",
      },
    },
    callbacks: {
      onReady: () => {
        /*
         Callback llamado cuando el Brick está listo.
         Aquí puede ocultar cargamentos de su sitio, por ejemplo.
        */
      },
      onSubmit: ({ selectedPaymentMethod, formData }) => {
        // callback llamado al hacer clic en el botón enviar datos
        return new Promise((resolve, reject) => {
          fetch("/process_payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          })
            .then((response) => response.json())
            .then((response) => {
              // recibir el resultado del pago
              resolve();
            })
            .catch((error) => {
              // manejar la respuesta de error al intentar crear el pago
              reject();
            });
        });
      },
      onError: (error) => {
        // callback llamado para todos los casos de error de Brick
        console.error(error);
      },
    },
  };
  window.paymentBrickController = await bricksBuilder.create(
    "payment",
    "paymentBrick_container",
    settings
  );
 };
 renderPaymentBrick(bricksBuilder);
 