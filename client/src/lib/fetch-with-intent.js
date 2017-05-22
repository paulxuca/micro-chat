export default (host, intent, data = {}, session = null) => {
    if (!data || typeof data === 'string') {
        session = data;
        data = {};
    }
    
    const intentData = {
        intent,
        data,
        session
    };

    return fetch(host, {method: 'POST', body: JSON.stringify(intentData)}).then(res => {
        if (res.status === 204) {
            return {};
        }

        return res.json();
    });
};