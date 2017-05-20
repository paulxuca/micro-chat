export default () => {
    const renderTarget = document.createElement('div');
    renderTarget.id = 'microchat-render-target';
    renderTarget.style = 'position: absolute;bottom: 50px;right: 300px';

    document.body.insertBefore(renderTarget, document.body.lastChild);

    return renderTarget;
};