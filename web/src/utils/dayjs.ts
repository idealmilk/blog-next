import dayjs from "dayjs";
import ja from "dayjs/locale/ja";
import isBetween from "dayjs/plugin/isBetween";

dayjs.locale(ja);
dayjs.extend(isBetween);

export default dayjs;
