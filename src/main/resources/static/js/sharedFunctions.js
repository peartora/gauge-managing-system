'use static';

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

