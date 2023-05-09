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

export function displayGaugeList()
{
    clearTBody();

    // const queryString = `${encodeQueryData(queryParams)}`;

    request.get(`/gauge-managing-system/getGaugeList`)
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

        // isQuotationReceived, isGaugeSent, isOrderConfirmed, isGaugeArrivedBackToDaep,

        let quotationSelectWithOptions;
        let sendSelectWithOptions;
        let orderConfirmationSelectWithOptions;
        let arriveBackSelectWithOptions;

        quotationSelectWithOptions = createQuotationSelectWithOptions(gaugeNumber, isQuotationReceived, true);
        sendSelectWithOptions = createSendSelectWithOptions(gaugeNumber, isGaugeSent, false);
        orderConfirmationSelectWithOptions = createOrderConfirmationSelectWithOptions(gaugeNumber, isOrderConfirmed, false);
        arriveBackSelectWithOptions = createArriveBackSelectWithOptions(gaugeNumber, isGaugeArrivedBackToDaep, false);

        if (isGaugeArrivedBackToDaep === 'DONE')
        {
            alert("신규로 할당 된 valid-until 날짜를 입력하세요");
        }
        else if (isOrderConfirmed === 'DONE')
        {
            quotationSelectWithOptions = createQuotationSelectWithOptions(gaugeNumber, isQuotationReceived, false);
            sendSelectWithOptions = createSendSelectWithOptions(gaugeNumber, isGaugeSent, false);
            orderConfirmationSelectWithOptions = createOrderConfirmationSelectWithOptions(gaugeNumber, isOrderConfirmed, false);
            arriveBackSelectWithOptions = createArriveBackSelectWithOptions(gaugeNumber, isGaugeArrivedBackToDaep, true);
        }
        else if (isGaugeSent === 'DONE')
        {
            quotationSelectWithOptions = createQuotationSelectWithOptions(gaugeNumber, isQuotationReceived, false);
            sendSelectWithOptions = createSendSelectWithOptions(gaugeNumber, isGaugeSent, false);
            orderConfirmationSelectWithOptions = createOrderConfirmationSelectWithOptions(gaugeNumber, isOrderConfirmed, true);
            arriveBackSelectWithOptions = createArriveBackSelectWithOptions(gaugeNumber, isGaugeArrivedBackToDaep, false);
        }
        else if (isQuotationReceived === 'DONE')
        {
            quotationSelectWithOptions = createQuotationSelectWithOptions(gaugeNumber, isQuotationReceived, false);
            sendSelectWithOptions = createSendSelectWithOptions(gaugeNumber, isGaugeSent, true);
            orderConfirmationSelectWithOptions = createOrderConfirmationSelectWithOptions(gaugeNumber, isOrderConfirmed, false);
            arriveBackSelectWithOptions = createArriveBackSelectWithOptions(gaugeNumber, isGaugeArrivedBackToDaep, false);
        }
        else if (isQuotationReceived === 'PENDING')
        {
            quotationSelectWithOptions = createQuotationSelectWithOptions(gaugeNumber, isQuotationReceived, true);
            sendSelectWithOptions = createSendSelectWithOptions(gaugeNumber, isGaugeSent, false);
            orderConfirmationSelectWithOptions = createOrderConfirmationSelectWithOptions(gaugeNumber, isOrderConfirmed, false);
            arriveBackSelectWithOptions = createArriveBackSelectWithOptions(gaugeNumber, isGaugeArrivedBackToDaep, false);
        }

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

function createSelectNode(selectNode, active)
{
    const activityOptions = ['PENDING', 'DONE'];

    activityOptions.forEach(option =>
    {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;

        if (!active)
        {
            optionElement.disabled = true;
        }

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
            if (!response.ok) throw new Error(response.statusText);
            return response.text();
        })
        .then(result =>
        {
            displayGaugeList();
            alert(result)
        })
        .catch(error => console.error(error));
}

function clearTBody()
{
    const tBodyElement = document.getElementById("t-body");

    while (tBodyElement.firstChild)
    {
        tBodyElement.removeChild(tBodyElement.firstChild);
    }
}

function addEventListenerForSelect(selectNode, gaugeNumber, column)
{
    selectNode.addEventListener('change', event =>
    {
        const data = {};
        data['gaugeNumber'] = gaugeNumber;
        data['column'] = column;
        data['status'] = event.target.value;

        request.post(`/gauge-managing-system/update`, data)
            .then(response =>
            {
                if (!response.ok) throw new Error(`견적접수 관련 status 변경 중 error가 발생 하였습니다.`);
                return response.text();
            })
            .then(result =>
            {
                displayGaugeList();
                // alert(result);
            })
            .catch(console.error(error));
    })
}

function createQuotationSelectWithOptions(gaugeNumber, isQuotationReceived, active)
{
    const quotationSelect = document.createElement("select");
    const quotationSelectWithOptions = createSelectNode(quotationSelect, active);
    addEventListenerForSelect(quotationSelectWithOptions, gaugeNumber, 'is-quotation-recieved');
    quotationSelectWithOptions.value = isQuotationReceived;

    return quotationSelectWithOptions;
}

function createSendSelectWithOptions(gaugeNumber, isGaugeSent, active)
{
    const sendSelect = document.createElement("select");
    const sendSelectWithOptions = createSelectNode(sendSelect, active);
    addEventListenerForSelect(sendSelectWithOptions, gaugeNumber, 'is-gauge-sent');
    sendSelectWithOptions.value = isGaugeSent;

    return sendSelectWithOptions;
}

function createOrderConfirmationSelectWithOptions(gaugeNumber, isOrderConfirmed, active)
{
    const orderConfirmationSelect = document.createElement("select");
    const orderConfirmationSelectWithOptions = createSelectNode(orderConfirmationSelect, active);
    addEventListenerForSelect(orderConfirmationSelectWithOptions, gaugeNumber, 'is-orderconfirmed');
    orderConfirmationSelectWithOptions.value = isOrderConfirmed;

    return orderConfirmationSelectWithOptions;
}

function createArriveBackSelectWithOptions(gaugeNumber, isGaugeArrivedBackToDaep, active)
{
    const arriveBackSelect = document.createElement("select");
    const arriveBackSelectWithOptions = createSelectNode(arriveBackSelect, active);
    addEventListenerForSelect(arriveBackSelectWithOptions, gaugeNumber, 'is-gauge-arrived-back-to-daep');
    arriveBackSelectWithOptions.value = isGaugeArrivedBackToDaep;

    return arriveBackSelectWithOptions;
}