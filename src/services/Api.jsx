import { Base_url } from "./Base_url";
import axios from "axios";
import { Show_Toast } from "../utils/toast";

export const ApiCall = async (
  method,
  endPoint,
  data,
  params,
  content_type,
  token
) => {

  try {
    let token = localStorage.getItem("User");

    const res = await axios({
      method: method,
      url: `${Base_url}${endPoint}`,
      data: data,
      params: params,
      headers: {
        "Content-Type": content_type ?? "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res)
    return {
      status: res?.status,
      data: res.data?.data,
      message: res.data?.message || "",
    };
  } catch (error) {
    // Show_Toast(error.response.data.message || error.message, false);
    // throw error
    Show_Toast(error.response ? error.response.data.message : 'Internal Server Error')
    return error;
  }


}

