import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import tz from "dayjs/plugin/timezone.js";
import { TZ } from "../config.js";

dayjs.extend(utc);
dayjs.extend(tz);

export function now() {
  return dayjs().tz(TZ);
}