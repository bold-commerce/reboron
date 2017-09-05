import React, { Component } from 'react';
import transitionEvents from 'domkit/transitionEvents';
import appendVendorPrefix from 'domkit/appendVendorPrefix';
import PropTypes from 'prop-types';

export default (animation) => {
    class Factory extends Component {
        constructor(props) {
            super(props);
            this.state = {
                closing: false,
                visible: false,
            };

            this.handleBackdropClick = this.handleBackdropClick.bind(this);
            this.leave = this.leave.bind(this);
            this.enter = this.enter.bind(this);
            this.show = this.show.bind(this);
            this.hide = this.hide.bind(this);
            this.toggle = this.toggle.bind(this);
            this.listenKeyboard = this.listenKeyboard.bind(this);
        };

        addTransitionListener(node, handle) {
            if (node) {
                const endListener = (e) => {
                    if (e && e.target !== node) {
                        return;
                    }
                    transitionEvents.removeEndEventListener(node, endListener);
                    handle();
                };
                transitionEvents.addEndEventListener(node, endListener);
            }
        };

        handleBackdropClick() {
            if (this.props.closeOnClick) {
                this.hide();
            }
        };

        render() {
            if (!this.state.visible) {
                return null;
            }

            const closing = this.state.closing;
            const animation = this.props.animation;
            const modalStyle = animation.getModalStyle(closing);
            const backdropStyle = animation.getBackdropStyle(closing);
            const contentStyle = animation.getContentStyle(closing);
            const ref = animation.getRef(closing);
            const sharp = animation.getSharp && animation.getSharp(closing, this.props.rectStyle);

            // Apply custom style properties
            if (this.props.modalStyle) {
                const prefixedModalStyle = appendVendorPrefix(this.props.modalStyle);
                for (let style in prefixedModalStyle) {
                    modalStyle[style] = prefixedModalStyle[style];
                }
            }

            if (this.props.backdropStyle) {
                const prefixedBackdropStyle = appendVendorPrefix(this.props.backdropStyle);
                for (let style in prefixedBackdropStyle) {
                    backdropStyle[style] = prefixedBackdropStyle[style];
                }
            }

            if (this.props.contentStyle) {
                const prefixedContentStyle = appendVendorPrefix(this.props.contentStyle);
                for (let style in prefixedContentStyle) {
                    contentStyle[style] = prefixedContentStyle[style];
                }
            }

            const backdrop = this.props.backdrop ? React.createElement('div', {style: backdropStyle, onClick: this.props.closeOnClick ? this.handleBackdropClick : null}) : undefined;

            if (closing) {
                const node = this.refs[ref];
                this.addTransitionListener(node, this.leave);
            }

            return (
                React.createElement('span', null,
                    React.createElement('div', {ref: 'modal', style: modalStyle, className: this.props.className},
                        sharp,
                        React.createElement('div', {ref: 'content', tabIndex: '-1', style: contentStyle},
                            this.props.children
                        )
                    ),
                    backdrop
                )
            );
        };

        leave() {
            this.setState({
                visible: false,
            });
            this.props.onHide();
        };

        enter() {
            this.props.onShow();
        };

        show() {
            if (this.state.visible) {
                return;
            }

            this.setState({
                closing: false,
                visible: true,
            });

            setTimeout(function(){
                const ref = this.props.animation.getRef();
                const node = this.refs[ref];
                this.addTransitionListener(node, this.enter);
            }.bind(this), 0);
        };

        hide() {
            if (!this.state.visible) {
                return;
            }

            this.setState({
                closing: true,
            });
        };

        toggle() {
            if (this.state.visible) {
                this.hide();
            } else {
                this.show();
            }
        };

        listenKeyboard(event) {
            if (this.props.keyboard && (event.key === 'Escape' || event.keyCode === 27)) {
                this.hide();
            }
        };

        componentDidMount() {
            window.addEventListener('keydown', this.listenKeyboard, true);
        };

        componentWillUnmount()  {
            window.removeEventListener('keydown', this.listenKeyboard, true);
        };
    };

    Factory.propTypes = {
        className: PropTypes.string,
        keyboard: PropTypes.bool,
        onShow: PropTypes.func,
        onHide: PropTypes.func,
        animation: PropTypes.object,
        backdrop: PropTypes.bool,
        closeOnClick: PropTypes.bool,
        modalStyle: PropTypes.object,
        backdropStyle: PropTypes.object,
        contentStyle: PropTypes.object,
    };

    Factory.defaultProps = {
        className: '',
        onShow: function(){},
        onHide: function(){},
        animation: animation,
        keyboard: true,
        backdrop: true,
        closeOnClick: true,
        modalStyle: {},
        backdropStyle: {},
        contentStyle: {},
    };

    return Factory;
};
