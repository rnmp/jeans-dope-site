// Homepage
let body = document.querySelector('body.homepage');
if (body) {
    window.addEventListener('scroll', enjoyLife);
    enjoyLife();
}
function enjoyLife() {
    const percentageScrolled = (window.scrollY) / window.innerHeight;
    const difference = percentageScrolled;
    let backgroundColor = null;
    if (difference === 0) {
        backgroundColor = '#ff3333';
    }
    else if (difference < 1.0) {
        backgroundColor = blendColors('#ff3333', '#000000', difference);
    }
    else {
        backgroundColor = '#000000';
    }
    if (!body) {
        return;
    }
    body.style.backgroundColor = backgroundColor;
    if (difference > .5) {
        body.classList.remove('homepage');
    }
    else {
        body.classList.add('homepage');
    }
}
function blendColors(hex1, hex2, percentage) {
    hex1 = hex1.substring(1);
    hex2 = hex2.substring(1);
    const color1 = [parseInt(hex1[0] + hex1[1], 16), parseInt(hex1[2] + hex1[3], 16), parseInt(hex1[4] + hex1[5], 16)];
    const color2 = [parseInt(hex2[0] + hex2[1], 16), parseInt(hex2[2] + hex2[3], 16), parseInt(hex2[4] + hex2[5], 16)];
    const result = [
        (1 - percentage) * color1[0] + percentage * color2[0],
        (1 - percentage) * color1[1] + percentage * color2[1],
        (1 - percentage) * color1[2] + percentage * color2[2],
    ];
    return '#' + toHex(result[0]) + toHex(result[1]) + toHex(result[2]);
    function toHex(num) {
        let hex = Math.round(num).toString(16);
        if (hex.length == 1) {
            hex = '0' + hex;
        }
        return hex;
    }
}
// Font Editors
var FontWeightName;
(function (FontWeightName) {
    FontWeightName["Hairline"] = "Hairline";
    FontWeightName["Thin"] = "Thin";
    FontWeightName["Light"] = "Light";
    FontWeightName["Regular"] = "Regular";
    FontWeightName["Semi"] = "Semi";
    FontWeightName["Bold"] = "Bold";
})(FontWeightName || (FontWeightName = {}));
const DefaultFontSize = 100;
const FontWeight = {
    [FontWeightName.Hairline]: 100,
    [FontWeightName.Thin]: 200,
    [FontWeightName.Light]: 300,
    [FontWeightName.Regular]: 400,
    [FontWeightName.Semi]: 600,
    [FontWeightName.Bold]: 700,
};
var OpenTypeFeature;
(function (OpenTypeFeature) {
    OpenTypeFeature["dlig"] = "dlig";
    OpenTypeFeature["salt"] = "salt";
    OpenTypeFeature["ss01"] = "ss01";
    OpenTypeFeature["swsh"] = "swsh";
})(OpenTypeFeature || (OpenTypeFeature = {}));
const OpenTypeFeatureDisplayName = {
    [OpenTypeFeature.dlig]: 'Discretionary Ligatures',
    [OpenTypeFeature.salt]: 'Stylistic Alternates',
    [OpenTypeFeature.ss01]: 'Stylistic Sets',
    [OpenTypeFeature.swsh]: 'Swashes',
};
function generateFontSizeRange(onInput) {
    const range = document.createElement('input');
    range.type = 'range';
    range.className = 'hover-transition';
    range.min = 20 + '';
    range.max = 200 + '';
    range.increment = 1 + '';
    range.value = DefaultFontSize + '';
    range.addEventListener('input', onInput);
    return range;
}
function generateFontOptionsSelect({ defaultFontOption, fontOptions }, onChange) {
    const select = div('item select');
    const currentOption = div('current-option', defaultFontOption);
    const allOptions = div('select-options');
    window.addEventListener('click', allOptions.resetActive);
    currentOption.addEventListener('click', function (event) {
        event.stopPropagation();
        select.toggleActive();
    });
    Object.entries(fontOptions).map(function (option) {
        const [optionName, fontOption] = option;
        let _option = div('', optionName);
        _option.addEventListener('click', function (event) {
            event.stopPropagation();
            currentOption.innerHTML = optionName;
            onChange(fontOption);
            select.toggleActive();
        });
        _option.addEventListener('mouseover', function () {
            onChange(fontOption);
        });
        allOptions.append(_option);
    });
    select.append(currentOption, allOptions);
    return select;
}
function div(className, innerHTML) {
    const ACTIVE_CLASS = 'is-active';
    const _div = document.createElement('div');
    _div.className = className || '';
    _div.innerHTML = innerHTML || '';
    _div.toggleActive = () => _div.classList.toggle(ACTIVE_CLASS);
    _div.resetActive = () => _div.classList.remove(ACTIVE_CLASS);
    return _div;
}
function img(src) {
    const _img = document.createElement('img');
    _img.src = src;
    return _img;
}
function generateOpenTypeMultiSelect(features, onChange) {
    let selectedFeatures = [];
    const options = div('multi-select-options');
    features.map(feature => {
        const featureEl = div('', OpenTypeFeatureDisplayName[feature]);
        featureEl.addEventListener('click', e => {
            e.stopPropagation();
            featureEl.toggleActive();
            toggleFeature(feature);
        });
        options.append(featureEl);
    });
    const trigger = div('opentype-icon');
    trigger.addEventListener('click', e => {
        e.stopPropagation();
        options.toggleActive();
    });
    window.addEventListener('click', options.resetActive);
    const container = div('multi-select hover-transition');
    container.append(trigger, options);
    return container;
    function toggleFeature(feature) {
        if (selectedFeatures.includes(feature)) {
            selectedFeatures = selectedFeatures.filter(sf => sf !== feature);
        }
        else {
            selectedFeatures.push(feature);
        }
        onChange(selectedFeatures);
    }
}
function generateAlignmentToggle(preview) {
    let initialAlign = preview.style.alignSelf;
    const toggle = div('toggle-alignment hover-transition');
    toggle.addEventListener('click', _ => {
        if (preview.style.textAlign === 'center') {
            preview.style.textAlign = 'left';
            preview.style.alignSelf = initialAlign;
        }
        else {
            preview.style.textAlign = 'center';
            preview.style.alignSelf = 'center';
        }
        toggle.toggleActive();
    });
    toggle.append(div('left'), div('center'));
    return toggle;
}
function generateFontEditorControls(settings, preview) {
    const container = div('font-editor-controls');
    const name = div('item', settings.typefaceName);
    const fontOptions = generateFontOptionsSelect(settings, function (newOption) {
        preview.style.fontWeight = FontWeight[newOption.weight] + '';
        preview.style.fontFamily = newOption.family;
    });
    const range = generateFontSizeRange(function (event) {
        preview.style.fontSize = event.target.value + "px";
    });
    container.append(name, fontOptions, range);
    if (settings.opentypeFeatures && settings.isAdvanced) {
        const opentypeFeaturesMultiSelect = generateOpenTypeMultiSelect(settings.opentypeFeatures, features => {
            preview.style.fontFeatureSettings = features.map(f => `"${f}"`).join(', ');
        });
        container.append(opentypeFeaturesMultiSelect);
    }
    if (settings.isAdvanced) {
        const toggleAlignment = generateAlignmentToggle(preview);
        container.append(toggleAlignment);
    }
    return container;
}
function generatePreview({ defaultText, fontOptions, defaultFontOption }) {
    const startingOption = fontOptions[defaultFontOption];
    const preview = div();
    preview.contentEditable = 'true';
    preview.spellcheck = false;
    preview.innerText = defaultText;
    preview.style.fontSize = DefaultFontSize + 'px';
    preview.style.fontWeight = FontWeight[startingOption.weight] + '';
    preview.style.fontFamily = startingOption.family;
    preview.style.minWidth = '100%';
    let initialAlign = 'start';
    preview.style.alignSelf = 'start';
    preview.addEventListener('focus', () => {
        initialAlign = preview.style.alignSelf;
        preview.style.alignSelf = 'stretch';
    });
    preview.addEventListener('blur', () => { preview.style.alignSelf = initialAlign; });
    return preview;
}
document.querySelectorAll('.font-editor').forEach(fontEditor => {
    const settings = sanitizeSettings(fontEditor.dataset);
    const preview = generatePreview(settings);
    const controls = generateFontEditorControls(settings, preview);
    fontEditor.append(controls, preview);
});
function sanitizeSettings(dirtyFontSettings) {
    const { opentypeFeatures } = dirtyFontSettings;
    return {
        ...dirtyFontSettings,
        opentypeFeatures: (opentypeFeatures ?
            opentypeFeatures.split(', ')
            :
                undefined),
        fontOptions: JSON.parse(dirtyFontSettings.fontOptions),
        isAdvanced: JSON.parse(dirtyFontSettings.isAdvanced),
    };
}
// Modal
const modalLinks = document.querySelectorAll('.modal-link');
const modalContainer = (function () {
    if (!modalLinks.length) {
        return;
    }
    const backdrop = div('backdrop');
    backdrop.addEventListener('click', backdrop.resetActive);
    document.addEventListener('keydown', e => {
        if (e.keyCode === 27) {
            backdrop.resetActive();
        }
    });
    document.body.append(backdrop);
    return backdrop;
})();
function showModal(el) {
    if (!modalContainer) {
        return;
    }
    modalContainer.childNodes.forEach(c => modalContainer.removeChild(c));
    const image = img(el.href);
    // image.addEventListener('click', e => e.stopPropagation())
    modalContainer.append(image);
    return modalContainer.toggleActive();
}
modalLinks.forEach(modalLink => {
    modalLink.addEventListener('click', e => {
        e.preventDefault();
        showModal(modalLink);
    });
});
