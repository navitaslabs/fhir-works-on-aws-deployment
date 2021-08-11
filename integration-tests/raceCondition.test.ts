import { AxiosInstance } from 'axios';
import { getFhirClient } from './utils';
import updateBundle from './updatePatientsBundle.json';

describe('Race condition test', () => {
    let fhirUserAxios: AxiosInstance;

    beforeAll(async () => {
        fhirUserAxios = await getFhirClient();
    });

    function sleep(ms: any) {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }

    test('Simultaneous update', async () => {
        const promises = [];
        promises.push(fhirUserAxios.post('/', updateBundle));
        await sleep(2);
        promises.push(fhirUserAxios.post('/', updateBundle));
        await Promise.all(promises);
    });
});
