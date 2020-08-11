import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { DATE_FORMAT } from "../../constants/defaults";


// prepare
beforeAll(() => dayjs.extend(utc));


test('test ts', () => {
    const now = dayjs.utc();
    console.log(now);
    console.log(now.format());
    console.log(dayjs().format());
    expect(now.format(DATE_FORMAT)).toBe('2020-08-11');
});
