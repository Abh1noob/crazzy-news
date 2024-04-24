import mongoose from "mongoose";

const serviceProviderSchema = mongoose.Schema({
    id: {
        type: String,
        required: [true, "Please provide a ID"],
    },
    TimesOfIndia: {
        type: Boolean,
        required: false,
    },
    HindustanTimes: {
        type: Boolean,
        required: false,
    },
    NDTV:{
        type: Boolean,
        required: false,
    },
})

const serviceProvider = mongoose.model("serviceProvider", serviceProviderSchema);

export default serviceProvider;