(async function() {
    'use strict';

    console.clear();
    console.log("%c 🔥 R+ .Dev MASTER LAYOUT ENGINE ACTIVE 🔥 ", "background:#ff4500; color:#fff; font-size:16px; font-weight:bold; padding:8px;");

    // Core Variables (Your Original Infrastructure)
    let questions = [];
    const info = {
        numQuestions: 0,
        questionNum: -1,
        lastAnsweredQuestion: -1,
        defaultIL: true,
        ILSetQuestion: -1
    };

    // ======================
    // FIRE CORE CONFIGURATION
    // ======================
    const Version = '2.3.0';
    const colors = {
        primary: 'rgba(15, 5, 5, 0.98)',        
        secondary: 'rgba(35, 10, 5, 0.95)',     
        accent: 'rgba(255, 69, 0, 0.85)',       
        text: '#fff5f0',                        
        correct: 'hsl(120, 100%, 50%)',         
        incorrect: 'hsl(0, 100%, 50%)',         
        close: 'hsl(0, 100%, 60%)',             
        minimize: 'hsl(35, 100%, 60%)',         
        glow: '0 0 25px rgba(255, 69, 0, 0.95)', 
        rainbow: ['#ff3300', '#ff6600', '#ff9900', '#cc3300', '#ff0000']
    };

    let PPT = 950;
    let Answered_PPT = 950; 
    let autoAnswer = false;
    let showAnswers = true; 
    let inputLag = 100;
    let roundMemoryText = "";

    if (document.getElementById('r-plus-dev-menu')) {
        document.getElementById('r-plus-dev-menu').remove();
    }

    // ======================
    // OPTIMIZED UI COMPONENTS
    // ======================

    const uiElement = document.createElement('div');
    uiElement.id = 'r-plus-dev-menu';
    Object.assign(uiElement.style, {
        position: 'fixed',
        top: '20px',
        left: '20px',
        width: '380px', 
        maxHeight: '70vh',
        backgroundColor: colors.primary,
        borderRadius: '12px',
        boxShadow: `${colors.glow}, inset 0 0 15px rgba(255, 69, 0, 0.3)`,
        zIndex: '2147483647', 
        overflow: 'hidden',
        border: `2px solid ${colors.accent}`,
        transform: 'translateZ(0)',
        willChange: 'transform, opacity, border, box-shadow',
        transition: 'border 0.3s ease, box-shadow 0.3s ease, opacity 0.15s ease', 
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box'
    });

    // Draggable Header
    const header = document.createElement('div');
    Object.assign(header.style, {
        padding: '12px 20px',
        background: `linear-gradient(90deg, ${colors.secondary}, ${colors.primary})`,
        color: colors.text,
        cursor: 'move',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        userSelect: 'none',
        borderBottom: `2px solid ${colors.accent}`,
        flexShrink: '0'
    });

    // Title
    const title = document.createElement('div');
    title.textContent = 'R+ .Dev'; 
    Object.assign(title.style, {
        fontWeight: '900',
        fontSize: '18px',
        textShadow: `0 0 12px ${colors.accent}`,
        whiteSpace: 'nowrap'
    });

    function createControlBtn(symbol, color) {
        const btn = document.createElement('div');
        btn.textContent = symbol;
        Object.assign(btn.style, {
            width: '26px',
            height: '26px',
            background: color,
            color: '#ffffff',
            display: 'grid',
            placeItems: 'center',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            transition: 'all 0.2s ease',
            boxShadow: `0 0 8px ${color}`,
            flexShrink: '0'
        });
        return btn;
    }

    const minimizeBtn = createControlBtn('─', colors.minimize);
    const closeBtn = createControlBtn('✕', colors.close);

    const btnContainer = document.createElement('div');
    Object.assign(btnContainer.style, { display: 'flex', gap: '8px' });
    btnContainer.append(minimizeBtn, closeBtn);
    header.append(title, btnContainer);
    uiElement.appendChild(header);

    const content = document.createElement('div');
    Object.assign(content.style, {
        padding: '15px', overflowY: 'auto', scrollbarWidth: 'thin',
        flexGrow: '1', display: 'flex', flexDirection: 'column', gap: '15px', boxSizing: 'border-box'
    });

    function createSection(titleText) {
        const section = document.createElement('div');
        Object.assign(section.style, {
            background: `linear-gradient(145deg, ${colors.secondary}, ${colors.primary})`,
            borderRadius: '10px', padding: '15px', border: `1px solid ${colors.accent}`,
            boxShadow: `0 0 12px rgba(255, 69, 0, 0.2)`, flexShrink: '0', marginBottom: '10px'
        });

        const sectionHeader = document.createElement('h3');
        sectionHeader.textContent = titleText;
        Object.assign(sectionHeader.style, {
            margin: '0 0 12px 0', color: colors.text, fontSize: '16px', fontWeight: '600', textShadow: `0 0 8px ${colors.accent}`
        });

        section.appendChild(sectionHeader);
        return { section, body: section };
    }

    function createInput(placeholder, onInputChange) {
        const input = document.createElement('input');
        Object.assign(input.style, {
            width: '100%', padding: '10px 15px', borderRadius: '6px', border: `1px solid ${colors.accent}`,
            background: 'rgba(0, 0, 0, 0.5)', color: colors.text, fontSize: '14px', outline: 'none', boxSizing: 'border-box', marginTop: '5px'
        });
        input.placeholder = placeholder;
        input.addEventListener('input', () => { if (onInputChange) onInputChange(input.value.trim()); });
        return input;
    }

    function createSlider(label, min, max, value, onSlideChange) {
        const container = document.createElement('div');
        Object.assign(container.style, { display: 'flex', flexDirection: 'column', gap: '6px', margin: '10px 0' });

        const labelEl = document.createElement('span');
        labelEl.textContent = label;
        labelEl.style.color = colors.text; labelEl.style.fontSize = '14px';

        const row = document.createElement('div');
        row.style.cssText = 'display:flex; align-items:center; gap:10px;';

        const slider = document.createElement('input');
        slider.type = 'range'; slider.min = min; slider.max = max; slider.value = value;
        Object.assign(slider.style, { flex: '1', height: '6px', WebkitAppearance: 'none', background: `linear-gradient(90deg, ${colors.accent}, #ffcc00)`, borderRadius: '3px' });

        const valueDisplay = document.createElement('span');
        valueDisplay.textContent = value;
        Object.assign(valueDisplay.style, { color: colors.text, minWidth: '50px', textAlign: 'center', textShadow: `0 0 5px ${colors.accent}` });

        slider.addEventListener('input', () => {
            valueDisplay.textContent = slider.value;
            if (onSlideChange) onSlideChange(parseInt(slider.value, 10));
        });

        row.append(slider, valueDisplay); container.append(labelEl, row);
        return { container, slider, valueDisplay };
    }

    function createToggle(label, checked, onChange) {
        const container = document.createElement('div');
        Object.assign(container.style, { display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0' });

        const labelEl = document.createElement('span');
        labelEl.textContent = label; labelEl.style.color = colors.text; labelEl.style.fontSize = '14px';

        const toggle = document.createElement('label');
        Object.assign(toggle.style, { position: 'relative', display: 'inline-block', width: '50px', height: '26px' });

        const input = document.createElement('input');
        input.type = 'checkbox'; input.checked = checked; input.style.cssText = 'opacity:0; width:0; height:0;';

        const slider = document.createElement('span');
        Object.assign(slider.style, { position: 'absolute', cursor: 'pointer', top: '0', left: '0', right: '0', bottom: '0', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '26px', border: `1px solid ${colors.accent}` });

        const knob = document.createElement('span');
        Object.assign(knob.style, { position: 'absolute', height: '18px', width: '18px', left: '3px', bottom: '3px', backgroundColor: colors.text, transition: 'all 0.3s ease', borderRadius: '50%', boxShadow: `0 0 8px ${colors.accent}` });

        slider.appendChild(knob); toggle.append(input, slider); container.append(labelEl, toggle);

        input.addEventListener('change', () => {
            if (input.checked) {
                slider.style.backgroundColor = colors.accent; knob.style.transform = 'translateX(24px)';
            } else {
                slider.style.backgroundColor = 'rgba(0, 0, 0, 0.3)'; knob.style.transform = 'translateX(0px)';
            }
            onChange(input.checked);
        });

        if (checked) { slider.style.backgroundColor = colors.accent; knob.style.transform = 'translateX(24px)'; }
        return { container, input };
    }

    uiElement.appendChild(content);
    document.body.appendChild(uiElement);

    const configSection = createSection('🔑 Database Connection');
    const botSection = createSection('🔥 R+ .Dev Dashboard');

    const memoryStatusDisplay = document.createElement('div');
    memoryStatusDisplay.id = 'mem-status';
    memoryStatusDisplay.style.cssText = 'font-size:12px; font-weight:bold; color:#ff1744; text-align:center; margin-top:8px; text-shadow:0 0 5px #ff1744;';
    memoryStatusDisplay.innerText = 'STATUS: MEMORY EMPTY (PASTE DATA/ID)';

    // FIX: Offline Parser automatically handles direct text blocks to beat browser security firewalls
    const idInputField = createInput('Paste Quiz ID OR Raw JSON Brackets here...', async (val) => {
        if (val.length < 5) return;
        const statusNode = document.getElementById('mem-status');
        
        try {
            if (val.startsWith('[')) {
                questions = JSON.parse(val);
                info.numQuestions = questions.length;
                statusNode.innerText = `STATUS: SUCCESS (${questions.length} DATA PACKETS READY)`;
                statusNode.style.color = '#00e676'; statusNode.style.textShadow = '0 0 5px #00e676';
                return;
            }

            const res = await fetch(`https://kahoot.it{val}`);
            const json = await res.json();
            
            questions = json.questions || json.kahoot?.questions; 
            info.numQuestions = questions.length;
            
            statusNode.innerText = `STATUS: SUCCESS (${questions.length} DATA PACKETS READY)`;
            statusNode.style.color = '#00e676'; statusNode.style.textShadow = '0 0 5px #00e676';
        } catch (err) {
            statusNode.innerText = 'STATUS: NETWORK BLOCKED - USE RAW JSON TEXT';
            statusNode.style.color = '#ff9900'; statusNode.style.textShadow = '0 0 5px #ff9900';
        }
    });

    const highlightToggle = createToggle('Show Answers (Highlight)', showAnswers, (val) => { showAnswers = val; });
    const pointsSlider = createSlider('Points Per Question Target:', '0', '1000', Answered_PPT, (val) => { Answered_PPT = val; });

    configSection.body.appendChild(idInputField);
    configSection.body.appendChild(memoryStatusDisplay);
    botSection.body.appendChild(highlightToggle.container);
    botSection.body.appendChild(pointsSlider.container);
    content.append(configSection.section, botSection.section);

    minimizeBtn.addEventListener('click', () => { content.style.display = content.style.display === 'none' ? 'flex' : 'none'; });
    closeBtn.addEventListener('click', () => { uiElement.remove(); });

    let isDragging = false, startX, startY, initialLeft, initialTop;
    header.addEventListener('mousedown', (e) => {
        isDragging = true; startX = e.clientX; startY = e.clientY;
        initialLeft = uiElement.offsetLeft; initialTop = uiElement.offsetTop;
        document.addEventListener('mousemove', dragMenu); document.addEventListener('mouseup', dropMenu);
    });
    function dragMenu(e) { if (isDragging) { uiElement.style.left = `${initialLeft + (e.clientX - startX)}px`; uiElement.style.top = `${initialTop + (e.clientY - startY)}px`; } }
    function dropMenu() { isDragging = false; document.removeEventListener('mousemove', dragMenu); document.removeEventListener('mouseup', dropMenu); }

    // ADDED: FIX: 2026 Quick Hide Shift Key Keyboard Macro Listener
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Shift') {
            e.preventDefault();
            if (uiElement.style.display === 'none') {
                uiElement.style.display = 'flex';
                console.log("[R+ .Dev] Dashboard Unhidden.");
            } else {
                uiElement.style.display = 'none';
                console.log("[R+ .Dev] Dashboard Hidden.");
            }
        }
    });

    // ===================================================
    // DYNAMIC FRONTEND RECOLOR ENGAGEMENT CORE
    // ===================================================
    setInterval(() => {
        if (!showAnswers) return;

        const activeQuestionCard = document.querySelector('main h1, [class*="QuestionTitle"], [data-functional-selector="question-block-title"]');
        const clickButtons = document.querySelectorAll('button[class*="AnswerButton"], [data-functional-selector^="answer-"], [class*="AnswerBlock"]');

        if (activeQuestionCard && clickButtons.length > 0) {
            const screenText = activeQuestionCard.innerText.trim();

            if (roundMemoryText !== screenText) {
                roundMemoryText = screenText; 

                if (questions.length === 0) {
                    uiElement.style.setProperty('border', `2px solid ${colors.accent}`, 'important');
                    uiElement.style.setProperty('box-shadow', `${colors.glow}`, 'important');
                    return;
                }

                const targetQuestionData = questions.find(q => {
                    const cleanObjText = (q.question || "").replace(/<\/?[^>]+(>|$)/g, "").trim().toLowerCase();
                    return cleanObjText.includes(screenText.toLowerCase()) || screenText.toLowerCase().includes(cleanObjText);
                });

                let correctChoiceIndex = -1;
                if (targetQuestionData && targetQuestionData.choices) {
                    correctChoiceIndex = targetQuestionData.choices.findIndex(choice => choice.correct === true || choice.isCorrect === true);
                }

                if (correctChoiceIndex !== -1) {
                    uiElement.style.setProperty('border', '2px solid #00e676', 'important');
                    uiElement.style.setProperty('box-shadow', '0 0 25px rgba(0, 230, 118, 0.95)', 'important');
                    
                    clickButtons.forEach((btn, idx) => {
                        if (idx === correctChoiceIndex) {
                            btn.style.setProperty('background-color', '#00e676', 'important');
                            btn.style.setProperty('background-image', 'none', 'important');
                            btn.style.setProperty('border', '6px solid #fff', 'important');
                            btn.style.setProperty('opacity', '1.0', 'important');
                        } else {
                            btn.style.setProperty('background-color', '#ff1744', 'important');
                            btn.style.setProperty('background-image', 'none', 'important');
                            btn.style.setProperty('opacity', '0.15', 'important');
                            btn.style.setProperty('border', 'none', 'important');
                        }
                    });
                } else {
                    uiElement.style.setProperty('border', '2px solid #ff1744', 'important');
                    uiElement.style.setProperty('box-shadow', '0 0 25px rgba(255, 23, 68, 0.95)', 'important');
                }
            }
        } else {
            if (roundMemoryText !== "") {
                roundMemoryText = ""; 
                uiElement.style.setProperty('border', `2px solid ${colors.accent}`, 'important');
                uiElement.style.setProperty('box-shadow', `${colors.glow}`, 'important');
            }
        }
    }, 200); 

})();




-----------------------------------------------------------------------------------------------
