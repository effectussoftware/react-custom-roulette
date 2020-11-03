var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import styled from 'styled-components';
import { NonDraggableImage } from '../common/styledComponents';
export var RouletteContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: relative;\n  width: 80vw;\n  max-width: 445px;\n  height: 80vw;\n  max-height: 445px;\n  object-fit: contain;\n  flex-shrink: 0;\n  z-index: 5;\n  pointer-events: none;\n"], ["\n  position: relative;\n  width: 80vw;\n  max-width: 445px;\n  height: 80vw;\n  max-height: 445px;\n  object-fit: contain;\n  flex-shrink: 0;\n  z-index: 5;\n  pointer-events: none;\n"])));
export var RotationContainer = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: absolute;\n  width: 100%;\n  left: 0px;\n  right: 0px;\n  top: 0px;\n  bottom: 0px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  transform: rotate(", "deg);\n\n  &.started-spinning {\n    animation: spin ", "s\n        cubic-bezier(0.71, -0.29, 0.96, 0.9) 0s 1 normal forwards running,\n      continueSpin 0.75s linear\n        ", "s 1 normal\n        forwards running,\n      stopSpin ", "s\n        cubic-bezier(0, 0, 0.35, 1.02)\n        ", "s\n        1 normal forwards running;\n  }\n\n  @keyframes spin {\n    from {\n      transform: rotate(", "deg);\n    }\n    to {\n      transform: rotate(", "deg);\n    }\n  }\n  @keyframes continueSpin {\n    from {\n      transform: rotate(", "deg);\n    }\n    to {\n      transform: rotate(", "deg);\n    }\n  }\n  @keyframes stopSpin {\n    from {\n      transform: rotate(", "deg);\n    }\n    to {\n      transform: rotate(", "deg);\n    }\n  }\n"], ["\n  position: absolute;\n  width: 100%;\n  left: 0px;\n  right: 0px;\n  top: 0px;\n  bottom: 0px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  transform: rotate(", "deg);\n\n  &.started-spinning {\n    animation: spin ", "s\n        cubic-bezier(0.71, -0.29, 0.96, 0.9) 0s 1 normal forwards running,\n      continueSpin 0.75s linear\n        ", "s 1 normal\n        forwards running,\n      stopSpin ", "s\n        cubic-bezier(0, 0, 0.35, 1.02)\n        ",
    "s\n        1 normal forwards running;\n  }\n\n  @keyframes spin {\n    from {\n      transform: rotate(", "deg);\n    }\n    to {\n      transform: rotate(", "deg);\n    }\n  }\n  @keyframes continueSpin {\n    from {\n      transform: rotate(", "deg);\n    }\n    to {\n      transform: rotate(", "deg);\n    }\n  }\n  @keyframes stopSpin {\n    from {\n      transform: rotate(", "deg);\n    }\n    to {\n      transform: rotate(", "deg);\n    }\n  }\n"])), function (props) { return props.startRotationDegrees; }, function (_a) {
    var startSpinningTime = _a.startSpinningTime;
    return startSpinningTime / 1000;
}, function (_a) {
    var startSpinningTime = _a.startSpinningTime;
    return startSpinningTime / 1000;
}, function (_a) {
    var stopSpinningTime = _a.stopSpinningTime;
    return stopSpinningTime / 1000;
}, function (_a) {
    var startSpinningTime = _a.startSpinningTime, continueSpinningTime = _a.continueSpinningTime;
    return (startSpinningTime + continueSpinningTime) / 1000;
}, function (props) { return props.startRotationDegrees; }, function (props) { return props.startRotationDegrees + 360; }, function (props) { return props.startRotationDegrees; }, function (props) { return props.startRotationDegrees + 360; }, function (props) { return props.startRotationDegrees; }, function (props) { return 1440 + props.finalRotationDegrees; });
export var RouletteSelectorImage = styled(NonDraggableImage)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  position: absolute;\n  z-index: 5;\n  width: 17%;\n  right: 6px;\n  top: 15px;\n"], ["\n  position: absolute;\n  z-index: 5;\n  width: 17%;\n  right: 6px;\n  top: 15px;\n"])));
var templateObject_1, templateObject_2, templateObject_3;
