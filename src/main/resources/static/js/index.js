'use static';

import { request } from './sharedFunctions.js'
window.addEventListener('DOMContentLoaded', function()
{
    const queryParams = {'gauge-status': '유효기간만료1달미만'};
    const queryString = `${encodeQueryData(queryParams)}`;

    request.get(`/gauge-managing-system/getGaugeList?${queryString}`)
    .then(response =>
    {
        console.log(response);

        if (!response.ok)
        {
            throw new Error(response.statusText);
        }
        return response.json();
    })
    .then(extractedData =>
    {
        displayGaugeList(extractedData);
    })
    .catch(error =>
    {
        alert(`관련 처리 중 ${error}가 발생 하였습니다.`);
    });
});

function encodeQueryData(data)
{
    const encodedParams = [];
    for (const key in data)
    {
        if (data.hasOwnProperty(key))
        {
            encodedParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);
        }
    }
    return encodedParams.join(`&`);
}

function displayGaugeList(data)
{
    for (let i = 0; i < data.length; i++)
    {
        createAndFillTable(data[i]);
    }
}

function createAndFillTable(gaugeData)
{
    const { gaugeNumber, validUntil, gaugeStatus, sendDateToQmm2, isQuotationRecieved, isGaugeSent, isOrderconfirmed, isGaugeArrivedBackToDaep, gaugeDescription, engineer } = gaugeData;

    const quotationResult = isQuotationRecieved? "Done" : "Pending";
    const sendResult = isGaugeSent? "Done" : "Pending";
    const orderResult = isOrderconfirmed? "Done" : "Pending";
    const arriveResult = isGaugeArrivedBackToDaep? "Done" : "Pending";

    const tBodyElement = document.getElementById('t-body');
    const row = tBodyElement.insertRow();
    row.dataset['id'] = gaugeNumber;

    if (gaugeStatus === '유효기간만료1달미만')
    {
        row.classList.add('red');
    }

    const gaugeNumberTdElement = row.insertCell();
    const validUntilTdElement = row.insertCell();
    const gaugeStatusTdElement = row.insertCell();
    const sendDateToQmm2TdElement = row.insertCell();
    const quotationTdElement = row.insertCell();
    const sendTdElement = row.insertCell();
    const orderConfirmationTdElement = row.insertCell();
    const arriveBackTdElement = row.insertCell();
    const gaugeDescriptionTdElement = row.insertCell();
    const personTdElement = row.insertCell();

    const gaugeNumberTextNode = document.createTextNode(gaugeNumber);
    const validUntilTextNode = document.createTextNode(validUntil);
    const gaugeStatusTextNode = document.createTextNode(gaugeStatus);
    const sendDateTextNode = document.createTextNode(sendDateToQmm2);
    const quotationTextNode = document.createTextNode(quotationResult);
    const sendTextNode = document.createTextNode(sendResult);
    const orderConfirmationTextNode = document.createTextNode(orderResult);
    const arriveBackTextNode = document.createTextNode(arriveResult);
    const gaugeDescriptionTextNode = document.createTextNode(gaugeDescription);
    const engineerTextNode = document.createTextNode(engineer);

    gaugeNumberTdElement.appendChild(gaugeNumberTextNode);
    validUntilTdElement.appendChild(validUntilTextNode);
    gaugeStatusTdElement.appendChild(gaugeStatusTextNode);
    sendDateToQmm2TdElement.appendChild(sendDateTextNode);
    quotationTdElement.appendChild(quotationTextNode);
    sendTdElement.appendChild(sendTextNode);
    orderConfirmationTdElement.appendChild(orderConfirmationTextNode);
    arriveBackTdElement.appendChild(arriveBackTextNode);
    gaugeDescriptionTdElement.appendChild(gaugeDescriptionTextNode);
    personTdElement.appendChild(engineerTextNode);
}