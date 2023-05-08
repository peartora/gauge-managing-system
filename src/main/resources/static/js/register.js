'use strict';
import { request } from './sharedFunctions.js';

window.addEventListener('DOMContentLoaded', function()
{
    console.log(`I am here`);

    const formRegister = document.getElementById('register-form');

    formRegister.addEventListener('submit', function(e)
    {
        e.preventDefault();

        const gaugeNumber = document.getElementById('gauge-number').value;
        const validUntil = document.getElementById('valid-date').value;
        const description = document.getElementById('description').value;
        const manufacturingNumber = document.getElementById('manufacturing-number').value;
        const person = document.getElementById('person').value;

        const data =
            {
                gaugeNumber,
                validUntil,
                description,
                manufacturingNumber,
                person,
            }

        request.post(`/gauge-managing-system/recordGauge`, data)
            .then(response =>
            {
                if (!response.ok) throw new Error(`게이지 등록 처리 중 error 발생 하였습니다.`);
                return response.text();
            })
            .then(result => alert(result))
            .catch(error => console.error(error));
    })
});