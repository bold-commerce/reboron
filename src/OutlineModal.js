import React from 'react';
import modalFactory from './modalFactory';
import { css } from 'emotion';

const animation = {
    showAnimation: {
        duration: '0.8s',
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
            }
            40%: {
                opacity: 0;
            }
            100%: {
                opacity: 1;
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
    getSharp: (visible, rectStyles = {}) => {
        const strokeDashLength = 1680;
        const showSharpAnimation = css`
            @keyframes showSharpAnimation {
                0%: {
                    stroke-dashoffset: ${strokeDashLength};
                }
                100%: {
                    stroke-dashoffset: 0;
                }
            }
        `;
        const sharpStyle = css`
            position: absolute;
            width: calc(100%);
            height: calc(100%);
            z-index: -1;
        `;
        const rectStyle = css`
            composes: ${rectStyles};
            animation-duration: ${visible ? hideAnimation.duration : showAnimation.duration};
            animation-fill-mode: forwards;
            animation-name: ${visible ? hideContentAnimation : showSharpAnimation};
            stroke: #ffffff;
            stroke-width: 2px;
            stroke-dasharray: ${strokeDashLength};
        `;
        return (
            <div style={ sharpStyle }>
                <svg xmlns='http://www.w3.org/2000/svg'
                     width='100%'
                     height='100%'
                     viewBox='0 0 496 136'
                     preserveAspectRatio='none'>
                    <rect style={ rectStyle }
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
            animation-duration: 0.4s;
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
