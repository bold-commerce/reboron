import React from 'react';
import modalFactory from './modalFactory';
import { css, keyframes } from 'emotion';

const animation = {
    show: {
        animationDuration: '0.8s',
        animationTimingFunction: 'cubic-bezier(0.6,0,0.4,1)',
    },
    hide: {
        animationDuration: '0.4s',
        animationTimingFunction: 'ease-out',
    },
    showContentAnimation: keyframes`
        0% {
            opacity: 0;
        }
        40% {
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
    getSharp: (closing, rectStyles = {}) => {
        const strokeDashLength = 1680;
        const showSharpAnimation = keyframes`
            0% {
                stroke-dashoffset: ${strokeDashLength};
            }
            100% {
                stroke-dashoffset: 0;
            }
        `;
        const sharpStyle = css`
            position: absolute;
            width: calc(100%);
            height: calc(100%);
            z-index: -1;
        `;
        const rectStyle = css`
            animation-duration: ${closing ? '0.4s' : '0.8s'};
            animation-fill-mode: forwards;
            animation-name: ${closing ? hideContentAnimation : showSharpAnimation};
            stroke: #ffffff;
            stroke-width: 2px;
            stroke-dasharray: ${strokeDashLength};
            ${rectStyles};
        `;
        return (
            <div className={ sharpStyle }>
                <svg xmlns='http://www.w3.org/2000/svg'
                     width='100%'
                     height='100%'
                     viewBox='0 0 496 136'
                     preserveAspectRatio='none'>
                    <rect className={ rectStyle }
                          x='2'
                          y='2'
                          fill='none'
                          width='492'
                          height='132' />
                </svg>
            </div>
        );
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
            animation-duration: 0.4s;
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
