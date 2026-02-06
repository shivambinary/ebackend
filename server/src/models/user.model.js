import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema (
    {
        name: {type: String, required: true},
        email: {type: String, unique: true, required: true},
        password: {type: String, minlength: 6, required: true},
        role: {type: String, enum: ["user", "admin"], default: "user"},
        isActive: {type: Boolean, default: true},
    },
    {
        timestamps: true,
    }
)

userSchema.pre("save", async function (next){
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User", userSchema);
export default User;