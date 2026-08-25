from flask import Blueprint, request, jsonify
from models.service import Service

service_bp = Blueprint('service', __name__)

@service_bp.route('/', methods=['GET'])
def get_services():
    query = request.args.get('q', '').strip().lower()
    category = request.args.get('category', '').strip()

    services_query = Service.query.filter_by(is_active=True)

    if category and category.lower() != 'all':
        services_query = services_query.filter(Service.category.ilike(f"%{category}%"))

    all_services = services_query.all()

    if query:
        filtered = [
            s.to_dict() for s in all_services
            if query in s.title.lower() or query in s.department.lower() or query in s.short_desc.lower() or query in s.category.lower()
        ]
    else:
        filtered = [s.to_dict() for s in all_services]

    return jsonify({
        'status': 'success',
        'count': len(filtered),
        'services': filtered
    })

@service_bp.route('/<int:service_id>', methods=['GET'])
def get_service_detail(service_id):
    service = Service.query.get(service_id)
    if not service:
        return jsonify({'status': 'error', 'message': 'Service not found'}), 404
    return jsonify({'status': 'success', 'service': service.to_dict()})

@service_bp.route('/categories', methods=['GET'])
def get_categories():
    categories = [
        {"id": "Election Services", "name": "Election Services", "icon": "Vote", "description": "Voter ID, Voter Roll Modification, Polling Station Lookup"},
        {"id": "Identity & Documents", "name": "Identity & Documents", "icon": "ShieldCheck", "description": "Aadhaar, Passport, DigiLocker Verification"},
        {"id": "Certificates", "name": "Certificates", "icon": "Award", "description": "Income, Domicile, Birth, Death & Caste Certificates"},
        {"id": "Welfare Schemes", "name": "Welfare Schemes", "icon": "HeartHandshake", "description": "DBT, Pensions, Agriculture Subsidies, Ration Card"},
        {"id": "Education", "name": "Education & Student Aid", "icon": "GraduationCap", "description": "Scholarships, Board Certificates, Skill Training"},
        {"id": "Employment", "name": "Employment & Labour", "icon": "Briefcase", "description": "Job Exchange Registration, Labour Card, Provident Fund"},
        {"id": "Health", "name": "Health & Medical", "icon": "Activity", "description": "Health ID, Insurance Schemes, Immunization Records"},
        {"id": "Transport", "name": "Transport & RTO", "icon": "Car", "description": "Driving License, Vehicle RC Transfer, Permits"}
    ]
    return jsonify({'status': 'success', 'categories': categories})
