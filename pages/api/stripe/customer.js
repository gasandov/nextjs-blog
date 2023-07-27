import stripe from "stripe";

const instance = stripe(
  "sk_test_51JpjA1DcfucCelYRTReEH8iyty3Qqff7lmx8XtyUDvIWGreNTqnqM9lJTbfKIIckhxt9Cr2Lom8rDNAI5h1Lvbku00JeQLJdBk"
);

export default async function (req, res) {
  return new Promise(async (resolve) => {
    switch (req.method) {
      case "GET":
        try {
          const { id } = req.query;
          const customer = await instance.customers.retrieve(id);
          res.status(200).send(customer).end();
        } catch (error) {
          res.status(500).end();
          return resolve();
        }
        break;
      case "POST":
      case "OPTION": {
        try {
          const customer = await instance.customers.create();
          res.status(200).send(customer).end();
        } catch (error) {
          res.status(500).end();
          return resolve();
        }
      }
    }
    res.status(405).end();
    return resolve();
  });
}
