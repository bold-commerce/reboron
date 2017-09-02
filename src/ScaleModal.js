import modalFactory from './modalFactory';
import { css } from 'emotion';

const animation = {
    showAnimation: {
        duration: '0.4s',
        timingFunction: 'cubic-bezier(0.6, 0, 0.4, 1)',
    },
    hideAnimation: {
        duration: '0.4s',
        timingFunction: 'ease-out',
    },
    showContentAnimation: css`
        @keyframes showContentAnimation {
            0%: {
                opacity: 0;
                transform: scale3d(0, 0, 1);
            }
            100%: {
                opacity: 1;
                transform: scale3d(1, 1, 1);
            }
        }
    `,
    hideContentAnimation: css`
        @keyframes hideContentAnimation {
            0%: {
                opacity: 1;
            }
            100%: {
                opacity: 0;
                transform: scale3d(0.5, 0.5, 1);
            }
        }
    `,
    showBackdropAnimation: css`
        @keyframes showBackdropAnimation {
            0%: {
                opacity: 0;
            }
            100%: {
                opacity: 0.9;
            }
        }
    `,
    hideBackdropAnimation: css`
        @keyframes hideBackdropAnimation {
            0%: {
                opacity: 0.9;
            }
            100%: {
                opacity: 0;
            }
        }
    `,
};

const showAnimation = animation.showAnimation;
const hideAnimation = animation.hideAnimation;
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
    getBackdropStyle: (visible) => {
        return css`
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 1040;
            background-color: #373A47;
            animation-fill-mode: forwards;
            animation-duration: ${visible ? hideAnimation.duration : showAnimation.duration};
            animation-name: ${visible ? hideBackdropAnimation : showBackdropAnimation};
            animation-timing-function: ${visible ? hideAnimation.timingFunction : showAnimation.timingFunction};
        `;
    },
    getContentStyle: (visible) => {
        return css`
            margin: 0;
            background-color: white;
            animation-duration: ${visible ? hideAnimation.duration : showAnimation.duration};
            animation-fill-mode: forwards;
            animation-name: ${visible ? hideContentAnimation : showContentAnimation};
            animation-timing-function: ${visible ? hideAnimation.timingFunction : showAnimation.timingFunction};
        `;
    },
});
