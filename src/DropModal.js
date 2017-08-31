import modalFactory from './modalFactory';
import { css } from 'emotion';

const animation = {
    duration: '0.4s',
    timingFunction: 'cubic-bezier(0.7, 0, 0.3, 1)',
    showModalAnimation: css`
        @keyframes showModalAnimation {
            0%: {
                opacity: 0;
                transform: translate(-50%, -300px);
            }
            100%: {
                opacity: 1;
                transform: translate(-50%, -50%);
            }
        }
    `,
    hideModalAnimation: css`
        @keyframes hideModalAnimation {
            0%: {
                opacity: 1;
                transform: translate(-50%, -50%);
            }
            100%: {
                opacity: 0;
                transform: translate(-50%, 100px);
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
    showContentAnimation: css`
        @keyframes showContentAnimation {
            0%: {
                opacity: 0;
                transform: translate(0, -20px);
            }
            100%: {
                opacity: 1;
                transform: translate(0, 0);
            }
        }
    `,
    hideContentAnimation: css`
        @keyframes hideContentAnimation {
            0%: {
                opacity: 1;
                transform: translate(0, 0);
            }
            100%: {
                opacity: 0;
                transform: translate(0, 50px);
            }
        }
    `,
};

const duration = animation.duration;
const timingFunction = animation.timingFunction;
const showModalAnimation = animation.showModalAnimation;
const hideModalAnimation = animation.hideModalAnimation;
const showBackdropAnimation = animation.showBackdropAnimation;
const hideBackdropAnimation = animation.hideBackdropAnimation;
const showContentAnimation = animation.showContentAnimation;
const hideContentAnimation = animation.hideContentAnimation;

export default modalFactory({
    getRef: () => {
        return 'modal';
    },
    getModalStyle: (visible) => {
        return css`
            position: fixed;
            width: 500px;
            transform: translate(-50%, -50%);
            top: 50%;
            left: 50%;
            background-color: white;
            z-index: 1050;
            animation-duration: ${duration};
            animation-fill-mode: forwards;
            animation-name: ${visible ? hideModalAnimation : showModalAnimation};
            animation-timing-function: ${timingFunction};
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
            animation-duration: ${duration};
            animation-fill-mode: forwards;
            animation-name: ${visible ? hideBackdropAnimation : showBackdropAnimation};
            animation-timing-function: ${timingFunction};
        `;
    },
    getContentStyle: (visible) => {
        return css`
            margin: 0;
            opacity: 0;
            animation-duration: ${duration};
            animation-fill-mode: forwards;
            animation-delay: 0.25s;
            animation-name: showContentAnimation;
            animation-timing-function: ${timingFunction};
        `;
    },
});
