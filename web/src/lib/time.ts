import moment from "moment";

export const dateToString = (date: string | Date, format = "YYYY-MM-DD") => {
    return moment(date).format(format);
}