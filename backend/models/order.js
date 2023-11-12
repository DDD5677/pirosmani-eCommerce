const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
   {
      orderItems: [
         {
            type: mongoose.Schema.Types.ObjectId,
            ref: "OrderItem",
            required: [true, "Basket is empty!"],
         },
      ],
      name: {
         type: String,
         required: [true, "Please enter a name"],
      },
      shippingAdress1: {
         type: String,
         required: [true, "Please enter your adress"],
      },
      shippingAdress2: {
         type: String,
      },
      city: {
         type: String,
         required: [true, "Please enter your city"],
      },
      comment: {
         type: String,
         default: "",
      },
      phone: {
         type: String,
         required: [true, "Please enter your phone"],
      },
      status: {
         type: String,
         required: true,
         default: "Pending",
      },
      totalPrice: {
         type: Number,
      },
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },
      typeOrder: {
         type: String,
         required: true,
         default: "Deliver", //or 'Pickup'
      },
      datePickup: {
         type: String,
         default: "",
      },
   },
   { timestamps: true }
);

orderSchema.virtual("id").get(function () {
   return this._id.toHexString();
});
orderSchema.set("toJSON", {
   virtuals: true,
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
