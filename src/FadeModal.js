import modalFactory from './modalFactory';
import appendVendorPrefix from 'domkit/appendVendorPrefix';
import { css, keyframes } from 'emotion';

const animation = {
    show: {
        animationDuration: '0.3s',
        animationTimingFunction: 'ease-out',
    },
    hide: {
        animationDuration: '0.3s',
        animationTimingFunction: 'ease-out',
    },
    showContentAnimation: keyframes`
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    `,
    hideContentAnimation: keyframes`
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    `,
    showBackdropAnimation: keyframes`
        0% {
            opacity: 0;
        }
        100% {
            opacity: 0.9;
        }
    `,
    hideBackdropAnimation: keyframes`
        0% {
            opacity: 0.9;
        }
        100% {
            opacity: 0;
        }
    `,
};

const showAnimation = animation.show;
const hideAnimation = animation.hide;
const showContentAnimation = animation.showContentAnimation;
const hideContentAnimation = animation.hideContentAnimation;
const showBackdropAnimation = animation.showBackdropAnimation;
const hideBackdropAnimation = animation.hideBackdropAnimation;

export default modalFactory({
    getRef: () => {
        return 'content';
    },
    getModalStyle: () => {
        return css`
            z-index: 1050;
            position: fixed;
            width: 500px;
            transform: translate3d(-50%, -50%, 0);
            top: 50%;
            left: 50%;
        `;
    },
    getBackdropStyle: (closing) => {
        return css`
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 1040;
            background-color: #373A47;
            animation-fill-mode: forwards;
            animation-duration: 0.3s;
            animation-name: ${closing ? hideBackdropAnimation : showBackdropAnimation};
            animation-timing-function: ${(closing ? hideAnimation : showAnimation).animationTimingFunction};
        `;
    },
    getContentStyle: (closing) => {
        return css`
            margin: 0;
            background-color: white;
            animation-duration: ${(closing ? hideAnimation : showAnimation).animationDuration};
            animation-fill-mode: forwards;
            animation-name: ${closing ? hideContentAnimation : showContentAnimation};
            animation-timing-function: ${(closing ? hideAnimation : showAnimation).animationTimingFunction};
        `;
    },
});
