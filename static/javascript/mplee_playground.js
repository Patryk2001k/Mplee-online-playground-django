var editor = CodeMirror.fromTextArea(document.getElementById("codeEditor"), {
        lineNumbers: true,
        mode: "javascript",
        theme: "hopscotch",
        tabSize: 4,
        indentWithTabs: true,
        lineWrapping: true,
        extraKeys: { "Ctrl-Space": "autocomplete" },
        hintOptions: {
            hint: CodeMirror.hint.javascript
        }
});
    

function setEditorSettings() {
    editor.setSize("100%", "100%"); 
    editor.getWrapperElement().style.fontSize = "16px";
    editor.getWrapperElement().style.border = "2px solid #4B5563";
    editor.getWrapperElement().style.borderRadius = "0.5rem";

    const defaultCode = `fun sort(elements)
    var return_table = []
    var elements_copy = elements
    for i = 0 to len(elements_copy) then
        var x = max(elements_copy)
        append(return_table, x / 1)
        elements_copy - x / 0
    end
    
    return return_table
end

var test_table = [1, 5, 1, 2, 6, 4, 7]

var sorted_table = sort(test_table)

show_ret(sorted_table)

    `;
    editor.setValue(defaultCode);
}

function getCSRFToken() {
    let csrfToken = null;
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('csrftoken=')) {
            csrfToken = cookie.substring('csrftoken='.length, cookie.length);
            break;
        }
    }
    return csrfToken;
}

function sendMpleeCode() {
    var button = document.getElementById('runButton');
    var outputField = document.getElementById('outputField'); 
    let code = editor.getValue(); 

    button.classList.add('waiting');
    button.innerText = 'Wait';

    fetch('/mplee_execute_code/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRFToken': getCSRFToken()
        },
        body: 'code=' + encodeURIComponent(code)
    })
    .then(response => response.json()).then(data => {
        button.classList.remove('waiting');
        button.innerText = 'Run Code';
        
        let output = "";

        data.result.forEach(innerArray => {
            innerArray.forEach(item => {
               output += item + "\n" + "===" + "\n";
            });
        });

        if (data.result !== undefined && data.time !== undefined) {
            outputField.value = `${output} \n Program run in ${data.time.toFixed(10)} seconds`;
        } else {
            outputField.value = "An error occurred or no response from server.";
        }
    })
    .catch(error => {
        console.error('Error:', error);
        button.classList.remove('waiting');
        button.innerText = 'Run Code';
        outputField.value = "Error: Could not connect to server.";
    });
}

function initializer(){
    setEditorSettings();
}

initializer();
