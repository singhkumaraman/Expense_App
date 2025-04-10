const mongoose = require("mongoose");

const expenseSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

expenseSchema.pre("remove", async function (next) {
  try {
    await mongoose
      .model("User")
      .updateMany({ expenses: this._id }, { $pull: { expenses: this._id } });
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Expense", expenseSchema);
