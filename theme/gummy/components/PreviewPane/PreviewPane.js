import { app } from "../../strawberry/app";
/** Component declarations */
app.component('PreviewPane', ($scope, $patch, StateManager) => {
    StateManager.setScope($scope).setPatcher($patch).register('active').register('error').register('loading');
    return {
        render: (html) => {
            return new Promise((resolve, reject) => {
                const previewer = document.getElementById('preview_pane');
                previewer.innerHTML = '';
                const wrapper = document.implementation.createHTMLDocument();
                wrapper.body.innerHTML = html;
                const iframe = document.createElement('iframe');
                iframe.width = '100%';
                iframe.height = '100vh';
                iframe.frameBorder = '0';
                iframe.id = 'myIframe';
                previewer.appendChild(iframe);
                const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
                if (iframeDocument) {
                    iframeDocument.open();
                    iframeDocument.write('<html><head><title>ScriptGum Preview</title></head><body>');
                    iframeDocument.write(html);
                    iframeDocument.write('</body></html>');
                    iframeDocument.close();
                }
                else {
                    console.error('Failed to access the iframe document.');
                }
            });
        }
    };
});
