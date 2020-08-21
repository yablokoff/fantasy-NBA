import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import { DATE_FORMAT, STORAGE_DATE_FORMAT, TIME_ZONE } from "../../constants/defaults";


// prepare
beforeAll(() => {
    dayjs.extend(utc);
    dayjs.extend(timezone);
});


test('test ts', () => {
    // const n = dayjs().tz(TIME_ZONE);
    // console.log(n.format());
    const sh = dayjs("2020-08-12T06:36:49.000Z").tz(TIME_ZONE);
    console.log(sh);
    console.log(sh.format());
    expect(sh.format(STORAGE_DATE_FORMAT)).toBe('2020-08-11');
});
