'use strict';

export const request =
{
    get(url)
    {
        return fetch(url);
    },
    post(url, payload)
    {
        return fetch(url,
    {
            method: 'POST',
            headers: {'content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });
    },
    delete(url)
    {
        return fetch(url, {method: 'DELETE'});
    },
};

export function displayGaugeList(queryParams)
{
    clearTBody();

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
            updateGaugeList(extractedData);
        })
        .catch(error =>
        {
            alert(`관련 처리 중 ${error}가 발생 하였습니다.`);
        });
}

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

function updateGaugeList(data)
{

    for (let i = 0; i < data.length; i++)
    {
        console.log(`return 된 게이지`);
        console.log(data[i]);
        createAndFillTable(data[i]);
    }
}

function createAndFillTable(gaugeData)
{
    const { gaugeNumber, validUntil, gaugeStatus, sendDateToQmm2, isQuotationReceived, isGaugeSent, isOrderConfirmed, isGaugeArrivedBackToDaep, gaugeDescription, engineer } = gaugeData;

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
    const gaugeDescriptionTdElement = row.insertCell();
    const engineerTdElement = row.insertCell();

    const gaugeNumberTextNode = document.createTextNode(gaugeNumber);
    const validUntilTextNode = document.createTextNode(validUntil);
    const gaugeStatusTextNode = document.createTextNode(gaugeStatus);
    const gaugeDescriptionTextNode = document.createTextNode(gaugeDescription);
    const engineerTextNode = document.createTextNode(engineer);

    gaugeNumberTdElement.appendChild(gaugeNumberTextNode);
    validUntilTdElement.appendChild(validUntilTextNode);
    gaugeStatusTdElement.appendChild(gaugeStatusTextNode);
    gaugeDescriptionTdElement.appendChild(gaugeDescriptionTextNode);
    engineerTdElement.appendChild(engineerTextNode);

    const sendDateToQmm2TdElement = row.insertCell();

    if (sendDateToQmm2)
    {
        const sendDateTextNode = document.createTextNode(sendDateToQmm2);
        sendDateToQmm2TdElement.appendChild(sendDateTextNode);

        const quotationTdElement = row.insertCell();
        quotationTdElement.colSpan = 2;

        const sendTdElement = row.insertCell();
        sendTdElement.colSpan = 2;

        const orderConfirmationTdElement = row.insertCell();
        orderConfirmationTdElement.colSpan = 2;

        const arriveBackTdElement = row.insertCell();
        arriveBackTdElement.colSpan = 2;

        const startDate = new Date(sendDateToQmm2);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formatter = new Intl.DateTimeFormat('en-US', options);

        const expectedQuotationReceivedDate = startDate.setDate(startDate.getDate() + 7);
        const formattedExpectedQuotationReceivedDate = formatter.format(expectedQuotationReceivedDate);

        const expectedSendDate = startDate.setDate(14);
        const formattedExpectedSendDate = formatter.format(expectedSendDate);

        const expectedOrderConfirmedDate = startDate.setDate(21);
        const formattedExpectedOrderConfirmedDate = formatter.format(expectedOrderConfirmedDate);

        const expectedArriveBackDate = startDate.setDate(60);
        const formattedExpectedArriveBackDate = formatter.format(expectedArriveBackDate);

        const quotationTextNode = document.createTextNode(formattedExpectedQuotationReceivedDate);
        const sendTextNode = document.createTextNode(formattedExpectedSendDate);
        const orderConfirmationTextNode = document.createTextNode(formattedExpectedOrderConfirmedDate);
        const arriveBackTextNode = document.createTextNode(formattedExpectedArriveBackDate);

        const quotationSelect = document.createElement("select");
        const quotationSelectWithOptions = createSelectNode(quotationSelect);
        quotationSelectWithOptions.value = isQuotationReceived;

        const sendSelect = document.createElement("select");
        const sendSelectWithOptions = createSelectNode(sendSelect);
        sendSelectWithOptions.value = isGaugeSent;


        const orderConfirmationSelect = document.createElement("select");
        const orderConfirmationSelectWithOptions = createSelectNode(orderConfirmationSelect);
        orderConfirmationSelectWithOptions.value = isOrderConfirmed;

        const arriveBackSelect = document.createElement("select");
        const arriveBackSelectWithOptions = createSelectNode(arriveBackSelect);
        arriveBackSelectWithOptions.value = isGaugeArrivedBackToDaep;

        quotationTdElement.appendChild(quotationTextNode);
        quotationTdElement.appendChild(quotationSelectWithOptions);

        sendTdElement.appendChild(sendTextNode);
        sendTdElement.appendChild(sendSelectWithOptions);

        orderConfirmationTdElement.appendChild(orderConfirmationTextNode);
        orderConfirmationTdElement.appendChild(orderConfirmationSelectWithOptions);

        arriveBackTdElement.appendChild(arriveBackTextNode);
        arriveBackTdElement.appendChild(arriveBackSelectWithOptions);
    }
    else
    {
        const inputElement = document.createElement('input');
        inputElement.classList.add("sendDate");
        inputElement.type = 'date';
        inputElement.addEventListener('change', e => recordSendDateToQmm(e, gaugeNumber))
        sendDateToQmm2TdElement.appendChild(inputElement);

        const remainTdElement = row.insertCell();
        remainTdElement.colSpan = 8;
        remainTdElement.innerText = `해당없음`;
    }
}

function createSelectNode(selectNode)
{
    const activityOptions = ['PENDING', 'DONE'];

    activityOptions.forEach(option =>
    {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        selectNode.appendChild(optionElement);
    })
    return selectNode;
}

function recordSendDateToQmm(e, gaugeNumber)
{
    const date = e.target.value;

    const params = {};

    params['gaugeNumber'] = gaugeNumber;
    params['sendDateToQmm'] = date;

    request.post(`/gauge-managing-system/recordDate`, params)
        .then(response =>
        {
            if (!response.ok)
            {
                throw new Error(response.statusText);
            }
            const queryParams = {'gauge-status': '유효기간만료1달미만'};
            displayGaugeList(queryParams);
        })
}

function clearTBody()
{
    const tBodyElement = document.getElementById("t-body");

    while (tBodyElement.firstChild)
    {
        tBodyElement.removeChild(tBodyElement.firstChild);
    }
}