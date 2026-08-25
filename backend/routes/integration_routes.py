from flask import Blueprint, jsonify
from models.integration import Integration
from services.integration_service import IntegrationService

integration_bp = Blueprint('integration', __name__)
integration_svc = IntegrationService()

@integration_bp.route('/', methods=['GET'])
def get_integrations():
    integrations = Integration.query.all()
    return jsonify({
        'status': 'success',
        'count': len(integrations),
        'integrations': [i.to_dict() for i in integrations]
    })

@integration_bp.route('/<int:integration_id>/status', methods=['GET'])
def get_integration_status(integration_id):
    item = Integration.query.get(integration_id)
    if not item:
        return jsonify({'status': 'error', 'message': 'Integration record not found'}), 404
    return jsonify({'status': 'success', 'integration': item.to_dict()})

@integration_bp.route('/test/<string:adapter_key>', methods=['POST', 'GET'])
def test_integration(adapter_key):
    result = integration_svc.test_live_integration(adapter_key)
    return jsonify({
        'status': 'success',
        'adapter_key': adapter_key,
        'payload': result
    })
