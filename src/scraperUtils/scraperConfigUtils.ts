import sha1 from 'js-sha1';
import axios from 'axios';

interface Auth {
    'app-token': string;
    static_param: string;
    prefix: string;
    suffix: string;
    checksum_constant: number;
    checksum_indexes: number[];
    'user-id': string;
    cookie: string;
    'user-agent': string;
    'x-bc': string;
}

export const createHeaders = (path: string, rules: Auth) => {
    const time = Date.now().toString();
    const hash = sha1(
        [rules['static_param'], time, path, rules['user-id']].join('\n')
    );
    const checksum =
        rules['checksum_indexes'].reduce(
            (total, current) => (total += hash[current].charCodeAt(0)),
            0
        ) + rules['checksum_constant'];
    const sign = [
        rules['prefix'],
        hash,
        checksum.toString(16),
        rules['suffix'],
    ].join(':');
    return {
        accept: 'application/json, text/plain, */*',
        'app-token': rules['app-token'],
        cookie: rules['cookie'],
        sign: sign,
        time: time,
        'user-id': rules['user-id'],
        'user-agent': rules['user-agent'],
        'x-bc': rules['x-bc'],
    };
};

export const getRules = async () => {
    try {
        const rules = await axios.get(process.env.ONLYFANS_RULES_URL as string);
        return rules.data;
    } catch (err) {
        // todo: handle error
        throw 'Something went wrong with rules';
    }
};
