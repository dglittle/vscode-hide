const vscode = require('vscode');

function activate(context) {
    const blueDecoration = vscode.window.createTextEditorDecorationType({
        color: 'rgba(0,0,0,0)',
        backgroundColor: 'rgba(221, 160, 221, 0.7)'
    });

    function updateDecorations(editor) {
        if (!editor) return;

        const text = editor.document.getText();
        const blueMatches = [];

        for (const match of text.matchAll(/hide::[^\r\n]*/g)) {
            const startPos = editor.document.positionAt(match.index + 6);
            const endPos = editor.document.positionAt(match.index + match[0].length);
            blueMatches.push({ range: new vscode.Range(startPos, endPos) });
        }

        editor.setDecorations(blueDecoration, blueMatches);
    }

    vscode.window.onDidChangeActiveTextEditor(editor => {
        updateDecorations(editor);
    }, null, context.subscriptions);

    vscode.workspace.onDidChangeTextDocument(event => {
        if (vscode.window.activeTextEditor && event.document === vscode.window.activeTextEditor.document) {
            updateDecorations(vscode.window.activeTextEditor);
        }
    }, null, context.subscriptions);

    updateDecorations(vscode.window.activeTextEditor);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
