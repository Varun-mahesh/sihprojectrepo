from flask import Blueprint, jsonify
from database import db
from models.notification import Notification

notification_bp = Blueprint('notification', __name__)

@notification_bp.route('/', methods=['GET'])
def get_notifications():
    notifications = Notification.query.order_by(Notification.created_at.desc()).all()
    unread_count = Notification.query.filter_by(is_read=False).count()
    return jsonify({
        'status': 'success',
        'unread_count': unread_count,
        'notifications': [n.to_dict() for n in notifications]
    })

@notification_bp.route('/<int:notification_id>/read', methods=['POST'])
def mark_read(notification_id):
    notif = Notification.query.get(notification_id)
    if notif:
        notif.is_read = True
        db.session.commit()
        return jsonify({'status': 'success', 'notification': notif.to_dict()})
    return jsonify({'status': 'error', 'message': 'Notification not found'}), 404
