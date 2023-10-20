const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      dsc: {
         type: String,
         required: true,
      },
      richDsc: {
         type: String,
         default: "",
      },
      img: {
         type: String,
         default: "",
      },
      images: [
         {
            type: String,
         },
      ],
      country: {
         type: String,
         default: "",
      },
      price: {
         type: Number,
         default: 0,
      },
      category: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Category",
         required: true,
      },
      countInStock: {
         type: Number,
         required: true,
         min: 0,
         max: 255,
      },
      isFeatured: {
         type: Boolean,
         default: false,
      },
      dateCreated: {
         type: Date,
         default: Date.now,
      },
      ratings: {
         type: mongoose.Mixed,
         1: Number,
         2: Number,
         3: Number,
         4: Number,
         5: Number,
         get: function (ratings) {
            let items = Object.entries(ratings);
            let sum = 0;
            let total = 0;

            for (let [key, value] of items) {
               total += value;
               sum += value * parseInt(key);
            }
            return Math.round(sum / total);
         },
         set: function (r) {
            if (!(this instanceof mongoose.Document)) {
               // only call setter when updating the whole path with an object
               if (r instanceof Object) return r;
               else {
                  throw new Error("");
               }
            } else {
               // get the actual ratings object without using the getter which returns  an integer value
               // r is the ratings which is an integer value that represent the star level from 1 to 5
               if (r instanceof Object) {
                  return r; // handle setting default when creating object
               }
               this.get("ratings", null, { getters: false })[r] =
                  1 +
                  parseInt(this.get("ratings", null, { getters: false })[r]);
               return this.get("ratings", null, { getters: false });
            }
         },
         default: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 },
      },
   },
   { timestamps: true, toObject: { getters: true }, toJSON: { getters: true } }
);

productSchema.virtual("id").get(function () {
   return this._id.toHexString();
});
productSchema.set("toJSON", {
   virtuals: true,
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
