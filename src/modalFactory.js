import React, { Component } from 'react';
import transitionEvents from 'domkit/transitionEvents';
import appendVendorPrefix from 'domkit/appendVendorPrefix';
import PropTypes from 'prop-types';
import { css } from 'emotion';

export default (animation) => {
    class Factory extends Component {
        constructor(props) {
	        super(props);
	        this.state = {
		        willHidden: false,
		        hidden: true
        	};

	        this.hasHidden = this.hasHidden.bind(this);
	        this.handleBackdropClick = this.handleBackdropClick.bind(this);
	        this.leave = this.leave.bind(this);
	        this.enter = this.enter.bind(this);
	        this.show = this.show.bind(this);
	        this.hide = this.hide.bind(this);
	        this.toggle = this.toggle.bind(this);
	        this.listenKeyboard = this.listenKeyboard.bind(this);
        };

        hasHidden() {
        	return this.state.hidden;
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
	        const hidden = this.hasHidden();
	        if (hidden) return null;

	        const willHidden = this.state.willHidden;
	        const animation = this.props.animation;
	        const ref = animation.getRef(willHidden);
	        const sharp = animation.getSharp && animation.getSharp(willHidden, this.props.rectStyle);

	        let modalStyle = animation.getModalStyle(willHidden);
	        if (this.props.modalStyle) {
	        	modalStyle = css`
					composes: ${modalStyle};
					${this.props.modalStyle.map((attr, val) => `${attr}: ${val};`)}
				`;
	        }

			let backdropStyle = animation.getBackdropStyle(willHidden);
			if (this.props.backdropStyle) {
	        	backdropStyle = css`
					composes: ${backdropStyle};
					${this.props.backdropStyle.map((attr, val) => `${attr}: ${val};`)}
				`;
	        }

			let contentStyle = animation.getContentStyle(willHidden);
			if (this.props.contentStyle) {
				contentStyle = css`
					composes: ${contentStyle};
					${this.props.contentStyle.map((attr, val) => `${attr}: ${val};`)}
				`;
			}

	        const backdrop = this.props.backdrop ? React.createElement('div', {style: backdropStyle, onClick: this.props.closeOnClick ? this.handleBackdropClick : null}) : undefined;

	        if (willHidden) {
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
	        	hidden: true,
	        });
	        this.props.onHide();
        };

        enter() {
        	this.props.onShow();
        };

        show() {
        	if (!this.hasHidden()) return;

	        this.setState({
		        willHidden: false,
		        hidden: false,
	        });

	        setTimeout(() => {
		        const ref = this.props.animation.getRef();
		        const node = this.refs[ref];
		        this.addTransitionListener(node, this.enter);
	        }, 0);
        };

        hide() {
	        if (this.hasHidden()) return;

	        this.setState({
	        	willHidden: true
	        });
        };

        toggle() {
	        if (this.hasHidden()) {
	        	this.show();
	        } else {
	        	this.hide();
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
        contentStyle: PropTypes.object
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
        contentStyle: {}
    };

    return Factory;
};
