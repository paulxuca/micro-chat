export default data => {
    if (!data) {
        return JSON.parse(localStorage['microchat-session'] || null);
    }

    const currentData = 'microchat-session' in localStorage ? JSON.parse(localStorage['microchat-session']) : {};
    const nextData = Object.assign(currentData, data);

    localStorage['microchat-session'] = JSON.stringify(nextData);
    return nextData;
};