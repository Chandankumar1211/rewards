import axios from 'axios';
import swal from 'sweetalert';

const request = async (url, params) => {
    let reqParams = {
        method: params.method,
        credentials: 'include',
        url: url,
        data: params.data,
        headers: { 'Content-Type': 'application/json' }
    };

    const transport = axios.create({ withCredentials: true });
    try {
        let response = await transport(reqParams);
        let data = response.data;
        if (response) {
            if (response.status === 200) {
                let json = response.data;
                if (json.success === false) {
                    swal({
                        title: "Something went wrong! Please try again later.",
                        text: "",
                        icon: "error",
                        dangerMode: true
                    });
                    return;
                }
                else {
                    return data;
                }
            }
        } else {
            return data;
        }
    } catch (ex) {
        if (ex.response.status === 401) {
            swal({
                title: ex.response.data.info,
                text: "",
                icon: "error",
                dangerMode: true
            });
        } else if (ex.response.status === 500) {
            swal({
                title: ex.response.data.info,
                text: "",
                icon: "error",
                dangerMode: true
            });
        }
        else {
            return { error: "" };
        }
    }
}
export default request;