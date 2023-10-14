import { app } from "../../strawberry/app";
/** Component declarations */
app.component('CodeEditor', ($scope, $patch, StateManager, $app, PreviewPane, $block) => {
    StateManager.setScope($scope).setPatcher($patch).register('active').register('error').register('loading');
    const setEditorBodyHeight = () => {
        const workspaceHeight = document.documentElement.clientHeight - document.querySelector('header').getBoundingClientRect().height;
        const headerHeight = document.querySelector('[xblock="/CodeEditor/Header"]').getBoundingClientRect().height;
        const bodyHeight = (workspaceHeight - headerHeight) - 100;
        $block('/CodeEditor/Body', (element) => {
            element.$element.setAttribute('style', `height:${bodyHeight}px;`);
        });
    };
    let editor;
    $scope.tools = {
        run: () => {
            const html = editor.getValue();
            PreviewPane.render(html);
        },
        fullScreen: {
            editorPane: () => {
                if (editorResizeButton.getState() === 'expand') {
                    editorResizeButton.toState().close();
                    $block('/CodeEditor/EditorPane', element => element.$element.setAttribute('style', 'width:100%;'));
                    $block('/CodeEditor/PreviewPane', element => element.$element.setAttribute('style', 'display:none'));
                    return;
                }
                editorResizeButton.toState().expand();
                $block('/CodeEditor/EditorPane', element => element.$element.removeAttribute('style'));
                $block('/CodeEditor/PreviewPane', element => element.$element.removeAttribute('style'));
                return;
            }
        }
    };
    class EditorResizeButton {
        constructor() {
            this.namespace = '/CodeEditor/EditorPane/ResizeButton';
            this.state = 'expand';
        }
        toState() {
            return {
                close: () => {
                    this.state = 'close';
                    $patch(this.namespace);
                },
                expand: () => {
                    this.state = 'expand';
                    $patch(this.namespace);
                }
            };
        }
        getState() {
            return this.state;
        }
    }
    const editorResizeButton = new EditorResizeButton();
    $app.onReady(() => {
        setTimeout(() => {
            setEditorBodyHeight();
            // @ts-ignore
            editor = ace.edit('code_editor');
            editor.setValue("<!-- Start Coding Here -->\n");
            editor.session.setMode('ace/mode/html');
        }, 100);
    });
    $scope.states = {
        resizeButton: (state) => {
            return editorResizeButton.getState() === state;
        }
    };
    return {
        render: () => {
            return new Promise((resolve, reject) => {
            });
        }
    };
});
