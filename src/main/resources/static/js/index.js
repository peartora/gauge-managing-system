'use static';

import { displayGaugeList } from './sharedFunctions.js'
window.addEventListener('DOMContentLoaded', function()
{
    const queryParams = {'gauge-status': '유효기간만료1달미만'};
    displayGaugeList(queryParams);
});