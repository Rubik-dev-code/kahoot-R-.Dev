(function() {
    let sidebar = document.getElementById('ai-assistant-sidebar');
    if (sidebar) {
        sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
        return;
    }

    sidebar = document.createElement('div');
    sidebar.id = 'ai-assistant-sidebar';
    
    Object.assign(sidebar.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        width: '280px',
        height: '460px',
        backgroundColor: '#1e1e24',
        color: '#ffffff',
        boxShadow: '0px 4px 15px rgba(0,0,0,0.5)',
        borderRadius: '12px',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        zIndex: '999999',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        boxSizing: 'border-box'
    });

    const title = document.createElement('h3');
    title.innerText = '🤖 Quiz Assistant';
    title.style.margin = '0';
    title.style.textAlign = 'center';
    sidebar.appendChild(title);

    const pinContainer = document.createElement('div');
    pinContainer.style.display = 'flex';
    pinContainer.style.gap = '8px';

    const pinInput = document.createElement('input');
    pinInput.type = 'text';
    pinInput.placeholder = 'Enter Game PIN...';
    Object.assign(pinInput.style, {
        flexGrow: '1',
        padding: '8px',
        borderRadius: '6px',
        border: '1px solid #4a4e69',
        backgroundColor: '#2b2d42',
        color: 'white',
        fontSize: '13px'
    });

    const pinBtn = document.createElement('button');
    pinBtn.innerText = 'Set';
    Object.assign(pinBtn.style, {
        padding: '8px 14px',
        border: 'none',
        borderRadius: '6px',
        backgroundColor: '#4a4e69',
        color: 'white',
        cursor: 'pointer',
        fontWeight: 'bold'
    });

    let activeGamePin = "";
    pinBtn.onclick = function() {
        if(pinInput.value.trim() !== "") {
            activeGamePin = pinInput.value.trim();
            statusText.innerText = `PIN locked: ${activeGamePin}. Ready!`;
            pinBtn.style.backgroundColor = '#2a9d8f';
            pinBtn.innerText = 'Saved';
        }
    };

    pinContainer.appendChild(pinInput);
    pinContainer.appendChild(pinBtn);
    sidebar.appendChild(pinContainer);

    const toggleBtn = document.createElement('button');
    toggleBtn.innerText = 'AI Status: OFF';
    let isAiActive = false; 
    
    Object.assign(toggleBtn.style, {
        padding: '12px',
        border: 'none',
        borderRadius: '8px',
        backgroundColor: '#e63946',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '14px'
    });

    toggleBtn.onclick = function() {
        isAiActive = !isAiActive;
        if (isAiActive) {
            toggleBtn.innerText = 'AI Status: ON';
            toggleBtn.style.backgroundColor = '#2a9d8f';
            statusText.innerText = activeGamePin ? `AI active for PIN: ${activeGamePin}` : 'AI active. (Enter PIN above)';
        } else {
            toggleBtn.innerText = 'AI Status: OFF';
            toggleBtn.style.backgroundColor = '#e63946';
            statusText.innerText = 'Assistant paused.';
        }
    };
    sidebar.appendChild(toggleBtn);

    const statusText = document.createElement('div');
    statusText.innerText = 'Enter your game PIN and click Set.';
    Object.assign(statusText.style, {
        backgroundColor: '#2b2d42',
        padding: '10px',
        borderRadius: '6px',
        fontSize: '13px',
        flexGrow: '1',
        overflowY: 'auto',
        color: '#edf2f4'
    });
    sidebar.appendChild(statusText);

    const footerHint = document.createElement('div');
    footerHint.innerText = '💡 Tip: Press [SHIFT] to hide/show.';
    footerHint.style.fontSize = '11px';
    footerHint.style.color = '#8d99ae';
    footerHint.style.textAlign = 'center';
    sidebar.appendChild(footerHint);

    document.body.appendChild(sidebar);

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Shift') {
            sidebar.style.display = sidebar.style.display === 'none' ? 'block' : 'none';
        }
    });
})();
