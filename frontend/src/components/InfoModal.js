import React, { Component } from 'react'
import Modal from 'react-responsive-modal'

export default class InfoModal extends Component {
	render() {
		const { info, open, onCloseModal } = this.props
		return (
			<Modal open={open} onClose={onCloseModal} center classNames={{ overlay: 'custom-overlay', modal: 'custom-modal' }}>
				<div className="contanier">
					<div className="panel panel-info">
						<div className="panel-heading">File Info</div>
						<div className="panel-body">
							<div className="panel panel-default">
								<div className="panel-heading">
									<h3 className="panel-title">Name</h3>
								</div>
								<div className="panel-body">
									{info && info.name}
								</div>
							</div>
							<div className="panel panel-default">
								<div className="panel-heading">
									<h3 className="panel-title">Location</h3>
								</div>
								<div className="panel-body">
									{info && info.url}
								</div>
							</div>
							<div className="panel panel-default">
								<div className="panel-heading">
									<h3 className="panel-title">Type</h3>
								</div>
								<div className="panel-body">
									{info && info.type}
								</div>
							</div>
						</div>
					</div>
				</div>
			</Modal>
		)
	}
}
