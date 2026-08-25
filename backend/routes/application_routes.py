from flask import Blueprint, request, jsonify
from database import db
from models.application import Application
from models.service import Service
from models.user import User
from models.notification import Notification
from services.integration_service import IntegrationService
from datetime import datetime
import json
import random

application_bp = Blueprint('application', __name__)
integration_svc = IntegrationService()

@application_bp.route('/', methods=['GET'])
def get_applications():
    user_id = request.args.get('user_id', type=int)
    if user_id:
        apps = Application.query.filter_by(user_id=user_id).order_by(Application.submitted_at.desc()).all()
    else:
        apps = Application.query.order_by(Application.submitted_at.desc()).all()

    return jsonify({
        'status': 'success',
        'count': len(apps),
        'applications': [a.to_dict() for a in apps]
    })

@application_bp.route('/<string:app_identifier>', methods=['GET'])
def get_application_by_id(app_identifier):
    if app_identifier.isdigit():
        app = Application.query.get(int(app_identifier))
    else:
        app = Application.query.filter_by(application_id=app_identifier.upper()).first()

    if not app:
        return jsonify({'status': 'error', 'message': f'Application {app_identifier} not found'}), 404

    # Query external API status if available
    ext_status = None
    if app.service and app.service.target_adapter:
        ext_status = integration_svc.query_status(app.service.target_adapter, app.application_id)

    res = app.to_dict()
    res['external_api_status'] = ext_status
    return jsonify({'status': 'success', 'application': res})

@application_bp.route('/', methods=['POST'])
def submit_application():
    data = request.get_json() or {}
    service_id = data.get('service_id')
    user_id = data.get('user_id', 1) # Default to main citizen for demo
    form_data = data.get('form_data', {})

    if not service_id:
        return jsonify({'status': 'error', 'message': 'service_id is required'}), 400

    service = Service.query.get(service_id)
    if not service:
        return jsonify({'status': 'error', 'message': 'Selected government service does not exist'}), 404

    user = User.query.get(user_id)
    if not user:
        user = User.query.first()
        user_id = user.id if user else 1

    app_num = random.randint(10000, 99999)
    app_id = f"APP-2026-{app_num}"

    now_iso = datetime.utcnow().strftime("%Y-%m-%d %H:%M UTC")

    # Initial timeline stage
    timeline = [
        {
            "stage": "Submitted",
            "title": "Application Submitted",
            "timestamp": now_iso,
            "status": "completed",
            "description": "Citizen application payload validated and received by Central Interoperability Portal."
        },
        {
            "stage": "Under Verification",
            "title": "Dispatched to Department Gateway",
            "timestamp": now_iso,
            "status": "current",
            "description": f"Transmitted via Integration Layer to {service.department} API."
        },
        {
            "stage": "Department Processing",
            "title": "Department Verification & Review",
            "timestamp": "Pending",
            "status": "upcoming",
            "description": "Official review by authorized department verification officer."
        },
        {
            "stage": "Approved",
            "title": "Final Issuance & Digital Signature",
            "timestamp": "Pending",
            "status": "upcoming",
            "description": "Document digitally signed and available in citizen vault."
        }
    ]

    new_app = Application(
        application_id=app_id,
        user_id=user_id,
        service_id=service.id,
        status='Under Verification',
        timeline_json=json.dumps(timeline),
        form_data_json=json.dumps(form_data),
        remarks=f"Dispatched via Integration Layer to {service.department}"
    )

    db.session.add(new_app)

    # Trigger Integration Layer call to Government Department API
    adapter_response = integration_svc.dispatch_application(
        service_code=service.service_code,
        target_adapter=service.target_adapter,
        application_id=app_id,
        form_data=form_data
    )

    # Add notification for user
    notif = Notification(
        user_id=user_id,
        title=f"Application Received ({app_id})",
        message=f"Your application for '{service.title}' has been dispatched to {service.department}.",
        notification_type='success'
    )
    db.session.add(notif)

    db.session.commit()

    return jsonify({
        'status': 'success',
        'message': f'Application {app_id} submitted successfully.',
        'application': new_app.to_dict(),
        'integration_response': adapter_response
    }), 201

@application_bp.route('/track/<string:tracking_id>', methods=['GET'])
def track_status(tracking_id):
    app = Application.query.filter_by(application_id=tracking_id.strip().upper()).first()
    if not app:
        return jsonify({
            'status': 'error',
            'message': f'No application record found for tracking ID "{tracking_id}". Please verify the application ID.'
        }), 404

    return jsonify({
        'status': 'success',
        'application': app.to_dict()
    })
