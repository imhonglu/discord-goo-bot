/* eslint-disable import/named */
import requireDirectory from '../utils/require-directory';

const models = requireDirectory({
    useDefault: true,
    caseName: 'pascal',
});

export default models;
