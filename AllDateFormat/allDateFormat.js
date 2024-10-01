const moment = require("moment");

// Define different date format methods
const dateFormatMethods = {
    DD_MM_YYYY_HH_MM_SS: "DD_MM_YYYY_HH_MM_SS",
    MM_DD_YYYY_HH_MM_SS: "MM_DD_YYYY_HH_MM_SS",
    YYYY_MM_DD: "YYYY-MM-DD",
    DD_MMM_YYYY: "DD-MMM-YYYY",
    FULL_DATE: "dddd, MMMM Do YYYY, h:mm:ss a", 
    DD_MMM_YYYY_hh_mm_A:"DD-MMM-YYYY hh:mm A",
    Unix_timestamp:"UNIX_TIMESTAMP"
};

const dateFormatMethod = (format, date = new Date()) => {
    switch (format) {
        case dateFormatMethods.DD_MM_YYYY_HH_MM_SS:
            return moment(date).format("DD-MM-YYYY HH:mm:ss");
        case dateFormatMethods.MM_DD_YYYY_HH_MM_SS:
            return moment(date).format("MM-DD-YYYY HH:mm:ss");
        case dateFormatMethods.YYYY_MM_DD:
            return moment(date).format("YYYY-MM-DD");
        case dateFormatMethods.DD_MMM_YYYY:
            return moment(date).format("DD-MMM-YYYY");
        case dateFormatMethods.FULL_DATE:
            return moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a");
        case dateFormatMethods.DD_MMM_YYYY_hh_mm_A:
            return moment(date).format("DD-MMM-YYYY hh:mm A");
        case dateFormatMethods.Unix_timestamp:
            return moment(date).valueOf();
        default:
            return "Invalid format selection";
    }
};

module.exports = { dateFormatMethod, dateFormatMethods };
