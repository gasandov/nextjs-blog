import stripe from "stripe";

const instance = stripe(
  "sk_test_51JpjA1DcfucCelYRTReEH8iyty3Qqff7lmx8XtyUDvIWGreNTqnqM9lJTbfKIIckhxt9Cr2Lom8rDNAI5h1Lvbku00JeQLJdBk"
);

export default (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      // Get data from your database
      get(req, res);
      break;
    case "POST":
      post(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

async function get(req, res) {
  const { id } = req.query;

  try {
    const customer = await instance.customers.retrieve(id);
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function post(req, res) {
  try {
    const customer = await instance.customers.create();
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error });
  }
}
