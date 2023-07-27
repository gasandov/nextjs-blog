import Stripe from "stripe";

class StripeSingleton {
  static instance;
  stripeInstance;

  constructor() {
    this.stripeInstance = Stripe(
      "sk_test_51JpjA1DcfucCelYRTReEH8iyty3Qqff7lmx8XtyUDvIWGreNTqnqM9lJTbfKIIckhxt9Cr2Lom8rDNAI5h1Lvbku00JeQLJdBk"
    );
  }

  static getInstance() {
    if (!StripeSingleton.instance) {
      StripeSingleton.instance = new StripeSingleton();
    }

    return StripeSingleton.instance;
  }

  getStripeInstance() {
    return this.stripeInstance;
  }

  async createCustomer(email) {
    const customer = await this.stripeInstance.customers.create({
      email,
    });

    return customer;
  }

  async getCustomerPaymentMethods(customerId, type) {
    const methods = await this.stripeInstance.paymentMethods.list({
      customer: customerId,
      type,
    });

    return methods;
  }

  async getPaymentIntent(paymentIntentId) {
    const paymentIntent = await this.stripeInstance.paymentIntents.retrieve(
      paymentIntentId
    );

    return paymentIntent;
  }

  async createPaymentIntent({
    amount,
    currency,
    customerId,
    automaticPaymentMethods = false,
  }) {
    const paymentIntent = await this.stripeInstance.paymentIntents.create({
      amount,
      currency,
      customer: customerId,
      setup_future_usage: "on_session",
      ...(automaticPaymentMethods && {
        automatic_payment_methods: {
          enabled: true,
        },
      }),
    });

    return paymentIntent;
  }

  async cancelPaymentIntent(paymentIntentId) {
    const paymentIntent = await this.stripeInstance.paymentIntents.cancel(
      paymentIntentId
    );

    return paymentIntent;
  }

  async confirmPaymentIntentWithPaymentMethod(
    paymentIntentId,
    paymentMethodId
  ) {
    const updatedPaymentIntent =
      await this.stripeInstance.paymentIntents.confirm(paymentIntentId, {
        payment_method: paymentMethodId,
      });

    return updatedPaymentIntent;
  }

  async getPaymentMethod(paymentMethodId) {
    const paymentMethod = await this.stripeInstance.paymentMethods.retrieve(
      paymentMethodId
    );

    return paymentMethod;
  }

  async createPaymentMethod({ type, card }) {
    const paymentMethod = await this.stripeInstance.paymentMethods.create({
      type,
      card,
    });

    return paymentMethod;
  }

  async attachPaymentMethodToCustomer(paymentMethodId, customerId) {
    const updatedPaymentMethod =
      await this.stripeInstance.paymentMethods.attach(paymentMethodId, {
        customer: customerId,
      });

    return updatedPaymentMethod;
  }

  async detachPaymentMethodFromCustomer(paymentMethodId) {
    const updatedPaymentMethod =
      await this.stripeInstance.paymentMethods.detach(paymentMethodId);

    return updatedPaymentMethod;
  }

  async deletePaymentMethod(paymentMethodId) {
    const paymentMethod = await this.stripeInstance.paymentMethods.detach(
      paymentMethodId
    );

    return paymentMethod;
  }
}

const stripeSingleton = StripeSingleton.getInstance();

export default stripeSingleton;
