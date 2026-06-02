
import axios from "axios";

export const apiCall = async ({
    method,
    url,
    data,
    callback,
}) => {

    try {

        const response = await axios({
            method,
            url,
            data,
        });

        callback(response);

    } catch (error) {

        console.log(error);

    }

};