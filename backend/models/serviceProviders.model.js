import mongoose from "mongoose";

const serviceProviderSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    TimesOfIndia: {
        type: Boolean,
        required: false,
    },
    HindustanTimes: {
        type: Boolean,
        required: false,
    },
    TheHindu:{
        type: Boolean,
        required: false,
    },
    NDTV:{
        type: Boolean,
        required: false,
    },
    IndiaToday:{
        type: Boolean,
        required: false,
    }
})

const serviceProvider = mongoose.model("serviceProvider", serviceProviderSchema);

export default serviceProvider;