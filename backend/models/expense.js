const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      trim: true,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

expenseSchema.pre("remove", async function (next) {
  try {
    await mongoose.model("User").deleteMany({ expense: this._id });

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Expense", expenseSchema);
