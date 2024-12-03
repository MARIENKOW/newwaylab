import config from "../configs/config.js";
import axios from "axios";

const SITE_API_URL = config.SERVER_API + "/";

export default class SiteService {
   constructor($api = axios) {
      this.sendTelegram = async (value) => {
         const res = await $api.post(SITE_API_URL + "/sendTelegram", value);
         return res;
      };
      this.setContactLinks = async (value) => {
         const res = await $api.post(SITE_API_URL + "/", value);
         return res;
      };
      this.getContactLinks = async (value) => {
         const res = await $api.get(SITE_API_URL + "/");
         return res;
      };
   }
}
